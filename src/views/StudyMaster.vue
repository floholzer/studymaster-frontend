<template>
    <Header/>
    <Tasklist/>
</template>

<script>
import Tasklist from "@/components/Tasklist.vue";
import Header from "@/components/Header.vue";

export default {
    name: 'StudyMaster',
    components: {
        Header,
        Tasklist
    },
};

</script>

<style scoped>

</style>