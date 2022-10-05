<template>
  <div class="app">
    <HeaderBar />
    <BannerSignIn 
      v-show="false"
      :message="'Connexion réussie !'" 
      :status="'success'"
    />
    <router-view></router-view>
  </div>
</template>

<style>
@import url('https://unpkg.com/reset-css@5.0.1/reset.css');
  
* {
  padding: 0;
  margin: 0;
  border: 1px solid #000;
  color: white;
}

body  {
  background: rgb(4, 4, 28);
}

.checkbox-hack {
  top: 0;
  left: 0;
  position: fixed;
  display: none;
}  
</style>

<script>
import HeaderBar from './components/HeaderBar.vue';
import BannerSignIn from './components/BannerSignIn.vue';

export default {
  components: {
    HeaderBar, 
    BannerSignIn
  }
}
</script>
