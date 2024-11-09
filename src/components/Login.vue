<template>
    <v-container class="d-flex justify-center">
        <v-card class="pa-5" max-width="500" width="100%">
            <v-form>
                <h2>
                    <v-icon class="mr-2">mdi-login</v-icon>
                    Login
                </h2>
                <v-text-field
                    v-model="userData.username"
                    label="Username"
                    prepend-icon="mdi-account"
                    outlined
                    required
                />
                <v-text-field
                    v-model="userData.password"
                    label="Password"
                    type="password"
                    prepend-icon="mdi-lock"
                    outlined
                    required
                />
                <v-row class="justify-end">
                    <v-btn class="my-4 mx-4" type="submit" @click.prevent="userLogin()">Login</v-btn>
                </v-row>
                <v-row>
                    <v-col>
                        <router-link to="/signup">Don't have an account yet? Sign up here</router-link>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import {mapActions} from "vuex";

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
        ...mapActions(['login']),
        async userLogin() {
            try {
                await this.login({
                    username: this.userData.username,
                    password: this.userData.password
                });

                this.$router.push('/studymaster');
            } catch (error) {
                alert(error.message || 'Login fehlgeschlagen. Bitte versuchen Sie es erneut.');
            }
        },
    },
};
</script>

<style scoped>

</style>