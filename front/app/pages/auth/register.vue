<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

// Router & route
const route = useRoute()
const router = useRouter()

// Invite token from URL
const inviteToken = route.query.token || ''

// Form state
const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  token: route.query.token
})

const loading = ref(false)
const error = ref('')
const success = ref('')
const pageAllowed = ref(false) // controls page access

// Axios config
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Fetch CSRF token
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

// Validate invite token on mount
onMounted(async () => {
  if (!inviteToken) {
    error.value = 'Invite token missing'
    return
  }

  try {
    // Check with backend if token is valid
    await axios.get(`/api/invites/validate/${inviteToken}`)
    pageAllowed.value = true
  } catch (e) {
    error.value = 'Invalid or expired invite link'
    pageAllowed.value = false
  }
})

// Submit registration
const submit = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    await getCsrfToken()
    await axios.post('/api/register/member', form.value)
    success.value = 'Registration successful! You can now log in.'
  } catch (e) {
    error.value = e.response?.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div v-if="error && !pageAllowed" class="text-center text-red-500">
      {{ error }}
    </div>

    <form
      v-else
      @submit.prevent="submit"
      class="bg-white p-8 rounded shadow w-full max-w-md space-y-3"
    >
      <h1 class="text-xl font-bold text-center">Employee Registration</h1>

      <input v-model="form.first_name" placeholder="First Name" class="input" />
      <input v-model="form.last_name" placeholder="Last Name" class="input" />
      <input v-model="form.email" placeholder="Email" class="input" />
      <input type="password" v-model="form.password" placeholder="Password" class="input" />
      <input
        type="password"
        v-model="form.password_confirmation"
        placeholder="Confirm Password"
        class="input"
      />

      <button class="btn w-full" :disabled="loading">
        {{ loading ? 'Registering...' : 'Register' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply w-full border px-3 py-2 rounded;
}
.btn {
  @apply w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition;
}
.error {
  @apply text-red-500 text-sm;
}
.success {
  @apply text-green-600 text-sm;
}
</style>
