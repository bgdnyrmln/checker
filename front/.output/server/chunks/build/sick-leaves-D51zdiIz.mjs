import { _ as __nuxt_component_0 } from './sidebar-C8UFdBSQ.mjs';
import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
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
    const sickLeaves2 = ref([]);
    const loading = ref(false);
    const error = ref("");
    const searchQuery = ref("");
    const filterDoc = ref("");
    const processedSickLeaves = computed(() => {
      let data = [...sickLeaves2.value];
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        data = data.filter(
          (s) => `${s.profile?.first_name} ${s.profile?.last_name}`.toLowerCase().includes(q)
        );
      }
      if (filterDoc.value === "with") data = data.filter((s) => s.has_file);
      if (filterDoc.value === "without") data = data.filter((s) => !s.has_file);
      return data;
    });
    const withDocCount = computed(() => sickLeaves2.value.filter((s) => s.has_file).length);
    const withoutDocCount = computed(() => sickLeaves2.value.filter((s) => !s.has_file).length);
    const daysBetween = (start, end) => {
      const diff = new Date(end) - new Date(start);
      return Math.ceil(diff / (1e3 * 60 * 60 * 24));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper flex" }, _attrs))} data-v-18e3387a>`);
      _push(ssrRenderComponent(_component_Sidebar, { items: sidebarItems }, null, _parent));
      _push(`<main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden" data-v-18e3387a><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-18e3387a></div><div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none" data-v-18e3387a></div><div class="relative z-10 max-w-[120rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[1.6rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]" data-v-18e3387a><div class="mb-[4rem] max-[768px]:mb-[2.4rem]" data-v-18e3387a><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]" data-v-18e3387a>Manager Panel</p><h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide" data-v-18e3387a>Sick Leave Records</h1></div>`);
      if (error.value) {
        _push(`<div class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]" data-v-18e3387a><svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-18e3387a><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z" data-v-18e3387a></path></svg> ${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="filter-card rounded-[1.6rem] p-[2.4rem] mb-[2rem] max-[768px]:p-[1.6rem]" data-v-18e3387a><div class="flex flex-wrap items-end gap-[1.6rem] max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-[1.2rem]" data-v-18e3387a><div class="flex flex-col gap-[0.4rem] flex-1 min-w-[20rem] max-[768px]:min-w-0" data-v-18e3387a><label class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-18e3387a>Search</label><div class="relative" data-v-18e3387a><div class="absolute left-[1.2rem] top-1/2 -translate-y-1/2 pointer-events-none search-icon" data-v-18e3387a><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-18e3387a><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" data-v-18e3387a></path></svg></div><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search by employee name…" class="date-input w-full pl-[3.8rem] pr-[1.4rem] py-[0.9rem] rounded-[0.8rem] text-[1.3rem] outline-none transition-all duration-200" data-v-18e3387a></div></div><div class="flex items-center gap-[1.6rem] max-[768px]:flex-wrap max-[768px]:gap-[1rem]" data-v-18e3387a><button class="calc-btn relative flex items-center gap-[0.8rem] px-[2rem] py-[1rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200" data-v-18e3387a><svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-18e3387a><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" data-v-18e3387a></path></svg> Refresh <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-18e3387a></span></button><div class="flex items-center gap-[0.8rem]" data-v-18e3387a><button class="${ssrRenderClass([filterDoc.value === "" ? "pill-active" : "pill-inactive", "filter-pill text-[1.1rem] px-[1.4rem] py-[0.6rem] rounded-full transition-all duration-150"])}" data-v-18e3387a>All</button><button class="${ssrRenderClass([filterDoc.value === "with" ? "pill-active" : "pill-inactive", "filter-pill text-[1.1rem] px-[1.4rem] py-[0.6rem] rounded-full transition-all duration-150"])}" data-v-18e3387a>With Doc</button><button class="${ssrRenderClass([filterDoc.value === "without" ? "pill-active" : "pill-inactive", "filter-pill text-[1.1rem] px-[1.4rem] py-[0.6rem] rounded-full transition-all duration-150"])}" data-v-18e3387a>No Doc</button></div></div></div></div>`);
      if (loading.value) {
        _push(`<div class="flex items-center gap-[1.6rem] py-[4rem] justify-center" data-v-18e3387a><div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin" data-v-18e3387a></div><span class="page-label text-[1.2rem] tracking-[0.12em]" data-v-18e3387a>Loading sick leaves…</span></div>`);
      } else if (processedSickLeaves.value.length) {
        _push(`<div class="table-card rounded-[1.6rem] overflow-hidden" data-v-18e3387a><div class="table-summary flex items-center justify-between px-[3rem] py-[2rem] max-[768px]:px-[1.6rem] max-[768px]:py-[1.4rem] flex-wrap gap-[1.2rem]" data-v-18e3387a><div data-v-18e3387a><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]" data-v-18e3387a>Records</p><p class="table-text text-[1.4rem]" data-v-18e3387a>${ssrInterpolate(processedSickLeaves.value.length)} ${ssrInterpolate(processedSickLeaves.value.length === 1 ? "record" : "records")}</p></div><div class="flex items-center gap-[1.2rem]" data-v-18e3387a><div class="stat-chip flex flex-col items-center px-[1.6rem] py-[0.8rem] rounded-[0.8rem]" data-v-18e3387a><p class="page-label text-[0.9rem] tracking-[0.15em] uppercase mb-[0.1rem]" data-v-18e3387a>With Doc</p><p class="page-title text-[1.8rem] leading-none tabular-nums" data-v-18e3387a>${ssrInterpolate(withDocCount.value)}</p></div><div class="stat-chip no-doc-chip flex flex-col items-center px-[1.6rem] py-[0.8rem] rounded-[0.8rem]" data-v-18e3387a><p class="no-doc-label text-[0.9rem] tracking-[0.15em] uppercase mb-[0.1rem]" data-v-18e3387a>No Doc</p><p class="no-doc-value text-[1.8rem] leading-none tabular-nums" data-v-18e3387a>${ssrInterpolate(withoutDocCount.value)}</p></div></div></div><table class="w-full max-[768px]:hidden" data-v-18e3387a><thead data-v-18e3387a><tr class="table-head-row" data-v-18e3387a><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-18e3387a>Employee</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-18e3387a>Start</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-18e3387a>End</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-18e3387a>Duration</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-18e3387a>Document</th><th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-18e3387a>Actions</th></tr></thead><tbody data-v-18e3387a><!--[-->`);
        ssrRenderList(processedSickLeaves.value, (s, i) => {
          _push(`<tr class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "table-row"])}" data-v-18e3387a><td class="px-[3rem] py-[1.6rem]" data-v-18e3387a><div class="flex items-center gap-[1.2rem]" data-v-18e3387a><div class="emp-avatar w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center text-[1.1rem] text-white flex-shrink-0" data-v-18e3387a>${ssrInterpolate(s.profile?.first_name?.[0]?.toUpperCase())}</div><span class="table-text text-[1.3rem]" data-v-18e3387a>${ssrInterpolate(s.profile?.first_name)} ${ssrInterpolate(s.profile?.last_name)}</span></div></td><td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums whitespace-nowrap" data-v-18e3387a>${ssrInterpolate(s.date_start)}</td><td class="${ssrRenderClass([s.date_end ? "table-text" : "table-empty", "px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums whitespace-nowrap"])}" data-v-18e3387a>${ssrInterpolate(s.date_end ?? "—")}</td><td class="px-[3rem] py-[1.6rem]" data-v-18e3387a>`);
          if (s.date_end) {
            _push(`<span class="duration-badge text-[1.1rem] px-[1rem] py-[0.3rem] rounded-full tabular-nums" data-v-18e3387a>${ssrInterpolate(daysBetween(s.date_start, s.date_end))}d</span>`);
          } else {
            _push(`<span class="table-empty text-[1.2rem]" data-v-18e3387a>Ongoing</span>`);
          }
          _push(`</td><td class="px-[3rem] py-[1.6rem]" data-v-18e3387a>`);
          if (s.has_file) {
            _push(`<button class="doc-btn flex items-center gap-[0.6rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem] transition-all duration-150" data-v-18e3387a><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-18e3387a><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" data-v-18e3387a></path></svg> View File </button>`);
          } else {
            _push(`<span class="no-file-badge flex items-center gap-[0.5rem] text-[1.1rem]" data-v-18e3387a><svg class="w-[1.1rem] h-[1.1rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-18e3387a><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" data-v-18e3387a></path></svg> No file </span>`);
          }
          _push(`</td><td class="px-[3rem] py-[1.6rem]" data-v-18e3387a><div class="flex items-center justify-end" data-v-18e3387a><button class="action-btn delete-btn flex items-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem]" data-v-18e3387a><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-18e3387a><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-18e3387a></path></svg> Delete </button></div></td></tr>`);
        });
        _push(`<!--]--></tbody><tfoot data-v-18e3387a><tr class="table-foot-row" data-v-18e3387a><td colspan="5" class="px-[3rem] py-[1.8rem] text-[1.1rem] tracking-[0.12em] uppercase text-right table-sub" data-v-18e3387a>Total Records</td><td class="px-[3rem] py-[1.8rem] text-[1.8rem] text-right tabular-nums font-medium page-title" data-v-18e3387a>${ssrInterpolate(processedSickLeaves.value.length)}</td></tr></tfoot></table><div class="hidden max-[768px]:block divide-y divide-[var(--border)]" data-v-18e3387a><!--[-->`);
        ssrRenderList(processedSickLeaves.value, (s, i) => {
          _push(`<div class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "sick-card px-[1.6rem] py-[1.8rem]"])}" data-v-18e3387a><div class="flex items-center justify-between gap-[1.2rem] mb-[1.2rem]" data-v-18e3387a><div class="flex items-center gap-[1.2rem] min-w-0" data-v-18e3387a><div class="emp-avatar w-[3.6rem] h-[3.6rem] rounded-full flex items-center justify-center text-[1.3rem] text-white flex-shrink-0" data-v-18e3387a>${ssrInterpolate(s.profile?.first_name?.[0]?.toUpperCase())}</div><p class="table-text text-[1.4rem] font-medium truncate" data-v-18e3387a>${ssrInterpolate(s.profile?.first_name)} ${ssrInterpolate(s.profile?.last_name)}</p></div>`);
          if (s.date_end) {
            _push(`<span class="duration-badge flex-shrink-0 text-[1.1rem] px-[1rem] py-[0.3rem] rounded-full tabular-nums" data-v-18e3387a>${ssrInterpolate(daysBetween(s.date_start, s.date_end))}d </span>`);
          } else {
            _push(`<span class="table-empty text-[1.1rem] flex-shrink-0" data-v-18e3387a>Ongoing</span>`);
          }
          _push(`</div><div class="flex items-center gap-[1rem] mb-[1.4rem]" data-v-18e3387a><div class="flex items-center gap-[0.5rem]" data-v-18e3387a><svg class="w-[1.2rem] h-[1.2rem] flex-shrink-0" style="${ssrRenderStyle({ "color": "var(--text-muted)" })}" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-18e3387a><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" data-v-18e3387a></path></svg><span class="table-text text-[1.3rem] tabular-nums" data-v-18e3387a>${ssrInterpolate(s.date_start)}</span></div><span class="table-empty text-[1.1rem]" data-v-18e3387a>→</span><span class="${ssrRenderClass([s.date_end ? "table-text" : "table-empty", "text-[1.3rem] tabular-nums"])}" data-v-18e3387a>${ssrInterpolate(s.date_end ?? "—")}</span></div><div class="flex items-center gap-[0.8rem]" data-v-18e3387a>`);
          if (s.has_file) {
            _push(`<button class="doc-btn flex-1 flex items-center justify-center gap-[0.6rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-150" data-v-18e3387a><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-18e3387a><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" data-v-18e3387a></path></svg> View File </button>`);
          } else {
            _push(`<div class="flex-1 flex items-center gap-[0.5rem] px-[1.2rem] py-[0.8rem] no-file-badge text-[1.2rem]" data-v-18e3387a><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-18e3387a><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" data-v-18e3387a></path></svg> No file </div>`);
          }
          _push(`<button class="action-btn delete-btn flex items-center justify-center gap-[0.5rem] px-[1.4rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem]" data-v-18e3387a><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-18e3387a><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-18e3387a></path></svg></button></div></div>`);
        });
        _push(`<!--]--><div class="table-foot-row flex items-center justify-between px-[1.6rem] py-[1.4rem]" data-v-18e3387a><span class="page-label text-[1rem] tracking-[0.15em] uppercase" data-v-18e3387a>Total Records</span><span class="page-title text-[2rem] tabular-nums font-medium" data-v-18e3387a>${ssrInterpolate(processedSickLeaves.value.length)}</span></div></div></div>`);
      } else if (!loading.value) {
        _push(`<div class="flex flex-col items-center justify-center py-[8rem] text-center" data-v-18e3387a><div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]" data-v-18e3387a><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-18e3387a><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" data-v-18e3387a></path></svg></div><p class="table-sub text-[1.4rem] tracking-[0.06em]" data-v-18e3387a>No sick leave records found.</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[companyId]/manager/sick-leaves.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sickLeaves = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-18e3387a"]]);

export { sickLeaves as default };
//# sourceMappingURL=sick-leaves-D51zdiIz.mjs.map
