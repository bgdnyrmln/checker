<script setup>
import { ref } from 'vue'
import axios from 'axios'

const user = ref([])
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const fetchUser = async () => {
  try {
    user.value = await axios.get('/api/user').then(res => res.data)
  } catch {
    user.value = null
  }
}

onMounted(fetchUser);

</script>

<template>
  <div class="min-h-screen bg-[#D8E2DC] text-[#1A1423]">
    <main class="flex flex-col items-center justify-center px-6 text-center mt-20">
      <h2 class="text-4xl font-bold leading-tight max-w-2xl">
        Track work time.
        <span class="text-[#A67F8E]">Simply.</span>
        <span class="text-[#0B5351]">Reliably.</span>
      </h2>

      <p class="mt-6 max-w-xl text-[#636B61]">
        Checker helps teams manage attendance, work hours, and accountability —
        without friction.
      </p>

      <div class="mt-10 flex gap-4">
        <NuxtLink v-if="user" to="/attendance" class="px-6 py-3 rounded bg-[#0B5351] text-white font-medium hover:opacity-90 transition">
          Check In
        </NuxtLink>

        <NuxtLink v-if="user" to="/stats" class="px-6 py-3 rounded bg-[#0B5351] text-white font-medium hover:opacity-90 transition">
          View Stats
        </NuxtLink>

        <NuxtLink v-else to="/auth/login" class="px-6 py-3 rounded bg-[#0B5351] text-white font-medium hover:opacity-90 transition">
          Login
        </NuxtLink>

        <NuxtLink v-if="user && user.role === 'admin'" to="/manager/invite" class="px-6 py-3 rounded border border-[#0B5351] text-[#0B5351] font-medium hover:bg-[#0B5351] hover:text-white transition">
          Invite Employees
        </NuxtLink>

        <NuxtLink v-if="user && user.role === 'admin'" to="/manager/team" class="px-6 py-3 rounded border border-[#0B5351] text-[#0B5351] font-medium hover:bg-[#0B5351] hover:text-white transition">
          View Team
        </NuxtLink>
      </div>
    </main>
    <!-- Features 
    <section class="mt-32 px-8 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
      <div class="card">
        <h3 class="card-title">Attendance</h3>
        <p class="card-text">
          One-click check in & check out with accurate timestamps.
        </p>
      </div>

      <div class="card">
        <h3 class="card-title">Invites</h3>
        <p class="card-text">
          Secure invite links to onboard your team instantly.
        </p>
      </div>

      <div class="card">
        <h3 class="card-title">Reports</h3>
        <p class="card-text">
          Clear daily and monthly work summaries.
        </p>
      </div>
    </section> -->
  </div>
</template>

<style scoped>
.card {
  @apply bg-white rounded-xl p-6 shadow-sm border border-black/5;
}

.card-title {
  @apply text-lg font-semibold mb-2;
}

.card-text {
  @apply text-sm text-[#636B61];
}
</style>
