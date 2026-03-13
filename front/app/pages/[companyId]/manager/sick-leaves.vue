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
          <h1 class="page-title text-[3.6rem] leading-none tracking-wide">Sick Leave Records</h1>
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
                  placeholder="Search by employee name…"
                  class="date-input w-full pl-[3.8rem] pr-[1.4rem] py-[0.9rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200"
                />
              </div>
            </div>

            <!-- Refresh -->
            <button
              @click="fetchSickLeaves"
              class="calc-btn relative flex items-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200"
            >
              <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
              </svg>
              Refresh
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
            </button>

            <!-- Doc filter pills -->
            <div class="flex items-center gap-[0.8rem] ml-auto">
              <button
                @click="filterDoc = ''"
                class="filter-pill text-[1.1rem] px-[1.4rem] py-[0.6rem] rounded-full transition-all duration-150"
                :class="filterDoc === '' ? 'pill-active' : 'pill-inactive'"
              >All</button>
              <button
                @click="filterDoc = 'with'"
                class="filter-pill text-[1.1rem] px-[1.4rem] py-[0.6rem] rounded-full transition-all duration-150"
                :class="filterDoc === 'with' ? 'pill-active' : 'pill-inactive'"
              >With Document</button>
              <button
                @click="filterDoc = 'without'"
                class="filter-pill text-[1.1rem] px-[1.4rem] py-[0.6rem] rounded-full transition-all duration-150"
                :class="filterDoc === 'without' ? 'pill-active' : 'pill-inactive'"
              >No Document</button>
            </div>
          </div>
        </div>

        <!-- ── Loading ──────────────────────────────────────────────── -->
        <div v-if="loading" class="flex items-center gap-[1.6rem] py-[4rem] justify-center">
          <div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin"></div>
          <span class="page-label text-[1.2rem] tracking-[0.12em]">Loading sick leaves…</span>
        </div>

        <!-- ── Table ────────────────────────────────────────────────── -->
        <div v-else-if="processedSickLeaves.length" class="table-card rounded-[1.6rem] overflow-hidden">

          <!-- Summary -->
          <div class="table-summary flex items-center justify-between px-[3rem] py-[2rem]">
            <div>
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Records</p>
              <p class="table-text text-[1.4rem]">
                {{ processedSickLeaves.length }} {{ processedSickLeaves.length === 1 ? 'record' : 'records' }}
              </p>
            </div>
            <div class="flex items-center gap-[1.2rem]">
              <div class="stat-chip flex flex-col items-center px-[1.6rem] py-[0.8rem] rounded-[0.8rem]">
                <p class="page-label text-[0.9rem] tracking-[0.15em] uppercase mb-[0.1rem]">With Doc</p>
                <p class="page-title text-[1.8rem] leading-none tabular-nums">{{ withDocCount }}</p>
              </div>
              <div class="stat-chip no-doc-chip flex flex-col items-center px-[1.6rem] py-[0.8rem] rounded-[0.8rem]">
                <p class="no-doc-label text-[0.9rem] tracking-[0.15em] uppercase mb-[0.1rem]">No Doc</p>
                <p class="no-doc-value text-[1.8rem] leading-none tabular-nums">{{ withoutDocCount }}</p>
              </div>
            </div>
          </div>

          <table class="w-full">
            <thead>
              <tr class="table-head-row">
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Employee</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Start</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">End</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Duration</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Document</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(s, i) in processedSickLeaves"
                :key="s.id"
                class="table-row"
                :class="i % 2 === 0 ? 'row-even' : 'row-odd'"
              >
                <!-- Employee -->
                <td class="px-[3rem] py-[1.6rem]">
                  <div class="flex items-center gap-[1.2rem]">
                    <div class="emp-avatar w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center text-[1.1rem] text-white flex-shrink-0">
                      {{ s.profile?.first_name?.[0]?.toUpperCase() }}
                    </div>
                    <span class="table-text text-[1.3rem]">{{ s.profile?.first_name }} {{ s.profile?.last_name }}</span>
                  </div>
                </td>

                <!-- Start -->
                <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums whitespace-nowrap">{{ s.date_start }}</td>

                <!-- End -->
                <td class="px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums whitespace-nowrap" :class="s.date_end ? 'table-text' : 'table-empty'">
                  {{ s.date_end ?? '—' }}
                </td>

                <!-- Duration -->
                <td class="px-[3rem] py-[1.6rem]">
                  <span v-if="s.date_end" class="duration-badge text-[1.1rem] px-[1rem] py-[0.3rem] rounded-full tabular-nums">
                    {{ daysBetween(s.date_start, s.date_end) }}d
                  </span>
                  <span v-else class="table-empty text-[1.2rem]">Ongoing</span>
                </td>

                <!-- Document -->
                <td class="px-[3rem] py-[1.6rem]">
                  <button
                    v-if="s.has_file"
                    @click="viewFile(s.id)"
                    class="doc-btn flex items-center gap-[0.6rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-150"
                  >
                    <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                    </svg>
                    View File
                  </button>
                  <span v-else class="no-file-badge flex items-center gap-[0.5rem] text-[1.1rem]">
                    <svg class="w-[1.1rem] h-[1.1rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                    </svg>
                    No file
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-[3rem] py-[1.6rem]">
                  <div class="flex items-center justify-end">
                    <button
                      @click="deleteSickLeave(s.id)"
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

            <tfoot>
              <tr class="table-foot-row">
                <td colspan="5" class="px-[3rem] py-[1.8rem] text-[1.1rem] tracking-[0.12em] uppercase text-right table-sub">Total Records</td>
                <td class="px-[3rem] py-[1.8rem] text-[1.8rem] text-right tabular-nums font-medium page-title">{{ processedSickLeaves.length }}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Empty state -->
        <div v-else-if="!loading" class="flex flex-col items-center justify-center py-[8rem] text-center">
          <div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]">
            <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"/>
            </svg>
          </div>
          <p class="table-sub text-[1.4rem] tracking-[0.06em]">No sick leave records found.</p>
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

