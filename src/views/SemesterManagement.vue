<template>
    <Header/>
    <div class="SemesterManagement">
        <v-container class="d-flex flex-column" style="max-width: 800px">
            <v-toolbar flat color="transparent">
                <v-toolbar-title class="text-h4 primary--text">Semester Management</v-toolbar-title>
            </v-toolbar>

            <!-- Semester Bearbeiten -->
            <v-card v-if="currentSemester" class="mb-6">
                <v-card-title class="text-h5">Edit Semester</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="updateSemester">
                        <v-text-field
                            v-model="currentSemester.name"
                            label="Semester Name"
                            required
                            outlined
                            class="mb-4"
                        ></v-text-field>

                        <v-select
                            v-model="currentSemester.status"
                            :items="['open', 'completed']"
                            label="Status"
                            outlined
                            class="mb-4"
                        ></v-select>

                        <v-btn type="submit" color="primary" depressed>Update Semester</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>

            <!-- Subjects Section -->
            <v-card v-if="currentSemester">
                <v-card-title class="text-h5">Edit Subjects</v-card-title>

                <!-- Subjects List -->
                <v-list>
                    <v-list-item v-for="subject in subjects" :key="subject.id">
                        <v-list-item-content class="d-flex justify-space-between align-center">
                            <div>
                                <v-list-item-title>{{ subject.name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ subject.status }}</v-list-item-subtitle>
                            </div>
                            <div>
                                <v-btn class="mx-2 my-1" icon @click="editSubject(subject)">
                                    <v-icon color="grey">mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn icon @click="deleteSubject(subject.id)">
                                    <v-icon color="error">mdi-delete</v-icon>
                                </v-btn>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>


                <!-- Add New Subject -->
                <v-card-actions>
                    <v-btn
                        color="primary"
                        @click="showAddDialog = true"
                        class="mx-4 mb-4"
                    >
                        <v-icon left>mdi-plus</v-icon>
                        Add Subject
                    </v-btn>
                </v-card-actions>
            </v-card>

            <!-- Edit Subject Dialog -->
            <v-dialog v-model="editingSubject" max-width="500">
                <v-card v-if="editingSubject">
                    <v-card-title class="text-h5">Edit Subject</v-card-title>

                    <v-card-text>
                        <v-form @submit.prevent="updateSubject">
                            <v-text-field
                                v-model="editingSubject.name"
                                label="Subject Name"
                                required
                                outlined
                                class="mb-4"
                            ></v-text-field>

                            <v-select
                                v-model="editingSubject.status"
                                :items="['open', 'completed']"
                                label="Status"
                                outlined
                                class="mb-4"
                            ></v-select>

                            <div class="d-flex justify-end">
                                <v-btn @click="cancelEdit" class="mr-2">Cancel</v-btn>
                                <v-btn type="submit" color="primary">Save Changes</v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-container>
    </div>

    <!-- Add Subject Dialog -->
    <v-dialog v-model="showAddDialog" max-width="500">
        <v-card>
            <v-card-title class="text-h5">Add New Subject</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="addSubject" ref="addForm">
                    <v-text-field
                        v-model="newSubject.name"
                        label="Subject Name"
                        required
                        outlined
                        class="mb-4"
                        :rules="[v => !!v || 'Name is required']"
                    ></v-text-field>

                    <v-select
                        v-model="newSubject.status"
                        :items="['open', 'completed']"
                        label="Status"
                        outlined
                        class="mb-4"
                        :rules="[v => !!v || 'Status is required']"
                    ></v-select>

                    <div class="d-flex justify-end">
                        <v-btn @click="showAddDialog = false" class="mr-2">Cancel</v-btn>
                        <v-btn type="submit" color="primary">Add Subject</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from "@/components/Header.vue";

export default {
    components: {Header},
    data() {
        return {
            currentSemester: null,
            showAddDialog: false,
            newSubject: {
                name: '',
                status: 'open',
                semesterId: null,
            },
            editingSubject: null,
        };
    },
    computed: {
        ...mapGetters(['getSubjects']),
        semesters() {
            return this.$store.state.semesters;
        },
        subjects() {
            return this.getSubjects;
        },
    },
    async created() {
        await this.$store.dispatch('getSemesters');
        if (this.semesters.length > 0) {
            this.currentSemester = this.semesters[0]; // Beispiel: Erstes Semester auswählen
            await this.$store.dispatch('getSubjects', this.currentSemester.id);
        }
    },
    methods: {
        ...mapActions(['getSemesters', 'getSubjects', 'updateSemester', 'addSubject', 'updateSubject', 'deleteSubject']),


        async updateSemester() {
            await this.$store.dispatch('updateSemester', this.currentSemester);
            alert('Semester updated successfully!');
        },

        async addSubject() {
            if (this.$refs.addForm.validate()) {
                try {
                    this.newSubject.semesterId = this.currentSemester.id;
                    await this.$store.dispatch('addSubject', this.newSubject);
                    this.showAddDialog = false;
                    this.newSubject = {
                        name: '',
                        status: 'open',
                        semesterId: null
                    };
                    this.$refs.addForm.resetValidation();
                } catch (error) {
                    console.error("Error adding subject:", error);
                }
            }
        },

        editSubject(subject) {
            this.editingSubject = { ...subject };
        },

        async updateSubject() {
            await this.$store.dispatch('updateSubject', this.editingSubject);
            this.editingSubject = null;
        },

        async deleteSubject(subjectId) {
            if (confirm('Are you sure you want to delete this subject?')) {
                await this.$store.dispatch('deleteSubject', subjectId);
            }
        },

        cancelEdit() {
            this.editingSubject = null;
        },
    },
};
</script>

<style scoped>
.SemesterManagement {
    min-height: calc(98% - 50px); /* Berechnung: Bildschirmhöhe minus Footer */
    background: linear-gradient(
        135deg,
        rgba(101, 116, 255, 0.1) 0%,
        rgba(150, 116, 255, 0.1) 25%,
        rgba(225, 116, 255, 0.1) 50%,
        rgba(150, 116, 255, 0.1) 75%,
        rgba(101, 116, 255, 0.1) 100%
    );
    animation: gradientShift 20s ease infinite;
    background-size: 400% 400%;
}
.v-card {
    margin-bottom: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-radius: 12px !important;
    background: rgba(255, 255, 255, 0.9) !important;
    backdrop-filter: blur(8px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.v-list-item {
    transition: background-color 0.3s;
}

.v-list-item:hover {
    background-color: #f5f5f5;
}
</style>