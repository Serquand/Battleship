<template>
    <div class="box-profil">
        <Elo
            message="Pseudo" 
            :pseudo="pseudo"
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

export default {
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
        pseudo: {
            type: String, 
            required: true
        }
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