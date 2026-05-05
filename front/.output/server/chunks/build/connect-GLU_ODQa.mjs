import { D as executeAsync } from '../nitro/nitro.mjs';
import axios from 'axios';
import { g as defineNuxtRouteMiddleware, e as useRoute, n as navigateTo } from './server.mjs';
import { ref } from 'vue';
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

const connect = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  try {
    const route = useRoute();
    const inviteToken = ref(route.query.token || "");
    [__temp, __restore] = executeAsync(() => axios.get(`/api/user`, { withCredentials: true })), await __temp, __restore();
    if (inviteToken.value) {
      return navigateTo("/auth/connect?token=" + inviteToken.value);
    } else {
      return navigateTo("/auth/connect");
    }
  } catch {
  }
});

export { connect as default };
//# sourceMappingURL=connect-GLU_ODQa.mjs.map
