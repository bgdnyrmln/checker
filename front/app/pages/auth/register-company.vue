<script setup>
definePageMeta({ middleware: 'guest' })

import { ref } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const form = ref({
  company_name: '',
  company_email: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const loading = ref(false)
const error   = ref('')
const success = ref(false)

const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const submit = async () => {
  loading.value = true
  error.value = ''
  try {
    await getCsrfToken()
    await axios.post('/api/register/company', form.value)
    success.value = true
  } catch (e) {
    error.value = e.response?.data?.message || 'Registration failed.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-wrapper min-h-screen flex items-center justify-center p-[4rem] relative overflow-hidden">

    <div class="blob blob-1 absolute top-[-8rem] right-[-8rem] w-[50rem] h-[50rem] rounded-full blur-[8rem] pointer-events-none"></div>
    <div class="blob blob-2 absolute bottom-[-10rem] left-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>

    <!-- Success state -->
    <div v-if="success" class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem] text-center">
      <div class="success-icon w-[6.4rem] h-[6.4rem] rounded-full flex items-center justify-center mx-auto mb-[2.4rem]">
        <svg class="w-[3rem] h-[3rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <h2 class="page-title text-[2.8rem] mb-[1.2rem]">Company Registered!</h2>
      <p class="page-sub text-[1.4rem] mb-[3.2rem]">Your company and admin account have been created. You can now sign in.</p>
      <NuxtLink
        to="/auth/login"
        class="auth-btn inline-flex items-center gap-[0.8rem] px-[2.8rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] no-underline hover:-translate-y-px transition-all duration-200"
      >
        Go to Login
        <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
        </svg>
      </NuxtLink>
    </div>

    <!-- Registration form -->
    <div v-else class="auth-card relative z-10 w-full max-w-[52rem] rounded-[2rem] p-[4.8rem]">

      <!-- Brand icon -->
      <div class="flex justify-center mb-[3.2rem]">
        <div class="brand-icon w-[5.6rem] h-[5.6rem] rounded-[1.4rem] flex items-center justify-center">
          <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/>
          </svg>
        </div>
      </div>

      <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase text-center mb-[0.8rem]">Get Started</p>
      <h1 class="page-title text-[3rem] leading-tight text-center mb-[3.6rem]">Register Your Company</h1>

      <div class="flex flex-col gap-[2.8rem]">

        <!-- Company section -->
        <div class="flex flex-col gap-[1.4rem]">
          <div class="flex items-center gap-[1rem] mb-[0.4rem]">
            <span class="section-dot w-[0.6rem] h-[0.6rem] rounded-full"></span>
            <p class="page-label text-[1rem] tracking-[0.18em] uppercase">Company Info</p>
          </div>
          <div class="flex flex-col gap-[0.4rem]">
            <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Company Name</label>
            <input v-model="form.company_name" placeholder="Acme Corp" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" />
          </div>
          <div class="flex flex-col gap-[0.4rem]">
            <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Company Email</label>
            <input v-model="form.company_email" type="email" placeholder="hello@acme.com" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" />
          </div>
        </div>

        <div class="divider-line h-px"></div>

        <!-- Admin section -->
        <div class="flex flex-col gap-[1.4rem]">
          <div class="flex items-center gap-[1rem] mb-[0.4rem]">
            <span class="section-dot w-[0.6rem] h-[0.6rem] rounded-full"></span>
            <p class="page-label text-[1rem] tracking-[0.18em] uppercase">Admin Account</p>
          </div>

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
            <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Admin Email</label>
            <input v-model="form.email" type="email" placeholder="admin@acme.com" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" />
          </div>

          <div class="grid grid-cols-2 gap-[1.2rem]">
            <div class="flex flex-col gap-[0.4rem]">
              <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Password</label>
              <input v-model="form.password" type="password" placeholder="••••••••" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" />
            </div>
            <div class="flex flex-col gap-[0.4rem]">
              <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Confirm</label>
              <input v-model="form.password_confirmation" type="password" placeholder="••••••••" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" />
            </div>
          </div>
        </div>

        <div v-if="error" class="error-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]">
          <span>⚠</span> {{ error }}
        </div>

        <button
          @click="submit"
          :disabled="loading"
          class="auth-btn relative flex items-center justify-center gap-[0.8rem] w-full py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <svg v-if="loading" class="w-[1.6rem] h-[1.6rem] animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          <span>{{ loading ? 'Registering...' : 'Register Company' }}</span>
          <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
        </button>

        <!-- Footer links -->
        <div class="flex items-center justify-between pt-[0.4rem]">
          <NuxtLink to="/auth/register" class="auth-link text-[1.2rem]">Have an invite?</NuxtLink>
          <NuxtLink to="/auth/login" class="auth-link text-[1.2rem]">Already have an account?</NuxtLink>
        </div>

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

.section-dot { background-color: var(--primary); }
.divider-line { background-color: var(--border); }

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

.auth-link { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
.auth-link:hover { color: var(--primary); }

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