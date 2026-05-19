<template>
  <div class="page-wrapper flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden">
      <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>
      <div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none"></div>

      <div class="relative z-10 max-w-[120rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[1.6rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]">

        <!-- Page header -->
        <div class="mb-[4rem] max-[768px]:mb-[2.4rem]">
          <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]">Vadības panelis</p>
          <h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide">Atvaļinājumu pieprasījumi</h1>
        </div>

        <!-- Error -->
        <div v-if="error" class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]">
          <svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z"/>
          </svg>
          {{ error }}
        </div>

        <!-- Filters bar -->
        <div class="filter-card rounded-[1.6rem] p-[2.4rem] mb-[2rem] max-[768px]:p-[1.6rem]">
          <div class="flex flex-wrap items-end gap-[1.6rem] max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-[1.2rem]">

            <!-- Search -->
            <div class="flex flex-col gap-[0.4rem] flex-1 min-w-[20rem] max-[768px]:min-w-0">
              <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Meklēt</label>
              <div class="relative">
                <div class="absolute left-[1.2rem] top-1/2 -translate-y-1/2 pointer-events-none search-icon">
                  <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"/>
                  </svg>
                </div>
                <input v-model="searchQuery" type="text" placeholder="Meklēt pēc vārda vai iemesla…" class="date-input w-full pl-[3.8rem] pr-[1.4rem] py-[0.9rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200" />
              </div>
            </div>

            <!-- Status filter -->
            <div class="flex flex-col gap-[0.4rem]">
              <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Statuss</label>
              <select v-model="filterStatus" class="date-input px-[1.4rem] py-[0.9rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200">
                <option value="">Visi pieprasījumi</option>
                <option value="pending">Gaida apstiprinājumu</option>
                <option value="approved">Apstiprināts</option>
              </select>
            </div>

            <!-- Refresh + pills -->
            <div class="flex items-center gap-[1.6rem] max-[768px]:flex-wrap max-[768px]:gap-[1rem]">
              <button @click="fetchHolidays" class="calc-btn relative flex items-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200">
                Atsvaidzināt
              </button>

              <div class="flex items-center gap-[0.8rem]">
                <button @click="filterStatus = ''" class="filter-pill" :class="filterStatus === '' ? 'pill-active' : 'pill-inactive'">Visi</button>
                <button @click="filterStatus = 'pending'" class="filter-pill" :class="filterStatus === 'pending' ? 'pill-active' : 'pill-inactive'">Gaida</button>
                <button @click="filterStatus = 'approved'" class="filter-pill" :class="filterStatus === 'approved' ? 'pill-active' : 'pill-inactive'">Apstiprināts</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center gap-[1.6rem] py-[4rem] justify-center">
          <div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin"></div>
          <span class="page-label text-[1.2rem] tracking-[0.12em]">Ielādē atvaļinājumus…</span>
        </div>

        <!-- Data -->
        <div v-else-if="processedHolidays.length" class="table-card rounded-[1.6rem] overflow-hidden">

          <!-- Summary -->
          <div class="table-summary flex items-center justify-between px-[3rem] py-[2rem] max-[768px]:px-[1.6rem] max-[768px]:py-[1.4rem] flex-wrap gap-[1.2rem]">
            <div>
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Pieprasījumi</p>
              <p class="table-text text-[1.4rem]">
                {{ processedHolidays.length }}
                {{ processedHolidays.length === 1 ? 'pieprasījums' : 'pieprasījumi' }}
                <span v-if="filterStatus" class="table-sub"> — {{ filterStatus }}</span>
              </p>
            </div>

            <div class="flex items-center gap-[1.2rem]">
              <div class="stat-chip flex flex-col items-center px-[1.6rem] py-[0.8rem] rounded-[0.8rem]">
                <p class="page-label text-[0.9rem] tracking-[0.15em] uppercase mb-[0.1rem]">Gaida</p>
                <p class="page-title text-[1.8rem] leading-none tabular-nums">{{ pendingCount }}</p>
              </div>

              <div class="stat-chip approved-chip flex flex-col items-center px-[1.6rem] py-[0.8rem] rounded-[0.8rem]">
                <p class="approved-label text-[0.9rem] tracking-[0.15em] uppercase mb-[0.1rem]">Apstiprināts</p>
                <p class="approved-value text-[1.8rem] leading-none tabular-nums">{{ approvedCount }}</p>
              </div>
            </div>
          </div>

          <!-- Desktop table -->
          <table class="w-full max-[768px]:hidden">
            <thead>
              <tr class="table-head-row">
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Darbinieks</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Iemesls</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Sākums</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Beigas</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Statuss</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal">Darbības</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(h, i) in processedHolidays" :key="h.id">
                <td>{{ h.profile?.first_name }} {{ h.profile?.last_name }}</td>
                <td>{{ h.content }}</td>
                <td>{{ h.date_start }}</td>
                <td>{{ h.date_end ?? '—' }}</td>
                <td>{{ h.is_approved ? 'Apstiprināts' : 'Gaida apstiprinājumu' }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>

        </div>

        <!-- Empty state -->
        <div v-else-if="!loading" class="flex flex-col items-center justify-center py-[8rem] text-center">
          <p class="table-sub text-[1.4rem] tracking-[0.06em]">
            Netika atrasti atvaļinājumu pieprasījumi.
          </p>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

definePageMeta({
  middleware: 'auth-company',
  requiresManager: true
})

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

const holidays     = ref([])
const loading      = ref(false)
const error        = ref('')
const searchQuery  = ref('')
const filterStatus = ref('')

const fetchHolidays = async () => {
  loading.value = true; error.value = ''
  try {
    const res = await axios.get(`/api/companies/${companyId}/holidays`)
    holidays.value = res.data
  } catch (e) {
    error.value = 'Failed to load holidays.'
  } finally {
    loading.value = false
  }
}

const processedHolidays = computed(() => {
  let data = [...holidays.value]
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    data = data.filter(h =>
      `${h.first_name} ${h.last_name}`.toLowerCase().includes(q) ||
      h.content?.toLowerCase().includes(q)
    )
  }
  if (filterStatus.value === 'pending')  data = data.filter(h => !h.is_approved)
  if (filterStatus.value === 'approved') data = data.filter(h =>  h.is_approved)
  return data
})

