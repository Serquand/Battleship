<template>
    <div class="review-games">
        <h4>All your games ({{ games?.length }})</h4>
        <div class="all-game-review">
            <div 
                class="review"
                v-for="game in games"
                :key="game"
            >
                <ReviewGame :game="game" />
            </div>
        </div>
    </div>
</template>

<script>
import ReviewGame from './ReviewGame.vue';
export default {
    props: {
        games: {
            type: Array,
            required: true
        }
    },
    components: { ReviewGame }
}
</script>

<style>
.all-game-review {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.review-games h4 {
    font-size: 20px;
    margin: 35px 0 25px 0;
    font-style: italic;
    font-weight: 600;
    font-family: 'Roboto', sans-serif;
    text-decoration: underline;
}

</style>