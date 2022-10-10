<template>
    <div class="elo-container">
        <h4>{{ message }}</h4>
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

</style>