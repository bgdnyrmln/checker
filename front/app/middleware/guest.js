export default defineNuxtRouteMiddleware(async () => {
  const config = useRuntimeConfig()

  try {
    await $fetch(`${config.public.apiBase}/api/user`, {
      credentials: 'include'
    })

    // user is logged in → go home
    window.location.href = '/'
  } catch {
    // guest → allowed
  }
})
