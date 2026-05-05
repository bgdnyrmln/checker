import { _ as _export_sfc, d as useState, e as useRoute, b as __nuxt_component_0$1 } from './server.mjs';
import { ref, mergeProps, withCtx, createTextVNode, unref, createBlock, openBlock, createVNode, useSSRContext } from 'vue';
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
  __name: "connect",
  __ssrInlineRender: true,
  setup(__props) {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    const user = useState("user", () => null);
    const route = useRoute();
    const tokenInput = ref("");
    const inviteToken = ref(route.query.token || null);
    const pageAllowed = ref(false);
    const companyName = ref("");
    const loading = ref(false);
    const error = ref("");
    const success = ref("");
    const alreadyConnected = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-wrapper min-h-screen flex items-center justify-center p-[4rem] relative overflow-hidden" }, _attrs))} data-v-233ba38f><div class="blob blob-1 absolute top-[-8rem] right-[-8rem] w-[50rem] h-[50rem] rounded-full blur-[8rem] pointer-events-none" data-v-233ba38f></div><div class="blob blob-2 absolute bottom-[-10rem] left-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-233ba38f></div>`);
      if (inviteToken.value == null) {
        _push(`<div class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem]" data-v-233ba38f><div class="flex justify-center mb-[3.2rem]" data-v-233ba38f><div class="brand-icon w-[5.6rem] h-[5.6rem] rounded-[1.4rem] flex items-center justify-center" data-v-233ba38f><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-233ba38f><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" data-v-233ba38f></path></svg></div></div><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase text-center mb-[0.8rem]" data-v-233ba38f>Join a Company</p><h1 class="page-title text-[3rem] leading-tight text-center mb-[0.8rem]" data-v-233ba38f>Enter Invite Token</h1><p class="page-sub text-[1.3rem] text-center mb-[3.2rem]" data-v-233ba38f>Paste the token from your invitation email to continue.</p><div class="flex flex-col gap-[1.2rem]" data-v-233ba38f><div class="flex flex-col gap-[0.4rem]" data-v-233ba38f><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-233ba38f>Invite Token</label><input${ssrRenderAttr("value", tokenInput.value)} placeholder="Paste your token here..." class="form-input rounded-[0.8rem] px-[1.6rem] py-[1.1rem] text-[1.3rem] outline-none transition-all duration-200" data-v-233ba38f></div>`);
        if (error.value) {
          _push(`<div class="error-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]" data-v-233ba38f><span data-v-233ba38f>⚠</span> ${ssrInterpolate(error.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="auth-btn relative flex items-center justify-center gap-[0.8rem] w-full py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" data-v-233ba38f>`);
        if (loading.value) {
          _push(`<svg class="w-[1.6rem] h-[1.6rem] animate-spin" fill="none" viewBox="0 0 24 24" data-v-233ba38f><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-233ba38f></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" data-v-233ba38f></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-233ba38f>${ssrInterpolate(loading.value ? "Checking..." : "Continue")}</span>`);
        if (!loading.value) {
          _push(`<svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-233ba38f><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" data-v-233ba38f></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-233ba38f></span></button><p class="page-sub text-[1.1rem] text-center" data-v-233ba38f> Need a company account instead? `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/register-company",
          class: "auth-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Register here`);
            } else {
              return [
                createTextVNode("Register here")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p></div></div>`);
      } else if (pageAllowed.value && unref(user)) {
        _push(`<div class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem] text-center" data-v-233ba38f><div class="flex justify-center mb-[3.2rem]" data-v-233ba38f><div class="confirm-icon w-[5.6rem] h-[5.6rem] rounded-full flex items-center justify-center" data-v-233ba38f><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-233ba38f><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" data-v-233ba38f></path></svg></div></div><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.8rem]" data-v-233ba38f>Token Verified</p><h2 class="page-title text-[2.8rem] leading-tight mb-[0.8rem]" data-v-233ba38f>Connect to Company</h2><p class="page-sub text-[1.3rem] mb-[0.8rem]" data-v-233ba38f>You&#39;re about to join</p><p class="company-name text-[2.2rem] mb-[3.2rem]" data-v-233ba38f>${ssrInterpolate(companyName.value)}</p><div class="user-pill inline-flex items-center gap-[1rem] px-[1.6rem] py-[0.8rem] rounded-full mb-[3.2rem]" data-v-233ba38f><div class="avatar-sm w-[2.8rem] h-[2.8rem] rounded-full flex items-center justify-center text-[1.1rem] text-white" data-v-233ba38f>${ssrInterpolate(unref(user).first_name?.[0]?.toUpperCase())}</div><span class="page-sub text-[1.2rem]" data-v-233ba38f>${ssrInterpolate(unref(user).first_name)} ${ssrInterpolate(unref(user).last_name)}</span><span class="page-label text-[1.1rem]" data-v-233ba38f>· ${ssrInterpolate(unref(user).email)}</span></div>`);
        if (error.value) {
          _push(`<div class="error-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] mb-[2rem]" data-v-233ba38f><span data-v-233ba38f>⚠</span> ${ssrInterpolate(error.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-center justify-center gap-[1.2rem]" data-v-233ba38f><button class="cancel-btn px-[2.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200" data-v-233ba38f> Cancel </button><button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="auth-btn relative flex items-center justify-center gap-[0.8rem] px-[2.8rem] py-[1rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" data-v-233ba38f>`);
        if (loading.value) {
          _push(`<svg class="w-[1.6rem] h-[1.6rem] animate-spin" fill="none" viewBox="0 0 24 24" data-v-233ba38f><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-233ba38f></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" data-v-233ba38f></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-233ba38f>${ssrInterpolate(loading.value ? "Connecting..." : "Yes, Connect")}</span><span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-233ba38f></span></button></div></div>`);
      } else if (success.value) {
        _push(`<div class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem] text-center" data-v-233ba38f><div class="success-icon w-[6.4rem] h-[6.4rem] rounded-full flex items-center justify-center mx-auto mb-[2.4rem]" data-v-233ba38f><svg class="w-[3rem] h-[3rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-233ba38f><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-233ba38f></path></svg></div><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.8rem]" data-v-233ba38f>All Done</p><h2 class="page-title text-[2.8rem] mb-[0.8rem]" data-v-233ba38f>You&#39;re Connected!</h2><p class="page-sub text-[1.4rem] mb-[0.4rem]" data-v-233ba38f>Successfully joined</p><p class="company-name text-[2rem] mb-[3.2rem]" data-v-233ba38f>${ssrInterpolate(success.value)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "auth-btn inline-flex items-center gap-[0.8rem] px-[2.8rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] no-underline hover:-translate-y-px transition-all duration-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Go to Dashboard <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-233ba38f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" data-v-233ba38f${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(" Go to Dashboard "),
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
      } else if (alreadyConnected.value) {
        _push(`<div class="auth-card relative z-10 w-full max-w-[44rem] rounded-[2rem] p-[4.8rem] text-center" data-v-233ba38f><div class="confirm-icon w-[5.6rem] h-[5.6rem] rounded-full flex items-center justify-center mx-auto mb-[3.2rem]" data-v-233ba38f><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-233ba38f><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" data-v-233ba38f></path></svg></div><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.8rem]" data-v-233ba38f>Already a Member</p><h2 class="page-title text-[2.8rem] leading-tight mb-[0.8rem]" data-v-233ba38f>You&#39;re already connected</h2><p class="page-sub text-[1.3rem] mb-[0.4rem]" data-v-233ba38f>Your account is already linked to</p><p class="company-name text-[2.2rem] mb-[3.2rem]" data-v-233ba38f>${ssrInterpolate(companyName.value)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "auth-btn inline-flex items-center gap-[0.8rem] px-[2.8rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] no-underline hover:-translate-y-px transition-all duration-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Go to Dashboard <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-233ba38f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" data-v-233ba38f${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(" Go to Dashboard "),
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
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/connect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const connect = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-233ba38f"]]);

export { connect as default };
//# sourceMappingURL=connect-BsVehDeQ.mjs.map
