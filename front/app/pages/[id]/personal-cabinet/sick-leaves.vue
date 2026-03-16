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
          <h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide">My Sick Leaves</h1>
        </div>

        <!-- Submit form -->
        <div class="filter-card rounded-[1.6rem] p-[2.8rem] max-[768px]:p-[1.6rem] mb-[2.4rem]">
          <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[2rem]">New Record</p>

          <div class="flex flex-col gap-[1.2rem]">

            <!-- Dates row -->
            <div class="flex flex-wrap items-end gap-[1.2rem]">
              <div class="flex items-end gap-[1rem] flex-1 min-w-0">
                <div class="flex flex-col gap-[0.4rem] flex-1 min-w-0">
                  <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Start Date</label>
                  <input type="date" v-model="form.date_start" class="date-input w-full rounded-[0.8rem] px-[1.2rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
                </div>
                <div class="arrow-sep text-[1.4rem] mb-[0.9rem] flex-shrink-0">→</div>
                <div class="flex flex-col gap-[0.4rem] flex-1 min-w-0">
                  <label class="page-label text-[1rem] tracking-[0.15em] uppercase">End Date</label>
                  <input type="date" v-model="form.date_end" class="date-input w-full rounded-[0.8rem] px-[1.2rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
                </div>
              </div>
            </div>

            <!-- File + submit row -->
            <div class="flex flex-wrap items-end gap-[1.2rem]">
              <div class="flex flex-col gap-[0.4rem] flex-1 min-w-0">
                <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Medical Document</label>
                <label class="file-label flex items-center gap-[1rem] rounded-[0.8rem] px-[1.4rem] py-[0.9rem] cursor-pointer transition-all duration-200">
                  <svg class="w-[1.6rem] h-[1.6rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"/>
                  </svg>
                  <span class="text-[1.2rem] truncate" :class="selectedFile ? 'file-name-active' : 'page-label'">
                    {{ selectedFile ? selectedFile.name : 'PDF / JPG / PNG' }}
                  </span>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" @change="onFileChange" class="hidden" />
                </label>
              </div>

              <button
                @click="submitSickLeave"
                class="calc-btn relative flex items-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 flex-shrink-0 max-[480px]:w-full max-[480px]:justify-center"
              >
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                </svg>
                Submit
                <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
              </button>
            </div>

          </div>

          <div v-if="formError" class="error-bar flex items-center gap-[0.8rem] mt-[1.6rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]">
            <span>⚠</span> {{ formError }}
          </div>
          <div v-if="formSuccess" class="success-bar flex items-center gap-[0.8rem] mt-[1.6rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]">
            <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ formSuccess }}
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center gap-[1.6rem] py-[4rem] justify-center">
          <div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin"></div>
          <span class="page-label text-[1.2rem] tracking-[0.12em]">Loading sick leaves...</span>
        </div>

        <!-- Fetch error -->
        <div v-else-if="error" class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]">
          <span>⚠</span> {{ error }}
        </div>

        <!-- Table -->
        <div v-else-if="sickLeaves.length" class="table-card rounded-[1.6rem] overflow-hidden">

          <div class="table-summary flex items-center justify-between px-[3rem] max-[768px]:px-[2rem] py-[2rem] flex-wrap gap-[1rem]">
            <div>
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Sick Leave Records</p>
              <p class="table-text text-[1.4rem]">{{ sickLeaves.length }} total</p>
            </div>
            <div class="doc-count-badge flex items-center gap-[0.6rem] px-[1.2rem] py-[0.4rem] rounded-full">
              <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"/>
              </svg>
              <span class="text-[1.1rem]">{{ sickLeaves.filter(s => s.has_file).length }} with documents</span>
            </div>
          </div>

          <!-- Desktop table -->
          <table class="w-full max-[600px]:hidden">
            <thead>
              <tr class="table-head-row">
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Start</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">End</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Duration</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Document</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(s, i) in sickLeaves"
                :key="s.id"
                class="table-row"
                :class="i % 2 === 0 ? 'row-even' : 'row-odd'"
              >
                <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]">{{ s.date_start }}</td>
                <td class="px-[3rem] py-[1.6rem] text-[1.3rem]" :class="s.date_end ? 'table-text' : 'table-empty'">
                  {{ s.date_end ?? '—' }}
                </td>
                <td class="px-[3rem] py-[1.6rem] text-[1.3rem]">
                  <span v-if="s.date_end" class="table-sub tabular-nums">{{ daysBetween(s.date_start, s.date_end) }} days</span>
                  <span v-else class="table-empty">—</span>
                </td>
                <td class="px-[3rem] py-[1.6rem]">
                  <button v-if="s.has_file" @click="viewFile(s.id)" class="view-btn flex items-center gap-[0.6rem] px-[1.2rem] py-[0.5rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-200">
                    <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"/>
                    </svg>
                    View
                  </button>
                  <span v-else class="no-file-badge flex items-center gap-[0.5rem] px-[1rem] py-[0.3rem] rounded-full text-[1rem]">
                    <svg class="w-[1.1rem] h-[1.1rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                    </svg>
                    No file
                  </span>
                </td>
                <td class="px-[3rem] py-[1.6rem] text-right">
                  <button @click="deleteSickLeave(s.id)" class="delete-btn flex items-center gap-[0.5rem] ml-auto px-[1.2rem] py-[0.5rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-200">
                    <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Mobile cards -->
          <div class="hidden max-[600px]:flex flex-col">
            <div
              v-for="(s, i) in sickLeaves"
              :key="`m-${s.id}`"
              class="px-[2rem] py-[1.8rem]"
              :class="i % 2 === 0 ? 'row-even' : 'row-odd'"
              style="border-bottom: 1px solid var(--border)"
            >
              <!-- Dates + duration -->
              <div class="flex items-start justify-between mb-[1.2rem]">
                <div>
                  <p class="table-text text-[1.3rem] tabular-nums">
                    {{ s.date_start }}
                    <span v-if="s.date_end" class="table-sub"> → {{ s.date_end }}</span>
                  </p>
                  <p v-if="s.date_end" class="table-sub text-[1.1rem] mt-[0.2rem]">
                    {{ daysBetween(s.date_start, s.date_end) }} days
                  </p>
                </div>
                <!-- Doc badge -->
                <button v-if="s.has_file" @click="viewFile(s.id)" class="view-btn flex items-center gap-[0.5rem] px-[1rem] py-[0.4rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-200 flex-shrink-0 ml-[1rem]">
                  <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"/>
                  </svg>
                  View Doc
                </button>
                <span v-else class="no-file-badge flex items-center gap-[0.4rem] px-[1rem] py-[0.4rem] rounded-full text-[1rem] flex-shrink-0 ml-[1rem]">
                  No file
                </span>
              </div>

              <!-- Delete -->
              <button @click="deleteSickLeave(s.id)" class="delete-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.5rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-200">
                <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                </svg>
                Delete
              </button>
            </div>
          </div>

        </div>

        <!-- Empty state -->
        <div v-else-if="!loading" class="flex flex-col items-center justify-center py-[8rem] text-center">
          <div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]">
            <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
            </svg>
          </div>
          <p class="table-sub text-[1.4rem] tracking-[0.06em]">No sick leave records found.</p>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

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

