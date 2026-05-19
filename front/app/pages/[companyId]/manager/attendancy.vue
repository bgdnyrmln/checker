<template>
  <div class="page-wrapper flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden">
      <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>
      <div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none"></div>

      <div class="relative z-10 max-w-[120rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[1.6rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]">

        <!-- Page header -->
        <div class="mb-[4rem] max-[768px]:mb-[2.4rem]">
          <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]">Pārvaldnieka panelis</p>
          <h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide">Darbinieku apmeklējumi</h1>
        </div>

        <!-- Error -->
        <div v-if="error" class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]">
          <svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z"/>
          </svg>
          {{ error }}
        </div>

        <!-- ── Filters + Export ── -->
        <div class="filter-card rounded-[1.6rem] p-[2.4rem] mb-[2rem] max-[768px]:p-[1.6rem]">
          <div class="flex flex-wrap items-end gap-[1.6rem] max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-[1.2rem]">

            <!-- Date range -->
            <div class="flex items-center gap-[1.2rem] max-[480px]:flex-col max-[480px]:items-stretch max-[480px]:gap-[1rem]">
              <div class="flex flex-col gap-[0.4rem]">
                <label class="page-label text-[1rem] tracking-[0.15em] uppercase">No</label>
                <input type="date" v-model="startDate" class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
              </div>
              <div class="arrow-sep mt-[1.8rem] text-[1.4rem] max-[480px]:hidden">→</div>
              <div class="flex flex-col gap-[0.4rem]">
                <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Līdz</label>
                <input type="date" v-model="endDate" class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
              </div>
            </div>

            <button @click="fetchEmployeesAttendance" class="calc-btn relative flex items-center justify-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200">
              <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
              </svg>
              Aprēķināt
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
            </button>

            <!-- Export -->
            <div class="flex items-center gap-[1rem] max-[768px]:ml-0 ml-auto max-[480px]:flex-wrap">
              <span class="page-label text-[1rem] tracking-[0.15em] uppercase mr-[0.4rem] max-[480px]:w-full">Eksportēt</span>
              <button @click="exportCSV" class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200">
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
                CSV
              </button>
              <button @click="exportXLS" class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200">
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75"/></svg>
                XLS
              </button>
              <button @click="exportPDF" class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200">
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
                PDF
              </button>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center gap-[1.6rem] py-[4rem] justify-center">
          <div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin"></div>
          <span class="page-label text-[1.2rem] tracking-[0.12em]">Ielādē apmeklējumus…</span>
        </div>

        <!-- ── Data ── -->
        <div v-else-if="employees.length" class="table-card rounded-[1.6rem] overflow-hidden">

          <!-- Summary header -->
          <div class="table-summary flex items-center justify-between px-[3rem] py-[2rem] max-[768px]:px-[1.6rem] max-[768px]:py-[1.4rem]">
            <div>
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Laika periods</p>
              <p class="table-text text-[1.4rem] max-[480px]:text-[1.2rem]">{{ startDate }} → {{ endDate }}</p>
            </div>
            <div class="text-right">
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Darbinieki</p>
              <p class="page-title text-[2.4rem] leading-none tabular-nums">
                {{ employees.length }}<span class="table-sub text-[1.4rem] ml-[0.4rem]">emp</span>
              </p>
            </div>
          </div>

          <!-- ── DESKTOP TABLE ── -->
          <table class="w-full max-[768px]:hidden">
            <thead>
              <tr class="table-head-row">
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Darbinieks</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">E-pasts</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Datums</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Ierakstīšanās</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Izrakstīšanās</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal">Stundas</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="emp in employees" :key="emp.id">
                <tr
                  v-for="(d, di) in emp.daily"
                  :key="d.date"
                  class="table-row"
                  :class="rowIndex(emp, di) % 2 === 0 ? 'row-even' : 'row-odd'"
                >
                  <td class="px-[3rem] py-[1.6rem]">
                    <template v-if="di === 0">
                      <div class="flex items-center gap-[1.2rem]">
                        <div class="emp-avatar w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center text-[1.1rem] text-white flex-shrink-0">
                          {{ emp.first_name?.[0]?.toUpperCase() }}
                        </div>
                        <span class="table-text text-[1.3rem]">{{ emp.first_name }} {{ emp.last_name }}</span>
                      </div>
                    </template>
                    <span v-else class="table-empty text-[1.3rem] pl-[4.4rem]">↳</span>
                  </td>
                  <td class="px-[3rem] py-[1.6rem]">
                    <span v-if="di === 0" class="table-text text-[1.3rem]">{{ emp.email }}</span>
                  </td>
                  <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]">{{ d.date }}</td>
                  <td class="px-[3rem] py-[1.6rem] text-[1.3rem]" :class="d.checked_in_at ? 'table-text tabular-nums' : 'table-empty'">
                    {{ d.checked_in_at || '—' }}
                  </td>
                  <td class="px-[3rem] py-[1.6rem] text-[1.3rem]" :class="d.checked_out_at ? 'table-text tabular-nums' : 'table-empty'">
                    {{ d.checked_out_at || '—' }}
                  </td>
                  <td class="px-[3rem] py-[1.6rem] text-[1.3rem] text-right tabular-nums">
                    <span v-if="d.total_time_seconds > 0" class="table-text">
                      {{ (d.total_time_seconds / 3600).toFixed(2) }}<span class="table-empty text-[1.1rem] ml-[0.2rem]">h</span>
                    </span>
                    <span v-else class="table-empty">—</span>
                  </td>
                </tr>
                <!-- Per-employee subtotal -->
                <tr class="emp-subtotal-row">
                  <td colspan="5" class="px-[3rem] py-[1.2rem] text-[1.1rem] tracking-[0.1em] uppercase text-right table-sub">
                    {{ emp.first_name }} {{ emp.last_name }} — Total
                  </td>
                  <td class="px-[3rem] py-[1.2rem] text-right tabular-nums table-text text-[1.4rem] font-medium">
                    {{ empTotalHours(emp) }}<span class="table-empty text-[1.1rem] ml-[0.2rem]">h</span>
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr class="table-foot-row">
                <td colspan="5" class="px-[3rem] py-[1.8rem] text-[1.1rem] tracking-[0.12em] uppercase text-right table-sub">Grand Total</td>
                <td class="px-[3rem] py-[1.8rem] text-[1.8rem] text-right tabular-nums font-medium page-title">
                  {{ grandTotalHours }}<span class="table-sub text-[1.2rem] ml-[0.3rem]">h</span>
                </td>
              </tr>
            </tfoot>
          </table>

          <!-- ── MOBILE CARDS ── -->
          <div class="hidden max-[768px]:block">
            <div v-for="emp in employees" :key="emp.id" class="emp-group">

              <!-- Employee header -->
              <div class="emp-group-header flex items-center justify-between px-[1.6rem] py-[1.4rem]">
                <div class="flex items-center gap-[1.2rem] min-w-0">
                  <div class="emp-avatar w-[3.6rem] h-[3.6rem] rounded-full flex items-center justify-center text-[1.3rem] text-white flex-shrink-0">
                    {{ emp.first_name?.[0]?.toUpperCase() }}
                  </div>
                  <div class="min-w-0">
                    <p class="table-text text-[1.4rem] font-medium truncate">{{ emp.first_name }} {{ emp.last_name }}</p>
                    <p class="table-sub text-[1.1rem] truncate">{{ emp.email }}</p>
                  </div>
                </div>
                <div class="text-right flex-shrink-0 ml-[1rem]">
                  <p class="page-label text-[0.9rem] tracking-[0.15em] uppercase mb-[0.1rem]">Total</p>
                  <p class="table-text text-[1.6rem] tabular-nums font-medium leading-none">
                    {{ empTotalHours(emp) }}<span class="table-sub text-[1rem] ml-[0.2rem]">h</span>
                  </p>
                </div>
              </div>

              <!-- Daily rows -->
              <div class="flex flex-col divide-y divide-[var(--border)]">
                <div
                  v-for="d in emp.daily"
                  :key="d.date"
                  class="daily-row px-[1.6rem] py-[1.2rem]"
                >
                  <!-- Date + hours on same line -->
                  <div class="flex items-center justify-between mb-[0.6rem]">
                    <span class="table-text text-[1.3rem] font-medium tabular-nums">{{ d.date }}</span>
                    <span v-if="d.total_time_seconds > 0" class="hours-badge text-[1.1rem] tabular-nums px-[0.8rem] py-[0.2rem] rounded-full">
                      {{ (d.total_time_seconds / 3600).toFixed(2) }}h
                    </span>
                    <span v-else class="table-empty text-[1.1rem]">—</span>
                  </div>
                  <!-- In / Out times -->
                  <div class="flex items-center gap-[1.6rem]">
                    <div class="flex items-center gap-[0.5rem]">
                      <svg class="w-[1.1rem] h-[1.1rem] flex-shrink-0" style="color:var(--text-muted)" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                      </svg>
                      <span class="text-[1.2rem] tabular-nums" :class="d.checked_in_at ? 'table-text' : 'table-empty'">{{ d.checked_in_at || '—' }}</span>
                    </div>
                    <span class="table-empty text-[1rem]">→</span>
                    <div class="flex items-center gap-[0.5rem]">
                      <svg class="w-[1.1rem] h-[1.1rem] flex-shrink-0" style="color:var(--text-muted)" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
                      </svg>
                      <span class="text-[1.2rem] tabular-nums" :class="d.checked_out_at ? 'table-text' : 'table-empty'">{{ d.checked_out_at || '—' }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Employee subtotal -->
              <div class="emp-subtotal-mobile flex items-center justify-between px-[1.6rem] py-[1.2rem]">
                <span class="page-label text-[1rem] tracking-[0.15em] uppercase">{{ emp.first_name }} {{ emp.last_name }} — Total</span>
                <span class="table-text text-[1.4rem] tabular-nums font-medium">
                  {{ empTotalHours(emp) }}<span class="table-empty text-[1.1rem] ml-[0.2rem]">h</span>
                </span>
              </div>
            </div>

            <!-- Grand total -->
            <div class="table-foot-row flex items-center justify-between px-[1.6rem] py-[1.4rem]">
              <span class="page-label text-[1rem] tracking-[0.15em] uppercase">Grand Total</span>
              <span class="page-title text-[2rem] tabular-nums font-medium">
                {{ grandTotalHours }}<span class="table-sub text-[1.2rem] ml-[0.3rem]">h</span>
              </span>
            </div>
          </div>

        </div>

        <!-- Empty state -->
        <div v-else-if="!loading" class="flex flex-col items-center justify-center py-[8rem] text-center">
          <div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]">
            <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
            </svg>
          </div>
          <p class="table-sub text-[1.4rem] tracking-[0.06em]">No attendance data for this period.</p>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

