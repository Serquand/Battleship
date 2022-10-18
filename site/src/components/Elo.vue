<template>
    <div :class="['elo-container', elo == undefined ? 'pseudo' : 'elo']">
        <h4>{{ message + ':' }}</h4>
        <p>{{ (elo == undefined ? pseudo == undefined ? rank : pseudo : eloDisplay) }}</p>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
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
            type: String
        }, 
        rank: {
            type: Number
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
    padding: 10px 30px;
    position: relative;
    width: fit-content;
}

.elo-container > * {
    font-style: italic;
}

.elo-container h4 {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 12px;
    text-decoration: underline;
    font-weight: 600;
}

.elo-container p {
    margin: auto;
    font-weight: 900;
    font-size: 35px;
    text-align: center;
}
</style>