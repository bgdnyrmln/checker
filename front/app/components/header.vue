<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const config = useRuntimeConfig()
const user = ref(null)
const mobileMenuOpen = ref(false)

axios.defaults.baseURL = config.public.apiBase
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const setCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')
  const token = decodeURIComponent(
    document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
  )
  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

const fetchUser = async () => {
  try {
    const res = await axios.get('/api/user')
    user.value = res.data
  } catch {
    user.value = null
  }
}

const logout = async () => {
  try {
    await setCsrfToken()
    await axios.post('/logout')
    user.value = null
    mobileMenuOpen.value = false
    navigateTo('/auth/login')
  } catch (e) {
    console.error('Logout failed', e)
  }
}

const { isDark, toggleTheme } = useTheme()

onMounted(fetchUser)
</script>

<template>
  <header class="fixed top-[-0.2rem] w-full max-w-[144rem] z-50">

    <!-- Top accent line -->
    <div class="h-[0.2rem] w-full bg-gradient-to-r from-transparent via-gray-400/40 to-transparent"></div>

    <!-- Main bar -->
    <div class="h-[5.6rem] flex items-center justify-between backdrop-blur-md px-[4rem] max-[768px]:px-[2rem] header-bar">

      <!-- Brand -->
      <NuxtLink to="/" class="group flex items-center gap-[1rem] no-underline">
        <span
          class="w-[2.8rem] h-[2.8rem] rounded-[0.6rem] flex items-center justify-center shadow-[0_0.2rem_0.8rem_rgba(0,0,0,0.2)] transition-transform duration-200 group-hover:scale-95 flex-shrink-0"
          :style="{ backgroundColor: 'var(--primary)' }"
        >
          <span class="font-['Defonte'] text-white text-[1.6rem] leading-none">C</span>
        </span>
        <span
          class="font-['Defonte'] text-[2rem] tracking-wide leading-none max-[768px]:hidden"
          :style="{ color: 'var(--text-main)' }"
        >
          Checker
        </span>
      </NuxtLink>

      <!-- Desktop nav (hidden on mobile) -->
      <nav class="flex items-center gap-[0.4rem] max-[768px]:hidden">

        <button
          @click="toggleTheme"
          class="theme-btn flex items-center justify-center w-[3.6rem] h-[3.6rem] rounded-[0.8rem] transition-all duration-200 mr-[0.8rem]"
        >
          <svg v-if="isDark" class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
          </svg>
          <svg v-else class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
          </svg>
        </button>

        <template v-if="user">
          <NuxtLink
            to="/profile"
            class="profile-link group flex items-center gap-[1rem] px-[1.4rem] py-[0.7rem] rounded-[0.8rem] transition-all duration-200 no-underline"
          >
            <div
              class="w-[2.8rem] h-[2.8rem] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
              :style="{ backgroundColor: 'var(--primary)' }"
            >
              <span class="text-[1rem] text-white leading-none">{{ user.first_name?.[0]?.toUpperCase() }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[1.1rem] leading-tight" :style="{ color: 'var(--text-main)' }">{{ user.first_name }}</span>
              <span class="text-[0.9rem] leading-tight tracking-[0.08em]" :style="{ color: 'var(--text-muted)' }">Profile</span>
            </div>
          </NuxtLink>

          <div class="w-px h-[2rem] mx-[0.4rem]" :style="{ backgroundColor: 'var(--border-hover)' }"></div>

          <button
            @click="logout"
            class="logout-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[0.8rem] rounded-[0.8rem] text-[1.1rem] tracking-[0.05em] transition-all duration-200 cursor-pointer"
          >
            <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3"/>
            </svg>
            Atteikties no konta
          </button>
        </template>

        <template v-else>
          <NuxtLink
            to="/auth/login"
            class="login-link px-[1.6rem] py-[0.8rem] text-[1.1rem] tracking-[0.06em] rounded-[0.8rem] transition-all duration-200 no-underline"
          >
            Pieslēgties
          </NuxtLink>
          <NuxtLink
            to="/auth/register-company"
            class="register-link relative flex items-center gap-[0.6rem] px-[1.8rem] py-[0.9rem] rounded-[0.8rem] text-[1.1rem] text-white tracking-[0.08em] transition-all duration-200 hover:-translate-y-px active:translate-y-0 overflow-hidden no-underline"
          >
            Reģistrēties
            <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
            <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
          </NuxtLink>
        </template>

      </nav>

      <div class="hidden max-[768px]:flex items-center gap-[0.8rem]">

        <button
          @click="toggleTheme"
          class="theme-btn flex items-center justify-center w-[3.6rem] h-[3.6rem] rounded-[0.8rem] transition-all duration-200"
        >
          <svg v-if="isDark" class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
          </svg>
          <svg v-else class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
          </svg>
        </button>

        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="theme-btn flex items-center justify-center w-[3.6rem] h-[3.6rem] rounded-[0.8rem] transition-all duration-200"
        >
          <svg v-if="!mobileMenuOpen" class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
          </svg>
          <svg v-else class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

      </div>
    </div>

    <div v-if="mobileMenuOpen" class="mobile-menu flex flex-col gap-[0.8rem] px-[2rem] py-[2rem]">

      <template v-if="user">
        <div class="flex items-center gap-[1.2rem] px-[1.2rem] py-[1.2rem] mobile-user-card rounded-[1rem] mb-[0.4rem]">
          <div
            class="w-[3.6rem] h-[3.6rem] rounded-full flex items-center justify-center flex-shrink-0"
            :style="{ backgroundColor: 'var(--primary)' }"
          >
            <span class="text-[1.4rem] text-white leading-none">{{ user.first_name?.[0]?.toUpperCase() }}</span>
          </div>
          <div>
            <p class="text-[1.3rem] leading-tight" :style="{ color: 'var(--text-main)' }">{{ user.first_name }} {{ user.last_name }}</p>
            <p class="text-[1.1rem] leading-tight" :style="{ color: 'var(--text-muted)' }">{{ user.email }}</p>
          </div>
        </div>

        <NuxtLink
          to="/profile"
          @click="mobileMenuOpen = false"
          class="mobile-link flex items-center gap-[1rem] px-[1.4rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] no-underline transition-all duration-150"
        >
          <svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
          </svg>
          Profils
        </NuxtLink>

        <button
          @click="logout"
          class="mobile-logout flex items-center gap-[1rem] px-[1.4rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] w-full text-left transition-all duration-150 cursor-pointer"
        >
          <svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3"/>
          </svg>
          Atteikties no konta
        </button>
      </template>

      <template v-else>
        <NuxtLink
          to="/auth/login"
          @click="mobileMenuOpen = false"
          class="mobile-link flex items-center gap-[1rem] px-[1.4rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] no-underline transition-all duration-150"
        >
          Pieslēgties
        </NuxtLink>
        <NuxtLink
          to="/auth/register-company"
          @click="mobileMenuOpen = false"
          class="mobile-register flex items-center justify-center gap-[0.8rem] px-[1.4rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white no-underline transition-all duration-150"
        >
          Reģistrēties
          <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
        </NuxtLink>
      </template>

    </div>

  </header>
</template>

<style scoped>
.header-bar {
  background-color: color-mix(in srgb, var(--bg-main) 90%, transparent);
  border-bottom: 1px solid var(--border-hover);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.theme-btn {
  background-color: var(--bg-card);
  border: 1px solid var(--border-hover);
  color: var(--text-muted);
}
.theme-btn:hover {
  border-color: var(--primary);
  color: var(--text-main);
  box-shadow: var(--shadow-sm);
}

.profile-link:hover { background-color: var(--bg-card); box-shadow: var(--shadow-sm); }

.logout-btn { color: var(--text-muted); }
.logout-btn:hover { color: var(--danger); background-color: var(--danger-soft); }

.login-link { color: var(--text-muted); }
.login-link:hover { color: var(--text-main); background-color: var(--bg-card); box-shadow: var(--shadow-sm); }

.register-link {
  background-color: var(--primary);
  box-shadow: 0 0.2rem 0.8rem var(--primary-soft);
}
.register-link:hover { background-color: var(--primary-hover); box-shadow: var(--shadow-md); }

.mobile-menu {
  background-color: color-mix(in srgb, var(--bg-main) 96%, transparent);
  border-bottom: 1px solid var(--border-hover);
  backdrop-filter: blur(12px);
}

.mobile-user-card {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border);
}

.mobile-link { color: var(--text-main); }
.mobile-link:hover { background-color: var(--bg-subtle); }

.mobile-logout {
  color: var(--danger);
  background-color: transparent;
  border: none;
}
.mobile-logout:hover { background-color: var(--danger-soft); }

.mobile-register { background-color: var(--primary); }
.mobile-register:hover { background-color: var(--primary-hover); }
</style>