<template>
    <v-container fluid class="d-flex justify-center align-center fill-height">
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

                    <!-- Aufgabenliste -->
                    <v-list class="mt-6">
                        <v-list-item-group>
                            <v-list-item v-for="(task, index) in tasks" :key="index">
                                <v-list-item-content>
                                    <div class="task-name">{{ task.subject }} - {{ task.ects }} ECTS</div>
                                    <div v-for="submission in task.submissions" :key="submission.name">
                                        <small>{{ submission.name }} - Fällig bis: {{ submission.dueDate }}</small>
                                    </div>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn icon @click="removeTask(index)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
export default {
    name: "Tasklist",
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
        };
    },
    computed: {
        progress() {
            return (this.completedEcts / 30) * 100;
        },
    },
    methods: {
        addTask() {
            // Aufgabe hinzufügen und ECTS zur Fortschrittsanzeige hinzufügen
            if (this.newTask.subject && this.newTask.ects && this.newTask.submissions.length) {
                this.tasks.push({...this.newTask});
                this.completedEcts += this.newTask.ects;
                this.resetForm();
            }
        },
        generateSubmissionFields() {
            // Generiert Felder für jede Abgabe
            this.newTask.submissions = Array.from({length: this.newTask.submissionsCount}, () => ({
                name: "",
                dueDate: "",
                menu: false,
            }));
        },
        removeTask(index) {
            // Entfernt die Aufgabe und aktualisiert die Fortschrittsanzeige
            this.completedEcts -= this.tasks[index].ects;
            this.tasks.splice(index, 1);
        },
        resetForm() {
            // Formular und Abgabefelder zurücksetzen
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
.fill-height {
    height: 100vh;
}

.task-name {
    font-weight: bold;
}

.due-date {
    color: gray;
}
</style>