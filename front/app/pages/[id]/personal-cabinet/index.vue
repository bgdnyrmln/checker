<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Chart from 'chart.js/auto'

definePageMeta({
  middleware: 'auth-company'
})

const route = useRoute()
const profileId = route.params.id

const sidebarItems = [
  { text: 'Dashboard', to: `/${profileId}/personal-cabinet` },
  { text: 'Attendance', to: `/${profileId}/personal-cabinet/attendance` },
  { text: 'Payroll', to: `/${profileId}/personal-cabinet/payroll` },
]

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* STATE */
const checkedIn = ref(false)
const checkedInAt = ref(null)
const hasShiftToday = ref(false)
const loading = ref(false)
const error = ref('')
const stats = ref({
  hoursWorkedToday: 0,
  hoursWorkedWeek: 0,
  hoursWorkedMonth: 0,
})

let attendanceChart = null
let weeklyChart = null

/* ----------------------------------
   CURRENT TIME (Tick Every Second)
-----------------------------------*/
const currentTime = ref(new Date())
let tickInterval = null

onMounted(() => {
  tickInterval = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(tickInterval)
})

/* ----------------------------------
   HELPER FUNCTIONS
-----------------------------------*/
const formatDate = (date) => date.toISOString().slice(0, 10)

const getWeekRange = () => {
  const today = new Date()
  const day = today.getDay() || 7
  const start = new Date(today)
  start.setDate(today.getDate() - day + 1)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return { start_date: formatDate(start), end_date: formatDate(end) }
}

const getMonthRange = () => {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), 1)
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  return { start_date: formatDate(start), end_date: formatDate(end) }
}

/* CSRF */
const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie
      .split('; ')
      .find(c => c.startsWith('XSRF-TOKEN='))
      ?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

/* FETCH STATUS */
const fetchStatus = async () => {
  try {
    const res = await axios.get(`/api/attendance/status/${profileId}`)
    checkedIn.value = res.data.checked_in
    checkedInAt.value = res.data.checked_in_at
  } catch (e) {
    console.error(e)
  }
}

const fetchShiftStatus = async () => {
  try {
    const res = await axios.get(`/api/attendance/has-shift/${profileId}`)
    hasShiftToday.value = res.data.has_shift
  } catch (e) {
    hasShiftToday.value = false
  }
}

/* FETCH STATS */
const fetchStats = async () => {
  try {
    const weekRange = getWeekRange()
    const weekRes = await axios.get(`/api/attendance/personal/${profileId}`, { params: weekRange })
    const weekDaily = weekRes.data.daily || []

    const todayStr = formatDate(new Date())
    const todayLog = weekDaily.find(d => d.date === todayStr)
    stats.value.hoursWorkedToday = todayLog?.total_time_seconds ? todayLog.total_time_seconds / 3600 : 0

    const weekSeconds = weekDaily.reduce((sum, d) => sum + (d.total_time_seconds || 0), 0)
    stats.value.hoursWorkedWeek = weekSeconds / 3600

    const monthRange = getMonthRange()
    const monthRes = await axios.get(`/api/attendance/personal/${profileId}`, { params: monthRange })
    const monthDaily = monthRes.data.daily || []
    const monthSeconds = monthDaily.reduce((sum, d) => sum + (d.total_time_seconds || 0), 0)
    stats.value.hoursWorkedMonth = monthSeconds / 3600

    await nextTick()
    renderCharts(weekDaily)
  } catch (e) {
    console.error(e)
  }
}

/* CHECK IN / OUT */
const checkIn = async () => {
  loading.value = true
  try {
    await getCsrfToken()
    await axios.post(`/api/attendance/check-in/${profileId}`)
    await fetchStatus()
    await fetchStats()
  } catch (e) {
    error.value = e.response?.data?.message || 'Check-in failed'
  } finally {
    loading.value = false
  }
}

const checkOut = async () => {
  loading.value = true
  try {
    await getCsrfToken()
    await axios.post(`/api/attendance/check-out/${profileId}`)
    await fetchStatus()
    await fetchStats()
  } catch (e) {
    error.value = e.response?.data?.message || 'Check-out failed'
  } finally {
    loading.value = false
  }
}

/* CHARTS */
const renderCharts = (dailyLogs) => {
  const labels = dailyLogs.map(d => d.date)
  const hours = dailyLogs.map(d => (d.total_time_seconds / 3600).toFixed(2))

  if (attendanceChart) attendanceChart.destroy()
  if (weeklyChart) weeklyChart.destroy()

  attendanceChart = new Chart(document.getElementById('attendanceChart'), {
    type: 'line',
    data: { labels, datasets: [{ label: 'Hours Worked', data: hours, borderColor: '#0B5351', backgroundColor: 'rgba(11,83,81,0.2)', fill: true, tension: 0.3 }] }
  })

  weeklyChart = new Chart(document.getElementById('weeklyChart'), {
    type: 'bar',
    data: { labels, datasets: [{ label: 'Hours', data: hours, backgroundColor: '#0B5351' }] }
  })
}

/* INIT */
onMounted(async () => {
  await fetchStatus()
  await fetchShiftStatus()
  await fetchStats()
})
</script>



<template>
  <Sidebar :items="sidebarItems" />
  <div class="flex min-h-screen pl-[16rem]">

    <main class="flex-1 p-6 bg-gray-50">
      <!-- Attendance card -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div class="bg-white shadow rounded p-4 flex flex-col items-center justify-center">
          <span class="text-gray-500 mb-2">{{ currentTime.toLocaleString() }}</span>


          <!-- Check in/out button -->
          <div v-if="hasShiftToday">
            <button
              v-if="!checkedIn"
              @click="checkIn"
              class="w-full bg-black text-white py-2 rounded mb-2 px-4"
              :disabled="loading || !hasShiftToday"
            >
              Check In
            </button>
            <button
              v-else
              @click="checkOut"
              class="w-full bg-red-600 text-white py-2 rounded mb-2 px-4"
              :disabled="loading"
            >
              Check Out
            </button>
            </div>
          <div v-else class="text-center">
             <span class="text-gray-500 mb-2">No shift scheduled for today</span>
          </div>

            <p v-if="checkedInAt" class="text-green-600 text-sm">
              Checked in at: {{ new Date(checkedInAt).toLocaleTimeString() }}
            </p>
        </div>

        <div class="bg-white shadow rounded p-4 flex flex-col items-center justify-center">
          <span class="text-gray-500 mb-2">Hours This Week</span>
          <span class="text-2xl font-bold">{{ stats.hoursWorkedWeek.toFixed(2) }} hrs</span>
        </div>

        <div class="bg-white shadow rounded p-4 flex flex-col items-center justify-center">
          <span class="text-gray-500 mb-2">Hours This Month</span>
          <span class="text-2xl font-bold">{{ stats.hoursWorkedMonth.toFixed(2) }} hrs</span>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="bg-white shadow rounded p-4">
          <h2 class="font-semibold mb-4">Attendance This Week</h2>
          <canvas id="attendanceChart"></canvas>
        </div>

        <div class="bg-white shadow rounded p-4">
          <h2 class="font-semibold mb-4">Weekly Hours Overview</h2>
          <canvas id="weeklyChart"></canvas>
        </div>
      </div>
    </main>
  </div>
</template>


<style scoped>
main::-webkit-scrollbar {
  width: 6px;
}
main::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  border-radius: 3px;
}
</style>
