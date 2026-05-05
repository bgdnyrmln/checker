import { _ as _export_sfc, b as __nuxt_component_0$1 } from './server.mjs';
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import axios from 'axios';
import { useRoute } from 'vue-router';
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
import 'consola';

const _sfc_main = {
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    const route = useRoute();
    const inviteToken = ref(route.query.token || "");
    const tokenInput = ref("");
    const pageAllowed = ref(false);
    const loading = ref(false);
    const error = ref("");
    const success = ref("");
    const form = ref({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      token: inviteToken.value
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-wrapper min-h-screen flex items-center justify-center p-[4rem] relative overflow-hidden" }, _attrs))} data-v-caffecaa><div class="blob blob-1 absolute top-[-8rem] right-[-8rem] w-[50rem] h-[50rem] rounded-full blur-[8rem] pointer-events-none" data-v-caffecaa></div><div class="blob blob-2 absolute bottom-[-10rem] left-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-caffecaa></div>`);
      if (!pageAllowed.value) {
        _push(`<div class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem]" data-v-caffecaa><div class="flex justify-center mb-[3.2rem]" data-v-caffecaa><div class="brand-icon w-[5.6rem] h-[5.6rem] rounded-[1.4rem] flex items-center justify-center" data-v-caffecaa><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-caffecaa><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" data-v-caffecaa></path></svg></div></div><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase text-center mb-[0.8rem]" data-v-caffecaa>Employee Onboarding</p><h1 class="page-title text-[3rem] leading-tight text-center mb-[0.8rem]" data-v-caffecaa>Enter Invite Token</h1><p class="page-sub text-[1.3rem] text-center mb-[3.2rem]" data-v-caffecaa>Paste the token from your invitation email to continue.</p><div class="flex flex-col gap-[1.2rem]" data-v-caffecaa><div class="flex flex-col gap-[0.4rem]" data-v-caffecaa><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-caffecaa>Invite Token</label><input${ssrRenderAttr("value", tokenInput.value)} placeholder="e.g. eyJhbGciOiJIUzI1NiIs..." class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-caffecaa></div>`);
        if (error.value) {
          _push(`<div class="error-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]" data-v-caffecaa><span data-v-caffecaa>⚠</span> ${ssrInterpolate(error.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="auth-btn relative flex items-center justify-center gap-[0.8rem] w-full py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" data-v-caffecaa>`);
        if (loading.value) {
          _push(`<svg class="w-[1.6rem] h-[1.6rem] animate-spin" fill="none" viewBox="0 0 24 24" data-v-caffecaa><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-caffecaa></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" data-v-caffecaa></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-caffecaa>${ssrInterpolate(loading.value ? "Checking..." : "Continue")}</span>`);
        if (!loading.value) {
          _push(`<svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-caffecaa><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" data-v-caffecaa></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-caffecaa></span></button></div></div>`);
      } else {
        _push(`<div class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem]" data-v-caffecaa><div class="token-ok flex items-center gap-[0.8rem] px-[1.4rem] py-[0.8rem] rounded-full mb-[3.2rem] w-fit mx-auto" data-v-caffecaa><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-caffecaa><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-caffecaa></path></svg><span class="text-[1.1rem] tracking-[0.08em]" data-v-caffecaa>Invite verified</span></div><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase text-center mb-[0.8rem]" data-v-caffecaa>Employee Onboarding</p><h1 class="page-title text-[3rem] leading-tight text-center mb-[3.2rem]" data-v-caffecaa>Create Your Account</h1><div class="flex flex-col gap-[1.4rem]" data-v-caffecaa><div class="grid grid-cols-2 gap-[1.2rem]" data-v-caffecaa><div class="flex flex-col gap-[0.4rem]" data-v-caffecaa><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-caffecaa>First Name</label><input${ssrRenderAttr("value", form.value.first_name)} placeholder="John" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-caffecaa></div><div class="flex flex-col gap-[0.4rem]" data-v-caffecaa><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-caffecaa>Last Name</label><input${ssrRenderAttr("value", form.value.last_name)} placeholder="Doe" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-caffecaa></div></div><div class="flex flex-col gap-[0.4rem]" data-v-caffecaa><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-caffecaa>Email</label><input${ssrRenderAttr("value", form.value.email)} type="email" placeholder="john@company.com" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-caffecaa></div><div class="divider-line h-px" data-v-caffecaa></div><div class="flex flex-col gap-[0.4rem]" data-v-caffecaa><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-caffecaa>Password</label><input${ssrRenderAttr("value", form.value.password)} type="password" placeholder="••••••••" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-caffecaa></div><div class="flex flex-col gap-[0.4rem]" data-v-caffecaa><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-caffecaa>Confirm Password</label><input${ssrRenderAttr("value", form.value.password_confirmation)} type="password" placeholder="••••••••" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-caffecaa></div>`);
        if (error.value) {
          _push(`<div class="error-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]" data-v-caffecaa><span data-v-caffecaa>⚠</span> ${ssrInterpolate(error.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (success.value) {
          _push(`<div class="success-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]" data-v-caffecaa><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-caffecaa><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-caffecaa></path></svg> ${ssrInterpolate(success.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="auth-btn relative flex items-center justify-center gap-[0.8rem] w-full py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 mt-[0.4rem] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" data-v-caffecaa>`);
        if (loading.value) {
          _push(`<svg class="w-[1.6rem] h-[1.6rem] animate-spin" fill="none" viewBox="0 0 24 24" data-v-caffecaa><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-caffecaa></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" data-v-caffecaa></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-caffecaa>${ssrInterpolate(loading.value ? "Creating account..." : "Create Account")}</span><span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-caffecaa></span></button><p class="page-sub text-[1.1rem] text-center" data-v-caffecaa> Already have an account? `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "auth-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Sign in`);
            } else {
              return [
                createTextVNode("Sign in")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-caffecaa"]]);

export { register as default };
//# sourceMappingURL=register-CfN251Fi.mjs.map
