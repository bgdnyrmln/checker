import { _ as __nuxt_component_0 } from './sidebar-C8UFdBSQ.mjs';
import { ref, computed, resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
  __name: "team",
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
    const loading = ref(false);
    const error = ref("");
    const editingId = ref(null);
    const editForm = ref({ hourly_pay: 0, role: "employee" });
    const searchQuery = ref("");
    const sortKey = ref("");
    const sortDirection = ref("asc");
    const mobileSortCols = [
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
      { key: "hourly_pay", label: "Pay" }
    ];
    const filteredEmployees = computed(() => {
      let data = [...employees.value];
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        data = data.filter(
          (emp) => `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(q) || emp.email.toLowerCase().includes(q)
        );
      }
      if (sortKey.value) {
        data.sort((a, b) => {
          let aVal = a[sortKey.value];
          let bVal = b[sortKey.value];
          if (typeof aVal === "string") aVal = aVal.toLowerCase();
          if (typeof bVal === "string") bVal = bVal.toLowerCase();
          if (aVal < bVal) return sortDirection.value === "asc" ? -1 : 1;
          if (aVal > bVal) return sortDirection.value === "asc" ? 1 : -1;
          return 0;
        });
      }
      return data;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      const _component_sort_icon = resolveComponent("sort-icon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper flex" }, _attrs))} data-v-f0760dfa>`);
      _push(ssrRenderComponent(_component_Sidebar, { items: sidebarItems }, null, _parent));
      _push(`<main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden" data-v-f0760dfa><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-f0760dfa></div><div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none" data-v-f0760dfa></div><div class="relative z-10 max-w-[120rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[1.6rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]" data-v-f0760dfa><div class="mb-[4rem] max-[768px]:mb-[2.4rem]" data-v-f0760dfa><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]" data-v-f0760dfa>Manager Panel</p><h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide" data-v-f0760dfa>Company Team</h1></div>`);
      if (error.value) {
        _push(`<div class="error-pill flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] mb-[2.4rem] text-[1.3rem]" data-v-f0760dfa><svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-f0760dfa><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" data-v-f0760dfa></path></svg> ${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="table-card rounded-[1.6rem] overflow-hidden" data-v-f0760dfa><div class="table-summary flex items-center justify-between px-[3rem] py-[2rem] gap-[2rem] flex-wrap max-[768px]:px-[1.6rem] max-[768px]:py-[1.6rem]" data-v-f0760dfa><div data-v-f0760dfa><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]" data-v-f0760dfa>Members</p><p class="table-text text-[1.4rem]" data-v-f0760dfa>`);
      if (loading.value) {
        _push(`<span data-v-f0760dfa>Loading…</span>`);
      } else {
        _push(`<span data-v-f0760dfa>${ssrInterpolate(filteredEmployees.value.length)} ${ssrInterpolate(filteredEmployees.value.length === 1 ? "employee" : "employees")}</span>`);
      }
      _push(`</p></div><div class="search-wrapper relative flex-1 max-w-[32rem] max-[480px]:max-w-full max-[480px]:w-full" data-v-f0760dfa><div class="search-icon absolute left-[1.2rem] top-1/2 -translate-y-1/2 pointer-events-none" data-v-f0760dfa><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-f0760dfa><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" data-v-f0760dfa></path></svg></div><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search by name or email…" class="search-input w-full pl-[3.8rem] pr-[1.4rem] py-[1rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200" data-v-f0760dfa></div></div>`);
      if (loading.value) {
        _push(`<div class="px-[3rem] py-[4rem] flex flex-col gap-[1.6rem] max-[768px]:px-[1.6rem]" data-v-f0760dfa><!--[-->`);
        ssrRenderList(4, (i) => {
          _push(`<div class="skeleton-row rounded-[0.8rem] h-[4.8rem]" data-v-f0760dfa></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value) {
        _push(`<table class="w-full max-[768px]:hidden" data-v-f0760dfa><thead data-v-f0760dfa><tr class="table-head-row" data-v-f0760dfa><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none" data-v-f0760dfa><span class="flex items-center gap-[0.6rem]" data-v-f0760dfa>Name `);
        _push(ssrRenderComponent(_component_sort_icon, {
          active: sortKey.value === "name",
          dir: sortDirection.value
        }, null, _parent));
        _push(`</span></th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none" data-v-f0760dfa><span class="flex items-center gap-[0.6rem]" data-v-f0760dfa>Email `);
        _push(ssrRenderComponent(_component_sort_icon, {
          active: sortKey.value === "email",
          dir: sortDirection.value
        }, null, _parent));
        _push(`</span></th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none" data-v-f0760dfa><span class="flex items-center gap-[0.6rem]" data-v-f0760dfa>Role `);
        _push(ssrRenderComponent(_component_sort_icon, {
          active: sortKey.value === "role",
          dir: sortDirection.value
        }, null, _parent));
        _push(`</span></th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal cursor-pointer select-none" data-v-f0760dfa><span class="flex items-center gap-[0.6rem]" data-v-f0760dfa>Hourly Pay `);
        _push(ssrRenderComponent(_component_sort_icon, {
          active: sortKey.value === "hourly_pay",
          dir: sortDirection.value
        }, null, _parent));
        _push(`</span></th><th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-f0760dfa>Actions</th></tr></thead><tbody data-v-f0760dfa><!--[-->`);
        ssrRenderList(filteredEmployees.value, (employee, i) => {
          _push(`<tr class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "table-row"])}" data-v-f0760dfa><td class="px-[3rem] py-[1.6rem]" data-v-f0760dfa><div class="flex items-center gap-[1.2rem]" data-v-f0760dfa><div class="emp-avatar w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center text-[1.1rem] text-white flex-shrink-0" data-v-f0760dfa>${ssrInterpolate(employee.first_name?.[0]?.toUpperCase())}</div><span class="table-text text-[1.3rem]" data-v-f0760dfa>${ssrInterpolate(employee.first_name)} ${ssrInterpolate(employee.last_name)}</span></div></td><td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem]" data-v-f0760dfa>${ssrInterpolate(employee.email)}</td><td class="px-[3rem] py-[1.6rem]" data-v-f0760dfa>`);
          if (editingId.value === employee.id) {
            _push(`<div data-v-f0760dfa><select class="field-select rounded-[0.6rem] px-[1rem] py-[0.6rem] text-[1.2rem] outline-none" data-v-f0760dfa><option value="employee" data-v-f0760dfa${ssrIncludeBooleanAttr(Array.isArray(editForm.value.role) ? ssrLooseContain(editForm.value.role, "employee") : ssrLooseEqual(editForm.value.role, "employee")) ? " selected" : ""}>Employee</option><option value="manager" data-v-f0760dfa${ssrIncludeBooleanAttr(Array.isArray(editForm.value.role) ? ssrLooseContain(editForm.value.role, "manager") : ssrLooseEqual(editForm.value.role, "manager")) ? " selected" : ""}>Manager</option></select></div>`);
          } else {
            _push(`<span data-v-f0760dfa><span class="${ssrRenderClass([employee.role === "manager" ? "badge-manager" : "badge-employee", "role-badge text-[1.1rem] px-[1rem] py-[0.3rem] rounded-full capitalize"])}" data-v-f0760dfa>${ssrInterpolate(employee.role)}</span></span>`);
          }
          _push(`</td><td class="px-[3rem] py-[1.6rem]" data-v-f0760dfa>`);
          if (editingId.value === employee.id) {
            _push(`<div data-v-f0760dfa><input${ssrRenderAttr("value", editForm.value.hourly_pay)} type="number" step="0.01" class="field-input rounded-[0.6rem] px-[1rem] py-[0.6rem] text-[1.2rem] w-[9rem] outline-none tabular-nums" data-v-f0760dfa></div>`);
          } else {
            _push(`<span class="table-text text-[1.3rem] tabular-nums" data-v-f0760dfa>$${ssrInterpolate(employee.hourly_pay)}</span>`);
          }
          _push(`</td><td class="px-[3rem] py-[1.6rem]" data-v-f0760dfa><div class="flex items-center justify-end gap-[0.8rem]" data-v-f0760dfa>`);
          if (editingId.value !== employee.id) {
            _push(`<!--[--><button class="action-btn edit-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-150" data-v-f0760dfa><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-f0760dfa><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" data-v-f0760dfa></path></svg> Edit </button><button class="action-btn delete-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-150" data-v-f0760dfa><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-f0760dfa><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-f0760dfa></path></svg> Delete </button><!--]-->`);
          } else {
            _push(`<!--[--><button class="action-btn confirm-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-150" data-v-f0760dfa><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-f0760dfa><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" data-v-f0760dfa></path></svg> Confirm </button><button class="action-btn cancel-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-150" data-v-f0760dfa><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-f0760dfa><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-f0760dfa></path></svg> Cancel </button><!--]-->`);
          }
          _push(`</div></td></tr>`);
        });
        _push(`<!--]-->`);
        if (!filteredEmployees.value.length) {
          _push(`<tr data-v-f0760dfa><td colspan="5" class="px-[3rem] py-[5rem] text-center" data-v-f0760dfa><div class="flex flex-col items-center gap-[1.2rem]" data-v-f0760dfa><div class="icon-badge w-[4.8rem] h-[4.8rem] rounded-[1.2rem] flex items-center justify-center mx-auto" data-v-f0760dfa><svg class="w-[2rem] h-[2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-f0760dfa><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" data-v-f0760dfa></path></svg></div><p class="table-sub text-[1.3rem]" data-v-f0760dfa>No employees found.</p></div></td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tbody></table>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value) {
        _push(`<div class="hidden max-[768px]:block" data-v-f0760dfa><div class="sort-bar flex items-center gap-[0.8rem] px-[1.6rem] py-[1.2rem] overflow-x-auto" data-v-f0760dfa><span class="page-label text-[1rem] tracking-[0.15em] uppercase flex-shrink-0" data-v-f0760dfa>Sort:</span><!--[-->`);
        ssrRenderList(mobileSortCols, (col) => {
          _push(`<button class="${ssrRenderClass([sortKey.value === col.key ? "sort-chip-active" : "", "sort-chip flex items-center gap-[0.4rem] px-[1rem] py-[0.5rem] rounded-full text-[1.1rem] flex-shrink-0 transition-all duration-150"])}" data-v-f0760dfa>${ssrInterpolate(col.label)} `);
          if (sortKey.value === col.key) {
            _push(`<svg class="w-[1rem] h-[1rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-f0760dfa><path stroke-linecap="round" stroke-linejoin="round"${ssrRenderAttr("d", sortDirection.value === "asc" ? "M4.5 15.75l7.5-7.5 7.5 7.5" : "M19.5 8.25l-7.5 7.5-7.5-7.5")} data-v-f0760dfa></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div><div class="flex flex-col divide-y divide-[var(--border)]" data-v-f0760dfa><!--[-->`);
        ssrRenderList(filteredEmployees.value, (employee) => {
          _push(`<div class="emp-card px-[1.6rem] py-[1.8rem]" data-v-f0760dfa><div class="flex items-center justify-between gap-[1.2rem] mb-[1.4rem]" data-v-f0760dfa><div class="flex items-center gap-[1.2rem] min-w-0" data-v-f0760dfa><div class="emp-avatar w-[3.6rem] h-[3.6rem] rounded-full flex items-center justify-center text-[1.3rem] text-white flex-shrink-0" data-v-f0760dfa>${ssrInterpolate(employee.first_name?.[0]?.toUpperCase())}</div><div class="min-w-0" data-v-f0760dfa><p class="table-text text-[1.4rem] font-medium truncate" data-v-f0760dfa>${ssrInterpolate(employee.first_name)} ${ssrInterpolate(employee.last_name)}</p><p class="table-sub text-[1.1rem] truncate" data-v-f0760dfa>${ssrInterpolate(employee.email)}</p></div></div><span class="${ssrRenderClass([employee.role === "manager" ? "badge-manager" : "badge-employee", "role-badge text-[1.05rem] px-[1rem] py-[0.3rem] rounded-full capitalize flex-shrink-0"])}" data-v-f0760dfa>${ssrInterpolate(employee.role)}</span></div>`);
          if (editingId.value === employee.id) {
            _push(`<div class="flex flex-col gap-[1rem] mb-[1.4rem]" data-v-f0760dfa><div class="flex items-center gap-[1rem]" data-v-f0760dfa><label class="page-label text-[1rem] tracking-[0.15em] uppercase w-[9rem] flex-shrink-0" data-v-f0760dfa>Role</label><select class="field-select rounded-[0.6rem] px-[1rem] py-[0.7rem] text-[1.3rem] outline-none flex-1" data-v-f0760dfa><option value="employee" data-v-f0760dfa${ssrIncludeBooleanAttr(Array.isArray(editForm.value.role) ? ssrLooseContain(editForm.value.role, "employee") : ssrLooseEqual(editForm.value.role, "employee")) ? " selected" : ""}>Employee</option><option value="manager" data-v-f0760dfa${ssrIncludeBooleanAttr(Array.isArray(editForm.value.role) ? ssrLooseContain(editForm.value.role, "manager") : ssrLooseEqual(editForm.value.role, "manager")) ? " selected" : ""}>Manager</option></select></div><div class="flex items-center gap-[1rem]" data-v-f0760dfa><label class="page-label text-[1rem] tracking-[0.15em] uppercase w-[9rem] flex-shrink-0" data-v-f0760dfa>Hourly Pay</label><input${ssrRenderAttr("value", editForm.value.hourly_pay)} type="number" step="0.01" class="field-input rounded-[0.6rem] px-[1rem] py-[0.7rem] text-[1.3rem] outline-none tabular-nums flex-1" data-v-f0760dfa></div></div>`);
          } else {
            _push(`<div class="flex items-center gap-[0.6rem] mb-[1.4rem]" data-v-f0760dfa><span class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-f0760dfa>Hourly Pay:</span><span class="table-text text-[1.3rem] tabular-nums font-medium" data-v-f0760dfa>$${ssrInterpolate(employee.hourly_pay)}</span></div>`);
          }
          _push(`<div class="flex items-center gap-[0.8rem]" data-v-f0760dfa>`);
          if (editingId.value !== employee.id) {
            _push(`<!--[--><button class="action-btn edit-btn flex-1 flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-150" data-v-f0760dfa><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-f0760dfa><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" data-v-f0760dfa></path></svg> Edit </button><button class="action-btn delete-btn flex-1 flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-150" data-v-f0760dfa><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-f0760dfa><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-f0760dfa></path></svg> Delete </button><!--]-->`);
          } else {
            _push(`<!--[--><button class="action-btn confirm-btn flex-1 flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-150" data-v-f0760dfa><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-f0760dfa><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" data-v-f0760dfa></path></svg> Confirm </button><button class="action-btn cancel-btn flex-1 flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-150" data-v-f0760dfa><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-f0760dfa><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-f0760dfa></path></svg> Cancel </button><!--]-->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]-->`);
        if (!filteredEmployees.value.length) {
          _push(`<div class="px-[1.6rem] py-[5rem] text-center" data-v-f0760dfa><div class="flex flex-col items-center gap-[1.2rem]" data-v-f0760dfa><div class="icon-badge w-[4.8rem] h-[4.8rem] rounded-[1.2rem] flex items-center justify-center mx-auto" data-v-f0760dfa><svg class="w-[2rem] h-[2rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-f0760dfa><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" data-v-f0760dfa></path></svg></div><p class="table-sub text-[1.3rem]" data-v-f0760dfa>No employees found.</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[companyId]/manager/team.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const team = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f0760dfa"]]);

export { team as default };
//# sourceMappingURL=team-UETBj_TC.mjs.map
