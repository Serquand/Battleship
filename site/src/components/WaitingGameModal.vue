<template>
    <div class="waiting-game-modal modal">
        <div class="waiting-content modal-content">
            <div class="title-container">
                <h3>Waiting for opponent</h3>
            </div>

            <div class="waiting-main-animation">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            
            <div class="button-container">
                <button @click="cancelSearch">Cancel</button>
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    methods: {
        cancelSearch() {
            this.$emit("cancelSearch")
        }
    }
}
</script>

<style>
.waiting-content {
    width: 500px;
    max-width: 80%;
    height: 250px;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    flex-direction: column;
}

h3::after {
    content: '';
    display: block;
    width: 0;
    height: 1px;
    background-color: #555;
    margin-top: 2px;   
    animation:underlineWaitingAnim 2.5s infinite; 
    position: relative; 
}

.waiting-main-animation {
    width: 104px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
}

.waiting-main-animation div {
    height: 45px;
    width: 45px;
    border: 1px solid #555;
}

.waiting-main-animation :nth-child(1) {
    background-color: rgb(4, 4, 28);
    animation: mainWaitingAnimation1 5s infinite;
}

.waiting-main-animation :nth-child(2) {
    background-color: #1025BC;
    animation: mainWaitingAnimation2 5s infinite;
}

.waiting-main-animation :nth-child(3) {
    background-color: red;
    animation: mainWaitingAnimation3 5s infinite;
}

.waiting-main-animation :nth-child(4) {
    background-color: green;
    animation: mainWaitingAnimation4 5s infinite;
}

.waiting-content button {
    background-color: #fff;
    cursor: pointer;
    font-size: 16px;
    padding: 10px 25px;
    border-radius: 1rem;
    font-family: 'Roboto', sans-serif;
}

@keyframes underlineWaitingAnim {
    50% {
        width: calc(100% + 5px);
    }
}

@keyframes mainWaitingAnimation1 {
    0% {
        transform: translateY(-15px);
        opacity: 0;
    }

    20% {
        transform: translateY(0px);
        opacity: 1; 
    }

    50% {
        transform: translateY(0px);
        opacity: 1;
    }

    70% {
        transform: translateY(-15px);
        opacity: 0;
    }

    100% {
        transform: translateY(-15px);
        opacity: 0;
    }
}

@keyframes mainWaitingAnimation2 {
    0% {
        transform: translateY(-15px);
        opacity: 0;
    }
    10% {
        transform: translateY(-15px);
        opacity: 0;
    }
    30% {
        transform: translateY(0px);
        opacity: 1;
    }
    60% {
        transform: translateY(0px);
        opacity: 1;
    }
    80% {
        transform: translateY(-15px);
        opacity: 0;
    }
    100% {
        transform: translateY(-15px);
        opacity: 0;
    }
}

@keyframes mainWaitingAnimation3 {
    0% {
        transform: translateY(-15px);
        opacity: 0;
    }
    20% {
        transform: translateY(-15px);
        opacity: 0;
    }
    40% {
        transform: translateY(0px);
        opacity: 1;
    }
    70% {
        transform: translateY(0px);
        opacity: 1;
    }
    90% {
        transform: translateY(-15px);
        opacity: 0;
    }
    100% {
        transform: translateY(-15px);
        opacity: 0;
    }
}

@keyframes mainWaitingAnimation4 {
    0% {
        transform: translateY(-15px);
        opacity: 0;
    }
    30% {
        transform: translateY(-15px);
        opacity: 0;
    }   
    
    50% {
        transform: translateY(0px);
        opacity: 1;
    }

    80% {
        transform: translateY(0px);
        opacity: 1;
    }

    100% {
        transform: translateY(-15px);
        opacity: 0;
    }
}
</style>