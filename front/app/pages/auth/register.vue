<script setup>
definePageMeta({
  middleware: 'guest'
})

import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

/* ----------------------------------
   Axios base config
---------------------------------- */
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* ----------------------------------
   Router
---------------------------------- */
const route = useRoute()

/* ----------------------------------
   State
---------------------------------- */
const inviteToken = ref(route.query.token || '')
const tokenInput = ref('')

const pageAllowed = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref('')

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  token: inviteToken.value
})

/* ----------------------------------
   CSRF
---------------------------------- */
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

/* ----------------------------------
   Invite validation
---------------------------------- */
const validateToken = async (token) => {
  error.value = ''
  loading.value = true

  try {
    await axios.get(`/api/invites/validate/${token}`)
    inviteToken.value = token
    form.value.token = token
    pageAllowed.value = true
  } catch {
    error.value = 'Invalid or expired invite token'
    pageAllowed.value = false
  } finally {
    loading.value = false
  }
}

/* ----------------------------------
   Initial validation (URL token)
---------------------------------- */
onMounted(() => {
  if (inviteToken.value) {
    validateToken(inviteToken.value)
  }
})

/* ----------------------------------
   Manual token submit
---------------------------------- */
const submitToken = () => {
  if (!tokenInput.value) {
    error.value = 'Please enter an invite token'
    return
  }

  validateToken(tokenInput.value)
}

/* ----------------------------------
   Registration submit
---------------------------------- */
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
    <!-- TOKEN INPUT -->
    <div v-if="!pageAllowed" class="bg-white p-8 rounded shadow w-full max-w-md">
      <h1 class="text-xl font-bold mb-4 text-center">Enter Invite Token</h1>

      <form @submit.prevent="submitToken" class="space-y-3">
        <input
          v-model="tokenInput"
          placeholder="Invite token"
          class="input"
        />

        <button class="btn" :disabled="loading">
          {{ loading ? 'Checking...' : 'Continue' }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>

    <!-- REGISTRATION FORM -->
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

      <button class="btn" :disabled="loading">
        {{ loading ? 'Registering...' : 'Register' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>
