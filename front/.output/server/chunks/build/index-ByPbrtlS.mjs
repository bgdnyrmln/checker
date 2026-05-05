import { _ as __nuxt_component_0 } from './sidebar-C8UFdBSQ.mjs';
import { _ as _export_sfc, f as useTheme, b as __nuxt_component_0$1 } from './server.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, createBlock, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
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
import 'axios';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const companyId = route.params.companyId;
    useTheme();
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
    const stats = ref({});
    const recentShifts = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper flex min-h-screen" }, _attrs))} data-v-4ce2bf16>`);
      _push(ssrRenderComponent(_component_Sidebar, { items: sidebarItems }, null, _parent));
      _push(`<div class="flex-1 pl-[22rem] max-[768px]:pl-0 relative overflow-hidden" data-v-4ce2bf16><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-4ce2bf16></div><div class="blob blob-2 absolute bottom-[-8rem] left-[10rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none" data-v-4ce2bf16></div><main class="p-[4rem] relative z-10 max-w-[120rem] mx-auto" data-v-4ce2bf16><div class="mb-[4rem]" data-v-4ce2bf16><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]" data-v-4ce2bf16>Manager Panel</p><h1 class="page-title text-[3.6rem] leading-none tracking-wide" data-v-4ce2bf16>Dashboard</h1></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-[2rem] mb-[3.2rem]" data-v-4ce2bf16><div class="stat-card rounded-[1.6rem] p-[3rem] flex flex-col justify-between" data-v-4ce2bf16><div class="flex items-start justify-between mb-[2rem]" data-v-4ce2bf16><p class="card-label text-[1rem] tracking-[0.18em] uppercase" data-v-4ce2bf16>Employees</p><div class="icon-badge w-[3.6rem] h-[3.6rem] rounded-[0.8rem] flex items-center justify-center" data-v-4ce2bf16><svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-4ce2bf16><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" data-v-4ce2bf16></path></svg></div></div><div data-v-4ce2bf16><p class="card-value text-[4.8rem] leading-none tabular-nums mb-[0.4rem]" data-v-4ce2bf16>${ssrInterpolate(stats.value.employees ?? "—")}</p><p class="card-sub text-[1.2rem]" data-v-4ce2bf16>total members</p></div></div><div class="stat-card rounded-[1.6rem] p-[3rem] flex flex-col justify-between" data-v-4ce2bf16><div class="flex items-start justify-between mb-[2rem]" data-v-4ce2bf16><p class="card-label text-[1rem] tracking-[0.18em] uppercase" data-v-4ce2bf16>Shifts This Week</p><div class="icon-badge w-[3.6rem] h-[3.6rem] rounded-[0.8rem] flex items-center justify-center" data-v-4ce2bf16><svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-4ce2bf16><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" data-v-4ce2bf16></path></svg></div></div><div data-v-4ce2bf16><p class="card-value text-[4.8rem] leading-none tabular-nums mb-[0.4rem]" data-v-4ce2bf16>${ssrInterpolate(stats.value.shiftsThisWeek ?? "—")}</p><p class="card-sub text-[1.2rem]" data-v-4ce2bf16>scheduled shifts</p></div><div class="mt-[2rem] progress-track h-[0.4rem] rounded-full overflow-hidden" data-v-4ce2bf16><div class="progress-fill h-full rounded-full transition-all duration-700" style="${ssrRenderStyle(`width: ${Math.min((stats.value.shiftsThisWeek ?? 0) / 50 * 100, 100)}%`)}" data-v-4ce2bf16></div></div><p class="card-label text-[1rem] mt-[0.6rem]" data-v-4ce2bf16>of 50 shift target</p></div><div class="stat-card rounded-[1.6rem] p-[3rem] flex flex-col justify-between" data-v-4ce2bf16><div class="flex items-start justify-between mb-[2rem]" data-v-4ce2bf16><p class="card-label text-[1rem] tracking-[0.18em] uppercase" data-v-4ce2bf16>Attendance Today</p><div class="icon-badge w-[3.6rem] h-[3.6rem] rounded-[0.8rem] flex items-center justify-center" data-v-4ce2bf16><svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-4ce2bf16><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-4ce2bf16></path></svg></div></div><div data-v-4ce2bf16><p class="card-value text-[4.8rem] leading-none tabular-nums mb-[0.4rem]" data-v-4ce2bf16>${ssrInterpolate(stats.value.attendanceToday ?? "—")}</p><p class="card-sub text-[1.2rem]" data-v-4ce2bf16>checked in</p></div><div class="mt-[2rem] progress-track h-[0.4rem] rounded-full overflow-hidden" data-v-4ce2bf16><div class="progress-fill h-full rounded-full transition-all duration-700" style="${ssrRenderStyle(`width: ${stats.value.employees ? Math.min((stats.value.attendanceToday ?? 0) / stats.value.employees * 100, 100) : 0}%`)}" data-v-4ce2bf16></div></div><p class="card-label text-[1rem] mt-[0.6rem]" data-v-4ce2bf16>${ssrInterpolate(stats.value.employees ? `of ${stats.value.employees} employees` : "no data")}</p></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-[2rem] mb-[3.2rem]" data-v-4ce2bf16><div class="stat-card rounded-[1.6rem] p-[3rem]" data-v-4ce2bf16><div class="mb-[2.4rem]" data-v-4ce2bf16><p class="card-label text-[1rem] tracking-[0.18em] uppercase mb-[0.4rem]" data-v-4ce2bf16>Overview</p><h2 class="page-title text-[1.8rem]" data-v-4ce2bf16>Shifts This Month</h2></div><canvas id="shiftsChart" data-v-4ce2bf16></canvas></div><div class="stat-card rounded-[1.6rem] p-[3rem]" data-v-4ce2bf16><div class="mb-[2.4rem]" data-v-4ce2bf16><p class="card-label text-[1rem] tracking-[0.18em] uppercase mb-[0.4rem]" data-v-4ce2bf16>Overview</p><h2 class="page-title text-[1.8rem]" data-v-4ce2bf16>Attendance Today</h2></div><canvas id="attendanceChart" data-v-4ce2bf16></canvas></div></div><div class="table-card rounded-[1.6rem] overflow-hidden" data-v-4ce2bf16><div class="table-summary flex items-center justify-between px-[3rem] py-[2rem]" data-v-4ce2bf16><div data-v-4ce2bf16><p class="card-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]" data-v-4ce2bf16>Recent Shifts</p><p class="table-text text-[1.4rem]" data-v-4ce2bf16>${ssrInterpolate(recentShifts.value.length)} ${ssrInterpolate(recentShifts.value.length === 1 ? "entry" : "entries")}</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/${unref(companyId)}/manager/schedule`,
        class: "view-all-btn flex items-center gap-[0.6rem] px-[1.4rem] py-[0.8rem] rounded-[0.8rem] text-[1.1rem] font-medium transition-all duration-200 no-underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View All <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-4ce2bf16${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" data-v-4ce2bf16${_scopeId}></path></svg>`);
          } else {
            return [
              createTextVNode(" View All "),
              (openBlock(), createBlock("svg", {
                class: "w-[1.2rem] h-[1.2rem]",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><table class="w-full" data-v-4ce2bf16><thead data-v-4ce2bf16><tr class="table-head-row" data-v-4ce2bf16><th class="card-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-4ce2bf16>Employee</th><th class="card-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-4ce2bf16>Date</th><th class="card-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-4ce2bf16>Start</th><th class="card-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-4ce2bf16>End</th></tr></thead><tbody data-v-4ce2bf16><!--[-->`);
      ssrRenderList(recentShifts.value, (shift, i) => {
        _push(`<tr class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "table-row"])}" data-v-4ce2bf16><td class="px-[3rem] py-[1.6rem]" data-v-4ce2bf16><div class="flex items-center gap-[1.2rem]" data-v-4ce2bf16><div class="emp-avatar w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center text-[1.1rem] text-white flex-shrink-0" data-v-4ce2bf16>${ssrInterpolate(shift.company_user.user.first_name?.[0]?.toUpperCase())}</div><span class="table-text text-[1.3rem]" data-v-4ce2bf16>${ssrInterpolate(shift.company_user.user.first_name)} ${ssrInterpolate(shift.company_user.user.last_name)}</span></div></td><td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums" data-v-4ce2bf16>${ssrInterpolate(shift.shift_date)}</td><td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums" data-v-4ce2bf16>${ssrInterpolate(shift.starts_at)}</td><td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums" data-v-4ce2bf16>${ssrInterpolate(shift.ends_at)}</td></tr>`);
      });
      _push(`<!--]-->`);
      if (!recentShifts.value.length) {
        _push(`<tr data-v-4ce2bf16><td colspan="4" class="px-[3rem] py-[6rem] text-center" data-v-4ce2bf16><div class="flex flex-col items-center gap-[1.4rem]" data-v-4ce2bf16><div class="icon-badge w-[5.4rem] h-[5.4rem] rounded-[1.2rem] flex items-center justify-center mx-auto" data-v-4ce2bf16><svg class="w-[2.4rem] h-[2.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-4ce2bf16><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" data-v-4ce2bf16></path></svg></div><p class="card-sub text-[1.3rem] tracking-[0.06em]" data-v-4ce2bf16>No shifts found.</p></div></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[companyId]/manager/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4ce2bf16"]]);

export { index as default };
//# sourceMappingURL=index-ByPbrtlS.mjs.map
