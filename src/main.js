import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import vuetify from './plugins/vuetify'
import axios from 'axios'
import {loadFonts} from './plugins/webfontloader'
import VueAxios from "vue-axios";

loadFonts()

store.dispatch('initializeAuth'); // Initialisiere den Auth-Status beim Laden der Seite

createApp(App)
    .use(router)
    .use(vuetify)
    .use(store)
    .use(VueAxios, axios)
    .mount('#app')
