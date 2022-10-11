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

    deleteAccount() {
      if(this.token == '' || this.email == "" || this.username == "") return
      console.log("We will delete the account !")
    }
  },
});
