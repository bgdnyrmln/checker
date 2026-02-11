<template>
  <div class="flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">Company Profile</h1>

      <div v-if="loading">Loading...</div>

      <div v-else class="bg-white shadow rounded p-6 max-w-xl">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Company Name</label>
          <input
            v-model="form.name"
            class="w-full border rounded px-3 py-2"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Company Email</label>
          <input
            v-model="form.email"
            class="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          @click="updateCompany"
          class="bg-[#0B5351] text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>

        <p v-if="success" class="text-green-600 mt-3">
          Company updated successfully.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

definePageMeta({
  middleware: 'auth-company',
  requiresManager: true
})

const route = useRoute()
const companyId = route.params.companyId

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

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

const loading = ref(true)
const success = ref(false)

const form = ref({
  name: '',
  email: ''
})

const fetchCompany = async () => {
  try {
    const res = await axios.get(`/api/companies/${companyId}`)
    form.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const updateCompany = async () => {
  try {
    await axios.put(`/api/companies/${companyId}`, form.value)
    success.value = true
  } catch (e) {
    console.error(e)
  }
}

onMounted(fetchCompany)
</script>
