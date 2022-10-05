<template>
    <div class="login">
        <BannerSignIn 
            v-if="state != 0"
            :key="state"
            :message="error"
            :status="'error'"
        />

        <form @submit.prevent="login">
            <h2>Connectez-vous</h2>
            <div>
                <label for="username-field-login">Username</label>
                <input 
                    id="username-field-login"
                    type="text"
                    class="input-form-login"
                    v-model="username"
                    placeholder="Username"
                />
            </div>
            <div>
                <label for="pwd-field-login">Password</label>
                <input 
                    type="password"
                    id="pwd-field-login"
                    class="input-form-login"
                    v-model="password"
                    placeholder="Password"
                />
            </div>
            <button>Se connecter</button>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from '../store/Auth';
import BannerSignIn from '@/components/BannerSignIn.vue';
import { ref } from 'vue';

export default {
    name: 'Login', 

    setup() {
        const state = ref(0), password = ref(""), username = ref(""), error = ref("")
        return { state, password, username, error }
    },  

    components: {
        BannerSignIn
    }, 

    methods: {
        async login() {
            const auth = useAuthStore()
            const login = await auth.login(this.username, "", this.password, "Connexion")
            if(!login.success) {
                this.state++;
                this.error = login.error;
            }
        }
    },
}
</script>

<style>
    input {
        color: black;
    }

</style>