<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

definePageMeta({
  middleware: 'auth-company'
})

const route = useRoute()
const profileId = route.params.id


const sidebarItems = [
  { text: 'Dashboard', to: `/${profileId}/personal-cabinet` },
  { text: 'Attendance', to: `/${profileId}/personal-cabinet/attendance` },
  { text: 'Payroll', to: `/${profileId}/personal-cabinet/payroll` },
  { text: 'Schedule', to: `/${profileId}/personal-cabinet/schedule` }
]

/* Axios Defaults */
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* Default Date Range (Month) */
const today = new Date()
const formatDate = (d) => d.toISOString().slice(0, 10)
const startDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth(), 2)))
const endDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 1)))

/* State */
const attendance = ref(null)
const loading = ref(false)
const error = ref('')

/* Fetch Attendance */
const fetchAttendance = async () => {
  loading.value = true
  error.value = ''

  try {
    const res = await axios.get(`/api/attendance/personal/${profileId}`, {
      params: {
        start_date: startDate.value,
        end_date: endDate.value
      }
    })

    const dailyLogs = res.data.daily || []

    const daily = dailyLogs.map(d => ({
      date: d.date,
      timeIn: d.checked_in_at || '-',
      timeOut: d.checked_out_at || '-',
      hours: parseFloat((d.total_time_seconds / 3600).toFixed(2))
    }))

    const totalHours = daily.reduce((sum, d) => sum + d.hours, 0)

    attendance.value = {
      daily,
      totalHours,
      totalTimeSeconds: res.data.total_time_seconds ?? 0
    }
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load attendance'
  } finally {
    loading.value = false
  }
}

/* CSV Export */
const exportCSV = () => {
  if (!attendance.value) return

  let csv = 'Date,Time In,Time Out,Hours\n'
  attendance.value.daily.forEach(d => {
    csv += `${d.date},${d.timeIn},${d.timeOut},${d.hours}\n`
  })

  csv += `\nTotal Hours,, ,${attendance.value.totalHours}\n`

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `attendance_${startDate.value}_${endDate.value}.csv`
  link.click()
}

/* XLS Export */
const exportXLS = () => {
  if (!attendance.value) return

  const data = attendance.value.daily.map(d => ({
    Date: d.date,
    'Time In': d.timeIn,
    'Time Out': d.timeOut,
    Hours: d.hours
  }))

  data.push({})
  data.push({ Date: 'Total Hours', Hours: attendance.value.totalHours })

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Attendance')
  XLSX.writeFile(wb, `attendance_${startDate.value}_${endDate.value}.xlsx`)
}

/* PDF Export */
const exportPDF = () => {
  if (!attendance.value) return

  const doc = new jsPDF()
  doc.setFontSize(18)
  doc.text('Attendance Report', 14, 20)
  doc.setFontSize(11)
  doc.text(`Period: ${startDate.value} - ${endDate.value}`, 14, 30)
  doc.text(`Total Hours: ${attendance.value.totalHours}`, 14, 36)

  const rows = attendance.value.daily.map(d => [d.date, d.timeIn, d.timeOut, d.hours])
  autoTable(doc, { head: [['Date', 'Time In', 'Time Out', 'Hours']], body: rows, startY: 45 })
  doc.save(`attendance_${startDate.value}_${endDate.value}.pdf`)
}

onMounted(fetchAttendance)
</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar :items="sidebarItems" />

    <!-- Main -->
    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">My Attendance</h1>

      <!-- Date Range + Exports -->
      <div class="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded shadow">
        <span class="font-medium">Date Range:</span>

        <input type="date" v-model="startDate" class="border rounded px-2 py-1" />
        <span>to</span>
        <input type="date" v-model="endDate" class="border rounded px-2 py-1" />

        <button
          @click="fetchAttendance"
          class="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
        >
          Calculate
        </button>

        <div class="flex gap-2 ml-auto">
          <button @click="exportCSV" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
            CSV
          </button>

          <button @click="exportXLS" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
            XLS
          </button>

          <button @click="exportPDF" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
            PDF
          </button>
        </div>
      </div>

      <!-- Loading / Error -->
      <p v-if="loading" class="text-gray-500">Loading attendance...</p>
      <p v-if="error" class="text-red-500">{{ error }}</p>

      <!-- Table -->
      <div v-if="attendance && attendance.daily.length" class="bg-white shadow rounded p-6">
        <table class="w-full border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-2 py-2">Date</th>
              <th class="border px-2 py-2">Time In</th>
              <th class="border px-2 py-2">Time Out</th>
              <th class="border px-2 py-2">Hours</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d in attendance.daily" :key="d.date" class="hover:bg-gray-50">
              <td class="border px-2 py-2">{{ d.date }}</td>
              <td class="border px-2 py-2">{{ d.timeIn }}</td>
              <td class="border px-2 py-2">{{ d.timeOut }}</td>
              <td class="border px-2 py-2">{{ d.hours }}h</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="bg-gray-100 font-bold">
              <td colspan="3" class="border px-2 py-2 text-right">Total Hours:</td>
              <td class="border px-2 py-2">{{ attendance.totalHours }}h</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p v-else-if="!loading" class="text-gray-500">No attendance data available for this range.</p>
    </main>
  </div>
</template>
