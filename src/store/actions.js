import * as types from "./mutations.types";

import loginRequest from "network/loginRequest";

export default {
  // 登录异步请求
  toLogin({ commit }, info) {
    return new Promise((resolve, reject) => {
      loginRequest
        .login(info.loginUser, info.loginPassword)
        .then(res => {
          commit(types.SET_TOKEN, res.data.token); // 存储 token
          commit(types.LOGIN_STATUS, true); // 改变登录状态为 true
          commit(types.SET_USERINFO, res.data.userProfile);
          window.localStorage.setItem("token", res.data.token); // 存储进 localStroage
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(res.data.userProfile)
          );
          resolve(res);
        })
        .catch(arr => {
          console.log(arr);
          reject(arr);
        });
    });
  },
  // 退出登录
  logOut({ commit }) {
    // 退出登录
    return new Promise((resolve, reject) => {
      commit(types.SET_USERINFO, ""); // 情况 userInfo
      commit(types.LOGIN_STATUS, false); // 登录状态改为 false
      commit(types.SET_TOKEN, ""); // 清除 token
      commit(types.REMOVE_CART); // 清除购物车
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("userName");
      window.localStorage.removeItem("cart");
      resolve();
    });
  }
};
