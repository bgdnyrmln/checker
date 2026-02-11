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

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const link = ref('')
const invites = ref([])

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

const fetchInvites = async () => {
  try {
    const res = await axios.get(`/api/companies/${companyId}/invites`)
    invites.value = res.data
  } catch (e) {
    console.error(e)
  }
}


const createInvite = async () => {
  try {
    await getCsrfToken()
    const res = await axios.post('/api/invites')
    link.value = res.data.link

    await fetchInvites() // refresh list
  } catch (e) {
    console.error(e)
  }
}

onMounted(fetchInvites)
</script>

<template>
  <Sidebar :items="sidebarItems" />

  <div class="pl-[18rem] p-6">
    <h1 class="text-2xl font-bold mb-4">Invite Employees</h1>

    <button
      @click="createInvite"
      class="bg-[#0B5351] text-white px-4 py-2 rounded mb-4"
    >
      Generate Invite
    </button>

    <p v-if="link" class="mb-4 text-green-600">
      New Invite: {{ link }}
    </p>

    <div class="bg-white shadow rounded p-4">
      <h2 class="font-semibold mb-3">Unused Invites</h2>

      <table v-if="invites.length" class="w-full text-sm border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="border px-3 py-2 text-left">Link</th>
            <th class="border px-3 py-2 text-left">Expires</th>
            <th class="border px-3 py-2 text-left">Created</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="invite in invites"
            :key="invite.id"
            class="hover:bg-gray-50"
          >
            <td class="border px-3 py-2 break-all">
              {{ `http://localhost:3000/auth/register?token=${invite.token}` }}
            </td>
            <td class="border px-3 py-2">
              {{ new Date(invite.expires_at).toLocaleDateString() }}
            </td>
            <td class="border px-3 py-2">
              {{ new Date(invite.created_at).toLocaleDateString() }}
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else class="text-gray-500">No active invites.</p>
    </div>
  </div>
</template>
