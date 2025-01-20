<template>
    <Header/>
    <div class="profile-page">
        <v-container class="d-flex justify-center">
            <v-card class="pa-5" max-width="500" width="100%">
                <v-card-title>Edit Profile</v-card-title>
                <v-card-text>
                    <v-form ref="formRef">
                        <v-text-field
                            v-model="userData.firstname"
                            label="Firstname"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="userData.lastname"
                            label="Lastname"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="userData.username"
                            label="Username"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="userData.email"
                            label="Email"
                            required
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn variant="elevated" color="#8C403A" @click="updateProfile">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
    components: { Header },
    data() {
        return {
            userData: {
                firstname: '',
                lastname: '',
                username: '',
                email: ''
            }
        };
    },
    computed: {
        userStore() {
            return this.$store.state.user;
        }
    },
    mounted() {
        // Initialisiere `userData`, wenn die Komponente geladen wird
        if (this.userStore) {
            this.userData.firstname = this.userStore.first_name || '';
            this.userData.lastname = this.userStore.last_name || '';
            this.userData.username = this.userStore.username || '';
            this.userData.email = this.userStore.email || '';
        }
    },
    methods: {
        updateProfile() {
            // Validiere Formular
            if (!this.$refs.formRef.validate()) {
                return;
            } else {
                const new_user = {
                    id: this.userStore.id,
                    first_name: this.userData.firstname,
                    last_name: this.userData.lastname,
                    username: this.userData.username,
                    email: this.userData.email
                };

                // Aktualisiere Benutzerdaten
                this.$store.dispatch('updateUser', new_user);

                // Navigiere zurück zur Profilseite
                this.$router.push('/profile');
            }


        }
    }
};
</script>

<style scoped>
.profile-page {
    min-height: calc(98% - 50px); /* Berechnung: Bildschirmhöhe minus Footer */
}

.v-container {
    max-width: 600px;
    margin-top: 64px;
    padding-top: 20px;
}
</style>