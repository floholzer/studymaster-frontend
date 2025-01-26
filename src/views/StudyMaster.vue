<template>
    <Header/>
    <div class="main-content">
        <AddSemester v-if="shouldShowSemesterDialog"/>
        <Tasklist v-else/>
    </div>
</template>

<script>
import Tasklist from "@/components/Tasks/Tasklist.vue";
import Header from "@/components/Header.vue";
import AddSemester from "@/components/Dialogs/AddSemester.vue";
import { mapState, mapActions } from 'vuex'

export default {
    name: 'StudyMaster',
    components: {
        Header,
        Tasklist,
        AddSemester,
    },
    computed: {
        ...mapState(['semesters']),
        shouldShowSemesterDialog() {
            // Zeige Dialog wenn keine Semester existieren ODER alle Semester abgeschlossen sind
            return this.semesters.length === 0 ||
                this.semesters.every(s => s.status === 'completed')
        }
    },
    async mounted() {
        await this.getSemesters()
    },
    methods: {
        ...mapActions(['getSemesters'])
    },
};
</script>

<style scoped>
.main-content {
    background-image: url("../assets/background.jpg");
    background-size: contain;
    background-position: center;
    min-height: calc(98% - 50px); /* Berechnung: Bildschirmhöhe minus Footer */
    position: relative;
    padding-bottom: 120px; /* Platz für Badge-Leiste */
}
</style>