<template>
  <div class="page-wrapper flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 pl-[22rem] min-h-screen relative overflow-hidden">
      <!-- Ambient blobs -->
      <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>
      <div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none"></div>

      <div class="relative z-10 max-w-[120rem] mx-auto py-[4rem] px-[4rem]">

        <!-- Page header -->
        <div class="mb-[4rem]">
          <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]">Manager Panel</p>
          <h1 class="page-title text-[3.6rem] leading-none tracking-wide">Company Profile</h1>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="flex items-center gap-[1.2rem] py-[4rem]">
          <div class="spinner w-[2rem] h-[2rem] rounded-full border-[2px] border-transparent"></div>
          <p class="table-sub text-[1.3rem]">Loading company data…</p>
        </div>

        <!-- Form card -->
        <div v-else class="form-card rounded-[1.6rem] p-[3.6rem] max-w-[56rem]">

          <!-- Card header -->
          <div class="flex items-center gap-[1.6rem] mb-[3.2rem] pb-[2.4rem] card-header-border">
            <div class="icon-badge w-[4.8rem] h-[4.8rem] rounded-[1.2rem] flex items-center justify-center flex-shrink-0">
              <svg class="w-[2.2rem] h-[2.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/>
              </svg>
            </div>
            <div>
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Settings</p>
              <h2 class="page-title text-[1.8rem] leading-tight">Edit Company Details</h2>
            </div>
          </div>

          <!-- Fields -->
          <div class="space-y-[2.4rem] mb-[3.2rem]">

            <div class="field-group">
              <label class="page-label text-[1rem] tracking-[0.18em] uppercase block mb-[1rem]">Company Name</label>
              <div class="input-wrapper relative">
                <div class="input-icon absolute left-[1.4rem] top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/>
                  </svg>
                </div>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Enter company name"
                  class="field-input w-full pl-[4.4rem] pr-[1.6rem] py-[1.3rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div class="field-group">
              <label class="page-label text-[1rem] tracking-[0.18em] uppercase block mb-[1rem]">Company Email</label>
              <div class="input-wrapper relative">
                <div class="input-icon absolute left-[1.4rem] top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                  </svg>
                </div>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="Enter company email"
                  class="field-input w-full pl-[4.4rem] pr-[1.6rem] py-[1.3rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200"
                />
              </div>
            </div>

          </div>

          <!-- Footer actions -->
          <div class="flex items-center gap-[1.6rem] pt-[2.4rem] card-header-border-top">
            <button
              @click="updateCompany"
              :disabled="saving"
              class="save-btn flex items-center gap-[0.8rem] px-[2.4rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg v-if="!saving" class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div v-else class="spinner-sm w-[1.4rem] h-[1.4rem] rounded-full border-[2px] border-transparent border-t-white"></div>
              {{ saving ? 'Saving…' : 'Save Changes' }}
            </button>

            <!-- Success toast -->
            <transition name="fade-slide">
              <div v-if="success" class="success-pill flex items-center gap-[0.6rem] px-[1.4rem] py-[0.8rem] rounded-full text-[1.2rem]">
                <svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                </svg>
                Updated successfully
              </div>
            </transition>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

definePageMeta({
  middleware: 'auth-company',
  requiresManager: true
})

const route = useRoute()
const companyId = route.params.companyId

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

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

const loading = ref(true)
const saving  = ref(false)
const success = ref(false)

const form = ref({ name: '', email: '' })

const fetchCompany = async () => {
  try {
    const res = await axios.get(`/api/companies/${companyId}`)
    form.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const updateCompany = async () => {
  saving.value  = true
  success.value = false
  try {
    await axios.put(`/api/companies/${companyId}`, form.value)
    success.value = true
    setTimeout(() => { success.value = false }, 3000)
  } catch (e) {
    console.error(e)
  } finally {
    saving.value = false
  }
}

onMounted(fetchCompany)
</script>

<style scoped>
/* ── Layout ─────────────────────────────────────────────────────────── */
.page-wrapper { background-color: var(--bg-main); transition: background-color 0.3s ease; }

.blob-1 { background-color: var(--bg-subtle); opacity: 0.5; }
.blob-2 { background-color: var(--bg-subtle); opacity: 0.3; }

/* ── Typography tokens ───────────────────────────────────────────────── */
.page-label { color: var(--text-light); }
.page-title { color: var(--text-main); }
.table-sub  { color: var(--text-muted); }

/* ── Form card ───────────────────────────────────────────────────────── */
.form-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.card-header-border     { border-bottom: 1px solid var(--border); }
.card-header-border-top { border-top: 1px solid var(--border); }

/* ── Icon badge ──────────────────────────────────────────────────────── */
.icon-badge {
  background-color: var(--bg-subtle);
  color: var(--text-muted);
}

/* ── Inputs ──────────────────────────────────────────────────────────── */
.field-input {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border);
  color: var(--text-main);
  font-family: inherit;
}

.field-input::placeholder { color: var(--text-muted); }

.field-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent);
  background-color: var(--bg-card);
}

.input-icon { color: var(--text-muted); }

/* ── Save button ─────────────────────────────────────────────────────── */
.save-btn {
  background-color: var(--primary);
  color: #fff;
  border: 1px solid transparent;
}

.save-btn:not(:disabled):hover {
  filter: brightness(1.1);
  box-shadow: 0 4px 16px color-mix(in srgb, var(--primary) 35%, transparent);
  transform: translateY(-1px);
}

.save-btn:not(:disabled):active { transform: translateY(0); }

/* ── Success pill ────────────────────────────────────────────────────── */
.success-pill {
  background-color: color-mix(in srgb, #22c55e 12%, transparent);
  border: 1px solid color-mix(in srgb, #22c55e 30%, transparent);
  color: #22c55e;
}

/* ── Loading spinner ─────────────────────────────────────────────────── */
.spinner {
  border-color: var(--border);
  border-top-color: var(--text-muted);
  animation: spin 0.8s linear infinite;
}
.spinner-sm { animation: spin 0.8s linear infinite; }

@keyframes spin { to { transform: rotate(360deg); } }

/* ── Transitions ─────────────────────────────────────────────────────── */
.fade-slide-enter-active,
.fade-slide-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-slide-enter-from   { opacity: 0; transform: translateX(-8px); }
.fade-slide-leave-to     { opacity: 0; transform: translateX(8px); }
</style>