<template>
    <v-container class="d-flex justify-center">
        <v-card class="pa-5" max-width="800" width="100%">
            <v-form>
                <h1>Get started</h1>
                <p>Create your account</p>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="userData.username"
                            label="Username"
                            type="text"
                            outlined
                            required
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="userData.email"
                            label="Email"
                            type="email"
                            outlined
                            required
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
                        />
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-btn class="my-4 mx-4" type="submit" @click.prevent="userSignUp()">
                        Sign Up
                    </v-btn>
                </v-row>
                <v-row justify="center">
                    <v-col>
                        <router-link to="/login">Already have an account? Login here</router-link>
                    </v-col>
                </v-row>

            </v-form>
        </v-card>

    </v-container>
</template>

<script>
import {mapActions} from "vuex";

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
        ...mapActions(['register']),
        async userSignUp() {
            try {
                await this.register({
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