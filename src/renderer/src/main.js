import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@renderer/App.vue'
import router from '@renderer/router'


const app=createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');
