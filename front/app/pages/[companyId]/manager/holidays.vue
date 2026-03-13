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
          <h1 class="page-title text-[3.6rem] leading-none tracking-wide">Holiday Requests</h1>
        </div>

        <!-- Error -->
        <div v-if="error" class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]">
          <svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z"/>
          </svg>
          {{ error }}
        </div>

        <!-- ── Filters bar ───────────────────────────────────────────── -->
        <div class="filter-card rounded-[1.6rem] p-[2.4rem] mb-[2rem]">
          <div class="flex flex-wrap items-end gap-[1.6rem]">

            <!-- Search -->
            <div class="flex flex-col gap-[0.4rem] flex-1 min-w-[20rem]">
              <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Search</label>
              <div class="relative">
                <div class="absolute left-[1.2rem] top-1/2 -translate-y-1/2 pointer-events-none search-icon">
                  <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"/>
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search by name or reason…"
                  class="date-input w-full pl-[3.8rem] pr-[1.4rem] py-[0.9rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200"
                />
              </div>
            </div>

            <!-- Status filter -->
            <div class="flex flex-col gap-[0.4rem]">
              <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Status</label>
              <select v-model="filterStatus" class="date-input px-[1.4rem] py-[0.9rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200">
                <option value="">All Requests</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            </div>

            <!-- Refresh -->
            <button
              @click="fetchHolidays"
              class="calc-btn relative flex items-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200"
            >
              <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
              </svg>
              Refresh
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
            </button>

            <!-- Quick-filter pills -->
            <div class="flex items-center gap-[0.8rem] ml-auto">
              <button
                @click="filterStatus = ''"
                class="filter-pill text-[1.1rem] px-[1.4rem] py-[0.6rem] rounded-full transition-all duration-150"
                :class="filterStatus === '' ? 'pill-active' : 'pill-inactive'"
              >All</button>
              <button
                @click="filterStatus = 'pending'"
                class="filter-pill text-[1.1rem] px-[1.4rem] py-[0.6rem] rounded-full transition-all duration-150"
                :class="filterStatus === 'pending' ? 'pill-active' : 'pill-inactive'"
              >Pending</button>
              <button
                @click="filterStatus = 'approved'"
                class="filter-pill text-[1.1rem] px-[1.4rem] py-[0.6rem] rounded-full transition-all duration-150"
                :class="filterStatus === 'approved' ? 'pill-active' : 'pill-inactive'"
              >Approved</button>
            </div>
          </div>
        </div>

        <!-- ── Loading ──────────────────────────────────────────────── -->
        <div v-if="loading" class="flex items-center gap-[1.6rem] py-[4rem] justify-center">
          <div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin"></div>
          <span class="page-label text-[1.2rem] tracking-[0.12em]">Loading holidays…</span>
        </div>

        <!-- ── Table ────────────────────────────────────────────────── -->
        <div v-else-if="processedHolidays.length" class="table-card rounded-[1.6rem] overflow-hidden">

          <!-- Summary -->
          <div class="table-summary flex items-center justify-between px-[3rem] py-[2rem]">
            <div>
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Requests</p>
              <p class="table-text text-[1.4rem]">
                {{ processedHolidays.length }} {{ processedHolidays.length === 1 ? 'request' : 'requests' }}
                <span v-if="filterStatus" class="table-sub"> — {{ filterStatus }}</span>
              </p>
            </div>
            <div class="flex items-center gap-[1.2rem]">
              <div class="stat-chip flex flex-col items-center px-[1.6rem] py-[0.8rem] rounded-[0.8rem]">
                <p class="page-label text-[0.9rem] tracking-[0.15em] uppercase mb-[0.1rem]">Pending</p>
                <p class="page-title text-[1.8rem] leading-none tabular-nums">{{ pendingCount }}</p>
              </div>
              <div class="stat-chip approved-chip flex flex-col items-center px-[1.6rem] py-[0.8rem] rounded-[0.8rem]">
                <p class="approved-label text-[0.9rem] tracking-[0.15em] uppercase mb-[0.1rem]">Approved</p>
                <p class="approved-value text-[1.8rem] leading-none tabular-nums">{{ approvedCount }}</p>
              </div>
            </div>
          </div>

          <table class="w-full">
            <thead>
              <tr class="table-head-row">
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Employee</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Reason</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Start</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">End</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Status</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(h, i) in processedHolidays"
                :key="h.id"
                class="table-row"
                :class="i % 2 === 0 ? 'row-even' : 'row-odd'"
              >
                <!-- Employee -->
                <td class="px-[3rem] py-[1.6rem]">
                  <div class="flex items-center gap-[1.2rem]">
                    <div class="emp-avatar w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center text-[1.1rem] text-white flex-shrink-0">
                      {{ h.profile?.first_name?.[0]?.toUpperCase() }}
                    </div>
                    <span class="table-text text-[1.3rem]">{{ h.profile?.first_name }} {{ h.profile?.last_name }}</span>
                  </div>
                </td>

                <!-- Reason -->
                <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem] max-w-[24rem]">
                  <span class="line-clamp-2">{{ h.content }}</span>
                </td>

                <!-- Start -->
                <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums whitespace-nowrap">{{ h.date_start }}</td>

                <!-- End -->
                <td class="px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums whitespace-nowrap" :class="h.date_end ? 'table-text' : 'table-empty'">
                  {{ h.date_end ?? '—' }}
                </td>

                <!-- Status badge -->
                <td class="px-[3rem] py-[1.6rem]">
                  <span
                    class="status-badge text-[1.1rem] px-[1.1rem] py-[0.35rem] rounded-full"
                    :class="h.is_approved ? 'badge-approved' : 'badge-pending'"
                  >
                    {{ h.is_approved ? 'Approved' : 'Pending' }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-[3rem] py-[1.6rem]">
                  <div class="flex items-center justify-end gap-[0.8rem]">
                    <button
                      v-if="!h.is_approved"
                      @click="approveHoliday(h)"
                      class="action-btn approve-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]"
                    >
                      <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                      Approve
                    </button>
                    <button
                      v-else
                      @click="revokeHoliday(h)"
                      class="action-btn revoke-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]"
                    >
                      <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>
                      </svg>
                      Revoke
                    </button>
                    <button
                      @click="deleteHoliday(h.id)"
                      class="action-btn delete-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]"
                    >
                      <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty state -->
        <div v-else-if="!loading" class="flex flex-col items-center justify-center py-[8rem] text-center">
          <div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]">
            <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
            </svg>
          </div>
          <p class="table-sub text-[1.4rem] tracking-[0.06em]">No holiday requests found.</p>
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

const holidays     = ref([])
const loading      = ref(false)
const error        = ref('')
const searchQuery  = ref('')
const filterStatus = ref('')

const fetchHolidays = async () => {
  loading.value = true; error.value = ''
  try {
    const res = await axios.get(`/api/holidays`, { params: { company_id: companyId } })
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
      `${h.profile?.first_name} ${h.profile?.last_name}`.toLowerCase().includes(q) ||
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