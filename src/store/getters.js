export default {
  // 购物车的数量
  cartCount(state) {
    if (state.cart.length > 0) {
      let counter = state.cart.reduce((acc, item) => acc + item.counter, 0);
      return counter;
    } else {
      return 0;
    }
  },
  // 购物车全选状态
  allCheck(state) {
    let flag = true;
    state.cart.some(item => {
      if (!item.selected) {
        flag = false;
        return true;
      }
    });
    if (state.cart.length == 0) {
      return false;
    }
    return flag;
  }
};
