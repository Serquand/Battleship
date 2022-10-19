import { defineStore } from "pinia";

import router from "../router/index.js";
import { url } from "../../config.json";

export const useAuthStore = defineStore("Auth", {
  state: () => ({
    token: "",
    username: "",
    email: "",
    setState: '', 
    numberSuccess: 0
  }),

  actions: {
    async login(pseudo, email, pwd, mode) {
      var requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: pseudo, email, pwd, mode })
      };

      let res = await fetch(url + "/profil/login", requestOptions);      
      if(!(res.status === 200 || res.status === 201)) return { success: false, error: (await res.json()).error }
      
      res = await res.json();
      this.token = res.token;
      this.username = res.userId;
      this.email = res.email;

      this.setState = res.information
      this.numberSuccess++

      if (router.currentRoute.value.query.redirect) await router.push(router.currentRoute.value.query.redirect);
      else router.push("/");

      return { success: true, information: res.information }
    },

    async isLoggedIn() {
      if (this.username == "" || this.token == "") {
        this.logout();
        return false;
      }

      const optionsSearch = { headers: { Authorization: "Bearer " + this.token } };
      if ((await fetch(url + "/profil/auth/" + this.username, optionsSearch)).status == 200) return true;
      
      this.logout();
      return false;
    },

    logout() {
      this.token = "";
      this.email = "";
      this.username = "";
      router.push("/");
    },

    async deleteAccount() {
      if(this.token == '' || this.email == "" || this.username == "") return

      var requestOptions = { 
        method: "DELETE", 
        headers: {
          "Authorization": "Bearer " + this.token
        },
      }

      this.token = ''
      this.email = ""
      this.username = ""

      await fetch(url + "/profil/" + this.username, requestOptions)
      router.push("/");
    }, 

    async updateAccount(mail, password, resetPwd, name) {
      if(password != resetPwd) return
 
      const pseudo = name ?? this.username
      const email = mail ?? this.email

      const requestOptions = {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + this.token, 
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({ pseudo, email, password })
      }

      let res = await fetch(url + "/profil/" + this.username, requestOptions)
      if(res.status == 400 || res.status == 401) {
        //TODO : Display the sign in banner with the error  
        return false
      }
      res = await res.json()
      this.token = res.token;
      this.username = res.user;
      this.email = res.email;
      return true
    } 
  },
});