definePageMeta({ middleware: 'auth-company', requiresManager: true })

const route = useRoute()
const companyId = route.params.companyId

const sidebarItems = [
  { text: 'Sākums',       to: `/${companyId}/manager` },
  { text: 'Uzņēmums',     to: `/${companyId}/manager/company` },
  { text: 'Komanda',       to: `/${companyId}/manager/team` },
  { text: 'Grafiks',      to: `/${companyId}/manager/schedule` },
  { text: 'Apmeklējumi',   to: `/${companyId}/manager/attendancy` },
  { text: 'Algas',         to: `/${companyId}/manager/payrolls` },
  { text: 'Ielūgumi',      to: `/${companyId}/manager/invite` },
  { text: 'Brīvdienas',    to: `/${companyId}/manager/holidays` },
  { text: 'Slimības atvaļinājumi', to: `/${companyId}/manager/sick-leaves` },
]

axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const today = new Date()
const formatDate = (d) => d.toISOString().slice(0, 10)
const startDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth(), 2)))
const endDate   = ref(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)))

const employees = ref([])
const loading   = ref(false)
const error     = ref('')

const fetchEmployeesAttendance = async () => {
  loading.value = true; error.value = ''
  try {
    const res = await axios.get(`/api/attendance/team/employees/${companyId}`, {
      params: { start_date: startDate.value, end_date: endDate.value }
    })
    employees.value = res.data
  } catch (e) {
    error.value = 'Failed to load attendance'
  } finally {
    loading.value = false
  }
}

