import { request } from "./request";

export function getProductData() {
  return request({
    url: "/products/getAllProductsSku"
  });
}
