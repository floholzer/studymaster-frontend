import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import { loadFonts } from './plugins/webfontloader'
import VueAxios from "vue-axios";

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueAxios, axios)
  .mount('#app')
