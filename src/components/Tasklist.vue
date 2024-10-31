<template>
    <v-container fluid>
        <v-row justify="end">
            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title class="headline">Taskliste</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="addTask">

                            <v-text-field
                                v-model="newTask"
                                label="Neue Aufgabe"
                                placeholder="Aufgabe hinzufügen"
                                required
                            ></v-text-field>
                        </v-form>

                        <v-list>
                            <v-list-item-group>
                                <v-list-item
                                    v-for="(task, index) in tasks"
                                    :key="index"
                                >
                                    <v-list-item-content>{{ task }}</v-list-item-content>
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
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Tasklist',
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            newTask: "",
            tasks: [],
        };
    },
    methods: {
        addTask() {
            if (this.newTask.trim()) {
                this.tasks.push(this.newTask.trim());
                this.newTask = ""; // Eingabefeld leeren
            }
        },
        removeTask(index) {
            this.tasks.splice(index, 1); // Entfernt die Aufgabe an der angegebenen Position
        },
        closeDialog() {
            this.$emit('update:modelValue', false); // Schließt den Dialog
        },
        onDialogClose(value) {
            // Übergibt den model-value Wert nach außen
            this.$emit('update:modelValue', value);
        }
    },
};
</script>