import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/ding.vue'
import type { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/bpmn',
    name: 'bpmn',
    component: () => import('@/views/bpmn.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
