<template>
  <div class="page-wrapper flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden">

      <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>
      <div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none"></div>

      <div class="relative z-10 max-w-[96rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[2rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]">

        <!-- Page header -->
        <div class="mb-[4rem] max-[768px]:mb-[2.4rem]">
          <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]">Personal Cabinet</p>
          <h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide">My Payroll</h1>
        </div>

        <!-- Filters + Export bar -->
        <div class="filter-card rounded-[1.6rem] p-[2.4rem] max-[768px]:p-[1.6rem] mb-[2.4rem]">

          <!-- Date + calculate row -->
          <div class="flex flex-wrap items-end gap-[1.2rem] mb-[1.2rem]">
            <div class="flex items-end gap-[1rem] flex-1 min-w-0">
              <div class="flex flex-col gap-[0.4rem] flex-1 min-w-0">
                <label class="page-label text-[1rem] tracking-[0.15em] uppercase">From</label>
                <input type="date" v-model="startDate" class="date-input w-full rounded-[0.8rem] px-[1.2rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
              </div>
              <div class="arrow-sep text-[1.4rem] mb-[0.9rem] flex-shrink-0">→</div>
              <div class="flex flex-col gap-[0.4rem] flex-1 min-w-0">
                <label class="page-label text-[1rem] tracking-[0.15em] uppercase">To</label>
                <input type="date" v-model="endDate" class="date-input w-full rounded-[0.8rem] px-[1.2rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
              </div>
            </div>

            <button
              @click="fetchPayroll"
              class="calc-btn relative flex items-center gap-[0.8rem] px-[2rem] py-[1rem] max-[480px]:py-[1.3rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 flex-shrink-0"
            >
              <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.598 4.5 4.574v9.176a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.574c0-.976-.807-1.874-1.907-2.002A48.96 48.96 0 0012 2.25z"/>
              </svg>
              <span class="max-[480px]:hidden">Calculate</span>
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
            </button>
          </div>

          <!-- Export row -->
          <div class="flex items-center gap-[0.8rem] flex-wrap">
            <span class="page-label text-[1rem] tracking-[0.15em] uppercase mr-[0.4rem]">Export</span>
            <button @click="exportCSV" class="export-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200">
              <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
              </svg>
              CSV
            </button>
            <button @click="exportXLS" class="export-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200">
              <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-7.5 0h6m-6 0A1.125 1.125 0 019 13.125v-1.5A1.125 1.125 0 0110.125 10.5m.75 2.625c.621 0 1.125.504 1.125 1.125v3"/>
              </svg>
              XLS
            </button>
            <button @click="exportPDF" class="export-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200">
              <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
              </svg>
              PDF
            </button>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center gap-[1.6rem] py-[4rem] justify-center">
          <div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin"></div>
          <span class="page-label text-[1.2rem] tracking-[0.12em]">Calculating payroll...</span>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem]">
          <span>⚠</span> {{ error }}
        </div>

        <!-- Content -->
        <div v-else-if="payroll">

          <!-- Stat cards: 1 col on mobile, 3 on desktop -->
          <div class="grid grid-cols-1 max-[600px]:grid-cols-1 min-[600px]:grid-cols-3 gap-[1.6rem] mb-[2.4rem]">

            <!-- Mobile: single summary strip -->
            <div class="hidden max-[600px]:flex items-center justify-between stat-card rounded-[1.6rem] px-[2.4rem] py-[2rem]">
              <div class="flex flex-col gap-[0.2rem]">
                <p class="page-label text-[0.9rem] tracking-[0.15em] uppercase">Hours</p>
                <p class="page-title text-[2.8rem] leading-none tabular-nums">{{ payroll.totalHours }}</p>
              </div>
              <div class="flex flex-col items-center gap-[0.2rem]">
                <p class="page-label text-[0.9rem] tracking-[0.15em] uppercase">Rate</p>
                <p class="page-title text-[2.8rem] leading-none tabular-nums">${{ payroll.hourlyPay }}</p>
              </div>
              <div class="flex flex-col items-end gap-[0.2rem]">
                <p class="page-label text-[0.9rem] tracking-[0.15em] uppercase">Total</p>
                <p class="pay-value text-[2.8rem] leading-none tabular-nums font-medium">${{ payroll.totalPay }}</p>
              </div>
            </div>

            <!-- Desktop stat cards -->
            <div class="stat-card rounded-[1.6rem] p-[2.8rem] flex flex-col justify-between max-[600px]:hidden">
              <div class="flex items-start justify-between mb-[2rem]">
                <p class="page-label text-[1rem] tracking-[0.18em] uppercase">Total Hours</p>
                <div class="icon-badge w-[3.6rem] h-[3.6rem] rounded-[0.8rem] flex items-center justify-center">
                  <svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <div>
                <p class="page-title text-[4rem] leading-none tabular-nums mb-[0.4rem]">{{ payroll.totalHours }}</p>
                <p class="table-sub text-[1.2rem]">hours worked</p>
              </div>
            </div>

            <div class="stat-card rounded-[1.6rem] p-[2.8rem] flex flex-col justify-between max-[600px]:hidden">
              <div class="flex items-start justify-between mb-[2rem]">
                <p class="page-label text-[1rem] tracking-[0.18em] uppercase">Hourly Rate</p>
                <div class="icon-badge w-[3.6rem] h-[3.6rem] rounded-[0.8rem] flex items-center justify-center">
                  <svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <div>
                <p class="page-title text-[4rem] leading-none tabular-nums mb-[0.4rem]">${{ payroll.hourlyPay }}</p>
                <p class="table-sub text-[1.2rem]">per hour</p>
              </div>
            </div>

            <div class="stat-card rounded-[1.6rem] p-[2.8rem] flex flex-col justify-between max-[600px]:hidden">
              <div class="flex items-start justify-between mb-[2rem]">
                <p class="page-label text-[1rem] tracking-[0.18em] uppercase">Total Pay</p>
                <div class="icon-badge w-[3.6rem] h-[3.6rem] rounded-[0.8rem] flex items-center justify-center">
                  <svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75"/>
                  </svg>
                </div>
              </div>
              <div>
                <p class="pay-value text-[4rem] leading-none tabular-nums mb-[0.4rem]">${{ payroll.totalPay }}</p>
                <p class="table-sub text-[1.2rem]">for period</p>
              </div>
            </div>

          </div>

          <!-- Daily breakdown table -->
          <div class="table-card rounded-[1.6rem] overflow-hidden">

            <div class="table-summary flex items-center justify-between px-[3rem] max-[768px]:px-[2rem] py-[2rem]">
              <div>
                <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Period</p>
                <p class="table-text text-[1.3rem] max-[480px]:text-[1.1rem]">{{ startDate }} → {{ endDate }}</p>
              </div>
              <div>
                <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Breakdown</p>
                <p class="table-sub text-[1.3rem]">{{ payroll.daily.length }} days</p>
              </div>
            </div>

            <!-- Desktop table -->
            <table class="w-full max-[600px]:hidden">
              <thead>
                <tr class="table-head-row">
                  <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Date</th>
                  <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Hours</th>
                  <th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal">Overtime</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(d, i) in payroll.daily"
                  :key="d.date"
                  class="table-row"
                  :class="i % 2 === 0 ? 'row-even' : 'row-odd'"
                >
                  <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]">{{ d.date }}</td>
                  <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums">
                    {{ d.hours }}<span class="table-sub text-[1.1rem] ml-[0.2rem]">h</span>
                  </td>
                  <td class="px-[3rem] py-[1.6rem] text-[1.3rem] text-right tabular-nums">
                    <span v-if="d.hours > 8" class="overtime-badge px-[1rem] py-[0.3rem] rounded-full text-[1rem] tracking-[0.06em]">
                      +{{ (d.hours - 8).toFixed(2) }}h
                    </span>
                    <span v-else class="table-empty">—</span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="table-foot-row">
                  <td class="px-[3rem] py-[1.8rem] text-[1.1rem] tracking-[0.12em] uppercase table-sub">Total</td>
                  <td class="px-[3rem] py-[1.8rem] text-[1.8rem] tabular-nums font-medium page-title">
                    {{ payroll.totalHours }}<span class="table-sub text-[1.2rem] ml-[0.3rem]">h</span>
                  </td>
                  <td class="px-[3rem] py-[1.8rem] text-right">
                    <span class="pay-value text-[1.8rem] tabular-nums font-medium">${{ payroll.totalPay }}</span>
                  </td>
                </tr>
              </tfoot>
            </table>

            <!-- Mobile cards -->
            <div class="hidden max-[600px]:flex flex-col" style="divide-y: var(--border)">
              <div
                v-for="(d, i) in payroll.daily"
                :key="`m-${d.date}`"
                class="flex items-center justify-between px-[2rem] py-[1.4rem]"
                :class="i % 2 === 0 ? 'row-even' : 'row-odd'"
                style="border-bottom: 1px solid var(--border)"
              >
                <span class="table-text text-[1.3rem]">{{ d.date }}</span>
                <div class="flex items-center gap-[1.6rem]">
                  <span class="table-text text-[1.3rem] tabular-nums">
                    {{ d.hours }}<span class="table-sub text-[1.1rem] ml-[0.2rem]">h</span>
                  </span>
                  <span v-if="d.hours > 8" class="overtime-badge px-[0.8rem] py-[0.2rem] rounded-full text-[1rem]">
                    +{{ (d.hours - 8).toFixed(2) }}h
                  </span>
                  <span v-else class="table-empty text-[1.2rem]">—</span>
                </div>
              </div>

              <!-- Mobile footer -->
              <div class="table-foot-row flex items-center justify-between px-[2rem] py-[1.6rem]">
                <span class="table-sub text-[1.1rem] tracking-[0.12em] uppercase">Total</span>
                <div class="flex items-center gap-[2rem]">
                  <span class="page-title text-[1.6rem] tabular-nums">
                    {{ payroll.totalHours }}<span class="table-sub text-[1.1rem] ml-[0.2rem]">h</span>
                  </span>
                  <span class="pay-value text-[1.6rem] tabular-nums font-medium">${{ payroll.totalPay }}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="!loading" class="flex flex-col items-center justify-center py-[8rem] text-center">
          <div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]">
            <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75"/>
            </svg>
          </div>
          <p class="table-sub text-[1.4rem] tracking-[0.06em]">No payroll data for this period.</p>
        </div>

      </div>
    </main>
  </div>
