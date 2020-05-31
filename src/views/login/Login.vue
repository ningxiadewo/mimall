<template>
  <div id="login">
    <com-header>
      <span slot="title-h" class="title-h">用户登录</span>
    </com-header>
    <!-- 登录填充 -->
    <div class="login-banner">
      <div class="login-info">
        <div class="wrapper">
          <!-- 切换按钮 -->
          <div class="wrapper-tab">
            账号登录
          </div>
          <!-- 输入用户信息 -->
          <div class="wrapper-info">
            <div class="info-item info-userName">
              <input
                type="text"
                name="userName"
                autofocus="autofocus"
                placeholder="请输入用户名"
                v-model="userName"
                :style="userNameStyle"
                @focus="loginTipStyle('none', 'userNameStyle', '#ccc')"
              />
            </div>
            <div class="info-item info-password">
              <input
                type="password"
                name="password"
                placeholder="请输入密码"
                v-model="password"
                :style="passwordStyle"
                @keyup.13="login"
                @focus="loginTipStyle('none', 'passwordStyle', '#ccc')"
              />
            </div>
            <!-- 登录提示 -->
            <div class="login-tip" :style="tipStyle">
              <span class="tip-text">{{ tipText }}</span>
            </div>

            <!-- 登录 -->
            <div class="info-item info-login">
              <a
                href="javaScript:;"
                @click="login"
                :class="{ noDrop: loginload }"
              >
                <span>登录 <loading v-if="loginload"/></span
              ></a>
            </div>
            <div class="info-other">
              <a href="/register" class="register">没有账号？立即注册</a>
              <!-- <a href="javascript:;" class="forgetPassword">忘记密码</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import ComHeader from "components/comheader/ComHeader";
import NavFooter from "components/NavFooter/NavFooter";
import NavTopbar from "components/navheader/childComps/NavTopbar";
import Loading from "components/loading/Loading";

export default {
  name: "login",
  components: {
    NavFooter,
    Loading,
    NavTopbar,
    ComHeader,
  },
  data() {
    return {
      userName: "",
      password: "",
      tipStyle: {},
      userNameStyle: {},
      passwordStyle: {},
      loginload: false, // 登录中加载动画
      tipText: "请输入用户名",
    };
  },
  methods: {
    /**
     * 登录样式提示
     * dis: tipStyle显示方式
     * Style: 用户名框或者密码框的样式
     * borColor: boder颜色
     */
    loginTipStyle(dis, inputStyle, borColor) {
      this.tipStyle = {
        display: dis,
      };
      this[inputStyle] = {
        borderColor: borColor,
      };
    },
    /**
     * 登录
     */
    login() {
      // 判断是否处于加载中，如果在加载中，则退出
      if (this.Loading) {
        return;
      }
      // 判断用户名是否为空
      if (this.userName === "") {
        this.loginTipStyle("block", "userNameStyle", "var(--color-topic)");
        this.tipText = "请输入用户名";
      } else if (this.password === "") {
        // 判断密码是否为空
        this.loginTipStyle("block", "passwordStyle", "var(--color-topic)");
        this.tipText = "请输入密码";
      } else {
        // 加载登录动画
        this.loginload = true;
        this.$store
          .dispatch("toLogin", {
            // dispatch toLogin action
            loginUser: this.userName,
            loginPassword: this.password,
          })
          .then(() => {
            this.loginload = false;
            // 跳转到指定的路由
            this.$router.replace("/");
            this.$toach.show("登录成功");
          })
          .catch(() => {
            this.loginload = false;
            this.loginTipStyle("block", "userNameStyle", "var(--color-topic)");
            this.tipText = "用户密码或者账号错误";
          });
      }
    },
  },
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
  width: 125px;
  height: 50px;
  background: url("~assets/imgs/logo.png") no-repeat;
  background-size: contain;
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
  background: url("~assets/imgs/login/login-bg.jpg") no-repeat;
  background-position: 100% 0;
  position: relative;
}
.login-banner .wrapper {
  position: absolute;
  right: 100px;
  top: 15%;
  width: 400px;
  height: 340px;
  background-color: #fff;
  opacity: 0.9;
  box-shadow: 5px -5px 30px 0 rgba(81, 79, 79, 0.35),
    -5px 5px 20px 0 rgba(81, 79, 79, 0.05);
  border-radius: 10px;
}
.login-banner .wrapper-tab {
  height: 82px;
  line-height: 82px;
  box-sizing: border-box;
  text-align: center;
  color: #666;
  font-size: 22px;
}
.login-banner .wrapper-info {
  padding: 0 44px;
}
.login-banner .info-item {
  margin: 20px 0;
}
.login-banner .info-item input,
.login-banner .info-item a {
  width: 310px;
  height: 44px;
  border: 1px solid #ccc;
  padding: 0 18px;
  box-sizing: border-box;
  border-radius: 22px;
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
  background: url(~assets/imgs/login/pwd-icons-new.png) -104px -49px no-repeat;
}
.login-banner .info-login > a {
  display: block;
  background-color: var(--color-topic);
  color: #fff;
  transition: all 0.5s;
  text-align: center;
  padding: 0;
  line-height: 44px;
  font-size: 14px;
}
.login-banner .info-login > a > span {
  position: relative;
}
.login-banner .info-login a:hover {
  opacity: 0.7;
}
.login-banner .wrapper-info .info-other {
  height: 20px;
  line-height: 20px;
  text-align: center;
}
/* .login-banner .wrapper-info .info-other a:nth-child(1) {
  border-right: 2px solid #999;
} */
.login-banner .wrapper-info .info-other a {
  font-size: 14px;
  color: #666;
  text-align: center;
}

.login-banner .login-info .info-other a:hover {
  color: var(--color-topic);
}
</style>
