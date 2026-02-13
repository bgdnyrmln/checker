<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar :items="sidebarItems" />

    <!-- Main Content -->
    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">Company Team</h1>

      <!-- Loading -->
      <div v-if="loading" class="text-gray-500">
        Loading employees...
      </div>

      <!-- Error -->
      <div v-if="error" class="text-red-500 mb-4">
        {{ error }}
      </div>

      <!-- Employees Table -->
      <div v-if="!loading && employees.length" class="bg-white shadow rounded p-4">
        <table class="w-full border-collapse text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-3 py-2 text-left">Name</th>
              <th class="border px-3 py-2 text-left">Email</th>
              <th class="border px-3 py-2 text-left">Role</th>
              <th class="border px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="employee in employees"
              :key="employee.id"
              class="hover:bg-gray-50"
            >
              <!-- NAME -->
              <td class="border px-3 py-2">
                <div v-if="editingId === employee.id" class="flex gap-2">
                  <input
                    v-model="editForm.first_name"
                    class="border rounded px-2 py-1 w-28"
                    placeholder="First name"
                  />
                  <input
                    v-model="editForm.last_name"
                    class="border rounded px-2 py-1 w-28"
                    placeholder="Last name"
                  />
                </div>

                <span v-else>
                  {{ employee.first_name }} {{ employee.last_name }}
                </span>
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

                <span v-else>
                  {{ employee.role }}
                </span>
              </td>


              <!-- ACTIONS -->
              <td class="border px-3 py-2 text-right space-x-2">
                <!-- Edit / Confirm -->
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

                <!-- Cancel (only in edit mode) -->
                <button
                  v-if="editingId === employee.id"
                  @click="cancelEdit"
                  class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>

                <!-- Delete -->
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

definePageMeta({
  middleware: 'auth-company',
  requiresManager: true
})

/* Route */
const route = useRoute()
const router = useRouter()
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

/* Axios Defaults */
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* State */
const employees = ref([])
const loading = ref(false)
const error = ref('')

/* Fetch Employees */
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

/* Edit */
const editingId = ref(null)

const editForm = ref({
  first_name: '',
  last_name: '',
  role: 'Employee'
})

const startEdit = (employee) => {
  editingId.value = employee.id

  editForm.value.first_name = employee.first_name
  editForm.value.last_name = employee.last_name
  editForm.value.role = employee.role
}


const cancelEdit = () => {
  editingId.value = null
}



const confirmEdit = async (employee) => {
  try {
    await axios.put(`/api/companies/${companyId}/employees/${employee.id}`, {
      first_name: editForm.value.first_name,
      last_name: editForm.value.last_name,
      role: editForm.value.role
    })

    // Update UI instantly
    employee.first_name = editForm.value.first_name
    employee.last_name = editForm.value.last_name
    employee.role = editForm.value.role

    editingId.value = null

  } catch (e) {
    console.error(e)
    alert('Failed to update employee')
  }
}



/* Delete */
const deleteEmployee = async (employee) => {
  const confirmDelete = confirm(
    `Are you sure you want to remove ${employee.first_name} ${employee.last_name}?`
  )

  if (!confirmDelete) return

  try {
    await axios.delete(`/api/companies/${companyId}/employees/${employee.id}`)

    // Remove from UI instantly
    employees.value = employees.value.filter(e => e.id !== employee.id)

  } catch (e) {
    console.error(e)
    alert('Failed to delete employee')
  }
}

onMounted(fetchEmployees)
</script>
