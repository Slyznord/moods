import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/home.vue')
  },
  {
    path: '/decartes',
    name: 'decartes'
  },
  {
    path: '/analytics',
    name: 'analytics'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
