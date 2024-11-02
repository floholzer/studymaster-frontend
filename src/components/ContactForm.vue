<template>
  <v-container fluid class="d-flex justify-center align-center fill-height">
    <v-col cols="12" md="4"> <!-- Definiert die Breite auf mittleren und größeren Bildschirmen -->
      <v-card>
        <v-card-title class="headline text-center">Kontaktieren Sie uns</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <!-- Name-Eingabefeld -->
            <v-text-field
                v-model="contactForm.name"
                label="Name"
                placeholder="Ihr Name"
                required
            ></v-text-field>

            <!-- E-Mail-Eingabefeld -->
            <v-text-field
                v-model="contactForm.email"
                label="E-Mail"
                placeholder="Ihre E-Mail"
                type="email"
                required
            ></v-text-field>

            <!-- Nachrichten-Eingabefeld -->
            <v-textarea
                v-model="contactForm.message"
                label="Nachricht"
                placeholder="Ihre Nachricht"
                rows="5"
                required
            ></v-textarea>

            <!-- Absenden-Button -->
            <v-btn color="primary" class="mt-4" block type="submit">
              Absenden
            </v-btn>
          </v-form>

          <!-- Erfolgsmeldung -->
          <v-alert v-if="submitted" type="success" class="mt-4">
            Danke für Ihre Nachricht! Wir melden uns bald bei Ihnen.
          </v-alert>
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
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

</style>