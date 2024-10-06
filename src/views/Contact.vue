<template>
  <Header />
  <div class="contact">
    <h1>Kontaktieren Sie uns</h1>
    <p>Wir freuen uns auf Ihre Nachricht!</p>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="form.name" type="text" id="name" placeholder="Ihr Name" required />
      </div>

      <div class="form-group">
        <label for="email">E-Mail:</label>
        <input v-model="form.email" type="email" id="email" placeholder="Ihre E-Mail" required />
      </div>

      <div class="form-group">
        <label for="message">Nachricht:</label>
        <textarea v-model="form.message" id="message" rows="5" placeholder="Ihre Nachricht" required></textarea>
      </div>

      <button type="submit">Absenden</button>
    </form>

    <p v-if="submitted" class="success-message">Danke für Ihre Nachricht! Wir melden uns bald bei Ihnen.</p>
  </div>
  <Footer />
</template>

<script>
import {defineComponent} from 'vue';

// Components
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: 'Contact',

  components: {
    Header,
    Footer,
  },

  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
      submitted: false,
    };
  },

  methods: {
    submitForm() {

      // hier noch API-Integration hinzugefügen

      console.log('Formular abgesendet:', this.form);
      this.submitted = true;

      // Formular nach Absenden leeren
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    },
  },
});
</script>

<style>
.contact {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.contact h1 {
  text-align: center;
  margin-bottom: 20px;
}

.contact p {
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.success-message {
  text-align: center;
  color: green;
  margin-top: 20px;
}

@media (min-width: 1024px) {
  .contact {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>