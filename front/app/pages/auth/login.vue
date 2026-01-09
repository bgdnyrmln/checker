<script setup>
import { ref } from 'vue'
import axios from 'axios'

definePageMeta({
  middleware: 'guest'
})


// Axios global defaults
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

// Function to fetch CSRF cookie and decode it
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

// Login function
const login = async () => {
  error.value = ''
  loading.value = true

  try {
    // 1️⃣ Fetch + decode CSRF cookie
    await getCsrfToken()

    // 2️⃣ Send login request
    await axios.post('/login', {
      email: email.value,
      password: password.value
    })

    // 3️⃣ Redirect on success
    window.location.href = '/'
  } catch (e) {
    error.value = e.response?.data?.message || 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <form @submit.prevent="login" class="w-80 space-y-3 bg-white p-6 rounded shadow">
      <h1 class="text-xl font-bold text-center">Login</h1>

      <input v-model="email" type="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Password" class="input" />

      <button class="btn" :disabled="loading">Login</button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply w-full border px-3 py-2 rounded;
}
.btn {
  @apply w-full bg-black text-white py-2 rounded;
}
.error {
  @apply text-red-500 text-sm;
}
</style>
