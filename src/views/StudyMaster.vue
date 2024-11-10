<template>
    <Header/>
    <div class="main-content">
        <Tasklist/>
    </div>
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
.main-content {
    background: linear-gradient(135deg, #FFD3A5 ,#99BFBB);
    min-height: 100vh;
}

</style>