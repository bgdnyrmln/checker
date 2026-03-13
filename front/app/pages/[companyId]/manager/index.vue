<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Chart from 'chart.js/auto'

definePageMeta({
  middleware: 'auth-company',
  requiresManager: true
})

const route = useRoute()
const companyId = route.params.companyId

const { isDark } = useTheme()

const sidebarItems = [
  { text: 'Home',        to: `/${companyId}/manager` },
  { text: 'Company',     to: `/${companyId}/manager/company` },
  { text: 'Team',        to: `/${companyId}/manager/team` },
  { text: 'Schedule',    to: `/${companyId}/manager/schedule` },
  { text: 'Attendance',  to: `/${companyId}/manager/attendancy` },
  { text: 'Payrolls',    to: `/${companyId}/manager/payrolls` },
  { text: 'Invites',     to: `/${companyId}/manager/invite` },
  { text: 'Holidays',    to: `/${companyId}/manager/holidays` },
  { text: 'Sick Leaves', to: `/${companyId}/manager/sick-leaves` },
]

const stats        = ref({})
const recentShifts = ref([])
let shiftsChart     = null
let attendanceChart = null

const getChartColors = () => ({
  border:    isDark.value ? '#6b7280' : '#6b7280',
  fill:      isDark.value ? 'rgba(107,114,128,0.12)' : 'rgba(107,114,128,0.08)',
  bar:       isDark.value ? 'rgba(107,114,128,0.25)' : 'rgba(107,114,128,0.15)',
  barHover:  isDark.value ? 'rgba(107,114,128,0.4)'  : 'rgba(107,114,128,0.25)',
  barBorder: isDark.value ? '#6b7280' : '#9ca3af',
  grid:      isDark.value ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
  ticks:     isDark.value ? '#4b5563' : '#9ca3af',
})

const renderCharts = (data) => {
  if (shiftsChart)     shiftsChart.destroy()
  if (attendanceChart) attendanceChart.destroy()

  const c = getChartColors()
  const baseOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: c.grid }, ticks: { color: c.ticks, font: { size: 11 } }, border: { color: c.grid } },
      y: { grid: { color: c.grid }, ticks: { color: c.ticks, font: { size: 11 } }, border: { color: c.grid } }
    }
  }

  shiftsChart = new Chart(document.getElementById('shiftsChart'), {
    type: 'bar',
    data: {
      labels: ['This Week'],
      datasets: [{
        label: 'Shifts',
        data: [data.stats.shiftsThisWeek || 0],
        backgroundColor: c.bar,
        borderColor: c.barBorder,
        borderWidth: 1.5,
        borderRadius: 6,
        hoverBackgroundColor: c.barHover,
      }]
    },
    options: baseOptions
  })

  attendanceChart = new Chart(document.getElementById('attendanceChart'), {
    type: 'line',
    data: {
      labels: ['Today'],
      datasets: [{
        label: 'Attendance',
        data: [data.stats.attendanceToday || 0],
        borderColor: c.border,
        backgroundColor: c.fill,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: c.border,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      }]
    },
    options: baseOptions
  })
}

const fetchDashboard = async () => {
  try {
    const res = await axios.get(`/api/companies/${companyId}/dashboard`)
    stats.value        = res.data.stats
    recentShifts.value = res.data.recentShifts
    renderCharts(res.data)
  } catch (e) {
    console.error(e)
  }
}

onMounted(fetchDashboard)
</script>

