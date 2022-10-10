<template>
    <div class="modal-end-game modal">
        <div class="modal-content">
            <h3>{{ 'Result : ' + (victory ? 'Victory' : 'Defeat')  }}</h3>

            <div class="elo-main-container">
                <Elo 
                    :elo="oldElo" 
                    message="Old elo" 
                />
                <Elo 
                    :elo="newElo" 
                    message="New elo" 
                /> 
            </div>

            <div class="end-game-button-container button-container">
                <button @click="replayAMatch">Replay</button>
                <button @click="goHome">Home</button>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../router/index.js';
import Elo from "./Elo.vue";
export default {
    props: {
        victory: {
            type: Boolean, 
            required: true
        }, 
        oldElo: {
            type: Number,
            required: true
        },
        newElo: {
            type: Number,
            required: true 
        }     
    }, 
    methods: {
        goHome() {
            router.push("/")
        }, 
        replayAMatch() {
            this.$emit("replayAMatch")
        }
    },
    components: { Elo }
}
</script>

<style>

</style>