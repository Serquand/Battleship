<template>
<div class="game-main-container">
    <div 
        v-if="stateGame == 'R' || stateGame == 'E'"
        class="game"
    >
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
    </div>

    <div
        v-if="stateGame == 'S' || stateGame == 'P'"
        class="prepared-game"
    >
        <div class="my-board">
            <div 
                :key="array"
                v-for="array in basisGrid"
            >
                <div
                    :key="element"
                    v-for="element in array"
                >
                    <div :class="['cell', element]"></div>
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
    <GridShotModal 
        :arrayTried="triedGrid"
        v-if="modalPlay"
        :key="numberTurn"
        @madeShot="submitShot"
    />
</div>
</template>

<script>
import { io } from 'socket.io-client'
import { useAuthStore } from '../store/Auth'
import WaitingGameModal from '../components/WaitingGameModal.vue'
import router from '../router/index'
import { ref } from 'vue'
import GridShotModal from '../components/GridShotModal.vue'

export default {
    // stateGame : 'S' for search a player, 'P' for preparation, 'R' for running and 'E' for ended 
    setup() {
        const 
            socket = io("http://localhost:5000"), auth = useAuthStore(), basisGrid = new Array(100), modalInit = ref(false), 
            modalPlay = ref(false), triedGrid = ref([]), numberTurn = ref(0), stateGame = ref('S')
        return { socket, auth, basisGrid, modalInit, modalPlay, triedGrid, numberTurn, stateGame };
    },
    created() {
        this.socket.emit("responseUser", { user: this.auth.username, token: this.auth.token });
        
        this.socket.on("init", () => this.modalInit = true);
        this.socket.on("play", () => {
            this.modalInit = false; 
            this.stateGame = "P"
        });
        
        this.socket.on("returnShuffled", shuffledArray => this.displayArray(shuffledArray)); 
        this.socket.on("yourTurn", (triedGrid) => this.displayModalTurn(triedGrid))
        this.socket.on("startTheGame", () => this.stateGame = 'R');
        this.socket.on("resultShot", (myGrid, myTry, oppTRy)  => console.log((myGrid, myTry, oppTRy)))
    },
    methods: {
        cancelSearch() {
            this.socket.close()
            router.push('/')
        },

        sendShuffle() {
            this.socket.emit("shuffleGrid");
        },
        transformArrayToMatrix(grid) {
            let count = 0
            let matrix = new Array(0)
            for(let i = 0; i < 10; i++) {
                matrix.push(new Array(10))
                for(let j = 0; j < 10; j++) {
                    matrix[i][j] = grid[count]
                    count++
                }
            }
            return matrix
        },
        displayArray(array) {
            this.basisGrid = this.transformArrayToMatrix(array);
            console.log(this.basisGrid)
        },
        submitPreparation() {
            this.socket.emit("submitPreparation", this.basisGrid);
        }, 
        displayModalTurn(triedGrid) {
            this.triedGrid = triedGrid;
            this.modalPlay = true
            this.numeberTurn++
        }, 
        madeAShot(indexShot) {
            this.socket.emit("madeAShot", indexShot)    
            this.modalPlay = false
        }, 
        displayGameView() {
            
        }, 
        submitShot(index) {
            this.socket.emit("madeAShot", index)
        }
    },
    components: { 
        WaitingGameModal, 
        GridShotModal
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
    display: flex;
}

.cell {
    border: 1px solid white;
    width: 100%;
    height: 100%;
}

.A, .D1, .D2, .T, .C {
    background-color: #fff;  
}
</style>