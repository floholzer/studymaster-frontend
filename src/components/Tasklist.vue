<template>
  <v-container fluid class="d-flex justify-center align-center fill-height">
    <v-col cols="12" md="4">
      <v-card>
        <v-card-title class="headline text-center">Taskliste</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addTask">
            <!-- Aufgaben-Eingabefeld -->
            <v-text-field
                v-model="newTask.name"
                label="Neue Aufgabe"
                placeholder="Aufgabe hinzufügen"
                required
            ></v-text-field>

            <!-- Fälligkeitsdatum-Eingabefeld -->
            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="newTask.dueDate"
                    label="Fälligkeitsdatum"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="newTask.dueDate"
                  @change="menu = false"
                  :min="new Date().toISOString().substr(0, 10)" <!-- Optional: Setzt das minimale Datum auf heute -->
              ></v-date-picker>
            </v-menu>

            <!-- Hinzufügen-Button -->
            <v-btn color="primary" class="mt-4" block type="submit">
              Aufgabe hinzufügen
            </v-btn>
          </v-form>

          <!-- Aufgabenliste -->
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(task, index) in tasks" :key="index">
                <v-list-item-content>
                  <div class="task-name">{{ task.name }}</div>
                  <small class="due-date">Fällig bis: {{ task.dueDate || 'Kein Datum angegeben' }}</small>
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
  name: 'Tasklist',
  data() {
    return {
      menu: false, // Steuerung des Datumsauswahlmenüs
      newTask: {
        name: '',
        dueDate: '', // Speichert das Fälligkeitsdatum für die neue Aufgabe
      },
      tasks: [],
    };
  },
  methods: {
    addTask() {
      if (this.newTask.name.trim()) {
        this.tasks.push({
          name: this.newTask.name.trim(),
          dueDate: this.newTask.dueDate, // Speichert das ausgewählte Fälligkeitsdatum
        });
        this.resetForm(); // Eingabefelder zurücksetzen
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1); // Entfernt die Aufgabe an der angegebenen Position
    },
    resetForm() {
      this.newTask.name = '';
      this.newTask.dueDate = '';
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh; /* Füllt die gesamte Höhe des Bildschirms */
}
.task-name {
  font-weight: bold;
}
.due-date {
  color: gray;
}
</style>