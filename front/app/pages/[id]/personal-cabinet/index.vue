<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Chart from 'chart.js/auto'

definePageMeta({ middleware: 'auth-company' })

const route = useRoute()
const profileId = route.params.id

const sidebarItems = [
  { text: 'Dashboard',   to: `/${profileId}/personal-cabinet` },
  { text: 'Attendance',  to: `/${profileId}/personal-cabinet/attendance` },
  { text: 'Payroll',     to: `/${profileId}/personal-cabinet/payroll` },
  { text: 'Schedule',    to: `/${profileId}/personal-cabinet/schedule` },
  { text: 'Holidays',    to: `/${profileId}/personal-cabinet/holidays` },
  { text: 'Sick Leaves', to: `/${profileId}/personal-cabinet/sick-leaves` },
]

const checkedIn = ref(false)
const checkedInAt = ref(null)
const hasShiftToday = ref(false)
const loading = ref(false)
const error = ref('')
const stats = ref({ hoursWorkedToday: 0, hoursWorkedWeek: 0, hoursWorkedMonth: 0 })

let attendanceChart = null
let weeklyChart = null
const currentTime = ref(new Date())
let tickInterval = null

onMounted(() => { tickInterval = setInterval(() => { currentTime.value = new Date() }, 1000) })
onUnmounted(() => { clearInterval(tickInterval) })

const formatDate = (date) => date.toISOString().slice(0, 10)
const getWeekRange = () => {
  const today = new Date(); const day = today.getDay() || 7
  const start = new Date(today); start.setDate(today.getDate() - day + 1)
  const end = new Date(start); end.setDate(start.getDate() + 6)
  return { start_date: formatDate(start), end_date: formatDate(end) }
}
const getMonthRange = () => {
  const today = new Date()
  return { start_date: formatDate(new Date(today.getFullYear(), today.getMonth(), 1)), end_date: formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)) }
}

const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || '')
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const fetchStatus = async () => {
  try { const res = await axios.get(`/api/attendance/status/${profileId}`); checkedIn.value = res.data.checked_in; checkedInAt.value = res.data.checked_in_at } catch (e) { console.error(e) }
}
const fetchShiftStatus = async () => {
  try { const res = await axios.get(`/api/attendance/has-shift/${profileId}`); hasShiftToday.value = res.data.has_shift } catch { hasShiftToday.value = false }
}

const { isDark } = useTheme()

const fetchStats = async () => {
  try {
    const weekRes = await axios.get(`/api/attendance/personal/${profileId}`, { params: getWeekRange() })
    const weekDaily = weekRes.data.daily || []
    const todayStr = formatDate(new Date())
    const todayLog = weekDaily.find(d => d.date === todayStr)
    stats.value.hoursWorkedToday = todayLog?.total_time_seconds ? todayLog.total_time_seconds / 3600 : 0
    stats.value.hoursWorkedWeek = weekDaily.reduce((sum, d) => sum + (d.total_time_seconds || 0), 0) / 3600
    const monthRes = await axios.get(`/api/attendance/personal/${profileId}`, { params: getMonthRange() })
    stats.value.hoursWorkedMonth = (monthRes.data.daily || []).reduce((sum, d) => sum + (d.total_time_seconds || 0), 0) / 3600
    await nextTick()
    renderCharts(weekDaily)
  } catch (e) { console.error(e) }
}

const checkIn = async () => {
  loading.value = true; error.value = ''
  try { await getCsrfToken(); await axios.post(`/api/attendance/check-in/${profileId}`); await fetchStatus(); await fetchStats() }
  catch (e) { error.value = e.response?.data?.message || 'Check-in failed' }
  finally { loading.value = false }
}
const checkOut = async () => {
  loading.value = true; error.value = ''
  try { await getCsrfToken(); await axios.post(`/api/attendance/check-out/${profileId}`); await fetchStatus(); await fetchStats() }
  catch (e) { error.value = e.response?.data?.message || 'Check-out failed' }
  finally { loading.value = false }
}

const getChartColors = () => ({
  grid: isDark.value ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
  ticks: isDark.value ? '#4b5563' : '#9ca3af',
  border: isDark.value ? '#6b7280' : '#6b7280',
  fill: isDark.value ? 'rgba(107,114,128,0.12)' : 'rgba(107,114,128,0.08)',
  bar: isDark.value ? 'rgba(107,114,128,0.25)' : 'rgba(107,114,128,0.15)',
  barHover: isDark.value ? 'rgba(107,114,128,0.4)' : 'rgba(107,114,128,0.25)',
  barBorder: isDark.value ? '#6b7280' : '#9ca3af',
})

