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
    userInfo: window.localStorage.getItem("userInfo")
      ? window.localStorage.getItem("userInfo")
      : {},
    loginStatus: false,
    cartCount: 0, // 购物车的数量
  },
  mutations,
  actions,
  getters,
});
