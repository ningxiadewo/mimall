import { request } from "./request";

// 注册用户
export function registerForm(
  user_name,
  password,
  user_email,
  user_sex,
  user_tel
) {
  return request({
    url: "/user/register",
    method: "post",
    data: {
      user_name,
      password,
      user_email,
      user_tel,
      user_wechat: "",
      user_sex,
    },
  });
}

// 查找用户名是否已经被注册
export function findUser(username) {
  return request({
    url: "/user/findUserByName",
    method: "post",
    data: {
      username,
    },
  });
}
