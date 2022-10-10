<template>
    <div class="modal-end-game modal">
        <div class="modal-content">
            <h3>{{ 'Result : ' + (victory ? 'Victory' : 'Defeat')  }}</h3>

            <div class="elo-main-container">
                <Elo 
                    :elo="oldElo" 
                    message="Old elo" 
                />
                <Elo 
                    :elo="newElo" 
                    message="New elo" 
                /> 
            </div>
        </div>
    </div>
</template>

<script>
import Elo from "./Elo.vue";
export default {
    setup() {

    },

    props: {
        victory: {
            type: Boolean, 
            required: true
        }, 
        oldElo: {
            type: Number,
            required: true
        },
        newElo: {
            type: Number,
            required: true 
        }     
    }, 
    components: { Elo }
}
</script>

<style>

</style>