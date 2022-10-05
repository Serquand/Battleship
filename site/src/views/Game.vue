<template>
  <h1>Game</h1>
</template>

<script>
import { io } from 'socket.io-client'

export default {
  setup() {
    const socket = io("http://localhost:5000")
    return { socket }
  }
}
</script>

<style>

</style>