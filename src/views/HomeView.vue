  <template>
    <Header />
    <Login />
    <Register />
    <Footer />
  </template>

  <script>
  import { defineComponent } from 'vue';

  // Components
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import Login from '@/components/Login.vue';
  import Register from '@/components/Register.vue';

  export default defineComponent({
    name: 'HomeView',

    components: {
      Header,
      Footer,
      Login,
      Register,
    },
  });
  </script>
