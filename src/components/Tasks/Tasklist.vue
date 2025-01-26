<template>
    <v-container fluid class="d-flex justify-center align-center">
        <v-col cols="12" md="10" lg="9" class="mx-auto">
            <v-card class="main pa-4">
                <div class="semester-and-badges">
                  <h1>{{ semester.name }}</h1>
                    <div class="badges-inline">
                      <Badge
                          BadgeTitle="Rookie"
                          BadgeDescription="Erste LV abgeschlossen"
                          colorClass="wood"
                      />
                      <Badge
                          BadgeTitle="Bronze"
                          BadgeDescription="Completed 10 tasks!"
                          colorClass="bronze"
                      />
                      <Badge
                          BadgeTitle="Silver Scholar"
                          BadgeDescription="Achieved 15 ECTS!"
                          colorClass="silver"
                      />
                      <Badge
                          BadgeTitle="Overachiever"
                          BadgeDescription="Get 60ECTS in one semester"
                          colorClass="gold"
                      />
                    </div>
                </div>
                <v-divider class="mb-4"></v-divider>
                <!-- Fortschrittsanzeige -->
                <ProgressBar class="mb-4"
                    :progress="progress"
                />

                <!-- Fächer anzeigen -->
                <v-row>
                    <v-col
                        v-for="subject in subjects"
                        :key="subject.id"
                        class="mb-4"
                    >
                        <v-card class="subject-column">
                            <v-card-title class="d-flex justify-space-between align-center">
                                {{ subject.name }}
                                <v-chip small :color="subject.status === 'completed' ? 'success' : 'primary'">
                                    Tasks {{ subject.status }}
                                </v-chip>
                            </v-card-title>
                            <div class="d-flex justify-center mb-4">
                                <v-btn
                                    small
                                    color="primary"
                                    @click="openTaskDialog(subject)"
                                    class="mx-2 mt-2"
                                >
                                    <v-icon left>mdi-plus</v-icon>
                                    Add Task
                                </v-btn>
                            </div>


                            <v-card-text>
                                <!-- Tasks für dieses Subject -->
                                <div class="task-list">
                                    <Task
                                        v-for="task in getTasksForSubject(subject.id)"
                                        :key="task.id"
                                        :task="task"
                                        :onDelete="deleteTask"
                                        :onDone="openEnterReachedPointsDialog"
                                        :onEdit="openEditDialog"
                                    />
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>

        </v-col>
        <!-- Task Dialog -->
        <AddTask
            v-if="showTaskDialog"
            :subject="selectedSubject"
            @close="closeTaskDialog"
            @save="addTask"
        />
        <!-- Dialog für erreichte Punkte -->
        <EnterPoints
            v-if="showPointsDialog"
            :task="selectedTask"
            @save="completeTask"
            @close="closePointsDialog"
        />
        <!-- Dialog für Task bearbeiten -->
        <EditTaskDialog
            v-if="showEditDialog"
            :taskData="selectedTask"
            :show="showEditDialog"
            @close="closeEditDialog"
            @save="handleTaskUpdate"
        />
    </v-container>
</template>

<script>
import Task from "@/components/Tasks/Task.vue";
import ProgressBar from "@/components/Tasks/ProgressBar.vue";
import BigGreen from "@/components/Buttons/BigGreen.vue";
import Badge from "@/components/Tasks/Badge.vue";
import AddTask from "@/components/Dialogs/AddTask.vue";
import EnterPoints from "@/components/Dialogs/EnterPoints.vue";
import BadgeList from "@/components/Tasks/BadgeList.vue";
import EditTaskDialog from "@/components/Dialogs/EditTaskDialog.vue";

export default {
    name: "Tasklist",
    components: {
        EditTaskDialog,
        EnterPoints,
        Badge,
        BigGreen,
        ProgressBar,
        Task,
        AddTask,
        BadgeList,
    },
    data() {
        return {
            showEditDialog: false,
            selectedTask: null,
            selectedTaskId: null,
            showPointsDialog: false,
            showTaskDialog: false,
            selectedSubject: null,
            semester: {
                id: null,
                name: 'Failed to load semester',
                status: "open",
                created_at: null,
            },
            subjects: [],
        };
    },
    async mounted() {
      await this.$store.dispatch('fetchTasks');
      await this.$store.dispatch('getProgress');
      await this.$store.dispatch('getSemesters');
      this.semester = this.semesterStore[0];
      await this.$store.dispatch('getSubjects', this.semester.id);
      this.subjects = this.$store.getters.getSubjects;
    },
    computed: {
        tasks() {
            return this.$store.getters.getTasks;
        },
        semesterStore() {
            return this.$store.getters.getSemesters;
        },
        progress() {
            return this.$store.getters.getProgress;
        },
    },
    methods: {
        getTasksForSubject(subjectId) {
            return this.tasks.filter(task =>
                task.subjectId === subjectId &&
                task.status !== "completed"
            );
        },
        openEditDialog(task) {
            this.selectedTask = task  // Direkt das übergebene Task-Objekt verwenden
            this.showEditDialog = true
        },
        closeEditDialog() {
            this.showEditDialog = false;
            this.selectedTask = null;
        },
        closePointsDialog() {
            this.showPointsDialog = false;
        },
        openEnterReachedPointsDialog(task) {
            this.selectedTask = task  // Task-Objekt statt ID speichern
            this.showPointsDialog = true
        },
        openTaskDialog(subject) {
            this.selectedSubject = subject;
            this.showTaskDialog = true;
        },
        closeTaskDialog() {
            this.showTaskDialog = false;
            this.selectedSubject = null;
        },
        async addTask(taskData) {
            const newTask = {
                userId: this.$store.getters.getUser.id,
                ...taskData,
                subjectId: this.selectedSubject.id,
            };

            await this.$store.dispatch('addTask', newTask);
            this.closeTaskDialog();
        },
        async completeTask({ task, pointsEarned }) {
            await this.$store.dispatch('completeTask', {
                taskId: task.id,
                pointsEarned: pointsEarned
            })
            await this.$store.dispatch('fetchTasks')
            await this.$store.dispatch('getProgress')
            this.showPointsDialog = false
        },
        async handleTaskUpdate(updatedTask) {
            try {
                await this.$store.dispatch('updateTask', updatedTask);
                await this.$store.dispatch('fetchTasks');
            } catch (error) {
                console.error('Error updating task:', error);
            }
        },
        async deleteTask(task) {
            await this.$store.dispatch('deleteTask', task.id);
        },
    },
};
</script>

<style scoped>
.v-container {
    margin-top: 64px;
    margin-bottom: 120px;
}

.task-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
}

.semester-and-badges {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badges-inline {
  display: flex;
  gap: 10px; /* Abstand zwischen den Badges */
  align-items: center; /* Vertikal zentriert */
}
</style>