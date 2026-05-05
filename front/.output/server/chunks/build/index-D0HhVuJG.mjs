import { _ as _export_sfc, b as __nuxt_component_0$1 } from './server.mjs';
import { ref, mergeProps, withCtx, createVNode, toDisplayString, createBlock, createTextVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import axios from 'axios';
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
import 'vue-router';
import 'consola';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const user = ref(null);
    const profiles = ref([]);
    const loading = ref(true);
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      if (loading.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "loading-screen min-h-screen flex items-center justify-center" }, _attrs))} data-v-106f543e><div class="flex flex-col items-center gap-[1.6rem]" data-v-106f543e><div class="spinner w-[3rem] h-[3rem] rounded-full animate-spin" data-v-106f543e></div><span class="page-label text-[1.2rem] tracking-[0.12em]" data-v-106f543e>Loading...</span></div></div>`);
      } else if (user.value?.id) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper min-h-screen relative overflow-hidden" }, _attrs))} data-v-106f543e><div class="blob blob-1 absolute top-[-8rem] right-[-8rem] w-[50rem] h-[50rem] rounded-full blur-[8rem] pointer-events-none" data-v-106f543e></div><div class="blob blob-2 absolute bottom-[-12rem] left-[-8rem] w-[40rem] h-[40rem] rounded-full blur-[8rem] pointer-events-none" data-v-106f543e></div><div class="relative z-10 max-w-[96rem] mx-auto py-[8rem] px-[4rem]" data-v-106f543e><div class="mb-[5rem]" data-v-106f543e><p class="page-label text-[1.1rem] tracking-[0.2em] uppercase mb-[0.8rem]" data-v-106f543e>Homepage</p><h1 class="page-title text-[4.8rem] leading-none tracking-wide mb-[1.2rem]" data-v-106f543e> Welcome back, ${ssrInterpolate(user.value.first_name)}</h1><div class="flex items-center gap-[1rem]" data-v-106f543e><div class="divider-line h-px w-[4rem]" data-v-106f543e></div><p class="page-sub text-[1.3rem]" data-v-106f543e>Select a company to continue</p></div></div>`);
        if (profiles.value.length) {
          _push(`<div class="grid md:grid-cols-2 gap-[2.4rem]" data-v-106f543e><!--[-->`);
          ssrRenderList(profiles.value, (profile, i) => {
            _push(`<div class="company-card group rounded-[1.6rem] p-[3rem] hover:-translate-y-[0.2rem] transition-all duration-300" style="${ssrRenderStyle(`animation-delay: ${i * 80}ms`)}" data-v-106f543e><div class="flex items-start justify-between mb-[2.4rem]" data-v-106f543e><div class="avatar w-[4.8rem] h-[4.8rem] rounded-[1rem] flex items-center justify-center shadow-sm flex-shrink-0" data-v-106f543e><span class="text-white text-[2rem] leading-none" data-v-106f543e>${ssrInterpolate(profile.company?.name?.[0]?.toUpperCase())}</span></div><span class="${ssrRenderClass([profile.role === "manager" ? "badge-manager" : "badge-employee", "text-[1rem] px-[1.2rem] py-[0.4rem] rounded-full tracking-[0.1em] uppercase"])}" data-v-106f543e>${ssrInterpolate(profile.role)}</span></div>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/${profile.id}/personal-cabinet`,
              class: "block no-underline"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<h2 class="company-name text-[2rem] leading-tight mb-[0.6rem] transition-colors duration-200" data-v-106f543e${_scopeId}>${ssrInterpolate(profile.company?.name)}</h2><p class="page-label text-[1.1rem] tracking-[0.06em]" data-v-106f543e${_scopeId}>ID · ${ssrInterpolate(profile.id)}</p>`);
                } else {
                  return [
                    createVNode("h2", { class: "company-name text-[2rem] leading-tight mb-[0.6rem] transition-colors duration-200" }, toDisplayString(profile.company?.name), 1),
                    createVNode("p", { class: "page-label text-[1.1rem] tracking-[0.06em]" }, "ID · " + toDisplayString(profile.id), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`<div class="card-divider h-px my-[2.4rem]" data-v-106f543e></div><div class="flex items-center justify-between" data-v-106f543e>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/${profile.id}/personal-cabinet`,
              class: "cabinet-link flex items-center gap-[0.8rem] text-[1.2rem] transition-colors duration-200 no-underline"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg class="w-[1.6rem] h-[1.6rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-106f543e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" data-v-106f543e${_scopeId}></path></svg> Personal Cabinet `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-[1.6rem] h-[1.6rem]",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.5",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      })
                    ])),
                    createTextVNode(" Personal Cabinet ")
                  ];
                }
              }),
              _: 2
            }, _parent));
            if (profile.role === "manager") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: `/${profile.company_id}/manager`,
                class: "admin-btn relative flex items-center gap-[0.6rem] px-[1.6rem] py-[0.8rem] rounded-[0.8rem] text-[1.1rem] text-white tracking-[0.06em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 no-underline"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(` Admin Panel <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-106f543e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" data-v-106f543e${_scopeId}></path></svg><span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-106f543e${_scopeId}></span>`);
                  } else {
                    return [
                      createTextVNode(" Admin Panel "),
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
                      ])),
                      createVNode("span", { class: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" })
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="flex flex-col items-center justify-center py-[8rem] text-center" data-v-106f543e><div class="empty-icon w-[6rem] h-[6rem] rounded-[1.2rem] flex items-center justify-center mb-[2rem]" data-v-106f543e><svg class="w-[2.8rem] h-[2.8rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" data-v-106f543e><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" data-v-106f543e></path></svg></div><p class="page-sub text-[1.4rem] tracking-[0.06em]" data-v-106f543e>No companies assigned yet.</p></div>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "landing-wrapper min-h-screen flex items-center justify-center relative overflow-hidden" }, _attrs))} data-v-106f543e><div class="landing-glow-1 absolute inset-0 pointer-events-none" data-v-106f543e></div><div class="blob blob-1 absolute top-[-6rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full blur-[6rem] pointer-events-none" data-v-106f543e></div><div class="blob blob-2 absolute bottom-[-8rem] left-[-4rem] w-[35rem] h-[35rem] rounded-full blur-[6rem] pointer-events-none" data-v-106f543e></div><div class="relative z-10 text-center max-w-[72rem] px-[4rem]" data-v-106f543e><h1 class="landing-title text-[7.2rem] leading-[0.95] tracking-tight mb-[3.2rem]" data-v-106f543e> Track work time<br data-v-106f543e><span class="landing-muted" data-v-106f543e>Simply.</span><span class="landing-title" data-v-106f543e> Reliably.</span></h1><p class="landing-sub text-[1.6rem] max-w-[52rem] mx-auto leading-relaxed mb-[4.8rem]" data-v-106f543e> Checker helps teams manage attendance, work hours, payroll, and accountability — without friction. </p><div class="flex items-center justify-center gap-[1.6rem]" data-v-106f543e>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "signin-btn px-[2.4rem] py-[1.2rem] text-[1.3rem] tracking-[0.06em] rounded-[0.8rem] hover:-translate-y-px transition-all duration-200 no-underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Sign In `);
            } else {
              return [
                createTextVNode(" Sign In ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/register-company",
          class: "getstarted-btn relative flex items-center gap-[0.8rem] px-[2.8rem] py-[1.2rem] rounded-[0.8rem] text-[1.3rem] text-white tracking-[0.08em] overflow-hidden hover:-translate-y-px active:translate-y-0 transition-all duration-200 no-underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Get Started <svg class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-106f543e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" data-v-106f543e${_scopeId}></path></svg><span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" data-v-106f543e${_scopeId}></span>`);
            } else {
              return [
                createTextVNode(" Get Started "),
                (openBlock(), createBlock("svg", {
                  class: "w-[1.4rem] h-[1.4rem]",
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
                ])),
                createVNode("span", { class: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-106f543e"]]);

export { index as default };
//# sourceMappingURL=index-D0HhVuJG.mjs.map
