<template>
    <v-app-bar scroll-behavior="fully-hide" :elevation="2" rounded app color="#99BFBB" dark>
        <router-link to="/" class="v-toolbar-title" style="text-decoration: none; color: inherit;">
            StudyMaster
        </router-link>
        <v-spacer></v-spacer>
        <template v-if="!isLoggedIn">
            <v-btn rounded="xl" color="#F87A53" variant="flat" @click="$emit('open-login')">
                Get Started
            </v-btn>
        </template>
        <template v-else>
            <v-menu transition="slide-y-transition" width="200" class="mx-auto">
                <template v-slot:activator="{ props }">
                    <v-btn variant="tonal" icon="mdi-account" v-bind="props"></v-btn>
                </template>
                <v-list>
                    <router-link to="/profile" style="text-decoration: none; color: inherit;">
                        <v-list-item prepend-icon="mdi-pencil" title="Account"></v-list-item>
                    </router-link>
                    <v-list-item prepend-icon="mdi-logout" @click="confirmLogout" title="Logout"></v-list-item>
                </v-list>
            </v-menu>
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
    },
    methods: {
        confirmLogout() {
            this.$emit('logout');
        }
    }
};
</script>