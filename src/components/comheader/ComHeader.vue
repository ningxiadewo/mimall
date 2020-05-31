<template>
  <!-- 头部 -->
  <div class="com-header clear-fix">
    <div class="container">
      <h1 class="header-logo fl">
        <a href="javaScript:;" @click="$router.push('/', () => {})"></a>
      </h1>
      <div class="header-title fl">
        <h2 class="fl">
          <slot name="title-h"></slot>
        </h2>
        <p class="fl" slot="title-p">
          <slot name="title-p"></slot>
        </p>
      </div>
      <div class="topbar-info fr" v-if="showTopbar">
        <span class="userInfo">
          <span class="wrapper">
            <a href="javaScript:;" class="name" @click="toMyProfile">
              <img src="~assets/imgs/head-img.jpg" alt="" />
              {{ $store.state.userInfo.user_name }}
              <span></span>
            </a>
            <div class="children">
              <ul>
                <li>
                  <a href="javaScript:;" @click="toMyProfile">个人中心</a>
                </li>
                <li>
                  <a href="javaScript:;" @click="toMyOrder">我的订单</a>
                </li>
                <li>
                  <a href="javaScript:;" @click="logOut">退出登录</a>
                </li>
              </ul>
            </div></span
          >
          <!-- 退出登录 -->
          <a href="javaScript:;" @click.prevent="logOut" class="quit-login">
            <span>退出登录</span>
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "com-header",
  props: {
    showTopbar: {
      type: Boolean,
      default: false,
    },
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
     * 去我的订单页面
     */
    toMyOrder() {
      this.$router.push({
        path: "/profile",
        query: {
          id: 0,
        },
      });
    },
    /**
     * 去我的个人中心
     */
    toMyProfile() {
      this.$router.push({
        path: "/profile",
        query: {
          id: 3,
        },
      });
    },
  },
};
</script>

<style>
.com-header {
  height: 100px;
  line-height: 100px;
  position: relative;
  border-bottom: 2px solid var(--color-topic);
}
.com-header .container {
  height: 100%;
  position: relative;
}
.com-header .header-logo a {
  position: absolute;
  left: 0;
  top: 50%;
  width: 290px;
  height: 70px;
  background: url("~assets/imgs/logo.png") no-repeat;
  background-size: contain;
  transform: translate(0, -50%);
}
/* 头部插入内容 */
.com-header .header-title {
  margin-left: 300px;
}
.com-header .title-h {
  font-size: 28px;
  font-weight: normal;
  color: #424242;
}
/**用户信息 */
.com-header .topbar-info {
  height: 56px;
  line-height: 56px;
  margin-top: 22px;
}
.com-header .topbar-info > span {
  margin-left: 50px;
}
.com-header .topbar-info > span > a {
  height: 40px;
  line-height: 40px;
  display: inline-block;
  color: #333;
}
.com-header .userInfo {
  position: relative;
  display: inline-block;
  width: 220px;
  height: 56px;
  padding: 0;
  text-align: center;
}
.com-header .userInfo > .wrapper {
  position: relative;
  display: inline-block;
  width: 110px;
  height: 56px;
  padding: 0;
}
.com-header .userInfo > .wrapper > a {
  display: block;
  width: 100%;
  margin: 0;
  color: #333;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 15px;
}
.com-header .userInfo > .wrapper > a > img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
}
.com-header .userInfo > .wrapper > a > span {
  font-family: "icomoon";
  font-size: 14px;
}
.com-header .userInfo > .wrapper:hover .children {
  height: 120px;
  opacity: 1;
}
.com-header .userInfo .children {
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
.com-header .userInfo .children a {
  display: block;
  margin: 0;
  line-height: 40px;
  color: #333;
}
.com-header .userInfo .children a:hover,
.com-header .topbar-info .isActive {
  background-color: var(--color-topic);
  color: #fff;
}
.com-header .topbar-info .quit-login {
  float: right;
  margin-left: 20px;
  padding: 13px 0;
}
.com-header .topbar-info .quit-login > span {
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
.com-header .topbar-info .quit-login:hover {
  opacity: 0.7;
}
</style>
