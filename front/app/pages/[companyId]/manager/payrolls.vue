<template>
  <div class="page-wrapper flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 pl-[22rem] min-h-screen relative overflow-hidden">
      <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>
      <div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none"></div>

      <div class="relative z-10 max-w-[120rem] mx-auto py-[4rem] px-[4rem]">

        <!-- Page header -->
        <div class="mb-[4rem]">
          <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]">Manager Panel</p>
          <h1 class="page-title text-[3.6rem] leading-none tracking-wide">Team Payrolls</h1>
        </div>

        <!-- Error -->
        <div v-if="error" class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]">
          <svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z"/>
          </svg>
          {{ error }}
        </div>

        <!-- ── Filters + Export ──────────────────────────────────────── -->
        <div class="filter-card rounded-[1.6rem] p-[2.4rem] mb-[2rem]">
          <div class="flex flex-wrap items-end gap-[1.6rem]">
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
              @click="fetchEmployeesTime"
              class="calc-btn relative flex items-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200"
            >
              <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
              </svg>
              Refresh
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
            </button>

            <div class="flex items-center gap-[1rem] ml-auto">
              <span class="page-label text-[1rem] tracking-[0.15em] uppercase mr-[0.4rem]">Export</span>
              <button @click="exportCSV" class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200">
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                </svg>
                CSV
              </button>
              <button @click="exportXLS" class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200">
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75"/>
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

        <!-- ── Loading ──────────────────────────────────────────────── -->
        <div v-if="loading" class="flex items-center gap-[1.6rem] py-[4rem] justify-center">
          <div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin"></div>
          <span class="page-label text-[1.2rem] tracking-[0.12em]">Loading payrolls…</span>
        </div>

        <!-- ── Payroll cards ────────────────────────────────────────── -->
        <div v-else-if="payrolls.length" class="flex flex-col gap-[2rem]">
          <div
            v-for="p in payrolls"
            :key="p.id"
            class="table-card rounded-[1.6rem] overflow-hidden"
          >
            <!-- Employee header -->
            <div class="table-summary px-[3rem] py-[2.2rem] flex items-center justify-between flex-wrap gap-[2rem]">
              <div class="flex items-center gap-[1.6rem]">
                <div class="emp-avatar w-[4rem] h-[4rem] rounded-full flex items-center justify-center text-[1.4rem] text-white flex-shrink-0">
                  {{ p.name[0]?.toUpperCase() }}
                </div>
                <div>
                  <p class="page-title text-[1.6rem] leading-tight">{{ p.name }}</p>
                  <p class="table-sub text-[1.2rem]">{{ p.email }}</p>
                </div>
              </div>

              <!-- Summary pills -->
              <div class="flex items-center gap-[1.2rem] flex-wrap">
                <div class="summary-pill flex flex-col items-center px-[2rem] py-[1rem] rounded-[1rem]">
                  <p class="page-label text-[0.95rem] tracking-[0.15em] uppercase mb-[0.2rem]">Hours</p>
                  <p class="page-title text-[2rem] leading-none tabular-nums">{{ p.hoursWorked }}<span class="table-sub text-[1.1rem] ml-[0.2rem]">h</span></p>
                </div>
                <div class="summary-pill flex flex-col items-center px-[2rem] py-[1rem] rounded-[1rem]">
                  <p class="page-label text-[0.95rem] tracking-[0.15em] uppercase mb-[0.2rem]">Rate</p>
                  <p class="page-title text-[2rem] leading-none tabular-nums">${{ p.hourlyPay }}<span class="table-sub text-[1.1rem] ml-[0.2rem]">/h</span></p>
                </div>
                <div class="summary-pill pay-pill flex flex-col items-center px-[2rem] py-[1rem] rounded-[1rem]">
                  <p class="pay-label text-[0.95rem] tracking-[0.15em] uppercase mb-[0.2rem]">Total Pay</p>
                  <p class="pay-value text-[2rem] leading-none tabular-nums font-semibold">${{ p.totalPay }}</p>
                </div>
              </div>
            </div>

            <!-- Daily breakdown table -->
            <table class="w-full">
              <thead>
                <tr class="table-head-row">
                  <th class="page-label px-[3rem] py-[1.4rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Date</th>
                  <th class="page-label px-[3rem] py-[1.4rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal">Hours</th>
                  <th class="page-label px-[3rem] py-[1.4rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal">Status</th>
                  <th class="page-label px-[3rem] py-[1.4rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal">Day Pay</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(d, i) in p.daily"
                  :key="d.date"
                  class="table-row"
                  :class="i % 2 === 0 ? 'row-even' : 'row-odd'"
                >
                  <td class="table-text px-[3rem] py-[1.4rem] text-[1.3rem]">{{ d.date }}</td>
                  <td class="px-[3rem] py-[1.4rem] text-[1.3rem] text-right tabular-nums" :class="d.hours > 0 ? 'table-text' : 'table-empty'">
                    <span v-if="d.hours > 0">{{ d.hours }}<span class="table-empty text-[1.1rem] ml-[0.2rem]">h</span></span>
                    <span v-else>—</span>
                  </td>
                  <td class="px-[3rem] py-[1.4rem] text-right">
                    <span v-if="d.hours > 8" class="ot-badge text-[1.05rem] px-[1rem] py-[0.3rem] rounded-full">OT</span>
                    <span v-else-if="d.hours > 0" class="ok-badge text-[1.05rem] px-[1rem] py-[0.3rem] rounded-full">Regular</span>
                    <span v-else class="table-empty text-[1.2rem]">—</span>
                  </td>
                  <td class="px-[3rem] py-[1.4rem] text-[1.3rem] text-right tabular-nums" :class="d.hours > 0 ? 'table-text' : 'table-empty'">
                    <span v-if="d.hours > 0">${{ (d.hours * p.hourlyPay).toFixed(2) }}</span>
                    <span v-else>—</span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="table-foot-row">
                  <td colspan="3" class="px-[3rem] py-[1.6rem] text-[1.1rem] tracking-[0.12em] uppercase text-right table-sub">Total Pay</td>
                  <td class="px-[3rem] py-[1.6rem] text-[1.8rem] text-right tabular-nums font-medium page-title">${{ p.totalPay }}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- Grand total card -->
          <div class="grand-total-card rounded-[1.6rem] px-[3rem] py-[2.4rem] flex items-center justify-between">
            <div>
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.4rem]">Period</p>
              <p class="table-text text-[1.4rem]">{{ startDate }} → {{ endDate }}</p>
            </div>
            <div class="text-right">
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.4rem]">Grand Total Payroll</p>
              <p class="page-title text-[3.2rem] leading-none tabular-nums font-semibold">${{ grandTotal }}</p>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="!loading" class="flex flex-col items-center justify-center py-[8rem] text-center">
          <div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]">
            <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>
            </svg>
          </div>
          <p class="table-sub text-[1.4rem] tracking-[0.06em]">No payroll data for this period.</p>
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
  { text: 'Home',        to: `/${companyId}/manager` },
  { text: 'Company',     to: `/${companyId}/manager/company` },
  { text: 'Team',        to: `/${companyId}/manager/team` },
  { text: 'Schedule',    to: `/${companyId}/manager/schedule` },
  { text: 'Attendance',  to: `/${companyId}/manager/attendancy` },
  { text: 'Payrolls',    to: `/${companyId}/manager/payrolls` },
  { text: 'Invites',     to: `/${companyId}/manager/invite` },
  { text: 'Holidays',    to: `/${companyId}/manager/holidays` },
  { text: 'Sick Leaves', to: `/${companyId}/manager/sick-leaves` },
]

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const today = new Date()
const formatDate = (d) => d.toISOString().slice(0, 10)
const startDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth(), 2)))
const endDate   = ref(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 1)))

