import { _ as _export_sfc, f as useTheme, b as __nuxt_component_0$1 } from './server.mjs';
import { ref, withCtx, createVNode, toDisplayString, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    items: { type: Array, required: true }
  },
  setup(__props) {
    const mobileOpen = ref(false);
    const { isDark } = useTheme();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<!--[-->`);
      if (mobileOpen.value) {
        _push(`<div class="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm hidden max-[768px]:block" data-v-b6b3006f></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="fixed top-1/2 -translate-y-1/2 z-50 pull-tab hidden max-[768px]:flex flex-col items-center justify-center gap-[0.3rem] transition-all duration-300" style="${ssrRenderStyle({ left: mobileOpen.value ? "22rem" : "0" })}" data-v-b6b3006f><span class="pull-tab-line" data-v-b6b3006f></span><span class="pull-tab-line" data-v-b6b3006f></span><span class="pull-tab-line" data-v-b6b3006f></span></button><aside class="${ssrRenderClass([mobileOpen.value ? "max-[768px]:translate-x-0" : "max-[768px]:-translate-x-full", "w-[22rem] min-h-screen fixed top-0 z-40 flex flex-col border-r transition-transform duration-300"])}" style="${ssrRenderStyle({
        left: "max(0px, calc((100vw - 144rem) / 2))",
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-sm)"
      })}" data-v-b6b3006f><div class="h-[5.8rem] flex items-center px-[3rem]" style="${ssrRenderStyle({ borderBottom: "1px solid var(--border)" })}" data-v-b6b3006f>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-[1rem] no-underline group",
        onClick: ($event) => mobileOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-[2.8rem] h-[2.8rem] rounded-[0.6rem] flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-95" style="${ssrRenderStyle({ backgroundColor: "var(--primary)" })}" data-v-b6b3006f${_scopeId}><span class="font-[&#39;Defonte&#39;] text-white text-[1.6rem] leading-none" data-v-b6b3006f${_scopeId}>C</span></span><span class="font-[&#39;Defonte&#39;] text-[2rem] tracking-wide leading-none" style="${ssrRenderStyle({ color: "var(--text-main)" })}" data-v-b6b3006f${_scopeId}> Checker </span>`);
          } else {
            return [
              createVNode("span", {
                class: "w-[2.8rem] h-[2.8rem] rounded-[0.6rem] flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-95",
                style: { backgroundColor: "var(--primary)" }
              }, [
                createVNode("span", { class: "font-['Defonte'] text-white text-[1.6rem] leading-none" }, "C")
              ]),
              createVNode("span", {
                class: "font-['Defonte'] text-[2rem] tracking-wide leading-none",
                style: { color: "var(--text-main)" }
              }, " Checker ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="flex-1 flex flex-col gap-[0.4rem] px-[1.6rem] py-[2.4rem] overflow-y-auto" data-v-b6b3006f><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<div data-v-b6b3006f>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.to,
          class: "nav-link flex items-center gap-[1.2rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.3rem] tracking-[0.02em] transition-all duration-150 no-underline",
          "active-class": "nav-link-active",
          onClick: ($event) => mobileOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span data-v-b6b3006f${_scopeId}>${ssrInterpolate(item.text)}</span>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(item.text), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        if (item.children) {
          _push(`<div class="flex flex-col gap-[0.2rem] mt-[0.4rem] ml-[1.6rem] pl-[1.6rem]" style="${ssrRenderStyle({ borderLeft: "1px solid var(--border)" })}" data-v-b6b3006f><!--[-->`);
          ssrRenderList(item.children, (sub) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: sub.to,
              to: sub.to,
              class: "nav-sublink flex items-center px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem] tracking-[0.02em] transition-all duration-150 no-underline",
              "active-class": "nav-sublink-active",
              onClick: ($event) => mobileOpen.value = false
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(sub.text)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(sub.text), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></nav><div class="px-[1.6rem] py-[2rem]" style="${ssrRenderStyle({ borderTop: "1px solid var(--border)" })}" data-v-b6b3006f><div class="flex items-center justify-between px-[1.6rem]" data-v-b6b3006f><p class="text-[1rem] tracking-[0.12em] uppercase" style="${ssrRenderStyle({ color: "var(--text-light)" })}" data-v-b6b3006f>v1.0</p><button class="flex items-center justify-center w-[3rem] h-[3rem] rounded-[0.6rem] transition-all duration-200" style="${ssrRenderStyle({ backgroundColor: "var(--bg-subtle)", color: "var(--text-muted)" })}" data-v-b6b3006f>`);
      if (unref(isDark)) {
        _push(`<svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-b6b3006f><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" data-v-b6b3006f></path></svg>`);
      } else {
        _push(`<svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-b6b3006f><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" data-v-b6b3006f></path></svg>`);
      }
      _push(`</button></div></div></aside><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b6b3006f"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=sidebar-C8UFdBSQ.mjs.map
