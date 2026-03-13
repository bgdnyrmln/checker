<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

definePageMeta({ middleware: 'auth-company' })

const route = useRoute()
const profileId = route.params.id

const sidebarItems = [
  { text: 'Dashboard',   to: `/${profileId}/personal-cabinet` },
  { text: 'Attendance',  to: `/${profileId}/personal-cabinet/attendance` },
  { text: 'Payroll',     to: `/${profileId}/personal-cabinet/payroll` },
  { text: 'Schedule',    to: `/${profileId}/personal-cabinet/schedule` },
  { text: 'Holidays',    to: `/${profileId}/personal-cabinet/holidays` },
  { text: 'Sick Leaves', to: `/${profileId}/personal-cabinet/sick-leaves` },
]

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const today = new Date()
const formatDate = (d) => d.toISOString().slice(0, 10)
const startDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth(), 2)))
const endDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)))

const attendance = ref(null)
const loading = ref(false)
const error = ref('')

const fetchAttendance = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/attendance/personal/${profileId}`, {
      params: { start_date: startDate.value, end_date: endDate.value }
    })
    const dailyLogs = res.data.daily || []
    const daily = dailyLogs.map(d => ({
      date: d.date,
      timeIn: d.checked_in_at || '-',
      timeOut: d.checked_out_at || '-',
      hours: parseFloat((d.total_time_seconds / 3600).toFixed(2))
    }))
    attendance.value = {
      daily,
      totalHours: daily.reduce((sum, d) => sum + d.hours, 0),
      totalTimeSeconds: res.data.total_time_seconds ?? 0
    }
  } catch (e) {
    error.value = 'Failed to load attendance'
  } finally {
    loading.value = false
  }
}

const exportCSV = () => {
  if (!attendance.value) return
  let csv = 'Date,Time In,Time Out,Hours\n'
  attendance.value.daily.forEach(d => { csv += `${d.date},${d.timeIn},${d.timeOut},${d.hours}\n` })
  csv += `\nTotal Hours,,,${attendance.value.totalHours}\n`
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
  link.download = `attendance_${startDate.value}_${endDate.value}.csv`
  link.click()
}

const exportXLS = () => {
  if (!attendance.value) return
  const data = attendance.value.daily.map(d => ({ Date: d.date, 'Time In': d.timeIn, 'Time Out': d.timeOut, Hours: d.hours }))
  data.push({}, { Date: 'Total Hours', Hours: attendance.value.totalHours })
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), 'Attendance')
  XLSX.writeFile(wb, `attendance_${startDate.value}_${endDate.value}.xlsx`)
}

const exportPDF = () => {
  if (!attendance.value) return
  const doc = new jsPDF()
  doc.setFontSize(18); doc.text('Attendance Report', 14, 20)
  doc.setFontSize(11); doc.text(`Period: ${startDate.value} - ${endDate.value}`, 14, 30)
  doc.text(`Total Hours: ${attendance.value.totalHours}`, 14, 36)
  autoTable(doc, { head: [['Date', 'Time In', 'Time Out', 'Hours']], body: attendance.value.daily.map(d => [d.date, d.timeIn, d.timeOut, d.hours]), startY: 45 })
  doc.save(`attendance_${startDate.value}_${endDate.value}.pdf`)
}

onMounted(fetchAttendance)
</script>

<template>
  <div class="page-wrapper flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 pl-[22rem] min-h-screen relative overflow-hidden">

      <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>
      <div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none"></div>

      <div class="relative z-10 max-w-[96rem] mx-auto py-[4rem] px-[4rem]">

        <!-- Page header -->
        <div class="mb-[4rem]">
          <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]">Personal Cabinet</p>
          <h1 class="page-title text-[3.6rem] leading-none tracking-wide">My Attendance</h1>
        </div>

        <!-- Filters + Export bar -->
        <div class="filter-card rounded-[1.6rem] p-[2.4rem] mb-[2.4rem]">
          <div class="flex flex-wrap items-center gap-[1.6rem]">

            <!-- Date inputs -->
            <div class="flex items-center gap-[1.2rem]">
              <div class="flex flex-col gap-[0.4rem]">
                <label class="page-label text-[1rem] tracking-[0.15em] uppercase">From</label>
                <input type="date" v-model="startDate" class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
              </div>
              <div class="arrow-sep mt-[1.8rem] text-[1.4rem]">→</div>
              <div class="flex flex-col gap-[0.4rem]">
                <label class="page-label text-[1rem] tracking-[0.15em] uppercase">To</label>
                <input type="date" v-model="endDate" class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
              </div>
            </div>

            <button
              @click="fetchAttendance"
              class="calc-btn relative flex items-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 mt-[1.8rem]"
            >
              <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
              </svg>
              Calculate
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
            </button>

            <!-- Export buttons -->
            <div class="flex items-center gap-[1rem] ml-auto mt-[1.8rem]">
              <span class="page-label text-[1rem] tracking-[0.15em] uppercase mr-[0.4rem]">Export</span>
              <button @click="exportCSV" class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200">
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                </svg>
                CSV
              </button>
              <button @click="exportXLS" class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200">
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-7.5 0h6m-6 0A1.125 1.125 0 019 13.125v-1.5A1.125 1.125 0 0110.125 10.5m.75 2.625c.621 0 1.125.504 1.125 1.125v3"/>
                </svg>
                XLS
              </button>
              <button @click="exportPDF" class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200">
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                </svg>
                PDF
              </button>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center gap-[1.6rem] py-[4rem] justify-center">
          <div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin"></div>
          <span class="page-label text-[1.2rem] tracking-[0.12em]">Loading attendance...</span>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem]">
          <span>⚠</span> {{ error }}
        </div>

        <!-- Table -->
        <div v-else-if="attendance && attendance.daily.length" class="table-card rounded-[1.6rem] overflow-hidden">

          <!-- Summary header -->
          <div class="table-summary flex items-center justify-between px-[3rem] py-[2rem]">
            <div>
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Period</p>
              <p class="table-text text-[1.4rem]">{{ startDate }} → {{ endDate }}</p>
            </div>
            <div class="text-right">
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Total</p>
              <p class="page-title text-[2.4rem] leading-none tabular-nums">
                {{ attendance.totalHours.toFixed(2) }}<span class="table-sub text-[1.4rem] ml-[0.4rem]">hrs</span>
              </p>
            </div>
          </div>

          <table class="w-full">
            <thead>
              <tr class="table-head-row">
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Date</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Time In</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Time Out</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal">Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(d, i) in attendance.daily"
                :key="d.date"
                class="table-row"
                :class="i % 2 === 0 ? 'row-even' : 'row-odd'"
              >
                <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]">{{ d.date }}</td>
                <td class="px-[3rem] py-[1.6rem] text-[1.3rem]" :class="d.timeIn === '-' ? 'table-empty' : 'table-text'">{{ d.timeIn }}</td>
                <td class="px-[3rem] py-[1.6rem] text-[1.3rem]" :class="d.timeOut === '-' ? 'table-empty' : 'table-text'">{{ d.timeOut }}</td>
                <td class="px-[3rem] py-[1.6rem] text-[1.3rem] text-right tabular-nums">
                  <span v-if="d.hours > 0" class="table-text">{{ d.hours }}<span class="table-empty text-[1.1rem] ml-[0.3rem]">h</span></span>
                  <span v-else class="table-empty">—</span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="table-foot-row">
                <td colspan="3" class="px-[3rem] py-[1.8rem] text-[1.1rem] tracking-[0.12em] uppercase text-right table-sub">Total Hours</td>
                <td class="px-[3rem] py-[1.8rem] text-[1.8rem] text-right tabular-nums font-medium page-title">
                  {{ attendance.totalHours.toFixed(2) }}<span class="table-sub text-[1.2rem] ml-[0.3rem]">h</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Empty state -->
        <div v-else-if="!loading" class="flex flex-col items-center justify-center py-[8rem] text-center">
          <div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]">
            <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
            </svg>
          </div>
          <p class="table-sub text-[1.4rem] tracking-[0.06em]">No attendance data for this period.</p>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
.page-wrapper { background-color: var(--bg-main); transition: background-color 0.3s ease; }

.blob-1 { background-color: var(--bg-subtle); opacity: 0.5; }
.blob-2 { background-color: var(--bg-subtle); opacity: 0.3; }

.page-label { color: var(--text-light); }
.page-title { color: var(--text-main); }

/* Filter card */
.filter-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.date-input {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border-hover);
  color: var(--text-main);
  colorscheme: light;
}

[data-theme="dark"] .date-input { color-scheme: dark; }

.date-input:focus {
  border-color: var(--primary);
  background-color: var(--bg-card);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.arrow-sep { color: var(--text-light); }

.calc-btn {
  background-color: var(--primary);
  box-shadow: 0 0.2rem 0.8rem var(--primary-soft);
}
.calc-btn:hover {
  background-color: var(--primary-hover);
  box-shadow: var(--shadow-md);
}

.export-btn {
  background-color: var(--bg-card);
  border: 1px solid var(--border-hover);
  color: var(--text-muted);
}
.export-btn:hover {
  border-color: var(--primary);
  color: var(--text-main);
  box-shadow: var(--shadow-sm);
}

/* Spinner */
.spinner {
  border: 1px solid var(--border-hover);
  border-top-color: var(--primary);
}

/* Error */
.error-bar {
  background-color: var(--danger-soft);
  border: 1px solid var(--danger);
  color: var(--danger);
}

/* Table */
.table-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

.table-summary {
  border-bottom: 1px solid var(--border);
}

.table-text  { color: var(--text-main); }
.table-sub   { color: var(--text-muted); }
.table-empty { color: var(--text-light); }

.table-head-row { border-bottom: 1px solid var(--border); }

.table-row { border-bottom: 1px solid var(--border); transition: background-color 0.15s ease; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background-color: var(--bg-subtle); }

.row-even { background-color: var(--bg-card); }
.row-odd  { background-color: color-mix(in srgb, var(--bg-subtle) 40%, transparent); }

.table-foot-row {
  border-top: 1px solid var(--border-hover);
  background-color: var(--bg-subtle);
}

/* Empty state */
.empty-icon {
  background-color: var(--bg-subtle);
  color: var(--text-light);
}

main::-webkit-scrollbar { width: 6px; }
main::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 3px; }
</style>