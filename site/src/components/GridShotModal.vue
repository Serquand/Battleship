<template>
    <div class="modal grid-shot-modal">
        <div class="modal-content">
            <h3 class="grid-shot-title">Select a cell</h3>
            <div class="grid-content">
                <div
                    class="grid-shot"
                    v-for="(element, index) in arrayDisplay"
                    :key="index"
                    @click="submitShot(index)"
                >
                    <div 
                        :class="['cell', (element == 'd' ? 'destroyShip' : element == '.' ? 'flop' : '')]"
                    >
                        <div 
                            v-if="element == 'x'"
                            class="touch"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup(props) {
        const arrayDisplay = JSON.parse(JSON.stringify(props.arrayTried)); 
        console.log(arrayDisplay)
        return { arrayDisplay }
    }, 
    props: {
        arrayTried: {
            type: Array, 
            required: true
        }
    }, 
    methods: {
        submitShot(index) {
            this.$emit("madeShot", index)
        }
    },      
}
</script>

<style>
    .modal-content {
        padding: 50px !important;
        border-radius: 20px;
    }

    .grid-shot-title {
        text-align: center;
        text-decoration: underline;
        font-size: 16px;
        margin-bottom: 15px;
    }

    .grid-shot-title::after {
        animation: none;
    }

    .grid-content {
        background-color: rgb(4, 4, 28);
        display: grid;
        grid-template: repeat(10, 32px) / repeat(10, 32px);
    }

    .grid-content > div {
        width: 30px;
        height: 30px;
        border: 1px solid white;
        cursor: pointer;
        transition: all 1s;
    }

    .grid-content > div:hover {
        background: white;
    }

</style>