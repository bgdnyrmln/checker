<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-[4rem] relative overflow-hidden">

    <!-- Subtle background texture -->
    <div class="absolute top-[-10rem] right-[-10rem] w-[60rem] h-[60rem] rounded-full bg-gray-200/60 blur-[8rem] pointer-events-none"></div>
    <div class="absolute bottom-[-15rem] left-[-10rem] w-[50rem] h-[50rem] rounded-full bg-gray-300/40 blur-[8rem] pointer-events-none"></div>

    <div class="relative z-10 w-full max-w-[52rem]">

      <!-- Header -->
      <div class="flex items-center gap-[2rem] mb-[3rem]">
        <div class="relative w-[6.4rem] h-[6.4rem] flex-shrink-0">
          <div class="absolute inset-[0.6rem] rounded-full bg-white flex items-center justify-center z-10 shadow-sm ring-1 ring-gray-200">
            <span class="text-[2rem] font-semibold text-gray-800 tracking-wider">
              {{ initials }}
            </span>
          </div>
          <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="2"/>
            <circle cx="50" cy="50" r="46" fill="none" stroke="url(#ringGrad)" stroke-width="2"
              stroke-dasharray="289" stroke-dashoffset="80" stroke-linecap="round"
              class="animate-[spin-ring_3s_ease-in-out_infinite]"/>
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#111"/>
                <stop offset="100%" stop-color="#666"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div>
          <p class="text-[1.1rem] tracking-[0.2em] uppercase text-gray-400 mb-[0.4rem]">Account Settings</p>
          <h1 class="text-[3.2rem] font-light text-gray-900 leading-none tracking-wide">
            {{ profile?.first_name || 'Your' }} {{ profile?.last_name || 'Profile' }}
          </h1>
        </div>
      </div>

      <!-- Card -->
      <div class="bg-white border border-gray-200 rounded-[1.6rem] p-[3rem] shadow-[0_2rem_6rem_rgba(0,0,0,0.08),0_0.4rem_1.2rem_rgba(0,0,0,0.04)]">

        <!-- Loading -->
        <div v-if="loading" class="flex flex-col items-center gap-[1.5rem] py-[3rem]">
          <div class="w-[2.8rem] h-[2.8rem] rounded-full border border-gray-200 border-t-gray-800 animate-spin"></div>
          <span class="text-[1.1rem] tracking-[0.12em] text-gray-400">Fetching your data...</span>
        </div>

        <div v-else-if="profile" class="flex flex-col gap-[2.4rem]">

          <!-- Name row -->
          <div class="grid grid-cols-2 gap-[2rem]">
            <div class="flex flex-col gap-[0.8rem]">
              <label class="text-[1rem] tracking-[0.18em] uppercase text-gray-400">First Name</label>
              <div class="relative group">
                <input
                  v-model="profile.first_name"
                  type="text"
                  placeholder="First name"
                  class="w-full bg-gray-50 border border-gray-200 rounded-[0.8rem] px-[1.6rem] py-[1.2rem] text-[1.3rem] text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-300 focus:border-gray-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)]"
                />
                <div class="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </div>
            </div>

            <div class="flex flex-col gap-[0.8rem]">
              <label class="text-[1rem] tracking-[0.18em] uppercase text-gray-400">Last Name</label>
              <div class="relative group">
                <input
                  v-model="profile.last_name"
                  type="text"
                  placeholder="Last name"
                  class="w-full bg-gray-50 border border-gray-200 rounded-[0.8rem] px-[1.6rem] py-[1.2rem] text-[1.3rem] text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-300 focus:border-gray-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)]"
                />
                <div class="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-[0.8rem]">
            <label class="text-[1rem] tracking-[0.18em] uppercase text-gray-400">Email Address</label>
            <div class="relative group">
              <input
                v-model="profile.email"
                type="email"
                placeholder="you@example.com"
                class="w-full bg-gray-50 border border-gray-200 rounded-[0.8rem] px-[1.6rem] py-[1.2rem] text-[1.3rem] text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-300 focus:border-gray-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)]"
              />
              <div class="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between gap-[1.6rem] pt-[0.8rem] border-t border-gray-100">

            <transition
              enter-active-class="transition-all duration-300"
              enter-from-class="opacity-0 translate-y-[0.4rem]"
              leave-active-class="transition-all duration-200"
              leave-to-class="opacity-0"
            >
              <div v-if="error" class="flex items-center gap-[0.6rem] text-[1.1rem] text-red-500">
                <span>⚠</span><span>{{ error }}</span>
              </div>
              <div v-else-if="success" class="flex items-center gap-[0.6rem] text-[1.1rem] text-green-600 ">
                <span>✓</span><span>Saved successfully</span>
              </div>
            </transition>

            <button
              @click="updateProfile"
              :disabled="saving"
              class="relative flex items-center gap-[0.8rem] px-[2.4rem] py-[1.2rem] bg-gray-900 rounded-[0.8rem] text-white text-[1.2rem] tracking-[0.1em] overflow-hidden transition-all duration-200 shadow-[0_0.2rem_0.8rem_rgba(0,0,0,0.15)] hover:bg-black hover:shadow-[0_0.6rem_2rem_rgba(0,0,0,0.25)] hover:-translate-y-px active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex-shrink-0 cursor-pointer ml-auto"
            >
              <span>{{ saving ? 'Saving…' : 'Save Changes' }}</span>
              <span class="transition-transform duration-200 group-hover:translate-x-[0.3rem]">→</span>
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2.5s_ease-in-out_infinite] pointer-events-none"></span>
            </button>
          </div>

        </div>
      </div>

      <p class="text-center mt-[1.6rem] text-[1rem] tracking-[0.12em] text-gray-400">
        Changes are encrypted and stored securely.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

const profile = ref(null)
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const success = ref(false)

const initials = computed(() => {
  if (!profile.value) return '?'
  return `${profile.value.first_name?.[0] || ''}${profile.value.last_name?.[0] || ''}`.toUpperCase()
})

const fetchProfile = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get('/api/user')
    profile.value = res.data
  } catch (e) {
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
  saving.value = true
  error.value = ''
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