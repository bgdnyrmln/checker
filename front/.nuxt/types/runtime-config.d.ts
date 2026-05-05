import { RuntimeConfig as UserRuntimeConfig, PublicRuntimeConfig as UserPublicRuntimeConfig } from 'nuxt/schema'
  interface SharedRuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },

   sanctum: {
      baseUrl: string,

      mode: string,

      userStateKey: string,

      redirectIfAuthenticated: boolean,

      redirectIfUnauthenticated: boolean,

      endpoints: {
         csrf: string,

         login: string,

         logout: string,

         user: string,
      },

      csrf: {
         cookie: string,

         header: string,
      },

      client: {
         retry: boolean,

         initialRequest: boolean,
      },

      redirect: {
         keepRequestedRoute: boolean,

         onLogin: string,

         onLogout: string,

         onAuthOnly: string,

         onGuestOnly: string,
      },

      globalMiddleware: {
         enabled: boolean,

         prepend: boolean,

         allow404WithoutAuth: boolean,
      },

      logLevel: number,

      appendPlugin: boolean,

      serverProxy: {
         enabled: boolean,

         route: string,

         baseUrl: string,
      },
   },
  }
  interface SharedPublicRuntimeConfig {
   apiBase: string,

   sanctum: {
      baseUrl: string,

      mode: string,

      userStateKey: string,

      redirectIfAuthenticated: boolean,

      redirectIfUnauthenticated: boolean,

      endpoints: {
         csrf: string,

         login: string,

         logout: string,

         user: string,
      },

      csrf: {
         cookie: string,

         header: string,
      },

      client: {
         retry: boolean,

         initialRequest: boolean,
      },

      redirect: {
         keepRequestedRoute: boolean,

         onLogin: string,

         onLogout: string,

         onAuthOnly: string,

         onGuestOnly: string,
      },

      globalMiddleware: {
         enabled: boolean,

         prepend: boolean,

         allow404WithoutAuth: boolean,
      },

      logLevel: number,

      appendPlugin: boolean,
   },
  }
declare module '@nuxt/schema' {
  interface RuntimeConfig extends UserRuntimeConfig {}
  interface PublicRuntimeConfig extends UserPublicRuntimeConfig {}
}
declare module 'nuxt/schema' {
  interface RuntimeConfig extends SharedRuntimeConfig {}
  interface PublicRuntimeConfig extends SharedPublicRuntimeConfig {}
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: UserRuntimeConfig
        }
      }