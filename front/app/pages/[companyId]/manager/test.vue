<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const profileId = ref(null)
const loading = ref(true)
const error = ref('')

const fetchProfile = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/profile') // your API to get logged-in CompanyUser
    profileId.value = res.data.id
  } catch (e) {
    console.error(e)
    error.value = 'Failed to fetch profile'
  } finally {
    loading.value = false
  }
}

onMounted(fetchProfile)
</script>

<template>
  <div>
    <p v-if="loading">Loading profile...</p>
    <p v-else-if="error">{{ error }}</p>
    <AnnouncementForm v-else :profileId="profileId" />
  </div>
</template>
