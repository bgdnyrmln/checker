<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const checkedIn = ref(false)
const checkedInAt = ref(null)
const loading = ref(false)
const error = ref('')
const profileId = ref()
const route = useRoute()

profileId.value = route.params.id

/**
 * 🔐 Fetch & decode CSRF token
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

/**
 * Fetch current attendance status
 */
const fetchStatus = async () => {
  const res = await axios.get(`/api/attendance/status/${profileId.value}`)
  checkedIn.value = res.data.checked_in
  checkedInAt.value = res.data.checked_in_at
}

/**
 * Check in
 */
const checkIn = async () => {
  loading.value = true
  error.value = ''

  try {
    await getCsrfToken()
    await axios.post(`/api/attendance/check-in/${profileId.value}`)
    await fetchStatus()
  } catch (e) {
    error.value = e.response?.data?.message || 'Check-in failed'
  } finally {
    loading.value = false
  }
}

/**
 * Check out
 */
const checkOut = async () => {
  loading.value = true
  error.value = ''

  try {
    await getCsrfToken()
    await axios.post(`/api/attendance/check-out/${profileId.value}`)
    await fetchStatus()
  } catch (e) {
    error.value = e.response?.data?.message || 'Check-out failed'
  } finally {
    loading.value = false
  }
}

onMounted(fetchStatus)
</script>

<template>
    <Sidebar :items="[
    { text: 'Home', to: `/${profileId}/personal-cabinet` },
    { text: 'Stats', to: `/${profileId}/personal-cabinet/stats`}
    ]" />
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-xl font-bold mb-4">Attendance</h1>

    <p v-if="checkedIn && checkedInAt">
      Checked in at:
      <strong>{{ new Date(checkedInAt).toLocaleTimeString() }}</strong>
    </p>

    <div class="space-y-2 mt-4">
      <button
        v-if="!checkedIn"
        @click="checkIn"
        class="btn"
        :disabled="loading"
      >
        Check In
      </button>

      <button
        v-else
        @click="checkOut"
        class="btn"
        :disabled="loading"
      >
        Check Out
      </button>
    </div>

    <p v-if="error" class="error mt-2">{{ error }}</p>
  </div>
</template>

<style scoped>
.btn {
  @apply w-full bg-black text-white py-2 rounded;
}
.error {
  @apply text-red-500 text-sm;
}
</style>