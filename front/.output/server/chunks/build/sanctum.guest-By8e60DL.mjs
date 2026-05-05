import { u as useSanctumAuth } from './useSanctumAuth-8GsH677p.mjs';
import { g as defineNuxtRouteMiddleware, h as useSanctumConfig, k as createError, n as navigateTo } from './server.mjs';
import 'vue';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import 'consola';
import 'axios';

const sanctum_guest = defineNuxtRouteMiddleware(() => {
  const options = useSanctumConfig();
  const { isAuthenticated } = useSanctumAuth();
  if (!isAuthenticated.value) {
    return;
  }
  const endpoint = options.redirect.onGuestOnly;
  if (endpoint === void 0) {
    throw new Error("`sanctum.redirect.onGuestOnly` is not defined");
  }
  if (endpoint === false) {
    throw createError({ statusCode: 403 });
  }
  return navigateTo(endpoint, { replace: true });
});

export { sanctum_guest as default };
//# sourceMappingURL=sanctum.guest-By8e60DL.mjs.map
