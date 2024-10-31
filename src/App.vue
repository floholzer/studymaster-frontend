<template>
    <v-app>
        <!-- Header-Komponente mit einem Event, um das Login-Fenster zu öffnen -->
        <Header @open-login="openLoginDialog"/>

        <!-- LoginDialog-Komponente mit v-model zur Steuerung der Sichtbarkeit -->
        <LoginDialog :isOpen="loginDialogOpen" @update:modelValue="loginDialogOpen = $event"
                     @login-success="handleLoginSuccess"/>

        <v-main>
            <router-view/>
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
            authToken: null, // Speichert das Authentifizierungs-Token nach erfolgreichem Login
        };
    },
    methods: {
        openLoginDialog() {
            this.loginDialogOpen = true;
        },
        // Handhabt das Token nach einem erfolgreichen Login
        handleLoginSuccess(token) {
            this.authToken = token;
            console.log('Token erhalten:', token);
        }
    },
};
</script>
