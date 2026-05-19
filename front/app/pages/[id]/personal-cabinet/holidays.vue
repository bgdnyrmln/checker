<template>
  <div class="page-wrapper flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden">

      <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>
      <div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none"></div>

      <div class="relative z-10 max-w-[96rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[2rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]">

        <!-- Page header -->
        <div class="mb-[4rem] max-[768px]:mb-[2.4rem]">
          <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]">Personīgā sadaļa</p>
          <h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide">Manas brīvdienas</h1>
        </div>

        <!-- Request form -->
        <div class="filter-card rounded-[1.6rem] p-[2.8rem] max-[768px]:p-[1.6rem] mb-[2.4rem]">
          <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[2rem]">Jauns pieprasījums</p>

          <div class="flex flex-col gap-[1.2rem]">

            <!-- Reason -->
            <div class="flex flex-col gap-[0.4rem]">
              <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Iemesls</label>
              <input
                v-model="form.content"
                type="text"
                placeholder="Iemesls atvaļinājumam..."
                class="form-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200"
              />
            </div>

            <!-- Dates + submit -->
            <div class="flex flex-wrap items-end gap-[1.2rem]">
              <div class="flex items-end gap-[1rem] flex-1 min-w-0">
                <div class="flex flex-col gap-[0.4rem] flex-1 min-w-0">
                  <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Sākuma datums</label>
                  <input type="date" v-model="form.date_start" class="date-input w-full rounded-[0.8rem] px-[1.2rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
                </div>
                <div class="arrow-sep text-[1.4rem] mb-[0.9rem] flex-shrink-0">→</div>
                <div class="flex flex-col gap-[0.4rem] flex-1 min-w-0">
                  <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Beigu datums</label>
                  <input type="date" v-model="form.date_end" class="date-input w-full rounded-[0.8rem] px-[1.2rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" />
                </div>
              </div>

              <button
                @click="submitHoliday"
                class="calc-btn relative flex items-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 flex-shrink-0 max-[480px]:w-full max-[480px]:justify-center"
              >
                <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
                </svg>
                Iesniegt pieprasījumu
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
          <span class="page-label text-[1.2rem] tracking-[0.12em]">Ielādē brīvdienas...</span>
        </div>

        <!-- Fetch error -->
        <div v-else-if="error" class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]">
          <span>⚠</span> {{ error }}
        </div>

        <!-- Table -->
        <div v-else-if="holidays.length" class="table-card rounded-[1.6rem] overflow-hidden">

          <div class="table-summary flex items-center justify-between px-[3rem] max-[768px]:px-[2rem] py-[2rem] flex-wrap gap-[1rem]">
            <div>
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Atvaļinājumu pieprasījumi</p>
              <p class="table-text text-[1.4rem]">{{ holidays.length }} kopā</p>
            </div>
            <div class="flex items-center gap-[1.2rem]">
              <div class="flex items-center gap-[0.6rem]">
                <span class="w-[0.8rem] h-[0.8rem] rounded-full bg-green-400"></span>
                <span class="page-label text-[1.1rem]">{{ holidays.filter(h => h.is_approved).length }} approved</span>
              </div>
              <div class="flex items-center gap-[0.6rem]">
                <span class="w-[0.8rem] h-[0.8rem] rounded-full bg-amber-400"></span>
                <span class="page-label text-[1.1rem]">{{ holidays.filter(h => !h.is_approved).length }} pending</span>
              </div>
            </div>
          </div>

          <!-- Desktop table -->
          <table class="w-full max-[600px]:hidden">
            <thead>
              <tr class="table-head-row">
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Sākuma datums</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Beigu datums</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Iemesls</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Stāvoklis</th>
                <th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal">Darbības</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(h, i) in holidays"
                :key="h.id"
                class="table-row"
                :class="i % 2 === 0 ? 'row-even' : 'row-odd'"
              >
                <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]">{{ h.date_start }}</td>
                <td class="px-[3rem] py-[1.6rem] text-[1.3rem]" :class="h.date_end ? 'table-text' : 'table-empty'">
                  {{ h.date_end ?? '—' }}
                </td>
                <td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]">{{ h.content }}</td>
                <td class="px-[3rem] py-[1.6rem]">
                  <span
                    class="inline-flex items-center gap-[0.5rem] px-[1rem] py-[0.3rem] rounded-full text-[1rem] tracking-[0.06em]"
                    :class="h.is_approved ? 'badge-approved' : 'badge-pending'"
                  >
                    <span class="w-[0.5rem] h-[0.5rem] rounded-full" :class="h.is_approved ? 'dot-approved' : 'dot-pending'"></span>
                    {{ h.is_approved ? 'Apstiprināts' : 'Gaidīts' }}
                  </span>
                </td>
                <td class="px-[3rem] py-[1.6rem] text-right">
                  <button
                    v-if="!h.is_approved"
                    @click="deleteHoliday(h.id)"
                    class="delete-btn flex items-center gap-[0.5rem] ml-auto px-[1.2rem] py-[0.5rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-200"
                  >
                    <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                    </svg>
                    Dzēst
                  </button>
                  <span v-else class="table-empty text-[1.2rem]">—</span>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Mobile cards -->
          <div class="hidden max-[600px]:flex flex-col">
            <div
              v-for="(h, i) in holidays"
              :key="`m-${h.id}`"
              class="px-[2rem] py-[1.8rem]"
              :class="i % 2 === 0 ? 'row-even' : 'row-odd'"
              style="border-bottom: 1px solid var(--border)"
            >
              <!-- Top: dates + status -->
              <div class="flex items-start justify-between mb-[1rem]">
                <div>
                  <p class="table-text text-[1.3rem] tabular-nums">{{ h.date_start }}
                    <span v-if="h.date_end" class="table-sub"> → {{ h.date_end }}</span>
                  </p>
                  <p class="table-sub text-[1.1rem] mt-[0.2rem]">{{ h.content }}</p>
                </div>
                <span
                  class="inline-flex items-center gap-[0.5rem] px-[1rem] py-[0.3rem] rounded-full text-[1rem] tracking-[0.06em] flex-shrink-0 ml-[1rem]"
                  :class="h.is_approved ? 'badge-approved' : 'badge-pending'"
                >
                  <span class="w-[0.5rem] h-[0.5rem] rounded-full" :class="h.is_approved ? 'dot-approved' : 'dot-pending'"></span>
                  {{ h.is_approved ? 'Apstiprināts' : 'Gaidīts' }}
                </span>
              </div>

              <!-- Delete -->
              <button
                v-if="!h.is_approved"
                @click="deleteHoliday(h.id)"
                class="delete-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.5rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-200"
              >
                <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                </svg>
                Dzēst
              </button>
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
          <p class="table-sub text-[1.4rem] tracking-[0.06em]">Nav atvaļinājuma pieprasījumu.</p>
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
  { text: 'Sākums',       to: `/${profileId}/personal-cabinet` },
  { text: 'Apmeklējumi',  to: `/${profileId}/personal-cabinet/attendance` },
  { text: 'Algas',        to: `/${profileId}/personal-cabinet/payroll` },
  { text: 'Grafiks',      to: `/${profileId}/personal-cabinet/schedule` },
  { text: 'Brīvdienas',   to: `/${profileId}/personal-cabinet/holidays` },
  { text: 'Slimības atvaļinājumi', to: `/${profileId}/personal-cabinet/sick-leaves` },
]

axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const holidays    = ref([])
const loading     = ref(false)
const error       = ref('')
const formError   = ref('')
const formSuccess = ref('')

const form = ref({ content: '', date_start: '', date_end: '' })

const fetchHolidays = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get('/api/holidays', { params: { profile_id: profileId } })
    holidays.value = res.data
    } catch (e) {
    error.value = 'Neizdevās ielādēt brīvdienas.'
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

const submitHoliday = async () => {
  formError.value = ''
  formSuccess.value = ''
  if (!form.value.content || !form.value.date_start) {
    formError.value = 'Iemesls un sākuma datums ir obligāti.'
    return
  }
  try {
    await getCsrfToken()
    await axios.post('/api/holidays', { ...form.value, profile_id: profileId })
    formSuccess.value = 'Atvaļinājuma pieprasījums nosūtīts!'
    form.value = { content: '', date_start: '', date_end: '' }
    await fetchHolidays()
  } catch (e) {
    formError.value = 'Neizdevās iesniegt pieprasījumu.'
  }
}

const deleteHoliday = async (id) => {
  if (!confirm('Dzēst šo atvaļinājuma pieprasījumu?')) return
  try {
    await getCsrfToken()
    await axios.delete(`/api/holidays/${id}`)
    await fetchHolidays()
  } catch (e) {
  error.value = 'Neizdevās dzēst atvaļinājumu.'
  }
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

.filter-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.form-input {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border-hover);
  color: var(--text-main);
  width: 100%;
}
.form-input::placeholder { color: var(--text-light); }
.form-input:focus {
  border-color: var(--primary);
  background-color: var(--bg-card);
  box-shadow: 0 0 0 3px var(--primary-soft);
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

.badge-approved {
  background-color: color-mix(in srgb, #4ade80 10%, transparent);
  border: 1px solid #4ade80;
  color: #16a34a;
}
[data-theme="dark"] .badge-approved { color: #4ade80; }
.dot-approved { background-color: #4ade80; }

.badge-pending {
  background-color: color-mix(in srgb, #fbbf24 10%, transparent);
  border: 1px solid #fbbf24;
  color: #b45309;
}
[data-theme="dark"] .badge-pending { color: #fbbf24; }
.dot-pending { background-color: #fbbf24; }

.delete-btn { color: var(--danger); border: 1px solid transparent; background-color: transparent; }
.delete-btn:hover { background-color: var(--danger-soft); border-color: var(--danger); }

.empty-icon { background-color: var(--bg-subtle); color: var(--text-light); }
</style>