<template>
  <!-- 头部部分 -->
  <!-- 顶部下面导航 -->
  <div class="nav-site">
    <div class="container">
      <div class="site-fixed">
        <h1 class="site-logo">
          <a href="javaScript:;" @click="$router.push('/', () => {})"></a>
        </h1>
        <div class="site-search">
          <div class="wrapper">
            <input
              type="text"
              class="search-text"
              v-model="searchMassage"
              @keyup.enter="$emit('searchGoods', searchMassage)"
              placeholder="请输入要搜索的内容"
            />
            <a
              href="javaScript:;"
              class="search-btn"
              @click="$emit('searchGoods', searchMassage)"
              ><span></span></a
            >
          </div>
        </div>
        <div class="icon-item cart">
          <a href="javaScript:;" @click="toCart()">
            <span class="icon"></span>
            <p>购物车</p>
          </a>
          <span class="number">{{ cartCount }}</span>
        </div>
        <div class="icon-item collect">
          <a href="javaScript:;" @click="$emit('toMyCollect')">
            <span class="icon"></span>
            <p>收藏</p>
          </a>
        </div>
        <div class="topbar-user">
          <!-- 个人信息 -->
          <span class="userInfo" v-if="Object.keys(userInfo).length > 0">
            <span class="wrapper">
              <a href="javaScript:;" class="name" @click="$emit('toMyProfile')">
                <img src="~assets/imgs/head-img.jpg" alt="" />
                {{ userInfo.user_name }}
                <span :class="{ hide: fixed }"></span>
              </a>
              <div class="children" :class="{ hide: fixed }">
                <ul>
                  <li>
                    <a href="javaScript:;" @click="$emit('toMyProfile')"
                      >个人中心</a
                    >
                  </li>
                  <li>
                    <a href="javaScript:;" @click="$emit('toMyOrder')"
                      >我的订单</a
                    >
                  </li>
                  <li>
                    <a href="javaScript:;" @click.prevent="logOut">退出登录</a>
                  </li>
                </ul>
              </div></span
            >
            <!-- 退出登录 -->
            <a href="javaScript:;" @click.prevent="logOut" class="quit-login">
              <span>退出登录</span>
            </a>
          </span>
          <!-- 登录 、注册 -->
          <span class="not-login" v-else>
            <a href="javaScript:;" @click="$router.push('/login')">登录</a>
            <a href="javaScript:;" @click="$router.push('/register')">注册</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "nav-site",
  data() {
    return {
      searchMassage: "",
    };
  },
  computed: {
    ...mapState(["userInfo", "cartCount"]),
  },
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    // 获取购物车的数量
    // 登录状态
    if (Object.keys(this.$store.state.userInfo).length > 0) {
      // 本地未保存购物车的数量
      if (!window.localStorage.getItem("cartCount")) {
        // 发送网络请求，保存购物车的数量
        this.$store.dispatch("saveCartCount");
      }
    }
    if (this.$route.path.indexOf("search") !== -1) {
      this.searchMassage = this.$route.params.searchId;
    }
  },
  methods: {
    /**
     * 退出登录
     */
    logOut() {
      this.$store
        .dispatch("logOut")
        .then(() => {
          if (this.$route.name !== "index") {
            this.$router.replace("/");
          }
          this.$toach.show("退出登录成功");
        })
        .catch((err) => {
          console.log(err);
          this.$toach.show("退出登录失败");
        });
    },
    /**
     * 购物车页面
     */
    toCart() {
      this.$router.push("/cart", () => {});
    },
  },
  watch: {
    // 监听点击返回按钮时，如果是在搜索页的话，搜索框的值等于url中的searchId
    $route(to, form) {
      if (
        form.path.indexOf("search") !== -1 &&
        this.$route.path.indexOf("search") !== -1
      ) {
        this.searchMassage = this.$route.params.searchId;
      }
    },
  },
};
</script>

