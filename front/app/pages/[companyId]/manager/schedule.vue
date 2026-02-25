<script setup>
import { ref, onMounted, computed } from 'vue'
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
const sidebarItems = [
  { text: 'Home', to: `/${companyId}/manager` },
  { text: 'Company', to: `/${companyId}/manager/company` },
  { text: 'Team', to: `/${companyId}/manager/team` },
  { text: 'Schedule', to: `/${companyId}/manager/schedule` },
  { text: 'Attendance', to: `/${companyId}/manager/attendancy` },
  { text: 'Payrolls', to: `/${companyId}/manager/payrolls` },
  { text: 'Invites', to: `/${companyId}/manager/invite` }
]


axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* ------------------ STATE ------------------ */

const employees = ref([])
const shifts = ref([])
const loading = ref(false)
const error = ref('')

/* Search + Filter */
const searchQuery = ref('')
const selectedEmployee = ref('')

/* Sorting */
const sortKey = ref('')
const sortDirection = ref('asc') // asc | desc

/* Create Form */
const form = ref({
  profile_id: '',
  shift_date: '',
  starts_at: '',
  ends_at: ''
})

/* Inline Editing */
const editingId = ref(null)
const editForm = ref({
  profile_id: '',
  shift_date: '',
  starts_at: '',
  ends_at: ''
})

/* ------------------ DATE RANGE ------------------ */

const today = new Date()
const formatDate = (d) => d.toISOString().slice(0, 10)

const startDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth(), 1)))
const endDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)))

/* ------------------ FETCH ------------------ */

const fetchEmployees = async () => {
  const res = await axios.get(`/api/companies/${companyId}/employees`)
  employees.value = res.data
}

const fetchShifts = async () => {
  loading.value = true
  try {
    const res = await axios.get(`/api/shifts/company/${companyId}`, {
      params: { start_date: startDate.value, end_date: endDate.value }
    })
    shifts.value = res.data
  } catch {
    error.value = 'Failed to load shifts'
  } finally {
    loading.value = false
  }
}

/* ------------------ SEARCH + FILTER + SORT ------------------ */

const processedShifts = computed(() => {
  let data = [...shifts.value]

  // 🔎 SEARCH
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()

    data = data.filter(shift => {
      const name =
        `${shift.company_user.user.first_name} ${shift.company_user.user.last_name}`.toLowerCase()

      const email = shift.company_user.user.email.toLowerCase()

      return name.includes(q) || email.includes(q)
    })
  }

  // 👤 FILTER BY EMPLOYEE
  if (selectedEmployee.value) {
    data = data.filter(
      shift => shift.company_user.id == selectedEmployee.value
    )
  }

  // ↕ SORT
  if (sortKey.value) {
    data.sort((a, b) => {
      let aVal
      let bVal

      switch (sortKey.value) {
        case 'employee':
          aVal = `${a.company_user.user.first_name} ${a.company_user.user.last_name}`
          bVal = `${b.company_user.user.first_name} ${b.company_user.user.last_name}`
          break
        case 'email':
          aVal = a.company_user.user.email
          bVal = b.company_user.user.email
          break
        case 'date':
          aVal = new Date(a.shift_date)
          bVal = new Date(b.shift_date)
          break
        case 'start':
          aVal = a.starts_at
          bVal = b.starts_at
          break
        case 'end':
          aVal = a.ends_at
          bVal = b.ends_at
          break
      }

      if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return data
})

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }
}

/* ------------------ CSRF ------------------ */

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

/* ------------------ CRUD ------------------ */

const submitShift = async () => {
  await getCsrfToken()
  await axios.post('/api/shifts', form.value)
  fetchShifts()
}

const startEdit = (shift) => {
  editingId.value = shift.id
  editForm.value = {
    profile_id: shift.company_user.id,
    shift_date: shift.shift_date,
    starts_at: shift.starts_at,
    ends_at: shift.ends_at
  }
}

const cancelEdit = () => editingId.value = null

const confirmEdit = async (shift) => {
  await getCsrfToken()
  await axios.put(`/api/shifts/${shift.id}`, editForm.value)

  shift.shift_date = editForm.value.shift_date
  shift.starts_at = editForm.value.starts_at
  shift.ends_at = editForm.value.ends_at

  editingId.value = null
}

const deleteShift = async (shift) => {
  if (!confirm('Delete this shift?')) return

  await getCsrfToken()
  await axios.delete(`/api/shifts/${shift.id}`)

  shifts.value = shifts.value.filter(s => s.id !== shift.id)
}

/* ------------------ EXPORT HELPER ------------------ */

const getExportData = () => {
  return processedShifts.value.map(shift => ({
    Employee: `${shift.company_user.user.first_name} ${shift.company_user.user.last_name}`,
    Email: shift.company_user.user.email,
    Date: new Date(shift.shift_date).toLocaleDateString('en-GB'),
    Start: shift.starts_at,
    End: shift.ends_at
  }))
}

const exportCSV = () => {
  const data = getExportData()

  const worksheet = XLSX.utils.json_to_sheet(data)
  const csv = XLSX.utils.sheet_to_csv(worksheet)

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'shifts.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const exportXLS = () => {
  const data = getExportData()

  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Shifts')
  XLSX.writeFile(workbook, 'shifts.xlsx')
}


