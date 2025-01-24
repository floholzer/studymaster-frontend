<template>
    <Header/>
    <div class="main-content">
        <AddSemester v-if="showAddSemesterDialog"/>
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
        Header,
        Tasklist,
        AddSemester,
    },
    data() {
        return {
            showAddSemesterDialog: false,
        };
    },
    async computed() {
        await this.checkSemesters();
    },
    methods: {
        async checkSemesters() {
            try {
                const semesters = await this.$store.dispatch('getSemesters');
                this.showAddSemesterDialog = semesters === undefined || semesters.length === 0;
            } catch (error) {
                console.error('Error retrieving Semester:', error);
            }
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