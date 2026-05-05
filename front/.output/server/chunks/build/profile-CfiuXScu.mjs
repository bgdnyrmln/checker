import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import axios from 'axios';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    axios.defaults.withCredentials = true;
    const profile2 = ref(null);
    const loading = ref(false);
    const saving = ref(false);
    const error = ref("");
    const success = ref(false);
    const initials = computed(() => {
      if (!profile2.value) return "?";
      return `${profile2.value.first_name?.[0] || ""}${profile2.value.last_name?.[0] || ""}`.toUpperCase();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen page-wrapper flex items-center justify-center p-[4rem] relative overflow-hidden" }, _attrs))} data-v-f4f45836><div class="blob blob-1 absolute top-[-10rem] right-[-10rem] w-[60rem] h-[60rem] rounded-full blur-[8rem] pointer-events-none" data-v-f4f45836></div><div class="blob blob-2 absolute bottom-[-15rem] left-[-10rem] w-[50rem] h-[50rem] rounded-full blur-[8rem] pointer-events-none" data-v-f4f45836></div><div class="relative z-10 w-full max-w-[52rem]" data-v-f4f45836><div class="flex items-center gap-[2rem] mb-[3rem]" data-v-f4f45836><div class="relative w-[6.4rem] h-[6.4rem] flex-shrink-0" data-v-f4f45836><div class="avatar-inner absolute inset-[0.6rem] rounded-full flex items-center justify-center z-10" data-v-f4f45836><span class="text-[2rem] font-semibold avatar-text tracking-wider" data-v-f4f45836>${ssrInterpolate(initials.value)}</span></div><svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100" data-v-f4f45836><circle cx="50" cy="50" r="46" fill="none" stroke="var(--border-hover)" stroke-width="2" data-v-f4f45836></circle><circle cx="50" cy="50" r="46" fill="none" stroke="url(#ringGrad)" stroke-width="2" stroke-dasharray="289" stroke-dashoffset="80" stroke-linecap="round" class="animate-[spin-ring_3s_ease-in-out_infinite]" data-v-f4f45836></circle><defs data-v-f4f45836><linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%" data-v-f4f45836><stop offset="0%" stop-color="var(--ring-start)" data-v-f4f45836></stop><stop offset="100%" stop-color="var(--ring-end)" data-v-f4f45836></stop></linearGradient></defs></svg></div><div data-v-f4f45836><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.4rem]" data-v-f4f45836>Account Settings</p><h1 class="page-title text-[3.2rem] font-light leading-none tracking-wide" data-v-f4f45836>${ssrInterpolate(profile2.value?.first_name || "Your")} ${ssrInterpolate(profile2.value?.last_name || "Profile")}</h1></div></div><div class="profile-card rounded-[1.6rem] p-[3rem]" data-v-f4f45836>`);
      if (loading.value) {
        _push(`<div class="flex flex-col items-center gap-[1.5rem] py-[3rem]" data-v-f4f45836><div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin" data-v-f4f45836></div><span class="page-label text-[1.1rem] tracking-[0.12em]" data-v-f4f45836>Fetching your data...</span></div>`);
      } else if (profile2.value) {
        _push(`<div class="flex flex-col gap-[2.4rem]" data-v-f4f45836><div class="grid grid-cols-2 gap-[2rem] max-[480px]:grid-cols-1" data-v-f4f45836><div class="flex flex-col gap-[0.8rem]" data-v-f4f45836><label class="page-label text-[1rem] tracking-[0.18em] uppercase" data-v-f4f45836>First Name</label><div class="relative group" data-v-f4f45836><input${ssrRenderAttr("value", profile2.value.first_name)} type="text" placeholder="First name" class="profile-input w-full rounded-[0.8rem] px-[1.6rem] py-[1.2rem] text-[1.3rem] outline-none transition-all duration-200" data-v-f4f45836><div class="input-line absolute bottom-0 left-[10%] right-[10%] h-px opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded-full" data-v-f4f45836></div></div></div><div class="flex flex-col gap-[0.8rem]" data-v-f4f45836><label class="page-label text-[1rem] tracking-[0.18em] uppercase" data-v-f4f45836>Last Name</label><div class="relative group" data-v-f4f45836><input${ssrRenderAttr("value", profile2.value.last_name)} type="text" placeholder="Last name" class="profile-input w-full rounded-[0.8rem] px-[1.6rem] py-[1.2rem] text-[1.3rem] outline-none transition-all duration-200" data-v-f4f45836><div class="input-line absolute bottom-0 left-[10%] right-[10%] h-px opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded-full" data-v-f4f45836></div></div></div></div><div class="flex flex-col gap-[0.8rem]" data-v-f4f45836><label class="page-label text-[1rem] tracking-[0.18em] uppercase" data-v-f4f45836>Email Address</label><div class="relative group" data-v-f4f45836><input${ssrRenderAttr("value", profile2.value.email)} type="email" placeholder="you@example.com" class="profile-input w-full rounded-[0.8rem] px-[1.6rem] py-[1.2rem] text-[1.3rem] outline-none transition-all duration-200" data-v-f4f45836><div class="input-line absolute bottom-0 left-[10%] right-[10%] h-px opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded-full" data-v-f4f45836></div></div></div><div class="flex items-center justify-between gap-[1.6rem] pt-[0.8rem] footer-divider" data-v-f4f45836>`);
        if (error.value) {
          _push(`<div class="flex items-center gap-[0.6rem] text-[1.1rem] error-text" data-v-f4f45836><svg class="w-[1.3rem] h-[1.3rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-f4f45836><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z" data-v-f4f45836></path></svg><span data-v-f4f45836>${ssrInterpolate(error.value)}</span></div>`);
        } else if (success.value) {
          _push(`<div class="flex items-center gap-[0.6rem] text-[1.1rem] success-text" data-v-f4f45836><svg class="w-[1.3rem] h-[1.3rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-f4f45836><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" data-v-f4f45836></path></svg><span data-v-f4f45836>Saved successfully</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="save-btn relative flex items-center gap-[0.8rem] px-[2.4rem] py-[1.2rem] rounded-[0.8rem] text-white text-[1.2rem] tracking-[0.1em] overflow-hidden transition-all duration-200 hover:-translate-y-px active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex-shrink-0 cursor-pointer ml-auto" data-v-f4f45836><span data-v-f4f45836>${ssrInterpolate(saving.value ? "Saving…" : "Save Changes")}</span><span class="transition-transform duration-200" data-v-f4f45836>→</span><span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2.5s_ease-in-out_infinite] pointer-events-none" data-v-f4f45836></span></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-center mt-[1.6rem] text-[1rem] tracking-[0.12em] page-label" data-v-f4f45836> Changes are encrypted and stored securely. </p></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f4f45836"]]);

export { profile as default };
//# sourceMappingURL=profile-CfiuXScu.mjs.map
