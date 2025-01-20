<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title class="headline">Create a new Semester and add Subjects</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <!-- Semesterinformationen -->
                    <v-text-field
                        v-model="semester.name"
                        label="Semester Name"
                        :rules="[v => !!v || 'Semester name is required']"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="semester.startDate"
                        label="Start date"
                        type="date"
                        :rules="[v => !!v || 'Start date is required']"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="semester.endDate"
                        label="End date"
                        type="date"
                        :rules="[v => !!v || 'End date is required']"
                        required
                    ></v-text-field>

                    <!-- Fächer hinzufügen -->
                    <v-divider class="my-4"></v-divider>
                    <v-subheader>Add Subjects</v-subheader>
                    <v-row v-for="(subject, index) in subjects" :key="index" align="center">
                        <v-col cols="5">
                            <v-text-field
                                v-model="subject.name"
                                label="Subject Name"
                                :rules="[v => !!v || 'Subject name is required']"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="5">
                            <v-text-field
                                v-model="subject.ects"
                                label="ECTS"
                                type="number"
                                :rules="[v => v > 0 || 'ECTS must be greater than 0']"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-btn icon @click="removeSubject(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-btn text @click="addSubject" prepend-icon="mdi-playlist-plus">add Subject</v-btn>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" variant="outlined" @click="saveData" append-icon="mdi-rocket-launch">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: true,
            valid: false,
            semester: {
                name: '',
                startDate: '',
                endDate: '',
            },
            subjects: [
                { name: '', ects: null },
            ],
        };
    },
    methods: {
        addSubject() {
            this.subjects.push({ name: '', ects: null });
        },
        removeSubject(index) {
            this.subjects.splice(index, 1);
        },
        saveData() {
            if (this.$refs.form.validate()) {
                // Daten speichern und Dialog schließen
                console.log('Semester:', this.semester);
                console.log('Fächer:', this.subjects);
                this.dialog = false;
            }
        },
    },
};
</script>

<style scoped>

</style>