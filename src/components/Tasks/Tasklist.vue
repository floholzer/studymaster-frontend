<template>
    <v-container fluid class="d-flex justify-center align-center">
        <v-col cols="12" md="6">
            <v-card class="main pa-4">
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

                    />
                </div>
            </v-card>
            <!-- BadgeList anzeigen -->
            <div class="badge-list-container">
              <BadgeList />
            </div>
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

export default {
    name: "Tasklist",
    components: {
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
        closePointsDialog() {
            this.showPointsDialog = false;
        },
        openEnterReachedPointsDialog(taskId) {
            this.selectedTaskId = taskId;
            this.showPointsDialog = true;
        },
        getSubjectName(subjectId) {
            return this.subjects.find(subject => subject.id === subjectId).name;
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
        async completeTask(taskId, reachedPoints) {
            await this.$store.dispatch('completeTask', { taskId, reachedPoints });
            await this.$store.dispatch('fetchTasks');
            await this.$store.dispatch('getProgress');
            this.showPointsDialog = false;
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

.badge-list-container {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  background-color: rgba(249, 249, 249, 0.8);
}
</style>