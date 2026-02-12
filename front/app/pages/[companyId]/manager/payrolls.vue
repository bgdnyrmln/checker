<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

definePageMeta({
  middleware: 'auth-company',
  requiresManager: true
})

const route = useRoute()
const companyId = route.params.companyId

/* Sidebar */
const sidebarItems = [
  { text: 'Home', to: `/${companyId}/manager` },
  { text: 'Company', to: `/${companyId}/manager/company` },
  { text: 'Team', to: `/${companyId}/manager/team` },
  { text: 'Schedule', to: `/${companyId}/manager/schedule` },
  { text: 'Attendance', to: `/${companyId}/manager/attendancy` },
  { text: 'Payrolls', to: `/${companyId}/manager/payrolls` },
  { text: 'Invites', to: `/${companyId}/manager/invite` },
]

/* State */
const employees = ref([])
const loading = ref(false)
const error = ref('')

const today = new Date()
const formatDate = (d) => d.toISOString().slice(0, 10)
const startDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth(), 2)))
const endDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 1)))

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* Fetch employee time logs */
const fetchEmployeesTime = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/attendance/team/employees/${companyId}`, {
      params: { start_date: startDate.value, end_date: endDate.value }
    })
    employees.value = res.data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to fetch employees'
  } finally {
    loading.value = false
  }
}

/* Compute payrolls */
const payrolls = computed(() => {
  return employees.value.map(emp => {
    const daily = emp.daily.map(day => {
      const hours = day.total_time_seconds / 3600
      return { date: day.date, hours: parseFloat(hours.toFixed(2)) }
    })
    const totalHours = daily.reduce((sum, d) => sum + d.hours, 0)
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

/* CSV Export */
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

/* XLS Export */
const exportXLS = () => {
  if (!payrolls.value.length) return
  const data = []
  payrolls.value.forEach(p => {
    p.daily.forEach(d => {
      data.push({
        Name: p.name,
        Email: p.email,
        'Hours Worked': p.hoursWorked,
        'Hourly Pay': p.hourlyPay,
        'Total Pay': p.totalPay,
        Date: d.date,
        'Daily Hours': d.hours
      })
    })
  })
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Payrolls')
  XLSX.writeFile(wb, `payroll_${startDate.value}_${endDate.value}.xlsx`)
}

/* PDF Export */
const exportPDF = () => {
  if (!payrolls.value.length) return
  const doc = new jsPDF()
  doc.setFontSize(18)
  doc.text('Team Payroll Report', 14, 20)
  doc.setFontSize(11)
  doc.text(`Period: ${startDate.value} - ${endDate.value}`, 14, 30)

  payrolls.value.forEach((p, idx) => {
    const startY = 40 + idx * 60
    doc.setFontSize(14)
    doc.text(`${p.name} (${p.email})`, 14, startY)
    doc.setFontSize(11)
    doc.text(`Total Hours: ${p.hoursWorked} | Hourly Pay: $${p.hourlyPay} | Total Pay: $${p.totalPay}`, 14, startY + 6)

    const rows = p.daily.map(d => [d.date, d.hours, d.hours > 8 ? 'OT' : '-'])
    autoTable(doc, {
      head: [['Date', 'Hours', 'Overtime']],
      body: rows,
      startY: startY + 12,
      margin: { left: 14 },
      theme: 'grid'
    })
  })

  doc.save(`payroll_${startDate.value}_${endDate.value}.pdf`)
}

/* Initial fetch */
onMounted(fetchEmployeesTime)
</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar :items="sidebarItems" />

    <!-- Main content -->
    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">Team Payrolls</h1>

      <!-- Date Range + Exports -->
      <div class="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded shadow">
        <span class="font-medium">Date Range:</span>
        <input type="date" v-model="startDate" class="border rounded px-2 py-1" />
        <span>to</span>
        <input type="date" v-model="endDate" class="border rounded px-2 py-1" />
        <button @click="fetchEmployeesTime" class="bg-black text-white px-4 py-1 rounded hover:bg-gray-800">Refresh</button>

        <div class="flex gap-2 ml-auto">
          <button @click="exportCSV" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">CSV</button>
          <button @click="exportXLS" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">XLS</button>
          <button @click="exportPDF" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">PDF</button>
        </div>
      </div>

      <!-- Loading / Error -->
      <p v-if="loading" class="text-gray-500">Loading payrolls...</p>
      <p v-if="error" class="text-red-500">{{ error }}</p>

      <!-- Payroll Table -->
      <div v-if="!loading && payrolls.length" class="bg-white shadow rounded p-6">
        <table class="w-full border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-2 py-2">Employee</th>
              <th class="border px-2 py-2">Email</th>
              <th class="border px-2 py-2">Hours Worked</th>
              <th class="border px-2 py-2">Hourly Pay</th>
              <th class="border px-2 py-2">Total Pay</th>
              <th class="border px-2 py-2">Daily Breakdown</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in payrolls" :key="p.id" class="hover:bg-gray-50">
              <td class="border px-2 py-2">{{ p.name }}</td>
              <td class="border px-2 py-2">{{ p.email }}</td>
              <td class="border px-2 py-2">{{ p.hoursWorked }}</td>
              <td class="border px-2 py-2">{{ p.hourlyPay }}</td>
              <td class="border px-2 py-2">{{ p.totalPay }}</td>
              <td class="border px-2 py-2">
                <ul>
                  <li v-for="d in p.daily" :key="d.date" :class="{ 'text-red-600': d.hours > 8 }">
                    {{ d.date }}: {{ d.hours }}h <span v-if="d.hours > 8">(OT)</span>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else-if="!loading" class="text-gray-500">No data available for this range.</p>
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
.text-red-600 {
  font-weight: bold;
}
</style>
