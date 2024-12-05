<template>
    <v-container fluid class="d-flex justify-center align-center">
        <v-col cols="12" md="6">
            <v-card class="main pa-4">
                <h1>STUDYMASTER</h1>
                <v-divider class="mb-4"></v-divider>
                <!-- Fortschrittsanzeige für ECTS-Punkte -->
                <ProgressBar
                    :progressAbsolute="progressAbsolute"
                    :progress-percentage="progressPercentage"
                />

                <v-row class="mt-4">
                    <v-col>
                        <BigGreen @click="addTask" text="ADD TASK"/>
                    </v-col>
                    <v-divider class="mr-4" vertical></v-divider>
                    <v-col>
                        <v-row>
                            <Badge
                                BadgeTitle="Badge1"
                                BadgeDescription="This is the Badge description."
                            />
                            <Badge
                                BadgeTitle="Badge2"
                                BadgeDescription="This is the Badge description."
                            />
                            <Badge
                                BadgeTitle="Badge3"
                                BadgeDescription="This is the Badge description."
                            />
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <!-- Task-Grid -->
                    <v-divider class="mt-2"></v-divider>
                    <i style="color: gray;" v-if="openTasks.length===0">No tasks created yet...</i>

                    <div class="task-grid mx-6 my-6">
                        <Task
                            v-for="(task) in openTasks"
                            :key="task.id"
                            :taskId="task.id"
                            :subject="task.title"
                            :ects="task.ects"
                            :description="task.description"
                            :due_date="task.dueDate"
                            :onDelete="deleteTask"
                            :onDone="completeTask"
                        />
                    </div>
                </v-row>
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
import Task from "@/components/Tasks/Task.vue";
import ProgressBar from "@/components/Tasks/ProgressBar.vue";
import BigGreen from "@/components/Buttons/BigGreen.vue";
import Badge from "@/components/Tasks/Badge.vue";

export default {
    name: "Tasklist",
    components: {
        Badge,
        BigGreen,
        ProgressBar,
        Task
    },
    beforeMount() { // Lifecycle-Hook: Wird vor dem Rendern ausgeführt
        this.fetchTasks();
        this.getProgress(); // TODO add progress function to API
    },
    computed: {
        openTasks() {
            const tasks = this.$store.getters.getTasks;
            return tasks.filter(task => {
                // Replace this condition with your actual condition
                return task.status !== "completed";
            });
        },
        progressAbsolute() {
            return (this.$store.getters.getProgress/100)*30;
        },
        progressPercentage() {
            return this.$store.getters.getProgress;
        },
    },
    methods: {
        async getProgress() {
            await this.$store.dispatch('getProgress');
        },
        async fetchTasks() {
            await this.$store.dispatch('fetchTasks');
        },
        async addTask() {
            await this.$store.dispatch('addTask', {
                userId: this.$store.getters.getUser.id,
                title: "New Task",
                ects: 5,
                description: "Description",
                dueDate: "2024-12-31",
            });
        },
        async completeTask(taskId, ects) {
            await this.$store.dispatch('completeTask', { taskId, ects });
            await this.fetchTasks();
            await this.getProgress();
        },
        async updateTask(taskId) {
            await this.$store.dispatch('updateTask', taskId);
        },
        async deleteTask(taskId) {
            await this.$store.dispatch('deleteTask', taskId);
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