<template>
    <div style="background: linear-gradient(135deg, #FFD3A5 ,#99BFBB);">
        <v-container class="privacy-page py-10">
            <v-row justify="center">
                <v-col cols="12" md="8">
                    <v-card elevation="8" class="pa-6">
                        <v-card-title class="headline text-center mb-4">Privacy Policy</v-card-title>
                        <v-divider class="mb-4"></v-divider>
                        <v-card-text>
                            <section class="mb-6">
                                <h3 class="title">1. Introduction</h3>
                                <p class="body-1">
                                    Your privacy is important to us. This privacy policy outlines how we collect, use, and protect your personal data.
                                </p>
                            </section>
                            <section class="mb-6">
                                <h3 class="title">2. Information We Collect</h3>
                                <div class="body-1">
                                    We may collect the following types of information:
                                    <ul>
                                        <li>Personal details (e.g., name, email address)</li>
                                        <li>Usage data (e.g., pages visited, time spent on the site)</li>
                                    </ul>
                                </div>
                            </section>
                            <section class="mb-6">
                                <h3 class="title">3. How We Use Your Information</h3>
                                <p class="body-1">
                                    We use your information to provide and improve our services, communicate with you, and comply with legal obligations.
                                </p>
                            </section>
                            <section class="mb-6">
                                <h3 class="title">4. Your Rights</h3>
                                <p class="body-1">
                                    You have the right to access, update, or delete your personal data. Contact us at <a href="mailto:privacy@ourcompany.com" class="text-decoration-none" style="color: #1976D2;">privacy@ourcompany.com</a> for assistance.
                                </p>
                            </section>
                            <section>
                                <h3 class="title">5. Contact Information</h3>
                                <p class="body-1">
                                    For further questions or concerns about your privacy, please contact us at <a href="mailto:contact@ourcompany.com" class="text-decoration-none" style="color: #1976D2;">contact@ourcompany.com</a>.
                                </p>
                            </section>
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
    name: 'Privacy',
});
</script>

<style scoped>
.privacy-page {
    min-height: 100vh;
}

.v-card {
    border-radius: 16px;
    background-color: #FFFFFF;
}

.title {
    font-weight: 600;
    margin-bottom: 0.5rem;
}
</style>