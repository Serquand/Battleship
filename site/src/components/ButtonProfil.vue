<template>
    <div class="button-profil">
        <button 
            class="button button-profil"
            @click="logout"
        >Log out</button>
        
        <button 
            class="button button-profil"
            @click="updateAccount"
        >Update  account</button>
        
        <button 
            class="button button-profil"
            @click="deleteAccount"
        >Delete account</button>
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
    .button-profil {
        margin-top: 25px;
        display: flex;
        justify-content: center;
        gap: 20px;    
    }

    .button-profil button {
        cursor: pointer;
        background: rgba(0, 0, 0, 0);
        color: white;
        border: 1px solid white;
        padding: 0.5rem 2rem;
        border-radius: 50px;
        transition: .7s all;
    }

    .button-profil button:hover {
        background-color: #fff;
        color: rgb(4, 4, 28);
    }
</style>