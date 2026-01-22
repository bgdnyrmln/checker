<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'



axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
const selectedDate = ref(new Date()) // Today by default


const stats = ref([])



async function fetchStats () {
  try {
    const dateParam = selectedDate.value.toISOString().slice(0, 10)

    const res = await axios.get('/api/attendance/personal', {
      params: { date: dateParam }
    })

    stats.value = res.data
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}


onMounted(() => {
  fetchStats()
})

watch(selectedDate, fetchStats)


</script>


<template>
    <div>
        <div class="flex items-center gap-4">
        <span class="text-[#636B61] font-medium">Select Date:</span>
        <VueDatePicker
            v-model="selectedDate"
            :enable-time-picker="false"
            :auto-apply="true"
            class="border rounded px-2 py-1"
            input-class="text-[#1A1423] font-medium"
        />
        </div>
        <div class="flex items-center justify-between border-l-4 border-[#0B5351] p-4 rounded shadow-sm bg-[#D8E2DC]">
            <div>
            <p class="font-semibold text-[#1A1423]">
                First Checked In At:
            </p>
            </div>

            <div class="text-sm text-[#A67F8E] text-right space-y-1">
                {{ new Date(stats.checked_in_at).toLocaleTimeString() }}
            </div>
        </div>
        <div class="flex items-center justify-between border-l-4 border-[#0B5351] p-4 rounded shadow-sm bg-[#D8E2DC]">
            <div>
            <p class="font-semibold text-[#1A1423]">
                Last Checked Out At:
            </p>
            </div>

            <div class="text-sm text-[#A67F8E] text-right space-y-1">
                {{ new Date(stats.checked_out_at).toLocaleTimeString() }}
            </div>
        </div>
        <div class="flex items-center justify-between border-l-4 border-[#0B5351] p-4 rounded shadow-sm bg-[#D8E2DC]">
            <div>
            <p class="font-semibold text-[#1A1423]">
                Total Time Worked:
            </p>
            </div>

            <div class="text-sm text-[#A67F8E] text-right space-y-1">
                {{ stats.total_time_seconds ? `${Math.floor(stats.total_time_seconds / 3600)}h ${Math.floor((stats.total_time_seconds % 3600) / 60)}m` : '0h 0m' }}
            </div>
        </div>
    </div>
</template>