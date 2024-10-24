<template>
  <v-dialog :model-value="isOpen" persistent max-width="400px" @update:modelValue="onDialogClose">
    <v-card>
      <v-card-title class="headline">Login</v-card-title>
      <v-card-text>
        <v-form>
          <!-- Benutzername -->
          <v-text-field
              v-model="username"
              label="Benutzername"
              required
          ></v-text-field>

          <!-- Passwort -->
          <v-text-field
              v-model="password"
              label="Passwort"
              type="password"
              required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <!-- Login-Button -->
        <v-btn color="primary" @click="login">Login</v-btn>

        <!-- Schließen-Button -->
        <v-btn text @click="closeDialog">Schließen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// Axios hier importieren
import axios from 'axios';

export default {
  name: 'LoginDialog',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:8080/auth/login", {
          username: this.username,
          password: this.password,
        });
        const token = response.data.jwt;
        // Speichere das Token im LocalStorage für zukünftige Anfragen
        localStorage.setItem("jwt", token);
        alert("Login erfolgreich!");

        this.closeDialog(); // Login Dialog schließen
      } catch (error) {
        console.error("Login fehlgeschlagen:", error);
        alert("Login fehlgeschlagen. Bitte überprüfen Sie Benutzername und Passwort.");
      }
    },
    closeDialog() {
      this.$emit('update:modelValue', false); // Login-Dialog schließen
    },
    onDialogClose(value) {
      // Übergabe des model-value Wertes nach außen
      this.$emit('update:modelValue', value);
    }
  },
};
</script>
