<template>
    <Header/>
    <div class="main-content">
        <AddSemester v-if="showAddSemesterDialog()"/>
        <Tasklist v-else/>
    </div>
</template>

<script>
import Tasklist from "@/components/Tasks/Tasklist.vue";
import Header from "@/components/Header.vue";
import AddSemester from "@/components/Dialogs/AddSemester.vue";
import Task from "@/components/Tasks/Task.vue";

export default {
    name: 'StudyMaster',
    components: {
        Task,
        Header,
        Tasklist,
        AddSemester,
    },
    methods: {
        showAddSemesterDialog() {
            return true;
        },
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