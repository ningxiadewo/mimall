import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store";

Vue.use(VueRouter);

const Index = () => import("views/index/Index.vue");
const Login = () => import("views/login/Login.vue");
const Product = () => import("views/product/Product.vue");
const Cart = () => import("views/cart/Cart.vue");
const Register = () => import("views/register/Register.vue");
const Order = () => import("views/order/Order.vue");
const Search = () => import("views/search/Search.vue");
const Profile = () => import("views/profile/Profile.vue");

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    meta: {
      title: "首页",
    },
  },
  // {
  //   path: "/index",
  //   name: "index",
  //   component: Index,
  // },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/product/:id",
    name: "product",
    component: Product,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/order",
    name: "order",
    component: Order,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/search/:searchId",
    name: "search",
    component: Search,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem("token");
  if (to.meta.requiresAuth) {
    // 该网页必须登录
    if (token) {
      // 已经登录
      store.state.userInfo = JSON.parse(
        window.localStorage.getItem("userInfo")
      );
      store.state.cartCount = window.localStorage.getItem("cartCount");
      next();
      // console.log('token')
    } else {
      next("/login");
    }
  } else {
    // if (to.meta.title) {
    //   document.title = to.meta.title;
    // }
    // 不要求登录可请求网页
    if (token) {
      // 已经登录
      store.state.userInfo = JSON.parse(
        window.localStorage.getItem("userInfo")
      );
      store.state.cartCount = window.localStorage.getItem("cartCount");
    }
    next();
  }
});

export default router;
