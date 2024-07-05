import { createRouter, createWebHistory } from 'vue-router';
import ServiceListView from '../views/ServiceListView.vue';
import ServiceDetailView from '../views/ServiceDetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ServiceListView
    },
    {
      path: '/services',
      name: 'services',
      component: ServiceListView
    },
    {
      path: '/services/:id',
      name: 'service-detail',
      component: ServiceDetailView
    }
  ]
});

export default router;