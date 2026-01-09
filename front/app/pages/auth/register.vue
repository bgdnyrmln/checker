<script setup>
import { ref } from 'vue'
import axios from 'axios'



definePageMeta({
  middleware: 'guest'
})

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const form = ref({
  company_name: '',
  company_email: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const loading = ref(false)
const error = ref('')
const success = ref(false)

// 1️⃣ Fetch + decode CSRF cookie
const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')

  const token = decodeURIComponent(
    document.cookie
      .split('; ')
      .find(c => c.startsWith('XSRF-TOKEN='))
      ?.split('=')[1]
  )

  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const submit = async () => {
  loading.value = true
  error.value = ''

  try {
    await getCsrfToken()

    await axios.post('/api/register/company', form.value)

    success.value = true
  } catch (e) {
    error.value = e.response?.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      @submit.prevent="submit"
      class="bg-white p-8 rounded shadow w-full max-w-md space-y-3"
    >
      <h1 class="text-xl font-bold text-center">Company Registration</h1>

      <input v-model="form.company_name" placeholder="Company name" class="input" />
      <input v-model="form.company_email" placeholder="Company email" class="input" />

      <hr />

      <input v-model="form.first_name" placeholder="First name" class="input" />
      <input v-model="form.last_name" placeholder="Last name" class="input" />
      <input v-model="form.email" placeholder="Admin email" class="input" />
      <input type="password" v-model="form.password" placeholder="Password" class="input" />
      <input
        type="password"
        v-model="form.password_confirmation"
        placeholder="Confirm password"
        class="input"
      />

      <button class="btn" :disabled="loading">
        Register
      </button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">Company registered</p>
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
.success {
  @apply text-green-600 text-sm;
}
</style>
