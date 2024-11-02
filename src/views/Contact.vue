<template>
  <ContactForm/>
</template>

<script>
import {defineComponent}  from 'vue';

// Components
import ContactForm from "@/components/ContactForm.vue";

export default defineComponent({
  name: 'Contact',
  components: {
    ContactForm // Tasklist-Komponente registrieren
  }

});
</script>

<style>

</style>