import * as types from "./mutations.types";
import { login } from "network/login";

import { getCartData } from "network/cart";

export default {
  // 登录异步请求
  toLogin({ commit }, info) {
    return new Promise((resolve, reject) => {
      login(info.loginUser, info.loginPassword)
        .then((res) => {
          if (res.data.code === 1) {
            commit(types.SET_TOKEN, res.data.token); // 存储 token
            commit(types.SET_USERINFO, res.data.userProfile);
            resolve();
          } else {
            reject();
          }
        })
        .catch((err) => {
          console.log(err);
          alert("当前网络较差，请刷新重试");
        });
    });
  },
  // 退出登录
  logOut({ commit }) {
    // 退出登录
    return new Promise((resolve, reject) => {
      commit(types.SET_USERINFO, {}); // 情况 userInfo
      commit(types.SET_TOKEN, ""); // 清除 token
      commit(types.SAVE_CARTCOUTN, 0); // 清除购物车数量
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("userInfo");
      window.localStorage.removeItem("cartCount");
      resolve();
    });
  },
  // 保存购物车的数量
  // number 不为空，购物车原本数量加入商品数量)
  // number为空，发送网络请求购物车数据
  saveCartCount({ state, commit }, number) {
    // 如果number不为空
    if (number) {
      const sum = parseInt(state.cartCount) + number;

      commit(types.SAVE_CARTCOUTN, sum);
      return;
    }
    new Promise((resove, reject) => {
      getCartData(state.userInfo.user_id)
        .then((res) => {
          if (res.data.length > 0) {
            const count = res.data.reduce(
              (acc, item) => acc + item.product_num,
              0
            );
            commit(types.SAVE_CARTCOUTN, count);
          } else {
            commit(types.SAVE_CARTCOUTN, 0);
          }
        })
        .catch((err) => {
          console.log(err);
          commit(types.SAVE_CARTCOUTN, 0);
        });
    });
  },
};
