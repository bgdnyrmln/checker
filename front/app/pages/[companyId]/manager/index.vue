<template>
    <Sidebar :items="[
    { text: 'Home', to: `/${profileId}/manager` },
    { text: 'Company', to: `/${profileId}/manager/company` },
    { text: 'Team', to: `/${profileId}/manager/team`},
    { text: 'Schedule', to: `/${profileId}/manager/schedule`},
    { text: 'Attendancy', to: `/${profileId}/manager/attendancy`},
    { text: 'Payrolls', to: `/${profileId}/manager/payrolls`},
    { text: 'Invites', to: `/${profileId}/manager/invite`}
    ]" />
</template>


<script setup>
const route = useRoute()

const profileId = route.params.id
</script>