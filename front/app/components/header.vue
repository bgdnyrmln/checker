<template>
  <header class="h-14 border-b flex items-center justify-between px-6">
    <!-- Brand -->
    <NuxtLink to="/" class="font-semibold text-lg">
      Checker
    </NuxtLink>

    <!-- Right -->
    <div class="flex items-center gap-4">
      <template v-if="user">
        <span class="text-sm text-gray-600">
          {{ user.first_name }}
        </span>

        <button
          @click="logout"
          class="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </template>

      <template v-else>
        <NuxtLink to="/auth/login" class="text-sm hover:underline">
          Login
        </NuxtLink>

        <NuxtLink to="/auth/register-company" class="text-sm hover:underline">
          Register
        </NuxtLink>
      </template>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const config = useRuntimeConfig()

const user = ref(null)

axios.defaults.withCredentials = true
axios.defaults.baseURL = config.public.apiBase
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const fetchUser = async () => {
  try {
    const res = await axios.get('/api/user')
    user.value = res.data
  } catch {
    user.value = null
  }
}

const logout = async () => {
  await axios.post('/logout')
  user.value = null
  navigateTo('/auth/login')
}

onMounted(fetchUser)
</script>
