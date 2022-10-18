<template>
  <header>
    <div class="info-header">
      <div class="title-container">
        <img class="logo" src="/assets/logo.png" alt="Logo" />
        <h1>Battleship</h1>
      </div>
      <label class="menu-display-hack" for="checkbox-hack-nav">
        <img src="/assets/menu.png" alt="Menu" />
      </label>
    </div>

    <input
      type="checkbox"
      id="checkbox-hack-nav"
      class="checkbox-hack checkbox-hack-nav"
    />
    <nav class="nav-app">
      <ul>
        <router-link to="/">
          <li>Home</li>
        </router-link>

        <router-link to="/game">
          <li>Game</li>
        </router-link>

        <router-link to="/ranking">
          <li>Ranking</li>
        </router-link>

        <router-link :to="auth.username ? '/profil' : '/login'">
          <li>{{ auth.username ? "Profil" : "Sign in" }}</li>
        </router-link>
      </ul>
    </nav>
  </header>
</template>

<script>
import { useAuthStore } from "../store/Auth";
import router from '../router/index';

export default {
  setup() {
    const auth = useAuthStore();
    return { auth };
  },

  created() {
    router.afterEach(() => {
      document.querySelector("#checkbox-hack-nav").click()
    })
  }
};
</script>

<style>
.info-header {
  position: sticky;
  top: 0;
  background-color: rgb(4, 4, 28);
  padding: 20px 128px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-container h1 {
  font-weight: 600;
  font-size: 25px;
}

.info-header .logo {
  width: 60px;
  height: auto;
}

.menu-display-hack {
  cursor: pointer;
  scale: 1.5;
}

.nav-app {
  background-color: whitesmoke !important;
  transform: translateY(-100%);
  position: relative;
  z-index: -15;
  background: purple;
  width: 100%;
  transition: all 0.8s ease;
}

input:checked + .nav-app {
  transform: translateY(0);
  z-index: 0;
}

.nav-app ul {
  display: flex;
  justify-content: space-evenly;
  padding: 5px;
  list-style-type: none;
}

.nav-app li {
  cursor: pointer;
  color: rgb(4, 4, 28);
}
</style>
