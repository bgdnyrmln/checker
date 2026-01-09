<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Hello, Index Page</h1>

    <div v-if="loading">Loading user info...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Name:</strong> {{ user.first_name }} {{ user.last_name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

definePageMeta({
  middleware: 'user'
})

// Configure Axios for Sanctum
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const user = ref(null)
const loading = ref(true)
const error = ref('')

// Helper to fetch + decode CSRF cookie
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

const fetchUser = async () => {
  loading.value = true
  error.value = ''

  try {
    // 1️⃣ Get CSRF cookie
    await getCsrfToken()

    // 2️⃣ Fetch user info
    const res = await axios.get('/api/user')
    user.value = res.data
  } catch (e) {
    error.value = 'Failed to fetch user info'
  } finally {
    loading.value = false
  }
}

// Run on page load
onMounted(fetchUser)
</script>

<style scoped>
</style>
