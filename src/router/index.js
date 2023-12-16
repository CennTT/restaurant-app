import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../views/MenuView.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/OrderView.vue')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../views/TableView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
