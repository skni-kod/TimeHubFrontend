import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardPage.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import(/* webpackChunkName: "calendar" */ '../views/CalendarPage.vue')
  },
  {
    path: '/kanban',
    name: 'Kanban',
    component: () => import(/* webpackChunkName: "kanban" */ '../views/KanbanPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
