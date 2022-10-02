import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Ranking from "@/views/Ranking.vue";
import Game from "@/views/Game.vue";
import Profil from "@/views/Profil.vue";
import Login from "@/views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ranking",
    name: "Ranking",
    component: Ranking,
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
