<template>
    <div class="modal-end-game modal">
        
    </div>
</template>

<script>
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
    }
}
</script>

<style>

</style>