import { request } from "./request";

export function getIndexData() {
  return request({
    url: "/products/other"
  });
}
export function getHeaderData() {
  return request({
    url: "/products/header"
  });
}
