import { _ as __nuxt_component_0 } from './sidebar-C8UFdBSQ.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import axios from 'axios';
import { useRoute } from 'vue-router';
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
  __name: "invite",
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
    const link = ref("");
    const invites = ref([]);
    const copied = ref(false);
    const isExpiringSoon = (expiresAt) => {
      const diff = new Date(expiresAt) - /* @__PURE__ */ new Date();
      return diff < 1e3 * 60 * 60 * 48;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper flex" }, _attrs))} data-v-b7953a3d>`);
      _push(ssrRenderComponent(_component_Sidebar, { items: sidebarItems }, null, _parent));
      _push(`<main class="flex-1 pl-[22rem] max-[768px]:pl-0 min-h-screen relative overflow-hidden" data-v-b7953a3d><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-b7953a3d></div><div class="blob blob-2 absolute bottom-[-8rem] left-[6rem] w-[35rem] h-[35rem] rounded-full blur-[8rem] pointer-events-none" data-v-b7953a3d></div><div class="relative z-10 max-w-[96rem] mx-auto py-[4rem] px-[4rem] max-[768px]:px-[1.6rem] max-[768px]:py-[2rem] max-[768px]:pt-[3rem]" data-v-b7953a3d><div class="mb-[4rem] max-[768px]:mb-[2.4rem]" data-v-b7953a3d><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.6rem]" data-v-b7953a3d>Manager Panel</p><h1 class="page-title text-[3.6rem] max-[768px]:text-[2.8rem] leading-none tracking-wide" data-v-b7953a3d>Invite Employees</h1></div><div class="filter-card rounded-[1.6rem] p-[3rem] mb-[2rem] max-[768px]:p-[1.6rem]" data-v-b7953a3d><div class="flex items-center gap-[1.4rem] mb-[2.4rem] pb-[2rem]" style="${ssrRenderStyle({ "border-bottom": "1px solid var(--border)" })}" data-v-b7953a3d><div class="empty-icon w-[4rem] h-[4rem] rounded-[1rem] flex items-center justify-center flex-shrink-0" data-v-b7953a3d><svg class="w-[1.8rem] h-[1.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-b7953a3d><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" data-v-b7953a3d></path></svg></div><div data-v-b7953a3d><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.1rem]" data-v-b7953a3d>Invitations</p><h2 class="page-title text-[1.8rem] leading-tight" data-v-b7953a3d>Generate Invite Link</h2></div></div><div class="flex items-center gap-[2rem] flex-wrap max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-[1.2rem]" data-v-b7953a3d><button class="calc-btn relative flex items-center justify-center gap-[0.8rem] px-[2.4rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200" data-v-b7953a3d><svg class="w-[1.5rem] h-[1.5rem]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" data-v-b7953a3d><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" data-v-b7953a3d></path></svg> Generate Invite <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-b7953a3d></span></button>`);
      if (link.value) {
        _push(`<div class="link-result flex items-start gap-[1.2rem] flex-1 min-w-0 px-[1.8rem] py-[1.2rem] rounded-[0.8rem] max-[768px]:flex-col max-[768px]:gap-[1rem]" data-v-b7953a3d><div class="flex items-start gap-[1rem] flex-1 min-w-0" data-v-b7953a3d><svg class="w-[1.4rem] h-[1.4rem] flex-shrink-0 link-icon mt-[0.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-b7953a3d><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" data-v-b7953a3d></path></svg><span class="link-text text-[1.2rem] break-all flex-1" data-v-b7953a3d>${ssrInterpolate(link.value)}</span></div><button class="copy-btn flex items-center justify-center gap-[0.5rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] text-[1.1rem] flex-shrink-0 transition-all duration-150 max-[768px]:w-full" data-v-b7953a3d>`);
        if (!copied.value) {
          _push(`<svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-b7953a3d><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" data-v-b7953a3d></path></svg>`);
        } else {
          _push(`<svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" data-v-b7953a3d><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" data-v-b7953a3d></path></svg>`);
        }
        _push(` ${ssrInterpolate(copied.value ? "Copied!" : "Copy")}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="table-card rounded-[1.6rem] overflow-hidden" data-v-b7953a3d><div class="table-summary flex items-center justify-between px-[3rem] py-[2rem] max-[768px]:px-[1.6rem] max-[768px]:py-[1.4rem]" data-v-b7953a3d><div data-v-b7953a3d><p class="page-label text-[1rem] tracking-[0.18em] uppercase mb-[0.2rem]" data-v-b7953a3d>Active Invites</p><p class="table-text text-[1.4rem]" data-v-b7953a3d>${ssrInterpolate(invites.value.length)} unused ${ssrInterpolate(invites.value.length === 1 ? "link" : "links")}</p></div></div>`);
      if (invites.value.length) {
        _push(`<!--[--><table class="w-full max-[768px]:hidden" data-v-b7953a3d><thead data-v-b7953a3d><tr class="table-head-row" data-v-b7953a3d><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-b7953a3d>Invite Link</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-b7953a3d>Created</th><th class="page-label px-[3rem] py-[1.6rem] text-left text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-b7953a3d>Expires</th><th class="page-label px-[3rem] py-[1.6rem] text-right text-[1rem] tracking-[0.18em] uppercase font-normal" data-v-b7953a3d>Action</th></tr></thead><tbody data-v-b7953a3d><!--[-->`);
        ssrRenderList(invites.value, (invite2, i) => {
          _push(`<tr class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "table-row"])}" data-v-b7953a3d><td class="px-[3rem] py-[1.6rem]" data-v-b7953a3d><div class="flex items-center gap-[1rem]" data-v-b7953a3d><div class="link-dot w-[0.6rem] h-[0.6rem] rounded-full flex-shrink-0" data-v-b7953a3d></div><span class="table-text text-[1.2rem] break-all font-mono" data-v-b7953a3d>${ssrInterpolate(`http://localhost:3000/auth/register?token=${invite2.token}`)}</span></div></td><td class="table-text px-[3rem] py-[1.6rem] text-[1.3rem] tabular-nums whitespace-nowrap" data-v-b7953a3d>${ssrInterpolate(new Date(invite2.created_at).toLocaleDateString("en-GB"))}</td><td class="px-[3rem] py-[1.6rem] whitespace-nowrap" data-v-b7953a3d><span class="${ssrRenderClass([isExpiringSoon(invite2.expires_at) ? "badge-warn" : "badge-ok", "expire-badge text-[1.1rem] px-[1rem] py-[0.3rem] rounded-full"])}" data-v-b7953a3d>${ssrInterpolate(new Date(invite2.expires_at).toLocaleDateString("en-GB"))}</span></td><td class="px-[3rem] py-[1.6rem] text-right" data-v-b7953a3d><button class="action-btn copy-row-btn flex items-center gap-[0.5rem] px-[1.4rem] py-[0.7rem] rounded-[0.6rem] text-[1.1rem] ml-auto transition-all duration-150" data-v-b7953a3d><svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-b7953a3d><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" data-v-b7953a3d></path></svg> Copy </button></td></tr>`);
        });
        _push(`<!--]--></tbody></table><div class="hidden max-[768px]:block divide-y divide-[var(--border)]" data-v-b7953a3d><!--[-->`);
        ssrRenderList(invites.value, (invite2, i) => {
          _push(`<div class="${ssrRenderClass([i % 2 === 0 ? "row-even" : "row-odd", "invite-card px-[1.6rem] py-[1.6rem]"])}" data-v-b7953a3d><div class="flex items-start gap-[1rem] mb-[1.2rem]" data-v-b7953a3d><div class="link-dot w-[0.6rem] h-[0.6rem] rounded-full flex-shrink-0 mt-[0.6rem]" data-v-b7953a3d></div><span class="table-text text-[1.2rem] break-all font-mono leading-relaxed flex-1" data-v-b7953a3d>${ssrInterpolate(`http://localhost:3000/auth/register?token=${invite2.token}`)}</span></div><div class="flex items-center gap-[1.6rem] mb-[1.4rem] flex-wrap" data-v-b7953a3d><div class="flex items-center gap-[0.5rem]" data-v-b7953a3d><span class="page-label text-[0.95rem] tracking-[0.15em] uppercase" data-v-b7953a3d>Created</span><span class="table-text text-[1.2rem] tabular-nums" data-v-b7953a3d>${ssrInterpolate(new Date(invite2.created_at).toLocaleDateString("en-GB"))}</span></div><div class="flex items-center gap-[0.5rem]" data-v-b7953a3d><span class="page-label text-[0.95rem] tracking-[0.15em] uppercase" data-v-b7953a3d>Expires</span><span class="${ssrRenderClass([isExpiringSoon(invite2.expires_at) ? "badge-warn" : "badge-ok", "expire-badge text-[1.1rem] px-[0.8rem] py-[0.2rem] rounded-full"])}" data-v-b7953a3d>${ssrInterpolate(new Date(invite2.expires_at).toLocaleDateString("en-GB"))}</span></div></div><button class="action-btn copy-row-btn w-full flex items-center justify-center gap-[0.6rem] px-[1.4rem] py-[0.9rem] rounded-[0.8rem] text-[1.2rem] transition-all duration-150" data-v-b7953a3d><svg class="w-[1.3rem] h-[1.3rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-b7953a3d><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" data-v-b7953a3d></path></svg> Copy Link </button></div>`);
        });
        _push(`<!--]--></div><!--]-->`);
      } else {
        _push(`<div class="flex flex-col items-center justify-center py-[6rem] text-center" data-v-b7953a3d><div class="empty-icon w-[5.4rem] h-[5.4rem] rounded-[1.2rem] flex items-center justify-center mb-[1.6rem]" data-v-b7953a3d><svg class="w-[2.4rem] h-[2.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-b7953a3d><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" data-v-b7953a3d></path></svg></div><p class="table-sub text-[1.4rem] tracking-[0.06em]" data-v-b7953a3d>No active invite links.</p></div>`);
      }
      _push(`</div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[companyId]/manager/invite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const invite = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b7953a3d"]]);

export { invite as default };
//# sourceMappingURL=invite-FcdS2NEL.mjs.map
