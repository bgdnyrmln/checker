import { _ as __nuxt_component_0 } from './sidebar-C8UFdBSQ.mjs';
import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "attendancy",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const companyId = route.params.companyId;
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
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    const today = /* @__PURE__ */ new Date();
    const formatDate = (d) => d.toISOString().slice(0, 10);
    const startDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth(), 2)));
    const endDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)));
    const employees = ref([]);
    const loading = ref(false);
    const error = ref("");
    const empTotalHours = (emp) => emp.daily.reduce((sum, d) => sum + d.total_time_seconds / 3600, 0).toFixed(2);
    const grandTotalHours = computed(
      () => employees.value.reduce(
        (sum, emp) => sum + emp.daily.reduce((s, d) => s + d.total_time_seconds / 3600, 0),
        0
      ).toFixed(2)
    );
    const rowIndex = /* @__PURE__ */ (() => {
      let counter = 0;
      const cache = /* @__PURE__ */ new WeakMap();
      return (emp, di) => {
        if (!cache.has(emp)) cache.set(emp, counter);
        return cache.get(emp) + di;
      };
    })();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper flex" }, _attrs))} data-v-f58f49b7>`);
      _push(ssrRenderComponent(_component_Sidebar, { items: sidebarItems }, null, _parent));
      _push(`<main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden" data-v-f58f49b7><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-f58f49b7></div><div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none" data-v-f58f49b7></div><div class="relative z-10 max-w-[120rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[1.6rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]" data-v-f58f49b7><div class="mb-[4rem] max-[768px]:mb-[2.4rem]" data-v-f58f49b7><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]" data-v-f58f49b7>Manager Panel</p><h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide" data-v-f58f49b7>Team Attendance</h1></div>`);
      if (error.value) {
        _push(`<div class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]" data-v-f58f49b7><svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-f58f49b7><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z" data-v-f58f49b7></path></svg> ${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="filter-card rounded-[1.6rem] p-[2.4rem] mb-[2rem] max-[768px]:p-[1.6rem]" data-v-f58f49b7><div class="flex flex-wrap items-end gap-[1.6rem] max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-[1.2rem]" data-v-f58f49b7><div class="flex items-center gap-[1.2rem] max-[480px]:flex-col max-[480px]:items-stretch max-[480px]:gap-[1rem]" data-v-f58f49b7><div class="flex flex-col gap-[0.4rem]" data-v-f58f49b7><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-f58f49b7>From</label><input type="date"${ssrRenderAttr("value", startDate.value)} class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-f58f49b7></div><div class="arrow-sep mt-[1.8rem] text-[1.4rem] max-[480px]:hidden" data-v-f58f49b7>→</div><div class="flex flex-col gap-[0.4rem]" data-v-f58f49b7><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-f58f49b7>To</label><input type="date"${ssrRenderAttr("value", endDate.value)} class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-f58f49b7></div></div><button class="calc-btn relative flex items-center justify-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200" data-v-f58f49b7><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-f58f49b7><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" data-v-f58f49b7></path></svg> Calculate <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-f58f49b7></span></button><div class="flex items-center gap-[1rem] max-[768px]:ml-0 ml-auto max-[480px]:flex-wrap" data-v-f58f49b7><span class="page-label text-[1rem] tracking-[0.15em] uppercase mr-[0.4rem] max-[480px]:w-full" data-v-f58f49b7>Export</span><button class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200" data-v-f58f49b7><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-f58f49b7><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" data-v-f58f49b7></path></svg> CSV </button><button class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200" data-v-f58f49b7><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-f58f49b7><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75" data-v-f58f49b7></path></svg> XLS </button><button class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200" data-v-f58f49b7><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-f58f49b7><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" data-v-f58f49b7></path></svg> PDF </button></div></div></div>`);
      if (loading.value) {
        _push(`<div class="flex items-center gap-[1.6rem] py-[4rem] justify-center" data-v-f58f49b7><div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin" data-v-f58f49b7></div><span class="page-label text-[1.2rem] tracking-[0.12em]" data-v-f58f49b7>Loading attendance…</span></div>`);
      } else if (employees.value.length) {
        _push(`<div class="table-card rounded-[1.6rem] overflow-hidden" data-v-f58f49b7><div class="table-summary flex items-center justify-between px-[3rem] py-[2rem] max-[768px]:px-[1.6rem] max-[768px]:py-[1.4rem]" data-v-f58f49b7><div data-v-f58f49b7><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]" data-v-f58f49b7>Period</p><p class="table-text text-[1.4rem] max-[480px]:text-[1.2rem]" data-v-f58f49b7>${ssrInterpolate(startDate.value)} → ${ssrInterpolate(endDate.value)}</p></div><div class="text-right" data-v-f58f49b7><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]" data-v-f58f49b7>Members</p><p class="page-title text-[2.4rem] leading-none tabular-nums" data-v-f58f49b7>${ssrInterpolate(employees.value.length)}<span class="table-sub text-[1.4rem] ml-[0.4rem]" data-v-f58f49b7>emp</span></p></div></div><table class="w-full max-[768px]:hidden" data-v-f58f49b7><thead data-v-f58f49b7><tr class="table-head-row" data-v-f58f49b7><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-f58f49b7>Employee</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-f58f49b7>Email</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-f58f49b7>Date</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-f58f49b7>Time In</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-f58f49b7>Time Out</th><th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-f58f49b7>Hours</th></tr></thead><tbody data-v-f58f49b7><!--[-->`);
        ssrRenderList(employees.value, (emp) => {
          _push(`<!--[--><!--[-->`);
          ssrRenderList(emp.daily, (d, di) => {
            _push(`<tr class="${ssrRenderClass([unref(rowIndex)(emp, di) % 2 === 0 ? "row-even" : "row-odd", "table-row"])}" data-v-f58f49b7><td class="px-[3rem] py-[1.6rem]" data-v-f58f49b7>`);
            if (di === 0) {
              _push(`<div class="flex items-center gap-[1.2rem]" data-v-f58f49b7><div class="emp-avatar w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center text-[1.1rem] text-white flex-shrink-0" data-v-f58f49b7>${ssrInterpolate(emp.first_name?.[0]?.toUpperCase())}</div><span class="table-text text-[1.3rem]" data-v-f58f49b7>${ssrInterpolate(emp.first_name)} ${ssrInterpolate(emp.last_name)}</span></div>`);
            } else {
              _push(`<span class="table-empty text-[1.3rem] pl-[4.4rem]" data-v-f58f49b7>↳</span>`);
            }
            _push(`</td><td class="px-[3rem] py-[1.6rem]" data-v-f58f49b7>`);
            if (di === 0) {
              _push(`<span class="table-text text-[1.3rem]" data-v-f58f49b7>${ssrInterpolate(emp.email)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</td><td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]" data-v-f58f49b7>${ssrInterpolate(d.date)}</td><td class="${ssrRenderClass([d.checked_in_at ? "table-text tabular-nums" : "table-empty", "px-[3rem] py-[1.6rem] text-[1.3rem]"])}" data-v-f58f49b7>${ssrInterpolate(d.checked_in_at || "—")}</td><td class="${ssrRenderClass([d.checked_out_at ? "table-text tabular-nums" : "table-empty", "px-[3rem] py-[1.6rem] text-[1.3rem]"])}" data-v-f58f49b7>${ssrInterpolate(d.checked_out_at || "—")}</td><td class="px-[3rem] py-[1.6rem] text-[1.3rem] text-right tabular-nums" data-v-f58f49b7>`);
            if (d.total_time_seconds > 0) {
              _push(`<span class="table-text" data-v-f58f49b7>${ssrInterpolate((d.total_time_seconds / 3600).toFixed(2))}<span class="table-empty text-[1.1rem] ml-[0.2rem]" data-v-f58f49b7>h</span></span>`);
            } else {
              _push(`<span class="table-empty" data-v-f58f49b7>—</span>`);
            }
            _push(`</td></tr>`);
          });
          _push(`<!--]--><tr class="emp-subtotal-row" data-v-f58f49b7><td colspan="5" class="px-[3rem] py-[1.2rem] text-[1.1rem] tracking-[0.1em] uppercase text-right table-sub" data-v-f58f49b7>${ssrInterpolate(emp.first_name)} ${ssrInterpolate(emp.last_name)} — Total </td><td class="px-[3rem] py-[1.2rem] text-right tabular-nums table-text text-[1.4rem] font-medium" data-v-f58f49b7>${ssrInterpolate(empTotalHours(emp))}<span class="table-empty text-[1.1rem] ml-[0.2rem]" data-v-f58f49b7>h</span></td></tr><!--]-->`);
        });
        _push(`<!--]--></tbody><tfoot data-v-f58f49b7><tr class="table-foot-row" data-v-f58f49b7><td colspan="5" class="px-[3rem] py-[1.8rem] text-[1.1rem] tracking-[0.12em] uppercase text-right table-sub" data-v-f58f49b7>Grand Total</td><td class="px-[3rem] py-[1.8rem] text-[1.8rem] text-right tabular-nums font-medium page-title" data-v-f58f49b7>${ssrInterpolate(grandTotalHours.value)}<span class="table-sub text-[1.2rem] ml-[0.3rem]" data-v-f58f49b7>h</span></td></tr></tfoot></table><div class="hidden max-[768px]:block" data-v-f58f49b7><!--[-->`);
        ssrRenderList(employees.value, (emp) => {
          _push(`<div class="emp-group" data-v-f58f49b7><div class="emp-group-header flex items-center justify-between px-[1.6rem] py-[1.4rem]" data-v-f58f49b7><div class="flex items-center gap-[1.2rem] min-w-0" data-v-f58f49b7><div class="emp-avatar w-[3.6rem] h-[3.6rem] rounded-full flex items-center justify-center text-[1.3rem] text-white flex-shrink-0" data-v-f58f49b7>${ssrInterpolate(emp.first_name?.[0]?.toUpperCase())}</div><div class="min-w-0" data-v-f58f49b7><p class="table-text text-[1.4rem] font-medium truncate" data-v-f58f49b7>${ssrInterpolate(emp.first_name)} ${ssrInterpolate(emp.last_name)}</p><p class="table-sub text-[1.1rem] truncate" data-v-f58f49b7>${ssrInterpolate(emp.email)}</p></div></div><div class="text-right flex-shrink-0 ml-[1rem]" data-v-f58f49b7><p class="page-label text-[0.9rem] tracking-[0.15em] uppercase mb-[0.1rem]" data-v-f58f49b7>Total</p><p class="table-text text-[1.6rem] tabular-nums font-medium leading-none" data-v-f58f49b7>${ssrInterpolate(empTotalHours(emp))}<span class="table-sub text-[1rem] ml-[0.2rem]" data-v-f58f49b7>h</span></p></div></div><div class="flex flex-col divide-y divide-[var(--border)]" data-v-f58f49b7><!--[-->`);
          ssrRenderList(emp.daily, (d) => {
            _push(`<div class="daily-row px-[1.6rem] py-[1.2rem]" data-v-f58f49b7><div class="flex items-center justify-between mb-[0.6rem]" data-v-f58f49b7><span class="table-text text-[1.3rem] font-medium tabular-nums" data-v-f58f49b7>${ssrInterpolate(d.date)}</span>`);
            if (d.total_time_seconds > 0) {
              _push(`<span class="hours-badge text-[1.1rem] tabular-nums px-[0.8rem] py-[0.2rem] rounded-full" data-v-f58f49b7>${ssrInterpolate((d.total_time_seconds / 3600).toFixed(2))}h </span>`);
            } else {
              _push(`<span class="table-empty text-[1.1rem]" data-v-f58f49b7>—</span>`);
            }
            _push(`</div><div class="flex items-center gap-[1.6rem]" data-v-f58f49b7><div class="flex items-center gap-[0.5rem]" data-v-f58f49b7><svg class="w-[1.1rem] h-[1.1rem] flex-shrink-0" style="${ssrRenderStyle({ "color": "var(--text-muted)" })}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-f58f49b7><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" data-v-f58f49b7></path></svg><span class="${ssrRenderClass([d.checked_in_at ? "table-text" : "table-empty", "text-[1.2rem] tabular-nums"])}" data-v-f58f49b7>${ssrInterpolate(d.checked_in_at || "—")}</span></div><span class="table-empty text-[1rem]" data-v-f58f49b7>→</span><div class="flex items-center gap-[0.5rem]" data-v-f58f49b7><svg class="w-[1.1rem] h-[1.1rem] flex-shrink-0" style="${ssrRenderStyle({ "color": "var(--text-muted)" })}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-f58f49b7><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" data-v-f58f49b7></path></svg><span class="${ssrRenderClass([d.checked_out_at ? "table-text" : "table-empty", "text-[1.2rem] tabular-nums"])}" data-v-f58f49b7>${ssrInterpolate(d.checked_out_at || "—")}</span></div></div></div>`);
          });
          _push(`<!--]--></div><div class="emp-subtotal-mobile flex items-center justify-between px-[1.6rem] py-[1.2rem]" data-v-f58f49b7><span class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-f58f49b7>${ssrInterpolate(emp.first_name)} ${ssrInterpolate(emp.last_name)} — Total</span><span class="table-text text-[1.4rem] tabular-nums font-medium" data-v-f58f49b7>${ssrInterpolate(empTotalHours(emp))}<span class="table-empty text-[1.1rem] ml-[0.2rem]" data-v-f58f49b7>h</span></span></div></div>`);
        });
        _push(`<!--]--><div class="table-foot-row flex items-center justify-between px-[1.6rem] py-[1.4rem]" data-v-f58f49b7><span class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-f58f49b7>Grand Total</span><span class="page-title text-[2rem] tabular-nums font-medium" data-v-f58f49b7>${ssrInterpolate(grandTotalHours.value)}<span class="table-sub text-[1.2rem] ml-[0.3rem]" data-v-f58f49b7>h</span></span></div></div></div>`);
      } else if (!loading.value) {
        _push(`<div class="flex flex-col items-center justify-center py-[8rem] text-center" data-v-f58f49b7><div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]" data-v-f58f49b7><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-f58f49b7><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" data-v-f58f49b7></path></svg></div><p class="table-sub text-[1.4rem] tracking-[0.06em]" data-v-f58f49b7>No attendance data for this period.</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[companyId]/manager/attendancy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const attendancy = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f58f49b7"]]);

export { attendancy as default };
//# sourceMappingURL=attendancy-DZRE0Lq7.mjs.map
