<template>
  <Header />
  <v-container class="fill-height" justify="center" align="center">
    <v-sheet elevation="3" class="pa-5 ma-5" max-width="400">
      <h1 class="text-center mb-4">{{ isLoginMode ? 'Login' : 'Registrierung' }}</h1>
      <v-form @submit.prevent="isLoginMode ? handleLogin : handleRegister">
        <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
            outlined
        />
        <v-text-field
            v-if="!isLoginMode"
            v-model="first_name"
            label="Vorname"
            type="text"
            required
            outlined
        />
        <v-text-field
            v-if="!isLoginMode"
            v-model="last_name"
            label="Nachname"
            type="text"
            required
            outlined
        />
        <v-text-field
            v-if="!isLoginMode"
            v-model="username"
            label="Benutzername"
            type="text"
            required
            outlined
        />
        <v-text-field
            v-model="password"
            label="Passwort"
            type="password"
            required
            outlined
        />
        <v-text-field
            v-if="!isLoginMode"
            v-model="confirmPassword"
            label="Passwort bestätigen"
            type="password"
            required
            outlined
        />
        <v-alert
            v-if="errorMessage"
            type="error"
            dense
            class="mt-3"
        >
          {{ errorMessage }}
        </v-alert>
        <v-btn
            class="mt-4"
            color="primary"
            block
            type="submit"
        >
          {{ isLoginMode ? 'Login' : 'Registrieren' }}
        </v-btn>
      </v-form>
      <p class="text-center mt-4">
        {{ isLoginMode ? 'Noch kein Konto?' : 'Schon ein Konto?' }}
        <v-btn text @click.prevent="toggleMode">{{ isLoginMode ? 'Registrieren' : 'Login' }}</v-btn>
      </p>
    </v-sheet>
  </v-container>
  <Footer />
</template>

<script setup>
import { ref } from 'vue';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const first_name = ref('');
const last_name = ref('');
const username = ref('');
const errorMessage = ref('');
const isLoginMode = ref(true);

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
  resetForm();
};

const resetForm = () => {
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
  first_name.value = '';
  last_name.value = '';
  username.value = '';
  errorMessage.value = '';
};

const handleLogin = () => {
  if (email.value === 'user@example.com' && password.value === 'password123') {
    alert('Login erfolgreich!');
  } else {
    errorMessage.value = 'Ungültige E-Mail oder Passwort. Bitte versuche es erneut.';
  }
};

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwörter stimmen nicht überein!';
  } else {
    alert('Registrierung erfolgreich!');
  }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.v-sheet {
  background-color: white;
}

.v-btn {
  cursor: pointer;
}
</style>