const renderCharts = (dailyLogs) => {
  const labels = dailyLogs.map(d => new Date(d.date).toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' }))
  const hours = dailyLogs.map(d => (d.total_time_seconds / 3600).toFixed(2))
  const c = getChartColors()

  const baseOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: c.grid }, ticks: { color: c.ticks, font: { size: 11 } } },
      y: { grid: { color: c.grid }, ticks: { color: c.ticks, font: { size: 11 } } }
    }
  }

  if (attendanceChart) attendanceChart.destroy()
  if (weeklyChart) weeklyChart.destroy()

  attendanceChart = new Chart(document.getElementById('attendanceChart'), {
    type: 'line',
    data: { labels, datasets: [{ data: hours, borderColor: c.border, backgroundColor: c.fill, fill: true, tension: 0.4, pointBackgroundColor: c.border, pointRadius: 4, pointHoverRadius: 6, borderWidth: 2 }] },
    options: baseOptions
  })

  weeklyChart = new Chart(document.getElementById('weeklyChart'), {
    type: 'bar',
    data: { labels, datasets: [{ data: hours, backgroundColor: c.bar, borderColor: c.barBorder, borderWidth: 1.5, borderRadius: 6, hoverBackgroundColor: c.barHover }] },
    options: baseOptions
  })
}

onMounted(async () => {
  await fetchStatus()
  await fetchShiftStatus()
  await fetchStats()
})
</script>

