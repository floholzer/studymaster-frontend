<template>
  <Header />
  <div class="login-container">
    <div class="login-box">
      <h1>{{ isLoginMode ? 'Login' : 'Registrierung' }}</h1>
      <form @submit.prevent="isLoginMode ? handleLogin : handleRegister">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div v-if="!isLoginMode" class="input-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div v-if="!isLoginMode" class="input-group">
          <label for="username">Benutzername</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div v-if="!isLoginMode" class="input-group">
          <label for="confirmPassword">Passwort bestätigen</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <button type="submit" class="login-button">{{ isLoginMode ? 'Login' : 'Registrieren' }}</button>
      </form>
      <p class="toggle-text">
        {{ isLoginMode ? 'Noch kein Konto?' : 'Schon ein Konto?' }}
        <a href="#" @click.prevent="toggleMode">{{ isLoginMode ? 'Registrieren' : 'Login' }}</a>
      </p>
    </div>
  </div>
  <Footer />
</template>

<script>
import { defineComponent, ref } from 'vue';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: 'LoginView',
  components: {Footer, Header},
  setup() {
    const email = ref('');
    const password = ref('');
    const name = ref(''); // Neu für Registrierung
    const username = ref(''); // Neu für Registrierung
    const confirmPassword = ref(''); // Neu für Registrierung
    const errorMessage = ref('');
    const isLoginMode = ref(true); // Login- oder Registrierungsmodus

    const toggleMode = () => {
      isLoginMode.value = !isLoginMode.value;
      resetForm();
    };

    const resetForm = () => {
      email.value = '';
      password.value = '';
      name.value = '';
      username.value = '';
      confirmPassword.value = '';
      errorMessage.value = '';
    };

    const handleLogin = () => {
      // Dummy login validation
      if (email.value === 'user@example.com' && password.value === 'password123') {
        alert('Login erfolgreich!');
      } else {
        errorMessage.value = 'Ungültige E-Mail oder Passwort. Bitte versuche es erneut.';
      }
    };

    const handleRegister = () => {
      // Dummy registration validation
      if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwörter stimmen nicht überein!';
      } else {
        alert('Registrierung erfolgreich!');
      }
    };

    return {
      email,
      password,
      name,
      username,
      confirmPassword,
      errorMessage,
      isLoginMode,
      toggleMode,
      handleLogin,
      handleRegister,
    };
  },
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.input-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

.toggle-text {
  text-align: center;
  margin-top: 1.5rem;
}

.toggle-text a {
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}

.toggle-text a:hover {
  text-decoration: underline;
}
</style>