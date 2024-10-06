<template>
  <Header />
  <div class="about">
    <h1>This is the privacy page</h1>
  </div>
  <Footer />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: 'Privacy',

  components: {
    Header,
    Footer,
  },
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
