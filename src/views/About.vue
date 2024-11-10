<template>
    <div class="d-flex flex-column align-center justify-center" style="background: linear-gradient(135deg, #FFD3A5 ,#99BFBB);">
        <v-container class="about py-10">
            <v-row justify="center">
                <v-col cols="12" md="8">
                    <v-card elevation="8" class="pa-5">
                        <v-card-title class="headline text-center mb-3">
                            <v-icon left color="#1976D2" class="mr-2">mdi-information</v-icon>
                            About Us
                        </v-card-title>
                        <v-divider class="mb-4"></v-divider>
                        <v-card-text>
                            <p class="subtitle-1 mb-3">
                                We are a team of passionate developers dedicated to building high-quality web applications.
                            </p>
                            <p class="subtitle-1 mb-4">
                                Our mission is to deliver exceptional software solutions that meet the needs of our clients.
                            </p>
                            <v-row class="mb-4">
                                <v-col cols="12" md="6" class="d-flex flex-column align-center">
                                    <v-icon size="48" color="#F87A53">mdi-lightbulb-on-outline</v-icon>
                                    <h3 class="headline mt-2">Our Values</h3>
                                    <p>Integrity, Innovation, and Excellence</p>
                                </v-col>
                                <v-col cols="12" md="6" class="d-flex flex-column align-center">
                                    <v-icon size="48" color="#F87A53">mdi-email-outline</v-icon>
                                    <h3 class="headline mt-2">Contact Us</h3>
                                    <p>Email: <a href="mailto:contact@ourcompany.com" class="text-decoration-none" style="color: #1976D2;">contact@ourcompany.com</a></p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AboutView',
});
</script>

<style scoped>
.about {
    min-height: 100vh;
}
.v-card {
    border-radius: 16px;
    background-color: #ffffff; /* Ensures the card contrasts with the gradient */
}
</style>