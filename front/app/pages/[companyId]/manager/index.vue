<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar :items="sidebarItems" />

    <!-- Main content -->
    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <!-- Stats cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div class="bg-white shadow rounded p-4 flex flex-col">
          <span class="text-gray-500">Employees</span>
          <span class="text-2xl font-bold">{{ stats.employees }}</span>
        </div>
        <div class="bg-white shadow rounded p-4 flex flex-col">
          <span class="text-gray-500">Shifts This Week</span>
          <span class="text-2xl font-bold">{{ stats.shiftsThisWeek }}</span>
        </div>
        <div class="bg-white shadow rounded p-4 flex flex-col">
          <span class="text-gray-500">Attendance Today</span>
          <span class="text-2xl font-bold">{{ stats.attendanceToday }}</span>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- Shifts overview chart -->
        <div class="bg-white shadow rounded p-4">
          <h2 class="font-semibold mb-4">Shifts This Month</h2>
          <canvas id="shiftsChart"></canvas>
        </div>

        <!-- Attendance chart -->
        <div class="bg-white shadow rounded p-4">
          <h2 class="font-semibold mb-4">Attendance Overview</h2>
          <canvas id="attendanceChart"></canvas>
        </div>
      </div>

      <!-- Recent shifts table -->
      <div class="bg-white shadow rounded p-4 mt-6">
        <h2 class="font-semibold mb-4">Recent Shifts</h2>
        <table class="w-full border-collapse text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-2 py-1">Employee</th>
              <th class="border px-2 py-1">Date</th>
              <th class="border px-2 py-1">Start</th>
              <th class="border px-2 py-1">End</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="shift in recentShifts" :key="shift.id" class="hover:bg-gray-50">
              <td class="border px-2 py-1">{{ shift.company_user.user.first_name }} {{ shift.company_user.user.last_name }}</td>
              <td class="border px-2 py-1">{{ shift.shift_date }}</td>
              <td class="border px-2 py-1">{{ shift.starts_at }}</td>
              <td class="border px-2 py-1">{{ shift.ends_at }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>


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

// Sidebar
const sidebarItems = [
  { text: 'Home', to: `/${companyId}/manager` },
  { text: 'Company', to: `/${companyId}/manager/company` },
  { text: 'Team', to: `/${companyId}/manager/team` },
  { text: 'Schedule', to: `/${companyId}/manager/schedule` },
  { text: 'Attendance', to: `/${companyId}/manager/attendancy` },
  { text: 'Payrolls', to: `/${companyId}/manager/payrolls` },
  { text: 'Invites', to: `/${companyId}/manager/invite` },
]

// Reactive state
const stats = ref({})
const recentShifts = ref([])
let shiftsChart = null
let attendanceChart = null

// Fetch dashboard data
const fetchDashboard = async () => {
  try {
    const res = await axios.get(`/api/companies/${companyId}/dashboard`)

    stats.value = res.data.stats
    recentShifts.value = res.data.recentShifts

    renderCharts(res.data)
  } catch (e) {
    console.error(e)
  }
}

// Render charts dynamically
const renderCharts = (data) => {

  // Destroy previous charts if they exist
  if (shiftsChart) shiftsChart.destroy()
  if (attendanceChart) attendanceChart.destroy()

  // SHIFTS THIS MONTH (group by week)
  const shiftCounts = [
    data.stats.shiftsThisWeek || 0
  ]

  const ctxShifts = document.getElementById('shiftsChart')
  shiftsChart = new Chart(ctxShifts, {
    type: 'bar',
    data: {
      labels: ['This Week'],
      datasets: [{
        label: 'Shifts',
        data: shiftCounts,
        backgroundColor: '#0B5351'
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  })

  // ATTENDANCE TODAY
  const ctxAttendance = document.getElementById('attendanceChart')
  attendanceChart = new Chart(ctxAttendance, {
    type: 'line',
    data: {
      labels: ['Today'],
      datasets: [{
        label: 'Attendance',
        data: [data.stats.attendanceToday || 0],
        borderColor: '#0B5351',
        fill: true,
        backgroundColor: 'rgba(11,83,81,0.2)'
      }]
    },
    options: { responsive: true }
  })
}

onMounted(fetchDashboard)
</script>


<style scoped>
main::-webkit-scrollbar {
  width: 6px;
}
main::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  border-radius: 3px;
}
</style>
