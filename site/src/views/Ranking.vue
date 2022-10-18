<template>
  <div class="ranking-container">
    <InfoProfil />
    <BoxProfilInfo 
      :currentElo="(userInformation.user?.Elo ?? 0)"
      :bestElo="(userInformation.user?.MaxElo ?? 0)"
      :rank="rank"
    />
    <div class="ranking">
      <PlayerRanking 
        :currentElo="player.maxElo"
        :maxElo="player.Elo"
        :rank="index + 1"
        :pseudo="player.Pseudo"
        v-for="(player, index) in ranking"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import { url } from '../../config.json';
import InfoProfil from '../components/InfoProfil.vue';
import BoxProfilInfo from '../components/BoxProfilInfo.vue';
import { useAuthStore } from '../store/Auth';
import PlayerRanking from "../components/PlayerRanking.vue";

export default {
  setup() {
    const auth = useAuthStore(), rank = ref(0), userInformation = ref({}), ranking = ref([])
    return { rank, userInformation, ranking, auth }
  },
  async created() {
    const requestOptions = {
      method: "GET",
      headers: { "Authorization": "Bearer " + this.auth.token }
    };

    this.ranking = await (await fetch(url + "/ranking")).json()
    this.userInformation = await (await fetch(url + "/profil/" + this.auth.username, requestOptions)).json()

    for(let i = 0; i < this.ranking.length; i++) {
      if(this.ranking[i].Pseudo == this.auth.username) {
        this.rank = i + 1
        break;
      } 
    }
  }, 
  components: {
    InfoProfil,
    BoxProfilInfo,
    PlayerRanking
  }
}
</script>

<style>
.ranking {
  padding-top: 15px; 
}

.ranking > div {
  margin: 30px auto;
}

</style>