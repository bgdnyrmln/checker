<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const user = useState('user', () => null)
const route = useRoute()

const tokenInput  = ref('')
const inviteToken = ref(route.query.token || null)
const pageAllowed = ref(false)
const companyName = ref('')
const loading     = ref(false)
const error       = ref('')
const success     = ref('')

const fetchUser = async () => {
  if (user.value) return
  try {
    const res = await axios.get('/api/user')
    user.value = res.data
  } catch {
    user.value = null
  }
}

const getCSRFToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const alreadyConnected = ref(false)

const validateToken = async (token) => {
  loading.value = true
  error.value = ''
  alreadyConnected.value = false
  try {
    const res = await axios.get(`/api/invites/validate/${token}`)
    inviteToken.value = token
    companyName.value = res.data.company_name
    
    // if backend tells us user is already a member
    if (res.data.already_connected) {
      alreadyConnected.value = true
      pageAllowed.value = false
    } else {
      pageAllowed.value = true
    }
  } catch (err) {
    const status = err.response?.status
    const message = err.response?.data?.message || 'Invalid invite token.'
    
    if (status === 409) {  // or whatever status your backend returns
      alreadyConnected.value = true
      companyName.value = err.response?.data?.company_name || ''
    } else {
      error.value = message
    }
    pageAllowed.value = false
  } finally {
    loading.value = false
  }
}

const connectToCompany = async () => {
  loading.value = true
  error.value = ''
  try {
    await getCSRFToken()
    await axios.post('/api/connect/member', {
      token: inviteToken.value,
      user_id: user.value.id
    })
    success.value = companyName.value
    pageAllowed.value = false
  } catch (err) {
    error.value = err.response?.data?.message || 'Connection failed.'
  } finally {
    loading.value = false
  }
}

const submitToken = () => {
  if (!tokenInput.value) { error.value = 'Please enter an invite token.'; return }
  validateToken(tokenInput.value)
}




onMounted(() => {
  fetchUser()
  if (inviteToken.value) validateToken(inviteToken.value) 
})
</script>

