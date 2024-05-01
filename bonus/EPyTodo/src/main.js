import './assets/main.css'
import 'vue-toast-notification/dist/theme-sugar.css';
import VueToast from 'vue-toast-notification';

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(VueToast).mount('#app');