<template>
    <v-app-bar app color="light-green" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
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