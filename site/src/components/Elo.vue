<template>
    <div :class="['elo-container', elo == undefined ? 'pseudo' : 'elo']">
        <h4>{{ message + ':' }}</h4>
        <p>{{ (elo == undefined ? pseudo : eloDisplay) }}</p>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup(props) {
        console.log(props)
        const eloDisplay = ref(0)
        return { eloDisplay }
    },
    mounted() {
        const x = setInterval(() => {
            this.eloDisplay++
            if(this.eloDisplay == this.elo) clearInterval(x)
        }, 1000 / this.elo)
    },
    props: {
        elo: {
            type: Number
        }, 
        message: { 
            type: String, 
            required: true
        }, 
        pseudo: {
            type: String, 
        }
    }, 
}
</script>

<style>
.elo-container {
    display: grid;
    border: 1px solid #555;
    border-radius: 10px;
    height: 100px;
    padding: 10px;
}

.pseudo {
    position: relative;
    width: fit-content;
    min-width: 100px;
    padding: 10px 50px;
}

.pseudo h4 {
    position: absolute;
    top: 10px;
    left: 10px;
}

.pseudo p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.elo {
    width: 100px;
}

.elo-container :is(p, h4) {
    font-style: italic;
}

.elo-container h4 {
    font-size: 12px;
    text-decoration: underline;
    font-weight: 600;
}

.elo-container p {
    font-weight: 900;
    font-size: 35px;
    text-align: center;
}
</style>