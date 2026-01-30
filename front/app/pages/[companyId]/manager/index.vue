<template>
    <Sidebar :items="[
    { text: 'Home', to: `/${companyId}/manager` },
    { text: 'Company', to: `/${companyId}/manager/company` },
    { text: 'Team', to: `/${companyId}/manager/team`},
    { text: 'Schedule', to: `/${companyId}/manager/schedule`},
    { text: 'Attendancy', to: `/${companyId}/manager/attendancy`},
    { text: 'Payrolls', to: `/${companyId}/manager/payrolls`},
    { text: 'Invites', to: `/${companyId}/manager/invite`}
    ]" />
</template>


<script setup>
const route = useRoute()

const companyId = route.params.companyId
</script>