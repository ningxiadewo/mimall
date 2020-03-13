import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: window.localStorage.getItem("token")
      ? window.localStorage.getItem("token")
      : "",
    userInfo: {},
    loginStatus: false,
    cart: []
  },
  mutations,
  actions,
  getters
});
