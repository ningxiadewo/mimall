// 进行axios封装
import originAxios from "axios";

export function request(options) {
  // 响应拦截
  // 创建axios实例对象
  const instance = originAxios.create({
    baseURL: "http://39.107.45.210:3000/api",
    timeout: 5000,
  });
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      // alert("请求失败，请检查网络");
      // console.log(error);
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      // 可以对响应内容进行一些过滤，比如主要用data
      return response;
    },
    (error) => {
      // if (error.response) {
      //   switch (error.response.status) {
      //     case 401:
      //       router.replace({
      //         path: "login",
      //         query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      //       });
      //   }
      // }
      // alert("响应失败，请检查网络");
      // console.log(error);

      return Promise.reject(error);
    }
  );
  // 发送网络请求
  return instance(options);
}
