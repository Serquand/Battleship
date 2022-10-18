<template>
    <div class="box-profil">
        <Elo
            message="Pseudo" 
            :pseudo="authStore.username"
        />
        <Elo 
            message="Elo"
            :elo="currentElo"
        />
        <Elo
            message="Best elo"
            :elo="bestElo"
        />
    </div>
</template>

<script>
import Elo from './Elo.vue';
import { useAuthStore } from "../store/Auth";

export default {
    setup() {
        const authStore = useAuthStore();
        return { authStore }
    },
    components: { Elo }, 
    props: {
        currentElo: {
            type: Number, 
            required: true
        }, 
        bestElo: {
            type: Number, 
            required: true
        }, 
    }
}
</script>

<style>
.box-profil {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 40px;
}
</style>