<!-- pages/[companyId]/manager/sick-leaves.vue -->
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

const sickLeaves  = ref([])
const loading     = ref(false)
const error       = ref('')
const searchQuery = ref('')

const fetchSickLeaves = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/sick-leaves`, {
      params: { company_id: companyId }
    })
    sickLeaves.value = res.data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load sick leaves.'
  } finally {
    loading.value = false
  }
}

const processedSickLeaves = computed(() => {
  let data = [...sickLeaves.value]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    data = data.filter(s => {
      const name = `${s.profile?.first_name} ${s.profile?.last_name}`.toLowerCase()
      return name.includes(q)
    })
  }

  return data
})

const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const viewFile = (id) => {
  window.open(`http://localhost:8000/api/sick-leaves/${id}/file`, '_blank')
}

const deleteSickLeave = async (id) => {
  if (!confirm('Delete this sick leave record?')) return
  try {
    await getCsrfToken()
    await axios.delete(`/api/sick-leaves/${id}`)
    sickLeaves.value = sickLeaves.value.filter(s => s.id !== id)
  } catch (e) {
    console.error(e)
    error.value = 'Failed to delete sick leave.'
  }
}

onMounted(fetchSickLeaves)
</script>

<template>
  <div class="flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">Sick Leave Records</h1>

      <!-- Filters -->
      <div class="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded shadow">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by employee name..."
          class="border rounded px-3 py-1 w-64"
        />
        <button
          @click="fetchSickLeaves"
          class="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
        >
          Refresh
        </button>
      </div>

      <p v-if="loading" class="text-gray-500">Loading sick leaves...</p>
      <p v-if="error" class="text-red-500">{{ error }}</p>

      <!-- Table -->
      <div v-if="!loading && processedSickLeaves.length" class="bg-white shadow rounded p-6">
        <table class="w-full border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-2 py-2">Employee</th>
              <th class="border px-2 py-2">Start Date</th>
              <th class="border px-2 py-2">End Date</th>
              <th class="border px-2 py-2">Document</th>
              <th class="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in processedSickLeaves" :key="s.id" class="hover:bg-gray-50">
              <td class="border px-2 py-2">
                {{ s.profile?.first_name }} {{ s.profile?.last_name }}
              </td>
              <td class="border px-2 py-2">{{ s.date_start }}</td>
              <td class="border px-2 py-2">{{ s.date_end ?? '-' }}</td>
              <td class="border px-2 py-2 text-center">
                <button
                  v-if="s.has_file"
                  @click="viewFile(s.id)"
                  class="text-blue-600 hover:underline text-xs"
                >
                  View
                </button>
                <span v-else class="text-gray-400 text-xs">No file</span>
              </td>
              <td class="border px-2 py-2 text-right">
                <button
                  @click="deleteSickLeave(s.id)"
                  class="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else-if="!loading" class="text-gray-500">No sick leave records found.</p>
    </main>
  </div>
</template>