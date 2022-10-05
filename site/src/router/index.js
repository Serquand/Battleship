import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import Profil from '../views/Profil.vue'
import Game from '../views/Game.vue'
import Ranking from '../views/Ranking.vue'

import { useAuthStore } from '../store/Auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game', 
    name: "Game", 
    component: Game, 
    meta: { requireAuth: true }
  },
  {
    path: '/ranking', 
    name: "Ranking", 
    component: Ranking, 
    meta: { requireAuth: true }
  },
  {
    path: '/login', 
    name: "Login", 
    component: Login
  },
  {
    path: '/profil', 
    name: 'Profil', 
    component: Profil, 
    meta: { requireAuth: true }
  },
  {
    path: '/:pathMatching(.*)*', 
    name: 'NotFound',
    component: NotFound, 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async to => {
  const auth = useAuthStore()
  if(to.meta?.requireAuth && !(await auth.isLoggedIn())) return { 
      path: '/login', 
      query: { redirect: to.fullPath } 
  }
})
export default router
