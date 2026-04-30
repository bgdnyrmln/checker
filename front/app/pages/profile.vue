<template>
  <div class="min-h-screen page-wrapper flex items-center justify-center p-[4rem] relative overflow-hidden">

    <!-- Background blobs -->
    <div class="blob blob-1 absolute top-[-10rem] right-[-10rem] w-[60rem] h-[60rem] rounded-full blur-[8rem] pointer-events-none"></div>
    <div class="blob blob-2 absolute bottom-[-15rem] left-[-10rem] w-[50rem] h-[50rem] rounded-full blur-[8rem] pointer-events-none"></div>

    <div class="relative z-10 w-full max-w-[52rem]">

      <!-- Header -->
      <div class="flex items-center gap-[2rem] mb-[3rem]">
        <div class="relative w-[6.4rem] h-[6.4rem] flex-shrink-0">
          <div class="avatar-inner absolute inset-[0.6rem] rounded-full flex items-center justify-center z-10">
            <span class="text-[2rem] font-semibold avatar-text tracking-wider">
              {{ initials }}
            </span>
          </div>
          <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="var(--border-hover)" stroke-width="2"/>
            <circle cx="50" cy="50" r="46" fill="none" stroke="url(#ringGrad)" stroke-width="2"
              stroke-dasharray="289" stroke-dashoffset="80" stroke-linecap="round"
              class="animate-[spin-ring_3s_ease-in-out_infinite]"/>
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="var(--ring-start)"/>
                <stop offset="100%" stop-color="var(--ring-end)"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div>
          <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.4rem]">Account Settings</p>
          <h1 class="page-title text-[3.2rem] font-light leading-none tracking-wide">
            {{ profile?.first_name || 'Your' }} {{ profile?.last_name || 'Profile' }}
          </h1>
        </div>
      </div>

      <!-- Card -->
      <div class="profile-card rounded-[1.6rem] p-[3rem]">

        <!-- Loading -->
        <div v-if="loading" class="flex flex-col items-center gap-[1.5rem] py-[3rem]">
          <div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin"></div>
          <span class="page-label text-[1.1rem] tracking-[0.12em]">Fetching your data...</span>
        </div>

        <div v-else-if="profile" class="flex flex-col gap-[2.4rem]">

          <!-- Name row -->
          <div class="grid grid-cols-2 gap-[2rem] max-[480px]:grid-cols-1">
            <div class="flex flex-col gap-[0.8rem]">
              <label class="page-label text-[1rem] tracking-[0.18em] uppercase">First Name</label>
              <div class="relative group">
                <input
                  v-model="profile.first_name"
                  type="text"
                  placeholder="First name"
                  class="profile-input w-full rounded-[0.8rem] px-[1.6rem] py-[1.2rem] text-[1.3rem] outline-none transition-all duration-200"
                />
                <div class="input-line absolute bottom-0 left-[10%] right-[10%] h-px opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </div>
            </div>

            <div class="flex flex-col gap-[0.8rem]">
              <label class="page-label text-[1rem] tracking-[0.18em] uppercase">Last Name</label>
              <div class="relative group">
                <input
                  v-model="profile.last_name"
                  type="text"
                  placeholder="Last name"
                  class="profile-input w-full rounded-[0.8rem] px-[1.6rem] py-[1.2rem] text-[1.3rem] outline-none transition-all duration-200"
                />
                <div class="input-line absolute bottom-0 left-[10%] right-[10%] h-px opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-[0.8rem]">
            <label class="page-label text-[1rem] tracking-[0.18em] uppercase">Email Address</label>
            <div class="relative group">
              <input
                v-model="profile.email"
                type="email"
                placeholder="you@example.com"
                class="profile-input w-full rounded-[0.8rem] px-[1.6rem] py-[1.2rem] text-[1.3rem] outline-none transition-all duration-200"
              />
              <div class="input-line absolute bottom-0 left-[10%] right-[10%] h-px opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between gap-[1.6rem] pt-[0.8rem] footer-divider">

            <Transition
              enter-active-class="transition-all duration-300"
              enter-from-class="opacity-0 translate-y-[0.4rem]"
              leave-active-class="transition-all duration-200"
              leave-to-class="opacity-0"
            >
              <div v-if="error" class="flex items-center gap-[0.6rem] text-[1.1rem] error-text">
                <svg class="w-[1.3rem] h-[1.3rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z"/>
                </svg>
                <span>{{ error }}</span>
              </div>
              <div v-else-if="success" class="flex items-center gap-[0.6rem] text-[1.1rem] success-text">
                <svg class="w-[1.3rem] h-[1.3rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                </svg>
                <span>Saved successfully</span>
              </div>
            </Transition>

            <button
              @click="updateProfile"
              :disabled="saving"
              class="save-btn relative flex items-center gap-[0.8rem] px-[2.4rem] py-[1.2rem] rounded-[0.8rem] text-white text-[1.2rem] tracking-[0.1em] overflow-hidden transition-all duration-200 hover:-translate-y-px active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex-shrink-0 cursor-pointer ml-auto"
            >
              <span>{{ saving ? 'Saving…' : 'Save Changes' }}</span>
              <span class="transition-transform duration-200">→</span>
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2.5s_ease-in-out_infinite] pointer-events-none"></span>
            </button>
          </div>

        </div>
      </div>

      <p class="text-center mt-[1.6rem] text-[1rem] tracking-[0.12em] page-label">
        Changes are encrypted and stored securely.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true

