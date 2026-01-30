<script setup>
    import { ref, onMounted, watch } from 'vue'
    import axios from 'axios'
    import { VueDatePicker } from '@vuepic/vue-datepicker'
    import '@vuepic/vue-datepicker/dist/main.css'


    // Axios defaults
    axios.defaults.baseURL = 'http://localhost:8000'
    axios.defaults.withCredentials = true
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

    // State
    const employees = ref([])
    const loading = ref(false)
    const error = ref('')
    const selectedDate = ref(new Date())
    const rangeMode = ref('day') // day | week | month
    const route = useRoute()

    // Date range helper
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

    // Fetch employees
    const companyId = ref(route.params.companyId) 
    const fetchEmployees = async () => {
        loading.value = true
        error.value = ''

        try {
            const { start_date, end_date } = getDateRange()
            const res = await axios.get(`/api/attendance/team/employees/${companyId.value}`, {
                params: { start_date, end_date, range: rangeMode.value }
            })

            employees.value = res.data
        } catch (e) {
            error.value = 'Failed to load employees'
            console.error(e)
        } finally {
            loading.value = false
        }
    }


    onMounted(fetchEmployees)
    watch([selectedDate, rangeMode], fetchEmployees)
</script>

<template>
    <Sidebar :items="[
    { text: 'Home', to: `/${profileId}/manager` },
    { text: 'Company', to: `/${profileId}/manager/company` },
    { text: 'Team', to: `/${profileId}/manager/team`},
    { text: 'Schedule', to: `/${profileId}/manager/schedule`},
    { text: 'Attendancy', to: `/${profileId}/manager/attendancy`},
    { text: 'Payrolls', to: `/${profileId}/manager/payrolls`},
    { text: 'Invites', to: `/${profileId}/manager/invite`}
    ]" />
  <div class="max-w-4xl mx-auto p-6 space-y-4">
    <h1 class="text-2xl font-bold text-[#1A1423]">
      Team Attendance — {{ rangeMode.toUpperCase() }}
    </h1>

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
        class="border rounded px-2 py-1"
      />
    </div>

    <p v-if="loading">Loading...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <div v-if="employees.length" class="space-y-3">
      <div v-if="employees.length" class="space-y-6">
        <div
          v-for="employee in employees"
          :key="employee.id"
          class="border rounded p-4 bg-[#D8E2DC]"
        >
            <p class="font-semibold text-lg">
                {{ employee.first_name }} {{ employee.last_name }}
            </p>
            <p class="text-sm text-gray-600 mb-3">{{ employee.email }}</p>

            <table
            v-if="rangeMode !== 'day'"
            class="w-full text-sm border border-gray-300"
            >
            <thead class="bg-gray-100">
                <tr>
                <th class="border px-2 py-1">Date</th>
                <th class="border px-2 py-1">Time In</th>
                <th class="border px-2 py-1">Time Out</th>
                <th class="border px-2 py-1">Time worked</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="day in employee.daily" :key="day.date">
                <td class="border px-2 py-1">{{ day.date }}</td>

                <td class="border px-2 py-1">{{ day.checked_in_at || '-' }}</td>
                <td class="border px-2 py-1">{{ day.checked_out_at || '-' }}</td>
                <td class="border px-2 py-1">
                    {{ day.total_time_seconds
                    ? `${Math.floor(day.total_time_seconds / 3600)}h ${Math.floor((day.total_time_seconds % 3600) / 60)}m`
                    : '0h 0m' }}
                </td>
                </tr>
            </tbody>
                <h1 class="border text-black">Total: {{ Math.floor(employee.total_time_seconds / 3600) }}h {{ Math.floor((employee.total_time_seconds % 3600) / 60) }}m</h1>

            </table>
            

            <!-- SINGLE ROW SUMMARY FOR DAY -->
            <div v-else class="text-sm text-right">
            {{ employee.daily.length ? 'Total today: ' : 'No attendance today.' }}
            {{ Math.floor(employee.total_time_seconds / 3600) }}h
            {{ Math.floor((employee.total_time_seconds % 3600) / 60) }}m
            </div>

        </div>
      </div>
    </div>
    <p v-else-if="!loading">No employees found.</p>
  </div>
</template>
