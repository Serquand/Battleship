<template>
    <div class="review-game">
        <div class="review-date">
            <p>{{ game.date }}</p>
        </div>
        
        <div class="review-match">
                <div class="review-player review-player1">
                    <p>
                        <span>{{ game.player1 }}</span>
                        <sub>{{ '(' + game.eloPlayer1 + ')' }}</sub>
                    </p>
                </div>

                <div class="review-vs">
                    <p>-</p>
                </div>

                <div class="review-player review-player2">
                    <p>
                        <span>{{ game.player2 }}</span>
                        <sub>{{ '(' + game.eloPlayer2 + ')' }}</sub>
                    </p>
                </div>
        </div>
        
        <div :class="['review-result', game.result]">
            <p>{{ game.result }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        game: {
            type: Object, 
            required: true
        }
    }
}
</script>

<style>
.review-game {
    display: flex;
    width: 60%;
    min-width: 300px;
    margin: auto;
    border: 1px solid #555;
    padding: 15px 50px;
    border-radius: 50px;
    justify-content: space-between;
    align-items: center;
}

.review-match {
    display: flex;
    gap: 10px;
}

.review-result {
    color: white;
    padding: 5px 8px;
    border-radius: 4px;
    font-size: 18px;
}

.review-result.L {
    background-color: red;
}

.review-result.W {
    background-color: green;
}

.review-player p :first-child {
    font-weight: 600;
    font-size: 18px;
}

.review-player p :last-child {
    font-size: 12px;
    font-style: italic;
}
</style>