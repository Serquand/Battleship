import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Ranking from "@/views/Ranking.vue";
import Game from "@/views/Game.vue";
import Profil from "@/views/Profil.vue";
import Login from "@/views/Login.vue";
import { useAuthStore } from "../store/Auth";

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
    meta: { requireAuth: true },
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
    meta: { requireAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  if (to.meta?.requireAuth && !(await auth.isLoggedIn())) {
    return {
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    };
  }
});

export default router;
