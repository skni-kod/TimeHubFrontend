import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/HomePage.vue'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardPage.vue'),
    beforeEnter: (to, from) => {
      if (!store.getters.getAuth) {
        return false
      }
      return true
    }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import(/* webpackChunkName: "calendar" */ '../views/CalendarPage.vue'),
    beforeEnter: (to, from) => {
      if (!store.getters.getAuth) {
        return false
      }
      return true
    }
  },
  {
    path: '/kanban',
    name: 'Kanban',
    component: () => import(/* webpackChunkName: "kanban" */ '../views/KanbanPage.vue'),
    beforeEnter: (to, from) => {
      if (!store.getters.getAuth) {
        return false
      }
      return true
    }
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "kanban" */ '../views/HomePageRegister.vue'),
    
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/StatisticsPage.vue'),
    beforeEnter: (to, from) => {
      if (!store.getters.getAuth) {
        return false
      }
      return true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
