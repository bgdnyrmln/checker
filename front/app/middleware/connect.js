import axios from "axios";

export default defineNuxtRouteMiddleware(async (to) => {
  try {
    const route = useRoute()
    const inviteToken = ref(route.query.token || '')
    await axios.get(`${config.public.apiBase}/api/user`, { withCredentials: true })
    if (inviteToken.value) {
        return navigateTo('/auth/connect?token=' + inviteToken.value)
    } else {
      return navigateTo('/auth/connect')
    }
  } catch {
    // No user, allow access to guest routes
  }
})