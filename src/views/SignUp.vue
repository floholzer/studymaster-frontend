<template>
    <v-container class="signup">
        <v-row>
            <v-col class="v-col-3">
                <v-spacer/>
            </v-col>
            <v-col>
                <v-card elevation="3" class="pa-5 ma-5">
                    <h1>Sign Up</h1>
                    <p>Create your account</p>
                    <v-form @submit.prevent="submitForm">
                        <v-text-field
                            v-model="form.name"
                            label="Name"
                            type="text"
                            placeholder="Your Name"
                            outlined
                            required
                        />
                        <v-text-field
                            v-model="form.email"
                            label="Email"
                            type="email"
                            placeholder="Your Email"
                            outlined
                            required
                        />
                        <v-text-field
                            v-model="form.password"
                            label="Password"
                            type="password"
                            placeholder="Your Password"
                            outlined
                            required
                        />
                        <v-btn class="mt-4" color="primary" block type="submit">
                            Sign Up
                        </v-btn>
                    </v-form>

                    <v-alert v-if="submitted" type="success" class="mt-4">
                        Thank you for signing up! Please check your email to verify your account.
                    </v-alert>
                </v-card>
            </v-col>
            <v-col class="v-col-3">
                <v-spacer/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import {ref} from 'vue';

const form = ref({
    name: '',
    email: '',
    password: '',
});
const submitted = ref(false);

const submitForm = () => {
    // Add API integration here
    console.log('Form submitted:', form.value);
    submitted.value = true;

    // Clear form after submission
    form.value.name = '';
    form.value.email = '';
    form.value.password = '';
};
</script>

<style scoped>
@media (min-width: 1024px) {
    .signup {
        display: flex;
        align-items: center;
    }
}
</style>