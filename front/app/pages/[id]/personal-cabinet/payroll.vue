<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar :items="sidebarItems" />

    <!-- Main -->
    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">My Payroll</h1>

      <!-- Date Range + Export -->
      <div class="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded shadow">
        <span class="font-medium">Date Range:</span>

        <input type="date" v-model="startDate" class="border rounded px-2 py-1" />
        <span>to</span>
        <input type="date" v-model="endDate" class="border rounded px-2 py-1" />

        <button
          @click="fetchPayroll"
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

      <p v-if="loading" class="text-gray-500">Calculating payroll...</p>
      <p v-if="error" class="text-red-500">{{ error }}</p>

      <!-- Summary -->
      <div v-if="!loading && payroll" class="bg-white shadow rounded p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <p class="text-gray-500">Total Hours</p>
            <p class="text-2xl font-bold">{{ payroll.totalHours }} hrs</p>
          </div>

          <div>
            <p class="text-gray-500">Hourly Pay</p>
            <p class="text-2xl font-bold">${{ payroll.hourlyPay }}</p>
          </div>

          <div>
            <p class="text-gray-500">Total Pay</p>
            <p class="text-2xl font-bold text-green-600">
              ${{ payroll.totalPay }}
            </p>
          </div>
        </div>

        <!-- Daily Table -->
        <h2 class="font-semibold mb-3">Daily Breakdown</h2>

        <table class="w-full border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-2 py-2">Date</th>
              <th class="border px-2 py-2">Hours</th>
              <th class="border px-2 py-2">Overtime</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d in payroll.daily" :key="d.date" class="hover:bg-gray-50">
              <td class="border px-2 py-2">{{ d.date }}</td>
              <td class="border px-2 py-2">{{ d.hours }}h</td>
              <td class="border px-2 py-2">
                <span v-if="d.hours > 8" class="text-red-600 font-semibold">
                  {{ (d.hours - 8).toFixed(2) }}h
                </span>
                <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else-if="!loading" class="text-gray-500">
        No data available for this range.
      </p>
    </main>
  </div>
</template>

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

/* Sidebar */
const sidebarItems = [
  { text: 'Dashboard', to: `/${profileId}/personal-cabinet` },
  { text: 'Attendance', to: `/${profileId}/personal-cabinet/attendance` },
  { text: 'Payroll', to: `/${profileId}/personal-cabinet/payroll` },
]

/* Axios Setup */
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* Default Month Range */
const today = new Date()
const formatDate = (d) => d.toISOString().slice(0, 10)

const startDate = ref(
  formatDate(new Date(today.getFullYear(), today.getMonth(), 2))
)

const endDate = ref(
  formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 1))
)

const payroll = ref(null)
const loading = ref(false)
const error = ref('')

/* Fetch Payroll */
const fetchPayroll = async () => {
  loading.value = true
  error.value = ''

  try {
    const res = await axios.get(
      `/api/attendance/personal/${profileId}`,
      {
        params: {
          start_date: startDate.value,
          end_date: endDate.value
        }
      }
    )

    const dailyLogs = res.data.daily || []

    const daily = dailyLogs.map(day => ({
      date: day.date,
      hours: parseFloat((day.total_time_seconds / 3600).toFixed(2))
    }))

    const totalHours = daily.reduce((sum, d) => sum + d.hours, 0)
    const hourlyPay = res.data.hourly_pay ?? 0

    payroll.value = {
      totalHours: totalHours.toFixed(2),
      hourlyPay,
      totalPay: (totalHours * hourlyPay).toFixed(2),
      daily
    }

  } catch (e) {
    console.error(e)
    error.value = 'Failed to calculate payroll'
  } finally {
    loading.value = false
  }
}

/* CSV */
const exportCSV = () => {
  if (!payroll.value) return

  let csv = 'Date,Hours,Overtime\n'
  payroll.value.daily.forEach(d => {
    const ot = d.hours > 8 ? (d.hours - 8).toFixed(2) : 0
    csv += `${d.date},${d.hours},${ot}\n`
  })

  csv += `\nTotal Hours,${payroll.value.totalHours}\n`
  csv += `Hourly Pay,${payroll.value.hourlyPay}\n`
  csv += `Total Pay,${payroll.value.totalPay}\n`

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `payroll_${startDate.value}_${endDate.value}.csv`
  link.click()
}

/* XLS */
const exportXLS = () => {
  if (!payroll.value) return

  const data = payroll.value.daily.map(d => ({
    Date: d.date,
    Hours: d.hours,
    Overtime: d.hours > 8 ? (d.hours - 8).toFixed(2) : 0
  }))

  data.push({})
  data.push({ Date: 'Total Hours', Hours: payroll.value.totalHours })
  data.push({ Date: 'Hourly Pay', Hours: payroll.value.hourlyPay })
  data.push({ Date: 'Total Pay', Hours: payroll.value.totalPay })

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Payroll')

  XLSX.writeFile(wb, `payroll_${startDate.value}_${endDate.value}.xlsx`)
}

/* PDF */
const exportPDF = () => {
  if (!payroll.value) return

  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text('Payroll Report', 14, 20)

  doc.setFontSize(11)
  doc.text(`Period: ${startDate.value} - ${endDate.value}`, 14, 30)
  doc.text(`Total Hours: ${payroll.value.totalHours}`, 14, 38)
  doc.text(`Hourly Pay: $${payroll.value.hourlyPay}`, 14, 44)
  doc.text(`Total Pay: $${payroll.value.totalPay}`, 14, 50)

  const rows = payroll.value.daily.map(d => [
    d.date,
    d.hours,
    d.hours > 8 ? (d.hours - 8).toFixed(2) : '-'
  ])

  autoTable(doc, {
    head: [['Date', 'Hours', 'Overtime']],
    body: rows,
    startY: 60
  })

  doc.save(`payroll_${startDate.value}_${endDate.value}.pdf`)
}

onMounted(fetchPayroll)
</script>
