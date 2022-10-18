<template>
    <div class="login">
        <BannerSignIn 
            v-if="state != 0"
            :key="state"
            :message="error"
            :status="'error'"
        />
        
        <form @submit.prevent="login">
            <h2>{{ mode == 'I' ? "Sign up" : "Sign in" }}</h2>
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
            <div v-if="mode == 'I'">
                <label for="email-field-login">Email</label>
                <input 
                    id="email-field-login"
                    type="text"
                    class="input-form-login"
                    v-model="email"
                    placeholder="Email"
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
            <div v-if="mode == 'I'">
                <label for="reset-field-login">Confirm password</label>
                <input 
                    type="password"
                    id="reset-field-login"
                    class="input-form-login"
                    v-model="resetPwd"
                    placeholder="Confirm"
                />
            </div>
            <button>{{ mode == 'I' ? "Sign up" : "Sign in" }}</button>
        </form>

        <p @click="toggleMode">{{ mode == 'I' ? "Already have an account ? Sign in here !" : "Not have an account yet ? Sign up here !"}}</p>
    </div>
</template>

<script>
import { useAuthStore } from '../store/Auth';
import BannerSignIn from '@/components/BannerSignIn.vue';
import { ref } from 'vue';

export default {
    name: 'Login', 

    setup() {
        const state = ref(0), password = ref(""), username = ref(""), error = ref(""), mode = ref("C"), email = ref(""), resetPwd = ref("")
        return { state, password, username, error, mode, email, resetPwd }
    },  

    components: {
        BannerSignIn
    }, 

    methods: {
        async login() {
            if(this.mode == "I" && this.resetPwd != this.password) {
                this.password = ""
                this.resetPwd = ""
                this.error = "Both password are not the same"
                this.state++;
            }
            const auth = useAuthStore()
            const login = await auth.login(this.username, this.email, this.password, this.mode)
            if(!login.success) {
                this.state++;
                this.error = login.error;
            }
        }, 
        toggleMode() {
            this.mode = this.mode == "I" ? "C" : "I"
        }
    },
}
</script>

<style>
    .login {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .login form {
        border-radius: 10px;
        padding: 25px 50px;
        background-color: whitesmoke;
        color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .login h2 {
        font-weight: 900;
        font-size: 20px;
        font-style: italic;
        text-decoration: underline;
    }

    input {
        color: black;
    }

    form > div {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    form > div label {
        font-size: 13px;
        font-style: italic;
    }

    form button {
        background-color: rgba(0, 0, 0, 0);
        border: 1px solid rgb(4, 4, 28);
        padding: .5rem 2rem;
        border-radius: 1rem;
        cursor: pointer;
        transition: all .3s ease-in;
    }

    form button:hover {
        background-color: rgba(4, 4, 28);
        color: white;
    }

    .login > p {
        cursor: pointer;
        padding-top: 15px;
        text-align: center;
        font-size: 13px;
    }

    .login > p:hover {
        text-decoration: underline;
    }
</style>