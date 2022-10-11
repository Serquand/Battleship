<template>
    <div class="elo-container">
        <h4>{{ message + ':' }}</h4>
        <p>{{ eloDisplay }}</p>
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
            type: Number, 
            required: true
        }, 
        message: { 
            required: true
        }
    }, 
}
</script>

<style>
.elo-container {
    display: grid;
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 1px solid #555;
    border-radius: 10px;
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