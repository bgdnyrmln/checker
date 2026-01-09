<script setup>
import { ref } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const link = ref('')

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

const createInvite = async () => {
  try {
    // 1️⃣ Fetch + decode CSRF
    await getCsrfToken()

    // 2️⃣ Create invite
    const res = await axios.post('/api/invites')

    link.value = res.data.link
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <button @click="createInvite">Generate Invite</button>
  <p v-if="link">{{ link }}</p>
</template>
