<template>
    <div class="profil-container">
        <InfoProfil 
            :email="informationUser.user.Email"
            :username="informationUser.user.Pseudo"
        />
    </div>
</template>

<script>
import { url } from "../../config.json";
import { useAuthStore } from "../store/Auth.js";
import InfoProfil from "../components/InfoProfil.vue";
import { ref } from 'vue'

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
        console.log(this.informationUser);
    },
    components: { InfoProfil }
}
</script>

<style>
.profil-container {
    width: 80%;
    margin: auto;
}
</style>