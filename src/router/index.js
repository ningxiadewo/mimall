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

const routes = [
  {
    path: "",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "index",
    component: Index
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/product/:id",
    name: "product",
    component: Product
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/order",
    name: "order",
    component: Order,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/search/:searchText",
    name: "search",
    component: Search
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem("token");
  if (to.meta.requiresAuth) {
    if (token) {
      store.state.userInfo = JSON.parse(
        window.localStorage.getItem("userInfo")
      );
      next();
    } else {
      next({
        path: "/login"
        // query: { redirect: to.fullPath }
      });
      next();
    }
  } else {
    if (token) {
      store.state.userInfo = JSON.parse(
        window.localStorage.getItem("userInfo")
      );
      next();
    } else {
      next();
    }
  }
});

export default router;