const empTotalHours = (emp) =>
  emp.daily.reduce((sum, d) => sum + d.total_time_seconds / 3600, 0).toFixed(2)

const grandTotalHours = computed(() =>
  employees.value.reduce((sum, emp) =>
    sum + emp.daily.reduce((s, d) => s + d.total_time_seconds / 3600, 0), 0
  ).toFixed(2)
)

const rowIndex = (() => {
  let counter = 0
  const cache = new WeakMap()
  return (emp, di) => {
    if (!cache.has(emp)) cache.set(emp, counter)
    return cache.get(emp) + di
  }
})()

const exportCSV = () => {
  if (!employees.value.length) return
  let csv = 'Employee,Email,Date,Time In,Time Out,Hours\n'
  employees.value.forEach(emp =>
    emp.daily.forEach(d => {
      csv += `${emp.first_name} ${emp.last_name},${emp.email},${d.date},${d.checked_in_at || '-'},${d.checked_out_at || '-'},${(d.total_time_seconds / 3600).toFixed(2)}\n`
    })
  )
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })),
    download: `team_attendance_${startDate.value}_${endDate.value}.csv`
  })
  a.click()
}

const exportXLS = () => {
  if (!employees.value.length) return
  const data = []
  employees.value.forEach(emp =>
    emp.daily.forEach(d => data.push({
      Employee: `${emp.first_name} ${emp.last_name}`,
      Email: emp.email, Date: d.date,
      'Time In': d.checked_in_at || '-', 'Time Out': d.checked_out_at || '-',
      Hours: (d.total_time_seconds / 3600).toFixed(2)
    }))
  )
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), 'Team Attendance')
  XLSX.writeFile(wb, `team_attendance_${startDate.value}_${endDate.value}.xlsx`)
}

