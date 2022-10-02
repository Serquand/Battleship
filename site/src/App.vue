<template>
    <div id="app">
        <HeaderBar />
        <router-view />
    </div>
</template>

<style>
@import url('https://unpkg.com/reset-css@5.0.1/reset.css');

*, *::before, *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    color: white;
    text-decoration: none;
}

body {
    background-color: rgb(4, 4, 28);
}

.checkbox-hack {
    top: 0;
    left: 0;
    display: none;
    position: fixed;
}    
</style>

<script>
import HeaderBar from "@/components/HeaderBar";

export default {
    components: {
        HeaderBar,
    },
};
</script>
