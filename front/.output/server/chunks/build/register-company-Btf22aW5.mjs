import { _ as _export_sfc, b as __nuxt_component_0$1 } from './server.mjs';
import { ref, mergeProps, withCtx, createTextVNode, createBlock, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "register-company",
  __ssrInlineRender: true,
  setup(__props) {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    const form = ref({
      company_name: "",
      company_email: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
    const loading = ref(false);
    const error = ref("");
    const success = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-wrapper min-h-screen flex items-center justify-center p-[4rem] relative overflow-hidden" }, _attrs))} data-v-b85bf58d><div class="blob blob-1 absolute top-[-8rem] right-[-8rem] w-[50rem] h-[50rem] rounded-full blur-[8rem] pointer-events-none" data-v-b85bf58d></div><div class="blob blob-2 absolute bottom-[-10rem] left-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-b85bf58d></div>`);
      if (success.value) {
        _push(`<div class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem] text-center" data-v-b85bf58d><div class="success-icon w-[6.4rem] h-[6.4rem] rounded-full flex items-center justify-center mx-auto mb-[2.4rem]" data-v-b85bf58d><svg class="w-[3rem] h-[3rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-b85bf58d><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-b85bf58d></path></svg></div><h2 class="page-title text-[2.8rem] mb-[1.2rem]" data-v-b85bf58d>Company Registered!</h2><p class="page-sub text-[1.4rem] mb-[3.2rem]" data-v-b85bf58d>Your company and admin account have been created. You can now sign in.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "auth-btn inline-flex items-center gap-[0.8rem] px-[2.8rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] no-underline hover:-translate-y-px transition-all duration-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Go to Login <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-b85bf58d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" data-v-b85bf58d${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(" Go to Login "),
                (openBlock(), createBlock("svg", {
                  class: "w-[1.4rem] h-[1.4rem]",
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
        _push(`</div>`);
      } else {
        _push(`<div class="auth-card relative z-10 w-full max-w-[52rem] rounded-[2rem] p-[4.8rem]" data-v-b85bf58d><div class="flex justify-center mb-[3.2rem]" data-v-b85bf58d><div class="brand-icon w-[5.6rem] h-[5.6rem] rounded-[1.4rem] flex items-center justify-center" data-v-b85bf58d><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-b85bf58d><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" data-v-b85bf58d></path></svg></div></div><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase text-center mb-[0.8rem]" data-v-b85bf58d>Get Started</p><h1 class="page-title text-[3rem] leading-tight text-center mb-[3.6rem]" data-v-b85bf58d>Register Your Company</h1><div class="flex flex-col gap-[2.8rem]" data-v-b85bf58d><div class="flex flex-col gap-[1.4rem]" data-v-b85bf58d><div class="flex items-center gap-[1rem] mb-[0.4rem]" data-v-b85bf58d><span class="section-dot w-[0.6rem] h-[0.6rem] rounded-full" data-v-b85bf58d></span><p class="page-label text-[1rem] tracking-[0.18em] uppercase" data-v-b85bf58d>Company Info</p></div><div class="flex flex-col gap-[0.4rem]" data-v-b85bf58d><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-b85bf58d>Company Name</label><input${ssrRenderAttr("value", form.value.company_name)} placeholder="Acme Corp" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-b85bf58d></div><div class="flex flex-col gap-[0.4rem]" data-v-b85bf58d><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-b85bf58d>Company Email</label><input${ssrRenderAttr("value", form.value.company_email)} type="email" placeholder="hello@acme.com" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-b85bf58d></div></div><div class="divider-line h-px" data-v-b85bf58d></div><div class="flex flex-col gap-[1.4rem]" data-v-b85bf58d><div class="flex items-center gap-[1rem] mb-[0.4rem]" data-v-b85bf58d><span class="section-dot w-[0.6rem] h-[0.6rem] rounded-full" data-v-b85bf58d></span><p class="page-label text-[1rem] tracking-[0.18em] uppercase" data-v-b85bf58d>Admin Account</p></div><div class="grid grid-cols-2 gap-[1.2rem]" data-v-b85bf58d><div class="flex flex-col gap-[0.4rem]" data-v-b85bf58d><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-b85bf58d>First Name</label><input${ssrRenderAttr("value", form.value.first_name)} placeholder="John" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-b85bf58d></div><div class="flex flex-col gap-[0.4rem]" data-v-b85bf58d><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-b85bf58d>Last Name</label><input${ssrRenderAttr("value", form.value.last_name)} placeholder="Doe" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-b85bf58d></div></div><div class="flex flex-col gap-[0.4rem]" data-v-b85bf58d><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-b85bf58d>Admin Email</label><input${ssrRenderAttr("value", form.value.email)} type="email" placeholder="admin@acme.com" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-b85bf58d></div><div class="grid grid-cols-2 gap-[1.2rem]" data-v-b85bf58d><div class="flex flex-col gap-[0.4rem]" data-v-b85bf58d><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-b85bf58d>Password</label><input${ssrRenderAttr("value", form.value.password)} type="password" placeholder="••••••••" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-b85bf58d></div><div class="flex flex-col gap-[0.4rem]" data-v-b85bf58d><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-b85bf58d>Confirm</label><input${ssrRenderAttr("value", form.value.password_confirmation)} type="password" placeholder="••••••••" class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-b85bf58d></div></div></div>`);
        if (error.value) {
          _push(`<div class="error-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]" data-v-b85bf58d><span data-v-b85bf58d>⚠</span> ${ssrInterpolate(error.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="auth-btn relative flex items-center justify-center gap-[0.8rem] w-full py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" data-v-b85bf58d>`);
        if (loading.value) {
          _push(`<svg class="w-[1.6rem] h-[1.6rem] animate-spin" fill="none" viewBox="0 0 24 24" data-v-b85bf58d><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-b85bf58d></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" data-v-b85bf58d></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-b85bf58d>${ssrInterpolate(loading.value ? "Registering..." : "Register Company")}</span><span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-b85bf58d></span></button><div class="flex items-center justify-between pt-[0.4rem]" data-v-b85bf58d>`);
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
          to: "/auth/login",
          class: "auth-link text-[1.2rem]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Already have an account?`);
            } else {
              return [
                createTextVNode("Already have an account?")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/register-company.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const registerCompany = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b85bf58d"]]);

export { registerCompany as default };
//# sourceMappingURL=register-company-Btf22aW5.mjs.map
