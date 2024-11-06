<script setup>
import { ref } from 'vue';

const userProfile = ref({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirmation: ''
});

const formRef = ref(null);

const saveProfile = () => {
    if (formRef.value.validate()) {
        // Handle profile save logic here
        console.log('Profile saved:', userProfile.value);
    }
};
</script>

<template>
    <v-container>
        <v-card>
            <v-card-title>Edit Profile</v-card-title>
            <v-card-text>
                <v-form ref="formRef">
                    <v-text-field
                        v-model="userProfile.firstname"
                        label="Firstname"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="userProfile.lastname"
                        label="Lastname"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="userProfile.email"
                        label="Email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="userProfile.password"
                        label="Password"
                        type="password"
                    ></v-text-field>
                    <v-text-field
                        v-model="userProfile.passwordConfirmation"
                        label="Confirm Password"
                        type="password"
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="elevated" color="#8C403A" @click="saveProfile">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<style scoped>
.v-container {
    max-width: 600px;
    margin: auto;
    padding-top: 20px;
}
</style>