const employees = ref([])
const loading   = ref(false)
const error     = ref('')

const fetchEmployeesTime = async () => {
  loading.value = true; error.value = ''
  try {
    const res = await axios.get(`/api/attendance/team/employees/${companyId}`, {
      params: { start_date: startDate.value, end_date: endDate.value }
    })
    employees.value = res.data
  } catch (e) {
    error.value = 'Failed to fetch employees'
  } finally {
    loading.value = false
  }
}

const payrolls = computed(() =>
  employees.value.map(emp => {
    const daily = emp.daily.map(day => ({
      date: day.date,
      hours: parseFloat((day.total_time_seconds / 3600).toFixed(2))
    }))
    const totalHours = daily.reduce((s, d) => s + d.hours, 0)
    const hourlyPay  = emp.hourly_pay ?? 0
    return {
      id: emp.id,
      name: `${emp.first_name} ${emp.last_name}`,
      email: emp.email,
      hoursWorked: totalHours.toFixed(2),
      hourlyPay,
      totalPay: (totalHours * hourlyPay).toFixed(2),
      daily
    }
  })
)

const grandTotal = computed(() =>
  payrolls.value.reduce((s, p) => s + parseFloat(p.totalPay), 0).toFixed(2)
)

const exportCSV = () => {
  if (!payrolls.value.length) return
  let csv = 'Name,Email,Hours Worked,Hourly Pay,Total Pay,Date,Daily Hours\n'
  payrolls.value.forEach(p => p.daily.forEach(d => {
    csv += `${p.name},${p.email},${p.hoursWorked},${p.hourlyPay},${p.totalPay},${d.date},${d.hours}\n`
  }))
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })),
    download: `payroll_${startDate.value}_${endDate.value}.csv`
  })
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
}

