<template>
  <div class="page-wrapper flex">
    <Sidebar :items="sidebarItems" />

    <main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden">
      <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>
      <div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none"></div>

      <div class="relative z-10 max-w-[96rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[1.6rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]">

        <!-- Lapas galvene -->
        <div class="mb-[4rem] max-[768px]:mb-[2.4rem]">
          <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]">Vadības panelis</p>
          <h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide">Uzaicināt darbiniekus</h1>
        </div>

        <!-- ── Uzaicinājumu ģenerēšanas karte ── -->
        <div class="filter-card rounded-[1.6rem] p-[3rem] mb-[2rem] max-[768px]:p-[1.6rem]">
          <div class="flex items-center gap-[1.4rem] mb-[2.4rem] pb-[2rem]" style="border-bottom: 1px solid var(--border)">
            <div class="empty-icon w-[4rem] h-[4rem] rounded-[1rem] flex items-center justify-center flex-shrink-0">
              <svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>
              </svg>
            </div>
            <div>
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.1rem]">Uzaicinājumi</p>
              <h2 class="page-title text-[1.8rem] leading-tight">Izveidot uzaicinājuma saiti</h2>
            </div>
          </div>

          <div class="flex items-center gap-[2rem] flex-wrap max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-[1.2rem]">
            <button
              @click="createInvite"
              class="calc-btn relative flex items-center justify-center gap-[0.8rem] px-[2.4rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200"
            >
              <svg class="w-[1.5rem] h-[1.5rem]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              Izveidot uzaicinājumu
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
            </button>

            <!-- Jaunā saite -->
            <transition name="fade-slide">
              <div v-if="link" class="link-result flex items-start gap-[1.2rem] flex-1 min-w-0 px-[1.8rem] py-[1.2rem] rounded-[0.8rem] max-[768px]:flex-col max-[768px]:gap-[1rem]">
                <div class="flex items-start gap-[1rem] flex-1 min-w-0">
                  <svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0 link-icon mt-[0.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>
                  </svg>
                  <span class="link-text text-[1.2rem] break-all flex-1">{{ link }}</span>
                </div>

                <button @click="copyLink" class="copy-btn flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem] flex-shrink-0 transition-all duration-150 max-[768px]:w-full">
                  <svg v-if="!copied" class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"/>
                  </svg>
                  <svg v-else class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                  </svg>
                  {{ copied ? 'Kopēts!' : 'Kopēt' }}
                </button>
              </div>
            </transition>
          </div>
        </div>

        <!-- ── Uzaicinājumu tabula ── -->
        <div class="table-card rounded-[1.6rem] overflow-hidden">

          <div class="table-summary flex items-center justify-between px-[3rem] py-[2rem] max-[768px]:px-[1.6rem] max-[768px]:py-[1.4rem]">
            <div>
              <p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]">Aktīvie uzaicinājumi</p>
              <p class="table-text text-[1.4rem]">{{ invites.length }} neizmantoti {{ invites.length === 1 ? 'uzaicinājums' : 'uzaicinājumi' }}</p>
            </div>
          </div>

          <template v-if="invites.length">

            <!-- DESKTOP -->
            <table class="w-full max-[768px]:hidden">
              <thead>
                <tr class="table-head-row">
                  <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Uzaicinājuma saite</th>
                  <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Izveidots</th>
                  <th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal">Derīguma termiņš</th>
                  <th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal">Darbība</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(invite, i) in invites" :key="invite.id">
                  <td class="px-[3rem] py-[1.6rem]">
                    <span class="table-text text-[1.2rem] break-all font-mono">
                      {{ `http://localhost:3000/auth/register?token=${invite.token}` }}
                    </span>
                  </td>
                  <td class="table-text px-[3rem] py-[1.6rem]">
                    {{ new Date(invite.created_at).toLocaleDateString('lv-LV') }}
                  </td>
                  <td class="px-[3rem] py-[1.6rem]">
                    {{ new Date(invite.expires_at).toLocaleDateString('lv-LV') }}
                  </td>
                  <td class="px-[3rem] py-[1.6rem] text-right">
                    <button @click="copyToken(invite.token)">
                      Kopēt
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- MOBILE -->
            <div class="hidden max-[768px]:block divide-y divide-[var(--border)]">
              <div v-for="invite in invites" :key="invite.id" class="invite-card px-[1.6rem] py-[1.6rem]">
                <span class="table-text text-[1.2rem] break-all font-mono">
                  {{ `http://localhost:3000/auth/register?token=${invite.token}` }}
                </span>

                <div class="flex items-center justify-between mt-[1rem]">
                  <span>{{ new Date(invite.created_at).toLocaleDateString('lv-LV') }}</span>
                  <span>{{ new Date(invite.expires_at).toLocaleDateString('lv-LV') }}</span>
                </div>

                <button @click="copyToken(invite.token)" class="mt-[1rem] w-full">
                  Kopēt
                </button>
              </div>
            </div>

          </template>

          <!-- Empty -->
          <div v-else class="flex flex-col items-center justify-center py-[6rem] text-center">
            <p class="table-sub text-[1.4rem] tracking-[0.06em]">
              Nav aktīvu uzaicinājumu saišu.
            </p>
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

