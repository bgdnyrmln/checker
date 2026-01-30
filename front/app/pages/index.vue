<script setup>
import { ref } from 'vue'
import axios from 'axios'

const user = ref([])
const profiles = ref([])
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const fetchUser = async () => {
  try {
    user.value = await axios.get('/api/user').then(res => res.data)
  } catch {
    user.value = null
  }
  try {
    profiles.value = await axios.get('/api/user/profiles').then(res => res.data)
  } catch {
    profiles.value = null
  }
}

onMounted(fetchUser);

</script>

<template>
  <div v-if="user.id != null" class = 'pt-[10rem]'>
    <div v-if="profiles.length">
    <div v-for="profile in profiles" :key="profile.id">
        <NuxtLink :to="`/${profile.id}/personal-cabinet`">
            <p><strong>Company:</strong> {{ profile.name }}</p>
            <p><strong>Role:</strong> {{ profile.pivot.role }}</p>
            <p><strong>ID:</strong> {{ profile.id }}</p>
        </NuxtLink>
        <NuxtLink v-if = "profile.pivot.role == 'manager'" :to="`/${profile.pivot.company_id}/manager`">
          admin panel
        </NuxtLink>
    </div>
    </div>

  </div>
  <div v-else>
    <div class="bg-[#D8E2DC] text-[#1A1423] flex flex-col justify-center min-h-screen">
      <main class="flex flex-col items-center justify-center px-6 text-center mt-20">
        <h2 class="text-xl font-bold leading-tight max-w-2xl">
          Track work time.
          <span class="text-[#A67F8E] text-xl">Simply.</span>
          <span class="text-[#0B5351] text-xl">Reliably.</span>
        </h2>

        <p class="mt-6 max-w-xl text-[#636B61] text-xs">
          Checker helps teams manage attendance, work hours, and accountability —
          without friction.
        </p>

        <div class="mt-10 flex gap-4">
          <NuxtLink v-if="user" to="/attendance" class="px-6 py-3 rounded bg-[#0B5351] text-white font-medium hover:opacity-90 transition">
            Check In
          </NuxtLink>

          <NuxtLink v-if="user" to="/personal-cabinet" class="px-6 py-3 rounded bg-[#0B5351] text-white font-medium hover:opacity-90 transition">
            View Personal Cabinet
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
    </div>
  </div>
</template>

<style scoped>
</style>
