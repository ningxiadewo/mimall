import { request } from "./request";

export function getProductData(id) {
  return request({
    url: "/products/getGoodsById",
    method: "post",
    data: {
      spu_id: id
    }
  });
}
