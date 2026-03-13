<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const user = ref(null)
const profiles = ref([])
const loading = ref(true)

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const fetchData = async () => {
  try {
    const res = await axios.get('/api/user/profiles')
    user.value = res.data.user
    profiles.value = res.data.profiles || []
  } catch (err) {
    user.value = null
    profiles.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<template>

  <!-- ───── LOADING ───── -->
  <div v-if="loading" class="loading-screen min-h-screen flex items-center justify-center">
    <div class="flex flex-col items-center gap-[1.6rem]">
      <div class="spinner w-[3rem] h-[3rem] rounded-full animate-spin"></div>
      <span class="page-label text-[1.2rem] tracking-[0.12em]">Loading...</span>
    </div>
  </div>

  <!-- ───── LOGGED IN ───── -->
  <div v-else-if="user?.id" class="page-wrapper min-h-screen relative overflow-hidden">

    <div class="blob blob-1 absolute top-[-8rem] right-[-8rem] w-[50rem] h-[50rem] rounded-full blur-[8rem] pointer-events-none"></div>
    <div class="blob blob-2 absolute bottom-[-12rem] left-[-8rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none"></div>

    <div class="relative z-10 max-w-[96rem] mx-auto py-[8rem] px-[4rem]">

      <!-- Page header -->
      <div class="mb-[5rem]">
        <p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.8rem]">Homepage</p>
        <h1 class="page-title text-[4.8rem] leading-none tracking-wide mb-[1.2rem]">
          Welcome back, {{ user.first_name }}
        </h1>
        <div class="flex items-center gap-[1rem]">
          <div class="divider-line h-px w-[4rem]"></div>
          <p class="page-sub text-[1.3rem]">Select a company to continue</p>
        </div>
      </div>

      <!-- Company grid -->
      <div v-if="profiles.length" class="grid md:grid-cols-2 gap-[2.4rem]">
        <div
          v-for="(profile, i) in profiles"
          :key="profile.id"
          class="company-card group rounded-[1.6rem] p-[3rem] hover:-translate-y-[0.2rem] transition-all duration-300"
          :style="`animation-delay: ${i * 80}ms`"
        >
          <!-- Top row -->
          <div class="flex items-start justify-between mb-[2.4rem]">
            <div class="avatar w-[4.8rem] h-[4.8rem] rounded-[1rem] flex items-center justify-center shadow-sm flex-shrink-0">
              <span class="text-white text-[2rem] leading-none">
                {{ profile.company?.name?.[0]?.toUpperCase() }}
              </span>
            </div>
            <span
              class="text-[1rem] px-[1.2rem] py-[0.4rem] rounded-full tracking-[0.1em] uppercase"
              :class="profile.role === 'manager' ? 'badge-manager' : 'badge-employee'"
            >
              {{ profile.role }}
            </span>
          </div>

          <!-- Company name -->
          <NuxtLink :to="`/${profile.id}/personal-cabinet`" class="block no-underline">
            <h2 class="company-name text-[2rem] leading-tight mb-[0.6rem] transition-colors duration-200">
              {{ profile.company?.name }}
            </h2>
            <p class="page-label text-[1.1rem] tracking-[0.06em]">ID · {{ profile.id }}</p>
          </NuxtLink>

          <div class="card-divider h-px my-[2.4rem]"></div>

          <!-- Actions -->
          <div class="flex items-center justify-between">
            <NuxtLink
              :to="`/${profile.id}/personal-cabinet`"
              class="cabinet-link flex items-center gap-[0.8rem] text-[1.2rem] transition-colors duration-200 no-underline"
            >
              <svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
              </svg>
              Personal Cabinet
            </NuxtLink>

            <NuxtLink
              v-if="profile.role === 'manager'"
              :to="`/${profile.company_id}/manager`"
              class="admin-btn relative flex items-center gap-[0.6rem] px-[1.6rem] py-[0.8rem] rounded-[0.8rem] text-[1.1rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 no-underline"
            >
              Admin Panel
              <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="flex flex-col items-center justify-center py-[8rem] text-center">
        <div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]">
          <svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/>
          </svg>
        </div>
        <p class="page-sub text-[1.4rem] tracking-[0.06em]">No companies assigned yet.</p>
      </div>

    </div>
  </div>

  <!-- ───── GUEST / LANDING ───── -->
  <div v-else class="landing-wrapper min-h-screen flex items-center justify-center relative overflow-hidden">

    <div class="landing-glow-1 absolute inset-0 pointer-events-none"></div>
    <div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[6rem] pointer-events-none"></div>
    <div class="blob blob-2 absolute bottom-[-8rem] left-[-4rem] w-[35rem] h-[35rem] rounded-full blur-[6rem] pointer-events-none"></div>

    <div class="relative z-10 text-center max-w-[72rem] px-[4rem]">

      <!-- Headline -->
      <h1 class="landing-title text-[7.2rem] leading-[0.95] tracking-tight mb-[3.2rem]">
        Track work time<br/>
        <span class="landing-muted">Simply.</span>
        <span class="landing-title"> Reliably.</span>
      </h1>

      <!-- Sub -->
      <p class="landing-sub text-[1.6rem] max-w-[52rem] mx-auto leading-relaxed mb-[4.8rem]">
        Checker helps teams manage attendance, work hours, payroll,
        and accountability — without friction.
      </p>

      <!-- CTA -->
      <div class="flex items-center justify-center gap-[1.6rem]">
        <NuxtLink
          to="/auth/login"
          class="signin-btn px-[2.4rem] py-[1.2rem] text-[1.3rem] tracking-[0.06em] rounded-[0.8rem] hover:-translate-y-px transition-all duration-200 no-underline"
        >
          Sign In
        </NuxtLink>
        <NuxtLink
          to="/auth/register-company"
          class="getstarted-btn relative flex items-center gap-[0.8rem] px-[2.8rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.08em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 no-underline"
        >
          Get Started
          <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
          <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none"></span>
        </NuxtLink>
      </div>
    </div>
  </div>

