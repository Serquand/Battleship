<template>
  <h1>Game</h1>
</template>

<script>
import { io } from 'socket.io-client'
import { useAuthStore } from '../store/Auth'

export default {
  setup() {
    const 
      socket = io("http://localhost:5000"), 
      auth = useAuthStore()
    return { socket, auth }
  }, 

  created() {
    this.socket.emit("responseUser", { user: this.auth.username, token: this.auth.token })
    this.socket.emit("test")
    this.socket.on("init", () => console.log("We are waiting for another player !"))
    this.socket.on("play", () => console.log("We are gonna to launch the game !"))
  }
}
</script>

<style>

</style>