import { request } from "./request";

export function searchGoods(good_name) {
  return request({
    url: "products/getGoodByName",
    method: "post",
    data: {
      good_name,
    },
  });
}
