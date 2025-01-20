<template>
    <v-container class="login-container d-flex justify-center py-10">
        <v-card class="pa-5" max-width="500" width="100%" elevation="8">
            <v-form>
                <v-row justify="center" class="mb-4">
                    <v-col cols="12" class="text-center">
                        <h2 class="display-1">
                            <v-icon class="mr-2" color="#F87A53">mdi-login</v-icon>
                            Login
                        </h2>
                        <p class="subtitle-2">Access your StudyMaster account</p>
                    </v-col>
                </v-row>

                <v-alert class="my-4" v-if="errorMessage" type="error" dismissible>{{ errorMessage }}</v-alert>

                <v-text-field
                    v-model="userData.username"
                    label="Username"
                    prepend-icon="mdi-account"
                    outlined
                    required
                    :rules="[v => !!v || 'Username is required']"
                />

                <v-text-field
                    v-model="userData.password"
                    label="Password"
                    type="password"
                    prepend-icon="mdi-lock"
                    outlined
                    required
                    :rules="[v => v.length >= 6 || 'Password must be at least 6 characters']"
                    hint="Minimum 6 characters"
                    persistent-hint
                />

                <v-row class="justify-end">
                    <v-btn class="my-4 mx-4" color="#F87A53" type="submit" @click.prevent="userLogin()" large>
                        Login
                    </v-btn>
                </v-row>

                <v-row justify="center" class="mt-2">
                    <v-col class="text-center">
                        <router-link to="/signup" class="text-decoration-none" style="color: #F87A53;">
                            Don't have an account yet? <strong>Sign up here</strong>
                        </router-link>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            userData: {
                username: "",
                password: "",
            },
            errorMessage: "", // Hinzufügen eines Fehler-States
        };
    },
    methods: {
        async userLogin() {
            const result = await this.$store.dispatch('login', {
                username: this.userData.username,
                password: this.userData.password,
            });

            if (!result.success) {
                this.errorMessage = result.message; // Fehlernachricht setzen
                this.userData.password = ""; // Passwort zurücksetzen
            } else {
                this.errorMessage = "";
                this.$router.push('/studymaster');
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(98% - 50px); /* Berechnung: Bildschirmhöhe minus Footer */
    padding: 20px; /* Außenabstand */
}
</style>
