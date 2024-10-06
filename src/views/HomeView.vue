  <template>
    <Header />
    <Footer />
  </template>

  <script>
  import { defineComponent } from 'vue';

  // Components
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';

  export default defineComponent({
    name: 'HomeView',

    components: {
      Header,
      Footer,
    },
  });
  </script>
