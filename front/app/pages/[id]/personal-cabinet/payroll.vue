<template>
    <Sidebar :items="sidebarItems" />

</template>

<script setup>
const route = useRoute()
const profileId = route.params.id

const sidebarItems = [
  { text: 'Dashboard', to: `/${profileId}/personal-cabinet` },
  { text: 'Attendance', to: `/${profileId}/personal-cabinet/attendance` },
  { text: 'Payroll', to: `/${profileId}/personal-cabinet/payroll` },
]

</script>