const sickLeaves   = ref([])
const loading      = ref(false)
const error        = ref('')
const formError    = ref('')
const formSuccess  = ref('')
const selectedFile = ref(null)

const form = ref({ date_start: '', date_end: '' })

const onFileChange = (e) => { selectedFile.value = e.target.files[0] ?? null }

const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / (1000 * 60 * 60 * 24)) + 1

const fetchSickLeaves = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get('/api/sick-leaves', { params: { profile_id: profileId } })
    sickLeaves.value = res.data
  } catch (e) {
    error.value = 'Failed to load sick leaves.'
  } finally {
    loading.value = false
  }
}

const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const submitSickLeave = async () => {
  formError.value = ''
  formSuccess.value = ''
  if (!form.value.date_start) { formError.value = 'Start date is required.'; return }
  try {
    await getCsrfToken()
    const payload = new FormData()
    payload.append('date_start', form.value.date_start)
    payload.append('profile_id', profileId)
    if (form.value.date_end) payload.append('date_end', form.value.date_end)
    if (selectedFile.value)  payload.append('file', selectedFile.value)
    await axios.post('/api/sick-leaves', payload, { headers: { 'Content-Type': 'multipart/form-data' } })
    formSuccess.value = 'Sick leave submitted!'
    form.value = { date_start: '', date_end: '' }
    selectedFile.value = null
    await fetchSickLeaves()
  } catch (e) {
    formError.value = 'Failed to submit sick leave.'
  }
}

const viewFile = (id) => window.open(`http://localhost:8000/api/sick-leaves/${id}/file`, '_blank')

const deleteSickLeave = async (id) => {
  if (!confirm('Delete this sick leave record?')) return
  try {
    await getCsrfToken()
    await axios.delete(`/api/sick-leaves/${id}`)
    await fetchSickLeaves()
  } catch (e) {
    error.value = 'Failed to delete record.'
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

.file-label {
  background-color: var(--bg-subtle);
  border: 1px dashed var(--border-hover);
  color: var(--text-light);
  width: 100%;
}
.file-label:hover { border-color: var(--primary); color: var(--text-muted); }
.file-name-active { color: var(--text-main); }

.calc-btn {
  background-color: var(--primary);
  box-shadow: 0 0.2rem 0.8rem var(--primary-soft);
}
.calc-btn:hover { background-color: var(--primary-hover); box-shadow: var(--shadow-md); }

.error-bar { background-color: var(--danger-soft); border: 1px solid var(--danger); color: var(--danger); }
.success-bar {
  background-color: color-mix(in srgb, #4ade80 8%, transparent);
  border: 1px solid #4ade80;
  color: #16a34a;
}
[data-theme="dark"] .success-bar { color: #4ade80; }

.spinner { border: 1px solid var(--border-hover); border-top-color: var(--primary); }

.table-card { background-color: var(--bg-card); border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.table-summary { border-bottom: 1px solid var(--border); }
.table-head-row { border-bottom: 1px solid var(--border); }
.table-row { border-bottom: 1px solid var(--border); transition: background-color 0.15s ease; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background-color: var(--bg-subtle); }
.row-even { background-color: var(--bg-card); }
.row-odd  { background-color: color-mix(in srgb, var(--bg-subtle) 40%, transparent); }

.doc-count-badge { background-color: var(--bg-subtle); border: 1px solid var(--border-hover); color: var(--text-muted); }

.view-btn { color: var(--primary); border: 1px solid var(--border-hover); background-color: var(--bg-subtle); }
.view-btn:hover { background-color: var(--primary-soft); border-color: var(--primary); }

.no-file-badge { background-color: var(--bg-subtle); color: var(--text-light); }

.delete-btn { color: var(--danger); border: 1px solid transparent; background-color: transparent; }
.delete-btn:hover { background-color: var(--danger-soft); border-color: var(--danger); }

.empty-icon { background-color: var(--bg-subtle); color: var(--text-light); }
</style>