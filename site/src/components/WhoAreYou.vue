<template>
    <div class="who-are-you">
        <h2>Who are we ?</h2>
        <div>
            <p>{{ displayedMessage }}</p>
            <img src="/assets/WhoAreYou.png" alt="Who are you ?" />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const displayedMessage = ref("")
        return { displayedMessage }
    },
    async mounted() {
        for(let i = 0; i < this.message.length; i++) {
            this.displayedMessage = this.displayedMessage + this.message.charAt(i)
            await new Promise(r => setTimeout(r, 20));
        }
    },
    props: {
        message: {
            type: String,
            required: true,
        }
    }
}
</script>

<style>
.who-are-you {
    width: 60%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.who-are-you h2 {
    margin-top: 20px;
    text-align: center;
    font-weight: 900;
    font-size: 25px;
    margin-bottom: 10px;
    font-style: italic;
    text-decoration: underline;
}

.who-are-you > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 600;
    line-height: 25px;
}
</style>