<template>
  <div class="auth-wrapper min-h-screen flex items-center justify-center p-[4rem] relative overflow-hidden">

    <div class="blob blob-1 absolute top-[-8rem] right-[-8rem] w-[50rem] h-[50rem] rounded-full blur-[8rem] pointer-events-none"></div>
    <div class="blob blob-2 absolute bottom-[-10rem] left-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>

    <!-- ── TOKEN INPUT ── -->
    <div v-if="inviteToken == null" class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem]">

      <div class="flex justify-center mb-[3.2rem]">
        <div class="brand-icon w-[5.6rem] h-[5.6rem] rounded-[1.4rem] flex items-center justify-center">
          <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"/>
          </svg>
        </div>
      </div>

      <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase text-center mb-[0.8rem]">Join a Company</p>
      <h1 class="page-title text-[3rem] leading-tight text-center mb-[0.8rem]">Enter Invite Token</h1>
      <p class="page-sub text-[1.3rem] text-center mb-[3.2rem]">Paste the token from your invitation email to continue.</p>

      <div class="flex flex-col gap-[1.2rem]">
        <div class="flex flex-col gap-[0.4rem]">
          <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Invite Token</label>
          <input
            v-model="tokenInput"
            placeholder="Paste your token here..."
            @keydown.enter="submitToken"
            class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200"
          />
        </div>

        <div v-if="error" class="error-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]">
          <span>⚠</span> {{ error }}
        </div>

        <button
          @click="submitToken"
          :disabled="loading"
          class="auth-btn relative flex items-center justify-center gap-[0.8rem] w-full py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <svg v-if="loading" class="w-[1.6rem] h-[1.6rem] animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          <span>{{ loading ? 'Checking...' : 'Continue' }}</span>
          <svg v-if="!loading" class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
          <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
        </button>

        <p class="page-sub text-[1.1rem] text-center">
          Need a company account instead?
          <NuxtLink to="/auth/register-company" class="auth-link">Register here</NuxtLink>
        </p>
      </div>
    </div>

    <!-- ── CONFIRMATION ── -->
    <div v-else-if="pageAllowed && user" class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem] text-center">

      <div class="flex justify-center mb-[3.2rem]">
        <div class="confirm-icon w-[5.6rem] h-[5.6rem] rounded-full flex items-center justify-center">
          <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>
          </svg>
        </div>
      </div>

      <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.8rem]">Token Verified</p>
      <h2 class="page-title text-[2.8rem] leading-tight mb-[0.8rem]">Connect to Company</h2>
      <p class="page-sub text-[1.3rem] mb-[0.8rem]">You're about to join</p>
      <p class="company-name text-[2.2rem] mb-[3.2rem]">{{ companyName }}</p>

      <!-- User pill -->
      <div class="user-pill inline-flex items-center gap-[1rem] px-[1.6rem] py-[0.8rem] rounded-full mb-[3.2rem]">
        <div class="avatar-sm w-[2.8rem] h-[2.8rem] rounded-full flex items-center justify-center text-[1.1rem] text-white">
          {{ user.first_name?.[0]?.toUpperCase() }}
        </div>
        <span class="page-sub text-[1.2rem]">{{ user.first_name }} {{ user.last_name }}</span>
        <span class="page-label text-[1.1rem]">· {{ user.email }}</span>
      </div>

      <div v-if="error" class="error-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] mb-[2rem]">
        <span>⚠</span> {{ error }}
      </div>

      <div class="flex items-center justify-center gap-[1.2rem]">
        <button
          @click="pageAllowed = false"
          class="cancel-btn px-[2.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200"
        >
          Cancel
        </button>
        <button
          @click="connectToCompany"
          :disabled="loading"
          class="auth-btn relative flex items-center justify-center gap-[0.8rem] px-[2.8rem] py-[1rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <svg v-if="loading" class="w-[1.6rem] h-[1.6rem] animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          <span>{{ loading ? 'Connecting...' : 'Yes, Connect' }}</span>
          <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
        </button>
      </div>
    </div>

    <!-- ── SUCCESS ── -->
    <div v-else-if="success" class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem] text-center">

      <div class="success-icon w-[6.4rem] h-[6.4rem] rounded-full flex items-center justify-center mx-auto mb-[2.4rem]">
        <svg class="w-[3rem] h-[3rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>

      <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.8rem]">All Done</p>
      <h2 class="page-title text-[2.8rem] mb-[0.8rem]">You're Connected!</h2>
      <p class="page-sub text-[1.4rem] mb-[0.4rem]">Successfully joined</p>
      <p class="company-name text-[2rem] mb-[3.2rem]">{{ success }}</p>

      <NuxtLink
        to="/"
        class="auth-btn inline-flex items-center gap-[0.8rem] px-[2.8rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] no-underline hover:-translate-y-px transition-all duration-200"
      >
        Go to Dashboard
        <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
        </svg>
      </NuxtLink>
    </div>

    <div v-else-if="alreadyConnected" class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem] text-center">

      <div class="confirm-icon w-[5.6rem] h-[5.6rem] rounded-full flex items-center justify-center mx-auto mb-[3.2rem]">
        <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      </div>

      <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.8rem]">Already a Member</p>
      <h2 class="page-title text-[2.8rem] leading-tight mb-[0.8rem]">You're already connected</h2>
      <p class="page-sub text-[1.3rem] mb-[0.4rem]">Your account is already linked to</p>
      <p class="company-name text-[2.2rem] mb-[3.2rem]">{{ companyName }}</p>

      <NuxtLink
        to="/"
        class="auth-btn inline-flex items-center gap-[0.8rem] px-[2.8rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] no-underline hover:-translate-y-px transition-all duration-200"
      >
        Go to Dashboard
        <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
        </svg>
      </NuxtLink>
    </div>

  </div>
</template>

<style scoped>
.auth-wrapper { background-color: var(--bg-main); transition: background-color 0.3s ease; }

.blob-1 { background-color: var(--bg-subtle); opacity: 0.5; }
.blob-2 { background-color: var(--bg-subtle); opacity: 0.4; }

.page-label { color: var(--text-light); }
.page-title { color: var(--text-main); }
.page-sub   { color: var(--text-muted); }

.auth-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.brand-icon {
  background-color: var(--primary);
  color: #fff;
}

.confirm-icon {
  background-color: var(--primary-soft);
  border: 1px solid var(--border-hover);
  color: var(--primary);
}

.company-name {
  color: var(--primary);
  font-weight: 500;
}

.user-pill {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border-hover);
}
.avatar-sm { background-color: var(--primary); }

.form-input {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border-hover);
  color: var(--text-main);
}
.form-input::placeholder { color: var(--text-light); }
.form-input:focus {
  border-color: var(--primary);
  background-color: var(--bg-card);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.auth-btn {
  background-color: var(--primary);
  box-shadow: 0 0.2rem 0.8rem var(--primary-soft);
}
.auth-btn:hover:not(:disabled) {
  background-color: var(--primary-hover);
  box-shadow: var(--shadow-md);
}

.cancel-btn {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border-hover);
  color: var(--text-muted);
}
.cancel-btn:hover {
  border-color: var(--primary);
  color: var(--text-main);
}

.auth-link { color: var(--primary); text-decoration: none; }
.auth-link:hover { text-decoration: underline; }

.error-bar {
  background-color: var(--danger-soft);
  border: 1px solid var(--danger);
  color: var(--danger);
}

.success-icon {
  background-color: color-mix(in srgb, #4ade80 12%, transparent);
  border: 1px solid #4ade80;
  color: #16a34a;
}
[data-theme="dark"] .success-icon { color: #4ade80; }
</style>