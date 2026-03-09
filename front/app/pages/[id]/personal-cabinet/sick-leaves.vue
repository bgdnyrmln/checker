<!-- pages/[id]/personal-cabinet/sick-leaves.vue -->
<template>
  <div class="flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">My Sick Leaves</h1>

      <!-- Upload Form -->
      <div class="bg-white p-4 rounded shadow mb-6">
        <h2 class="font-semibold mb-3">Submit Sick Leave</h2>
        <div class="flex flex-wrap gap-4 items-end">
          <div>
            <label class="block text-sm text-gray-500 mb-1">Start Date</label>
            <input v-model="form.date_start" type="date" class="border rounded px-2 py-1" />
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">End Date</label>
            <input v-model="form.date_end" type="date" class="border rounded px-2 py-1" />
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Medical Document (PDF/Image)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              @change="onFileChange"
              class="border rounded px-2 py-1 text-sm"
            />
          </div>
          <button
            @click="submitSickLeave"
            class="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
          >
            Submit
          </button>
        </div>
        <p v-if="formError" class="text-red-500 text-sm mt-2">{{ formError }}</p>
        <p v-if="formSuccess" class="text-green-600 text-sm mt-2">{{ formSuccess }}</p>
      </div>

      <p v-if="loading" class="text-gray-500">Loading sick leaves...</p>
      <p v-if="error" class="text-red-500">{{ error }}</p>

      <!-- Sick Leaves Table -->
      <div v-if="!loading && sickLeaves.length" class="bg-white shadow rounded p-6">
        <h2 class="font-semibold mb-3">Sick Leave Records</h2>
        <table class="w-full border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-2 py-2">Start Date</th>
              <th class="border px-2 py-2">End Date</th>
              <th class="border px-2 py-2">Document</th>
              <th class="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in sickLeaves" :key="s.id" class="hover:bg-gray-50">
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
              <td class="border px-2 py-2 text-center">
                <button
                  @click="deleteSickLeave(s.id)"
                  class="text-red-500 hover:underline text-xs"
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

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

definePageMeta({ middleware: 'auth-company' })

const route = useRoute()
const profileId = route.params.id

const sidebarItems = [
  { text: 'Dashboard',   to: `/${profileId}/personal-cabinet` },
  { text: 'Attendance',  to: `/${profileId}/personal-cabinet/attendance` },
  { text: 'Payroll',     to: `/${profileId}/personal-cabinet/payroll` },
  { text: 'Schedule',    to: `/${profileId}/personal-cabinet/schedule` },
  { text: 'Holidays',    to: `/${profileId}/personal-cabinet/holidays` },
  { text: 'Sick Leaves', to: `/${profileId}/personal-cabinet/sick-leaves` },
]

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const sickLeaves  = ref([])
const loading     = ref(false)
const error       = ref('')
const formError   = ref('')
const formSuccess = ref('')
const selectedFile = ref(null)

const form = ref({
  date_start: '',
  date_end: '',
})

const onFileChange = (e) => {
  selectedFile.value = e.target.files[0] ?? null
}

const fetchSickLeaves = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/sick-leaves`, {
      params: { profile_id: profileId }
    })
    sickLeaves.value = res.data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load sick leaves.'
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

const submitSickLeave = async () => {
  formError.value = ''
  formSuccess.value = ''

  if (!form.value.date_start) {
    formError.value = 'Start date is required.'
    return
  }

  try {
    await getCsrfToken();
    const payload = new FormData()
    payload.append('date_start', form.value.date_start)
    payload.append('profile_id', profileId)
    if (form.value.date_end) payload.append('date_end', form.value.date_end)
    if (selectedFile.value)  payload.append('file', selectedFile.value)

    await axios.post('/api/sick-leaves', payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    formSuccess.value = 'Sick leave submitted!'
    form.value = { date_start: '', date_end: '' }
    selectedFile.value = null
    await fetchSickLeaves()
  } catch (e) {
    console.error(e)
    formError.value = 'Failed to submit sick leave.'
  }
}

const viewFile = (id) => {
  window.open(`http://localhost:8000/api/sick-leaves/${id}/file`, '_blank')
}

const deleteSickLeave = async (id) => {

    if (!confirm('Delete this sick leave record?')) return
    try {
        await getCsrfToken();
        await axios.delete(`/api/sick-leaves/${id}`)
        await fetchSickLeaves()
    } catch (e) {
        console.error(e)
        error.value = 'Failed to delete record.'
    }
}

onMounted(fetchSickLeaves)
</script>