const profile = ref(null)
const loading = ref(false)
const saving  = ref(false)
const error   = ref('')
const success = ref(false)

const initials = computed(() => {
  if (!profile.value) return '?'
  return `${profile.value.first_name?.[0] || ''}${profile.value.last_name?.[0] || ''}`.toUpperCase()
})

const fetchProfile = async () => {
  loading.value = true
  error.value   = ''
  try {
    const res     = await axios.get('/api/user')
    profile.value = res.data
  } catch {
    error.value = 'Failed to load profile'
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

const updateProfile = async () => {
  saving.value  = true
  error.value   = ''
  success.value = false
  try {
    await getCsrfToken()
    await axios.put('/api/user', profile.value)
    success.value = true
    setTimeout(() => (success.value = false), 3000)
  } catch (e) {
    error.value = e.response?.data?.message || 'Update failed'
  } finally {
    saving.value = false
  }
}

onMounted(fetchProfile)
</script>

<style scoped>
/* ── Page shell ── */
.page-wrapper {
  background-color: var(--bg-main);
  transition: background-color 0.3s ease;
}
.blob-1 { background-color: var(--bg-subtle); opacity: 0.5; }
.blob-2 { background-color: var(--bg-subtle); opacity: 0.3; }

/* ── Typography ── */
.page-label { color: var(--text-light); }
.page-title { color: var(--text-main);  }

/* ── Avatar ring gradient stops ── */
:root,
[data-theme="light"] {
  --ring-start: #111;
  --ring-end:   #666;
}
[data-theme="dark"] {
  --ring-start: #e5e7eb;
  --ring-end:   #9ca3af;
}

/* ── Avatar inner circle ── */
.avatar-inner {
  background-color: var(--bg-card);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
}
.avatar-text { color: var(--text-main); }

/* ── Card ── */
.profile-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* ── Inputs ── */
.profile-input {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border);
  color: var(--text-main);
  font-family: inherit;
  color-scheme: light;
}
[data-theme="dark"] .profile-input { color-scheme: dark; }

.profile-input::placeholder { color: var(--text-muted); }

.profile-input:focus {
  border-color: var(--primary, #6366f1);
  background-color: var(--bg-card);
  box-shadow: 0 0 0 3px var(--primary-soft, rgba(99,102,241,0.12));
}

/* Accent underline on focus */
.input-line {
  background: linear-gradient(to right, transparent, var(--text-main), transparent);
}

/* ── Footer divider ── */
.footer-divider { border-top: 1px solid var(--border); }

/* ── Spinner ── */
.spinner {
  border: 2px solid var(--border-hover);
  border-top-color: var(--text-main);
}

/* ── Feedback messages ── */
.error-text   { color: var(--danger, #ef4444); }
.success-text { color: #22c55e; }

/* ── Save button ── */
.save-btn {
  background-color: var(--text-main);
  color: var(--bg-main);
  box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.15);
  font-family: inherit;
}
.save-btn:not(:disabled):hover {
  box-shadow: 0 0.6rem 2rem rgba(0, 0, 0, 0.25);
}

/* ── Keyframes ── */
@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
@keyframes spin-ring {
  0%, 100% { stroke-dashoffset: 80;  }
  50%       { stroke-dashoffset: 240; }
}
</style>