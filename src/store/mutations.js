import * as types from "./mutations.types";

export default {
  // 设置token
  [types.SET_TOKEN](state, value) {
    state.token = value;
    window.localStorage.setItem("token", value); // 存储进 localStroage
  },
  // 设置用户信息
  [types.SET_USERINFO](state, value) {
    state.userInfo = value;
    window.localStorage.setItem("userInfo", JSON.stringify(value));
  },
  // 保存购物车的数量
  [types.SAVE_CARTCOUTN](state, count) {
    state.cartCount = count;
    localStorage.setItem("cartCount", count);
  },
};
