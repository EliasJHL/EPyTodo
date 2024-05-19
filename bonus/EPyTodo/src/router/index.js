import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Todos from '../components/Todos.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/todos', component: Todos },
  { path: '/:pathMatch(.*)*', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router