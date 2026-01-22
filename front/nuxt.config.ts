// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-auth-sanctum'],

  sanctum: {
    baseUrl: "http://localhost:8000", // Laravel API
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000'
    }
  },

  css: ['/assets/style.css'],

})