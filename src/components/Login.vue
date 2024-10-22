<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
// Axios hier importieren
import axios from 'axios';

export default {
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
      } catch (error) {
        console.error("Login fehlgeschlagen:", error);
        alert("Login fehlgeschlagen. Bitte überprüfen Sie Benutzername und Passwort.");
      }
    },
  },
};
</script>
