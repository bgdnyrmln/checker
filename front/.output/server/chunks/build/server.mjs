import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { ref, defineComponent, shallowRef, h, resolveComponent, toRef, isRef, hasInjectionContext, inject, computed, getCurrentInstance, createElementBlock, provide, cloneVNode, Suspense, Fragment, createApp, shallowReactive, onErrorCaptured, onServerPrefetch, unref, createVNode, resolveDynamicComponent, reactive, effectScope, isReadonly, isShallow, isReactive, toRaw, defineAsyncComponent, mergeProps, getCurrentScope, withCtx, toDisplayString, createTextVNode, createBlock, openBlock, useSSRContext } from 'vue';
import { e as destr, k as klona, p as parseQuery, c as createError$1, i as hasProtocol, l as isScriptProtocol, m as joinURL, n as getRequestURL, o as parse, q as getRequestHeader, r as isEqual, s as defuFn, w as withQuery, t as sanitizeStatusCode, v as setCookie, x as getCookie, y as deleteCookie, z as withTrailingSlash, A as withoutTrailingSlash, B as getContext, $ as $fetch$1, C as createHooks, D as executeAsync, E as toRouteMatcher, F as createRouter$1, G as defu, H as getResponseHeaders, I as getRequestHeaders, J as splitCookiesString, K as setResponseHeaders } from '../nitro/nitro.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { createConsola } from 'consola';
import axios from 'axios';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    versions: {
      get nuxt() {
        return "4.2.2";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = /* @__PURE__ */ Symbol("layout-meta");
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response2) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response2;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return options?.replace ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
const __nuxt_page_meta$9 = {
  requiresManager: true
};
const __nuxt_page_meta$8 = {
  requiresManager: true
};
const __nuxt_page_meta$7 = {
  requiresManager: true
};
const __nuxt_page_meta$6 = {
  requiresManager: true
};
const __nuxt_page_meta$5 = {
  requiresManager: true
};
const __nuxt_page_meta$4 = { requiresManager: true };
const __nuxt_page_meta$3 = { requiresManager: true };
const __nuxt_page_meta$2 = { requiresManager: true };
const __nuxt_page_meta$1 = {
  requiresEmployee: true
};
const __nuxt_page_meta = {
  requiresManager: true
};
const _routes = [
  {
    name: "index",
    path: "/",
    component: () => import('./index-D0HhVuJG.mjs')
  },
  {
    name: "profile",
    path: "/profile",
    component: () => import('./profile-CfiuXScu.mjs')
  },
  {
    name: "auth-login",
    path: "/auth/login",
    meta: { "middleware": "guest" },
    component: () => import('./login-CawmI3Nd.mjs')
  },
  {
    name: "auth-connect",
    path: "/auth/connect",
    component: () => import('./connect-BsVehDeQ.mjs')
  },
  {
    name: "auth-register",
    path: "/auth/register",
    meta: { "middleware": "connect" },
    component: () => import('./register-CfN251Fi.mjs')
  },
  {
    name: "auth-register-company",
    path: "/auth/register-company",
    meta: { "middleware": "guest" },
    component: () => import('./register-company-Btf22aW5.mjs')
  },
  {
    name: "companyId-manager-team",
    path: "/:companyId()/manager/team",
    meta: { ...__nuxt_page_meta$9 || {}, ...{ "middleware": "auth-company" } },
    component: () => import('./team-UETBj_TC.mjs')
  },
  {
    name: "companyId-manager",
    path: "/:companyId()/manager",
    meta: { ...__nuxt_page_meta$8 || {}, ...{ "middleware": "auth-company" } },
    component: () => import('./index-ByPbrtlS.mjs')
  },
  {
    name: "companyId-manager-invite",
    path: "/:companyId()/manager/invite",
    meta: { ...__nuxt_page_meta$7 || {}, ...{ "middleware": "auth-company" } },
    component: () => import('./invite-FcdS2NEL.mjs')
  },
  {
    name: "companyId-manager-company",
    path: "/:companyId()/manager/company",
    meta: { ...__nuxt_page_meta$6 || {}, ...{ "middleware": "auth-company" } },
    component: () => import('./company-Cu5Ab_Ui.mjs')
  },
  {
    name: "id-personal-cabinet",
    path: "/:id()/personal-cabinet",
    meta: { "middleware": "auth-company" },
    component: () => import('./index-CcPtD4NU.mjs')
  },
  {
    name: "companyId-manager-holidays",
    path: "/:companyId()/manager/holidays",
    meta: { ...__nuxt_page_meta$5 || {}, ...{ "middleware": "auth-company" } },
    component: () => import('./holidays-C7fYKVOL.mjs')
  },
  {
    name: "companyId-manager-payrolls",
    path: "/:companyId()/manager/payrolls",
    meta: { ...__nuxt_page_meta$4 || {}, ...{ "middleware": "auth-company" } },
    component: () => import('./payrolls-CebLqsto.mjs')
  },
  {
    name: "companyId-manager-schedule",
    path: "/:companyId()/manager/schedule",
    meta: { ...__nuxt_page_meta$3 || {}, ...{ "middleware": "auth-company" } },
    component: () => import('./schedule-B4cwQwvv.mjs')
  },
  {
    name: "id-personal-cabinet-payroll",
    path: "/:id()/personal-cabinet/payroll",
    meta: { "middleware": "auth-company" },
    component: () => import('./payroll-CvCpQ774.mjs')
  },
  {
    name: "companyId-manager-attendancy",
    path: "/:companyId()/manager/attendancy",
    meta: { ...__nuxt_page_meta$2 || {}, ...{ "middleware": "auth-company" } },
    component: () => import('./attendancy-DZRE0Lq7.mjs')
  },
  {
    name: "id-personal-cabinet-holidays",
    path: "/:id()/personal-cabinet/holidays",
    meta: { "middleware": "auth-company" },
    component: () => import('./holidays-zbrd8o5F.mjs')
  },
  {
    name: "id-personal-cabinet-schedule",
    path: "/:id()/personal-cabinet/schedule",
    meta: { ...__nuxt_page_meta$1 || {}, ...{ "middleware": "auth-company" } },
    component: () => import('./schedule-DoGCbjRc.mjs')
  },
  {
    name: "companyId-manager-sick-leaves",
    path: "/:companyId()/manager/sick-leaves",
    meta: { ...__nuxt_page_meta || {}, ...{ "middleware": "auth-company" } },
    component: () => import('./sick-leaves-D51zdiIz.mjs')
  },
  {
    name: "id-personal-cabinet-attendance",
    path: "/:id()/personal-cabinet/attendance",
    meta: { "middleware": "auth-company" },
    component: () => import('./attendance-BYSVQxWG.mjs')
  },
  {
    name: "id-personal-cabinet-sick-leaves",
    path: "/:id()/personal-cabinet/sick-leaves",
    meta: { "middleware": "auth-company" },
    component: () => import('./sick-leaves-Dz5p40vy.mjs')
  }
];
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  const isPageNavigation = isChangingPage(to, from);
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {
  "auth-company": () => import('./auth-company-FGqjRs6O.mjs'),
  connect: () => import('./connect-GLU_ODQa.mjs'),
  guest: () => import('./guest-BYpLi1Uj.mjs'),
  "sanctum:auth": () => import('./sanctum.auth-BvTJ03gI.mjs'),
  "sanctum:guest": () => import('./sanctum.guest-By8e60DL.mjs')
};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    router.afterEach((to, from) => {
      if (to.matched.at(-1)?.components?.default === from.matched.at(-1)?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = { sync: syncCurrentRoute };
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0) {
        return nuxtApp.runWithContext(() => showError(createError({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const useSanctumConfig = () => {
  return (/* @__PURE__ */ useRuntimeConfig()).public.sanctum;
};
const ACCEPT_HEADER = "Accept";
async function setRequestParams(app, ctx, logger) {
  const method = ctx.options.method?.toLowerCase() ?? "get";
  if (!ctx.options.headers?.has(ACCEPT_HEADER)) {
    ctx.options.headers.set(ACCEPT_HEADER, "application/json");
    logger.debug(`[request] added default ${ACCEPT_HEADER} header`);
  }
  if (method === "put" && ctx.options.body instanceof FormData) {
    ctx.options.method = "POST";
    ctx.options.body.append("_method", "PUT");
    logger.debug("[request] changed PUT to POST method for FormData compatibility");
  }
}
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function useRequestHeaders(include) {
  const event = useRequestEvent();
  const _headers = event ? getRequestHeaders(event) : {};
  if (!include || !event) {
    return _headers;
  }
  const headers = /* @__PURE__ */ Object.create(null);
  for (const _key of include) {
    const key = _key.toLowerCase();
    const header = _headers[key];
    if (header) {
      headers[key] = header;
    }
  }
  return headers;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function refreshCookie(name) {
  {
    return;
  }
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function useRequestURL(opts) {
  {
    return getRequestURL(useRequestEvent(), opts);
  }
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
    const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
    if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    const router = useRouter();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const hasTarget = computed(() => !!props.target && props.target !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = props.to || props.href || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      const path = props.to || props.href || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = props.to || props.href || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve, props.trailingSlash);
    });
    const link = isExternal.value ? void 0 : useBuiltinLink?.({ ...props, to });
    const href = computed(() => {
      const effectiveTrailingSlash = props.trailingSlash ?? options.trailingSlash;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return applyTrailingSlashBehavior(href2, effectiveTrailingSlash);
      }
      if (typeof to.value === "object") {
        return router.resolve(to.value)?.href ?? null;
      }
      return applyTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), effectiveTrailingSlash);
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: link?.isActive ?? computed(() => to.value === router.currentRoute.value.path),
      isExactActive: link?.isExactActive ?? computed(() => to.value === router.currentRoute.value.path),
      route: link?.route ?? computed(() => router.resolve(to.value)),
      async navigate(_e) {
        await navigateTo(href.value, { replace: props.replace, external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Behavior
      trailingSlash: {
        type: String,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      const router = useRouter();
      const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      shallowRef(false);
      const el = void 0;
      const elRef = void 0;
      async function prefetch(nuxtApp = useNuxtApp()) {
        {
          return;
        }
      }
      return () => {
        if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", {
          ref: el,
          href: href.value || null,
          // converts `""` to `null` to prevent the attribute from being added as empty (`href=""`)
          rel,
          target,
          onClick: (event) => {
            if (isExternal.value || hasTarget.value) {
              return;
            }
            event.preventDefault();
            return props.replace ? router.replace(href.value) : router.push(href.value);
          }
        }, slots.default?.());
      };
    }
  });
}
const __nuxt_component_0$1 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const inlineConfig = {
  "nuxt": {}
};
const __appConfig = /* @__PURE__ */ defuFn(inlineConfig);
function isPojoOrArray(val) {
  return Array.isArray(val) || !!val && typeof val === "object" && val.constructor?.name === "Object";
}
function deepAssign(obj, newObj) {
  for (const key in newObj) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const val = newObj[key];
    if (isPojoOrArray(val)) {
      const defaultVal = Array.isArray(val) ? [] : {};
      if (Array.isArray(obj[key]) !== Array.isArray(val)) {
        obj[key] = defaultVal;
      } else {
        obj[key] ??= defaultVal;
      }
      deepAssign(obj[key], val);
    } else {
      obj[key] = val;
    }
  }
}
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  nuxtApp._appConfig ||= klona(__appConfig);
  return nuxtApp._appConfig;
}
function updateAppConfig(appConfig) {
  const _appConfig = useAppConfig();
  deepAssign(_appConfig, appConfig);
}
const SECURE_METHODS = /* @__PURE__ */ new Set(["post", "delete", "put", "patch"]);
const COOKIE_OPTIONS = { readonly: true, watch: false };
function useClientHeaders(headers, config, logger) {
  const clientHeaders = useRequestHeaders(["cookie", "user-agent"]);
  const origin = config.origin ?? useRequestURL().origin;
  const headersToAdd = {
    Referer: origin,
    Origin: origin,
    ...clientHeaders.cookie && { Cookie: clientHeaders.cookie },
    ...clientHeaders["user-agent"] && { "User-Agent": clientHeaders["user-agent"] }
  };
  for (const [key, value] of Object.entries(headersToAdd)) {
    headers.set(key, value);
  }
  logger.debug(
    "[request] added client headers to server request",
    Object.keys(headersToAdd)
  );
}
async function initCsrfCookie(config, logger) {
  if (config.endpoints.csrf === void 0) {
    throw new Error("`sanctum.endpoints.csrf` is not defined");
  }
  await $fetch(config.endpoints.csrf, {
    baseURL: config.baseUrl,
    credentials: "include"
  });
  logger.debug("[request] CSRF cookie has been initialized");
}
async function useCsrfHeader(headers, config, logger) {
  if (config.csrf.cookie === void 0) {
    throw new Error("`sanctum.csrf.cookie` is not defined");
  }
  if (config.csrf.header === void 0) {
    throw new Error("`sanctum.csrf.header` is not defined");
  }
  const csrfToken = useCookie(config.csrf.cookie, COOKIE_OPTIONS);
  if (!csrfToken.value) {
    await initCsrfCookie(config, logger);
    refreshCookie(config.csrf.cookie);
  }
  if (!csrfToken.value) {
    logger.warn(`${config.csrf.cookie} cookie is missing, unable to set ${config.csrf.header} header`);
    return;
  }
  headers.set(config.csrf.header, csrfToken.value);
  logger.debug(`[request] added ${config.csrf.header} header`);
}
async function setStatefulParams(app, ctx, logger) {
  const config = useSanctumConfig();
  if (config.mode !== "cookie") {
    return;
  }
  const method = ctx.options.method?.toLowerCase() ?? "get";
  {
    useClientHeaders(
      ctx.options.headers,
      config,
      logger
    );
  }
  if (SECURE_METHODS.has(method)) {
    await useCsrfHeader(
      ctx.options.headers,
      config,
      logger
    );
  }
}
const useSanctumAppConfig = () => {
  return useAppConfig().sanctum ?? {};
};
const AUTHORIZATION_HEADER = "Authorization";
async function setTokenHeader(app, ctx, logger) {
  const config = useSanctumConfig();
  if (config.mode !== "token") {
    return;
  }
  const appConfig = useSanctumAppConfig();
  if (appConfig.tokenStorage === void 0) {
    throw new Error("`sanctum.tokenStorage` is not defined in app.config.ts");
  }
  const token = await appConfig.tokenStorage.get(app);
  if (!token) {
    logger.debug("[request] authentication token is not set in the storage");
    return;
  }
  const bearerToken = `Bearer ${token}`;
  ctx.options.headers.set(AUTHORIZATION_HEADER, bearerToken);
  logger.debug(`[request] added ${AUTHORIZATION_HEADER} token header`);
}
async function logRequestHeaders(app, ctx, logger) {
  logger.trace(
    `Request headers for "${ctx.request.toString()}"`,
    ctx.options.headers instanceof Headers ? Object.fromEntries(ctx.options.headers.entries()) : ctx.options.headers
  );
}
const ServerCookieName = "set-cookie";
function appendServerResponseHeaders(app, ctx, logger) {
  const event = useRequestEvent(app);
  if (event === void 0) {
    logger.debug(`[response] no event to pass cookies to the client [${ctx.request}]`);
    return;
  }
  const eventHeaders = getResponseHeaders(event);
  const cookiesFromEvent = extractCookiesFromEventHeaders(eventHeaders);
  const cookiesFromResponse = extractCookiesFromResponse(ctx, logger);
  const cookiesMap = createCookiesMap(cookiesFromEvent, cookiesFromResponse);
  writeCookiesToEventResponse(event, eventHeaders, cookiesMap);
  logger.debug(
    `[response] pass cookies from server to client response`,
    Array.from(cookiesMap.keys())
  );
}
function extractCookiesFromEventHeaders(headers) {
  const cookieHeader = headers[ServerCookieName] ?? [];
  if (Array.isArray(cookieHeader)) {
    return cookieHeader;
  }
  return [cookieHeader];
}
function extractCookiesFromResponse(ctx, logger) {
  const cookieHeader = ctx.response.headers.get(ServerCookieName);
  if (cookieHeader === null) {
    logger.debug(`[response] no cookies to pass to the client [${ctx.request}]`);
    return [];
  }
  return splitCookiesString(cookieHeader);
}
function createCookiesMap(...cookieCollections) {
  const cookiesMap = /* @__PURE__ */ new Map();
  for (const cookies of cookieCollections) {
    for (const cookie of cookies) {
      const cookieName = cookie.split("=")[0];
      if (cookieName === void 0) {
        continue;
      }
      cookiesMap.set(cookieName, cookie);
    }
  }
  return cookiesMap;
}
function writeCookiesToEventResponse(event, headers, cookiesMap) {
  const mergedHeaders = {
    ...headers,
    [ServerCookieName]: Array.from(cookiesMap.values())
  };
  setResponseHeaders(event, mergedHeaders);
}
async function proxyResponseHeaders(app, ctx, logger) {
  const config = useSanctumConfig();
  if (config.mode !== "cookie") {
    return;
  }
  if (ctx.response === void 0) {
    logger.debug("[response] no response to process");
    return;
  }
  {
    appendServerResponseHeaders(app, ctx, logger);
  }
  if (ctx.response.redirected) {
    const redirectUrl = ctx.response.url;
    await app.callHook("sanctum:redirect", redirectUrl);
    await app.runWithContext(async () => await navigateTo(redirectUrl));
  }
}
const validateCookieHeader = (headers, config, logger) => {
  if (config.mode == "token") {
    return;
  }
  if (!headers.has("set-cookie")) {
    logger.warn("[response] `set-cookie` header is missing, CSRF token will not be set");
  }
};
const validateContentTypeHeader = (headers, config, logger) => {
  const contentType = headers.get("content-type");
  if (!contentType) {
    logger.warn('[response] "content-type" header is missing');
    return;
  }
  if (!contentType.includes("application/json")) {
    logger.debug(`[response] 'content-type' is present in response but different (expected: application/json, got: ${contentType})`);
  }
};
const validateCredentialsHeader = (headers, config, logger) => {
  if (config.mode == "token") {
    return;
  }
  const allowCredentials = headers.get("access-control-allow-credentials");
  if (!allowCredentials || allowCredentials !== "true") {
    logger.warn(`[response] 'access-control-allow-credentials' header is missing or invalid (expected: true, got: ${allowCredentials})`);
  }
};
const validateOriginHeader = (headers, config, logger) => {
  const allowOrigin = headers.get("access-control-allow-origin");
  const currentOrigin = config?.origin ?? useRequestURL().origin;
  if (!allowOrigin || !allowOrigin.includes(currentOrigin)) {
    logger.warn(`[response] 'access-control-allow-origin' header is missing or invalid (expected: ${currentOrigin}, got: ${allowOrigin})`);
  }
};
const validators = [
  validateCookieHeader,
  validateContentTypeHeader,
  validateCredentialsHeader,
  validateOriginHeader
];
async function validateResponseHeaders(app, ctx, logger) {
  const config = app.$config.public.sanctum;
  const headers = ctx.response?.headers;
  if (!headers) {
    logger.warn("[response] no headers returned from API");
    return;
  }
  for (const validator of validators) {
    validator(headers, config, logger);
  }
}
async function logResponseHeaders(app, ctx, logger) {
  logger.trace(
    `Response headers for "${ctx.request.toString()}"`,
    ctx.response ? Object.fromEntries(ctx.response.headers.entries()) : {}
  );
}
const useSanctumUser = () => {
  const options = useSanctumConfig();
  return useState(options.userStateKey, () => null);
};
async function handleResponseError(nuxtApp, context, logger) {
  useSanctumConfig();
  const user = useSanctumUser();
  const response2 = context.response;
  if (response2.status === 419) {
    logger.warn("CSRF token mismatch, check your API configuration");
    return;
  }
  if (response2.status === 401) {
    if (user.value !== null) {
      logger.warn("User session is not set in API or expired, resetting identity");
      user.value = null;
    }
  }
}
const [request, response, responseError] = [
  [
    setRequestParams,
    setStatefulParams,
    setTokenHeader,
    logRequestHeaders
  ],
  [
    proxyResponseHeaders,
    validateResponseHeaders,
    logResponseHeaders
  ],
  [
    handleResponseError
  ]
];
const interceptors = {
  request,
  response,
  responseError
};
function determineCredentialsMode() {
  const isCredentialsSupported = "credentials" in Request.prototype;
  if (!isCredentialsSupported) {
    return void 0;
  }
  return "include";
}
function useClientInterceptors() {
  const [request2, response2, responseError2] = [
    [...interceptors.request],
    [...interceptors.response],
    [...interceptors.responseError]
  ];
  return [request2, response2, responseError2];
}
function createHttpClient(nuxtApp, logger) {
  const options = useSanctumConfig();
  const [
    requestInterceptors,
    responseInterceptors,
    responseErrorInterceptors
  ] = useClientInterceptors();
  const httpOptions = {
    baseURL: options.baseUrl,
    credentials: determineCredentialsMode(),
    redirect: "manual",
    retry: options.client.retry === true ? 1 : options.client.retry,
    // false or number
    async onRequest(context) {
      for (const interceptor of requestInterceptors) {
        await nuxtApp.runWithContext(async () => {
          await interceptor(nuxtApp, context, logger);
        });
      }
      await nuxtApp.callHook("sanctum:request", nuxtApp, context, logger);
    },
    async onResponse(context) {
      for (const interceptor of responseInterceptors) {
        await nuxtApp.runWithContext(async () => {
          await interceptor(nuxtApp, context, logger);
        });
      }
      await nuxtApp.callHook("sanctum:response", nuxtApp, context, logger);
    },
    async onRequestError(context) {
      await nuxtApp.callHook("sanctum:error:request", context);
    },
    async onResponseError(context) {
      for (const interceptor of responseErrorInterceptors) {
        await nuxtApp.runWithContext(async () => {
          await interceptor(nuxtApp, context, logger);
        });
      }
      await nuxtApp.callHook("sanctum:error:response", context);
    }
  };
  return $fetch.create(httpOptions);
}
const IDENTITY_LOADED_KEY = "sanctum.user.loaded";
const LOGGER_NAME = "nuxt-auth-sanctum";
function useSanctumLogger(logLevel) {
  const envSuffix = "ssr";
  const loggerName = LOGGER_NAME + ":" + envSuffix;
  return createConsola({ level: logLevel }).withTag(loggerName);
}
async function setupDefaultTokenStorage(nuxtApp, logger) {
  logger.debug(
    "Token storage is not defined, switch to default cookie storage"
  );
  const defaultStorage = await import('./cookieTokenStorage-HBPY8zOC.mjs');
  nuxtApp.runWithContext(() => {
    updateAppConfig({
      sanctum: {
        tokenStorage: defaultStorage.cookieTokenStorage
      }
    });
  });
}
async function initialIdentityLoad(nuxtApp, client, options, logger) {
  const identityFetchedOnInit = useState(
    IDENTITY_LOADED_KEY,
    () => false
  );
  if (identityFetchedOnInit.value) {
    return;
  }
  const user = useSanctumUser();
  if (user.value !== null) {
    return;
  }
  identityFetchedOnInit.value = true;
  logger.debug("Fetching user identity on plugin initialization");
  if (!options.endpoints.user) {
    throw new Error("`sanctum.endpoints.user` is not defined");
  }
  try {
    const response2 = await client.raw(
      options.endpoints.user,
      { ignoreResponseError: true }
    );
    if (response2.ok) {
      user.value = response2._data;
      return await nuxtApp.callHook("sanctum:init");
    }
    if ([401, 419].includes(response2.status)) {
      logger.debug(
        "User is not authenticated on plugin initialization, status:",
        response2.status
      );
    } else {
      logger.error("Unable to load user identity from API", response2.status);
    }
  } catch {
    logger.error("An unexpected error occurred while fetching user identity");
  }
}
const plugin_qFoR2KwrfPbeYF1NbvQtNji8ub5JyA6jqzexZ5yyjV8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt-auth-sanctum",
  async setup(_nuxtApp) {
    let __temp, __restore;
    const nuxtApp = _nuxtApp;
    const options = useSanctumConfig();
    const appConfig = useSanctumAppConfig();
    const logger = useSanctumLogger(options.logLevel);
    const client = createHttpClient(nuxtApp, logger);
    if (options.mode === "token" && !appConfig.tokenStorage) {
      [__temp, __restore] = executeAsync(() => setupDefaultTokenStorage(nuxtApp, logger)), await __temp, __restore();
    }
    if (options.client.initialRequest) {
      nuxtApp.hook(
        "page:loading:start",
        async () => {
          await initialIdentityLoad(nuxtApp, client, options, logger);
        }
      );
    }
    return {
      provide: {
        sanctumClient: client
      }
    };
  }
});
const axios_28vvpcRZL3uB8Q1CVXpivlG8pdyZkl0x1oaZb5ysi8M = /* @__PURE__ */ defineNuxtPlugin(() => {
  const config = /* @__PURE__ */ useRuntimeConfig();
  axios.defaults.baseURL = config.public.apiBase;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8,
  plugin_qFoR2KwrfPbeYF1NbvQtNji8ub5JyA6jqzexZ5yyjV8,
  axios_28vvpcRZL3uB8Q1CVXpivlG8pdyZkl0x1oaZb5ysi8M
];
const useTheme = () => {
  const isDark = useState("isDark", () => false);
  const initTheme = () => {
  };
  const applyTheme = () => {
    (void 0).documentElement.setAttribute("data-theme", isDark.value ? "dark" : "light");
  };
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
    applyTheme();
  };
  return { isDark, toggleTheme, initTheme };
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const config = /* @__PURE__ */ useRuntimeConfig();
    const user = ref(null);
    const mobileMenuOpen = ref(false);
    axios.defaults.baseURL = config.public.apiBase;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    const { isDark } = useTheme();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "fixed top-[-0.2rem] w-full max-w-[144rem] z-50" }, _attrs))} data-v-510a827b><div class="h-[0.2rem] w-full bg-gradient-to-r from-transparent via-gray-400/40 to-transparent" data-v-510a827b></div><div class="h-[5.6rem] flex items-center justify-between backdrop-blur-md px-[4rem] max-[768px]:px-[2rem] header-bar" data-v-510a827b>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "group flex items-center gap-[1rem] no-underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-[2.8rem] h-[2.8rem] rounded-[0.6rem] flex items-center justify-center shadow-[0_0.2rem_0.8rem_rgba(0,0,0,0.2)] transition-transform duration-200 group-hover:scale-95 flex-shrink-0" style="${ssrRenderStyle({ backgroundColor: "var(--primary)" })}" data-v-510a827b${_scopeId}><span class="font-[&#39;Defonte&#39;] text-white text-[1.6rem] leading-none" data-v-510a827b${_scopeId}>C</span></span><span class="font-[&#39;Defonte&#39;] text-[2rem] tracking-wide leading-none max-[768px]:hidden" style="${ssrRenderStyle({ color: "var(--text-main)" })}" data-v-510a827b${_scopeId}> Checker </span>`);
          } else {
            return [
              createVNode("span", {
                class: "w-[2.8rem] h-[2.8rem] rounded-[0.6rem] flex items-center justify-center shadow-[0_0.2rem_0.8rem_rgba(0,0,0,0.2)] transition-transform duration-200 group-hover:scale-95 flex-shrink-0",
                style: { backgroundColor: "var(--primary)" }
              }, [
                createVNode("span", { class: "font-['Defonte'] text-white text-[1.6rem] leading-none" }, "C")
              ]),
              createVNode("span", {
                class: "font-['Defonte'] text-[2rem] tracking-wide leading-none max-[768px]:hidden",
                style: { color: "var(--text-main)" }
              }, " Checker ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="flex items-center gap-[0.4rem] max-[768px]:hidden" data-v-510a827b><button class="theme-btn flex items-center justify-center w-[3.6rem] h-[3.6rem] rounded-[0.8rem] transition-all duration-200 mr-[0.8rem]" data-v-510a827b>`);
      if (unref(isDark)) {
        _push(`<svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-510a827b><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" data-v-510a827b></path></svg>`);
      } else {
        _push(`<svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-510a827b><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" data-v-510a827b></path></svg>`);
      }
      _push(`</button>`);
      if (user.value) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/profile",
          class: "profile-link group flex items-center gap-[1rem] px-[1.4rem] py-[0.7rem] rounded-[0.8rem] transition-all duration-200 no-underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-[2.8rem] h-[2.8rem] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm" style="${ssrRenderStyle({ backgroundColor: "var(--primary)" })}" data-v-510a827b${_scopeId}><span class="text-[1rem] text-white leading-none" data-v-510a827b${_scopeId}>${ssrInterpolate(user.value.first_name?.[0]?.toUpperCase())}</span></div><div class="flex flex-col" data-v-510a827b${_scopeId}><span class="text-[1.1rem] leading-tight" style="${ssrRenderStyle({ color: "var(--text-main)" })}" data-v-510a827b${_scopeId}>${ssrInterpolate(user.value.first_name)}</span><span class="text-[0.9rem] leading-tight tracking-[0.08em]" style="${ssrRenderStyle({ color: "var(--text-muted)" })}" data-v-510a827b${_scopeId}>Profile</span></div>`);
            } else {
              return [
                createVNode("div", {
                  class: "w-[2.8rem] h-[2.8rem] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm",
                  style: { backgroundColor: "var(--primary)" }
                }, [
                  createVNode("span", { class: "text-[1rem] text-white leading-none" }, toDisplayString(user.value.first_name?.[0]?.toUpperCase()), 1)
                ]),
                createVNode("div", { class: "flex flex-col" }, [
                  createVNode("span", {
                    class: "text-[1.1rem] leading-tight",
                    style: { color: "var(--text-main)" }
                  }, toDisplayString(user.value.first_name), 1),
                  createVNode("span", {
                    class: "text-[0.9rem] leading-tight tracking-[0.08em]",
                    style: { color: "var(--text-muted)" }
                  }, "Profile")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="w-px h-[2rem] mx-[0.4rem]" style="${ssrRenderStyle({ backgroundColor: "var(--border-hover)" })}" data-v-510a827b></div><button class="logout-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[0.8rem] rounded-[0.8rem] text-[1.1rem] tracking-[0.05em] transition-all duration-200 cursor-pointer" data-v-510a827b><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-510a827b><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3" data-v-510a827b></path></svg> Logout </button><!--]-->`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "login-link px-[1.6rem] py-[0.8rem] text-[1.1rem] tracking-[0.06em] rounded-[0.8rem] transition-all duration-200 no-underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Login `);
            } else {
              return [
                createTextVNode(" Login ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/register-company",
          class: "register-link relative flex items-center gap-[0.6rem] px-[1.8rem] py-[0.9rem] rounded-[0.8rem] text-[1.1rem] text-white tracking-[0.08em] transition-all duration-200 hover:-translate-y-px active:translate-y-0 overflow-hidden no-underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Register <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-510a827b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" data-v-510a827b${_scopeId}></path></svg><span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-510a827b${_scopeId}></span>`);
            } else {
              return [
                createTextVNode(" Register "),
                (openBlock(), createBlock("svg", {
                  class: "w-[1.2rem] h-[1.2rem]",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  })
                ])),
                createVNode("span", { class: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`</nav><div class="hidden max-[768px]:flex items-center gap-[0.8rem]" data-v-510a827b><button class="theme-btn flex items-center justify-center w-[3.6rem] h-[3.6rem] rounded-[0.8rem] transition-all duration-200" data-v-510a827b>`);
      if (unref(isDark)) {
        _push(`<svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-510a827b><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" data-v-510a827b></path></svg>`);
      } else {
        _push(`<svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-510a827b><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" data-v-510a827b></path></svg>`);
      }
      _push(`</button><button class="theme-btn flex items-center justify-center w-[3.6rem] h-[3.6rem] rounded-[0.8rem] transition-all duration-200" data-v-510a827b>`);
      if (!mobileMenuOpen.value) {
        _push(`<svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-510a827b><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-510a827b></path></svg>`);
      } else {
        _push(`<svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-510a827b><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-510a827b></path></svg>`);
      }
      _push(`</button></div></div>`);
      if (mobileMenuOpen.value) {
        _push(`<div class="mobile-menu flex flex-col gap-[0.8rem] px-[2rem] py-[2rem]" data-v-510a827b>`);
        if (user.value) {
          _push(`<!--[--><div class="flex items-center gap-[1.2rem] px-[1.2rem] py-[1.2rem] mobile-user-card rounded-[1rem] mb-[0.4rem]" data-v-510a827b><div class="w-[3.6rem] h-[3.6rem] rounded-full flex items-center justify-center flex-shrink-0" style="${ssrRenderStyle({ backgroundColor: "var(--primary)" })}" data-v-510a827b><span class="text-[1.4rem] text-white leading-none" data-v-510a827b>${ssrInterpolate(user.value.first_name?.[0]?.toUpperCase())}</span></div><div data-v-510a827b><p class="text-[1.3rem] leading-tight" style="${ssrRenderStyle({ color: "var(--text-main)" })}" data-v-510a827b>${ssrInterpolate(user.value.first_name)} ${ssrInterpolate(user.value.last_name)}</p><p class="text-[1.1rem] leading-tight" style="${ssrRenderStyle({ color: "var(--text-muted)" })}" data-v-510a827b>${ssrInterpolate(user.value.email)}</p></div></div>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/profile",
            onClick: ($event) => mobileMenuOpen.value = false,
            class: "mobile-link flex items-center gap-[1rem] px-[1.4rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] no-underline transition-all duration-150"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-510a827b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" data-v-510a827b${_scopeId}></path></svg> Profile `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    class: "w-[1.6rem] h-[1.6rem]",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "1.5",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    })
                  ])),
                  createTextVNode(" Profile ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<button class="mobile-logout flex items-center gap-[1rem] px-[1.4rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] w-full text-left transition-all duration-150 cursor-pointer" data-v-510a827b><svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-510a827b><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3" data-v-510a827b></path></svg> Logout </button><!--]-->`);
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/auth/login",
            onClick: ($event) => mobileMenuOpen.value = false,
            class: "mobile-link flex items-center gap-[1rem] px-[1.4rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] no-underline transition-all duration-150"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Login `);
              } else {
                return [
                  createTextVNode(" Login ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/auth/register-company",
            onClick: ($event) => mobileMenuOpen.value = false,
            class: "mobile-register flex items-center justify-center gap-[0.8rem] px-[1.4rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white no-underline transition-all duration-150"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Register <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-510a827b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" data-v-510a827b${_scopeId}></path></svg>`);
              } else {
                return [
                  createTextVNode(" Register "),
                  (openBlock(), createBlock("svg", {
                    class: "w-[1.2rem] h-[1.2rem]",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    })
                  ]))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<!--]-->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-510a827b"]]);
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    useTheme();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[144rem] mx-auto pt-[1rem]" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Header, null, null, _parent));
      _push(`<div class="pt-[2.5rem]">`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-D3aNILX3.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-BE84gwIB.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext?._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = (ssrContext) => entry(ssrContext);

export { IDENTITY_LOADED_KEY as I, _export_sfc as _, useCookie as a, __nuxt_component_0$1 as b, useNuxtApp as c, useState as d, entry_default as default, useRoute as e, useTheme as f, defineNuxtRouteMiddleware as g, useSanctumConfig as h, useSanctumAppConfig as i, useSanctumLogger as j, createError as k, useSanctumUser as l, navigateTo as n, useRequestURL as u };
//# sourceMappingURL=server.mjs.map
