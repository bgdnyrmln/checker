import { _ as __nuxt_component_0 } from './sidebar-C8UFdBSQ.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import axios from 'axios';
import { useRoute } from 'vue-router';
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
import 'consola';

const _sfc_main = {
  __name: "company",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const companyId = route.params.companyId;
    axios.defaults.withCredentials = true;
    const sidebarItems = [
      { text: "Home", to: `/${companyId}/manager` },
      { text: "Company", to: `/${companyId}/manager/company` },
      { text: "Team", to: `/${companyId}/manager/team` },
      { text: "Schedule", to: `/${companyId}/manager/schedule` },
      { text: "Attendance", to: `/${companyId}/manager/attendancy` },
      { text: "Payrolls", to: `/${companyId}/manager/payrolls` },
      { text: "Invites", to: `/${companyId}/manager/invite` },
      { text: "Holidays", to: `/${companyId}/manager/holidays` },
      { text: "Sick Leaves", to: `/${companyId}/manager/sick-leaves` }
    ];
    const loading = ref(true);
    const saving = ref(false);
    const success = ref(false);
    const form = ref({ name: "", email: "" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper flex" }, _attrs))} data-v-37ad1d05>`);
      _push(ssrRenderComponent(_component_Sidebar, { items: sidebarItems }, null, _parent));
      _push(`<main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden" data-v-37ad1d05><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-37ad1d05></div><div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none" data-v-37ad1d05></div><div class="relative z-10 max-w-[120rem] mx-auto py-[4rem] px-[4rem]" data-v-37ad1d05><div class="mb-[4rem]" data-v-37ad1d05><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]" data-v-37ad1d05>Manager Panel</p><h1 class="page-title text-[3.6rem] leading-none tracking-wide" data-v-37ad1d05>Company Profile</h1></div>`);
      if (loading.value) {
        _push(`<div class="flex items-center gap-[1.2rem] py-[4rem]" data-v-37ad1d05><div class="spinner w-[2rem] h-[2rem] rounded-full border-[2px] border-transparent" data-v-37ad1d05></div><p class="table-sub text-[1.3rem]" data-v-37ad1d05>Loading company data…</p></div>`);
      } else {
        _push(`<div class="form-card rounded-[1.6rem] p-[3.6rem] max-w-[56rem]" data-v-37ad1d05><div class="flex items-center gap-[1.6rem] mb-[3.2rem] pb-[2.4rem] card-header-border" data-v-37ad1d05><div class="icon-badge w-[4.8rem] h-[4.8rem] rounded-[1.2rem] flex items-center justify-center flex-shrink-0" data-v-37ad1d05><svg class="w-[2.2rem] h-[2.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-37ad1d05><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" data-v-37ad1d05></path></svg></div><div data-v-37ad1d05><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]" data-v-37ad1d05>Settings</p><h2 class="page-title text-[1.8rem] leading-tight" data-v-37ad1d05>Edit Company Details</h2></div></div><div class="space-y-[2.4rem] mb-[3.2rem]" data-v-37ad1d05><div class="field-group" data-v-37ad1d05><label class="page-label text-[1rem] tracking-[0.18em] uppercase block mb-[1rem]" data-v-37ad1d05>Company Name</label><div class="input-wrapper relative" data-v-37ad1d05><div class="input-icon absolute left-[1.4rem] top-1/2 -translate-y-1/2 pointer-events-none" data-v-37ad1d05><svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-37ad1d05><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" data-v-37ad1d05></path></svg></div><input${ssrRenderAttr("value", form.value.name)} type="text" placeholder="Enter company name" class="field-input w-full pl-[4.4rem] pr-[1.6rem] py-[1.3rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200" data-v-37ad1d05></div></div><div class="field-group" data-v-37ad1d05><label class="page-label text-[1rem] tracking-[0.18em] uppercase block mb-[1rem]" data-v-37ad1d05>Company Email</label><div class="input-wrapper relative" data-v-37ad1d05><div class="input-icon absolute left-[1.4rem] top-1/2 -translate-y-1/2 pointer-events-none" data-v-37ad1d05><svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-37ad1d05><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" data-v-37ad1d05></path></svg></div><input${ssrRenderAttr("value", form.value.email)} type="email" placeholder="Enter company email" class="field-input w-full pl-[4.4rem] pr-[1.6rem] py-[1.3rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200" data-v-37ad1d05></div></div></div><div class="flex items-center gap-[1.6rem] pt-[2.4rem] card-header-border-top" data-v-37ad1d05><button${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="save-btn flex items-center gap-[0.8rem] px-[2.4rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed" data-v-37ad1d05>`);
        if (!saving.value) {
          _push(`<svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-37ad1d05><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-37ad1d05></path></svg>`);
        } else {
          _push(`<div class="spinner-sm w-[1.4rem] h-[1.4rem] rounded-full border-[2px] border-transparent border-t-white" data-v-37ad1d05></div>`);
        }
        _push(` ${ssrInterpolate(saving.value ? "Saving…" : "Save Changes")}</button>`);
        if (success.value) {
          _push(`<div class="success-pill flex items-center gap-[0.6rem] px-[1.4rem] py-[0.8rem] rounded-full text-[1.2rem]" data-v-37ad1d05><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-37ad1d05><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" data-v-37ad1d05></path></svg> Updated successfully </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[companyId]/manager/company.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const company = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-37ad1d05"]]);

export { company as default };
//# sourceMappingURL=company-Cu5Ab_Ui.mjs.map
