<script setup>
import { ref, onMounted } from 'vue'
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
  { text: 'Invites', to: `/${companyId}/manager/invite` }
]

/* Axios Defaults */
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* Default Date Range (Month) */
const today = new Date()
const formatDate = (d) => d.toISOString().slice(0, 10)
const startDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth(), 2)))
const endDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)))

/* State */
const employees = ref([])
const loading = ref(false)
const error = ref('')

/* Fetch Team Attendance */
const fetchEmployeesAttendance = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/attendance/team/employees/${companyId}`, {
      params: {
        start_date: startDate.value,
        end_date: endDate.value
      }
    })
    employees.value = res.data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load attendance'
  } finally {
    loading.value = false
  }
}

/* CSV Export */
const exportCSV = () => {
  if (!employees.value.length) return

  let csv = 'Employee,Email,Date,Time In,Time Out,Hours\n'
  employees.value.forEach(emp => {
    emp.daily.forEach(d => {
      const hours = (d.total_time_seconds / 3600).toFixed(2)
      csv += `${emp.first_name} ${emp.last_name},${emp.email},${d.date},${d.checked_in_at || '-'},${d.checked_out_at || '-'},${hours}\n`
    })
  })

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `team_attendance_${startDate.value}_${endDate.value}.csv`
  link.click()
}

/* XLS Export */
const exportXLS = () => {
  if (!employees.value.length) return

  const data = []
  employees.value.forEach(emp => {
    emp.daily.forEach(d => {
      data.push({
        Employee: `${emp.first_name} ${emp.last_name}`,
        Email: emp.email,
        Date: d.date,
        'Time In': d.checked_in_at || '-',
        'Time Out': d.checked_out_at || '-',
        Hours: (d.total_time_seconds / 3600).toFixed(2)
      })
    })
  })

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Team Attendance')
  XLSX.writeFile(wb, `team_attendance_${startDate.value}_${endDate.value}.xlsx`)
}

/* PDF Export */
const exportPDF = () => {
  if (!employees.value.length) return

  const doc = new jsPDF()
  doc.setFontSize(18)
  doc.text('Team Attendance Report', 14, 20)
  doc.setFontSize(11)
  doc.text(`Period: ${startDate.value} - ${endDate.value}`, 14, 30)

  const rows = []
  employees.value.forEach(emp => {
    emp.daily.forEach(d => {
      rows.push([
        `${emp.first_name} ${emp.last_name}`,
        emp.email,
        d.date,
        d.checked_in_at || '-',
        d.checked_out_at || '-',
        (d.total_time_seconds / 3600).toFixed(2)
      ])
    })
  })

  autoTable(doc, {
    head: [['Employee', 'Email', 'Date', 'Time In', 'Time Out', 'Hours']],
    body: rows,
    startY: 40
  })

  doc.save(`team_attendance_${startDate.value}_${endDate.value}.pdf`)
}

onMounted(fetchEmployeesAttendance)
</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar :items="sidebarItems" />

    <!-- Main -->
    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">Team Attendance</h1>

      <!-- Date Range + Exports -->
      <div class="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded shadow">
        <span class="font-medium">Date Range:</span>

        <input type="date" v-model="startDate" class="border rounded px-2 py-1" />
        <span>to</span>
        <input type="date" v-model="endDate" class="border rounded px-2 py-1" />

        <button
          @click="fetchEmployeesAttendance"
          class="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
        >
          Calculate
        </button>

        <div class="flex gap-2 ml-auto">
          <button @click="exportCSV" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">CSV</button>
          <button @click="exportXLS" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">XLS</button>
          <button @click="exportPDF" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">PDF</button>
        </div>
      </div>

      <!-- Loading / Error -->
      <p v-if="loading" class="text-gray-500">Loading attendance...</p>
      <p v-if="error" class="text-red-500">{{ error }}</p>

      <!-- Table -->
      <div v-if="employees.length" class="bg-white shadow rounded p-6">
        <table class="w-full border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-2 py-2">Employee</th>
              <th class="border px-2 py-2">Email</th>
              <th class="border px-2 py-2">Date</th>
              <th class="border px-2 py-2">Time In</th>
              <th class="border px-2 py-2">Time Out</th>
              <th class="border px-2 py-2">Hours</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="emp in employees" :key="emp.id">
              <tr v-for="d in emp.daily" :key="d.date" class="hover:bg-gray-50">
                <td class="border px-2 py-2">{{ emp.first_name }} {{ emp.last_name }}</td>
                <td class="border px-2 py-2">{{ emp.email }}</td>
                <td class="border px-2 py-2">{{ d.date }}</td>
                <td class="border px-2 py-2">{{ d.checked_in_at || '-' }}</td>
                <td class="border px-2 py-2">{{ d.checked_out_at || '-' }}</td>
                <td class="border px-2 py-2">{{ (d.total_time_seconds / 3600).toFixed(2) }}h</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <p v-else-if="!loading" class="text-gray-500">No attendance data available for this range.</p>
    </main>
  </div>
</template>