<style>
.nav-site {
  height: 70px;
  z-index: 15;
  position: relative;
}
.nav-site .site-fixed {
  padding: 7px 0;
  height: 56px;
  position: relative;
}
.nav-site .site-logo {
  position: absolute;
  left: 0;
  top: 50%;
  width: 290px;
  height: 70px;
  background: url("~assets/imgs/logo.png") no-repeat;
  background-size: contain;
  transform: translate(0, -50%);
  margin: 0;
}
.nav-site .site-logo > a {
  display: block;
  width: 100%;
  height: 100%;
}
.site-search > .wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  float: left;
  margin-left: 350px;
  margin-top: 4px;
  height: 48px;
  width: 552px;
  box-sizing: border-box;
}
.site-search > .wrapper .search-text {
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
.site-search .wrapper .search-btn {
  position: relative;
  float: right;
  width: 58px;
  height: 48px;
  line-height: 24px;
  background-color: rgb(146, 146, 146);
  cursor: pointer;
  transition: all 0.3s;
}
.site-search > .wrapper .search-btn:hover {
  background: var(--color-topic);
}
.site-search > .wrapper span {
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
.nav-site .icon-item {
  position: relative;
  float: left;
  margin-left: 15px;
  margin-top: 9px;
  width: 36px;
  height: 46px;
  line-height: 20px;
}
.nav-site .icon-item .number {
  position: absolute;
  left: 20px;
  top: -7px;
  padding: 0 2px;
  width: 300x;
  max-width: 50px;
  overflow: hidden;
  height: 16px;
  background-color: red;
  border-radius: 6px;
  color: #fff;
  line-height: 16px;
  font-size: 12px;
  text-overflow: ellipsis;
}
.nav-site .icon-item a {
  display: inline-block;
  width: 100%;
  height: 100%;
  color: #333;
}
.nav-site .icon-item a .icon {
  display: block;
  width: 24px;
  height: 24px;
}
.nav-site .cart a .icon {
  background: url("~assets/imgs/icon-cart.png") no-repeat;
  background-size: 100%;
}
.nav-site .collect a .icon {
  background: url("~assets/imgs/icon-collect.png") no-repeat;
  background-size: 100%;
}
/* 右边登录部分 */
.nav-site .topbar-user {
  height: 56px;
  line-height: 56px;
}
.nav-site .topbar-user .not-login a {
  width: 60px;
  text-align: center;
  background-color: var(--color-assist);
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
.nav-site .topbar-user > span {
  margin-left: 20px;
}
.nav-site .topbar-user > span > a {
  height: 40px;
  line-height: 40px;
  display: inline-block;
  color: #333;
}
.nav-site .userInfo {
  position: relative;
  display: inline-block;
  width: 220px;
  height: 56px;
  padding: 0;
  text-align: center;
}
.nav-site .userInfo > .wrapper {
  position: relative;
  display: inline-block;
  width: 110px;
  height: 56px;
  padding: 0;
}
.nav-site .userInfo > .wrapper > a {
  display: block;
  width: 100%;
  margin: 0;
  color: #333;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 15px;
}
.nav-site .userInfo > .wrapper > a > img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
}
.nav-site .userInfo > .wrapper > a > span {
  font-family: "icomoon";
  font-size: 14px;
}
.nav-site .userInfo > .wrapper:hover .children {
  height: 120px;
  opacity: 1;
}
.nav-site .userInfo .children {
  position: absolute;
  top: 56px;
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
  color: #333;
}
.nav-site .userInfo .children a:hover,
.nav-site .topbar-user .isActive {
  background-color: var(--color-topic);
  color: #fff;
}
.nav-site .topbar-user .quit-login {
  float: right;
  margin-left: 20px;
  padding: 13px 0;
}
.nav-site .topbar-user .quit-login > span {
  display: block;
  width: 80px;
  text-align: center;
  background-color: var(--color-assist);
  border-radius: 10px;
  color: #fff;
  height: 30px;
  line-height: 30px;
  margin: 0;
}
.nav-site .topbar-user .quit-login:hover {
  opacity: 0.7;
}
</style>
