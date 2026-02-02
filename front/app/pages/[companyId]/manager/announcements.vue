<script setup>
import { ref } from 'vue'
import axios from 'axios'

const route = useRoute()
const companyId = route.params.companyId
const content = ref('')
const date = ref(new Date().toISOString().substr(0, 10))
const loading = ref(false)
const error = ref('')

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
    await getCsrfToken()
    await axios.post('/api/announcements', {
      company_id: companyId,
      content: content.value,
      date: date.value
    })
    content.value = ''
    alert('Announcement created!')
  } catch (e) {
    console.error(e)
    error.value = 'Failed to create announcement'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4">
    <h2 class="text-xl font-bold">Create Announcement</h2>

    <input type="date" v-model="date" class="border p-2 rounded w-full" />
    <textarea v-model="content" placeholder="Announcement content" class="border p-2 rounded w-full h-24"></textarea>

    <div class="flex items-center gap-2">
      <button @click="submit" :disabled="loading" class="bg-[#0B5351] text-white px-4 py-2 rounded">
        {{ loading ? 'Saving...' : 'Create' }}
      </button>
      <p class="text-red-500">{{ error }}</p>
    </div>
  </div>
</template>
