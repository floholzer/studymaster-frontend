<template>
    <div>
        <h2>Registrierung</h2>
        <form @submit.prevent="register">
            <div>
                <label for="username">Benutzername:</label>
                <input v-model="username" type="text" id="username" required/>
            </div>
            <div>
                <label for="email">E-Mail:</label>
                <input v-model="email" type="email" id="email" required/>
            </div>
            <div>
                <label for="password">Passwort:</label>
                <input v-model="password" type="password" id="password" required/>
            </div>
            <button type="submit">Registrieren</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post("http://localhost:8080/api/users/register", {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                });
                alert("Registrierung erfolgreich!");
            } catch (error) {
                console.error("Registrierung fehlgeschlagen:", error);
                alert("Fehler bei der Registrierung. Bitte versuchen Sie es erneut.");
            }
        },
    },
};
</script>
