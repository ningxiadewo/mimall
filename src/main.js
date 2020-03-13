import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import toach from "components/Toach";
import originAxios from "axios";

import {
  Form,
  FormItem,
  Input,
  Radio,
  Button,
  Icon,
  RadioGroup
} from "element-ui";

Vue.use(Form);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Button);
Vue.use(Icon);
Vue.use(FormItem);
Vue.use(RadioGroup);

Vue.config.productionTip = false;

Vue.use(toach);

// 检查是否有购物车列表，
if (window.localStorage.getItem("cart")) {
  store.state.cart = JSON.parse(window.localStorage.getItem("cart"));
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// //异步请求前在header里加入token
// originAxios.interceptors.request.use(
//   config => {
//     if (config.url === "/login") {
//       //如果是登录和注册操作，则不需要携带header里面的token
//     } else {
//       if (localStorage.getItem("token")) {
//         config.headers.Authorizatior = localStorage.getItem("token");
//       }
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
// //异步请求后，判断token是否过期
// originAxios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           localStorage.removeItem("Authorization");
//           this.$router.push("/login");
//       }
//     }
//   }
// );
// //异步请求前判断请求的连接是否需要token
// router.beforeEach((to, from, next) => {
//   if (to.path === "/login") {
//     next();
//   } else {
//     let token = localStorage.getItem("token");
//     console.log("我是浏览器本地缓存的token: " + token);
//     if (token === "null" || token === "") {
//       next("/login");
//     } else {
//       next();
//     }
//   }
// });
