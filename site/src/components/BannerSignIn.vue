<template>
    <div :class="['banner-container', status]">
        <div class="banner-content">
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String, 
            required: true
        }, 

        status: {
            type: String, 
            required: true
        }
    }
}
</script>

<style> 
.banner-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-container {
  max-width: 60%;
  transform: scaleX(0);
  width: fit-content;
  padding: 10px 100px;
  margin: auto;
  clip-path: polygon(
     0 0, 
    100% 0, 
    calc(100% - 50px) 50%, 
    100% 100%, 
    0 100%, 
    50px 50%
  );
  animation: 
    app 2s linear forwards, 
    disappear 8s linear forwards;
}

.error {
    background-color: red;
}

.success {
    background-color: green;
}

.banner-content {
  color: white; 
}

@keyframes app {
  to {
    transform: scaleX(100%);
  }
}

@keyframes disappear {
  from { opacity: 1; }
  95% { opacity: 1; }
  to { opacity: 0; }
}
</style>