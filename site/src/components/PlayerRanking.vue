<template>
   <div class="player-ranking-container">
        <div class="rank">
            <p>{{ rank }}</p>
        </div>
        
        <div class="pseudo-ranking">
            <p>{{ pseudo }}</p>
        </div>
        
        <div class="current-elo-ranking">
            <p>{{ currentElo }}</p>
        </div>
        
        <div class="max-elo-ranking">
            <p>{{ maxElo }}</p>
        </div>
   </div>
</template>

<script>
export default {
    props: {
        pseudo: {
            type: String,
            required: true,
        }, 
        currentElo: {
            type: Number,
            required: true,
        }, 
        maxElo: {
            type: Number,
            required: true,
        }, 
        rank: {
            type: Number,
            required: true,
        }
    }
}
</script>

<style>
.player-ranking-container {
    display: flex;
    width: 60%;
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

@media all and (max-width: 1000px) {
    .player-ranking-container {
        width: 80%;   
    }
}

@media all and (max-width: 500px) { 
    .player-ranking-container {
        width: calc(100% - 30px);
        padding: 15px 10px;
    }
    .current-elo-ranking {
        display: none;
    }
}
</style>
