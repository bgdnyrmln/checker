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
  { text: 'Schedule', to: `/${companyId}/manager/schedule`, children: [{ text: '↳Add Shift', to: `/${companyId}/manager/schedule/add`}]},
  { text: 'Attendance', to: `/${companyId}/manager/attendancy` },
  { text: 'Payrolls', to: `/${companyId}/manager/payrolls` },
  { text: 'Invites', to: `/${companyId}/manager/invite` }
]

/* Axios Defaults */
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* Default Date Range (Current Month) */
const today = new Date()
const formatDate = (d) => d.toISOString().slice(0, 10)
const startDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth(), 2)))
const endDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 1)))

/* State */
const shifts = ref([])
const loading = ref(false)
const error = ref('')

/* Fetch Shifts */
const fetchShifts = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/shifts/company/${companyId}`, {
      params: {
        start_date: startDate.value,
        end_date: endDate.value
      }
    })
    shifts.value = res.data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load shifts'
  } finally {
    loading.value = false
  }
}

/* CSV Export */
const exportCSV = () => {
  if (!shifts.value.length) return

  let csv = 'Employee,Email,Date,Start,End\n'
  shifts.value.forEach(shift => {
    csv += `${shift.company_user.user.first_name} ${shift.company_user.user.last_name},${shift.company_user.user.email},${shift.shift_date},${shift.starts_at},${shift.ends_at}\n`
  })

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `team_shifts_${startDate.value}_${endDate.value}.csv`
  link.click()
}

/* XLS Export */
const exportXLS = () => {
  if (!shifts.value.length) return

  const data = shifts.value.map(shift => ({
    Employee: `${shift.company_user.user.first_name} ${shift.company_user.user.last_name}`,
    Email: shift.company_user.user.email,
    Date: shift.shift_date,
    Start: shift.starts_at,
    End: shift.ends_at
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Team Shifts')
  XLSX.writeFile(wb, `team_shifts_${startDate.value}_${endDate.value}.xlsx`)
}

/* PDF Export */
const exportPDF = () => {
  if (!shifts.value.length) return

  const doc = new jsPDF()
  doc.setFontSize(18)
  doc.text('Team Shifts Report', 14, 20)
  doc.setFontSize(11)
  doc.text(`Period: ${startDate.value} - ${endDate.value}`, 14, 30)

  const rows = shifts.value.map(shift => [
    `${shift.company_user.user.first_name} ${shift.company_user.user.last_name}`,
    shift.company_user.user.email,
    shift.shift_date,
    shift.starts_at,
    shift.ends_at
  ])

  autoTable(doc, {
    head: [['Employee', 'Email', 'Date', 'Start', 'End']],
    body: rows,
    startY: 40
  })

  doc.save(`team_shifts_${startDate.value}_${endDate.value}.pdf`)
}

onMounted(fetchShifts)
</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar :items="sidebarItems" />

    <!-- Main -->
    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">Team Shifts</h1>

      <!-- Date Range + Exports -->
      <div class="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded shadow">
        <span class="font-medium">Date Range:</span>

        <input type="date" v-model="startDate" class="border rounded px-2 py-1" />
        <span>to</span>
        <input type="date" v-model="endDate" class="border rounded px-2 py-1" />

        <button
          @click="fetchShifts"
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
      <p v-if="loading" class="text-gray-500">Loading shifts...</p>
      <p v-if="error" class="text-red-500">{{ error }}</p>

      <!-- Table -->
      <div v-if="shifts.length" class="bg-white shadow rounded p-6">
        <table class="w-full border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-2 py-2">Employee</th>
              <th class="border px-2 py-2">Email</th>
              <th class="border px-2 py-2">Date</th>
              <th class="border px-2 py-2">Start</th>
              <th class="border px-2 py-2">End</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="shift in shifts"
              :key="shift.id"
              class="hover:bg-gray-50"
            >
              <td class="border px-2 py-2">
                {{ shift.company_user.user.first_name }}
                {{ shift.company_user.user.last_name }}
              </td>
              <td class="border px-2 py-2">
                {{ shift.company_user.user.email }}
              </td>
              <td class="border px-2 py-2">
                {{ shift.shift_date }}
              </td>
              <td class="border px-2 py-2">
                {{ shift.starts_at }}
              </td>
              <td class="border px-2 py-2">
                {{ shift.ends_at }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else-if="!loading" class="text-gray-500">
        No shifts available for this range.
      </p>
    </main>
  </div>
</template>