const link    = ref('')
const invites = ref([])
const copied  = ref(false)

const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const fetchInvites = async () => {
  try {
    const res = await axios.get(`/api/companies/${companyId}/invites`)
    invites.value = res.data
  } catch (e) { console.error(e) }
}

const createInvite = async () => {
  try {
    await getCsrfToken()
    const res = await axios.post(`/api/invites/${companyId}`)
    link.value = res.data.link
    await fetchInvites()
  } catch (e) { console.error(e) }
}

const copyLink = async () => {
  await navigator.clipboard.writeText(link.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

const copyToken = (token) => {
  navigator.clipboard.writeText(`http://localhost:3000/auth/register?token=${token}`)
}

const isExpiringSoon = (expiresAt) => {
  const diff = new Date(expiresAt) - new Date()
  return diff < 1000 * 60 * 60 * 48
}

onMounted(fetchInvites)
</script>

<style scoped>
.page-wrapper { background-color: var(--bg-main); transition: background-color 0.3s ease; }
.blob-1 { background-color: var(--bg-subtle); opacity: 0.5; }
.blob-2 { background-color: var(--bg-subtle); opacity: 0.3; }

.page-label  { color: var(--text-light); }
.page-title  { color: var(--text-main); }
.table-text  { color: var(--text-main); }
.table-sub   { color: var(--text-muted); }

.filter-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.empty-icon { background-color: var(--bg-subtle); color: var(--text-muted); }

.calc-btn {
  background-color: var(--primary);
  box-shadow: 0 0.2rem 0.8rem var(--primary-soft);
  font-family: inherit;
  cursor: pointer;
}
.calc-btn:hover { background-color: var(--primary-hover); box-shadow: var(--shadow-md); }

.link-result {
  background-color: color-mix(in srgb, var(--primary) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--primary) 20%, transparent);
}
.link-icon { color: var(--primary); opacity: 0.7; }
.link-text  { color: var(--text-main); }

.copy-btn {
  background-color: color-mix(in srgb, var(--primary) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--primary) 28%, transparent);
  color: var(--primary);
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}
.copy-btn:hover {
  background-color: color-mix(in srgb, var(--primary) 22%, transparent);
  border-color: var(--primary);
}

.table-card { background-color: var(--bg-card); border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.table-summary  { border-bottom: 1px solid var(--border); }
.table-head-row { border-bottom: 1px solid var(--border); }
.table-row { border-bottom: 1px solid var(--border); transition: background-color 0.15s ease; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background-color: var(--bg-subtle); }
.row-even { background-color: var(--bg-card); }
.row-odd  { background-color: color-mix(in srgb, var(--bg-subtle) 40%, transparent); }

/* Mobile invite card */
.invite-card { transition: background-color 0.15s ease; }

.link-dot { background-color: #22c55e; box-shadow: 0 0 0 3px color-mix(in srgb, #22c55e 20%, transparent); }

.badge-ok {
  background-color: color-mix(in srgb, #22c55e 10%, transparent);
  border: 1px solid color-mix(in srgb, #22c55e 25%, transparent);
  color: #22c55e;
}
.badge-warn {
  background-color: var(--danger-soft);
  border: 1px solid color-mix(in srgb, var(--danger) 30%, transparent);
  color: var(--danger);
}

.action-btn { font-family: inherit; font-weight: 500; cursor: pointer; border: 1px solid transparent; }
.copy-row-btn {
  background-color: var(--bg-subtle);
  border-color: var(--border-hover);
  color: var(--text-muted);
}
.copy-row-btn:hover { border-color: var(--primary); color: var(--text-main); }

.fade-slide-enter-active,
.fade-slide-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-slide-enter-from   { opacity: 0; transform: translateY(-6px); }
.fade-slide-leave-to     { opacity: 0; transform: translateY(-6px); }

main::-webkit-scrollbar { width: 6px; }
main::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 3px; }
</style>