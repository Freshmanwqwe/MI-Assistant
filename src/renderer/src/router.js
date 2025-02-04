import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import mainWindow from '@views/mainWin.vue';
import configWindow from '@views/configWin.vue';
import addCatWin from '@views/addCatWin.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: mainWindow,
  },
  {
    path: '/config',  // Route for child window
    name: 'Config',
    component: configWindow,
  },
  {
    path: '/addcat',  // Route for child window
    name: 'AddCat',
    component: addCatWin,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
