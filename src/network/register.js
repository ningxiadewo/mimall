import { request } from "./request";

export function registerForm(
  user_name,
  password,
  user_email,
  user_sex,
  user_wechat,
  user_tel
) {
  console.log(user_name);

  return request({
    url: "/user/register",
    method: "post",
    data: {
      user: {
        user_name,
        password,
        user_email,
        user_sex,
        user_wechat,
        user_tel,
        user_hobby: "",
        user_introduce: ""
      }
    }
  });
}
