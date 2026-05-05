import { _ as __nuxt_component_0 } from './sidebar-C8UFdBSQ.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "sick-leaves",
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
    const sickLeaves2 = ref([]);
    const loading = ref(false);
    const error = ref("");
    const formError = ref("");
    const formSuccess = ref("");
    const selectedFile = ref(null);
    const form = ref({ date_start: "", date_end: "" });
    const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / (1e3 * 60 * 60 * 24)) + 1;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper flex" }, _attrs))} data-v-51215a94>`);
      _push(ssrRenderComponent(_component_Sidebar, { items: sidebarItems }, null, _parent));
      _push(`<main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden" data-v-51215a94><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-51215a94></div><div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none" data-v-51215a94></div><div class="relative z-10 max-w-[96rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[2rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]" data-v-51215a94><div class="mb-[4rem] max-[768px]:mb-[2.4rem]" data-v-51215a94><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]" data-v-51215a94>Personal Cabinet</p><h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide" data-v-51215a94>My Sick Leaves</h1></div><div class="filter-card rounded-[1.6rem] p-[2.8rem] max-[768px]:p-[1.6rem] mb-[2.4rem]" data-v-51215a94><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[2rem]" data-v-51215a94>New Record</p><div class="flex flex-col gap-[1.2rem]" data-v-51215a94><div class="flex flex-wrap items-end gap-[1.2rem]" data-v-51215a94><div class="flex items-end gap-[1rem] flex-1 min-w-0" data-v-51215a94><div class="flex flex-col gap-[0.4rem] flex-1 min-w-0" data-v-51215a94><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-51215a94>Start Date</label><input type="date"${ssrRenderAttr("value", form.value.date_start)} class="date-input w-full rounded-[0.8rem] px-[1.2rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-51215a94></div><div class="arrow-sep text-[1.4rem] mb-[0.9rem] flex-shrink-0" data-v-51215a94>→</div><div class="flex flex-col gap-[0.4rem] flex-1 min-w-0" data-v-51215a94><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-51215a94>End Date</label><input type="date"${ssrRenderAttr("value", form.value.date_end)} class="date-input w-full rounded-[0.8rem] px-[1.2rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-51215a94></div></div></div><div class="flex flex-wrap items-end gap-[1.2rem]" data-v-51215a94><div class="flex flex-col gap-[0.4rem] flex-1 min-w-0" data-v-51215a94><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-51215a94>Medical Document</label><label class="file-label flex items-center gap-[1rem] rounded-[0.8rem] px-[1.4rem] py-[0.9rem] cursor-pointer transition-all duration-200" data-v-51215a94><svg class="w-[1.6rem] h-[1.6rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-51215a94><path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" data-v-51215a94></path></svg><span class="${ssrRenderClass([selectedFile.value ? "file-name-active" : "page-label", "text-[1.2rem] truncate"])}" data-v-51215a94>${ssrInterpolate(selectedFile.value ? selectedFile.value.name : "PDF / JPG / PNG")}</span><input type="file" accept=".pdf,.jpg,.jpeg,.png" class="hidden" data-v-51215a94></label></div><button class="calc-btn relative flex items-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 flex-shrink-0 max-[480px]:w-full max-[480px]:justify-center" data-v-51215a94><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-51215a94><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" data-v-51215a94></path></svg> Submit <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-51215a94></span></button></div></div>`);
      if (formError.value) {
        _push(`<div class="error-bar flex items-center gap-[0.8rem] mt-[1.6rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]" data-v-51215a94><span data-v-51215a94>⚠</span> ${ssrInterpolate(formError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (formSuccess.value) {
        _push(`<div class="success-bar flex items-center gap-[0.8rem] mt-[1.6rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.2rem]" data-v-51215a94><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-51215a94><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-51215a94></path></svg> ${ssrInterpolate(formSuccess.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (loading.value) {
        _push(`<div class="flex items-center gap-[1.6rem] py-[4rem] justify-center" data-v-51215a94><div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin" data-v-51215a94></div><span class="page-label text-[1.2rem] tracking-[0.12em]" data-v-51215a94>Loading sick leaves...</span></div>`);
      } else if (error.value) {
        _push(`<div class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]" data-v-51215a94><span data-v-51215a94>⚠</span> ${ssrInterpolate(error.value)}</div>`);
      } else if (sickLeaves2.value.length) {
        _push(`<div class="table-card rounded-[1.6rem] overflow-hidden" data-v-51215a94><div class="table-summary flex items-center justify-between px-[3rem] max-[768px]:px-[2rem] py-[2rem] flex-wrap gap-[1rem]" data-v-51215a94><div data-v-51215a94><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]" data-v-51215a94>Sick Leave Records</p><p class="table-text text-[1.4rem]" data-v-51215a94>${ssrInterpolate(sickLeaves2.value.length)} total</p></div><div class="doc-count-badge flex items-center gap-[0.6rem] px-[1.2rem] py-[0.4rem] rounded-full" data-v-51215a94><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-51215a94><path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" data-v-51215a94></path></svg><span class="text-[1.1rem]" data-v-51215a94>${ssrInterpolate(sickLeaves2.value.filter((s) => s.has_file).length)} with documents</span></div></div><table class="w-full max-[600px]:hidden" data-v-51215a94><thead data-v-51215a94><tr class="table-head-row" data-v-51215a94><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-51215a94>Start</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-51215a94>End</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-51215a94>Duration</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-51215a94>Document</th><th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-51215a94>Actions</th></tr></thead><tbody data-v-51215a94><!--[-->`);
        ssrRenderList(sickLeaves2.value, (s, i) => {
          _push(`<tr class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "table-row"])}" data-v-51215a94><td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]" data-v-51215a94>${ssrInterpolate(s.date_start)}</td><td class="${ssrRenderClass([s.date_end ? "table-text" : "table-empty", "px-[3rem] py-[1.6rem] text-[1.3rem]"])}" data-v-51215a94>${ssrInterpolate(s.date_end ?? "—")}</td><td class="px-[3rem] py-[1.6rem] text-[1.3rem]" data-v-51215a94>`);
          if (s.date_end) {
            _push(`<span class="table-sub tabular-nums" data-v-51215a94>${ssrInterpolate(daysBetween(s.date_start, s.date_end))} days</span>`);
          } else {
            _push(`<span class="table-empty" data-v-51215a94>—</span>`);
          }
          _push(`</td><td class="px-[3rem] py-[1.6rem]" data-v-51215a94>`);
          if (s.has_file) {
            _push(`<button class="view-btn flex items-center gap-[0.6rem] px-[1.2rem] py-[0.5rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-200" data-v-51215a94><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-51215a94><path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" data-v-51215a94></path></svg> View </button>`);
          } else {
            _push(`<span class="no-file-badge flex items-center gap-[0.5rem] px-[1rem] py-[0.3rem] rounded-full text-[1rem]" data-v-51215a94><svg class="w-[1.1rem] h-[1.1rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-51215a94><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" data-v-51215a94></path></svg> No file </span>`);
          }
          _push(`</td><td class="px-[3rem] py-[1.6rem] text-right" data-v-51215a94><button class="delete-btn flex items-center gap-[0.5rem] ml-auto px-[1.2rem] py-[0.5rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-200" data-v-51215a94><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-51215a94><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-51215a94></path></svg> Delete </button></td></tr>`);
        });
        _push(`<!--]--></tbody></table><div class="hidden max-[600px]:flex flex-col" data-v-51215a94><!--[-->`);
        ssrRenderList(sickLeaves2.value, (s, i) => {
          _push(`<div class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "px-[2rem] py-[1.8rem]"])}" style="${ssrRenderStyle({ "border-bottom": "1px solid var(--border)" })}" data-v-51215a94><div class="flex items-start justify-between mb-[1.2rem]" data-v-51215a94><div data-v-51215a94><p class="table-text text-[1.3rem] tabular-nums" data-v-51215a94>${ssrInterpolate(s.date_start)} `);
          if (s.date_end) {
            _push(`<span class="table-sub" data-v-51215a94> → ${ssrInterpolate(s.date_end)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p>`);
          if (s.date_end) {
            _push(`<p class="table-sub text-[1.1rem] mt-[0.2rem]" data-v-51215a94>${ssrInterpolate(daysBetween(s.date_start, s.date_end))} days </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (s.has_file) {
            _push(`<button class="view-btn flex items-center gap-[0.5rem] px-[1rem] py-[0.4rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-200 flex-shrink-0 ml-[1rem]" data-v-51215a94><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-51215a94><path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" data-v-51215a94></path></svg> View Doc </button>`);
          } else {
            _push(`<span class="no-file-badge flex items-center gap-[0.4rem] px-[1rem] py-[0.4rem] rounded-full text-[1rem] flex-shrink-0 ml-[1rem]" data-v-51215a94> No file </span>`);
          }
          _push(`</div><button class="delete-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.5rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-200" data-v-51215a94><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-51215a94><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-51215a94></path></svg> Delete </button></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (!loading.value) {
        _push(`<div class="flex flex-col items-center justify-center py-[8rem] text-center" data-v-51215a94><div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]" data-v-51215a94><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-51215a94><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" data-v-51215a94></path></svg></div><p class="table-sub text-[1.4rem] tracking-[0.06em]" data-v-51215a94>No sick leave records found.</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[id]/personal-cabinet/sick-leaves.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sickLeaves = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-51215a94"]]);

export { sickLeaves as default };
//# sourceMappingURL=sick-leaves-Dz5p40vy.mjs.map
