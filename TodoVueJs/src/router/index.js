import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CreateTodoView from '../views/CreateTodoView.vue';
import UpdateTodoView from '../views/UpdateTodoView.vue';
import _404ErrorView from '../views/errors/404.vue';

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
      component: ()=>import('../views/CreateTodoView.vue')
    },    

    {
      path: '/edit/:id',
      name: 'edit',
      component: ()=>import('../views/UpdateTodoView.vue')
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: _404ErrorView
    }
    
  ]
})

export default router
