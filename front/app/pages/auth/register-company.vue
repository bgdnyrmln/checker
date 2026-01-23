<script setup>
definePageMeta({
  middleware: 'guest'
})

import { ref } from 'vue'
import axios from 'axios'

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

/**
 * Fetch + decode Sanctum CSRF cookie
 */
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

const submit = async () => {
  loading.value = true
  error.value = ''

  try {
    // 1️⃣ Get + decode CSRF token
    await getCsrfToken()

    // 2️⃣ Register company
    await axios.post('/api/register/company', form.value)

    success.value = true
  } catch (e) {
    error.value =
      e.response?.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <div class="min-h-screen flex items-center justify-center">
    <form
      @submit.prevent="submit"
      class="bg-white p-8 rounded w-[55rem] h-[50rem] shadow flex flex-col justify-around"
    >
      <h1 class="text-xl font-bold text-center pb-[2rem]">Company Registration</h1>
      <div class="flex flex-col gap-[1rem]">
        <input v-model="form.company_name" placeholder="Company name" class="input" />
        <input v-model="form.company_email" placeholder="Company email" class="input" />
      </div>
      <hr />
      <div class="flex flex-col gap-[1rem]">
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

        <button class="btn-primary" :disabled="loading">
          Register
        </button>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">Company registered</p>
        <div class="flex justify-between">
          <a href="/auth/register">Have a registration invite?</a>
          <a href="/auth/login">Already have an account?</a>
        </div>
      </div>
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
