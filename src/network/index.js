import { request } from "./request";

export function getIndexData() {
  return request({
    url: "/products/other"
  });
}
