import { _ as __nuxt_component_0 } from './sidebar-C8UFdBSQ.mjs';
import { ref, computed, resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "schedule",
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
    const employees = ref([]);
    const shifts = ref([]);
    const loading = ref(false);
    const error = ref("");
    const searchQuery = ref("");
    const sortKey = ref("");
    const sortDirection = ref("asc");
    const form = ref({ profile_id: "", shift_date: "", starts_at: "", ends_at: "" });
    const editingId = ref(null);
    const editForm = ref({ profile_id: "", shift_date: "", starts_at: "", ends_at: "" });
    const mobileSortCols = [
      { key: "employee", label: "Name" },
      { key: "date", label: "Date" },
      { key: "start", label: "Start" },
      { key: "end", label: "End" }
    ];
    const today = /* @__PURE__ */ new Date();
    const formatDate = (d) => d.toISOString().slice(0, 10);
    const startDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth(), 1)));
    const endDate = ref(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)));
    const processedShifts = computed(() => {
      let data = [...shifts.value];
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        data = data.filter(
          (s) => `${s.company_user.user.first_name} ${s.company_user.user.last_name}`.toLowerCase().includes(q) || s.company_user.user.email.toLowerCase().includes(q)
        );
      }
      if (sortKey.value) {
        data.sort((a, b) => {
          let aVal, bVal;
          switch (sortKey.value) {
            case "employee":
              aVal = `${a.company_user.user.first_name} ${a.company_user.user.last_name}`;
              bVal = `${b.company_user.user.first_name} ${b.company_user.user.last_name}`;
              break;
            case "email":
              aVal = a.company_user.user.email;
              bVal = b.company_user.user.email;
              break;
            case "date":
              aVal = new Date(a.shift_date);
              bVal = new Date(b.shift_date);
              break;
            case "start":
              aVal = a.starts_at;
              bVal = b.starts_at;
              break;
            case "end":
              aVal = a.ends_at;
              bVal = b.ends_at;
              break;
          }
          if (aVal < bVal) return sortDirection.value === "asc" ? -1 : 1;
          if (aVal > bVal) return sortDirection.value === "asc" ? 1 : -1;
          return 0;
        });
      }
      return data;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      const _component_sort_arrow = resolveComponent("sort-arrow");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper flex" }, _attrs))} data-v-d76d9c29>`);
      _push(ssrRenderComponent(_component_Sidebar, { items: sidebarItems }, null, _parent));
      _push(`<main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden" data-v-d76d9c29><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-d76d9c29></div><div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none" data-v-d76d9c29></div><div class="relative z-10 max-w-[120rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[1.6rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]" data-v-d76d9c29><div class="mb-[4rem] max-[768px]:mb-[2.4rem]" data-v-d76d9c29><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]" data-v-d76d9c29>Manager Panel</p><h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide" data-v-d76d9c29>Team Shifts</h1></div>`);
      if (error.value) {
        _push(`<div class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]" data-v-d76d9c29><svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0 error-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z" data-v-d76d9c29></path></svg><span class="flex-1" data-v-d76d9c29>${ssrInterpolate(error.value)}</span><button class="error-close ml-auto flex-shrink-0 w-[2rem] h-[2rem] rounded-full flex items-center justify-center transition-all duration-150" data-v-d76d9c29><svg class="w-[1.1rem] h-[1.1rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-d76d9c29></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="filter-card rounded-[1.6rem] p-[2.8rem] mb-[2rem] max-[768px]:p-[1.6rem]" data-v-d76d9c29><div class="flex items-center gap-[1.4rem] mb-[2.4rem] pb-[2rem]" style="${ssrRenderStyle({ "border-bottom": "1px solid var(--border)" })}" data-v-d76d9c29><div class="empty-icon w-[4rem] h-[4rem] rounded-[1rem] flex items-center justify-center flex-shrink-0" data-v-d76d9c29><svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" data-v-d76d9c29></path></svg></div><div data-v-d76d9c29><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.1rem]" data-v-d76d9c29>Schedule</p><h2 class="page-title text-[1.8rem] leading-tight" data-v-d76d9c29>Create Shift</h2></div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-[1.6rem] mb-[2.4rem] max-[768px]:gap-[1.2rem]" data-v-d76d9c29><div class="flex flex-col gap-[0.6rem]" data-v-d76d9c29><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-d76d9c29>Employee</label><select class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-d76d9c29><option disabled value="" data-v-d76d9c29${ssrIncludeBooleanAttr(Array.isArray(form.value.profile_id) ? ssrLooseContain(form.value.profile_id, "") : ssrLooseEqual(form.value.profile_id, "")) ? " selected" : ""}>Select employee</option><!--[-->`);
      ssrRenderList(employees.value, (emp) => {
        _push(`<option${ssrRenderAttr("value", emp.id)} data-v-d76d9c29${ssrIncludeBooleanAttr(Array.isArray(form.value.profile_id) ? ssrLooseContain(form.value.profile_id, emp.id) : ssrLooseEqual(form.value.profile_id, emp.id)) ? " selected" : ""}>${ssrInterpolate(emp.first_name)} ${ssrInterpolate(emp.last_name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="flex flex-col gap-[0.6rem]" data-v-d76d9c29><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-d76d9c29>Date</label><input type="date"${ssrRenderAttr("value", form.value.shift_date)} class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-d76d9c29></div><div class="flex flex-col gap-[0.6rem]" data-v-d76d9c29><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-d76d9c29>Start Time</label><input type="time"${ssrRenderAttr("value", form.value.starts_at)} class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-d76d9c29></div><div class="flex flex-col gap-[0.6rem]" data-v-d76d9c29><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-d76d9c29>End Time</label><input type="time"${ssrRenderAttr("value", form.value.ends_at)} class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-d76d9c29></div></div><div class="flex justify-end" data-v-d76d9c29><button class="calc-btn relative flex items-center gap-[0.8rem] px-[2.4rem] py-[1.1rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 max-[480px]:w-full max-[480px]:justify-center" data-v-d76d9c29><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" data-v-d76d9c29></path></svg> Add Shift <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-d76d9c29></span></button></div></div><div class="filter-card rounded-[1.6rem] p-[2.4rem] mb-[2rem] max-[768px]:p-[1.6rem]" data-v-d76d9c29><div class="flex flex-wrap items-end gap-[1.6rem] max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-[1.2rem]" data-v-d76d9c29><div class="flex items-center gap-[1.2rem] max-[480px]:flex-col max-[480px]:items-stretch max-[480px]:gap-[1rem]" data-v-d76d9c29><div class="flex flex-col gap-[0.4rem]" data-v-d76d9c29><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-d76d9c29>From</label><input type="date"${ssrRenderAttr("value", startDate.value)} class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-d76d9c29></div><div class="arrow-sep mt-[1.8rem] text-[1.4rem] max-[480px]:hidden" data-v-d76d9c29>→</div><div class="flex flex-col gap-[0.4rem]" data-v-d76d9c29><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-d76d9c29>To</label><input type="date"${ssrRenderAttr("value", endDate.value)} class="date-input rounded-[0.8rem] px-[1.4rem] py-[0.9rem] text-[1.3rem] outline-none transition-all duration-200" data-v-d76d9c29></div></div><button class="calc-btn relative flex items-center justify-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200" data-v-d76d9c29><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" data-v-d76d9c29></path></svg> Apply <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-d76d9c29></span></button><div class="flex items-center gap-[1rem] max-[768px]:ml-0 ml-auto max-[480px]:flex-wrap" data-v-d76d9c29><span class="page-label text-[1rem] tracking-[0.15em] uppercase mr-[0.4rem] max-[480px]:w-full" data-v-d76d9c29>Export</span><button class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200" data-v-d76d9c29><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" data-v-d76d9c29></path></svg> CSV </button><button class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200" data-v-d76d9c29><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75" data-v-d76d9c29></path></svg> XLS </button><button class="export-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-200" data-v-d76d9c29><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" data-v-d76d9c29></path></svg> PDF </button></div></div></div>`);
      if (loading.value) {
        _push(`<div class="flex items-center gap-[1.6rem] py-[4rem] justify-center" data-v-d76d9c29><div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin" data-v-d76d9c29></div><span class="page-label text-[1.2rem] tracking-[0.12em]" data-v-d76d9c29>Loading shifts…</span></div>`);
      } else if (processedShifts.value.length) {
        _push(`<div class="table-card rounded-[1.6rem] overflow-hidden" data-v-d76d9c29><div class="table-summary flex items-center justify-between px-[3rem] py-[2rem] flex-wrap gap-[1.6rem] max-[768px]:px-[1.6rem] max-[768px]:py-[1.4rem]" data-v-d76d9c29><div data-v-d76d9c29><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]" data-v-d76d9c29>Period</p><p class="table-text text-[1.4rem] max-[480px]:text-[1.2rem]" data-v-d76d9c29>${ssrInterpolate(startDate.value)} → ${ssrInterpolate(endDate.value)}</p></div><div class="search-wrapper relative flex-1 max-w-[32rem] max-[480px]:max-w-full max-[480px]:w-full" data-v-d76d9c29><div class="search-icon-wrap absolute left-[1.2rem] top-1/2 -translate-y-1/2 pointer-events-none" data-v-d76d9c29><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" data-v-d76d9c29></path></svg></div><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search by name or email…" class="search-input w-full pl-[3.8rem] pr-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200" data-v-d76d9c29></div><div class="text-right" data-v-d76d9c29><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]" data-v-d76d9c29>Shifts</p><p class="page-title text-[2.4rem] leading-none tabular-nums" data-v-d76d9c29>${ssrInterpolate(processedShifts.value.length)}</p></div></div><table class="w-full max-[768px]:hidden" data-v-d76d9c29><thead data-v-d76d9c29><tr class="table-head-row" data-v-d76d9c29><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none" data-v-d76d9c29><span class="flex items-center gap-[0.5rem]" data-v-d76d9c29>Employee `);
        _push(ssrRenderComponent(_component_sort_arrow, {
          active: sortKey.value === "employee",
          desc: sortDirection.value === "desc"
        }, null, _parent));
        _push(`</span></th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none" data-v-d76d9c29><span class="flex items-center gap-[0.5rem]" data-v-d76d9c29>Email `);
        _push(ssrRenderComponent(_component_sort_arrow, {
          active: sortKey.value === "email",
          desc: sortDirection.value === "desc"
        }, null, _parent));
        _push(`</span></th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none" data-v-d76d9c29><span class="flex items-center gap-[0.5rem]" data-v-d76d9c29>Date `);
        _push(ssrRenderComponent(_component_sort_arrow, {
          active: sortKey.value === "date",
          desc: sortDirection.value === "desc"
        }, null, _parent));
        _push(`</span></th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none" data-v-d76d9c29><span class="flex items-center gap-[0.5rem]" data-v-d76d9c29>Start `);
        _push(ssrRenderComponent(_component_sort_arrow, {
          active: sortKey.value === "start",
          desc: sortDirection.value === "desc"
        }, null, _parent));
        _push(`</span></th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none" data-v-d76d9c29><span class="flex items-center gap-[0.5rem]" data-v-d76d9c29>End `);
        _push(ssrRenderComponent(_component_sort_arrow, {
          active: sortKey.value === "end",
          desc: sortDirection.value === "desc"
        }, null, _parent));
        _push(`</span></th><th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-d76d9c29>Actions</th></tr></thead><tbody data-v-d76d9c29><!--[-->`);
        ssrRenderList(processedShifts.value, (shift, i) => {
          _push(`<tr class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "table-row"])}" data-v-d76d9c29><td class="px-[3rem] py-[1.6rem]" data-v-d76d9c29><div class="flex items-center gap-[1.2rem]" data-v-d76d9c29><div class="emp-avatar w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center text-[1.1rem] text-white flex-shrink-0" data-v-d76d9c29>${ssrInterpolate(shift.company_user.user.first_name?.[0]?.toUpperCase())}</div><span class="table-text text-[1.3rem]" data-v-d76d9c29>${ssrInterpolate(shift.company_user.user.first_name)} ${ssrInterpolate(shift.company_user.user.last_name)}</span></div></td><td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]" data-v-d76d9c29>${ssrInterpolate(shift.company_user.user.email)}</td><td class="px-[3rem] py-[1.6rem]" data-v-d76d9c29>`);
          if (editingId.value !== shift.id) {
            _push(`<span class="table-text text-[1.3rem]" data-v-d76d9c29>${ssrInterpolate(new Date(shift.shift_date).toLocaleDateString("en-GB"))}</span>`);
          } else {
            _push(`<input type="date"${ssrRenderAttr("value", editForm.value.shift_date)} class="date-input rounded-[0.6rem] px-[1rem] py-[0.6rem] text-[1.2rem] outline-none" data-v-d76d9c29>`);
          }
          _push(`</td><td class="px-[3rem] py-[1.6rem]" data-v-d76d9c29>`);
          if (editingId.value !== shift.id) {
            _push(`<span class="table-text text-[1.3rem] tabular-nums" data-v-d76d9c29>${ssrInterpolate(shift.starts_at)}</span>`);
          } else {
            _push(`<input type="time"${ssrRenderAttr("value", editForm.value.starts_at)} class="date-input rounded-[0.6rem] px-[1rem] py-[0.6rem] text-[1.2rem] outline-none" data-v-d76d9c29>`);
          }
          _push(`</td><td class="px-[3rem] py-[1.6rem]" data-v-d76d9c29>`);
          if (editingId.value !== shift.id) {
            _push(`<span class="table-text text-[1.3rem] tabular-nums" data-v-d76d9c29>${ssrInterpolate(shift.ends_at)}</span>`);
          } else {
            _push(`<input type="time"${ssrRenderAttr("value", editForm.value.ends_at)} class="date-input rounded-[0.6rem] px-[1rem] py-[0.6rem] text-[1.2rem] outline-none" data-v-d76d9c29>`);
          }
          _push(`</td><td class="px-[3rem] py-[1.6rem]" data-v-d76d9c29><div class="flex items-center justify-end gap-[0.8rem]" data-v-d76d9c29>`);
          if (editingId.value !== shift.id) {
            _push(`<!--[--><button class="action-btn edit-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]" data-v-d76d9c29><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" data-v-d76d9c29></path></svg> Edit </button><button class="action-btn delete-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]" data-v-d76d9c29><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-d76d9c29></path></svg> Delete </button><!--]-->`);
          } else {
            _push(`<!--[--><button class="action-btn confirm-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]" data-v-d76d9c29><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" data-v-d76d9c29></path></svg> Confirm </button><button class="action-btn cancel-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]" data-v-d76d9c29><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-d76d9c29></path></svg> Cancel </button><!--]-->`);
          }
          _push(`</div></td></tr>`);
        });
        _push(`<!--]--></tbody><tfoot data-v-d76d9c29><tr class="table-foot-row" data-v-d76d9c29><td colspan="5" class="px-[3rem] py-[1.8rem] text-[1.1rem] tracking-[0.12em] uppercase text-right table-sub" data-v-d76d9c29>Total Shifts</td><td class="px-[3rem] py-[1.8rem] text-[1.8rem] text-right tabular-nums font-medium page-title" data-v-d76d9c29>${ssrInterpolate(processedShifts.value.length)}</td></tr></tfoot></table><div class="hidden max-[768px]:block" data-v-d76d9c29><div class="sort-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1.2rem] overflow-x-auto" data-v-d76d9c29><span class="page-label text-[1rem] tracking-[0.15em] uppercase flex-shrink-0" data-v-d76d9c29>Sort:</span><!--[-->`);
        ssrRenderList(mobileSortCols, (col) => {
          _push(`<button class="${ssrRenderClass([sortKey.value === col.key ? "sort-chip-active" : "", "sort-chip flex items-center gap-[0.4rem] px-[1rem] py-[0.5rem] rounded-full text-[1.1rem] flex-shrink-0 transition-all duration-150"])}" data-v-d76d9c29>${ssrInterpolate(col.label)} `);
          if (sortKey.value === col.key) {
            _push(`<svg class="w-[1rem] h-[1rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round"${ssrRenderAttr("d", sortDirection.value === "asc" ? "M4.5 15.75l7.5-7.5 7.5 7.5" : "M19.5 8.25l-7.5 7.5-7.5-7.5")} data-v-d76d9c29></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div><div class="flex flex-col divide-y divide-[var(--border)]" data-v-d76d9c29><!--[-->`);
        ssrRenderList(processedShifts.value, (shift) => {
          _push(`<div class="shift-card px-[1.6rem] py-[1.8rem]" data-v-d76d9c29><div class="flex items-center justify-between gap-[1.2rem] mb-[1.2rem]" data-v-d76d9c29><div class="flex items-center gap-[1.2rem] min-w-0" data-v-d76d9c29><div class="emp-avatar w-[3.6rem] h-[3.6rem] rounded-full flex items-center justify-center text-[1.3rem] text-white flex-shrink-0" data-v-d76d9c29>${ssrInterpolate(shift.company_user.user.first_name?.[0]?.toUpperCase())}</div><div class="min-w-0" data-v-d76d9c29><p class="table-text text-[1.4rem] font-medium truncate" data-v-d76d9c29>${ssrInterpolate(shift.company_user.user.first_name)} ${ssrInterpolate(shift.company_user.user.last_name)}</p><p class="table-sub text-[1.1rem] truncate" data-v-d76d9c29>${ssrInterpolate(shift.company_user.user.email)}</p></div></div><span class="date-badge flex-shrink-0 text-[1.1rem] px-[1rem] py-[0.3rem] rounded-full tabular-nums" data-v-d76d9c29>${ssrInterpolate(new Date(shift.shift_date).toLocaleDateString("en-GB"))}</span></div>`);
          if (editingId.value === shift.id) {
            _push(`<div class="flex flex-col gap-[1rem] mb-[1.2rem]" data-v-d76d9c29><div class="flex items-center gap-[1rem]" data-v-d76d9c29><label class="page-label text-[1rem] tracking-[0.15em] uppercase w-[8rem] flex-shrink-0" data-v-d76d9c29>Date</label><input type="date"${ssrRenderAttr("value", editForm.value.shift_date)} class="date-input rounded-[0.6rem] px-[1rem] py-[0.7rem] text-[1.3rem] outline-none flex-1" data-v-d76d9c29></div><div class="flex items-center gap-[1rem]" data-v-d76d9c29><label class="page-label text-[1rem] tracking-[0.15em] uppercase w-[8rem] flex-shrink-0" data-v-d76d9c29>Start</label><input type="time"${ssrRenderAttr("value", editForm.value.starts_at)} class="date-input rounded-[0.6rem] px-[1rem] py-[0.7rem] text-[1.3rem] outline-none flex-1" data-v-d76d9c29></div><div class="flex items-center gap-[1rem]" data-v-d76d9c29><label class="page-label text-[1rem] tracking-[0.15em] uppercase w-[8rem] flex-shrink-0" data-v-d76d9c29>End</label><input type="time"${ssrRenderAttr("value", editForm.value.ends_at)} class="date-input rounded-[0.6rem] px-[1rem] py-[0.7rem] text-[1.3rem] outline-none flex-1" data-v-d76d9c29></div></div>`);
          } else {
            _push(`<div class="flex items-center gap-[1.6rem] mb-[1.2rem]" data-v-d76d9c29><div class="flex items-center gap-[0.6rem]" data-v-d76d9c29><svg class="w-[1.2rem] h-[1.2rem] flex-shrink-0" style="${ssrRenderStyle({ "color": "var(--text-muted)" })}" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d76d9c29></path></svg><span class="table-text text-[1.3rem] tabular-nums" data-v-d76d9c29>${ssrInterpolate(shift.starts_at)}</span></div><span class="table-sub text-[1.1rem]" data-v-d76d9c29>→</span><span class="table-text text-[1.3rem] tabular-nums" data-v-d76d9c29>${ssrInterpolate(shift.ends_at)}</span></div>`);
          }
          _push(`<div class="flex items-center gap-[0.8rem]" data-v-d76d9c29>`);
          if (editingId.value !== shift.id) {
            _push(`<!--[--><button class="action-btn edit-btn flex-1 flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem]" data-v-d76d9c29><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" data-v-d76d9c29></path></svg> Edit </button><button class="action-btn delete-btn flex-1 flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem]" data-v-d76d9c29><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-d76d9c29></path></svg> Delete </button><!--]-->`);
          } else {
            _push(`<!--[--><button class="action-btn confirm-btn flex-1 flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem]" data-v-d76d9c29><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" data-v-d76d9c29></path></svg> Confirm </button><button class="action-btn cancel-btn flex-1 flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem]" data-v-d76d9c29><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-d76d9c29></path></svg> Cancel </button><!--]-->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--><div class="flex items-center justify-between px-[1.6rem] py-[1.4rem] table-foot-row" data-v-d76d9c29><span class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-d76d9c29>Total Shifts</span><span class="page-title text-[2rem] tabular-nums font-medium" data-v-d76d9c29>${ssrInterpolate(processedShifts.value.length)}</span></div></div></div></div>`);
      } else if (!loading.value) {
        _push(`<div class="flex flex-col items-center justify-center py-[8rem] text-center" data-v-d76d9c29><div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]" data-v-d76d9c29><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-d76d9c29><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" data-v-d76d9c29></path></svg></div><p class="table-sub text-[1.4rem] tracking-[0.06em]" data-v-d76d9c29>No shifts found for this period.</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[companyId]/manager/schedule.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const schedule = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d76d9c29"]]);

export { schedule as default };
//# sourceMappingURL=schedule-B4cwQwvv.mjs.map
