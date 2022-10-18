<template>
    <div class="profil-container">
        <InfoProfil />
        <BoxProfilInfo 
            :bestElo="(informationUser.user?.MaxElo ?? 0)"
            :currentElo="(informationUser.user?.Elo ?? 0)"
        />
        <ReviewGames :games="informationUser?.allGames ?? []" />
        <ButtonProfil @updateAccount="updateAccount" />
        <ModalUpdateProfil 
            v-if="updateConfirm"
            :email="auth.email"
            :username="auth.username"
            @endUpdate="endUpdate"
        />
    </div>
</template>

<script>
import { url } from "../../config.json";
import { useAuthStore } from "../store/Auth.js";
import { ref } from 'vue'

import InfoProfil from "../components/InfoProfil.vue";
import BoxProfilInfo from "../components/BoxProfilInfo.vue";
import ReviewGames from "../components/ReviewGames.vue";
import ButtonProfil from "../components/ButtonProfil.vue";
import ModalUpdateProfil from "../components/ModalUpdateProfil.vue";

export default {
    setup() {
        const auth = useAuthStore(), informationUser = ref({}), updateConfirm = ref(false)
        return { auth, informationUser, updateConfirm };
    },
    async created() {
        const requestOptions = {
            method: "GET",
            headers: { "Authorization": "Bearer " + this.auth.token }
        };
        this.informationUser = await (await fetch(url + "/profil/" + this.auth.username, requestOptions)).json()
        this.auth.email = this.informationUser.user?.Email
    },
    methods: {
        updateAccount() {
            this.updateConfirm = true
        }, 
        endUpdate() {
            this.updateConfirm = false
        }
    },
    components: { InfoProfil, BoxProfilInfo, ReviewGames, ButtonProfil, ModalUpdateProfil }
}
</script>

<style>
.profil-container {
    width: 80%;
    margin: auto;
}
</style>