<template>
    <v-container fluid class="d-flex justify-center align-center">
        <v-col cols="12" md="6">
            <v-card class="main pa-4">
                <h1>STUDYMASTER</h1>
                <v-divider class="mb-4"></v-divider>
                <!-- Fortschrittsanzeige für ECTS-Punkte -->
                <ProgressBar :completedEcts="0"/>

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
                    <i style="color: gray;" v-if="tasks.length===0">No tasks created yet...</i>

                    <div class="task-grid mx-6 my-6">
                        <Task
                            v-for="(task) in tasks"
                            :task-id="task.id"
                            :subject="task.title"
                            :ects="task.ects"
                            :description="task.description"
                            :due_date="task.dueDate"
                            :onDelete="deleteTask"
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
    components: {Badge, BigGreen, ProgressBar, Task},
    beforeMount() { // Lifecycle-Hook: Wird vor dem Rendern ausgeführt
        this.fetchTasks();
    },
    updated() {
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
            await this.$store.dispatch('addTask', {
                user_id: this.$store.state.user.id,
                title: "New Task",
                ects: 5,
                description: "Description",
                dueDate: "2024-12-31",
            });
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