<template>
    <div class="modal modal-update-profil">
        <div class="modal-content modal-content-update-profil">
            <h4>Update account</h4>
            <div class="update-content">
                <div>
                    <label for="pseudo-update">Pseudo</label>
                    <input 
                        id="pseudo-update" 
                        class="update-inpuput" 
                        type="text"
                        :value="username"
                    />
                </div>
                <div>
                    <label for="email-update">Email</label>
                    <input 
                        id="email-update" 
                        class="update-inpuput" 
                        type="text" 
                        :value="email"
                    />
                </div>
                <div>
                    <label for="password-update">Password</label>
                    <input 
                        id="password-update" 
                        class="update-inpuput" 
                        type="password" 
                        placeholder="Password..."
                    />
                </div>
                <div>
                    <label for="confirm-pwd-update">Confirm password</label>
                    <input 
                        id="confirm-pwd-update" 
                        class="update-inpuput" 
                        type="password"
                        placeholder="Confirm.."
                    />
                </div>
            </div>
            <div class="button-container">
                <button 
                    class="button-modal-update"
                    @click="updateAccount"
                >Update account</button>
                
                <button 
                    class="button-modal-update"
                    @click="endUpdate"
                >Close modal</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../store/Auth.js';

export default {
    methods: {
        endUpdate() {
            this.$emit("endUpdate")
        }, 
        updateAccount() {
            (useAuthStore()).updateAccount()
            
            this.$emit("endUpdate")
        }
    }, 
    props: {
        username: {
            type: String, 
            required: true
        }, 
        email: {
            type: String, 
            required: true
        }
    }
}
</script>

<style>
.modal-content-update-profil {
    color: black;
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 300px;
}

.modal-content-update-profil h4 {
    font-weight: 600;
    font-style: italic;
    text-decoration: underline;
    text-align: center;
    font-size: 20px;
    font-family: "Roboto", sans-serif;
}

.modal-content-update-profil label {
    font-size: 13px;
}

.modal-content-update-profil input {
    width: 200px;
}

.update-content > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 20px 0;
}

.button-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.button-container button {
    padding: 0.5rem 2rem;
    outline: none;
    border: 1px solid rgb(4, 4, 28);
    border-radius: 1rem;
    background-color: #fff;
    transition: all .6s;
    cursor: pointer;
}

.button-container button:hover {
    color: #fff;
    background-color: rgb(11, 11, 95);
}
</style>