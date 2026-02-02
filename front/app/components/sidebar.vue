<template>
  <aside class="w-64 min-h-screen bg-[#E8EDEE] p-4 pt-[5rem] fixed z-9">
    <nav class="flex flex-col gap-2">
      <div v-for="item in items" :key="item.to">
        <!-- Main link -->
        <NuxtLink
          :to="item.to"
          class="block px-4 py-2 rounded text-center transition hover:bg-[#D8E2DC]"
          active-class="bg-[#D8E2DC] text-[--text-muted] cursor-default"
        >
          {{ item.text }}
        </NuxtLink>

        <!-- Subitems -->
        <div v-if="item.children" class="ml-4 mt-1 flex flex-col gap-1">
          <NuxtLink
            v-for="sub in item.children"
            :key="sub.to"
            :to="sub.to"
            class="block px-4 py-2 rounded text-center transition hover:bg-[#D8E2DC]"
            active-class="bg-[#D8E2DC] text-[--text-muted] cursor-default"
          >
            {{ sub.text }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    // Example:
    // [
    //   { text: 'Dashboard', to: '/dashboard' },
    //   { 
    //      text: 'Team', 
    //      to: '/team', 
    //      children: [
    //        { text: 'Members', to: '/team/members' },
    //        { text: 'Shifts', to: '/team/shifts' }
    //      ]
    //   }
    // ]
  }
})
</script>
