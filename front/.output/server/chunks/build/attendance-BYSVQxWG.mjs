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
  __name: "attendance",
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
    const today = /* @__PURE__ */ new Date();
    const formatDate = (d) => d.toISOString().slice(0, 10);
    const startDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth(), 2)));
    const endDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)));
    const attendance2 = ref(null);
    const loading = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper flex" }, _attrs))} data-v-fec6b902>`);
      _push(ssrRenderComponent(_component_Sidebar, { items: sidebarItems }, null, _parent));
      _push(`<main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden" data-v-fec6b902><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-fec6b902></div><div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none" data-v-fec6b902></div><div class="relative z-10 max-w-[96rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[2rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]" data-v-fec6b902><div class="mb-[4rem] max-[768px]:mb-[2.4rem]" data-v-fec6b902><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]" data-v-fec6b902>Personal Cabinet</p><h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide" data-v-fec6b902>My Attendance</h1></div><div class="filter-card rounded-[1.6rem] p-[2.4rem] max-[768px]:p-[1.6rem] mb-[2.4rem]" data-v-fec6b902><div class="flex flex-wrap items-end gap-[1.2rem] mb-[1.2rem]" data-v-fec6b902><div class="flex items-end gap-[1rem] flex-1 min-w-0" data-v-fec6b902><div class="flex flex-col gap-[0.4rem] flex-1 min-w-0" data-v-fec6b902><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-fec6b902>From</label><input type="date"${ssrRenderAttr("value", startDate.value)} class="date-input w-full rounded-[0.8rem] px-[1.2rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-fec6b902></div><div class="arrow-sep text-[1.4rem] mb-[0.9rem] flex-shrink-0" data-v-fec6b902>→</div><div class="flex flex-col gap-[0.4rem] flex-1 min-w-0" data-v-fec6b902><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-fec6b902>To</label><input type="date"${ssrRenderAttr("value", endDate.value)} class="date-input w-full rounded-[0.8rem] px-[1.2rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-fec6b902></div></div><button class="calc-btn relative flex items-center gap-[0.8rem] px-[2rem] py-[1rem] max-[480px]:py-[1.3rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 flex-shrink-0" data-v-fec6b902><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-fec6b902><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" data-v-fec6b902></path></svg><span class="max-[480px]:hidden" data-v-fec6b902>Calculate</span><span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-fec6b902></span></button></div><div class="flex items-center gap-[0.8rem] flex-wrap" data-v-fec6b902><span class="page-label text-[1rem] tracking-[0.15em] uppercase mr-[0.4rem]" data-v-fec6b902>Export</span><button class="export-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200" data-v-fec6b902><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-fec6b902><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" data-v-fec6b902></path></svg> CSV </button><button class="export-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200" data-v-fec6b902><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-fec6b902><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-7.5 0h6m-6 0A1.125 1.125 0 019 13.125v-1.5A1.125 1.125 0 0110.125 10.5m.75 2.625c.621 0 1.125.504 1.125 1.125v3" data-v-fec6b902></path></svg> XLS </button><button class="export-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200" data-v-fec6b902><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-fec6b902><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" data-v-fec6b902></path></svg> PDF </button></div></div>`);
      if (loading.value) {
        _push(`<div class="flex items-center gap-[1.6rem] py-[4rem] justify-center" data-v-fec6b902><div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin" data-v-fec6b902></div><span class="page-label text-[1.2rem] tracking-[0.12em]" data-v-fec6b902>Loading attendance...</span></div>`);
      } else if (error.value) {
        _push(`<div class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem]" data-v-fec6b902><span data-v-fec6b902>⚠</span> ${ssrInterpolate(error.value)}</div>`);
      } else if (attendance2.value && attendance2.value.daily.length) {
        _push(`<div class="table-card rounded-[1.6rem] overflow-hidden" data-v-fec6b902><div class="table-summary flex items-center justify-between px-[3rem] max-[768px]:px-[2rem] py-[2rem]" data-v-fec6b902><div data-v-fec6b902><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]" data-v-fec6b902>Period</p><p class="table-text text-[1.3rem] max-[480px]:text-[1.1rem]" data-v-fec6b902>${ssrInterpolate(startDate.value)} → ${ssrInterpolate(endDate.value)}</p></div><div class="text-right" data-v-fec6b902><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]" data-v-fec6b902>Total</p><p class="page-title text-[2.4rem] leading-none tabular-nums" data-v-fec6b902>${ssrInterpolate(attendance2.value.totalHours.toFixed(2))}<span class="table-sub text-[1.4rem] ml-[0.4rem]" data-v-fec6b902>hrs</span></p></div></div><table class="w-full max-[600px]:hidden" data-v-fec6b902><thead data-v-fec6b902><tr class="table-head-row" data-v-fec6b902><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-fec6b902>Date</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-fec6b902>Time In</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-fec6b902>Time Out</th><th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-fec6b902>Hours</th></tr></thead><tbody data-v-fec6b902><!--[-->`);
        ssrRenderList(attendance2.value.daily, (d, i) => {
          _push(`<tr class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "table-row"])}" data-v-fec6b902><td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]" data-v-fec6b902>${ssrInterpolate(d.date)}</td><td class="${ssrRenderClass([d.timeIn === "-" ? "table-empty" : "table-text", "px-[3rem] py-[1.6rem] text-[1.3rem]"])}" data-v-fec6b902>${ssrInterpolate(d.timeIn)}</td><td class="${ssrRenderClass([d.timeOut === "-" ? "table-empty" : "table-text", "px-[3rem] py-[1.6rem] text-[1.3rem]"])}" data-v-fec6b902>${ssrInterpolate(d.timeOut)}</td><td class="px-[3rem] py-[1.6rem] text-[1.3rem] text-right tabular-nums" data-v-fec6b902>`);
          if (d.hours > 0) {
            _push(`<span class="table-text" data-v-fec6b902>${ssrInterpolate(d.hours)}<span class="table-empty text-[1.1rem] ml-[0.3rem]" data-v-fec6b902>h</span></span>`);
          } else {
            _push(`<span class="table-empty" data-v-fec6b902>—</span>`);
          }
          _push(`</td></tr>`);
        });
        _push(`<!--]--></tbody><tfoot data-v-fec6b902><tr class="table-foot-row" data-v-fec6b902><td colspan="3" class="px-[3rem] py-[1.8rem] text-[1.1rem] tracking-[0.12em] uppercase text-right table-sub" data-v-fec6b902>Total Hours</td><td class="px-[3rem] py-[1.8rem] text-[1.8rem] text-right tabular-nums font-medium page-title" data-v-fec6b902>${ssrInterpolate(attendance2.value.totalHours.toFixed(2))}<span class="table-sub text-[1.2rem] ml-[0.3rem]" data-v-fec6b902>h</span></td></tr></tfoot></table><div class="hidden max-[600px]:flex flex-col divide-y" style="${ssrRenderStyle({ "border-color": "var(--border)" })}" data-v-fec6b902><!--[-->`);
        ssrRenderList(attendance2.value.daily, (d, i) => {
          _push(`<div class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "px-[2rem] py-[1.6rem]"])}" data-v-fec6b902><div class="flex items-center justify-between mb-[0.8rem]" data-v-fec6b902><span class="table-text text-[1.3rem] font-medium" data-v-fec6b902>${ssrInterpolate(d.date)}</span>`);
          if (d.hours > 0) {
            _push(`<span class="table-text text-[1.3rem] tabular-nums" data-v-fec6b902>${ssrInterpolate(d.hours)}<span class="table-empty text-[1.1rem] ml-[0.2rem]" data-v-fec6b902>h</span></span>`);
          } else {
            _push(`<span class="table-empty text-[1.3rem]" data-v-fec6b902>—</span>`);
          }
          _push(`</div><div class="flex items-center gap-[1.6rem]" data-v-fec6b902><div class="flex flex-col gap-[0.2rem]" data-v-fec6b902><span class="page-label text-[0.9rem] tracking-[0.12em] uppercase" data-v-fec6b902>In</span><span class="${ssrRenderClass([d.timeIn === "-" ? "table-empty" : "table-text", "text-[1.2rem] tabular-nums"])}" data-v-fec6b902>${ssrInterpolate(d.timeIn)}</span></div><span class="arrow-sep text-[1.2rem]" data-v-fec6b902>→</span><div class="flex flex-col gap-[0.2rem]" data-v-fec6b902><span class="page-label text-[0.9rem] tracking-[0.12em] uppercase" data-v-fec6b902>Out</span><span class="${ssrRenderClass([d.timeOut === "-" ? "table-empty" : "table-text", "text-[1.2rem] tabular-nums"])}" data-v-fec6b902>${ssrInterpolate(d.timeOut)}</span></div></div></div>`);
        });
        _push(`<!--]--><div class="table-foot-row flex items-center justify-between px-[2rem] py-[1.6rem]" data-v-fec6b902><span class="table-sub text-[1.1rem] tracking-[0.12em] uppercase" data-v-fec6b902>Total Hours</span><span class="page-title text-[1.8rem] tabular-nums font-medium" data-v-fec6b902>${ssrInterpolate(attendance2.value.totalHours.toFixed(2))}<span class="table-sub text-[1.2rem] ml-[0.3rem]" data-v-fec6b902>h</span></span></div></div></div>`);
      } else if (!loading.value) {
        _push(`<div class="flex flex-col items-center justify-center py-[8rem] text-center" data-v-fec6b902><div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]" data-v-fec6b902><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-fec6b902><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" data-v-fec6b902></path></svg></div><p class="table-sub text-[1.4rem] tracking-[0.06em]" data-v-fec6b902>No attendance data for this period.</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[id]/personal-cabinet/attendance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const attendance = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fec6b902"]]);

export { attendance as default };
//# sourceMappingURL=attendance-BYSVQxWG.mjs.map
