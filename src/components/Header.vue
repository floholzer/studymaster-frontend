<template>
    <v-app-bar scroll-behavior="fully-hide" :elevation="2" rounded app color="#99BFBB" dark>
        <router-link to="/studymaster" class="v-toolbar-title" style="text-decoration: none; color: inherit;">
            StudyMaster
        </router-link>
        <v-spacer></v-spacer>
        <v-menu transition="slide-y-transition" width="200" class="mx-auto">
            <template v-slot:activator="{ props }">
                <v-btn class="mr-5" variant="tonal" icon="mdi-menu" v-bind="props"></v-btn>
            </template>
            <v-list>
                <router-link to="/studymaster" style="text-decoration: none; color: inherit;">
                    <v-list-item prepend-icon="mdi-format-list-checks" title="Tasklist"></v-list-item>
                </router-link>
                <router-link to="/semester-management" style="text-decoration: none; color: inherit;">
                    <v-list-item prepend-icon="mdi-book-open-variant" title="Edit Semester"></v-list-item>
                </router-link>
                <router-link to="/profile" style="text-decoration: none; color: inherit;">
                    <v-list-item prepend-icon="mdi-account" title="Profile"></v-list-item>
                </router-link>
                <v-list-item prepend-icon="mdi-logout" title="Logout" @click="handleLogout()"></v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: 'Header',
    methods: {
        ...mapActions(['logout']),
        handleLogout() {
            this.logout(); // Führt die Logout-Action aus
            this.$router.push('/'); // Leitet zur Login-Seite weiter
        }
    },
};
</script>