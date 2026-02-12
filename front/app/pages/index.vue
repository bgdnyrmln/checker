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
  <!-- Loading -->
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-gray-50">
    <p class="text-gray-500 text-lg">Loading...</p>
  </div>

  <!-- Logged In -->
  <div v-else-if="user?.id" class="min-h-screen bg-gray-100">

    <div class="max-w-5xl mx-auto py-16 px-6">
      <h1 class="text-4xl font-bold mb-2">
        Welcome back, {{ user.first_name }} 👋
      </h1>

      <p class="text-gray-500 mb-10">
        Select a company to continue
      </p>

      <div v-if="profiles.length" class="grid md:grid-cols-2 gap-6">
        <div
          v-for="profile in profiles"
          :key="profile.id"
          class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <!-- Personal Cabinet -->
          <NuxtLink
            :to="`/${profile.id}/personal-cabinet`"
            class="block"
          >
            <h2 class="text-xl font-semibold mb-3">
              {{ profile.company?.name }}
            </h2>

            <div class="flex items-center justify-between">
              <span
                class="text-xs px-3 py-1 rounded-full"
                :class="profile.role === 'manager'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-blue-100 text-blue-700'"
              >
                {{ profile.role }}
              </span>

              <span class="text-gray-400 text-sm">
                Profile ID: {{ profile.id }}
              </span>
            </div>
          </NuxtLink>

          <!-- Manager Panel -->
          <NuxtLink
            v-if="profile.role === 'manager'"
            :to="`/${profile.company_id}/manager`"
            class="mt-4 inline-block text-sm text-purple-600 hover:underline"
          >
            Open Admin Panel →
          </NuxtLink>
        </div>
      </div>

      <div v-else class="text-gray-500">
        No companies assigned yet.
      </div>
    </div>
  </div>

  <!-- Guest -->
  <div
    v-else
    class="bg-gradient-to-br from-[#D8E2DC] to-[#F8F9FA] min-h-screen flex items-center justify-center"
  >
    <div class="text-center max-w-2xl px-6">

      <h1 class="text-5xl font-bold text-[#1A1423] leading-tight">
        Track work time
        <span class="text-[#A67F8E]">Simply.</span>
        <span class="text-[#0B5351]">Reliably.</span>
      </h1>

      <p class="mt-6 text-gray-600">
        Checker helps teams manage attendance, work hours, payroll,
        and accountability — without friction.
      </p>

      <NuxtLink
        to="/auth/login"
        class="mt-8 inline-block bg-[#0B5351] text-white px-8 py-3 rounded-xl shadow hover:shadow-lg transition"
      >
        Get Started
      </NuxtLink>

    </div>
  </div>
</template>