</template>

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

axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const today = new Date()
const formatDate = (d) => d.toISOString().slice(0, 10)
const startDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth(), 2)))
const endDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 1)))

const payroll = ref(null)
const loading = ref(false)
const error = ref('')

const fetchPayroll = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`/api/attendance/personal/${profileId}`, {
      params: { start_date: startDate.value, end_date: endDate.value }
    })
    const dailyLogs = res.data.daily || []
    const daily = dailyLogs.map(day => ({
      date: day.date,
      hours: parseFloat((day.total_time_seconds / 3600).toFixed(2))
    }))
    const totalHours = daily.reduce((sum, d) => sum + d.hours, 0)
    const hourlyPay = res.data.hourly_pay ?? 0
    payroll.value = {
      totalHours: totalHours.toFixed(2),
      hourlyPay,
      totalPay: (totalHours * hourlyPay).toFixed(2),
      daily
    }
  } catch (e) {
    error.value = 'Failed to calculate payroll'
  } finally {
    loading.value = false
  }
}

const exportCSV = () => {
  if (!payroll.value) return
  let csv = 'Date,Hours,Overtime\n'
  payroll.value.daily.forEach(d => {
    csv += `${d.date},${d.hours},${d.hours > 8 ? (d.hours - 8).toFixed(2) : 0}\n`
  })
  csv += `\nTotal Hours,${payroll.value.totalHours}\nHourly Pay,${payroll.value.hourlyPay}\nTotal Pay,${payroll.value.totalPay}\n`
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
  link.download = `payroll_${startDate.value}_${endDate.value}.csv`
  link.click()
}

