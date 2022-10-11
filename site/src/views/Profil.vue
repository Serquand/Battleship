<template>
    <h1>Profil</h1>
</template>

<script>
import { url } from "../../config.json";
import { useAuthStore } from "../store/Auth.js";

export default {
    setup() {
        const auth = useAuthStore()
        return { auth }
    },
    async created() {
        const requestOptions = {
            method: "GET", 
            headers: { "Authorization": "Bearer " + this.auth.token }
        }

        await fetch(url + "/profil/" + this.auth.username, requestOptions)
    }
}
</script>

<style>

</style>