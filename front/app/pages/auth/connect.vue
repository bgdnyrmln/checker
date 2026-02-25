<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

/* Axios */
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* Global user */
const user = useState('user', () => null)

const route = useRoute()

/* State */
const tokenInput = ref('')
const inviteToken = ref(route.query.token || '')
const pageAllowed = ref(false)
const companyName = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

/* ----------------------------------
   Fetch authenticated user
---------------------------------- */
const fetchUser = async () => {
  if (user.value) return

  try {
    const res = await axios.get('/api/user')
    user.value = res.data
  } catch {
    user.value = null
  }
}

const getCSRFToken = async () => {
  await axios.get('/sanctum/csrf-cookie')

  const token = decodeURIComponent(
    document.cookie
      .split('; ')
      .find(c => c.startsWith('XSRF-TOKEN='))
      ?.split('=')[1] || ''
  )

  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

/* ----------------------------------
   Validate invite token
---------------------------------- */
const validateToken = async (token) => {
  loading.value = true
  error.value = ''

  try {
    const res = await axios.get(`/api/invites/validate/${token}`)

    inviteToken.value = token
    companyName.value = res.data.company_name
    pageAllowed.value = true
  } catch (err) {
    error.value = err.response?.data?.message || 'Invalid invite token'
    pageAllowed.value = false
  } finally {
    loading.value = false
  }
}

/* ----------------------------------
   Connect user to company
---------------------------------- */
const connectToCompany = async () => {
  loading.value = true
  error.value = ''

  try {
    await getCSRFToken()
    await axios.post('/api/connect/member', {
      token: inviteToken.value,
      user_id: user.value.id
    })

    success.value = `Successfully connected to ${companyName.value}`
    pageAllowed.value = false
  } catch (err) {
    error.value = err.response?.data?.message || 'Connection failed'
  } finally {
    loading.value = false
  }
}

/* ----------------------------------
   Manual token submit
---------------------------------- */
const submitToken = () => {
  if (!tokenInput.value) {
    error.value = 'Please enter invite token'
    return
  }

  validateToken(tokenInput.value)
}

onMounted(fetchUser)
</script>


<template>
  <div class="min-h-screen flex items-center justify-center p-4">

    <!-- TOKEN INPUT -->
    <div v-if="!pageAllowed && !success" class="p-8 rounded shadow w-full max-w-md bg-white">
      <h1 class="text-xl font-bold mb-4 text-center">Enter Invite Token</h1>

      <form @submit.prevent="submitToken" class="space-y-3">
        <input
          v-model="tokenInput"
          placeholder="Invite token"
          class="input"
        />

        <button class="btn w-full" :disabled="loading">
          {{ loading ? 'Checking...' : 'Continue' }}
        </button>

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      </form>
    </div>

    <!-- CONFIRMATION BOX -->
    <div
      v-else-if="pageAllowed && user"
      class="bg-white p-8 rounded shadow w-full max-w-md text-center space-y-4"
    >
      <h2 class="text-lg font-semibold">
        Are you sure you want to connect to
      </h2>

      <p class="text-xl font-bold text-blue-600">
        {{ companyName }}
      </p>

      <div class="flex justify-center gap-4">
        <button
          @click="connectToCompany"
          class="bg-green-600 text-white px-4 py-2 rounded"
          :disabled="loading"
        >
          {{ loading ? 'Connecting...' : 'Yes, Connect' }}
        </button>

        <button
          @click="pageAllowed = false"
          class="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>

      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </div>

    <!-- SUCCESS -->
    <div
      v-else-if="success"
      class="bg-white p-8 rounded shadow w-full max-w-md text-center"
    >
      <h2 class="text-green-600 font-bold text-lg">
        {{ success }}
      </h2>
    </div>

  </div>
</template>
