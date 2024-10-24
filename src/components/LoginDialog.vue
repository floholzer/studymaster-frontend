<template>
  <v-dialog :model-value="isOpen" persistent max-width="400px" @update:modelValue="onDialogClose">
    <v-card>
      <v-card-title class="headline">
        <!-- Dynamischer Titel -->
        {{ isRegistering ? 'Registrieren' : 'Login' }}
      </v-card-title>
      <v-card-text>
        <v-form>
          <!-- Gemeinsames Benutzername-Feld -->
          <v-text-field
              v-model="username"
              label="Benutzername"
              required
          ></v-text-field>

          <!-- Passwortfeld für Login und Registrierung -->
          <v-text-field
              v-model="password"
              label="Passwort"
              type="password"
              required
          ></v-text-field>

          <!-- Wiederholung des Passworts nur bei Registrierung -->
          <v-text-field
              v-if="isRegistering"
              v-model="passwordConfirm"
              label="Passwort bestätigen"
              type="password"
              required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <!-- Umschalten zwischen Login und Registrierung -->
        <v-btn @click="toggleForm">
          {{ isRegistering ? 'Zum Login' : 'Registrieren' }}
        </v-btn>

        <v-spacer/>

        <!-- Dynamischer Button für Login oder Registrierung -->
        <v-btn color="primary" variant="elevated" @click="isRegistering ? register : login">
          {{ isRegistering ? 'Registrieren' : 'Login' }}
        </v-btn>

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
      passwordConfirm: "",
      isRegistering: false,
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
    async register() {
      try {
        if (this.username && this.password && this.password === this.passwordConfirm) {
          alert(`Registrierung erfolgreich! Benutzername: ${this.username}`);
          this.closeDialog();
        } else if (this.password !== this.passwordConfirm) {
          alert('Die Passwörter stimmen nicht überein.');
        } else {
          alert('Bitte alle Felder ausfüllen.');
        }
      } catch (error) {
        console.error("Register fehlgeschlagen:", error);
      }
    },
    // Umschalten zwischen Login und Registrierung
    toggleForm() {
      this.isRegistering = !this.isRegistering;
      this.password = '';
      this.passwordConfirm = '';
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
