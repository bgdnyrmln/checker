<script setup>
import { ref } from 'vue'
import axios from 'axios'

definePageMeta({ middleware: 'guest' })

axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'



const email    = ref('')
const password = ref('')
const error    = ref('')
const loading  = ref(false)

const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const login = async () => {
  error.value = ''
  loading.value = true
  try {
    await getCsrfToken()
    await axios.post('/login', { email: email.value, password: password.value })
    window.location.href = '/'
  } catch (e) {
    error.value = e.response?.data?.message || 'Invalid credentials.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-wrapper min-h-screen flex items-center justify-center p-[4rem] relative overflow-hidden">

    <div class="blob blob-1 absolute top-[-8rem] right-[-8rem] w-[50rem] h-[50rem] rounded-full blur-[8rem] pointer-events-none"></div>
    <div class="blob blob-2 absolute bottom-[-10rem] left-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>

    <div class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem]">

      <!-- Brand icon -->
      <div class="flex justify-center mb-[3.2rem]">
        <div class="brand-icon w-[5.6rem] h-[5.6rem] rounded-[1.4rem] flex items-center justify-center">
          <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
          </svg>
        </div>
      </div>

      <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase text-center mb-[0.8rem]">Welcome back</p>
      <h1 class="page-title text-[3rem] leading-tight text-center mb-[3.6rem]">Sign In</h1>

      <div class="flex flex-col gap-[1.4rem]">

        <div class="flex flex-col gap-[0.4rem]">
          <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="you@company.com"
            @keydown.enter="login"
            class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200"
          />
        </div>

        <div class="flex flex-col gap-[0.4rem]">
          <label class="page-label text-[1rem] tracking-[0.15em] uppercase">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            @keydown.enter="login"
            class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200"
          />
        </div>

        <div v-if="error" class="error-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]">
          <span>⚠</span> {{ error }}
        </div>

        <button
          @click="login"
          :disabled="loading"
          class="auth-btn relative flex items-center justify-center gap-[0.8rem] w-full py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 mt-[0.8rem] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <svg v-if="loading" class="w-[1.6rem] h-[1.6rem] animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
          <svg v-if="!loading" class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
          <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
        </button>

        <div class="flex items-center justify-between pt-[0.4rem]">
          <NuxtLink to="/auth/register" class="auth-link text-[1.2rem]">Have an invite?</NuxtLink>
          <NuxtLink to="/auth/register-company" class="auth-link text-[1.2rem]">Create a company</NuxtLink>
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
</style>
