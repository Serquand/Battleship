<template>
  <h1>Ranking</h1>
</template>

<script>
import { url } from '../../config.json';
export default {
      async created() {
        console.log(url)
        await fetch(url + "/ranking")
    }
}
</script>

<style>

</style>