<template>
    <div class="modal grid-shot-modal">
        <div class="modal-content">
            <div
                class="grid-shot"
                v-for="(n, index) in 100"
                :key="n"
            >
                <div 
                    :class="['grid-shot-case', arrayTried[index]]"
                >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup(props) {
        const arrayDisplay = JSON.parse(JSON.stringify(props.arrayTried)); 
        return { arrayDisplay }
    }, 
    props: {
        arrayTried: {
            type: Array, 
            required: true
        }
    }, 

}
</script>

<style scoped>
    .modal-content {
        padding: 0 !important;
        background: rgb(4, 4, 28);
        display: grid;
        grid-template: repeat(10, 32px) / repeat(10, 32px);
    }

    .modal-content > div {
        width: 30px;
        height: 30px;
        border: .5px solid white;
        cursor: pointer;
    }

</style>