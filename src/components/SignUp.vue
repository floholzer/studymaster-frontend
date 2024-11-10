<template>
    <v-container class="d-flex justify-center py-10">
        <v-card class="pa-5" max-width="800" width="100%" elevation="10">
            <v-form>
                <v-row justify="center" class="mb-6">
                    <v-col cols="12" class="text-center">
                        <h1 class="display-1">Get Started</h1>
                        <p class="subtitle-1">Create your account and join the StudyMaster community.</p>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="userData.username"
                            label="Username"
                            type="text"
                            outlined
                            required
                            :rules="[v => !!v || 'Username is required']"
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="userData.email"
                            label="Email"
                            type="email"
                            outlined
                            required
                            :rules="[v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
                        />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            v-model="userData.password"
                            label="Password"
                            type="password"
                            outlined
                            required
                            :rules="[v => v.length >= 6 || 'Password must be at least 6 characters']"
                            hint="Minimum 6 characters"
                            persistent-hint
                        />
                    </v-col>
                </v-row>

                <v-row justify="center">
                    <v-btn class="my-4 mx-4" color="primary" type="submit" @click.prevent="userSignUp()" large>
                        Sign Up
                    </v-btn>
                </v-row>

                <v-row justify="center" class="mt-2">
                    <v-col class="text-center">
                        <router-link to="/login" class="text-decoration-none" style="color: #F87A53;">
                            Already have an account? <strong>Login here</strong>
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
    name: "SignUp",
    data() {
        return {
            userData: {
                username: "",
                email: "",
                password: "",
            },
        };
    },
    methods: {
        async userSignUp() {
            try {
                await this.$store.dispatch('register', {
                    username: this.userData.username,
                    email: this.userData.email,
                    password: this.userData.password,
                });

                this.$router.push('/studymaster');
            } catch (error) {
                alert('Registration failed. Please try again.');
                console.error(error);
            }
        },
    },
};
</script>

<style scoped>
@media (min-width: 1024px) {
    .signup {
        display: flex;
        align-items: center;
    }
}
</style>