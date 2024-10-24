<template>
  <v-app>
    <!-- Header-Komponente mit einem Event, um das Login-Fenster zu öffnen -->
    <Header @open-login="openLoginDialog" />

    <!-- LoginDialog-Komponente mit v-model zur Steuerung der Sichtbarkeit -->
    <LoginDialog :isOpen="loginDialogOpen" @update:modelValue="loginDialogOpen = $event"  />

    <v-main>
      <router-view/>
    </v-main>
    <Footer />
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
    };
  },
  methods: {
    openLoginDialog() {
      this.loginDialogOpen = true;
    },
  },
};
</script>
