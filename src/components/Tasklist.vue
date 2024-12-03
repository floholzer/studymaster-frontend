<template>
    <v-container fluid class="d-flex justify-center align-center">
        <v-col cols="12" md="6">
            <v-card class="pa-4">
                <v-card-title class="headline text-center">Taskliste</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="addTask">
                        <!-- Fach auswählen -->
                        <v-select
                            v-model="newTask.subject"
                            :items="subjects"
                            label="Fach"
                            outlined
                            required
                        ></v-select>

                        <!-- ECTS Punkte -->
                        <v-text-field
                            v-model.number="newTask.ects"
                            label="ECTS-Punkte für dieses Fach"
                            type="number"
                            min="1"
                            max="30"
                            outlined
                            required
                        ></v-text-field>

                        <!-- Anzahl der Abgaben -->
                        <v-text-field
                            v-model.number="newTask.submissionsCount"
                            label="Anzahl der Abgaben"
                            type="number"
                            min="1"
                            outlined
                            @input="generateSubmissionFields"
                            required
                        ></v-text-field>

                        <!-- Dynamisch generierte Felder für Abgaben -->
                        <div v-for="(submission, index) in newTask.submissions" :key="index" class="mt-4">
                            <v-text-field
                                v-model="submission.name"
                                label="Name der Abgabe"
                                outlined
                                required
                            ></v-text-field>
                            <v-menu
                                v-model="submission.menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="submission.dueDate"
                                        label="Fälligkeitsdatum"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        outlined
                                        required
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="submission.dueDate"
                                    @input="submission.menu = false"
                                    :min="new Date().toISOString().substr(0, 10)"
                                ></v-date-picker>
                            </v-menu>
                        </div>

                        <!-- Hinzufügen-Button -->
                        <v-btn color="primary" class="mt-4" block type="submit">
                            Aufgabe hinzufügen
                        </v-btn>
                    </v-form>

                    <!-- Fortschrittsanzeige für ECTS-Punkte -->
                    <div class="mt-6">
                        <h3 class="text-center">Fortschritt - 30 ECTS Ziel</h3>
                        <v-progress-linear :value="progress" color="green" height="20">
                            <template v-slot:default>
                                <span>{{ completedEcts }} / 30 ECTS</span>
                            </template>
                        </v-progress-linear>
                    </div>
                </v-card-text>
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

        <!-- Bearbeiten-Dialog -->
        <v-dialog v-model="editDialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Task bearbeiten</span>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <!-- Bearbeiten: Fach auswählen -->
                        <v-select
                            v-model="editedTask.subject"
                            :items="subjects"
                            label="Fach"
                            outlined
                            required
                        ></v-select>

                        <!-- Bearbeiten: ECTS Punkte -->
                        <v-text-field
                            v-model.number="editedTask.ects"
                            label="ECTS-Punkte"
                            type="number"
                            min="1"
                            max="30"
                            outlined
                            required
                        ></v-text-field>

                        <!-- Bearbeiten: Abgaben -->
                        <div v-for="(submission, index) in editedTask.submissions" :key="index" class="mt-4">
                            <v-text-field
                                v-model="submission.name"
                                label="Name der Abgabe"
                                outlined
                                required
                            ></v-text-field>
                            <v-menu
                                v-model="submission.menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="submission.dueDate"
                                        label="Fälligkeitsdatum"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        outlined
                                        required
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="submission.dueDate"
                                    @input="submission.menu = false"
                                    :min="new Date().toISOString().substr(0, 10)"
                                ></v-date-picker>
                            </v-menu>
                        </div>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="editDialog = false">Abbrechen</v-btn>
                    <v-btn color="primary" @click="saveTask">Speichern</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import Task from "@/components/Task.vue";

export default {
    name: "Tasklist",
    components: {Task},
    data() {
        return {
            subjects: ["SEPJ", "ITINF", "DIGMA", "SWRM", "ITSEC"], // Beispiel-Fächer
            newTask: {
                subject: null,
                ects: null,
                submissionsCount: null,
                submissions: [],
            },
            tasks: [],
            completedEcts: 0, // Fortschritt für ECTS
            editDialog: false, // Steuerung des Bearbeiten-Dialogs
            editedTask: null, // Temporärer Task für Bearbeitung
            editedTaskIndex: null, // Index des zu bearbeitenden Tasks
        };
    },
    beforeMount() {
        this.fetchTasks();
    },
    computed: {
        progress() {
            return (this.completedEcts / 30) * 100;
        },
        tasks() {
            return this.$store.state.tasks;
        },
    },
    methods: {
        async fetchTasks() {
            await this.$store.dispatch('fetchTasks');
        },

        addTask() {
            if (this.newTask.subject && this.newTask.ects && this.newTask.submissions.length) {
                this.tasks.push({...this.newTask});
                this.completedEcts += this.newTask.ects;
                this.resetForm();
            }
        },
        generateSubmissionFields() {
            this.newTask.submissions = Array.from({length: this.newTask.submissionsCount}, () => ({
                name: "",
                dueDate: "",
                menu: false,
            }));
        },
        removeTask(index) {
            this.completedEcts -= this.tasks[index].ects;
            this.tasks.splice(index, 1);
        },
        resetForm() {
            this.newTask = {
                subject: "",
                ects: 1,
                submissionsCount: 1,
                submissions: [],
            };
        },
    },
};
</script>

<style scoped>
.v-container {
    margin-top: 64px;
    margin-bottom: 120px;
}

.due-date {
    color: gray;
}

.task-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
}

.task-card {
    width: 150px; /* 60px breit */
    height: 200px; /* 100px hoch */
    border-radius: 8px;
    background-color: #fce5cd;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 0.8rem;
}

</style>