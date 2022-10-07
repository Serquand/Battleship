<template>
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
</template>

<script>
import { io } from 'socket.io-client'
import { useAuthStore } from '../store/Auth'

export default {
  setup() {
    const 
      socket = io("http://localhost:5000"), 
      auth = useAuthStore()
    return { socket, auth }
  }, 

  created() {
    this.socket.emit("responseUser", { user: this.auth.username, token: this.auth.token })

    this.socket.on("init", () => console.log("We are waiting for another player !"))
    this.socket.on("play", () => console.log("We are gonna to launch the game !"))
    this.socket.on("returnShuffled", shuffledArray => this.displayArray(shuffledArray))
    this.socket.on("startTheGame", () => console.log("We will start the game"))
  }, 

  methods: {
    sendShuffle() {
        this.socket.emit("shuffleGrid")
    }, 

    displayArray(array) {
        console.log(array)
        let count = 0;
        for(let i = 0; i < 100; i++) {
            if(array[i] != null && array[i] != undefined) count++
        }
        console.log(count)
    },  

    submitPreparation() {
        this.socket.emit("submitPreparation");
    }
  }
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