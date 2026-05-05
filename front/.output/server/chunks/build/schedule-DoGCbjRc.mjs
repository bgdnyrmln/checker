import { _ as __nuxt_component_0 } from './sidebar-C8UFdBSQ.mjs';
import { ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import axios from 'axios';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
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

const _sfc_main = {
  __name: "schedule",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const profileId = route.params.id;
    useTheme();
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
    const loading = ref(false);
    const error = ref("");
    const events = ref([]);
    const isMobile = ref(false);
    const calendarOptions = ref({
      plugins: [dayGridPlugin, listPlugin],
      initialView: "dayGridMonth",
      height: "auto",
      events: events.value,
      eventColor: "#4b5563",
      eventBorderColor: "transparent",
      eventTextColor: "#ffffff",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,listMonth"
      },
      buttonText: {
        today: "Today",
        month: "Month",
        list: "List"
      },
      dayMaxEvents: 2,
      views: {
        listMonth: {
          listDayFormat: { weekday: "long", day: "numeric", month: "short" },
          listDaySideFormat: false,
          noEventsText: "No shifts this month"
        }
      }
    });
    watch(events, (newEvents) => {
      calendarOptions.value = { ...calendarOptions.value, events: newEvents };
    });
    watch(isMobile, (mobile) => {
      calendarOptions.value = {
        ...calendarOptions.value,
        initialView: mobile ? "listMonth" : "dayGridMonth",
        headerToolbar: mobile ? { left: "prev,next", center: "title", right: "today" } : { left: "prev,next today", center: "title", right: "dayGridMonth,listMonth" }
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper flex" }, _attrs))} data-v-b1fb3347>`);
      _push(ssrRenderComponent(_component_Sidebar, { items: sidebarItems }, null, _parent));
      _push(`<main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden" data-v-b1fb3347><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-b1fb3347></div><div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none" data-v-b1fb3347></div><div class="relative z-10 max-w-[96rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[2rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]" data-v-b1fb3347><div class="mb-[4rem] max-[768px]:mb-[2.4rem]" data-v-b1fb3347><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]" data-v-b1fb3347>Personal Cabinet</p><h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide" data-v-b1fb3347>My Schedule</h1></div>`);
      if (loading.value) {
        _push(`<div class="flex items-center gap-[1.6rem] py-[4rem] justify-center" data-v-b1fb3347><div class="spinner w-[2.8rem] h-[2.8rem] rounded-full animate-spin" data-v-b1fb3347></div><span class="page-label text-[1.2rem] tracking-[0.12em]" data-v-b1fb3347>Loading schedule...</span></div>`);
      } else if (error.value) {
        _push(`<div class="error-bar flex items-center gap-[1rem] px-[2rem] py-[1.4rem] rounded-[1rem] text-[1.2rem] mb-[2.4rem]" data-v-b1fb3347><span data-v-b1fb3347>⚠</span> ${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<div class="calendar-card rounded-[1.6rem] p-[3rem] max-[768px]:p-[1.6rem]" data-v-b1fb3347>`);
        _push(ssrRenderComponent(unref(FullCalendar), { options: calendarOptions.value }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[id]/personal-cabinet/schedule.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const schedule = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b1fb3347"]]);

export { schedule as default };
//# sourceMappingURL=schedule-DoGCbjRc.mjs.map
