<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

definePageMeta({ middleware: 'connect' })

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const route = useRoute()

const inviteToken  = ref(route.query.token || '')
const tokenInput   = ref('')
const pageAllowed  = ref(false)
const loading      = ref(false)
const error        = ref('')
const success      = ref('')

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  token: inviteToken.value
})

const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const validateToken = async (token) => {
  error.value = ''
  loading.value = true
  try {
    await axios.get(`/api/invites/validate/${token}`)
    inviteToken.value = token
    form.value.token = token
    pageAllowed.value = true
  } catch {
    error.value = 'Invalid or expired invite token.'
    pageAllowed.value = false
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (inviteToken.value) validateToken(inviteToken.value)
})

const submitToken = () => {
  if (!tokenInput.value) { error.value = 'Please enter an invite token.'; return }
  validateToken(tokenInput.value)
}

const submit = async () => {
  loading.value = true
  error.value = ''
  success.value = ''
  try {
    await getCsrfToken()
    await axios.post('/api/register/member', form.value)
    success.value = 'Registration successful! You can now log in.'
  } catch (e) {
    error.value = e.response?.data?.message || 'Registration failed.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-wrapper min-h-screen flex items-center justify-center p-[4rem] relative overflow-hidden">

    <!-- Ambient blobs -->
    <div class="blob blob-1 absolute top-[-8rem] right-[-8rem] w-[50rem] h-[50rem] rounded-full blur-[8rem] pointer-events-none"></div>
    <div class="blob blob-2 absolute bottom-[-10rem] left-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>

    <!-- ── TOKEN GATE ── -->
    <div v-if="!pageAllowed" class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem]">

      <!-- Logo / icon -->
      <div class="flex justify-center mb-[3.2rem]">
        <div class="brand-icon w-[5.6rem] h-[5.6rem] rounded-[1.4rem] flex items-center justify-center">
          <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"/>
          </svg>
        </div>
      </div>

      <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase text-center mb-[0.8rem]">Employee Onboarding</p>
      <h1 class="page-title text-[3rem] leading-tight text-center mb-[0.8rem]">Enter Invite Token</h1>
      <p class="page-sub text-[1.3rem] text-center mb-[3.2rem]">Paste the token from your invitation email to continue.</p>

      <div class="flex flex-col gap-[1.2rem]">
        <div class="flex flex-col gap-[0.4rem]">
          <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Invite Token</label>
          <input
            v-model="tokenInput"
            placeholder="e.g. eyJhbGciOiJIUzI1NiIs..."
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
      </div>

    </div>

    <!-- ── REGISTRATION FORM ── -->
    <div v-else class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem]">

      <!-- Token confirmed badge -->
      <div class="token-ok flex items-center gap-[0.8rem] px-[1.4rem] py-[0.8rem] rounded-full mb-[3.2rem] w-fit mx-auto">
        <svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="text-[1.1rem] tracking-[0.08em]">Invite verified</span>
      </div>

      <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase text-center mb-[0.8rem]">Employee Onboarding</p>
      <h1 class="page-title text-[3rem] leading-tight text-center mb-[3.2rem]">Create Your Account</h1>

      <div class="flex flex-col gap-[1.4rem]">

        <!-- Name row -->
        <div class="grid grid-cols-2 gap-[1.2rem]">
          <div class="flex flex-col gap-[0.4rem]">
            <label class="page-label text-[1rem] tracking-[0.15em] uppercase">First Name</label>
            <input v-model="form.first_name" placeholder="John" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" />
          </div>
          <div class="flex flex-col gap-[0.4rem]">
            <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Last Name</label>
            <input v-model="form.last_name" placeholder="Doe" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" />
          </div>
        </div>

        <div class="flex flex-col gap-[0.4rem]">
          <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Email</label>
          <input v-model="form.email" type="email" placeholder="john@company.com" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" />
        </div>

        <div class="divider-line h-px"></div>

        <div class="flex flex-col gap-[0.4rem]">
          <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Password</label>
          <input v-model="form.password" type="password" placeholder="••••••••" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" />
        </div>

        <div class="flex flex-col gap-[0.4rem]">
          <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Confirm Password</label>
          <input v-model="form.password_confirmation" type="password" placeholder="••••••••" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" />
        </div>

        <div v-if="error" class="error-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]">
          <span>⚠</span> {{ error }}
        </div>
        <div v-if="success" class="success-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]">
          <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ success }}
        </div>

        <button
          @click="submit"
          :disabled="loading"
          class="auth-btn relative flex items-center justify-center gap-[0.8rem] w-full py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 mt-[0.4rem] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <svg v-if="loading" class="w-[1.6rem] h-[1.6rem] animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          <span>{{ loading ? 'Creating account...' : 'Create Account' }}</span>
          <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
        </button>

        <p class="page-sub text-[1.1rem] text-center">
          Already have an account?
          <NuxtLink to="/auth/login" class="auth-link">Sign in</NuxtLink>
        </p>

      </div>
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

.divider-line { background-color: var(--border); }

.auth-btn {
  background-color: var(--primary);
  box-shadow: 0 0.2rem 0.8rem var(--primary-soft);
}
.auth-btn:hover:not(:disabled) {
  background-color: var(--primary-hover);
  box-shadow: var(--shadow-md);
}

.auth-link { color: var(--primary); text-decoration: none; }
.auth-link:hover { color: var(--primary-hover); text-decoration: underline; }

.token-ok {
  background-color: color-mix(in srgb, #4ade80 10%, transparent);
  border: 1px solid #4ade80;
  color: #16a34a;
}
[data-theme="dark"] .token-ok { color: #4ade80; }

.error-bar {
  background-color: var(--danger-soft);
  border: 1px solid var(--danger);
  color: var(--danger);
}
.success-bar {
  background-color: color-mix(in srgb, #4ade80 8%, transparent);
  border: 1px solid #4ade80;
  color: #16a34a;
}
[data-theme="dark"] .success-bar { color: #4ade80; }
</style>