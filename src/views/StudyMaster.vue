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
    data() {
        return {
            showAddSemesterDialog: false,
        };
    },
    computed: {
        ...mapState(['semesters']),
        shouldShowSemesterDialog() {
            return this.semesters.length === 0
        }
    },
    async mounted() {
        await this.fetchSemesters()
        if (this.semesters.length === 0) {
            await this.$nextTick()
            // Optional: Dialog automatisch öffnen
            this.$store.commit('setDialog', 'addSemester')
        }
    },
    methods: {
        ...mapActions(['fetchSemesters'])
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