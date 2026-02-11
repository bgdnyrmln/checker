<template>
  <div class="flex flex-col justify-center items-center p-8 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">My Profile</h1>

    <div class="bg-white shadow rounded-lg p-6 max-w-xl">

      <div v-if="loading" class="text-gray-500">Loading profile...</div>
      <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

      <div v-if="profile">
        <div class="mb-4">
          <label class="block text-sm text-gray-600 mb-1">First Name</label>
          <input v-model="profile.first_name" class="w-full border rounded px-3 py-2" />
        </div>

        <div class="mb-4">
          <label class="block text-sm text-gray-600 mb-1">Last Name</label>
          <input v-model="profile.last_name" class="w-full border rounded px-3 py-2" />
        </div>

        <div class="mb-4">
          <label class="block text-sm text-gray-600 mb-1">Email</label>
          <input v-model="profile.email" class="w-full border rounded px-3 py-2" />
        </div>

        <button
          @click="updateProfile"
          class="bg-black text-white py-2 rounded w-full"
          :disabled="saving"
        >
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>

        <p v-if="success" class="text-green-600 mt-3">
          Profile updated successfully!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'


/* --------------------------
   AXIOS
-------------------------- */
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

/* --------------------------
   STATE
-------------------------- */
const profile = ref(null)
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const success = ref(false)

/* --------------------------
   FETCH PROFILE
-------------------------- */
const fetchProfile = async () => {
  loading.value = true
  error.value = ''

  try {
    const res = await axios.get(`/api/user`)
    profile.value = res.data
  } catch (e) {
    error.value = 'Failed to load profile'
  } finally {
    loading.value = false
  }
}


/* ----------------------------------
   CSRF
-----------------------------------*/
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


/* --------------------------
   UPDATE PROFILE
-------------------------- */
const updateProfile = async () => {
  saving.value = true
  error.value = ''
  success.value = false

  try {
    await getCsrfToken()
    await axios.put(`/api/user`, profile.value)
    success.value = true
  } catch (e) {
    error.value = e.response?.data?.message || 'Update failed'
  } finally {
    saving.value = false
  }
}

/* --------------------------
   INIT
-------------------------- */
onMounted(fetchProfile)
</script>
