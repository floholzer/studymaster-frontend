<template>
    <v-dialog :model-value="isOpen" persistent max-width="400px" @update:modelValue="onDialogClose">
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
        };
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
                    alert("Login successful!");
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        alert('Invalid username or password.');
                    } else {
                        console.error('Login error:', error);
                        alert('An error occurred. Please try again.');
                    }
                }
            } else {
                alert('Please enter username and password.');
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
                        alert('Registration successful! You can now log in.');
                        this.closeDialog();
                        await this.login();
                    }
                } catch (error) {
                    console.error('Registration error:', error);
                    alert('There was a problem with the registration. Please try again.');
                }
            } else if (this.password !== this.passwordConfirm) {
                alert('Passwords do not match.');
            } else {
                alert('Please fill in all fields.');
            }
        },
        toggleForm() {
            this.isRegistering = !this.isRegistering;
            this.password = '';
            this.passwordConfirm = '';
        },
        closeDialog() {
            this.$emit('update:modelValue', false);
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