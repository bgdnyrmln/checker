<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  middleware: 'auth-company',
  requiresManager: true
})


const route = useRoute()

// State
const employees = ref([])
const companyId = route.params.companyId
const loading = ref(false)
const error = ref('')

const form = ref({
  profile_id: '',
  shift_date: '',
  starts_at: '',
  ends_at: '',
})

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

// Fetch employees for the company
const fetchEmployees = async () => {
  loading.value = true
  error.value = ''

  try {
    await getCsrfToken()
    const res = await axios.get(`/api/companies/${companyId}/employees`)
    employees.value = res.data
  } catch (e) {
    error.value = 'Failed to load employees'
    console.error(e)
  } finally {
    loading.value = false
  }
}

// Submit shift
const submit = async () => {
  if (!form.value.profile_id) return alert('Select employee')
  if (form.value.ends_at <= form.value.starts_at) return alert('End must be after start')

  try {
    await axios.post('/api/shifts', form.value)
    alert('Shift added')
    form.value.starts_at = ''
    form.value.ends_at = ''
  } catch (e) {
    alert(e.response?.data?.message || 'Failed to create shift')
  }
}

onMounted(() => {
  fetchEmployees()
})
</script>

<template>
  <Sidebar :items="[
    { text: 'Home', to: `/${companyId}/manager` },
    { text: 'Company', to: `/${companyId}/manager/company` },
    { text: 'Team', to: `/${companyId}/manager/team`},
    { text: 'Schedule', to: `/${companyId}/manager/schedule`, children: [{ text: 'Add Shift', to: `/${companyId}/manager/schedule/add`}]},
    { text: 'Attendancy', to: `/${companyId}/manager/attendancy`},
    { text: 'Payrolls', to: `/${companyId}/manager/payrolls`},
    { text: 'Invites', to: `/${companyId}/manager/invite`}
    ]" />
  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white rounded-xl shadow p-6 space-y-6">

      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold">Create shift</h2>
        <input type="date" v-model="form.shift_date" class="border rounded px-3 py-1" required />
      </div>

      <div v-if="loading" class="text-gray-500">Loading employees...</div>
      <div v-if="error" class="text-red-500">{{ error }}</div>

      <div v-else class="grid grid-cols-2 gap-4">
        <select v-model="form.profile_id" class="border rounded px-3 py-2" required>
          <option disabled value="">Select employee</option>
          <option v-for="employee in employees" :key="employee.id" :value="employee.id">{{ employee.first_name }} {{ employee.last_name }}</option>
        </select>

        <div class="flex gap-2">
          <input type="time" v-model="form.starts_at" class="border rounded px-3 py-2 w-full" required />
          <input type="time" v-model="form.ends_at" class="border rounded px-3 py-2 w-full" required />
        </div>
      </div>

      <div class="flex justify-end">
        <button @click="submit" class="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
          Add shift
        </button>
      </div>

    </div>
  </div>
</template>
