<template>
  <div class="flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">Company Team</h1>

      <div v-if="loading" class="text-gray-500">Loading employees...</div>
      <div v-if="error" class="text-red-500">{{ error }}</div>

      <div v-if="!loading && employees.length" class="bg-white shadow rounded p-4">
        <table class="w-full border-collapse text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-3 py-2 text-left">Name</th>
              <th class="border px-3 py-2 text-left">Email</th>
              <th class="border px-3 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="employee in employees"
              :key="employee.id"
              class="hover:bg-gray-50"
            >
              <td class="border px-3 py-2">
                {{ employee.first_name }} {{ employee.last_name }}
              </td>
              <td class="border px-3 py-2">
                {{ employee.email }}
              </td>
              <td class="border px-3 py-2 capitalize">
                {{ employee.role }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="!loading" class="text-gray-500">
        No employees found.
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

definePageMeta({
  middleware: 'auth-company',
  requiresManager: true
})

const route = useRoute()
const companyId = route.params.companyId

const employees = ref([])
const loading = ref(false)
const error = ref('')

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

const fetchEmployees = async () => {
  loading.value = true
  error.value = ''

  try {
    const res = await axios.get(`/api/companies/${companyId}/employees`)
    employees.value = res.data
  } catch (e) {
    error.value = 'Failed to load employees'
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchEmployees)
</script>
