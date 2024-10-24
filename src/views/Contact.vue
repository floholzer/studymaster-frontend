<template>
  <v-container class="fill-height" justify="center" align="center">
    <v-sheet elevation="3" class="pa-5 ma-5" max-width="600">
      <h1 class="text-center mb-4">Kontaktieren Sie uns</h1>
      <p class="text-center mb-4">Wir freuen uns auf Ihre Nachricht!</p>
      <v-form @submit.prevent="submitForm">
        <v-text-field
            v-model="form.name"
            label="Name"
            type="text"
            placeholder="Ihr Name"
            outlined
            required
        />
        <v-text-field
            v-model="form.email"
            label="E-Mail"
            type="email"
            placeholder="Ihre E-Mail"
            outlined
            required
        />
        <v-textarea
            v-model="form.message"
            label="Nachricht"
            placeholder="Ihre Nachricht"
            rows="5"
            outlined
            required
        />
        <v-btn class="mt-4" color="primary" block type="submit">
          Absenden
        </v-btn>
      </v-form>

      <v-alert v-if="submitted" type="success" class="mt-4">
        Danke für Ihre Nachricht! Wir melden uns bald bei Ihnen.
      </v-alert>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const form = ref({
  name: '',
  email: '',
  message: '',
});
const submitted = ref(false);

const submitForm = () => {
  // API-Integration hier hinzufügen
  console.log('Formular abgesendet:', form.value);
  submitted.value = true;

  // Formular nach Absenden leeren
  form.value.name = '';
  form.value.email = '';
  form.value.message = '';
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.v-sheet {
  background-color: white;
}

.v-btn {
  cursor: pointer;
}
</style>