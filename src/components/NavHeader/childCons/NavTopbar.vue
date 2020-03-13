<template>
  <div class="nav-topbar">
    <div class="container">
      <!-- 左边菜单部分 -->
      <div class="topbar-menu">
        <a href="javaScript:;">小米商城</a>
        <a href="javaScript:;">MIUI</a>
        <a href="javaScript:;">IoT</a>
        <a href="javaScript:;">云服务</a>
        <a href="javaScript:;">金融</a>
        <a href="javaScript:;">有品</a>
        <a href="javaScript:;">小爱开放平台</a>
        <a href="javaScript:;">企业团购</a>
        <a href="javaScript:;">资质证照</a>
        <a href="javaScript:;">协议规则</a>
      </div>
      <!-- 右边用户部分 -->
      <div class="topbar-user">
        <span class="userInfo" v-if="Object.keys(userInfo).length > 0">
          <a href="javaScript:;">{{ userInfo.user_name }}</a>
          <div class="children">
            <ul>
              <li>
                <a href="javaScript:;">个人中心</a>
              </li>
              <li>
                <a href="javaScript:;" @click="$store.dispatch('logOut')"
                  >退出登录</a
                >
              </li>
            </ul>
          </div>
        </span>
        <span v-else>
          <a href="/login">登录</a>
          <a href="/register">注册</a>
        </span>
        <a href="javaScript:;">消息通知</a>
        <a
          href="/cart"
          class="user-cart"
          :class="{ isActive: $store.getters.cartCount != 0 }"
        >
          <span class="icon-cart"></span>
          购物车
          <span>({{ $store.getters.cartCount }})</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "nav-topbar",
  computed: {
    ...mapState(["userInfo", "loginStatus"])
  }
};
</script>

<style>
.nav-topbar {
  height: 40px;
  line-height: 40px;
  background-color: #333;
}
.nav-topbar a:hover {
  color: #fff;
}
.nav-topbar .container {
  display: flex;
  justify-content: space-between;
}
.nav-topbar .container a {
  display: inline-block;
  color: #b0b0b0;
  margin-left: 18px;
}
.nav-topbar .container a:hover {
  color: #ff6700;
}

.nav-topbar .topbar-user .user-cart {
  background-color: #424242;
  padding-left: 25px;
  padding-right: 25px;
}
.nav-topbar .topbar-user .user-cart:hover {
  background-color: #ff6700;
  color: #fff;
}
.nav-topbar .icon-cart {
  display: inline-block;
  width: 16px;
  height: 12px;
  background: url("/imgs/icon-cart.png") no-repeat;
  background-size: contain;
  margin-right: 5px;
}
.nav-topbar .topbar-user {
  height: 40px;
  line-height: 40px;
}
.nav-topbar .userInfo {
  position: relative;
  display: inline-block;
  width: 110px;
  padding: 0;
  white-space: nowrap;
  text-align: center;
}
.nav-topbar .userInfo > a {
  display: block;
  width: 100%;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nav-topbar .userInfo:hover .children {
  height: 80px;
  opacity: 1;
}
.nav-topbar .userInfo .children {
  position: absolute;
  background: #fff;
  text-align: center;
  width: 100%;
  box-shadow: 0 2px 10px #ccc;
  z-index: 11;
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: height 0.8s linear;
}
.nav-topbar .userInfo .children a {
  display: block;
  margin: 0;
}
.nav-topbar .userInfo .children a:hover,
.nav-topbar .topbar-user .isActive {
  background-color: #ff6700;
  color: #fff;
}
</style>
