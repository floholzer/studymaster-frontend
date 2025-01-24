<template>
    <v-container fluid class="d-flex justify-center align-center">
        <v-col cols="12" md="6">
            <v-card class="main pa-4">
              <!-- Zeige Fehler oder Semesterinformationen -->
              <div v-if="!semester || semester.name === 'Failed to load semester'" class="text-center">
                <p style="color: red;">Semester konnte nicht geladen werden.</p>
                <v-btn color="primary" @click="showAddSemesterDialog = true">
                  Neues Semester hinzufügen
                </v-btn>
              </div>

              <div v-else>
                  <h1>{{ semester.name }}</h1>
                  <v-divider class="mb-4"></v-divider>
                  <!-- Fortschrittsanzeige für ECTS-Punkte -->
                  <ProgressBar
                      :progressAbsolute="progressAbsolute"
                      :progress-percentage="progressPercentage"
                  />

                <!-- Fächer anzeigen -->
                <v-row>
                    <v-col
                        v-for="(subject, index) in subjects"
                        :key="index"
                        class="mb-4"
                    >
                        <v-card>
                            <v-card-title>
                                {{ subject.name }} ({{ subject.ects }} ECTS)
                            </v-card-title>
                            <v-card-text>
                                <v-btn small color="primary" @click="openTaskDialog(subject)">
                                    Add Task
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

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
              </div>
            </v-card>
        </v-col>
        <!-- Task Dialog -->
        <AddTask
            v-if="showTaskDialog"
            :subject="selectedSubject"
            @close="closeTaskDialog"
            @save="addTask"
        />
        <!-- Add Semester Dialog -->
        <AddSemester
            v-if="showAddSemesterDialog"
            @semester-added="handleSemesterAdded"
            @close="closeAddSemesterDialog"
        />
    </v-container>
</template>

<script>
import Task from "@/components/Tasks/Task.vue";
import ProgressBar from "@/components/Tasks/ProgressBar.vue";
import BigGreen from "@/components/Buttons/BigGreen.vue";
import Badge from "@/components/Tasks/Badge.vue";
import AddTask from "@/components/Dialogs/AddTask.vue";
import AddSemester from "@/components/Dialogs/AddSemester.vue";

export default {
    name: "Tasklist",
    components: {
        Badge,
        BigGreen,
        ProgressBar,
        Task,
        AddTask,
        AddSemester,
    },
    data() {
        return {
            showTaskDialog: false,
            showAddSemesterDialog: false, // Zustand für AddSemester
            selectedSubject: null,
            semester: {
                id: null,
                name: 'Failed to load semester',
                ects: 99,
                created_at: null,
            },
            subjects: [],
        };
    },
    async mounted() {
      await this.$store.dispatch('fetchTasks');
      await this.$store.dispatch('getProgress');
      this.semester = this.semesterStore[0];
      await this.$store.dispatch('getSubjects', this.semester.id);
      this.subjects = this.$store.getters.getSubjects;
    },
    computed: {
        openTasks() {
            const tasks = this.$store.getters.getTasks;
            return tasks.filter(task => {
                return task.status !== "completed";
            });
        },
        semesterStore() {
            return this.$store.state.semesters;
        },
        progressAbsolute() {
            return (this.$store.getters.getProgress/100)*30;
        },
        progressPercentage() {
            return this.$store.getters.getProgress;
        },
    },
    methods: {
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
        handleSemesterAdded() {
          // Neues Semester wurde hinzugefügt, aktualisiere Ansicht
          this.showAddSemesterDialog = false;
          this.$router.go(); // Seite neu laden, um Daten zu aktualisieren
        },
        closeAddSemesterDialog() {
          this.showAddSemesterDialog = false;
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