const exportXLS = () => {
  if (!payroll.value) return
  const data = payroll.value.daily.map(d => ({ Date: d.date, Hours: d.hours, Overtime: d.hours > 8 ? (d.hours - 8).toFixed(2) : 0 }))
  data.push({}, { Date: 'Total Hours', Hours: payroll.value.totalHours }, { Date: 'Hourly Pay', Hours: payroll.value.hourlyPay }, { Date: 'Total Pay', Hours: payroll.value.totalPay })
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), 'Payroll')
  XLSX.writeFile(wb, `payroll_${startDate.value}_${endDate.value}.xlsx`)
}

const exportPDF = () => {
  if (!payroll.value) return
  const doc = new jsPDF()
  doc.setFontSize(18); doc.text('Payroll Report', 14, 20)
  doc.setFontSize(11)
  doc.text(`Period: ${startDate.value} - ${endDate.value}`, 14, 30)
  doc.text(`Total Hours: ${payroll.value.totalHours}`, 14, 38)
  doc.text(`Hourly Pay: $${payroll.value.hourlyPay}`, 14, 44)
  doc.text(`Total Pay: $${payroll.value.totalPay}`, 14, 50)
  autoTable(doc, { head: [['Date', 'Hours', 'Overtime']], body: payroll.value.daily.map(d => [d.date, d.hours, d.hours > 8 ? (d.hours - 8).toFixed(2) : '-']), startY: 60 })
  doc.save(`payroll_${startDate.value}_${endDate.value}.pdf`)
}

onMounted(fetchPayroll)
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
}
.calc-btn:hover { background-color: var(--primary-hover); box-shadow: var(--shadow-md); }

.export-btn {
  background-color: var(--bg-card);
  border: 1px solid var(--border-hover);
  color: var(--text-muted);
}
.export-btn:hover { border-color: var(--primary); color: var(--text-main); box-shadow: var(--shadow-sm); }

.spinner { border: 1px solid var(--border-hover); border-top-color: var(--primary); }
.error-bar { background-color: var(--danger-soft); border: 1px solid var(--danger); color: var(--danger); }

.stat-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.2s ease;
}
.stat-card:hover { box-shadow: var(--shadow-md); }
.icon-badge { background-color: var(--bg-subtle); color: var(--text-muted); }
.pay-value { color: var(--primary); }

.table-card { background-color: var(--bg-card); border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.table-summary { border-bottom: 1px solid var(--border); }
.table-head-row { border-bottom: 1px solid var(--border); }
.table-row { border-bottom: 1px solid var(--border); transition: background-color 0.15s ease; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background-color: var(--bg-subtle); }
.row-even { background-color: var(--bg-card); }
.row-odd  { background-color: color-mix(in srgb, var(--bg-subtle) 40%, transparent); }
.table-foot-row { border-top: 1px solid var(--border-hover); background-color: var(--bg-subtle); }

.overtime-badge {
  background-color: var(--danger-soft);
  color: var(--danger);
  border: 1px solid var(--danger);
}

.empty-icon { background-color: var(--bg-subtle); color: var(--text-light); }

main::-webkit-scrollbar { width: 6px; }
main::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 3px; }
</style>