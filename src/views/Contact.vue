<template>
    <div class="contact-container d-flex flex-column align-center justify-center" style="background: linear-gradient(135deg, #FFD3A5, #99BFBB);">
        <v-container class="contact py-10" style="padding-top: 2rem;">
            <v-row justify="center">
                <v-col cols="12" md="8">
                    <v-card elevation="8" class="pa-5">
                        <v-card-title class="headline text-center">
                            <v-icon left color="#1976D2" class="mr-2">mdi-email</v-icon>
                            Contact us
                        </v-card-title>
                        <v-divider class="mb-4"></v-divider>
                        <v-card-text>
                            <v-form @submit.prevent="submitForm">
                                <!-- Name-Eingabefeld -->
                                <v-text-field
                                    v-model="contactForm.name"
                                    label="Name"
                                    placeholder="Your name"
                                    outlined
                                    required
                                    :rules="[v => !!v || 'Your name is required']"
                                ></v-text-field>

                                <!-- E-Mail-Eingabefeld -->
                                <v-text-field
                                    v-model="contactForm.email"
                                    label="E-Mail"
                                    placeholder="Your e-mail"
                                    type="email"
                                    outlined
                                    required
                                    :rules="[v => /.+@.+\..+/.test(v) || 'Enter a valid e-mail']"
                                ></v-text-field>

                                <!-- Nachrichten-Eingabefeld -->
                                <v-textarea
                                    v-model="contactForm.message"
                                    label="Message"
                                    placeholder="Your message"
                                    rows="5"
                                    outlined
                                    required
                                    :rules="[v => !!v || 'Your message is required']"
                                ></v-textarea>

                                <!-- Absenden-Button -->
                                <v-btn color="primary" class="mt-4" block type="submit" large>
                                    Submit
                                </v-btn>
                            </v-form>

                            <!-- Erfolgsmeldung -->
                            <v-alert v-if="submitted" type="success" class="mt-4" border="left" colored-border>
                                <v-icon left color="green">mdi-check-circle</v-icon>
                                Thank you for your message! We will get back to you soon.
                            </v-alert>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'Contact',
    data() {
        return {
            contactForm: {
                name: '',
                email: '',
                message: '',
            },
            submitted: false,
        };
    },
    methods: {
        submitForm() {
            console.log('Formular abgesendet:', this.contactForm);

            // Erfolgsmeldung anzeigen und Formular zurücksetzen
            this.submitted = true;
            this.contactForm.name = '';
            this.contactForm.email = '';
            this.contactForm.message = '';

            // Erfolgsmeldung nach einer Zeit wieder ausblenden
            setTimeout(() => {
                this.submitted = false;
            }, 3000);
        },
    },
};
</script>

<style scoped>
.contact-container {
    min-height: calc(98% - 50px); /* Berechnung: Bildschirmhöhe minus Footer */
}

.v-card {
    border-radius: 16px;
    /* Negative margin to pull the card up */
    margin-top: -1rem;
}
</style>