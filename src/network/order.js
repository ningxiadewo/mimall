import { request } from "./request";

// 去付款结算
export function addOrder(order, orderItems) {
  return request({
    url: "order/addOrder",
    method: "post",
    data: {
      order,
      orderItems,
      // 'order': {
      //   //主订单参数
      //   user_id: order.user_id, //传进来的用户id
      //   mobile: order.mobile, //用户电话
      //   addressee: order.addressee, //收件人地址
      //   address_mobile: order.address.mobile, //收件人电话
      //   address_area: order,
      //   address_tag: "家",
      //   address_name: "2栋10号", //收件地址
      // },
      // 'orderItems': [
      //   //订单明细表参数，以数组形式显示，购物车里有多少个商品，就有多少个数组元素
      //   {
      //     product_id: "sku_02", //产品id
      //     product_num: 15, //产品数量
      //     cart_id: "CART2020416114819", //对应购物车id
      //     account: null, //折扣，暂时未用到
      //     ee_mobile: null, //咨询人员电话，暂时未用到
      //     shopId: null, //店铺id，暂时未用到
      //   },
      // ],
    },
  });
}

// 展示已付款的订单
export function showOrder(user_id) {
  return request({
    url: "order/showOrder",
    method: "post",
    data: {
      user_id,
    },
  });
}

export function deleteOrder(detail_id) {
  return request({
    url: "order/deleteOrder",
    method: "post",
    data: {
      detail_id,
    },
  });
}

export function pay(master_id) {
  return request({
    url: "/pay/sendToAlipay",
    method: "post",
    data: {
      master_id,
    },
  });
}
