<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

definePageMeta({
  middleware: 'auth-company',
  requiresManager: true
})


// Axios defaults
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Route & company ID
const route = useRoute()
const companyId = ref(route.params.companyId)

// State
const selectedDate = ref(new Date())
const rangeMode = ref('day') // day | week | month
const shifts = ref([])
const loading = ref(false)
const error = ref('')

// Helper: compute start/end dates based on rangeMode
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
    start.setDate(date.getDate() - day + 1) // Monday
    end = new Date(start)
    end.setDate(start.getDate() + 6) // Sunday
  }

  if (rangeMode.value === 'month') {
    start = new Date(date.getFullYear(), date.getMonth(), 1)
    end = new Date(date.getFullYear(), date.getMonth() + 1, 0) // Last day of month
  }

  return {
    start_date: start.toISOString().slice(0, 10),
    end_date: end.toISOString().slice(0, 10),
  }
}

// Fetch shifts
const fetchShifts = async () => {
  loading.value = true
  error.value = ''
  try {
    const { start_date, end_date } = getDateRange()
    const res = await axios.get(`/api/shifts/company/${companyId.value}`, {
      params: { start_date, end_date },
    })
    shifts.value = res.data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load shifts'
  } finally {
    loading.value = false
  }
}

onMounted(fetchShifts)
watch([selectedDate, rangeMode], fetchShifts)
</script>

<template>
    <Sidebar :items="[
    { text: 'Home', to: `/${companyId}/manager` },
    { text: 'Company', to: `/${companyId}/manager/company` },
    { text: 'Team', to: `/${companyId}/manager/team`},
    { text: 'Schedule', to: `/${companyId}/manager/schedule`, children: [{ text: 'Add Shift', to: `/${companyId}/manager/schedule/add`}]},
    { text: 'Attendancy', to: `/${companyId}/manager/attendancy`},
    { text: 'Payrolls', to: `/${companyId}/manager/payrolls`},
    { text: 'Invites', to: `/${companyId}/manager/invite`}
    ]" />
  <div class="max-w-6xl mx-auto p-6 space-y-4">
    <h1 class="text-2xl font-bold">Team Shifts — {{ rangeMode.toUpperCase() }}</h1>

    <div class="flex items-center gap-4">
      <span class="font-medium">Select Date / Range:</span>

      <button
        @click="rangeMode = 'day'"
        :class="{ 'bg-[#0B5351] text-white': rangeMode === 'day', 'border px-2 py-1': true }"
      >
        Day
      </button>
      <button
        @click="rangeMode = 'week'"
        :class="{ 'bg-[#0B5351] text-white': rangeMode === 'week', 'border px-2 py-1': true }"
      >
        Week
      </button>
      <button
        @click="rangeMode = 'month'"
        :class="{ 'bg-[#0B5351] text-white': rangeMode === 'month', 'border px-2 py-1': true }"
      >
        Month
      </button>

      <VueDatePicker
        v-model="selectedDate"
        :enable-time-picker="false"
        :auto-apply="true"
        class="border rounded px-2 py-1"
      />
    </div>

    <p v-if="loading" class="text-gray-500">Loading shifts...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <table v-if="shifts.length" class="w-full border-collapse border text-sm mt-4">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-2 py-1">Date</th>
          <th class="border px-2 py-1">Employee</th>
          <th class="border px-2 py-1">Start</th>
          <th class="border px-2 py-1">End</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shift in shifts" :key="shift.id" class="hover:bg-gray-50">
          <td class="border px-2 py-1">{{ shift.shift_date }}</td>
          <td class="border px-2 py-1">{{ shift.company_user.user.first_name }} {{ shift.company_user.user.last_name }}</td>
          <td class="border px-2 py-1">{{ shift.starts_at }}</td>
          <td class="border px-2 py-1">{{ shift.ends_at }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else-if="!loading">No shifts found for this range.</p>
  </div>
</template>
