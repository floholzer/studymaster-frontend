<template>
  <div class="help-page" style="background: linear-gradient(135deg, #FFD3A5 ,#99BFBB);">
    <v-container class="py-10">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card elevation="8" class="pa-6">
            <v-card-title class="headline text-center mb-4">Help & Instructions</v-card-title>
            <v-divider class="mb-4"></v-divider>
            <v-card-text>
              <v-expansion-panels v-model="openPanel" variant="popout">
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <h3 class="title">First Steps</h3>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <div class="body-1">
                      Register using the provided form. If you're already a registered user, you can proceed to the login page by clicking the "Login here" button.
                      After registration, you can add the name of your semester and the subjects you are studying. You can add as many subjects as you like or skip this step and add them later.
                    </div>
                    <v-img
                        src="src/assets/screenshots/registration.png"
                        alt="Screenshot of registration form"
                        class="my-3"
                        max-height="300"
                    ></v-img>
                    <v-img
                        src="src/assets/screenshots/createSemester.png"
                        alt="Screenshot of creating semester"
                        class="my-3"
                        max-height="300"
                    ></v-img>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <h3 class="title">How can I update my semester?</h3>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <div class="body-1">
                      Klick on the menu in the upper right corner and select "Edit Semester". Here you can edit and update your semester.
                    </div>
                    <v-img
                        src="src/assets/screenshots/editSemester.png"
                        alt="Screenshot of editing semester"
                        class="my-3"
                        max-height="300"
                    ></v-img>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <h3 class="title">How can I add or edit a subject?</h3>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <div class="body-1">
                      Klick on the menu in the upper right corner and select "Edit Semester". Here you can add, delete and edit your subjects.
                    </div>
                    <v-img
                        src="src/assets/screenshots/editSubjects.png"
                        alt="Screenshot of editing subjects"
                        class="my-3"
                        max-height="250"
                    ></v-img>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <h3 class="title">How can I add Tasks?</h3>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <div class="body-1">
                      When you already added a subject, you can add tasks in your Tasklist by klicking "+ ADD TASK" in the respective subject.
                    </div>
                    <v-img
                        src="src/assets/screenshots/addTasks.png"
                        alt="Screenshot of adding tasks"
                        class="my-3"
                        max-height="300"
                    ></v-img>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <h3 class="title">How can I edit my Tasks?</h3>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <div class="body-1">
                      Tasks can be edited and deleted in your Tasklist by clicking on the respective button in the upper corners.
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <h3 class="title">How can I update my email address?</h3>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <div class="body-1">
                      Klick on the menu in the upper right corner and select "Profile". Here you can edit your name, username and email address.
                    </div>
                    <v-img
                        src="src/assets/screenshots/editProfile.png"
                        alt="Screenshot of editing profile"
                        class="my-3"
                        max-height="300">
                    </v-img>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Help',
  setup() {
    const openPanel = ref(null); // Standardmäßig ist kein Panel geöffnet
    return { openPanel };
  },
});
</script>

<style scoped>
.help-page {
  min-height: calc(98% - 50px); /* Berechnung: Bildschirmhöhe minus Footer */
}

.v-card {
  border-radius: 16px;
  background-color: #FFFFFF;
}

.title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
</style>