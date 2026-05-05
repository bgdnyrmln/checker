import { _ as __nuxt_component_0 } from './sidebar-C8UFdBSQ.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
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
import 'consola';

const _sfc_main = {
  __name: "holidays",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const profileId = route.params.id;
    const sidebarItems = [
      { text: "Dashboard", to: `/${profileId}/personal-cabinet` },
      { text: "Attendance", to: `/${profileId}/personal-cabinet/attendance` },
      { text: "Payroll", to: `/${profileId}/personal-cabinet/payroll` },
      { text: "Schedule", to: `/${profileId}/personal-cabinet/schedule` },
      { text: "Holidays", to: `/${profileId}/personal-cabinet/holidays` },
      { text: "Sick Leaves", to: `/${profileId}/personal-cabinet/sick-leaves` }
    ];
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    const holidays2 = ref([]);
    const loading = ref(false);
    const error = ref("");
    const formError = ref("");
    const formSuccess = ref("");
    const form = ref({ content: "", date_start: "", date_end: "" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper flex" }, _attrs))} data-v-a353bc03>`);
      _push(ssrRenderComponent(_component_Sidebar, { items: sidebarItems }, null, _parent));
      _push(`<main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden" data-v-a353bc03><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-a353bc03></div><div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none" data-v-a353bc03></div><div class="relative z-10 max-w-[96rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[2rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]" data-v-a353bc03><div class="mb-[4rem] max-[768px]:mb-[2.4rem]" data-v-a353bc03><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]" data-v-a353bc03>Personal Cabinet</p><h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide" data-v-a353bc03>My Holidays</h1></div><div class="filter-card rounded-[1.6rem] p-[2.8rem] max-[768px]:p-[1.6rem] mb-[2.4rem]" data-v-a353bc03><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[2rem]" data-v-a353bc03>New Request</p><div class="flex flex-col gap-[1.2rem]" data-v-a353bc03><div class="flex flex-col gap-[0.4rem]" data-v-a353bc03><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-a353bc03>Reason</label><input${ssrRenderAttr("value", form.value.content)} type="text" placeholder="Reason for holiday..." class="form-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-a353bc03></div><div class="flex flex-wrap items-end gap-[1.2rem]" data-v-a353bc03><div class="flex items-end gap-[1rem] flex-1 min-w-0" data-v-a353bc03><div class="flex flex-col gap-[0.4rem] flex-1 min-w-0" data-v-a353bc03><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-a353bc03>Start Date</label><input type="date"${ssrRenderAttr("value", form.value.date_start)} class="date-input w-full rounded-[0.8rem] px-[1.2rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-a353bc03></div><div class="arrow-sep text-[1.4rem] mb-[0.9rem] flex-shrink-0" data-v-a353bc03>→</div><div class="flex flex-col gap-[0.4rem] flex-1 min-w-0" data-v-a353bc03><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-a353bc03>End Date</label><input type="date"${ssrRenderAttr("value", form.value.date_end)} class="date-input w-full rounded-[0.8rem] px-[1.2rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-a353bc03></div></div><button class="calc-btn relative flex items-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 flex-shrink-0 max-[480px]:w-full max-[480px]:justify-center" data-v-a353bc03><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-a353bc03><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" data-v-a353bc03></path></svg> Submit Request <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-a353bc03></span></button></div></div>`);
      if (formError.value) {
        _push(`<div class="error-bar flex items-center gap-[0.8rem] mt-[1.6rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]" data-v-a353bc03><span data-v-a353bc03>⚠</span> ${ssrInterpolate(formError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (formSuccess.value) {
        _push(`<div class="success-bar flex items-center gap-[0.8rem] mt-[1.6rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]" data-v-a353bc03><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-a353bc03><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-a353bc03></path></svg> ${ssrInterpolate(formSuccess.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (loading.value) {
        _push(`<div class="flex items-center gap-[1.6rem] py-[4rem] justify-center" data-v-a353bc03><div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin" data-v-a353bc03></div><span class="page-label text-[1.2rem] tracking-[0.12em]" data-v-a353bc03>Loading holidays...</span></div>`);
      } else if (error.value) {
        _push(`<div class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]" data-v-a353bc03><span data-v-a353bc03>⚠</span> ${ssrInterpolate(error.value)}</div>`);
      } else if (holidays2.value.length) {
        _push(`<div class="table-card rounded-[1.6rem] overflow-hidden" data-v-a353bc03><div class="table-summary flex items-center justify-between px-[3rem] max-[768px]:px-[2rem] py-[2rem] flex-wrap gap-[1rem]" data-v-a353bc03><div data-v-a353bc03><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]" data-v-a353bc03>Holiday Requests</p><p class="table-text text-[1.4rem]" data-v-a353bc03>${ssrInterpolate(holidays2.value.length)} total</p></div><div class="flex items-center gap-[1.2rem]" data-v-a353bc03><div class="flex items-center gap-[0.6rem]" data-v-a353bc03><span class="w-[0.8rem] h-[0.8rem] rounded-full bg-green-400" data-v-a353bc03></span><span class="page-label text-[1.1rem]" data-v-a353bc03>${ssrInterpolate(holidays2.value.filter((h) => h.is_approved).length)} approved</span></div><div class="flex items-center gap-[0.6rem]" data-v-a353bc03><span class="w-[0.8rem] h-[0.8rem] rounded-full bg-amber-400" data-v-a353bc03></span><span class="page-label text-[1.1rem]" data-v-a353bc03>${ssrInterpolate(holidays2.value.filter((h) => !h.is_approved).length)} pending</span></div></div></div><table class="w-full max-[600px]:hidden" data-v-a353bc03><thead data-v-a353bc03><tr class="table-head-row" data-v-a353bc03><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-a353bc03>Start</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-a353bc03>End</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-a353bc03>Reason</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-a353bc03>Status</th><th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-a353bc03>Actions</th></tr></thead><tbody data-v-a353bc03><!--[-->`);
        ssrRenderList(holidays2.value, (h, i) => {
          _push(`<tr class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "table-row"])}" data-v-a353bc03><td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]" data-v-a353bc03>${ssrInterpolate(h.date_start)}</td><td class="${ssrRenderClass([h.date_end ? "table-text" : "table-empty", "px-[3rem] py-[1.6rem] text-[1.3rem]"])}" data-v-a353bc03>${ssrInterpolate(h.date_end ?? "—")}</td><td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]" data-v-a353bc03>${ssrInterpolate(h.content)}</td><td class="px-[3rem] py-[1.6rem]" data-v-a353bc03><span class="${ssrRenderClass([h.is_approved ? "badge-approved" : "badge-pending", "inline-flex items-center gap-[0.5rem] px-[1rem] py-[0.3rem] rounded-full text-[1rem] tracking-[0.06em]"])}" data-v-a353bc03><span class="${ssrRenderClass([h.is_approved ? "dot-approved" : "dot-pending", "w-[0.5rem] h-[0.5rem] rounded-full"])}" data-v-a353bc03></span> ${ssrInterpolate(h.is_approved ? "Approved" : "Pending")}</span></td><td class="px-[3rem] py-[1.6rem] text-right" data-v-a353bc03>`);
          if (!h.is_approved) {
            _push(`<button class="delete-btn flex items-center gap-[0.5rem] ml-auto px-[1.2rem] py-[0.5rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-200" data-v-a353bc03><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-a353bc03><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-a353bc03></path></svg> Delete </button>`);
          } else {
            _push(`<span class="table-empty text-[1.2rem]" data-v-a353bc03>—</span>`);
          }
          _push(`</td></tr>`);
        });
        _push(`<!--]--></tbody></table><div class="hidden max-[600px]:flex flex-col" data-v-a353bc03><!--[-->`);
        ssrRenderList(holidays2.value, (h, i) => {
          _push(`<div class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "px-[2rem] py-[1.8rem]"])}" style="${ssrRenderStyle({ "border-bottom": "1px solid var(--border)" })}" data-v-a353bc03><div class="flex items-start justify-between mb-[1rem]" data-v-a353bc03><div data-v-a353bc03><p class="table-text text-[1.3rem] tabular-nums" data-v-a353bc03>${ssrInterpolate(h.date_start)} `);
          if (h.date_end) {
            _push(`<span class="table-sub" data-v-a353bc03> → ${ssrInterpolate(h.date_end)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p><p class="table-sub text-[1.1rem] mt-[0.2rem]" data-v-a353bc03>${ssrInterpolate(h.content)}</p></div><span class="${ssrRenderClass([h.is_approved ? "badge-approved" : "badge-pending", "inline-flex items-center gap-[0.5rem] px-[1rem] py-[0.3rem] rounded-full text-[1rem] tracking-[0.06em] flex-shrink-0 ml-[1rem]"])}" data-v-a353bc03><span class="${ssrRenderClass([h.is_approved ? "dot-approved" : "dot-pending", "w-[0.5rem] h-[0.5rem] rounded-full"])}" data-v-a353bc03></span> ${ssrInterpolate(h.is_approved ? "Approved" : "Pending")}</span></div>`);
          if (!h.is_approved) {
            _push(`<button class="delete-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.5rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-200" data-v-a353bc03><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-a353bc03><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-a353bc03></path></svg> Delete </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (!loading.value) {
        _push(`<div class="flex flex-col items-center justify-center py-[8rem] text-center" data-v-a353bc03><div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]" data-v-a353bc03><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-a353bc03><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" data-v-a353bc03></path></svg></div><p class="table-sub text-[1.4rem] tracking-[0.06em]" data-v-a353bc03>No holiday requests found.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[id]/personal-cabinet/holidays.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const holidays = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a353bc03"]]);

export { holidays as default };
//# sourceMappingURL=holidays-zbrd8o5F.mjs.map
