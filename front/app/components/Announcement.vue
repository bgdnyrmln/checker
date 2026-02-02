<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  companyId: Number
})

const announcements = ref([])

const fetchAnnouncements = async () => {
  try {
    const res = await axios.get('/api/announcements/banner', {
      params: { company_id: props.companyId }
    })
    announcements.value = res.data
  } catch (e) {
    console.error(e)
  }
}

onMounted(fetchAnnouncements)
</script>

<template>
  <div class="space-y-2 mb-4">
    <div v-for="a in announcements" :key="a.id" class="bg-[#0B5351] text-white px-4 py-2 rounded shadow">
      <p class="text-sm">{{ new Date(a.date).toLocaleDateString() }}</p>
      <p class="font-medium">{{ a.content }}</p>
    </div>
  </div>
</template>
