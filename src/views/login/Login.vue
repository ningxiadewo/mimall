<template>
  <div id="login">
    <div class="container">
      <!-- 头部 -->
      <div class="login-title">
        <div class="login-logo"></div>
        <div class="title-text">
          <h3>环保商城</h3>
          <p>让每个人都可以享受环保的健康</p>
        </div>
      </div>
    </div>
    <!-- 登录填充 -->
    <div class="login-banner">
      <div class="login-info">
        <div class="wrapper">
          <!-- 切换按钮 -->
          <div class="wrapper-tab">
            <div class="tab-left">
              <a href="javascript:;" :class="{ isActive: isShow }">账号登录</a>
            </div>
            <span></span>
            <div class="tab-right">
              <a href="javascript:;" :class="{ isActive: !isShow }">扫码登录</a>
            </div>
          </div>
          <!-- 输入用户信息 -->
          <div class="wrapper-info">
            <div class="info-item info-userName">
              <input
                type="text"
                name="userName"
                autofocus="autofocus"
                placeholder="请输入账号"
                v-model="userName"
                :style="userNameStyle"
                @focus="userNameBtn"
              />
            </div>
            <div class="info-item info-password">
              <input
                type="password"
                name="password"
                placeholder="请输入密码"
                v-model="password"
                :style="passwordStyle"
                @focus="passwordBtn"
              />
            </div>
            <!-- 登录提示 -->
            <div class="login-tip" :style="tipStyle">
              <span class="tip-text">请输入账号</span>
            </div>

            <!-- 登录 -->
            <div class="info-item info-login">
              <input type="button" name="submit" value="登录" @click="login" />
            </div>

            <div class="info-other">
              <a href="javascript;;" class="register">立即注册</a>
              <span></span>
              <a href="javascript:;" class="forgetPassword">忘记密码</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-size-info></nav-size-info>
  </div>
</template>

<script>
import NavSizeInfo from "components/NavFooter/NavSizeInfo";

import login from "network/loginRequest";

export default {
  name: "login",
  components: {
    NavSizeInfo
  },
  data() {
    return {
      isShow: true,
      userName: "",
      password: "",
      tipStyle: {},
      userNameStyle: {},
      passwordStyle: {}
    };
  },
  methods: {
    /**
     * 账号框点击
     */
    userNameBtn() {
      this.tipStyle = {
        display: "none"
      };
      this.userNameStyle = {
        borderColor: "#ccc"
      };
    },
    /**
     * 密码框点击
     */
    passwordBtn() {
      this.tipStyle = {
        display: "none"
      };
      this.passwordStyle = {
        borderColor: "#ccc"
      };
    },
    /**
     * 登录
     */
    login() {
      if (this.userName === "") {
        this.tipStyle = {
          display: "block"
        };
        this.userNameStyle = {
          borderColor: "#ff6700"
        };
        document.querySelector(".tip-text").innerHTML = "请输入账号";
      } else if (this.password === "") {
        this.tipStyle = {
          display: "block"
        };
        this.passwordStyle = {
          borderColor: "#ff6700"
        };
        document.querySelector(".tip-text").innerHTML = "请输入密码";
      } else {
        this.$store
          .dispatch("toLogin", {
            // dispatch toLogin action
            loginUser: this.userName,
            loginPassword: this.password
          })
          .then(() => {
            // 跳转到指定的路由
            this.$router.replace({
              path: "index"
            });
          })
          .catch(error => {
            this.tipStyle = {
              display: "block"
            };
            this.userNameStyle = {
              borderColor: "#ff6700"
            };
            document.querySelector(".tip-text").innerHTML =
              "账号或密码错误，请重新输入";
          });
      }
    }
  },
  mounted() {
    document.onkeyup = e => {
      if (e.keyCode == 13) {
        this.login();
      }
    };
  }
};
</script>

<style>
.login-title {
  height: 100px;
  background: url;
  padding: 25px 0;
  box-sizing: border-box;
}
.login-title .login-logo {
  width: 50px;
  height: 50px;
  background: url("/imgs/mi-logo.png") no-repeat;
  background-size: contain;
  background-color: #ff6700;
  float: left;
}
.login-title .title-text {
  margin-left: 20px;
  float: left;
}
.login-title .title-text h3 {
  font-size: 25px;
  font-weight: normal;
}
.login-title .title-text p {
  font-size: 12px;
}
.login-banner {
  width: auto;
  height: 560px;
  background: url("/imgs/login/login-bg.jpg") no-repeat;
  background-position: 100% 0;
  position: relative;
}
.login-banner .wrapper {
  position: absolute;
  right: 100px;
  top: 30px;
  width: 410px;
  height: 400px;
  background-color: #fff;
}
.login-banner .wrapper-tab {
  height: 82px;
  padding: 27px 0 24px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-evenly;
}
.login-banner .wrapper-tab a {
  font-size: 22px;
  color: #666;
}
.login-banner .wrapper-tab span {
  display: inline-block;
  width: 2px;
  height: 29px;
  background-color: #ccc;
}
.login-banner .wrapper-info {
  padding: 0 32px;
}
.login-banner .info-item {
  margin: 20px 0;
}
.login-banner .info-item input {
  width: 346px;
  height: 48px;
  border: 1px solid #ccc;
  padding: 13px 16px;
  box-sizing: border-box;
}
.login-banner .info-userName {
  margin-top: 0;
}
.login-banner .login-tip {
  display: none;
  position: relative;
  padding-left: 20px;
  color: #e4393c;
}
.login-banner .login-tip::before {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  content: "";
  width: 16px;
  height: 16px;
  background: url(/imgs/pwd-icons-new.png) -104px -49px no-repeat;
}
.login-banner .info-login input {
  background-color: #ff6700;
  color: #fff;
  cursor: pointer;
}
.login-banner .wrapper-info .info-other {
  display: flex;
  justify-content: flex-end;
  height: 20px;
}
.login-banner .wrapper-info .info-other a {
  font-size: 14px;
  color: #999;
  margin-left: 15px;
}
.login-banner .wrapper-info .info-other span {
  height: 14px;
  width: 2px;
  background-color: #999;
  margin-left: 15px;
  margin-top: 3px;
}
.login-banner .login-info .wrapper a:hover,
.login-banner .wrapper-tab .isActive {
  color: #ff6700;
}
</style>
