import { _ as _export_sfc, b as __nuxt_component_0$1 } from './server.mjs';
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import axios from 'axios';
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
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import 'consola';

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-wrapper min-h-screen flex items-center justify-center p-[4rem] relative overflow-hidden" }, _attrs))} data-v-d1978639><div class="blob blob-1 absolute top-[-8rem] right-[-8rem] w-[50rem] h-[50rem] rounded-full blur-[8rem] pointer-events-none" data-v-d1978639></div><div class="blob blob-2 absolute bottom-[-10rem] left-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-d1978639></div><div class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem]" data-v-d1978639><div class="flex justify-center mb-[3.2rem]" data-v-d1978639><div class="brand-icon w-[5.6rem] h-[5.6rem] rounded-[1.4rem] flex items-center justify-center" data-v-d1978639><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-d1978639><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" data-v-d1978639></path></svg></div></div><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase text-center mb-[0.8rem]" data-v-d1978639>Welcome back</p><h1 class="page-title text-[3rem] leading-tight text-center mb-[3.6rem]" data-v-d1978639>Sign In</h1><div class="flex flex-col gap-[1.4rem]" data-v-d1978639><div class="flex flex-col gap-[0.4rem]" data-v-d1978639><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-d1978639>Email</label><input${ssrRenderAttr("value", email.value)} type="email" placeholder="you@company.com" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-d1978639></div><div class="flex flex-col gap-[0.4rem]" data-v-d1978639><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-d1978639>Password</label><input${ssrRenderAttr("value", password.value)} type="password" placeholder="••••••••" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-d1978639></div>`);
      if (error.value) {
        _push(`<div class="error-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]" data-v-d1978639><span data-v-d1978639>⚠</span> ${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="auth-btn relative flex items-center justify-center gap-[0.8rem] w-full py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 mt-[0.8rem] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" data-v-d1978639>`);
      if (loading.value) {
        _push(`<svg class="w-[1.6rem] h-[1.6rem] animate-spin" fill="none" viewBox="0 0 24 24" data-v-d1978639><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-d1978639></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" data-v-d1978639></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span data-v-d1978639>${ssrInterpolate(loading.value ? "Signing in..." : "Sign In")}</span>`);
      if (!loading.value) {
        _push(`<svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-d1978639><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" data-v-d1978639></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-d1978639></span></button><div class="flex items-center justify-between pt-[0.4rem]" data-v-d1978639>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "auth-link text-[1.2rem]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Have an invite?`);
          } else {
            return [
              createTextVNode("Have an invite?")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register-company",
        class: "auth-link text-[1.2rem]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Create a company`);
          } else {
            return [
              createTextVNode("Create a company")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d1978639"]]);

export { login as default };
//# sourceMappingURL=login-CawmI3Nd.mjs.map
