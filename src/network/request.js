// 进行axios封装
import originAxios from "axios";

// if (window.localStorage.getItem("token")) {
//   originAxios.defaults.headers.common["Authorization"] =
//     `Bearer ` + window.localStorage.getItem("token");
// }

// 创建axios实例对象
export const instance = originAxios.create({
  baseURL: "http://39.107.45.210:3000/api",
  timeout: 5000
});

export function request(options) {
  // 响应拦截
  instance.interceptors.response.use(
    response => {
      // 可以对响应内容进行一些过滤，比如主要用data
      return response;
    },
    error => {
      // if (error.response) {
      //   switch (error.response.status) {
      //     case 401:
      //       router.replace({
      //         path: "login",
      //         query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      //       });
      //   }
      // }
      console.log(error);

      return Promise.reject(error);
    }
    //   console.log("响应失败拦截");
    //   return arr;
    // }
  );
  // 发送网络请求
  return instance(options);
}