<template>
  <Sidebar :items="sidebarItems" />

  <div class="page-wrapper flex min-h-screen pl-[22rem] max-[768px]:pl-0 relative overflow-hidden">

    <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>
    <div class="blob blob-2 absolute bottom-[-8rem] left-[10rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none"></div>

    <main class="flex-1 p-[4rem] relative z-10">

      <!-- Page title -->
      <div class="mb-[4rem]">
        <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]">Personal Cabinet</p>
        <h1 class="page-title text-[3.6rem] leading-none tracking-wide">Dashboard</h1>
      </div>

      <!-- Stat cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2rem] mb-[3.2rem]">

        <!-- Clock / Check-in card -->
        <div class="stat-card rounded-[1.6rem] p-[3rem] flex flex-col gap-[2rem]">
          <div class="flex flex-col gap-[0.4rem]">
            <p class="card-label text-[1rem] tracking-[0.18em] uppercase">Current Time</p>
            <p class="card-value text-[3.2rem] leading-none tabular-nums">
              {{ currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}
            </p>
            <p class="card-sub text-[1.2rem]">
              {{ currentTime.toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' }) }}
            </p>
          </div>

          <div class="divider h-px"></div>

          <div class="flex flex-col gap-[1.2rem]">
            <div v-if="hasShiftToday">
              <button
                v-if="!checkedIn"
                @click="checkIn"
                :disabled="loading"
                class="checkin-btn relative w-full flex items-center justify-center gap-[0.8rem] px-[2rem] py-[1.2rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"/>
                </svg>
                {{ loading ? 'Processing…' : 'Check In' }}
                <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
              </button>

              <button
                v-else
                @click="checkOut"
                :disabled="loading"
                class="checkout-btn w-full flex items-center justify-center gap-[0.8rem] px-[2rem] py-[1.2rem] rounded-[0.8rem] text-[1.2rem] tracking-[0.06em] hover:-translate-y-px transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"/>
                </svg>
                {{ loading ? 'Processing…' : 'Check Out' }}
              </button>
            </div>

            <div v-else class="no-shift flex items-center gap-[1rem] px-[1.6rem] py-[1.2rem] rounded-[0.8rem]">
              <svg class="w-[1.6rem] h-[1.6rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
              </svg>
              <span class="text-[1.2rem]">No shift scheduled today</span>
            </div>

            <div v-if="checkedInAt" class="flex items-center gap-[0.8rem]">
              <span class="w-[0.6rem] h-[0.6rem] rounded-full bg-green-400 animate-pulse flex-shrink-0"></span>
              <span class="text-[1.1rem] text-green-500">Checked in at {{ new Date(checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
            </div>

            <p v-if="error" class="text-[1.1rem] text-red-400 flex items-center gap-[0.6rem]">
              <span>⚠</span> {{ error }}
            </p>
          </div>
        </div>

        <!-- Hours this week -->
        <div class="stat-card rounded-[1.6rem] p-[3rem] flex flex-col justify-between">
          <div class="flex items-start justify-between mb-[2rem]">
            <p class="card-label text-[1rem] tracking-[0.18em] uppercase">This Week</p>
            <div class="icon-badge w-[3.6rem] h-[3.6rem] rounded-[0.8rem] flex items-center justify-center">
              <svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
              </svg>
            </div>
          </div>
          <div>
            <p class="card-value text-[4rem] leading-none tabular-nums mb-[0.6rem]">{{ stats.hoursWorkedWeek.toFixed(1) }}</p>
            <p class="card-sub text-[1.2rem]">hours worked</p>
          </div>
          <div class="mt-[2rem] progress-track h-[0.4rem] rounded-full overflow-hidden">
            <div class="progress-fill h-full rounded-full transition-all duration-700" :style="`width: ${Math.min((stats.hoursWorkedWeek / 40) * 100, 100)}%`"></div>
          </div>
          <p class="card-label text-[1rem] mt-[0.6rem]">of 40hr target</p>
        </div>

        <!-- Hours this month -->
        <div class="stat-card rounded-[1.6rem] p-[3rem] flex flex-col justify-between">
          <div class="flex items-start justify-between mb-[2rem]">
            <p class="card-label text-[1rem] tracking-[0.18em] uppercase">This Month</p>
            <div class="icon-badge w-[3.6rem] h-[3.6rem] rounded-[0.8rem] flex items-center justify-center">
              <svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <div>
            <p class="card-value text-[4rem] leading-none tabular-nums mb-[0.6rem]">{{ stats.hoursWorkedMonth.toFixed(1) }}</p>
            <p class="card-sub text-[1.2rem]">hours worked</p>
          </div>
          <div class="mt-[2rem] progress-track h-[0.4rem] rounded-full overflow-hidden">
            <div class="progress-fill h-full rounded-full transition-all duration-700" :style="`width: ${Math.min((stats.hoursWorkedMonth / 160) * 100, 100)}%`"></div>
          </div>
          <p class="card-label text-[1rem] mt-[0.6rem]">of 160hr target</p>
        </div>

      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-[2rem]">
        <div class="stat-card rounded-[1.6rem] p-[3rem]">
          <div class="mb-[2.4rem]">
            <p class="card-label text-[1rem] tracking-[0.18em] uppercase mb-[0.4rem]">Trend</p>
            <h2 class="page-title text-[1.8rem]">Attendance This Week</h2>
          </div>
          <canvas id="attendanceChart"></canvas>
        </div>

        <div class="stat-card rounded-[1.6rem] p-[3rem]">
          <div class="mb-[2.4rem]">
            <p class="card-label text-[1rem] tracking-[0.18em] uppercase mb-[0.4rem]">Overview</p>
            <h2 class="page-title text-[1.8rem]">Weekly Hours</h2>
          </div>
          <canvas id="weeklyChart"></canvas>
        </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
.page-wrapper { background-color: var(--bg-main); transition: background-color 0.3s ease; }

.blob-1 { background-color: var(--bg-subtle); opacity: 0.5; }
.blob-2 { background-color: var(--bg-subtle); opacity: 0.3; }

.page-label { color: var(--text-light); }
.page-title { color: var(--text-main); }

.stat-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.2s ease;
}
.stat-card:hover { box-shadow: var(--shadow-md); }

.card-label { color: var(--text-light); }
.card-value { color: var(--text-main); }
.card-sub   { color: var(--text-muted); }

.divider { background-color: var(--border); }

.icon-badge {
  background-color: var(--bg-subtle);
  color: var(--text-muted);
}

.progress-track { background-color: var(--bg-subtle); }
.progress-fill  { background-color: var(--primary); }

.checkin-btn {
  background-color: var(--primary);
  box-shadow: 0 0.2rem 0.8rem var(--primary-soft);
}
.checkin-btn:hover {
  background-color: var(--primary-hover);
  box-shadow: var(--shadow-md);
}

.checkout-btn {
  background-color: var(--bg-card);
  border: 1px solid var(--danger);
  color: var(--danger);
}
.checkout-btn:hover {
  background-color: var(--danger-soft);
}

.no-shift {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border);
  color: var(--text-muted);
}

main::-webkit-scrollbar { width: 6px; }
main::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 3px; }
</style>