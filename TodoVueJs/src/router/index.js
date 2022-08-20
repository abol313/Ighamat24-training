import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CreateTodoView from '../views/CreateTodoView.vue';
import UpdateTodoView from '../views/UpdateTodoView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    
    {
      path: '/new',
      name: 'new',
      component: CreateTodoView
    },    

    {
      path: '/edit/:id',
      name: 'edit',
      component: UpdateTodoView
    },
    
  ]
})

export default router
