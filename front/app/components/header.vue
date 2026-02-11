<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const config = useRuntimeConfig()
const user = ref(null)

axios.defaults.baseURL = config.public.apiBase
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const setCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie')

  const token = decodeURIComponent(
    document.cookie
      .split('; ')
      .find(c => c.startsWith('XSRF-TOKEN='))
      ?.split('=')[1] || ''
  )

  axios.defaults.headers.common['X-XSRF-TOKEN'] = token
}

// Fetch authenticated user
const fetchUser = async () => {
  try {
    const res = await axios.get('/api/user')
    user.value = res.data
  } catch {
    user.value = null
  }
}

// Logout
const logout = async () => {
  try {
    await setCsrfToken()
    await axios.post('/logout')
    user.value = null
    navigateTo('/auth/login')
  } catch (e) {
    console.error('Logout failed', e)
  }
}

onMounted(fetchUser)
</script>

<template>
  <header class="h-[4rem] flex items-center justify-between bg-gray-100 fixed w-[144rem] z-10 px-[4rem] mt-[-1rem]">
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
