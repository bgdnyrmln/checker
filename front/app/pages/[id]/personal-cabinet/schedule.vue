<template>
  <div class="flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 p-6 ml-64 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">My Schedule</h1>

      <div v-if="loading" class="text-gray-500">
        Loading schedule...
      </div>

      <div v-if="error" class="text-red-500">
        {{ error }}
      </div>

      <div v-if="!loading" class="bg-white p-4 rounded shadow">
        <FullCalendar :options="calendarOptions" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'

definePageMeta({
  middleware: 'auth-company',
  requiresEmployee: true
})

const route = useRoute()
const profileId = route.params.id


const sidebarItems = [
  { text: 'Dashboard', to: `/${profileId}/personal-cabinet` },
  { text: 'Attendance', to: `/${profileId}/personal-cabinet/attendance` },
  { text: 'Payroll', to: `/${profileId}/personal-cabinet/payroll` },
  { text: 'Schedule', to: `/${profileId}/personal-cabinet/schedule` }
]



/* Axios defaults (same as other pages) */
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const loading = ref(false)
const error = ref('')
const events = ref([])

/* Fetch employee schedule */
const fetchSchedule = async () => {
  loading.value = true
  error.value = ''

  try {
    const res = await axios.get(
      `/api/shifts/schedule/${profileId}`
    )

    events.value = res.data.map(shift => ({
      id: shift.id,
      title: `${shift.starts_at.slice(0,5)} - ${shift.ends_at.slice(0,5)}`,
      start: shift.shift_date,
      allDay: true
    }))

  } catch (e) {
    console.error(e)
    error.value = 'Failed to load schedule'
  } finally {
    loading.value = false
  }
}

/* Calendar config */
const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  height: 650,
  events: events.value,
  eventColor: '#2563eb'
})

/* Make events reactive */
watch(events, (newEvents) => {
  calendarOptions.value.events = newEvents
})

onMounted(fetchSchedule)
</script>

<style>
.fc-toolbar-title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
