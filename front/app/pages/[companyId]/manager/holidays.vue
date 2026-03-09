<!-- pages/[companyId]/manager/holidays.vue -->
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

definePageMeta({
  middleware: 'auth-company',
  requiresManager: true
})

const route = useRoute()
const companyId = route.params.companyId

const sidebarItems = [
  { text: 'Home',       to: `/${companyId}/manager` },
  { text: 'Company',    to: `/${companyId}/manager/company` },
  { text: 'Team',       to: `/${companyId}/manager/team` },
  { text: 'Schedule',   to: `/${companyId}/manager/schedule` },
  { text: 'Attendance', to: `/${companyId}/manager/attendancy` },
  { text: 'Payrolls',   to: `/${companyId}/manager/payrolls` },
  { text: 'Invites',    to: `/${companyId}/manager/invite` },
  { text: 'Holidays',   to: `/${companyId}/manager/holidays` },
  { text: 'Sick Leaves',to: `/${companyId}/manager/sick-leaves` },
]

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const holidays     = ref([])
const loading      = ref(false)
const error        = ref('')
const searchQuery  = ref('')
const filterStatus = ref('') // '' | 'pending' | 'approved'

const fetchHolidays = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/holidays`, {
      params: { company_id: companyId }
    })
    holidays.value = res.data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load holidays.'
  } finally {
    loading.value = false
  }
}

const processedHolidays = computed(() => {
  let data = [...holidays.value]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    data = data.filter(h => {
      const name = `${h.profile?.first_name} ${h.profile?.last_name}`.toLowerCase()
      return name.includes(q) || h.content?.toLowerCase().includes(q)
    })
  }

  if (filterStatus.value === 'pending')  data = data.filter(h => !h.is_approved)
  if (filterStatus.value === 'approved') data = data.filter(h =>  h.is_approved)

  return data
})

const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const approveHoliday = async (holiday) => {
  try {
    await getCsrfToken()
    await axios.put(`/api/holidays/${holiday.id}`, { is_approved: true })
    holiday.is_approved = true
  } catch (e) {
    console.error(e)
    error.value = 'Failed to approve holiday.'
  }
}

const revokeHoliday = async (holiday) => {
  try {
    await getCsrfToken()
    await axios.put(`/api/holidays/${holiday.id}`, { is_approved: false })
    holiday.is_approved = false
  } catch (e) {
    console.error(e)
    error.value = 'Failed to revoke holiday.'
  }
}

const deleteHoliday = async (id) => {
  if (!confirm('Delete this holiday request?')) return
  try {
    await getCsrfToken()
    await axios.delete(`/api/holidays/${id}`)
    holidays.value = holidays.value.filter(h => h.id !== id)
  } catch (e) {
    console.error(e)
    error.value = 'Failed to delete holiday.'
  }
}

onMounted(fetchHolidays)
</script>

<template>
  <div class="flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">Holiday Requests</h1>

      <!-- Filters -->
      <div class="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded shadow">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or reason..."
          class="border rounded px-3 py-1 w-64"
        />

        <select v-model="filterStatus" class="border rounded px-3 py-1">
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>

        <button
          @click="fetchHolidays"
          class="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
        >
          Refresh
        </button>
      </div>

      <p v-if="loading" class="text-gray-500">Loading holidays...</p>
      <p v-if="error" class="text-red-500">{{ error }}</p>

      <!-- Table -->
      <div v-if="!loading && processedHolidays.length" class="bg-white shadow rounded p-6">
        <table class="w-full border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-2 py-2">Employee</th>
              <th class="border px-2 py-2">Reason</th>
              <th class="border px-2 py-2">Start Date</th>
              <th class="border px-2 py-2">End Date</th>
              <th class="border px-2 py-2">Status</th>
              <th class="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in processedHolidays" :key="h.id" class="hover:bg-gray-50">
              <td class="border px-2 py-2">
                {{ h.profile?.first_name }} {{ h.profile?.last_name }}
              </td>
              <td class="border px-2 py-2">{{ h.content }}</td>
              <td class="border px-2 py-2">{{ h.date_start }}</td>
              <td class="border px-2 py-2">{{ h.date_end ?? '-' }}</td>
              <td class="border px-2 py-2 text-center">
                <span
                  :class="h.is_approved
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'"
                  class="px-2 py-0.5 rounded text-xs font-medium"
                >
                  {{ h.is_approved ? 'Approved' : 'Pending' }}
                </span>
              </td>
              <td class="border px-2 py-2 text-right space-x-2">
                <button
                  v-if="!h.is_approved"
                  @click="approveHoliday(h)"
                  class="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  v-else
                  @click="revokeHoliday(h)"
                  class="bg-yellow-500 text-white px-3 py-1 rounded text-xs hover:bg-yellow-600"
                >
                  Revoke
                </button>
                <button
                  @click="deleteHoliday(h.id)"
                  class="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else-if="!loading" class="text-gray-500">No holiday requests found.</p>
    </main>
  </div>
</template>