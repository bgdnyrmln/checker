import axios from "axios";

export default defineNuxtRouteMiddleware(async (to) => {
  try {
    await axios.get('http://localhost:8000/api/user', { withCredentials: true })
    return navigateTo('/')
  } catch {
    // No user, allow access to guest routes
  }
})