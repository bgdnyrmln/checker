import { D as executeAsync } from '../nitro/nitro.mjs';
import axios from 'axios';
import { g as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import 'consola';

const guest = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  try {
    ;
    [__temp, __restore] = executeAsync(() => axios.get("/api/user", { withCredentials: true })), await __temp, __restore();
    return navigateTo("/");
  } catch {
  }
});

export { guest as default };
//# sourceMappingURL=guest-BYpLi1Uj.mjs.map
