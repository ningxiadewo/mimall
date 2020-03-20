<template>
  <div class="nav-site">
    <div class="container">
      <div class="site-logo"></div>
      <!-- <div class="site-menu">
        <ul>
          <li class="site-menu-item">
            小米手机
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[0]"
            ></product-list>
          </li>
          <li class="site-menu-item">
            Redmi红米
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[1]"
            ></product-list>
          </li>
          <li class="site-menu-item">
            电视
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[2]"
            ></product-list>
          </li>
          <li class="site-menu-item">
            <a>笔记本</a>
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[3]"
            ></product-list>
          </li>
          <li class="site-menu-item">
            <a>家电</a>
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[4]"
            ></product-list>
          </li>
          <li class="site-menu-item">
            <a>路由器</a>
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[5]"
            ></product-list>
          </li>
          <li class="site-menu-item">
            <a>智能硬件</a>
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[6]"
            ></product-list>
          </li>
          <li class="site-menu-item">
            <a>服务</a>
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[7]"
            ></product-list>
          </li>
        </ul>
      </div> -->
      <div class="site-search">
        <div class="wraper">
          <input type="text" class="search-text" />
          <a href="javaScript:;" class="search-btn"><span></span></a>
        </div>
      </div>
      <div class="cart" v-if="Object.keys(userInfo).length > 0">
        <a href="/cart">
          <span class="icon"></span>
          <p>购物车</p>
        </a>
        <span class="number">{{$store.getters.cartCount}}</span>
      </div>
      <div class="cart" v-else>
        <a href="javaScript:;" @click="showModal=true">
          <span class="icon"></span>
          <p>购物车</p>
        </a>
        <span class="number">{{$store.getters.cartCount}}</span>
      </div>
       <!-- 登录 、注册 -->
      <div class="topbar-user">
        <span class="userInfo" v-if="Object.keys(userInfo).length > 0">
          <a href="javaScript:;">
            <img src="/imgs/head-img.jpg" alt="">
            {{ userInfo.user_name }}
            <span></span>
          </a>
          <div class="children">
            <ul>
              <li>
                <a href="javaScript:;">个人中心</a>
              </li>
               <li>
                <a href="javaScript:;">我的订单</a>
              </li>
              <li>
                <a href="javaScript:;" @click="$store.dispatch('logOut')"
                  >退出登录</a
                >
              </li>
            </ul>
          </div>
        </span>
        <span class="not-login" v-else>
          <a href="/login">登录</a>
          <a href="/register">注册</a>
        </span>
      </div>
    </div>
     <modal
      :showModal="showModal"
      :confirmText="'去登录'"
      @onConfirm="$router.replace('login')"
      @onClose="showModal = false"
    >
      <div slot="body" class="modal-body-text">您还未登录呢</div>
    </modal>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ProductList from "./ProductList";

import Modal from "components/Modal"
export default {
  name: "nav-site",
  components: {
    ProductList,
    Modal
  },
  computed: {
    ...mapState(["userInfo"])
  },
  props: {
    HeaderProductList: {
      type: Array,
      defaule() {
        return [];
      }
    }
  },
  data() {
    return {
      showModal: false
    }
  }
};
</script>

<style>
.nav-site {
  height: 100px;
  line-height: 100px;
}
.nav-site .container {
  position: relative;
  height: 100px;
}
.nav-site .site-logo {
  position: absolute;
  left: 0;
  top: 50%;
  width: 130px;
  height: 55px;
  background: url("/imgs/logo.png") no-repeat;
  background-size: contain;
  transform: translate(0, -50%);
}
.nav-site .site-menu {
  margin-left: 200px;
}
.nav-site .site-menu .site-menu-item {
  float: left;
  margin-right: 18px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
}
.nav-site .site-menu .site-menu-item:hover {
  color: #ff6700;
}
.nav-site .site-menu .site-menu-item:hover .item-children {
  height: 220px;
  opacity: 1;
}
.site-search .wraper {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  float: left;
  margin-left: 350px;
  margin-top: 26px;
  height: 48px;
  width: 552px;
  box-sizing: border-box;
}
.site-search .wraper .search-text {
  float: left;
  width: 462px;
  height: 48px;
  line-height: 48px;
  border: none;
  font-size: 14px;
  background: #f7f7f7;
  color: #666;
  padding: 0 15px;
}
.site-search .wraper .search-btn {
  position: relative;
  float: right;
  width: 58px;
  height: 48px;
  line-height: 24px;
  background-color: rgb(146, 146, 146);
  cursor: pointer;
}
.site-search .wraper .search-btn:hover {
  background: #ff6700;
}
.site-search .wraper span {
  position: absolute;
  left: 50%;
  top: 50%;
  font-family: icomoon;
  width: 16px;
  height: 16px;
  transform: translate(-50%, -50%);
  font-size: 16px;
  line-height: 16px;
  color: #fff;
}
.nav-site .cart {
  position: relative;
  float: left;
  margin-left: 23px;
  margin-top: 27px;
  width: 36px;
  height: 46px;
  line-height: 20px;
  text-align: center;
}
.nav-site .cart .number {
 position: absolute;
    right: 6px;
    top: -7px;
    width: 12px;
    height: 16px;
    background-color: red;
    border-radius: 6px;
    color: #fff;
    line-height: 16px;
    font-size: 12px;
}
.nav-site .cart a {
  display: inline-block;
  width: 100%;
  height: 100%;
  color: #333;  
}
.nav-site .cart a .icon {
  display: block;
  background: url("/imgs/icon-cart.png") no-repeat;
  background-size: 100%;
  width: 24px;
  height: 24px;
}
/* 右边登录部分 */
.nav-site .topbar-user {
  height: 100px;
  line-height: 100px;
}
.nav-site .topbar-user a {
  color: #999;
  display: inline-block;
  color: #333;
}
.nav-site .topbar-user .not-login a{
  width: 60px;
  text-align: center;
  background-color: #ff6700;
  border-radius: 10px;
  color: #fff;
  height: 22px;
  line-height: 22px;
  margin-right: 20px;
}
.nav-site .topbar-user .not-login a:last-child {
  background-color: #65f676;
}
.nav-site .topbar-user .not-login a:hover {
  opacity: 0.7;
}
/* .nav-site .topbar-user .not-login a:first-child::after {
  content: "|";
  display: inline-block;
  height: 20px;
  width: 1px;
  color: #ccc;
  margin-left: 23px;
} */
.nav-site .topbar-user>span {
  margin-left: 50px;
}
.nav-site .topbar-user>span>a {
  height: 40px;
  line-height: 40px;
}
.nav-site .userInfo {
  position: relative;
  display: inline-block;
  width: 110px;
  padding: 0;
  white-space: nowrap;
  text-align: center;
}
.nav-site .userInfo > a {
  display: block;
  width: 100%;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-top: 30px;
}
.nav-site .userInfo > a >img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
}
.nav-site .userInfo > a>span {
  font-family: 'icomoon';
  font-size: 14px;
}
.nav-site .userInfo:hover .children {
  height: 120px;
  opacity: 1;
}
.nav-site .userInfo .children {
  position: absolute;
  background: #fff;
  text-align: center;
  width: 100%;
  box-shadow: 0 2px 10px #ccc;
  z-index: 1000;
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: height 0.3s linear;
}
.nav-site .userInfo .children a {
  display: block;
  margin: 0;
  line-height: 40px;
}
.nav-site .userInfo .children a:hover,
.nav-site .topbar-user .isActive {
  background-color: #ff6700;
  color: #fff;
}
</style>
