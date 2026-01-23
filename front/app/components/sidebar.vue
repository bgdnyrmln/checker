<template>
  <aside class="w-64 min-h-screen bg-[#E8EDEE] p-[1rem] pt-[4.5rem] fixed z-9">
    <nav class="flex flex-col gap-[1rem]">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="px-[2rem] py-[1rem] rounded text-center transition hover:bg-[#D8E2DC]"
        active-class="bg-[#D8E2DC] text-[--text-muted] cursor-default rounded px-[2rem] py-[1rem]" 
      >
        {{ item.text }}
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    // [{ text: 'Dashboard', to: '/dashboard' }]
  }
})
</script>