<template>
  <div class="page-wrapper flex min-h-screen">
    <Sidebar :items="sidebarItems" />

    <div class="flex-1 pl-[22rem] relative overflow-hidden">
      <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>
      <div class="blob blob-2 absolute bottom-[-8rem] left-[10rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none"></div>

      <main class="p-[4rem] relative z-10 max-w-[120rem] mx-auto">

        <!-- Page header -->
        <div class="mb-[4rem]">
          <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]">Manager Panel</p>
          <h1 class="page-title text-[3.6rem] leading-none tracking-wide">Dashboard</h1>
        </div>

        <!-- ── Stat cards ───────────────────────────────────────────── -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-[2rem] mb-[3.2rem]">

          <!-- Employees -->
          <div class="stat-card rounded-[1.6rem] p-[3rem] flex flex-col justify-between">
            <div class="flex items-start justify-between mb-[2rem]">
              <p class="card-label text-[1rem] tracking-[0.18em] uppercase">Employees</p>
              <div class="icon-badge w-[3.6rem] h-[3.6rem] rounded-[0.8rem] flex items-center justify-center">
                <svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
                </svg>
              </div>
            </div>
            <div>
              <p class="card-value text-[4.8rem] leading-none tabular-nums mb-[0.4rem]">{{ stats.employees ?? '—' }}</p>
              <p class="card-sub text-[1.2rem]">total members</p>
            </div>
          </div>

          <!-- Shifts This Week -->
          <div class="stat-card rounded-[1.6rem] p-[3rem] flex flex-col justify-between">
            <div class="flex items-start justify-between mb-[2rem]">
              <p class="card-label text-[1rem] tracking-[0.18em] uppercase">Shifts This Week</p>
              <div class="icon-badge w-[3.6rem] h-[3.6rem] rounded-[0.8rem] flex items-center justify-center">
                <svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
                </svg>
              </div>
            </div>
            <div>
              <p class="card-value text-[4.8rem] leading-none tabular-nums mb-[0.4rem]">{{ stats.shiftsThisWeek ?? '—' }}</p>
              <p class="card-sub text-[1.2rem]">scheduled shifts</p>
            </div>
            <div class="mt-[2rem] progress-track h-[0.4rem] rounded-full overflow-hidden">
              <div class="progress-fill h-full rounded-full transition-all duration-700"
                :style="`width: ${Math.min(((stats.shiftsThisWeek ?? 0) / 50) * 100, 100)}%`">
              </div>
            </div>
            <p class="card-label text-[1rem] mt-[0.6rem]">of 50 shift target</p>
          </div>

          <!-- Attendance Today -->
          <div class="stat-card rounded-[1.6rem] p-[3rem] flex flex-col justify-between">
            <div class="flex items-start justify-between mb-[2rem]">
              <p class="card-label text-[1rem] tracking-[0.18em] uppercase">Attendance Today</p>
              <div class="icon-badge w-[3.6rem] h-[3.6rem] rounded-[0.8rem] flex items-center justify-center">
                <svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div>
              <p class="card-value text-[4.8rem] leading-none tabular-nums mb-[0.4rem]">{{ stats.attendanceToday ?? '—' }}</p>
              <p class="card-sub text-[1.2rem]">checked in</p>
            </div>
            <div class="mt-[2rem] progress-track h-[0.4rem] rounded-full overflow-hidden">
              <div class="progress-fill h-full rounded-full transition-all duration-700"
                :style="`width: ${stats.employees ? Math.min(((stats.attendanceToday ?? 0) / stats.employees) * 100, 100) : 0}%`">
              </div>
            </div>
            <p class="card-label text-[1rem] mt-[0.6rem]">
              {{ stats.employees ? `of ${stats.employees} employees` : 'no data' }}
            </p>
          </div>

        </div>

        <!-- ── Charts ───────────────────────────────────────────────── -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-[2rem] mb-[3.2rem]">

          <div class="stat-card rounded-[1.6rem] p-[3rem]">
            <div class="mb-[2.4rem]">
              <p class="card-label text-[1rem] tracking-[0.18em] uppercase mb-[0.4rem]">Overview</p>
              <h2 class="page-title text-[1.8rem]">Shifts This Month</h2>
            </div>
            <canvas id="shiftsChart"></canvas>
          </div>

          <div class="stat-card rounded-[1.6rem] p-[3rem]">
            <div class="mb-[2.4rem]">
              <p class="card-label text-[1rem] tracking-[0.18em] uppercase mb-[0.4rem]">Overview</p>
              <h2 class="page-title text-[1.8rem]">Attendance Today</h2>
            </div>
            <canvas id="attendanceChart"></canvas>
          </div>

        </div>

        <!-- ── Recent shifts table ──────────────────────────────────── -->
        <div class="table-card rounded-[1.6rem] overflow-hidden">

          <div class="table-summary flex items-center justify-between px-[3rem] py-[2rem]">
            <div>
              <p class="card-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Recent Shifts</p>
              <p class="table-text text-[1.4rem]">{{ recentShifts.length }} {{ recentShifts.length === 1 ? 'entry' : 'entries' }}</p>
            </div>
            <NuxtLink
              :to="`/${companyId}/manager/schedule`"
              class="view-all-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[0.8rem] rounded-[0.8rem] text-[1.1rem] font-medium transition-all duration-200 no-underline"
            >
              View All
              <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </NuxtLink>
          </div>

          <table class="w-full">
            <thead>
              <tr class="table-head-row">
                <th class="card-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Employee</th>
                <th class="card-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Date</th>
                <th class="card-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Start</th>
                <th class="card-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">End</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(shift, i) in recentShifts"
                :key="shift.id"
                class="table-row"
                :class="i % 2 === 0 ? 'row-even' : 'row-odd'"
              >
                <td class="px-[3rem] py-[1.6rem]">
                  <div class="flex items-center gap-[1.2rem]">
                    <div class="emp-avatar w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center text-[1.1rem] text-white flex-shrink-0">
                      {{ shift.company_user.user.first_name?.[0]?.toUpperCase() }}
                    </div>
                    <span class="table-text text-[1.3rem]">
                      {{ shift.company_user.user.first_name }} {{ shift.company_user.user.last_name }}
                    </span>
                  </div>
                </td>
                <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums">{{ shift.shift_date }}</td>
                <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums">{{ shift.starts_at }}</td>
                <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums">{{ shift.ends_at }}</td>
              </tr>

              <tr v-if="!recentShifts.length">
                <td colspan="4" class="px-[3rem] py-[6rem] text-center">
                  <div class="flex flex-col items-center gap-[1.4rem]">
                    <div class="icon-badge w-[5.4rem] h-[5.4rem] rounded-[1.2rem] flex items-center justify-center mx-auto">
                      <svg class="w-[2.4rem] h-[2.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
                      </svg>
                    </div>
                    <p class="card-sub text-[1.3rem] tracking-[0.06em]">No shifts found.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>

      </main>
    </div>
  </div>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────────────── */
