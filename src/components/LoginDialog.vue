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
                    />

                    <!-- Passwortfeld für Login und Registrierung -->
                    <v-text-field
                        v-model="password"
                        label="Passwort"
                        type="password"
                        required
                    />

                    <!-- Wiederholung des Passworts nur bei Registrierung -->
                    <v-text-field
                        v-if="isRegistering"
                        v-model="passwordConfirm"
                        label="Passwort bestätigen"
                        type="password"
                        required
                    />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <!-- Umschalten zwischen Login und Registrierung -->
                <v-btn text @click="toggleForm">
                    {{ isRegistering ? 'Zum Login' : 'Registrieren' }}
                </v-btn>
                <v-spacer/>
                <!-- Login- oder Registrieren-Button basierend auf Zustand -->
                <v-btn color="primary" variant="elevated" v-if="!isRegistering" @click="login">
                    Login
                </v-btn>

                <v-btn color="primary" variant="elevated" v-if="isRegistering" @click="register">
                    Registrieren
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
            console.log("login");

            if (this.username && this.password) {
                try {
                    const response = await axios.post("http://localhost:8080/auth/login", {
                        username: this.username,
                        password: this.password,
                    });
                    const token = response.data.jwt;

                    // Speichere das Token im LocalStorage für zukünftige Anfragen
                    localStorage.setItem("jwt", token);

                    this.$emit('login-success', token);
                    this.closeDialog();
                    alert("Login erfolgreich!");

                } catch (error) {
                    // Fehlerbehandlung (z.B. falsche Login-Daten)
                    if (error.response && error.response.status === 401) {
                        alert('Ungültiger Benutzername oder Passwort.');
                    } else {
                        console.error('Login-Fehler:', error);
                        alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
                    }
                }
            } else {
                alert('Bitte Benutzername und Passwort eingeben.');
            }
        },
        async register() {
            if (this.username && this.password && this.password === this.passwordConfirm) {
                try {
                    // Sende POST-Anfrage an den Registrierungs-Endpunkt
                    const response = await axios.post('http://localhost:8080/api/users/register', {
                        username: this.username,
                        email: this.username + "@email.com",
                        password: this.password,
                        first_name: this.username,
                        last_name: "",
                        is_admin: false

                    });

                    // Erfolgreiche Registrierung
                    if (response.status === 200) {
                        alert('Registrierung erfolgreich! Sie können sich jetzt einloggen.');
                        this.closeDialog();
                        await this.login();
                    }
                } catch (error) {
                    console.error('Registrierungsfehler:', error);
                    alert('Es gab ein Problem bei der Registrierung. Bitte versuchen Sie es erneut.');
                }
            } else if (this.password !== this.passwordConfirm) {
                alert('Die Passwörter stimmen nicht überein.');
            } else {
                alert('Bitte alle Felder ausfüllen.');
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
