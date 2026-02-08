<script setup>
import { ref, onMounted, watch } from 'vue'

definePageMeta({
  middleware: 'auth-company'
})


const route = useRoute()
const profileId = ref()
profileId.value = route.params.id;
import axios from 'axios'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// STATE
const selectedDate = ref(new Date())
const rangeMode = ref('day')
const records = ref([])       
const stats = ref(null)          
const loading = ref(false)
const error = ref('')

// DATE RANGE (same as team)
const getDateRange = () => {
  const date = new Date(selectedDate.value)
  let start, end

  if (rangeMode.value === 'day') {
    start = new Date(date)
    end = new Date(date)
  }

  if (rangeMode.value === 'week') {
    const day = date.getDay() || 7
    start = new Date(date)
    start.setDate(date.getDate() - day + 1)
    end = new Date(start)
    end.setDate(start.getDate() + 6)
  }

  if (rangeMode.value === 'month') {
    start = new Date(date.getFullYear(), date.getMonth(), 2)
    end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  }

  return {
    start_date: start.toISOString().slice(0, 10),
    end_date: end.toISOString().slice(0, 10)
  }
}


const fetchStats = async () => {
  loading.value = true
  error.value = ''

  try {
    const { start_date, end_date } = getDateRange()

    const res = await axios.get(`/api/attendance/personal/${profileId.value}`, {
      params: { start_date, end_date, range: rangeMode.value }
    })

    stats.value = res.data
    records.value = res.data.daily
  } catch (e) {
    error.value = 'Failed to load attendance'
    console.error(e)
  } finally {
    loading.value = false
  }
}


onMounted(fetchStats)
watch([selectedDate, rangeMode], fetchStats)
</script>


<template>
    <Sidebar :items="[
    { text: 'Home', to: `/${profileId}/personal-cabinet` },
    { text: 'Stats', to: `/${profileId}/personal-cabinet/stats`}
    ]" />
  <div class="pl-[20rem] pt-[5rem] pr-[5rem]">
    <h1 class="text-2xl font-bold text-[#1A1423]">
      My Attendance — {{ rangeMode.toUpperCase() }}
    </h1>

    <!-- Controls -->
    <div class="flex items-center gap-4">
      <span class="text-[#636B61] font-medium">Select Date:</span>

      <button
        class="border rounded px-2 py-1"
        :class="{ 'bg-[#0B5351] text-white': rangeMode === 'day' }"
        @click="rangeMode = 'day'"
      >Day</button>

      <button
        class="border rounded px-2 py-1"
        :class="{ 'bg-[#0B5351] text-white': rangeMode === 'week' }"
        @click="rangeMode = 'week'"
      >Week</button>

      <button
        class="border rounded px-2 py-1"
        :class="{ 'bg-[#0B5351] text-white': rangeMode === 'month' }"
        @click="rangeMode = 'month'"
      >Month</button>

      <VueDatePicker
        v-model="selectedDate"
        :enable-time-picker="false"
        :auto-apply="true"
        class="border rounded px-2 py-1 text-sm"
      />
    </div>

    <p v-if="loading">Loading...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <!-- TABLE FOR WEEK / MONTH -->
    <table
      v-if="records.length && rangeMode !== 'day'"
      class="w-full text-sm border border-gray-300"
    >
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-2 py-1">Date</th>
          <th class="border px-2 py-1">Time In</th>
          <th class="border px-2 py-1">Time Out</th>
          <th class="border px-2 py-1">Time Worked</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="day in records" :key="day.date">
          <td class="border px-2 py-1">{{ day.date }}</td>
          <td class="border px-2 py-1">{{ day.checked_in_at || '-' }}</td>
          <td class="border px-2 py-1">{{ day.checked_out_at || '-' }}</td>
          <td class="border px-2 py-1">
            {{ day.total_time_seconds
              ? `${Math.floor(day.total_time_seconds / 3600)}h ${Math.floor((day.total_time_seconds % 3600) / 60)}m`
              : '0h 0m' }}
          </td>
        </tr>
            <h1 class="border text-black">Total: {{ Math.floor(stats.total_time_seconds / 3600) }}h {{ Math.floor((stats.total_time_seconds % 3600) / 60) }}m</h1>
      </tbody>
    </table>

    <!-- DAY SUMMARY -->
    <div v-else-if="records.length" class="text-sm text-right"> 
      <div class="flex gap-2 justify-between border p-4 bg-gray-100 rounded-[1rem] mt-4 h-[7rem]">
        <div class="flex flex-col justify-center gap-[2rem]">
            <div class="flex gap-1">
                <h1>First checked in at:</h1>
                <p>{{ records[0].checked_in_at || '-' }}</p>
            </div>
            <div class="flex gap-1">
                <h1>Last checked out at:</h1>
                <p>{{ records[0].checked_out_at || '-' }}</p>
            </div>
        </div>
        <div class="flex gap-[1rem] items-center">
            <h1>Total today:</h1>
            <p>{{ Math.floor(records[0].total_time_seconds / 3600) }}h</p>
            <p>{{ Math.floor((records[0].total_time_seconds % 3600) / 60) }}m</p>
        </div>
      </div>
    </div>

    <p v-else-if="!loading">No attendance found.</p>
  </div>
</template>
