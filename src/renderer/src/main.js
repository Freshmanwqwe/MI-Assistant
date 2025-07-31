import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@renderer/App.vue'
import router from '@renderer/router'

window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && (e.key === 'z' || e.key === 'Z' || e.key === 'y' || e.key === 'Y')) {
    const active = document.activeElement
    if (!active || active.tagName.toLowerCase() !== 'textarea') {
      e.preventDefault()
    }
  }
});

const app=createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');
