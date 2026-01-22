export default defineNuxtRouteMiddleware(async () => {
  const config = useRuntimeConfig()

  try {
    const user = await $fetch(`${config.public.apiBase}/api/user`, {
      credentials: 'include'
    })

    // If the user is not an admin, redirect to home
    if (user.role !== 'admin') {
        return window.location.href = '/'
    }
  } catch {
  }
})