const sickLeaves  = ref([])
const loading     = ref(false)
const error       = ref('')
const searchQuery = ref('')
const filterDoc   = ref('')

const fetchSickLeaves = async () => {
  loading.value = true; error.value = ''
  try {
    const res = await axios.get(`/api/sick-leaves`, { params: { company_id: companyId } })
    sickLeaves.value = res.data
  } catch (e) {
    error.value = 'Failed to load sick leaves.'
  } finally {
    loading.value = false
  }
}

const processedSickLeaves = computed(() => {
  let data = [...sickLeaves.value]
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    data = data.filter(s =>
      `${s.profile?.first_name} ${s.profile?.last_name}`.toLowerCase().includes(q)
    )
  }
  if (filterDoc.value === 'with')    data = data.filter(s =>  s.has_file)
  if (filterDoc.value === 'without') data = data.filter(s => !s.has_file)
  return data
})

const withDocCount    = computed(() => sickLeaves.value.filter(s =>  s.has_file).length)
const withoutDocCount = computed(() => sickLeaves.value.filter(s => !s.has_file).length)

const daysBetween = (start, end) => {
  const diff = new Date(end) - new Date(start)
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const viewFile = (id) => window.open(`http://localhost:8000/api/sick-leaves/${id}/file`, '_blank')

const deleteSickLeave = async (id) => {
  if (!confirm('Delete this sick leave record?')) return
  try {
    await getCsrfToken()
    await axios.delete(`/api/sick-leaves/${id}`)
    sickLeaves.value = sickLeaves.value.filter(s => s.id !== id)
  } catch {
    error.value = 'Failed to delete sick leave.'
  }
}

onMounted(fetchSickLeaves)
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
}
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

/* Filter pills */
.filter-pill { font-family: inherit; cursor: pointer; border: 1px solid transparent; font-weight: 500; }
.pill-inactive { background-color: var(--bg-subtle); border-color: var(--border); color: var(--text-muted); }
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
.table-foot-row { border-top: 1px solid var(--border-hover); background-color: var(--bg-subtle); }

/* Stat chips */
.stat-chip { background-color: var(--bg-subtle); border: 1px solid var(--border); }
.no-doc-chip {
  background-color: color-mix(in srgb, var(--danger) 8%, transparent);
  border-color: color-mix(in srgb, var(--danger) 20%, transparent);
}
.no-doc-label { color: var(--danger); opacity: 0.8; }
.no-doc-value { color: var(--danger); }

/* Avatar */
.emp-avatar { background-color: var(--primary); }

/* Duration badge */
.duration-badge {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border);
  color: var(--text-muted);
}

/* Doc button */
.doc-btn {
  background-color: color-mix(in srgb, #3b82f6 10%, transparent);
  border: 1px solid color-mix(in srgb, #3b82f6 25%, transparent);
  color: #3b82f6;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
}
.doc-btn:hover { background-color: color-mix(in srgb, #3b82f6 18%, transparent); border-color: #3b82f6; }

/* No file label */
.no-file-badge { color: var(--text-light); }

/* Delete button */
.action-btn { font-family: inherit; font-weight: 500; cursor: pointer; border: 1px solid transparent; transition: all 0.15s ease; }
.delete-btn {
  background-color: var(--danger-soft);
  border-color: color-mix(in srgb, var(--danger) 30%, transparent);
  color: var(--danger);
}
.delete-btn:hover { border-color: var(--danger); }

/* Empty state */
.empty-icon { background-color: var(--bg-subtle); color: var(--text-light); }

main::-webkit-scrollbar { width: 6px; }
main::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 3px; }
</style>