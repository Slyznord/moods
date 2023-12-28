import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home/Home.vue')
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
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
