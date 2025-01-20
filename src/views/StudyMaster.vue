<template>
    <Header/>
    <div class="main-content">
        <Tasklist/>
    </div>
</template>

<script>
import Tasklist from "@/components/Tasks/Tasklist.vue";
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
    background-image: url("../assets/background.jpg");
    background-size: contain;
    background-position: center;
    min-height: calc(98% - 50px); /* Berechnung: Bildschirmhöhe minus Footer */
}
</style>