// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  modules: ['@nuxtjs/tailwindcss', 'nuxt-auth-sanctum'],

  nitro: {
    routeRules: {
      '/api/**': {
        proxy: 'http://back:8000/**'
      }
    }
  },

  sanctum: {
    baseUrl: '/', // Laravel API
  },
  runtimeConfig: {
    public: {
      apiBase: '/'
    }
  },

  css: ['~/assets/style.scss'],

 
  tailwindcss: {
    config: {
      darkMode: ['selector', '[data-theme="dark"]'],
      theme: {
        extend: {
          fontFamily: {
            sans: ['Circular Std', 'sans-serif'],
            defonte: ['Defonte', 'serif'],
          },
          keyframes: {
            shimmer: {
              '0%': { transform: 'translateX(-100%)' },
              '50%, 100%': { transform: 'translateX(200%)' },
            },
            'spin-ring': {
              '0%, 100%': { strokeDashoffset: '80' },
              '50%': { strokeDashoffset: '200' },
            },
          },
          animation: {
            shimmer: 'shimmer 3s ease-in-out infinite',
            'spin-ring': 'spin-ring 3s ease-in-out infinite',
          },
        },
      },
    },
  },
})