const exportXLS = () => {
  if (!payrolls.value.length) return
  const data = []
  payrolls.value.forEach(p => p.daily.forEach(d => data.push({
    Name: p.name, Email: p.email, 'Hours Worked': p.hoursWorked,
    'Hourly Pay': p.hourlyPay, 'Total Pay': p.totalPay, Date: d.date, 'Daily Hours': d.hours
  })))
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), 'Payrolls')
  XLSX.writeFile(wb, `payroll_${startDate.value}_${endDate.value}.xlsx`)
}

const exportPDF = () => {
  if (!payrolls.value.length) return
  const doc = new jsPDF()
  doc.setFontSize(18); doc.text('Team Payroll Report', 14, 20)
  doc.setFontSize(11); doc.text(`Period: ${startDate.value} – ${endDate.value}`, 14, 30)
  let y = 40
  payrolls.value.forEach(p => {
    doc.setFontSize(13); doc.text(`${p.name} (${p.email})`, 14, y)
    doc.setFontSize(10); doc.text(`Hours: ${p.hoursWorked} | Rate: $${p.hourlyPay}/h | Total: $${p.totalPay}`, 14, y + 6)
    autoTable(doc, {
      head: [['Date', 'Hours', 'Status', 'Day Pay']],
      body: p.daily.map(d => [
        d.date, `${d.hours}h`, d.hours > 8 ? 'OT' : d.hours > 0 ? 'Regular' : '—',
        d.hours > 0 ? `$${(d.hours * p.hourlyPay).toFixed(2)}` : '—'
      ]),
      startY: y + 12, margin: { left: 14 }, theme: 'grid'
    })
    y = doc.lastAutoTable.finalY + 16
  })
  doc.save(`payroll_${startDate.value}_${endDate.value}.pdf`)
}

onMounted(fetchEmployeesTime)
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

/* Spinner */
.spinner { border: 2px solid var(--border-hover); border-top-color: var(--primary); }

/* Error */
.error-bar { background-color: var(--danger-soft); border: 1px solid var(--danger); color: var(--danger); }

/* Payroll card */
.table-card { background-color: var(--bg-card); border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.table-summary { border-bottom: 1px solid var(--border); }
.table-head-row { border-bottom: 1px solid var(--border); }
.table-row { border-bottom: 1px solid var(--border); transition: background-color 0.15s ease; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background-color: var(--bg-subtle); }
.row-even { background-color: var(--bg-card); }
.row-odd  { background-color: color-mix(in srgb, var(--bg-subtle) 40%, transparent); }
.table-foot-row { border-top: 1px solid var(--border-hover); background-color: var(--bg-subtle); }

/* Avatar */
.emp-avatar { background-color: var(--primary); }

/* Summary pills */
.summary-pill {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border);
}
.pay-pill {
  background-color: color-mix(in srgb, var(--primary) 10%, transparent);
  border-color: color-mix(in srgb, var(--primary) 25%, transparent);
}
.pay-label { color: var(--primary); opacity: 0.8; }
.pay-value { color: var(--primary); }

/* Status badges */
.ot-badge {
  background-color: var(--danger-soft);
  border: 1px solid color-mix(in srgb, var(--danger) 30%, transparent);
  color: var(--danger);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}
.ok-badge {
  background-color: color-mix(in srgb, #22c55e 10%, transparent);
  border: 1px solid color-mix(in srgb, #22c55e 25%, transparent);
  color: #22c55e;
  font-size: 1.05rem;
}

/* Grand total */
.grand-total-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-hover);
  box-shadow: var(--shadow-md);
}

/* Empty */
.empty-icon { background-color: var(--bg-subtle); color: var(--text-light); }

main::-webkit-scrollbar { width: 6px; }
main::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 3px; }
</style>