const exportPDF = () => {
  const doc = new jsPDF()

  const data = getExportData()

  const tableData = data.map(row => [
    row.Employee,
    row.Email,
    row.Date,
    row.Start,
    row.End
  ])

  doc.text('Company Shifts Report', 14, 15)

  autoTable(doc, {
    startY: 20,
    head: [['Employee', 'Email', 'Date', 'Start', 'End']],
    body: tableData
  })

  doc.save('shifts.pdf')
}

onMounted(() => {
  fetchEmployees()
  fetchShifts()
})
</script>

<template>
  <div class="flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">Team Shifts</h1>

      <!-- Create Shift -->
      <div class="bg-white p-6 rounded shadow mb-6">
        <h2 class="text-xl font-semibold mb-4">Create Shift</h2>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select v-model="form.profile_id" class="border rounded px-3 py-2">
            <option disabled value="">Select employee</option>
            <option
              v-for="employee in employees"
              :key="employee.id"
              :value="employee.id"
            >
              {{ employee.first_name }} {{ employee.last_name }}
            </option>
          </select>

          <input type="date" v-model="form.shift_date" class="border rounded px-3 py-2" />
          <input type="time" v-model="form.starts_at" class="border rounded px-3 py-2" />
          <input type="time" v-model="form.ends_at" class="border rounded px-3 py-2" />
        </div>

        <div class="flex justify-end mt-4">
          <button
            @click="submitShift"
            class="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Add Shift
          </button>
        </div>
      </div>

      <!-- Date Range + Export -->
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
          <button @click="exportCSV" class="bg-green-600 text-white px-3 py-1 rounded">CSV</button>
          <button @click="exportXLS" class="bg-blue-600 text-white px-3 py-1 rounded">XLS</button>
          <button @click="exportPDF" class="bg-red-600 text-white px-3 py-1 rounded">PDF</button>
        </div>
      </div>

      <!-- Loading / Error -->
      <p v-if="loading" class="text-gray-500">Loading shifts...</p>
      <p v-if="error" class="text-red-500">{{ error }}</p>

      <!-- Table -->
      <div v-if="!loading && shifts.length" class="bg-white shadow rounded p-6">
        <table class="w-full border text-sm">
          <thead class="bg-gray-100">
          <tr>
            <th @click="sortBy('employee')" class="border px-2 py-2 cursor-pointer">
              Employee
            </th>
            <th @click="sortBy('email')" class="border px-2 py-2 cursor-pointer">
              Email
            </th>
            <th @click="sortBy('date')" class="border px-2 py-2 cursor-pointer">
              Date
            </th>
            <th @click="sortBy('start')" class="border px-2 py-2 cursor-pointer">
              Start
            </th>
            <th @click="sortBy('end')" class="border px-2 py-2 cursor-pointer">
              End
            </th>
            <th class="border px-2 py-2 text-right">
              Actions
            </th>
          </tr>
        </thead>

          <tbody>
            <tr
              v-for="shift in processedShifts"
              :key="shift.id"
              class="hover:bg-gray-50"
            >
              <!-- Employee -->
              <td class="border px-2 py-2">
                  {{ shift.company_user.user.first_name }}
                  {{ shift.company_user.user.last_name }}
              </td>

              <!-- Email -->
              <td class="border px-2 py-2">
                {{ shift.company_user.user.email }}
              </td>

              <!-- Date -->
              <td class="border px-2 py-2">
                <span v-if="editingId !== shift.id">
                  {{ new Date(shift.shift_date).toLocaleDateString('en-GB') }}
                </span>
                <input
                  v-else
                  type="date"
                  v-model="editForm.shift_date"
                  class="border rounded px-2 py-1"
                />
              </td>

              <!-- Start -->
              <td class="border px-2 py-2">
                <span v-if="editingId !== shift.id">
                  {{ shift.starts_at }}
                </span>
                <input
                  v-else
                  type="time"
                  v-model="editForm.starts_at"
                  class="border rounded px-2 py-1"
                />
              </td>

              <!-- End -->
              <td class="border px-2 py-2">
                <span v-if="editingId !== shift.id">
                  {{ shift.ends_at }}
                </span>
                <input
                  v-else
                  type="time"
                  v-model="editForm.ends_at"
                  class="border rounded px-2 py-1"
                />
              </td>

              <!-- Actions -->
              <td class="border px-2 py-2 text-right space-x-2">
                <!-- Edit -->
                <button
                  v-if="editingId !== shift.id"
                  @click="startEdit(shift)"
                  class="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                >
                  Edit
                </button>

                <!-- Confirm -->
                <button
                  v-else
                  @click="confirmEdit(shift)"
                  class="bg-green-600 text-white px-3 py-1 rounded text-xs"
                >
                  Confirm
                </button>

                <!-- Cancel -->
                <button
                  v-if="editingId === shift.id"
                  @click="cancelEdit"
                  class="bg-gray-500 text-white px-3 py-1 rounded text-xs"
                >
                  Cancel
                </button>

                <!-- Delete -->
                <button
                  v-if="editingId !== shift.id"
                  @click="deleteShift(shift)"
                  class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                >
                  Delete
                </button>

              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else-if="!loading" class="text-gray-500">
        No shifts available.
      </p>
    </main>
  </div>
</template>