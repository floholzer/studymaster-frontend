<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title>New Task for {{ subject.name }}</v-card-title>
            <v-card-text>
                <v-form ref="taskForm" v-model="valid">
                    <v-text-field
                        v-model="task.title"
                        label="Titel"
                        :rules="[v => !!v || 'Title is required']"
                        required
                    ></v-text-field>
                    <v-textarea
                        v-model="task.description"
                        label="Description"
                    ></v-textarea>
                    <v-text-field
                        v-model="task.dueDate"
                        label="Due Date"
                        type="date"
                    ></v-text-field>
                    <v-select
                        v-model="task.priority"
                        :items="['Low', 'Medium', 'High']"
                        label="Priority"
                    ></v-select>
                    <v-text-field
                        v-model="task.maxPoints"
                        label="Max Points"
                        type="number"
                        :rules="[v => !!v || 'Max Points are required']"
                        required
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" variant="outlined" @click="$emit('close')">Cancel</v-btn>
                <v-btn color="green darken-1" variant="flat" @click="save" append-icon="mdi-content-save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'TaskDialog',
        props: ["subject"],
        data() {
            return {
                dialog: true,
                valid: false,
                task: {
                    title: "",
                    description: "",
                    dueDate: "",
                    priority: "Medium",
                    maxPoints: null,
                },
            };
        },
        methods: {
            save() {
                if (this.$refs.taskForm.validate()) {
                    this.$emit("save", this.task);
                }
            },
        },
    };
</script>

<style scoped>

</style>