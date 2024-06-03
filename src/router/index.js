import { createRouter, createWebHistory } from 'vue-router';
import FirstView from '../views/FirstView.vue';
import SecondView from '../views/SecondView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'FirstView',
      component: FirstView,
    },
    {
      path: '/form',
      name: 'SecondView',
      component: SecondView,
    },
  ],
});

export default router;
