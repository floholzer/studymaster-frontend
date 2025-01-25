<template>
    <v-container fluid class="d-flex justify-center align-center">
        <v-col cols="12" md="6">
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
                    <Task class="task"
                        v-for="(task) in openTasks"
                        :key="task.id"
                        :taskId="task.id"
                        :taskName="task.title"
                        :subject="getSubjectName(task.subjectId)"
                        :ects="task.ects"
                        :description="task.description"
                        :due_date="task.dueDate"
                        :onDelete="deleteTask"
                        :onDone="openEnterReachedPointsDialog"
                        :onEdit="openEditDialog"
                    />
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
        <!-- Dialog für erreichte Punkte -->
        <EnterPoints
            v-if="showPointsDialog"
            :taskId="selectedTaskId"
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
                ects: 99,
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
        openTasks() {
            const tasks = this.$store.getters.getTasks;
            return tasks.filter(task => {
                return task.status !== "completed";
            });
        },
        semesterStore() {
            return this.$store.getters.getSemesters;
        },
        progressAbsolute() {
            return (this.$store.getters.getProgress/100)*30;
        },
        progressPercentage() {
            return this.$store.getters.getProgress;
        },
    },
    methods: {
        openEditDialog(taskId) {
            this.selectedTask = this.$store.getters.getTasks.find(t => t.id === taskId);
            this.showEditDialog = true;
        },
        closeEditDialog() {
            this.showEditDialog = false;
            this.selectedTask = null;
        },
        closePointsDialog() {
            this.showPointsDialog = false;
        },
        openEnterReachedPointsDialog(taskId) {
            if (typeof taskId !== 'number' && typeof taskId !== 'string') {
                console.error('Invalid taskId type:', typeof taskId)
                return
            }
            this.selectedTaskId = Number(taskId) // Explizite Konvertierung
            this.showPointsDialog = true
        },
        getSubjectName(subjectId) {
            return this.subjects?.find(subject => subject.id === subjectId)?.name;
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
        async completeTask(taskData) {
            await this.$store.dispatch('completeTask', { taskData });
            await this.$store.dispatch('fetchTasks');
            await this.$store.dispatch('getProgress');
            this.showPointsDialog = false;
        },
        async handleTaskUpdate(updatedTask) {
            try {
                await this.$store.dispatch('updateTask', updatedTask);
                await this.$store.dispatch('fetchTasks');
            } catch (error) {
                console.error('Error updating task:', error);
            }
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