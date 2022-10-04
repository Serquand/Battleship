import { defineStore } from "pinia";

import router from "../router/index.js";
import { url } from "../../config.json";

export const useAuthStore = defineStore("Auth", {
  state: () => ({
    token: "",
    username: "",
    email: "",
  }),

  actions: {
    async login(pseudo, email, pwd, mode) {
      console.log(pwd);
      var requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: pseudo,
          email,
          pwd,
          mode,
        }),
      };

      let res = await fetch(url + "/profil/login", requestOptions);
      if (res.status === 200 || res.status === 201) {
        res = await res.json();
        this.jwtToken = res.token;
        this.username = res.userId;
        this.email = res.email;
        if (router.currentRoute.value.query.redirect)
          router.push(router.currentRoute.value.query.redirect);
        else router.push("/");
      }
    },

    async isLoggedIn() {
      if (this.username == "" || this.token == "") {
        this.logout();
        return false;
      }
      const optionsSearch = {
        headers: {
          Authorization: "Bearer " + this.jwtToken,
        },
      };
      const isLoggedInResult = await fetch(
        url + "/profil/auth/" + this.username,
        optionsSearch
      );
      if (isLoggedInResult.status == 200) return true;
      this.logout();
      return false;
    },

    logout() {
      this.token = "";
      this.email = "";
      this.username = "";
      router.push("/");
    },
  },
});
