import { request } from "./request";

export function getProductData(id) {
  return request({
    url: "/products/getGoodById",
    method: "post",
    data: {
      spu_id: id,
    },
  });
}

export function addCart(user_id, product_id, product_num) {
  return request({
    url: "/cart/addCart",
    method: "post",
    data: { user_id, product_id, product_num },
  });
}
