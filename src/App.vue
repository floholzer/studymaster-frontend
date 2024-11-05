<template>
    <v-app>
        <Header :isLoggedIn="isLoggedIn" @open-login="openLoginDialog" @logout="logout"/>
        <LoginDialog :isOpen="loginDialogOpen" @update:modelValue="loginDialogOpen = $event" @login-success="handleLoginSuccess"/>
        <v-main>
            <router-view :isLoggedIn="isLoggedIn" @open-login="openLoginDialog"/>
        </v-main>
        <Footer/>
    </v-app>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import LoginDialog from "@/components/LoginDialog.vue";

export default {
    name: 'App',
    components: {
        Header,
        LoginDialog,
        Footer,
    },
    data() {
        return {
            loginDialogOpen: false,
            authToken: null,
            isLoggedIn: false,
        };
    },
    created() {
        const token = localStorage.getItem("jwt");
        if (token) {
            this.authToken = token;
            this.isLoggedIn = true;
        }
    },
    methods: {
        openLoginDialog() {
            this.loginDialogOpen = true;
        },
        handleLoginSuccess(token) {
            this.authToken = token;
            this.isLoggedIn = true;
            console.log('Token received:', token);
        },
        logout() {
            this.authToken = null;
            this.isLoggedIn = false;
            localStorage.removeItem("jwt");
        }
    },
};
</script>