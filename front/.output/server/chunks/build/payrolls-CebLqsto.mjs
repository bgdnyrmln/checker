import { _ as __nuxt_component_0 } from './sidebar-C8UFdBSQ.mjs';
import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "payrolls",
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
    const endDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 1)));
    const employees = ref([]);
    const loading = ref(false);
    const error = ref("");
    const payrolls2 = computed(
      () => employees.value.map((emp) => {
        const daily = emp.daily.map((day) => ({
          date: day.date,
          hours: parseFloat((day.total_time_seconds / 3600).toFixed(2))
        }));
        const totalHours = daily.reduce((s, d) => s + d.hours, 0);
        const hourlyPay = emp.hourly_pay ?? 0;
        return {
          id: emp.id,
          name: `${emp.first_name} ${emp.last_name}`,
          email: emp.email,
          hoursWorked: totalHours.toFixed(2),
          hourlyPay,
          totalPay: (totalHours * hourlyPay).toFixed(2),
          daily
        };
      })
    );
    const grandTotal = computed(
      () => payrolls2.value.reduce((s, p) => s + parseFloat(p.totalPay), 0).toFixed(2)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper flex" }, _attrs))} data-v-7b5a6dd4>`);
      _push(ssrRenderComponent(_component_Sidebar, { items: sidebarItems }, null, _parent));
      _push(`<main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden" data-v-7b5a6dd4><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-7b5a6dd4></div><div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none" data-v-7b5a6dd4></div><div class="relative z-10 max-w-[120rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[1.6rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]" data-v-7b5a6dd4><div class="mb-[4rem] max-[768px]:mb-[2.4rem]" data-v-7b5a6dd4><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]" data-v-7b5a6dd4>Manager Panel</p><h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide" data-v-7b5a6dd4>Team Payrolls</h1></div>`);
      if (error.value) {
        _push(`<div class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]" data-v-7b5a6dd4><svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-7b5a6dd4><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z" data-v-7b5a6dd4></path></svg> ${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="filter-card rounded-[1.6rem] p-[2.4rem] mb-[2rem] max-[768px]:p-[1.6rem]" data-v-7b5a6dd4><div class="flex flex-wrap items-end gap-[1.6rem] max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-[1.2rem]" data-v-7b5a6dd4><div class="flex items-center gap-[1.2rem] max-[480px]:flex-col max-[480px]:items-stretch max-[480px]:gap-[1rem]" data-v-7b5a6dd4><div class="flex flex-col gap-[0.4rem]" data-v-7b5a6dd4><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-7b5a6dd4>From</label><input type="date"${ssrRenderAttr("value", startDate.value)} class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-7b5a6dd4></div><div class="arrow-sep mt-[1.8rem] text-[1.4rem] max-[480px]:hidden" data-v-7b5a6dd4>→</div><div class="flex flex-col gap-[0.4rem]" data-v-7b5a6dd4><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-7b5a6dd4>To</label><input type="date"${ssrRenderAttr("value", endDate.value)} class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-7b5a6dd4></div></div><button class="calc-btn relative flex items-center justify-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200" data-v-7b5a6dd4><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-7b5a6dd4><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" data-v-7b5a6dd4></path></svg> Refresh <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-7b5a6dd4></span></button><div class="flex items-center gap-[1rem] max-[768px]:ml-0 ml-auto max-[480px]:flex-wrap" data-v-7b5a6dd4><span class="page-label text-[1rem] tracking-[0.15em] uppercase mr-[0.4rem] max-[480px]:w-full" data-v-7b5a6dd4>Export</span><button class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200" data-v-7b5a6dd4><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-7b5a6dd4><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" data-v-7b5a6dd4></path></svg> CSV </button><button class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200" data-v-7b5a6dd4><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-7b5a6dd4><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75" data-v-7b5a6dd4></path></svg> XLS </button><button class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200" data-v-7b5a6dd4><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-7b5a6dd4><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" data-v-7b5a6dd4></path></svg> PDF </button></div></div></div>`);
      if (loading.value) {
        _push(`<div class="flex items-center gap-[1.6rem] py-[4rem] justify-center" data-v-7b5a6dd4><div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin" data-v-7b5a6dd4></div><span class="page-label text-[1.2rem] tracking-[0.12em]" data-v-7b5a6dd4>Loading payrolls…</span></div>`);
      } else if (payrolls2.value.length) {
        _push(`<div class="flex flex-col gap-[2rem]" data-v-7b5a6dd4><!--[-->`);
        ssrRenderList(payrolls2.value, (p) => {
          _push(`<div class="table-card rounded-[1.6rem] overflow-hidden" data-v-7b5a6dd4><div class="table-summary px-[3rem] py-[2.2rem] flex items-center justify-between flex-wrap gap-[2rem] max-[768px]:px-[1.6rem] max-[768px]:py-[1.6rem] max-[768px]:gap-[1.4rem]" data-v-7b5a6dd4><div class="flex items-center gap-[1.6rem]" data-v-7b5a6dd4><div class="emp-avatar w-[4rem] h-[4rem] rounded-full flex items-center justify-center text-[1.4rem] text-white flex-shrink-0" data-v-7b5a6dd4>${ssrInterpolate(p.name[0]?.toUpperCase())}</div><div data-v-7b5a6dd4><p class="page-title text-[1.6rem] leading-tight" data-v-7b5a6dd4>${ssrInterpolate(p.name)}</p><p class="table-sub text-[1.2rem]" data-v-7b5a6dd4>${ssrInterpolate(p.email)}</p></div></div><div class="flex items-center gap-[1.2rem] flex-wrap max-[480px]:w-full max-[480px]:gap-[0.8rem]" data-v-7b5a6dd4><div class="summary-pill flex flex-col items-center px-[2rem] py-[1rem] rounded-[1rem] max-[480px]:flex-1 max-[480px]:px-[1.2rem]" data-v-7b5a6dd4><p class="page-label text-[0.95rem] tracking-[0.15em] uppercase mb-[0.2rem]" data-v-7b5a6dd4>Hours</p><p class="page-title text-[2rem] leading-none tabular-nums" data-v-7b5a6dd4>${ssrInterpolate(p.hoursWorked)}<span class="table-sub text-[1.1rem] ml-[0.2rem]" data-v-7b5a6dd4>h</span></p></div><div class="summary-pill flex flex-col items-center px-[2rem] py-[1rem] rounded-[1rem] max-[480px]:flex-1 max-[480px]:px-[1.2rem]" data-v-7b5a6dd4><p class="page-label text-[0.95rem] tracking-[0.15em] uppercase mb-[0.2rem]" data-v-7b5a6dd4>Rate</p><p class="page-title text-[2rem] leading-none tabular-nums" data-v-7b5a6dd4>$${ssrInterpolate(p.hourlyPay)}<span class="table-sub text-[1.1rem] ml-[0.2rem]" data-v-7b5a6dd4>/h</span></p></div><div class="summary-pill pay-pill flex flex-col items-center px-[2rem] py-[1rem] rounded-[1rem] max-[480px]:w-full max-[480px]:flex-row max-[480px]:justify-between max-[480px]:px-[1.6rem]" data-v-7b5a6dd4><p class="pay-label text-[0.95rem] tracking-[0.15em] uppercase mb-[0.2rem] max-[480px]:mb-0" data-v-7b5a6dd4>Total Pay</p><p class="pay-value text-[2rem] leading-none tabular-nums font-semibold" data-v-7b5a6dd4>$${ssrInterpolate(p.totalPay)}</p></div></div></div><table class="w-full max-[768px]:hidden" data-v-7b5a6dd4><thead data-v-7b5a6dd4><tr class="table-head-row" data-v-7b5a6dd4><th class="page-label px-[3rem] py-[1.4rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-7b5a6dd4>Date</th><th class="page-label px-[3rem] py-[1.4rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-7b5a6dd4>Hours</th><th class="page-label px-[3rem] py-[1.4rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-7b5a6dd4>Status</th><th class="page-label px-[3rem] py-[1.4rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-7b5a6dd4>Day Pay</th></tr></thead><tbody data-v-7b5a6dd4><!--[-->`);
          ssrRenderList(p.daily, (d, i) => {
            _push(`<tr class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "table-row"])}" data-v-7b5a6dd4><td class="table-text px-[3rem] py-[1.4rem] text-[1.3rem]" data-v-7b5a6dd4>${ssrInterpolate(d.date)}</td><td class="${ssrRenderClass([d.hours > 0 ? "table-text" : "table-empty", "px-[3rem] py-[1.4rem] text-[1.3rem] text-right tabular-nums"])}" data-v-7b5a6dd4>`);
            if (d.hours > 0) {
              _push(`<span data-v-7b5a6dd4>${ssrInterpolate(d.hours)}<span class="table-empty text-[1.1rem] ml-[0.2rem]" data-v-7b5a6dd4>h</span></span>`);
            } else {
              _push(`<span data-v-7b5a6dd4>—</span>`);
            }
            _push(`</td><td class="px-[3rem] py-[1.4rem] text-right" data-v-7b5a6dd4>`);
            if (d.hours > 8) {
              _push(`<span class="ot-badge text-[1.05rem] px-[1rem] py-[0.3rem] rounded-full" data-v-7b5a6dd4>OT</span>`);
            } else if (d.hours > 0) {
              _push(`<span class="ok-badge text-[1.05rem] px-[1rem] py-[0.3rem] rounded-full" data-v-7b5a6dd4>Regular</span>`);
            } else {
              _push(`<span class="table-empty text-[1.2rem]" data-v-7b5a6dd4>—</span>`);
            }
            _push(`</td><td class="${ssrRenderClass([d.hours > 0 ? "table-text" : "table-empty", "px-[3rem] py-[1.4rem] text-[1.3rem] text-right tabular-nums"])}" data-v-7b5a6dd4>`);
            if (d.hours > 0) {
              _push(`<span data-v-7b5a6dd4>$${ssrInterpolate((d.hours * p.hourlyPay).toFixed(2))}</span>`);
            } else {
              _push(`<span data-v-7b5a6dd4>—</span>`);
            }
            _push(`</td></tr>`);
          });
          _push(`<!--]--></tbody><tfoot data-v-7b5a6dd4><tr class="table-foot-row" data-v-7b5a6dd4><td colspan="3" class="px-[3rem] py-[1.6rem] text-[1.1rem] tracking-[0.12em] uppercase text-right table-sub" data-v-7b5a6dd4>Total Pay</td><td class="px-[3rem] py-[1.6rem] text-[1.8rem] text-right tabular-nums font-medium page-title" data-v-7b5a6dd4>$${ssrInterpolate(p.totalPay)}</td></tr></tfoot></table><div class="hidden max-[768px]:block" data-v-7b5a6dd4><div class="daily-header grid grid-cols-3 px-[1.6rem] py-[1rem]" data-v-7b5a6dd4><span class="page-label text-[0.9rem] tracking-[0.15em] uppercase" data-v-7b5a6dd4>Date</span><span class="page-label text-[0.9rem] tracking-[0.15em] uppercase text-center" data-v-7b5a6dd4>Hours</span><span class="page-label text-[0.9rem] tracking-[0.15em] uppercase text-right" data-v-7b5a6dd4>Pay</span></div><div class="flex flex-col divide-y divide-[var(--border)]" data-v-7b5a6dd4><!--[-->`);
          ssrRenderList(p.daily, (d, i) => {
            _push(`<div class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "daily-mobile-row grid grid-cols-3 items-center px-[1.6rem] py-[1.2rem]"])}" data-v-7b5a6dd4><div class="flex flex-col gap-[0.3rem]" data-v-7b5a6dd4><span class="table-text text-[1.2rem] tabular-nums" data-v-7b5a6dd4>${ssrInterpolate(d.date)}</span>`);
            if (d.hours > 8) {
              _push(`<span class="ot-badge self-start text-[1rem] px-[0.7rem] py-[0.15rem] rounded-full" data-v-7b5a6dd4>OT</span>`);
            } else if (d.hours > 0) {
              _push(`<span class="ok-badge self-start text-[1rem] px-[0.7rem] py-[0.15rem] rounded-full" data-v-7b5a6dd4>Reg</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><div class="text-center" data-v-7b5a6dd4>`);
            if (d.hours > 0) {
              _push(`<span class="table-text text-[1.3rem] tabular-nums" data-v-7b5a6dd4>${ssrInterpolate(d.hours)}<span class="table-empty text-[1rem] ml-[0.15rem]" data-v-7b5a6dd4>h</span></span>`);
            } else {
              _push(`<span class="table-empty text-[1.2rem]" data-v-7b5a6dd4>—</span>`);
            }
            _push(`</div><div class="text-right" data-v-7b5a6dd4>`);
            if (d.hours > 0) {
              _push(`<span class="table-text text-[1.3rem] tabular-nums" data-v-7b5a6dd4>$${ssrInterpolate((d.hours * p.hourlyPay).toFixed(2))}</span>`);
            } else {
              _push(`<span class="table-empty text-[1.2rem]" data-v-7b5a6dd4>—</span>`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div><div class="table-foot-row flex items-center justify-between px-[1.6rem] py-[1.4rem]" data-v-7b5a6dd4><span class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-7b5a6dd4>Total Pay</span><span class="page-title text-[2rem] tabular-nums font-semibold" data-v-7b5a6dd4>$${ssrInterpolate(p.totalPay)}</span></div></div></div>`);
        });
        _push(`<!--]--><div class="grand-total-card rounded-[1.6rem] px-[3rem] py-[2.4rem] flex items-center justify-between max-[768px]:px-[1.6rem] max-[768px]:py-[1.6rem]" data-v-7b5a6dd4><div data-v-7b5a6dd4><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.4rem]" data-v-7b5a6dd4>Period</p><p class="table-text text-[1.4rem] max-[480px]:text-[1.2rem]" data-v-7b5a6dd4>${ssrInterpolate(startDate.value)} → ${ssrInterpolate(endDate.value)}</p></div><div class="text-right" data-v-7b5a6dd4><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.4rem]" data-v-7b5a6dd4>Grand Total</p><p class="page-title text-[3.2rem] max-[768px]:text-[2.4rem] leading-none tabular-nums font-semibold" data-v-7b5a6dd4>$${ssrInterpolate(grandTotal.value)}</p></div></div></div>`);
      } else if (!loading.value) {
        _push(`<div class="flex flex-col items-center justify-center py-[8rem] text-center" data-v-7b5a6dd4><div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]" data-v-7b5a6dd4><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-7b5a6dd4><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" data-v-7b5a6dd4></path></svg></div><p class="table-sub text-[1.4rem] tracking-[0.06em]" data-v-7b5a6dd4>No payroll data for this period.</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[companyId]/manager/payrolls.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const payrolls = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7b5a6dd4"]]);

export { payrolls as default };
//# sourceMappingURL=payrolls-CebLqsto.mjs.map
