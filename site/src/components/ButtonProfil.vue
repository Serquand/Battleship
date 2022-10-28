<template>
    <div class="button-profil-container">
        <button 
            class="button button-profil"
            @click="logout"
        >Log out</button>
        
        <button 
            class="button button-profil"
            @click="updateAccount"
        >Update <span>account</span></button>
        
        <button 
            class="button button-profil"
            @click="deleteAccount"
        >Delete <span>account</span></button>
    </div>
</template>

<script>
import { useAuthStore } from '../store/Auth';

export default {
    methods: {
        logout() { 
            useAuthStore().logout()
        }, 
        updateAccount() {
            this.$emit("updateAccount")
        }, 
        deleteAccount() {
            useAuthStore().deleteAccount()
        }
    }
}
</script>

<style>
    .button-profil-container {
        margin-top: 25px;
        display: flex;
        justify-content: center;
        gap: 20px;    
    }

    .button-profil-container button {
        cursor: pointer;
        background: rgba(0, 0, 0, 0);
        color: white;
        border: 1px solid white;
        padding: 0.5rem 2rem;
        border-radius: 50px;
        transition: .7s all;
    }

    .button-profil-container button:hover {
        background-color: #fff;
        color: rgb(4, 4, 28);
    }

    @media all and (max-width: 700px) {
        .button-profil span {
            display: none;
        }
    }

    @media all and (max-width: 500px) {
        .button-profil-container {
            flex-direction: column;
            width: 60%;
            margin: auto;
            gap: 20px;
            margin-top: 35px;
        }
    }
</style>