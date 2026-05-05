import { _ as __nuxt_component_0 } from './sidebar-C8UFdBSQ.mjs';
import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
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
    const holidays2 = ref([]);
    const loading = ref(false);
    const error = ref("");
    const searchQuery = ref("");
    const filterStatus = ref("");
    const processedHolidays = computed(() => {
      let data = [...holidays2.value];
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        data = data.filter(
          (h) => `${h.first_name} ${h.last_name}`.toLowerCase().includes(q) || h.content?.toLowerCase().includes(q)
        );
      }
      if (filterStatus.value === "pending") data = data.filter((h) => !h.is_approved);
      if (filterStatus.value === "approved") data = data.filter((h) => h.is_approved);
      return data;
    });
    const pendingCount = computed(() => holidays2.value.filter((h) => !h.is_approved).length);
    const approvedCount = computed(() => holidays2.value.filter((h) => h.is_approved).length);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper flex" }, _attrs))} data-v-0eb64b20>`);
      _push(ssrRenderComponent(_component_Sidebar, { items: sidebarItems }, null, _parent));
      _push(`<main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden" data-v-0eb64b20><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-0eb64b20></div><div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none" data-v-0eb64b20></div><div class="relative z-10 max-w-[120rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[1.6rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]" data-v-0eb64b20><div class="mb-[4rem] max-[768px]:mb-[2.4rem]" data-v-0eb64b20><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]" data-v-0eb64b20>Manager Panel</p><h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide" data-v-0eb64b20>Holiday Requests</h1></div>`);
      if (error.value) {
        _push(`<div class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]" data-v-0eb64b20><svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-0eb64b20><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z" data-v-0eb64b20></path></svg> ${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="filter-card rounded-[1.6rem] p-[2.4rem] mb-[2rem] max-[768px]:p-[1.6rem]" data-v-0eb64b20><div class="flex flex-wrap items-end gap-[1.6rem] max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-[1.2rem]" data-v-0eb64b20><div class="flex flex-col gap-[0.4rem] flex-1 min-w-[20rem] max-[768px]:min-w-0" data-v-0eb64b20><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-0eb64b20>Search</label><div class="relative" data-v-0eb64b20><div class="absolute left-[1.2rem] top-1/2 -translate-y-1/2 pointer-events-none search-icon" data-v-0eb64b20><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-0eb64b20><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" data-v-0eb64b20></path></svg></div><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search by name or reason…" class="date-input w-full pl-[3.8rem] pr-[1.4rem] py-[0.9rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200" data-v-0eb64b20></div></div><div class="flex flex-col gap-[0.4rem]" data-v-0eb64b20><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-0eb64b20>Status</label><select class="date-input px-[1.4rem] py-[0.9rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200" data-v-0eb64b20><option value="" data-v-0eb64b20${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "") : ssrLooseEqual(filterStatus.value, "")) ? " selected" : ""}>All Requests</option><option value="pending" data-v-0eb64b20${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "pending") : ssrLooseEqual(filterStatus.value, "pending")) ? " selected" : ""}>Pending</option><option value="approved" data-v-0eb64b20${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "approved") : ssrLooseEqual(filterStatus.value, "approved")) ? " selected" : ""}>Approved</option></select></div><div class="flex items-center gap-[1.6rem] max-[768px]:flex-wrap max-[768px]:gap-[1rem]" data-v-0eb64b20><button class="calc-btn relative flex items-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200" data-v-0eb64b20><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-0eb64b20><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" data-v-0eb64b20></path></svg> Refresh <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-0eb64b20></span></button><div class="flex items-center gap-[0.8rem]" data-v-0eb64b20><button class="${ssrRenderClass([filterStatus.value === "" ? "pill-active" : "pill-inactive", "filter-pill text-[1.1rem] px-[1.4rem] py-[0.6rem] rounded-full transition-all duration-150"])}" data-v-0eb64b20>All</button><button class="${ssrRenderClass([filterStatus.value === "pending" ? "pill-active" : "pill-inactive", "filter-pill text-[1.1rem] px-[1.4rem] py-[0.6rem] rounded-full transition-all duration-150"])}" data-v-0eb64b20>Pending</button><button class="${ssrRenderClass([filterStatus.value === "approved" ? "pill-active" : "pill-inactive", "filter-pill text-[1.1rem] px-[1.4rem] py-[0.6rem] rounded-full transition-all duration-150"])}" data-v-0eb64b20>Approved</button></div></div></div></div>`);
      if (loading.value) {
        _push(`<div class="flex items-center gap-[1.6rem] py-[4rem] justify-center" data-v-0eb64b20><div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin" data-v-0eb64b20></div><span class="page-label text-[1.2rem] tracking-[0.12em]" data-v-0eb64b20>Loading holidays…</span></div>`);
      } else if (processedHolidays.value.length) {
        _push(`<div class="table-card rounded-[1.6rem] overflow-hidden" data-v-0eb64b20><div class="table-summary flex items-center justify-between px-[3rem] py-[2rem] max-[768px]:px-[1.6rem] max-[768px]:py-[1.4rem] flex-wrap gap-[1.2rem]" data-v-0eb64b20><div data-v-0eb64b20><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]" data-v-0eb64b20>Requests</p><p class="table-text text-[1.4rem]" data-v-0eb64b20>${ssrInterpolate(processedHolidays.value.length)} ${ssrInterpolate(processedHolidays.value.length === 1 ? "request" : "requests")} `);
        if (filterStatus.value) {
          _push(`<span class="table-sub" data-v-0eb64b20> — ${ssrInterpolate(filterStatus.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></div><div class="flex items-center gap-[1.2rem]" data-v-0eb64b20><div class="stat-chip flex flex-col items-center px-[1.6rem] py-[0.8rem] rounded-[0.8rem]" data-v-0eb64b20><p class="page-label text-[0.9rem] tracking-[0.15em] uppercase mb-[0.1rem]" data-v-0eb64b20>Pending</p><p class="page-title text-[1.8rem] leading-none tabular-nums" data-v-0eb64b20>${ssrInterpolate(pendingCount.value)}</p></div><div class="stat-chip approved-chip flex flex-col items-center px-[1.6rem] py-[0.8rem] rounded-[0.8rem]" data-v-0eb64b20><p class="approved-label text-[0.9rem] tracking-[0.15em] uppercase mb-[0.1rem]" data-v-0eb64b20>Approved</p><p class="approved-value text-[1.8rem] leading-none tabular-nums" data-v-0eb64b20>${ssrInterpolate(approvedCount.value)}</p></div></div></div><table class="w-full max-[768px]:hidden" data-v-0eb64b20><thead data-v-0eb64b20><tr class="table-head-row" data-v-0eb64b20><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-0eb64b20>Employee</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-0eb64b20>Reason</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-0eb64b20>Start</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-0eb64b20>End</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-0eb64b20>Status</th><th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-0eb64b20>Actions</th></tr></thead><tbody data-v-0eb64b20><!--[-->`);
        ssrRenderList(processedHolidays.value, (h, i) => {
          _push(`<tr class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "table-row"])}" data-v-0eb64b20><td class="px-[3rem] py-[1.6rem]" data-v-0eb64b20><div class="flex items-center gap-[1.2rem]" data-v-0eb64b20><div class="emp-avatar w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center text-[1.1rem] text-white flex-shrink-0" data-v-0eb64b20>${ssrInterpolate(h.profile?.first_name?.[0]?.toUpperCase())}</div><span class="table-text text-[1.3rem]" data-v-0eb64b20>${ssrInterpolate(h.profile?.first_name)} ${ssrInterpolate(h.profile?.last_name)}</span></div></td><td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem] max-w-[24rem]" data-v-0eb64b20><span class="line-clamp-2" data-v-0eb64b20>${ssrInterpolate(h.content)}</span></td><td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums whitespace-nowrap" data-v-0eb64b20>${ssrInterpolate(h.date_start)}</td><td class="${ssrRenderClass([h.date_end ? "table-text" : "table-empty", "px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums whitespace-nowrap"])}" data-v-0eb64b20>${ssrInterpolate(h.date_end ?? "—")}</td><td class="px-[3rem] py-[1.6rem]" data-v-0eb64b20><span class="${ssrRenderClass([h.is_approved ? "badge-approved" : "badge-pending", "status-badge text-[1.1rem] px-[1.1rem] py-[0.35rem] rounded-full"])}" data-v-0eb64b20>${ssrInterpolate(h.is_approved ? "Approved" : "Pending")}</span></td><td class="px-[3rem] py-[1.6rem]" data-v-0eb64b20><div class="flex items-center justify-end gap-[0.8rem]" data-v-0eb64b20>`);
          if (!h.is_approved) {
            _push(`<button class="action-btn approve-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]" data-v-0eb64b20><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-0eb64b20><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" data-v-0eb64b20></path></svg> Approve </button>`);
          } else {
            _push(`<button class="action-btn revoke-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]" data-v-0eb64b20><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-0eb64b20><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" data-v-0eb64b20></path></svg> Revoke </button>`);
          }
          _push(`<button class="action-btn delete-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]" data-v-0eb64b20><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-0eb64b20><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-0eb64b20></path></svg> Delete </button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table><div class="hidden max-[768px]:block divide-y divide-[var(--border)]" data-v-0eb64b20><!--[-->`);
        ssrRenderList(processedHolidays.value, (h, i) => {
          _push(`<div class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "holiday-card px-[1.6rem] py-[1.8rem]"])}" data-v-0eb64b20><div class="flex items-center justify-between gap-[1.2rem] mb-[1.2rem]" data-v-0eb64b20><div class="flex items-center gap-[1.2rem] min-w-0" data-v-0eb64b20><div class="emp-avatar w-[3.6rem] h-[3.6rem] rounded-full flex items-center justify-center text-[1.3rem] text-white flex-shrink-0" data-v-0eb64b20>${ssrInterpolate(h.profile?.first_name?.[0]?.toUpperCase())}</div><p class="table-text text-[1.4rem] font-medium truncate" data-v-0eb64b20>${ssrInterpolate(h.profile?.first_name)} ${ssrInterpolate(h.profile?.last_name)}</p></div><span class="${ssrRenderClass([h.is_approved ? "badge-approved" : "badge-pending", "status-badge text-[1.1rem] px-[1.1rem] py-[0.35rem] rounded-full flex-shrink-0"])}" data-v-0eb64b20>${ssrInterpolate(h.is_approved ? "Approved" : "Pending")}</span></div><p class="table-sub text-[1.2rem] mb-[1.2rem] line-clamp-2" data-v-0eb64b20>${ssrInterpolate(h.content)}</p><div class="flex items-center gap-[1rem] mb-[1.4rem]" data-v-0eb64b20><div class="flex items-center gap-[0.5rem]" data-v-0eb64b20><svg class="w-[1.2rem] h-[1.2rem] flex-shrink-0" style="${ssrRenderStyle({ "color": "var(--text-muted)" })}" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-0eb64b20><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" data-v-0eb64b20></path></svg><span class="table-text text-[1.3rem] tabular-nums" data-v-0eb64b20>${ssrInterpolate(h.date_start)}</span></div><span class="table-empty text-[1.1rem]" data-v-0eb64b20>→</span><span class="${ssrRenderClass([h.date_end ? "table-text" : "table-empty", "text-[1.3rem] tabular-nums"])}" data-v-0eb64b20>${ssrInterpolate(h.date_end ?? "—")}</span></div><div class="flex items-center gap-[0.8rem]" data-v-0eb64b20>`);
          if (!h.is_approved) {
            _push(`<button class="action-btn approve-btn flex-1 flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem]" data-v-0eb64b20><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-0eb64b20><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" data-v-0eb64b20></path></svg> Approve </button>`);
          } else {
            _push(`<button class="action-btn revoke-btn flex-1 flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem]" data-v-0eb64b20><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-0eb64b20><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" data-v-0eb64b20></path></svg> Revoke </button>`);
          }
          _push(`<button class="action-btn delete-btn flex items-center justify-center gap-[0.5rem] px-[1.4rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem]" data-v-0eb64b20><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-0eb64b20><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-0eb64b20></path></svg></button></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (!loading.value) {
        _push(`<div class="flex flex-col items-center justify-center py-[8rem] text-center" data-v-0eb64b20><div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]" data-v-0eb64b20><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-0eb64b20><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" data-v-0eb64b20></path></svg></div><p class="table-sub text-[1.4rem] tracking-[0.06em]" data-v-0eb64b20>No holiday requests found.</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[companyId]/manager/holidays.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const holidays = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0eb64b20"]]);

export { holidays as default };
//# sourceMappingURL=holidays-C7fYKVOL.mjs.map