</template>

<style scoped>
/* ── Base ── */
.loading-screen,
.page-wrapper,
.landing-wrapper { background-color: var(--bg-main); transition: background-color 0.3s ease; }

.blob-1 { background-color: var(--bg-subtle); opacity: 0.5; }
.blob-2 { background-color: var(--bg-subtle); opacity: 0.3; }

.page-label   { color: var(--text-light); }
.page-title   { color: var(--text-main); }
.page-sub     { color: var(--text-muted); }
.divider-line { background-color: var(--border-hover); }

.spinner {
  border: 1px solid var(--border-hover);
  border-top-color: var(--primary);
}

/* ── Company cards ── */
.company-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.3s ease, transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}
.company-card:hover { box-shadow: var(--shadow-lg); }

.avatar { background-color: var(--primary); }

.badge-manager  { background-color: var(--primary); color: var(--bg-main); }
.badge-employee { background-color: var(--bg-subtle); color: var(--text-muted); }

.company-name { color: var(--text-main); }
.company-card:hover .company-name { color: var(--text-muted); }

.card-divider { background-color: var(--border); }

.cabinet-link { color: var(--text-muted); }
.cabinet-link:hover { color: var(--text-main); }

.admin-btn {
  background-color: var(--primary);
  box-shadow: 0 0.2rem 0.8rem var(--primary-soft);
}
.admin-btn:hover {
  background-color: var(--primary-hover);
  box-shadow: var(--shadow-md);
}

/* ── Empty state ── */
.empty-icon {
  background-color: var(--bg-subtle);
  color: var(--text-light);
}

/* ── Landing ── */
.landing-glow-1 {
  background: radial-gradient(circle at 20% 50%, var(--primary-soft) 0%, transparent 60%),
              radial-gradient(circle at 80% 20%, var(--bg-subtle) 0%, transparent 50%);
  opacity: 0.5;
}

.eyebrow {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
}
.eyebrow-dot { background-color: var(--primary); }

.landing-title { color: var(--text-main); }
.landing-muted { color: var(--text-light); }
.landing-sub   { color: var(--text-muted); }

.signin-btn {
  color: var(--text-muted);
  border: 1px solid var(--border-hover);
  background-color: var(--bg-card);
}
.signin-btn:hover {
  color: var(--text-main);
  box-shadow: var(--shadow-sm);
  border-color: var(--primary);
}

.getstarted-btn {
  background-color: var(--primary);
  box-shadow: 0 0.2rem 0.8rem var(--primary-soft);
}
.getstarted-btn:hover {
  background-color: var(--primary-hover);
  box-shadow: var(--shadow-md);
}

.stats-divider { background-color: var(--border-hover); }
</style>