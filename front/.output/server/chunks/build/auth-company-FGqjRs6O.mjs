import { D as executeAsync } from '../nitro/nitro.mjs';
import axios from 'axios';
import { g as defineNuxtRouteMiddleware, n as navigateTo, d as useState } from './server.mjs';
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

const authCompany = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  let user = null;
  let profiles = [];
  try {
    const res = ([__temp, __restore] = executeAsync(() => axios.get("/api/user/profiles", {
      withCredentials: true
    })), __temp = await __temp, __restore(), __temp);
    user = res.data.user;
    profiles = res.data.profiles || [];
  } catch (e) {
    return navigateTo("/");
  }
  if (!user) {
    return navigateTo("/");
  }
  const companyId = to.params.companyId?.toString();
  if (!companyId) return;
  const companyProfile = profiles.find(
    (p) => p.company_id.toString() === companyId
  );
  if (!companyProfile) {
    return navigateTo("/");
  }
  const role = companyProfile.role;
  if (to.meta.requiresManager && role !== "manager") {
    return navigateTo(`/${companyProfile.id}/personal-cabinet`);
  }
  if (to.meta.requiresEmployee && role !== "employee") {
    return navigateTo(`/${companyProfile.id}/personal-cabinet`);
  }
  useState("activeCompany", () => companyProfile);
});

export { authCompany as default };
//# sourceMappingURL=auth-company-FGqjRs6O.mjs.map
