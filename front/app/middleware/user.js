export default defineNuxtRouteMiddleware(async () => {
  const config = useRuntimeConfig()

  try {
    await $fetch(`${config.public.apiBase}/api/user`, {
      credentials: 'include'
    })
  } catch {
    return window.location.href = '/auth/login'

  }
})
