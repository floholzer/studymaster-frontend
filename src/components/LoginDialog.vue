<template>
    <v-dialog :model-value="isOpen" persistent max-width="400px" @update:modelValue="onDialogClose" @opened="focusUsername">
        <v-card>
            <v-card-title class="headline">
                <v-icon class="mr-2">{{ isRegistering ? 'mdi-account-plus' : 'mdi-login' }}</v-icon>
                {{ isRegistering ? 'Register' : 'Login' }}
            </v-card-title>
            <v-card-text>
                <v-form @keydown.enter="submitForm">
                    <v-text-field
                        v-model="username"
                        label="Username"
                        prepend-icon="mdi-account"
                        required
                        ref="usernameField"
                    />
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        prepend-icon="mdi-lock"
                        required
                    />
                    <v-text-field
                        v-if="isRegistering"
                        v-model="passwordConfirm"
                        label="Confirm Password"
                        type="password"
                        prepend-icon="mdi-lock-check"
                        required
                    />
                </v-form>
                <v-alert v-if="alertMessage" :type="alertType" dismissible @input="alertMessage = ''">
                    {{ alertMessage }}
                </v-alert>
            </v-card-text>
            <v-card-actions>
                <v-btn text @click="toggleForm">
                    {{ isRegistering ? 'Switch to Login' : 'Register' }}
                </v-btn>
                <v-spacer/>
                <v-btn color="primary" variant="elevated" v-if="!isRegistering" @click="login">
                    Login
                </v-btn>
                <v-btn color="primary" variant="elevated" v-if="isRegistering" @click="register">
                    Register
                </v-btn>
                <v-btn text @click="closeDialog">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
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
            alertMessage: "",
            alertType: "info",
        };
    },
    watch: {
        isOpen(newVal) {
            if (newVal) {
                this.$nextTick(() => {
                    this.$refs.usernameField.focus();
                });
            }
        }
    },
    methods: {
        async login() {
            if (this.username && this.password) {
                try {
                    const response = await axios.post("http://localhost:8080/auth/login", {
                        username: this.username,
                        password: this.password,
                    });
                    const token = response.data.jwt;
                    localStorage.setItem("jwt", token);
                    this.$emit('login-success', token);
                    this.closeDialog();
                    this.showAlert("Login successful!", "success");
                } catch (error) {
                    this.password = "";
                    if (error.response && error.response.status === 401) {
                        this.showAlert('Invalid username or password.', 'error');
                    } else {
                        console.error('Login error:', error);
                        this.showAlert('An error occurred. Please try again.', 'error');
                    }
                }
            } else {
                this.showAlert('Please enter username and password.', 'warning');
            }
        },
        async register() {
            if (this.username && this.password && this.password === this.passwordConfirm) {
                try {
                    const response = await axios.post('http://localhost:8080/api/users/register', {
                        username: this.username,
                        email: this.username + "@email.com",
                        password: this.password,
                        first_name: this.username,
                        last_name: "",
                        is_admin: false
                    });
                    if (response.status === 200) {
                        this.showAlert('Registration successful! You can now log in.', 'success');
                        this.closeDialog();
                        await this.login();
                    }
                } catch (error) {
                    console.error('Registration error:', error);
                    this.showAlert('There was a problem with the registration. Please try again.', 'error');
                }
            } else if (this.password !== this.passwordConfirm) {
                this.showAlert('Passwords do not match.', 'warning');
            } else {
                this.showAlert('Please fill in all fields.', 'warning');
            }
        },
        toggleForm() {
            this.isRegistering = !this.isRegistering;
            this.password = '';
            this.passwordConfirm = '';
        },
        closeDialog() {
            this.$emit('update:modelValue', false);
            this.username = "";
            this.password = "";
            this.passwordConfirm = "";
            this.alertMessage = "";
        },
        onDialogClose(value) {
            this.$emit('update:modelValue', value);
        },
        submitForm() {
            if (this.isRegistering) {
                this.register();
            } else {
                this.login();
            }
        },
        showAlert(message, type) {
            this.alertMessage = message;
            this.alertType = type;
        }
    },
};
</script>

<style scoped>
.v-card-title {
    display: flex;
    align-items: center;
}
</style>