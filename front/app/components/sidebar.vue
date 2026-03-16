<template>
  <!-- Mobile overlay -->
  <div
    v-if="mobileOpen"
    class="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm hidden max-[768px]:block"
    @click="mobileOpen = false"
  ></div>

  <!-- Mobile pull tab (always visible on mobile, sticks to left edge) -->
  <button
    @click="mobileOpen = !mobileOpen"
    class="fixed top-1/2 -translate-y-1/2 z-50 pull-tab hidden max-[768px]:flex flex-col items-center justify-center gap-[0.3rem] transition-all duration-300"
    :style="{ left: mobileOpen ? '22rem' : '0' }"
  >
    <span class="pull-tab-line"></span>
    <span class="pull-tab-line"></span>
    <span class="pull-tab-line"></span>
  </button>

  <!-- Sidebar -->
  <aside
    class="w-[22rem] min-h-screen fixed top-0 z-40 flex flex-col border-r transition-transform duration-300"
    :class="mobileOpen ? 'max-[768px]:translate-x-0' : 'max-[768px]:-translate-x-full'"
    :style="{
      left: 'max(0px, calc((100vw - 144rem) / 2))',
      backgroundColor: 'var(--bg-card)',
      borderColor: 'var(--border)',
      boxShadow: 'var(--shadow-sm)',
    }"
  >
    <!-- Logo -->
    <div class="h-[5.8rem] flex items-center px-[3rem]" :style="{ borderBottom: '1px solid var(--border)' }">
      <NuxtLink to="/" class="flex items-center gap-[1rem] no-underline group" @click="mobileOpen = false">
        <span
          class="w-[2.8rem] h-[2.8rem] rounded-[0.6rem] flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-95"
          :style="{ backgroundColor: 'var(--primary)' }"
        >
          <span class="font-['Defonte'] text-white text-[1.6rem] leading-none">C</span>
        </span>
        <span class="font-['Defonte'] text-[2rem] tracking-wide leading-none" :style="{ color: 'var(--text-main)' }">
          Checker
        </span>
      </NuxtLink>
    </div>

    <!-- Nav -->
    <nav class="flex-1 flex flex-col gap-[0.4rem] px-[1.6rem] py-[2.4rem] overflow-y-auto">
      <div v-for="item in items" :key="item.to">
        <NuxtLink
          :to="item.to"
          class="nav-link flex items-center gap-[1.2rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] text-[1.3rem] tracking-[0.02em] transition-all duration-150 no-underline"
          active-class="nav-link-active"
          @click="mobileOpen = false"
        >
          <span>{{ item.text }}</span>
        </NuxtLink>

        <div
          v-if="item.children"
          class="flex flex-col gap-[0.2rem] mt-[0.4rem] ml-[1.6rem] pl-[1.6rem]"
          :style="{ borderLeft: '1px solid var(--border)' }"
        >
          <NuxtLink
            v-for="sub in item.children"
            :key="sub.to"
            :to="sub.to"
            class="nav-sublink flex items-center px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.2rem] tracking-[0.02em] transition-all duration-150 no-underline"
            active-class="nav-sublink-active"
            @click="mobileOpen = false"
          >
            {{ sub.text }}
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Bottom strip -->
    <div class="px-[1.6rem] py-[2rem]" :style="{ borderTop: '1px solid var(--border)' }">
      <div class="flex items-center justify-between px-[1.6rem]">
        <p class="text-[1rem] tracking-[0.12em] uppercase" :style="{ color: 'var(--text-light)' }">v1.0</p>
        <button
          @click="toggleTheme"
          class="flex items-center justify-center w-[3rem] h-[3rem] rounded-[0.6rem] transition-all duration-200"
          :style="{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }"
        >
          <svg v-if="isDark" class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
          </svg>
          <svg v-else class="w-[1.4rem] h-[1.4rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  items: { type: Array, required: true }
})

const mobileOpen = ref(false)
const { isDark, toggleTheme } = useTheme()
</script>

<style scoped>
.nav-link { color: var(--text-muted); }
.nav-link:hover { background-color: var(--bg-subtle); color: var(--text-main); }
.nav-link-active { background-color: var(--bg-subtle); color: var(--text-main); font-weight: 500; }

.nav-sublink { color: var(--text-muted); }
.nav-sublink:hover { background-color: var(--bg-subtle); color: var(--text-main); }
.nav-sublink-active { background-color: var(--bg-subtle); color: var(--text-main); }

/* Pull tab */
.pull-tab {
  width: 1.6rem;
  height: 5.6rem;
  border-radius: 0 0.8rem 0.8rem 0;
  background-color: var(--bg-card);
  border: 1px solid var(--border-hover);
  border-left: none;
  box-shadow: var(--shadow-md);
  padding: 0 0.3rem;
}
.pull-tab:hover { background-color: var(--primary-soft); border-color: var(--primary); }

.pull-tab-line {
  display: block;
  width: 0.8rem;
  height: 0.15rem;
  border-radius: 9999px;
  background-color: var(--text-muted);
  transition: background-color 0.2s;
}
.pull-tab:hover .pull-tab-line { background-color: var(--primary); }
</style>