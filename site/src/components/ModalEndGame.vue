<template>
    <div class="modal-end-game modal">
        <div class="modal-content">
            <h3>{{ victory ? 'Victory' : 'Defeat'  }}</h3>

            <div class="elo-main-container">
                <Elo 
                    :elo="oldElo" 
                    message="Old Elo" 
                />
                <Elo 
                    :elo="newElo" 
                    message="New Elo" 
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
.modal-end-game h3 {
    text-decoration: underline;
    text-align: center;
    font-weight: 900;
    font-size: 25px;
    font-style: italic;
    margin-bottom: 35px;
}

.modal-end-game h3::after {
    animation: none;
} 

.elo-main-container {
    display: flex;
    gap: 10px;
}

.end-game-button-container {
    margin-top: 20px;
    display: flex;
    gap: 15px;  
    justify-content: center;
}

.modal-end-game button {
    background-color: rgba(0, 0, 0, 0);
    padding: 0.5rem 1.3rem;
    border: 1px solid #555;
    color: #555;
    border-radius: 1rem;
    cursor: pointer;
}
</style>