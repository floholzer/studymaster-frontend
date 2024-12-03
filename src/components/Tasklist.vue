<template>
    <v-container fluid class="d-flex justify-center align-center">
        <v-col cols="12" md="6">
            <v-card class="pa-4">
                <h1>STUDYMASTER</h1>
                <v-divider class="mb-4"></v-divider>
                <!-- Fortschrittsanzeige für ECTS-Punkte -->
                <ProgressBar :completedEcts="0" />

                <v-row>
                    <v-col>
                        <v-card>
                            <v-btn>Add TASK</v-btn>
                        </v-card>
                    </v-col>

                    <v-col>
                        <v-card>
                            <h1>Badges</h1>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>

            <!-- Task-Grid -->
            <div class="task-grid mt-6">
                <Task
                    v-for="(task) in tasks"
                    :subject="task.title"
                    :ects="task.ects"
                    :description="task.description"
                    :due_date="task.dueDate"
                />
            </div>
        </v-col>
    </v-container>
</template>

<script>
import Task from "@/components/Task.vue";
import ProgressBar from "@/components/ProgressBar.vue";

export default {
    name: "Tasklist",
    components: {ProgressBar, Task},
    beforeMount() { // Lifecycle-Hook: Wird vor dem Rendern ausgeführt
        this.fetchTasks();
    },
    computed: {
        tasks() {
            return this.$store.state.tasks;
        },
    },
    methods: {
        async fetchTasks() {
            await this.$store.dispatch('fetchTasks');
        },

        async addTask() {
            // vuex call
        },
        generateSubmissionFields() {
            this.newTask.submissions = Array.from({length: this.newTask.submissionsCount}, () => ({
                name: "",
                dueDate: "",
                menu: false,
            }));
        },
        async removeTask(index) {
            // vuex call
        },
    },
};
</script>

<style scoped>
.v-container {
    margin-top: 64px;
    margin-bottom: 120px;
}

.task-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
}
</style>