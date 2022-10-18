<template>
    <div class="info-profil-container">
        <div>
            <img src="/assets/Profil.png" alt="Profil" />
        </div>
        <div>
            <h4 class="username-profil">{{ authStore.username }}</h4>
            <p class="email-profil">{{ authStore.email }}</p>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from "../store/Auth";

export default {
    setup() {
        const authStore = useAuthStore();
        return { authStore }
    },
}
</script>

<style>
.info-profil-container {
    display: flex;
    gap: 10px;
}

.info-profil-container div:last-child {
    justify-content: center;
    gap: 5px;
    padding: 5px 0;
    display: flex;
    flex-direction: column;
}

.info-profil-container img {
    width: 50px;
    height: 50px;
}

.info-profil-container h4 {
    font-weight: 600;
    font-family: "Roboto", sans-serif;
    text-decoration: underline;
}
</style>