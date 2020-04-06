<template>
  <!-- 头部 -->
  <div class="com-header clear-fix">
    <div class="container">
      <div class="header-logo fl">
        <a href="/index"></a>
      </div>
      <div class="header-title fl">
        <h2 class="fl">
          <slot name="title-h"></slot>
        </h2>
        <p class="fl" slot="title-p">
          <slot name="title-p"></slot>
        </p>
      </div>
      <div class="topbar-info fr" v-if="showTopbar">
        <span class="user">
          <a href="javascript:;" class="user-name">
            {{ $store.state.userInfo.user_name }}
          </a>
          <ul class="user-menu">
            <li><a href="javascript:;">个人中心</a></li>
            <li>
              <a href="javascript:;" @click="logOut">退出登录</a>
            </li>
          </ul>
        </span>
        <a href="javsscript;;" class="my-order">
          我的订单
        </a>
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
      default: true
    }
  },
  methods: {
    /**
     * 退出登录
     */
    logOut() {
      this.$store.dispatch("logOut").then(() => {
        this.$router.replace("/index");
      });
    }
  }
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
  width: 150px;
  height: 48px;
  background: url("~assets/imgs/logo.png") no-repeat;
  transform: translate(0, -50%);
}
/* 头部插入内容 */
.com-header .header-title {
  margin-left: 200px;
}
.com-header .topbar-info {
  margin-top: 30px;
  line-height: 40px;
}
.com-header .topbar-info a {
  color: #757575;
  font-size: 16px;
}
.com-header .topbar-info a:hover {
  color: var(--color-topic);
}
.com-header .topbar-info .user-name::after {
  font-family: "icomoon";
  content: "\ea43";
  margin-left: 5px;
}
.com-header .topbar-info .user {
  position: relative;
  display: inline-block;
  width: 125px;
  text-align: center;
}
.com-header .topbar-info .user-menu {
  position: absolute;
  left: 50%;
  top: 40px;
  transform: translate(-50%, 0);
  width: 100%;
  display: none;
  box-shadow: 0 2px 10px #ccc;
}
.com-header .topbar-info .user:hover .user-menu {
  display: block;
}
.com-header .topbar-info .user li > a {
  display: block;
  line-height: 30px;
  text-align: center;
  background-color: #fff;
}
.com-header .topbar-info .user li > a:hover {
  background-color: var(--color-topic);
  color: #fff;
}
</style>
