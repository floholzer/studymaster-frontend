<template>
    <v-app-bar scroll-behavior="collapse" :elevation="2" rounded app color="#A5B68D" dark>
        <v-toolbar-title>StudyMaster</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn variant="tonal" @click="login">Login</v-btn>
    </v-app-bar>
</template>

<script>

export default {
    name: 'Header',
    methods: {
        login() {
            // Login-Logik hier implementieren
            console.log('Login button clicked');
        },
    },
};
</script>

<style scoped>
/* Optional: Stil-Anpassungen */
</style>