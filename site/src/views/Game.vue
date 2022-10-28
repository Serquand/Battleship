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
                    v-for="(n, i) in 10"
                >
                    <div
                        :key="m"
                        v-for="(m, j) in 10"
                        :class="['cell', (myTry[j + i * 10] == 'd' ? 'destroyShip' : myTry[j + i * 10] == '.' ? 'flop' : '')]"
                    >
                        <div 
                            v-if="myTry[j + i * 10] == 'x'"
                            class="touch"
                        ></div>   
                    </div>
                </div>
            </div>
            
            <div class="maginot-line"></div>

            <div class="my-board">
                <div 
                    :key="array"
                    v-for="(array, i) in basisGrid"
                >
                    <div
                        :key="element"
                        v-for="(element, j) in array"
                    >
                        <div 
                            :class="['cell', element, (oppTry[j + i * 10] == 'd' ? 'destroyShip' : oppTry[j + i * 10] == '.' ? 'flop' : '')]"
                        >
                            <div 
                                v-if="oppTry[j + i * 10] == 'x'"
                                class="touch"
                            ></div>
                        </div>
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
            >Shuffle
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
        :arrayTried="myTry"
        v-if="modalPlay"
        :key="numberTurn"
        @madeShot="submitShot"
    />
    <ModalEndGame 
        v-if="stateGame === 'E'"
        :victory="informationEndGame.victory"
        :oldElo="informationEndGame.elo"
        :newElo="informationEndGame.newElo"
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
import ModalEndGame from '../components/ModalEndGame.vue'

export default {
    // stateGame : 'S' for search a player, 'P' for preparation, 'R' for running and 'E' for ended
    setup() {
        const 
            socket = io("http://localhost:5000"), auth = useAuthStore(), basisGrid = ref([]), modalInit = ref(false), 
            modalPlay = ref(false), numberTurn = ref(0), stateGame = ref('S'), 
            myTry = ref(new Array(100)), oppTry = ref(new Array(100)), informationEndGame = ref({})
        return { socket, auth, basisGrid, modalInit, modalPlay, numberTurn, stateGame, oppTry, myTry, informationEndGame };
    },
    created() {
        this.basisGrid = this.setupBasisGrid()
        this.socket.emit("responseUser", { user: this.auth.username, token: this.auth.token });
        
        this.socket.on("init", () => this.modalInit = true);
        this.socket.on("play", () => {
            this.modalInit = false; 
            this.stateGame = "P"
        });
        
        this.socket.on("returnShuffled", shuffledArray => this.displayArray(shuffledArray)); 
        this.socket.on("yourTurn", (triedGrid) => this.displayModalTurn(triedGrid))
        this.socket.on("startTheGame", () => this.stateGame = 'R');
        this.socket.on("resultShot", (myGrid, myTry, oppTRy)  => this.changeInformation(myGrid, myTry, oppTRy))
        this.socket.on("endGame", information => this.setEndGame(information))
    },
    methods: {
        setEndGame(informationEndGame) {
            this.informationEndGame = informationEndGame
            this.stateGame = 'E';
        },
        changeInformation(myGrid, myTry, oppTry) {
            this.myTry = myTry
            this.basisGrid = myGrid
            this.oppTry = oppTry
        },
        cancelSearch() {
            this.socket.close()
            router.push('/')
        },
        setupBasisGrid() {
            let matrix = new Array(0)
            for(let i = 0; i < 10; i++) {
                matrix.push(new Array(10))
                for(let j = 0; j < 10; j++) matrix[i][j] = undefined
            }
            return matrix
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
        },
        submitPreparation() {
            this.socket.emit("submitPreparation", this.basisGrid);
        }, 
        displayModalTurn(triedGrid) {
            this.myTry = triedGrid;
            this.modalPlay = true
            this.numeberTurn++
        }, 
        displayGameView() {
            
        }, 
        submitShot(index) {
            this.socket.emit("madeAShot", index)
            this.modalPlay = false
        },
    },
    components: {
    WaitingGameModal,
    GridShotModal,
    ModalEndGame
}
}
</script>

<style>
.game, .prepared-game {
    display: flex;
    align-items: center;
    gap: 50px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.prepared-game button {
    display: block;
    padding: 0.5rem 2rem;
    border: 1px solid white;
    border-radius: 1rem;
    margin-bottom: 25px;
    cursor: pointer;
    background: rgba(0, 0, 0, 0);
    color: white;
    transition: all .5s ease-in;
}

.prepared-game button:hover {
    background: #fff;
    color: rgb(4, 4, 28);
}   

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
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.A {
    background-color: yellow;  
}

.D1 {
    background-color: lightblue;
}

.D2 {
    background-color: purple;
}

.T {
    background-color: white;
}

.C {
    background-color: orange;
}

.destroyShip {
    background-color: red;
}

.flop {
    background-color: green;
}

.touch::before, .touch::after {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: ' ';
    height: 20px;
    width: 2px;
    background-color: red;
    border-radius: 50px;
}

.touch:before {
    transform: rotate(45deg);
}

.touch:after {
    transform: rotate(-45deg);
}

@media all and (max-width: 500px) {
    .prepared-game {
        display: flex;
        gap: 25px;
        justify-content: center;
    }
}

@media all and (max-width: 450px) {
    .prepared-game {
        flex-direction: column;
    }

    .prepared-game > div:last-child {
        display: flex;
        gap: 25px;
    }
}
</style>
