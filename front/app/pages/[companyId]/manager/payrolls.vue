<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar :items="sidebarItems" />

    <!-- Main content -->
    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">Payroll Calculator</h1>

      <!-- Date range picker -->
      <div class="flex items-center gap-4 mb-6">
        <span class="font-medium">Select Date Range:</span>
        <input type="date" v-model="startDate" class="border rounded px-2 py-1" />
        <span>to</span>
        <input type="date" v-model="endDate" class="border rounded px-2 py-1" />
        <button @click="fetchEmployeesTime" class="bg-black text-white px-4 py-1 rounded hover:bg-gray-800">
          Refresh
        </button>
        <button @click="exportCSV" class="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
          Export CSV
        </button>
      </div>

      <!-- Loading / error -->
      <p v-if="loading" class="text-gray-500">Loading payrolls...</p>
      <p v-if="error" class="text-red-500">{{ error }}</p>

      <!-- Payroll table -->
      <div v-if="!loading && payrolls.length">
        <table class="w-full border-collapse border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-2 py-1">Employee</th>
              <th class="border px-2 py-1">Email</th>
              <th class="border px-2 py-1">Hours Worked</th>
              <th class="border px-2 py-1">Hourly Pay</th>
              <th class="border px-2 py-1">Total Pay</th>
              <th class="border px-2 py-1">Daily Breakdown</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in payrolls" :key="p.id" class="hover:bg-gray-50">
              <td class="border px-2 py-1">{{ p.name }}</td>
              <td class="border px-2 py-1">{{ p.email }}</td>
              <td class="border px-2 py-1">{{ p.hoursWorked }}</td>
              <td class="border px-2 py-1">{{ p.hourlyPay }}</td>
              <td class="border px-2 py-1">{{ p.totalPay }}</td>
              <td class="border px-2 py-1">
                <ul>
                  <li v-for="d in p.daily" :key="d.date" :class="{ 'text-red-600': d.hours > 8 }">
                    {{ d.date }}: {{ d.hours }}h
                    <span v-if="d.hours > 8">(OT)</span>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else-if="!loading">No data available for this range.</p>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

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

// State
const employees = ref([])
const loading = ref(false)
const error = ref('')
const startDate = ref(new Date().toISOString().slice(0, 10))
const endDate = ref(new Date().toISOString().slice(0, 10))

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Fetch employee time logs
const fetchEmployeesTime = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/attendance/team/employees/${companyId}`, {
      params: {
        start_date: startDate.value,
        end_date: endDate.value,
      }
    })
    employees.value = res.data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to fetch employees'
  } finally {
    loading.value = false
  }
}

// Compute payrolls with daily breakdown and overtime
const payrolls = computed(() => {
  return employees.value.map(emp => {
    const daily = emp.daily.map(day => {
      const hours = day.total_time_seconds / 3600
      return { date: day.date, hours: hours.toFixed(2) }
    })
    const totalHours = daily.reduce((sum, d) => sum + parseFloat(d.hours), 0)
    const hourlyPay = emp.hourly_pay ?? 0
    return {
      id: emp.id,
      name: emp.first_name + ' ' + emp.last_name,
      email: emp.email,
      hoursWorked: totalHours.toFixed(2),
      hourlyPay,
      totalPay: (totalHours * hourlyPay).toFixed(2),
      daily
    }
  })
})

// CSV Export
const exportCSV = () => {
  if (!payrolls.value.length) return
  let csv = 'Name,Email,Hours Worked,Hourly Pay,Total Pay,Date,Daily Hours\n'
  payrolls.value.forEach(p => {
    p.daily.forEach(d => {
      csv += `${p.name},${p.email},${p.hoursWorked},${p.hourlyPay},${p.totalPay},${d.date},${d.hours}\n`
    })
  })
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', `payroll_${startDate.value}_${endDate.value}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Initial fetch
onMounted(() => {
  fetchEmployeesTime()
})
</script>

<style scoped>
main::-webkit-scrollbar {
  width: 6px;
}
main::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  border-radius: 3px;
}
.text-red-600 {
  font-weight: bold;
}
</style>