const exportPDF = () => {
  if (!employees.value.length) return
  const doc = new jsPDF()
  doc.setFontSize(18); doc.text('Team Attendance Report', 14, 20)
  doc.setFontSize(11); doc.text(`Period: ${startDate.value} – ${endDate.value}`, 14, 30)
  const rows = []
  employees.value.forEach(emp =>
    emp.daily.forEach(d => rows.push([
      `${emp.first_name} ${emp.last_name}`, emp.email, d.date,
      d.checked_in_at || '-', d.checked_out_at || '-',
      (d.total_time_seconds / 3600).toFixed(2)
    ]))
  )
  autoTable(doc, { head: [['Employee','Email','Date','Time In','Time Out','Hours']], body: rows, startY: 40 })
  doc.save(`team_attendance_${startDate.value}_${endDate.value}.pdf`)
}

onMounted(fetchEmployeesAttendance)
</script>

<style scoped>
.page-wrapper { background-color: var(--bg-main); transition: background-color 0.3s ease; }
.blob-1 { background-color: var(--bg-subtle); opacity: 0.5; }
.blob-2 { background-color: var(--bg-subtle); opacity: 0.3; }

.page-label  { color: var(--text-light); }
.page-title  { color: var(--text-main); }
.table-text  { color: var(--text-main); }
.table-sub   { color: var(--text-muted); }
.table-empty { color: var(--text-light); }

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
  font-family: inherit;
  color-scheme: light;
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
  font-family: inherit;
  cursor: pointer;
}
.calc-btn:hover { background-color: var(--primary-hover); box-shadow: var(--shadow-md); }

.export-btn {
  background-color: var(--bg-card);
  border: 1px solid var(--border-hover);
  color: var(--text-muted);
  font-family: inherit;
  cursor: pointer;
}
.export-btn:hover { border-color: var(--primary); color: var(--text-main); box-shadow: var(--shadow-sm); }

.spinner { border: 2px solid var(--border-hover); border-top-color: var(--primary); }

.error-bar {
  background-color: var(--danger-soft);
  border: 1px solid var(--danger);
  color: var(--danger);
}

.table-card { background-color: var(--bg-card); border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.table-summary  { border-bottom: 1px solid var(--border); }
.table-head-row { border-bottom: 1px solid var(--border); }
.table-row { border-bottom: 1px solid var(--border); transition: background-color 0.15s ease; }
.table-row:hover { background-color: var(--bg-subtle); }
.row-even { background-color: var(--bg-card); }
.row-odd  { background-color: color-mix(in srgb, var(--bg-subtle) 40%, transparent); }
.emp-subtotal-row {
  border-bottom: 2px solid var(--border-hover);
  background-color: color-mix(in srgb, var(--bg-subtle) 70%, transparent);
}
.table-foot-row {
  border-top: 1px solid var(--border-hover);
  background-color: var(--bg-subtle);
}

/* Mobile employee group */
.emp-group { border-bottom: 2px solid var(--border-hover); }
.emp-group:last-of-type { border-bottom: none; }

.emp-group-header {
  background-color: color-mix(in srgb, var(--bg-subtle) 60%, transparent);
  border-bottom: 1px solid var(--border);
}

.daily-row {
  background-color: var(--bg-card);
  transition: background-color 0.15s ease;
}
.daily-row:nth-child(even) {
  background-color: color-mix(in srgb, var(--bg-subtle) 40%, transparent);
}

.emp-subtotal-mobile {
  background-color: color-mix(in srgb, var(--bg-subtle) 70%, transparent);
  border-top: 1px solid var(--border-hover);
}

/* Hours badge on mobile */
.hours-badge {
  background-color: color-mix(in srgb, var(--primary) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
  color: var(--primary);
}

.emp-avatar { background-color: var(--primary); }
.empty-icon { background-color: var(--bg-subtle); color: var(--text-light); }

main::-webkit-scrollbar { width: 6px; }
main::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 3px; }
</style>