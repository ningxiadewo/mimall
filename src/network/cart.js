import { request } from "./request";

/**
 * 获取购物车信息
 * @param {number} user_id
 */
export function getCartData(user_id) {
  return request({
    url: "cart/showCart",
    method: "post",
    data: {
      user_id,
    },
  });
}

/**
 * 删除购物车单个商品
 * @param {number} cart_id 购物车id
 */
export function romoveCartItem(cart_id) {
  return request({
    url: "cart/dropCartItem",
    method: "post",
    data: {
      cart_id,
    },
  });
}

/**
 * 更新购物车单个商品数量
 * @param {number} product_num 商品数量
 * @param {number} cart_id 购物车id
 */
export function updateItemCount(product_num, cart_id) {
  return request({
    url: "cart/updateItemCount",
    method: "post",
    data: {
      product_num,
      cart_id,
    },
  });
}

/**
 * 改变购物车单件产品的数量
 * @param {number} cart_id
 */
export function changeSelectStatus(cart_id) {
  return request({
    url: "cart/changeSelectStatus",
    method: "post",
    data: {
      cart_id,
    },
  });
}

/**
 * 全选
 */
export function selectAllCart(user_id) {
  return request({
    url: "cart/selectAllCart",
    method: "post",
    data: {
      user_id,
    },
  });
}

/**
 * 全不选
 */
export function selectNoneCart(user_id) {
  return request({
    url: "cart/selectNoneCart",
    method: "post",
    data: {
      user_id,
    },
  });
}
