import { request } from "./request";

export function login(username, password) {
  return request({
    url: "user/login",
    method: "post",
    data: {
      form: {
        username,
        password,
      },
    },
  });
}
