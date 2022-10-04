import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import Profil from '../views/Profil.vue'
import Game from '../views/Game.vue'
import Ranking from '../views/Ranking.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game', 
    name: "Game", 
    component: Game
  },
  {
    path: '/ranking', 
    name: "Ranking", 
    component: Ranking
  },
  {
    path: '/login', 
    name: "Login", 
    component: Login
  },
  {
    path: '/profil', 
    name: 'Profil', 
    component: Profil
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

export default router