const pendingCount  = computed(() => holidays.value.filter(h => !h.is_approved).length)
const approvedCount = computed(() => holidays.value.filter(h =>  h.is_approved).length)

const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const approveHoliday = async (h) => {
  try { await getCsrfToken(); await axios.put(`/api/holidays/${h.id}`, { is_approved: true }); h.is_approved = true }
  catch { error.value = 'Failed to approve holiday.' }
}
const revokeHoliday = async (h) => {
  try { await getCsrfToken(); await axios.put(`/api/holidays/${h.id}`, { is_approved: false }); h.is_approved = false }
  catch { error.value = 'Failed to revoke holiday.' }
}
const deleteHoliday = async (id) => {
  if (!confirm('Delete this holiday request?')) return
  try { await getCsrfToken(); await axios.delete(`/api/holidays/${id}`); holidays.value = holidays.value.filter(h => h.id !== id) }
  catch { error.value = 'Failed to delete holiday.' }
}

onMounted(fetchHolidays)
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
.date-input::placeholder { color: var(--text-muted); }
.search-icon { color: var(--text-muted); }

.calc-btn {
  background-color: var(--primary);
  box-shadow: 0 0.2rem 0.8rem var(--primary-soft);
  font-family: inherit;
  cursor: pointer;
}
.calc-btn:hover { background-color: var(--primary-hover); box-shadow: var(--shadow-md); }

/* Quick-filter pills */
.filter-pill { font-family: inherit; cursor: pointer; border: 1px solid transparent; font-weight: 500; }
.pill-inactive {
  background-color: var(--bg-subtle);
  border-color: var(--border);
  color: var(--text-muted);
}
.pill-inactive:hover { border-color: var(--border-hover); color: var(--text-main); }
.pill-active {
  background-color: color-mix(in srgb, var(--primary) 14%, transparent);
  border-color: color-mix(in srgb, var(--primary) 30%, transparent);
  color: var(--primary);
}

/* Spinner */
.spinner { border: 2px solid var(--border-hover); border-top-color: var(--primary); }

/* Error */
.error-bar { background-color: var(--danger-soft); border: 1px solid var(--danger); color: var(--danger); }

/* Table */
.table-card { background-color: var(--bg-card); border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.table-summary  { border-bottom: 1px solid var(--border); }
.table-head-row { border-bottom: 1px solid var(--border); }
.table-row { border-bottom: 1px solid var(--border); transition: background-color 0.15s ease; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background-color: var(--bg-subtle); }
.row-even { background-color: var(--bg-card); }
.row-odd  { background-color: color-mix(in srgb, var(--bg-subtle) 40%, transparent); }

/* Stat chips in header */
.stat-chip {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border);
}
.approved-chip {
  background-color: color-mix(in srgb, #22c55e 10%, transparent);
  border-color: color-mix(in srgb, #22c55e 25%, transparent);
}
.approved-label { color: #22c55e; opacity: 0.8; }
.approved-value { color: #22c55e; }

/* Avatar */
.emp-avatar { background-color: var(--primary); }

/* Status badges */
.status-badge { font-weight: 500; letter-spacing: 0.03em; }
.badge-approved {
  background-color: color-mix(in srgb, #22c55e 12%, transparent);
  border: 1px solid color-mix(in srgb, #22c55e 28%, transparent);
  color: #22c55e;
}
.badge-pending {
  background-color: color-mix(in srgb, #f59e0b 12%, transparent);
  border: 1px solid color-mix(in srgb, #f59e0b 28%, transparent);
  color: #f59e0b;
}

/* Action buttons */
.action-btn { font-family: inherit; font-weight: 500; cursor: pointer; border: 1px solid transparent; transition: all 0.15s ease; }

.approve-btn {
  background-color: color-mix(in srgb, #22c55e 12%, transparent);
  border-color: color-mix(in srgb, #22c55e 28%, transparent);
  color: #22c55e;
}
.approve-btn:hover { background-color: color-mix(in srgb, #22c55e 20%, transparent); border-color: #22c55e; }

.revoke-btn {
  background-color: color-mix(in srgb, #f59e0b 10%, transparent);
  border-color: color-mix(in srgb, #f59e0b 25%, transparent);
  color: #f59e0b;
}
.revoke-btn:hover { background-color: color-mix(in srgb, #f59e0b 18%, transparent); border-color: #f59e0b; }

.delete-btn {
  background-color: var(--danger-soft);
  border-color: color-mix(in srgb, var(--danger) 30%, transparent);
  color: var(--danger);
}
.delete-btn:hover { border-color: var(--danger); }

/* Empty state */
.empty-icon { background-color: var(--bg-subtle); color: var(--text-light); }

/* Clamp reason text */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

main::-webkit-scrollbar { width: 6px; }
main::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 3px; }
</style>