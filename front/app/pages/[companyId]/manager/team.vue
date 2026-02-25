<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar :items="sidebarItems" />

    <!-- Main Content -->
    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">Company Team</h1>

      <!-- Loading / Error -->
      <p v-if="loading" class="text-gray-500">Loading employees...</p>
      <p v-if="error" class="text-red-500 mb-4">{{ error }}</p>

      <!-- Search -->
      <div class="mb-4 flex gap-2">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by name or email..."
          class="border rounded px-3 py-1 flex-1"
        />
      </div>

      <!-- Employees Table -->
      <div v-if="!loading && employees.length" class="bg-white shadow rounded p-4">
        <table class="w-full border-collapse text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th
                @click="sortBy('name')"
                class="border px-3 py-2 text-left cursor-pointer"
              >
                Name
                <span v-if="sortKey==='name'">{{ sortDirection==='asc' ? '▲' : '▼' }}</span>
              </th>
              <th
                @click="sortBy('email')"
                class="border px-3 py-2 text-left cursor-pointer"
              >
                Email
                <span v-if="sortKey==='email'">{{ sortDirection==='asc' ? '▲' : '▼' }}</span>
              </th>
              <th
                @click="sortBy('role')"
                class="border px-3 py-2 text-left cursor-pointer"
              >
                Role
                <span v-if="sortKey==='role'">{{ sortDirection==='asc' ? '▲' : '▼' }}</span>
              </th>
              <th
                @click="sortBy('hourly_pay')"
                class="border px-3 py-2 text-left cursor-pointer"
              >
                Hourly Pay
                <span v-if="sortKey==='hourly_pay'">{{ sortDirection==='asc' ? '▲' : '▼' }}</span>
              </th>
              <th class="border px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="employee in filteredEmployees"
              :key="employee.id"
              class="hover:bg-gray-50"
            >
              <!-- NAME -->
              <td class="border px-3 py-2">
                {{ employee.first_name }} {{ employee.last_name }}
              </td>

              <!-- EMAIL -->
              <td class="border px-3 py-2">
                {{ employee.email }}
              </td>

              <!-- ROLE -->
              <td class="border px-3 py-2 capitalize">
                <div v-if="editingId === employee.id">
                  <select
                    v-model="editForm.role"
                    class="border rounded px-2 py-1"
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
                <span v-else>{{ employee.role }}</span>
              </td>

              <!-- HOURLY PAY -->
              <td class="border px-3 py-2">
                <div v-if="editingId === employee.id">
                  <input
                    v-model="editForm.hourly_pay"
                    type="number"
                    step="0.01"
                    class="border rounded px-2 py-1 w-24"
                  />
                </div>
                <span v-else>${{ employee.hourly_pay }}</span>
              </td>

              <!-- ACTIONS -->
              <td class="border px-3 py-2 text-right space-x-2">
                <button
                  v-if="editingId !== employee.id"
                  @click="startEdit(employee)"
                  class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Edit
                </button>

                <button
                  v-else
                  @click="confirmEdit(employee)"
                  class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Confirm
                </button>

                <button
                  v-if="editingId === employee.id"
                  @click="cancelEdit"
                  class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>

                <button
                  v-if="editingId !== employee.id"
                  @click="deleteEmployee(employee)"
                  class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading" class="text-gray-500">
        No employees found.
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

definePageMeta({
  middleware: 'auth-company',
  requiresManager: true
})

/* ROUTE & SIDEBAR */
const route = useRoute()
const router = useRouter()
const companyId = route.params.companyId

const sidebarItems = [
  { text: 'Home', to: `/${companyId}/manager` },
  { text: 'Company', to: `/${companyId}/manager/company` },
  { text: 'Team', to: `/${companyId}/manager/team` },
  { text: 'Schedule', to: `/${companyId}/manager/schedule` },
  { text: 'Attendance', to: `/${companyId}/manager/attendancy` },
  { text: 'Payrolls', to: `/${companyId}/manager/payrolls` },
  { text: 'Invites', to: `/${companyId}/manager/invite` },
]

/* AXIOS DEFAULTS */
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* STATE */
const employees = ref([])
const loading = ref(false)
const error = ref('')
const editingId = ref(null)

const editForm = ref({
  hourly_pay: 0,
  role: 'Employee'
})

/* SEARCH & SORT */
const searchQuery = ref('')
const sortKey = ref('')
const sortDirection = ref('asc')

const filteredEmployees = computed(() => {
  let data = [...employees.value]

  // SEARCH
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    data = data.filter(emp => {
      return (
        `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q)
      )
    })
  }

  // SORT
  if (sortKey.value) {
    data.sort((a, b) => {
      let aVal = a[sortKey.value]
      let bVal = b[sortKey.value]

      // handle strings case-insensitive
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()

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

/* FETCH EMPLOYEES */
const fetchEmployees = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/companies/${companyId}/employees`)
    employees.value = res.data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load employees'
  } finally {
    loading.value = false
  }
}

/* CRUD FUNCTIONS */
const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const startEdit = (emp) => {
  editingId.value = emp.id
  editForm.value.hourly_pay = emp.hourly_pay
  editForm.value.role = emp.role
}

const cancelEdit = () => (editingId.value = null)

const confirmEdit = async (emp) => {
  try {
    await getCsrfToken()
    await axios.put(`/api/companies/${companyId}/employees/${emp.id}`, {
      hourly_pay: editForm.value.hourly_pay,
      role: editForm.value.role
    })
    emp.hourly_pay = editForm.value.hourly_pay
    emp.role = editForm.value.role
    editingId.value = null
  } catch (e) {
    console.error(e)
    alert('Failed to update employee')
  }
}

const deleteEmployee = async (emp) => {
  if (!confirm(`Delete ${emp.first_name} ${emp.last_name}?`)) return
  try {
    await getCsrfToken()
    await axios.delete(`/api/companies/${companyId}/employees/${emp.id}`)
    employees.value = employees.value.filter(e => e.id !== emp.id)
  } catch (e) {
    console.error(e)
    alert('Failed to delete employee')
  }
}

onMounted(fetchEmployees)
</script>