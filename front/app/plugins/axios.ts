// /plugins/axios.ts
import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  axios.defaults.baseURL = config.public.apiBase
  axios.defaults.withCredentials = true
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  axios.defaults.headers.common['Accept'] = 'application/json'

})
