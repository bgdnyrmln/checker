import { _ as __nuxt_component_0 } from './sidebar-C8UFdBSQ.mjs';
import { ref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderStyle } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { _ as _export_sfc, f as useTheme } from './server.mjs';
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
    const profileId = route.params.id;
    const sidebarItems = [
      { text: "Dashboard", to: `/${profileId}/personal-cabinet` },
      { text: "Attendance", to: `/${profileId}/personal-cabinet/attendance` },
      { text: "Payroll", to: `/${profileId}/personal-cabinet/payroll` },
      { text: "Schedule", to: `/${profileId}/personal-cabinet/schedule` },
      { text: "Holidays", to: `/${profileId}/personal-cabinet/holidays` },
      { text: "Sick Leaves", to: `/${profileId}/personal-cabinet/sick-leaves` }
    ];
    const checkedIn = ref(false);
    const checkedInAt = ref(null);
    const hasShiftToday = ref(false);
    const loading = ref(false);
    const error = ref("");
    const stats = ref({ hoursWorkedToday: 0, hoursWorkedWeek: 0, hoursWorkedMonth: 0 });
    const currentTime = ref(/* @__PURE__ */ new Date());
    useTheme();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Sidebar, { items: sidebarItems }, null, _parent));
      _push(`<div class="page-wrapper flex min-h-screen pl-[22rem] max-[768px]:pl-0 relative overflow-hidden" data-v-998907cb><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-998907cb></div><div class="blob blob-2 absolute bottom-[-8rem] left-[10rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none" data-v-998907cb></div><main class="flex-1 p-[4rem] relative z-10" data-v-998907cb><div class="mb-[4rem]" data-v-998907cb><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]" data-v-998907cb>Personal Cabinet</p><h1 class="page-title text-[3.6rem] leading-none tracking-wide" data-v-998907cb>Dashboard</h1></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2rem] mb-[3.2rem]" data-v-998907cb><div class="stat-card rounded-[1.6rem] p-[3rem] flex flex-col gap-[2rem]" data-v-998907cb><div class="flex flex-col gap-[0.4rem]" data-v-998907cb><p class="card-label text-[1rem] tracking-[0.18em] uppercase" data-v-998907cb>Current Time</p><p class="card-value text-[3.2rem] leading-none tabular-nums" data-v-998907cb>${ssrInterpolate(currentTime.value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }))}</p><p class="card-sub text-[1.2rem]" data-v-998907cb>${ssrInterpolate(currentTime.value.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" }))}</p></div><div class="divider h-px" data-v-998907cb></div><div class="flex flex-col gap-[1.2rem]" data-v-998907cb>`);
      if (hasShiftToday.value) {
        _push(`<div data-v-998907cb>`);
        if (!checkedIn.value) {
          _push(`<button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="checkin-btn relative w-full flex items-center justify-center gap-[0.8rem] px-[2rem] py-[1.2rem] rounded-[0.8rem] text-[1.2rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" data-v-998907cb><svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-998907cb><path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" data-v-998907cb></path></svg> ${ssrInterpolate(loading.value ? "Processing…" : "Check In")} <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-998907cb></span></button>`);
        } else {
          _push(`<button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="checkout-btn w-full flex items-center justify-center gap-[0.8rem] px-[2rem] py-[1.2rem] rounded-[0.8rem] text-[1.2rem] tracking-[0.06em] hover:-translate-y-px transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" data-v-998907cb><svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-998907cb><path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" data-v-998907cb></path></svg> ${ssrInterpolate(loading.value ? "Processing…" : "Check Out")}</button>`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="no-shift flex items-center gap-[1rem] px-[1.6rem] py-[1.2rem] rounded-[0.8rem]" data-v-998907cb><svg class="w-[1.6rem] h-[1.6rem] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-998907cb><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" data-v-998907cb></path></svg><span class="text-[1.2rem]" data-v-998907cb>No shift scheduled today</span></div>`);
      }
      if (checkedInAt.value) {
        _push(`<div class="flex items-center gap-[0.8rem]" data-v-998907cb><span class="w-[0.6rem] h-[0.6rem] rounded-full bg-green-400 animate-pulse flex-shrink-0" data-v-998907cb></span><span class="text-[1.1rem] text-green-500" data-v-998907cb>Checked in at ${ssrInterpolate(new Date(checkedInAt.value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<p class="text-[1.1rem] text-red-400 flex items-center gap-[0.6rem]" data-v-998907cb><span data-v-998907cb>⚠</span> ${ssrInterpolate(error.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="stat-card rounded-[1.6rem] p-[3rem] flex flex-col justify-between" data-v-998907cb><div class="flex items-start justify-between mb-[2rem]" data-v-998907cb><p class="card-label text-[1rem] tracking-[0.18em] uppercase" data-v-998907cb>This Week</p><div class="icon-badge w-[3.6rem] h-[3.6rem] rounded-[0.8rem] flex items-center justify-center" data-v-998907cb><svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-998907cb><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" data-v-998907cb></path></svg></div></div><div data-v-998907cb><p class="card-value text-[4rem] leading-none tabular-nums mb-[0.6rem]" data-v-998907cb>${ssrInterpolate(stats.value.hoursWorkedWeek.toFixed(1))}</p><p class="card-sub text-[1.2rem]" data-v-998907cb>hours worked</p></div><div class="mt-[2rem] progress-track h-[0.4rem] rounded-full overflow-hidden" data-v-998907cb><div class="progress-fill h-full rounded-full transition-all duration-700" style="${ssrRenderStyle(`width: ${Math.min(stats.value.hoursWorkedWeek / 40 * 100, 100)}%`)}" data-v-998907cb></div></div><p class="card-label text-[1rem] mt-[0.6rem]" data-v-998907cb>of 40hr target</p></div><div class="stat-card rounded-[1.6rem] p-[3rem] flex flex-col justify-between" data-v-998907cb><div class="flex items-start justify-between mb-[2rem]" data-v-998907cb><p class="card-label text-[1rem] tracking-[0.18em] uppercase" data-v-998907cb>This Month</p><div class="icon-badge w-[3.6rem] h-[3.6rem] rounded-[0.8rem] flex items-center justify-center" data-v-998907cb><svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-998907cb><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" data-v-998907cb></path></svg></div></div><div data-v-998907cb><p class="card-value text-[4rem] leading-none tabular-nums mb-[0.6rem]" data-v-998907cb>${ssrInterpolate(stats.value.hoursWorkedMonth.toFixed(1))}</p><p class="card-sub text-[1.2rem]" data-v-998907cb>hours worked</p></div><div class="mt-[2rem] progress-track h-[0.4rem] rounded-full overflow-hidden" data-v-998907cb><div class="progress-fill h-full rounded-full transition-all duration-700" style="${ssrRenderStyle(`width: ${Math.min(stats.value.hoursWorkedMonth / 160 * 100, 100)}%`)}" data-v-998907cb></div></div><p class="card-label text-[1rem] mt-[0.6rem]" data-v-998907cb>of 160hr target</p></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-[2rem]" data-v-998907cb><div class="stat-card rounded-[1.6rem] p-[3rem]" data-v-998907cb><div class="mb-[2.4rem]" data-v-998907cb><p class="card-label text-[1rem] tracking-[0.18em] uppercase mb-[0.4rem]" data-v-998907cb>Trend</p><h2 class="page-title text-[1.8rem]" data-v-998907cb>Attendance This Week</h2></div><canvas id="attendanceChart" data-v-998907cb></canvas></div><div class="stat-card rounded-[1.6rem] p-[3rem]" data-v-998907cb><div class="mb-[2.4rem]" data-v-998907cb><p class="card-label text-[1rem] tracking-[0.18em] uppercase mb-[0.4rem]" data-v-998907cb>Overview</p><h2 class="page-title text-[1.8rem]" data-v-998907cb>Weekly Hours</h2></div><canvas id="weeklyChart" data-v-998907cb></canvas></div></div></main></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[id]/personal-cabinet/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-998907cb"]]);

export { index as default };
//# sourceMappingURL=index-CcPtD4NU.mjs.map
