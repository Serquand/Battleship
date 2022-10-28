<template>
    <div class="box-profil">
        <Elo
            v-if="rank == undefined"
            message="Pseudo" 
            :pseudo="authStore.username"
        />
        <Elo
            v-else
            message="Rank" 
            :rank="rank"
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
        rank: {
            type: Number, 
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
    flex-wrap: wrap;
}
</style>