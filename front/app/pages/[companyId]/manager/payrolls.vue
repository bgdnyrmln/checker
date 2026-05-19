<template>
  <div class="page-wrapper flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden">
      <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>
      <div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none"></div>

      <div class="relative z-10 max-w-[120rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[1.6rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]">

        <!-- Lapas galvene -->
        <div class="mb-[4rem] max-[768px]:mb-[2.4rem]">
          <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]">Vadības panelis</p>
          <h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide">Komandas algas</h1>
        </div>

        <!-- Kļūda -->
        <div v-if="error" class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]">
          <svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z"/>
          </svg>
          {{ error }}
        </div>

        <!-- Filtri + eksports -->
        <div class="filter-card rounded-[1.6rem] p-[2.4rem] mb-[2rem] max-[768px]:p-[1.6rem]">
          <div class="flex flex-wrap items-end gap-[1.6rem] max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-[1.2rem]">

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

            <button @click="fetchEmployeesTime" class="calc-btn relative flex items-center justify-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200">
              Atsvaidzināt
            </button>

            <div class="flex items-center gap-[1rem] ml-auto max-[768px]:ml-0 max-[480px]:flex-wrap">
              <span class="page-label text-[1rem] tracking-[0.15em] uppercase mr-[0.4rem] max-[480px]:w-full">Eksports</span>

              <button @click="exportCSV" class="export-btn px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]">
                CSV
              </button>

              <button @click="exportXLS" class="export-btn px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]">
                XLS
              </button>

              <button @click="exportPDF" class="export-btn px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]">
                PDF
              </button>
            </div>

          </div>
        </div>

        <!-- Ielāde -->
        <div v-if="loading" class="flex items-center gap-[1.6rem] py-[4rem] justify-center">
          <div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin"></div>
          <span class="page-label text-[1.2rem] tracking-[0.12em]">Ielādē algas…</span>
        </div>

        <!-- Algas kartītes -->
        <div v-else-if="payrolls.length" class="flex flex-col gap-[2rem]">

          <div v-for="p in payrolls" :key="p.id" class="table-card rounded-[1.6rem] overflow-hidden">

            <!-- Darbinieka galvene -->
            <div class="table-summary px-[3rem] py-[2.2rem] flex items-center justify-between flex-wrap gap-[2rem] max-[768px]:px-[1.6rem] max-[768px]:py-[1.6rem]">

              <div class="flex items-center gap-[1.6rem]">
                <div class="emp-avatar w-[4rem] h-[4rem] rounded-full flex items-center justify-center text-[1.4rem] text-white flex-shrink-0">
                  {{ p.name[0]?.toUpperCase() }}
                </div>

                <div>
                  <p class="page-title text-[1.6rem] leading-tight">{{ p.name }}</p>
                  <p class="table-sub text-[1.2rem]">{{ p.email }}</p>
                </div>
              </div>

              <div class="flex items-center gap-[1.2rem] flex-wrap max-[480px]:w-full">
                <div class="summary-pill flex flex-col items-center px-[2rem] py-[1rem] rounded-[1rem] max-[480px]:flex-1">
                  <p class="page-label text-[0.95rem] uppercase tracking-[0.15em]">Stundas</p>
                  <p class="page-title text-[2rem] tabular-nums">{{ p.hoursWorked }}h</p>
                </div>

                <div class="summary-pill flex flex-col items-center px-[2rem] py-[1rem] rounded-[1rem] max-[480px]:flex-1">
                  <p class="page-label text-[0.95rem] uppercase tracking-[0.15em]">Likme</p>
                  <p class="page-title text-[2rem] tabular-nums">${{ p.hourlyPay }}/h</p>
                </div>

                <div class="summary-pill pay-pill flex flex-col items-center px-[2rem] py-[1rem] rounded-[1rem] max-[480px]:w-full">
                  <p class="page-label text-[0.95rem] uppercase tracking-[0.15em]">Kopā</p>
                  <p class="page-title text-[2rem] tabular-nums font-semibold">${{ p.totalPay }}</p>
                </div>
              </div>

            </div>

            <!-- Desktop tabula -->
            <table class="w-full max-[768px]:hidden">
              <thead>
                <tr class="table-head-row">
                  <th class="page-label px-[3rem] py-[1.4rem] text-left uppercase tracking-[0.18em]">Datums</th>
                  <th class="page-label px-[3rem] py-[1.4rem] text-right uppercase tracking-[0.18em]">Stundas</th>
                  <th class="page-label px-[3rem] py-[1.4rem] text-right uppercase tracking-[0.18em]">Statuss</th>
                  <th class="page-label px-[3rem] py-[1.4rem] text-right uppercase tracking-[0.18em]">Dienas alga</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(d, i) in p.daily" :key="d.date">
                  <td class="px-[3rem] py-[1.4rem] table-text">{{ d.date }}</td>
                  <td class="px-[3rem] py-[1.4rem] text-right">{{ d.hours > 0 ? d.hours + 'h' : '—' }}</td>
                  <td class="px-[3rem] py-[1.4rem] text-right">
                    <span v-if="d.hours > 8">OT</span>
                    <span v-else-if="d.hours > 0">Parasti</span>
                    <span v-else>—</span>
                  </td>
                  <td class="px-[3rem] py-[1.4rem] text-right">
                    <span v-if="d.hours > 0">${{ (d.hours * p.hourlyPay).toFixed(2) }}</span>
                    <span v-else>—</span>
                  </td>
                </tr>
              </tbody>

              <tfoot>
                <tr>
                  <td colspan="3" class="px-[3rem] py-[1.6rem] text-right uppercase">Kopā</td>
                  <td class="px-[3rem] py-[1.6rem] text-right font-semibold">${{ p.totalPay }}</td>
                </tr>
              </tfoot>
            </table>

          </div>

          <!-- Kopējā summa -->
          <div class="grand-total-card rounded-[1.6rem] px-[3rem] py-[2.4rem] flex items-center justify-between max-[768px]:px-[1.6rem]">
            <div>
              <p class="page-label uppercase tracking-[0.18em]">Periods</p>
              <p>{{ startDate }} → {{ endDate }}</p>
            </div>
            <div class="text-right">
              <p class="page-label uppercase tracking-[0.18em]">Kopējā summa</p>
              <p class="page-title text-[3rem] font-semibold tabular-nums">${{ grandTotal }}</p>
            </div>
          </div>

        </div>

        <!-- Tukšs stāvoklis -->
        <div v-else class="flex flex-col items-center justify-center py-[8rem] text-center">
          <p class="table-sub text-[1.4rem]">
            Nav algu datu šim periodam.
          </p>
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