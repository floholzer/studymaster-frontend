<template>
    <v-container class="d-flex justify-center py-10">
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
        };
    },
    methods: {
        async userLogin() {
            try {
                await this.$store.dispatch('login', {
                    username: this.userData.username,
                    password: this.userData.password,
                });

                this.$router.push('/studymaster');
            } catch (error) {
                alert(error.message || 'Login failed. Please try again.');
            }
        },
    },
};
</script>

<style scoped>

</style>