.page-wrapper { background-color: var(--bg-main); transition: background-color 0.3s ease; }
.blob-1 { background-color: var(--bg-subtle); opacity: 0.5; }
.blob-2 { background-color: var(--bg-subtle); opacity: 0.3; }

/* ── Typography ──────────────────────────────────────────────────────── */
.page-label  { color: var(--text-light); }
.page-title  { color: var(--text-main); }
.card-label  { color: var(--text-light); }
.card-value  { color: var(--text-main); }
.card-sub    { color: var(--text-muted); }
.table-text  { color: var(--text-main); }

/* ── Stat cards ──────────────────────────────────────────────────────── */
.stat-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease, background-color 0.3s ease, border-color 0.3s ease;
}
.stat-card:hover { box-shadow: var(--shadow-md); }

.icon-badge {
  background-color: var(--bg-subtle);
  color: var(--text-muted);
}

.progress-track { background-color: var(--bg-subtle); }
.progress-fill  { background-color: var(--primary); }

/* ── Table card ──────────────────────────────────────────────────────── */
.table-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}
.table-summary  { border-bottom: 1px solid var(--border); }
.table-head-row { border-bottom: 1px solid var(--border); }
.table-row { border-bottom: 1px solid var(--border); transition: background-color 0.15s ease; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background-color: var(--bg-subtle); }
.row-even { background-color: var(--bg-card); }
.row-odd  { background-color: color-mix(in srgb, var(--bg-subtle) 40%, transparent); }

.emp-avatar { background-color: var(--primary); }

/* ── View All link ──────────────────────────────────────────────────── */
.view-all-btn {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border-hover);
  color: var(--text-muted);
}
.view-all-btn:hover {
  border-color: var(--primary);
  color: var(--text-main);
}

main::-webkit-scrollbar { width: 6px; }
main::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 3px; }
</style>