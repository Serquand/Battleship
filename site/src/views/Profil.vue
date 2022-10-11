<template>
    <div class="profil-container">
        <InfoProfil 
            :email="(informationUser.user?.Email ?? '')"
            :username="(informationUser.user?.Pseudo ?? '')"
        />
        <BoxProfilInfo 
            :pseudo="(informationUser.user?.Pseudo ?? '')"
            :bestElo="(informationUser.user?.MaxElo ?? 0)"
            :currentElo="(informationUser.user?.Elo ?? 0)"
        />
        <ReviewGames :games="informationUser?.allGames ?? []" />
    </div>
</template>

<script>
import { url } from "../../config.json";
import { useAuthStore } from "../store/Auth.js";
import InfoProfil from "../components/InfoProfil.vue";
import { ref } from 'vue'
import BoxProfilInfo from "../components/BoxProfilInfo.vue";
import ReviewGames from "../components/ReviewGames.vue";

export default {
    setup() {
        const auth = useAuthStore(), informationUser = ref({})
        return { auth, informationUser };
    },
    async created() {
        const requestOptions = {
            method: "GET",
            headers: { "Authorization": "Bearer " + this.auth.token }
        };
        this.informationUser = await (await fetch(url + "/profil/" + this.auth.username, requestOptions)).json()
        console.log(this.informationUser.allGames);
    },
    components: { InfoProfil, BoxProfilInfo, ReviewGames }
}
</script>

<style>
.profil-container {
    width: 80%;
    margin: auto;
}
</style>