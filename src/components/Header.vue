<template>
    <v-app-bar scroll-behavior="collapse" :elevation="2" rounded app color="#A5B68D" dark>
        <v-toolbar-title>StudyMaster</v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-if="!isLoggedIn">
            <v-btn rounded="xl" color="#F87A53" variant="flat" @click="$emit('open-login')">
                Get Started
            </v-btn>
        </template>
        <template v-else>
            <v-btn @click="$emit('logout')">
                Logout
            </v-btn>
        </template>
    </v-app-bar>
</template>

<script>
export default {
    name: 'Header',
    props: {
        isLoggedIn: {
            type: Boolean,
            required: true,
        }
    }
};
</script>