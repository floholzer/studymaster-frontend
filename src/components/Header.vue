<template>
    <v-app-bar scroll-behavior="collapse" :elevation="2" rounded app color="#A5B68D" dark>
        <v-toolbar-title>StudyMaster</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- Register Button -->
        <v-btn rounded="xl" color="#F87A53" variant="flat" @click="$emit('open-register')">
          Get Started
        </v-btn>
        <!-- Login Button -->
        <v-btn @click="$emit('open-login')">
          Login
        </v-btn>
    </v-app-bar>
</template>
<!-- color pallet https://colorhunt.co/palette/4c4b16898121e6c767f87a53 -->

<script>

export default {
    name: 'Header',
    methods: {
        login() {
            // Login-Logik hier implementieren
            console.log('Login button clicked');
            this.$router.push({ name: 'login' });
        },
    },
};
</script>

<style scoped>

</style>