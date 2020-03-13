import * as types from "./mutations.types";

export default {
  // 设置token
  [types.SET_TOKEN](state, value) {
    state.token = value;
  },
  // 设置用户信息
  [types.SET_USERINFO](state, value) {
    state.userInfo = value;
  },
  // 设置登录状态
  [types.LOGIN_STATUS](state, bool) {
    state.loginStatus = bool;
  },
  // 商品保存并添加到购物车
  [types.ADD_CART](state, goodsInfo) {
    let flag = false; // 判断购物车是否有该商品
    // 如果购物车有该商品了，就保存商品数量
    state.cart.some(item => {
      if ((item.id = goodsInfo.id)) {
        flag = true;
        item.counter += goodsInfo.counter;
        item.totalPrice = item.counter * item.price;
      }
    });
    if (!flag) {
      state.cart.push(goodsInfo);
    }
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  // 更新商品信息
  [types.UPDATE_CARTINFO](state, goodsInfo) {
    state.cart.some(item => {
      if (item.id == goodsInfo.id) {
        item.counter = goodsInfo.counter;
        item.totalPrice = item.counter * item.price;
        return true;
      }
    });

    window.localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  // 删除某个商品
  [types.REMOVE_CARTITEM](state, id) {
    state.cart.some((item, index) => {
      if (item.id == id) {
        state.cart.splice(index, 1);
        return true;
      }
    });
    window.localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  // 更新商品选中状态
  [types.UPDATE_SELECTED](state, goodsInfo) {
    state.cart.some(item => {
      if (item.id == goodsInfo.id) {
        item.selected = goodsInfo.selected;
      }
    });
    window.localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  // 更新商品全选状态
  [types.UPDATE_ALLSELECTED](state, selected) {
    state.cart.forEach(item => {
      item.selected = selected;
    });
    window.localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  // 清除购物车
  [types.REMOVE_CART](state) {
    state.cart = [];
  }
};
