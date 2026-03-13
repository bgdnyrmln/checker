<script setup>
const { initTheme } = useTheme()
onMounted(initTheme)
</script>

<template>
  <div class = " max-w-[144rem] mx-auto pt-[1rem]">
    <Header />
    <div class="pt-[2.5rem]">
      <NuxtPage />
    </div>
  </div>
</template>
