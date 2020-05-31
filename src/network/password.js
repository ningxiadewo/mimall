import { request } from "./request";

export function changePassword(user_name, oldPassword, newPassword) {
  return request({
    url: "/user/updatePassword",
    method: "post",
    data: {
      user_name,
      oldPassword,
      newPassword,
    },
  });
}
