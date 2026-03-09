<!-- pages/[id]/personal-cabinet/holidays.vue -->
<template>
  <div class="flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">My Holidays</h1>

      <!-- Request Form -->
      <div class="bg-white p-4 rounded shadow mb-6">
        <h2 class="font-semibold mb-3">Request Holiday</h2>
        <div class="flex flex-wrap gap-4 items-end">
          <div>
            <label class="block text-sm text-gray-500 mb-1">Reason</label>
            <input
              v-model="form.content"
              type="text"
              placeholder="Reason for holiday..."
              class="border rounded px-2 py-1 w-64"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Start Date</label>
            <input v-model="form.date_start" type="date" class="border rounded px-2 py-1" />
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">End Date</label>
            <input v-model="form.date_end" type="date" class="border rounded px-2 py-1" />
          </div>
          <button
            @click="submitHoliday"
            class="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
          >
            Submit
          </button>
        </div>
        <p v-if="formError" class="text-red-500 text-sm mt-2">{{ formError }}</p>
        <p v-if="formSuccess" class="text-green-600 text-sm mt-2">{{ formSuccess }}</p>
      </div>

      <p v-if="loading" class="text-gray-500">Loading holidays...</p>
      <p v-if="error" class="text-red-500">{{ error }}</p>

      <!-- Holidays Table -->
      <div v-if="!loading && holidays.length" class="bg-white shadow rounded p-6">
        <h2 class="font-semibold mb-3">Holiday Requests</h2>
        <table class="w-full border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-2 py-2">Start Date</th>
              <th class="border px-2 py-2">End Date</th>
              <th class="border px-2 py-2">Reason</th>
              <th class="border px-2 py-2">Status</th>
              <th class="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in holidays" :key="h.id" class="hover:bg-gray-50">
              <td class="border px-2 py-2">{{ h.date_start }}</td>
              <td class="border px-2 py-2">{{ h.date_end ?? '-' }}</td>
              <td class="border px-2 py-2">{{ h.content }}</td>
              <td class="border px-2 py-2">
                <span
                  :class="h.is_approved
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'"
                  class="px-2 py-0.5 rounded text-xs font-medium"
                >
                  {{ h.is_approved ? 'Approved' : 'Pending' }}
                </span>
              </td>
              <td class="border px-2 py-2 text-center">
                <button
                  v-if="!h.is_approved"
                  @click="deleteHoliday(h.id)"
                  class="text-red-500 hover:underline text-xs"
                >
                  Delete
                </button>
                <span v-else class="text-gray-400 text-xs">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else-if="!loading" class="text-gray-500">No holiday requests found.</p>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

definePageMeta({ middleware: 'auth-company' })

const route = useRoute()
const profileId = route.params.id

const sidebarItems = [
  { text: 'Dashboard',  to: `/${profileId}/personal-cabinet` },
  { text: 'Attendance', to: `/${profileId}/personal-cabinet/attendance` },
  { text: 'Payroll',    to: `/${profileId}/personal-cabinet/payroll` },
  { text: 'Schedule',   to: `/${profileId}/personal-cabinet/schedule` },
  { text: 'Holidays',   to: `/${profileId}/personal-cabinet/holidays` },
  { text: 'Sick Leaves',to: `/${profileId}/personal-cabinet/sick-leaves` },
]

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const holidays   = ref([])
const loading    = ref(false)
const error      = ref('')
const formError  = ref('')
const formSuccess = ref('')

const form = ref({
  content: '',
  date_start: '',
  date_end: '',
})

const fetchHolidays = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/holidays`, {
      params: { profile_id: profileId }
    })
    holidays.value = res.data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load holidays.'
  } finally {
    loading.value = false
  }
}


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


const submitHoliday = async () => {
  formError.value = ''
  formSuccess.value = ''

  if (!form.value.content || !form.value.date_start) {
    formError.value = 'Reason and start date are required.'
    return
  }

  try {
    await getCsrfToken();
    await axios.post('/api/holidays', {
      ...form.value,
      profile_id: profileId,
    })
    formSuccess.value = 'Holiday request submitted!'
    form.value = { content: '', date_start: '', date_end: '' }
    await fetchHolidays()
  } catch (e) {
    console.error(e)
    formError.value = 'Failed to submit request.'
  }
}

const deleteHoliday = async (id) => {
    await getCsrfToken();
    if (!confirm('Delete this holiday request?')) return
    try {
        await axios.delete(`/api/holidays/${id}`)
        await fetchHolidays()
    } catch (e) {
        console.error(e)
        error.value = 'Failed to delete holiday.'
    }
}

onMounted(fetchHolidays)
</script>