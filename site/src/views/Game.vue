<template>
  <div class="game-container"></div>
</template>

<script>
import { io } from "socket.io-client";

export default {
  setup() {
    let socket = io("http://localhost:5000");
    return { socket };
  },
};
</script>
