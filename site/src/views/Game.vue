<template>
    <div class="game-main-container">
    <div class="game">
        <div class="board-container">
            <div class="opponent-board">
                <div 
                    :key="n"
                    v-for="(n) in 10"
                >
                    <div
                        :key="m"
                        v-for="(m) in 10"
                    ></div>
                </div>
            </div>
            
            <div class="maginot-line"></div>

            <div class="my-board">
                <div 
                    :key="n"
                    v-for="(n) in 10"
                >
                    <div
                        :key="m"
                        v-for="(m) in 10"
                    >
                    </div>
                </div>
            </div>
        </div>
        <div class="prepared-button-container">
            <button
                @click="sendShuffle"
                class="button button-prepared button-shuffled"
            >shuffle
            </button>
            
            <button
                @click="submitPreparation"
                class="button button-prepared button-submit button-submit-preparation"
            >Submit</button>
        </div>
    </div>

    <WaitingGameModal 
        v-if="modalInit"
        @cancelSearch="cancelSearch" 
    />
</div>
</template>

<script>
import { io } from 'socket.io-client'
import { useAuthStore } from '../store/Auth'
import WaitingGameModal from '../components/WaitingGameModal.vue'
import router from '../router/index'
import { ref } from 'vue'

export default {
    setup() {
        const socket = io("http://localhost:5000"), auth = useAuthStore(), basisGrid = new Array(100), modalInit = ref(false);
        return { socket, auth, basisGrid, modalInit };
    },
    created() {
        this.socket.emit("responseUser", { user: this.auth.username, token: this.auth.token });
        this.socket.on("init", () => this.modalInit = true);
        this.socket.on("play", () => console.log("We are gonna to launch the game !"));
        this.socket.on("returnShuffled", shuffledArray => this.displayArray(shuffledArray));
        this.socket.on("startTheGame", () => console.log("We will start the game"));
    },
    methods: {
        cancelSearch() {
            this.socket.close()
            router.push('/')
        },

        sendShuffle() {
            this.socket.emit("shuffleGrid");
        },
        displayArray(array) {
            this.basisGrid = array;
        },
        submitPreparation() {
            this.socket.emit("submitPreparation", this.basisGrid);
        }
    },
    components: { WaitingGameModal }
}
</script>

<style>
.board-container {
    display: flex;
    flex-direction: column;
}

.maginot-line {
    height: 45px;
}

:is(.opponent-board, .my-board) {
    flex-direction: column;
}
    
:is(.opponent-board, .my-board) > div {
    display: flex;
}


:is(.opponent-board, .my-board) > div > div {
    height: 28px;
    width: 28px;
    border: 1px solid white;
    display: flex;
}
</style>