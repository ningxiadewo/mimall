<template>
  <div id="register">
    <com-header>
      <span class="title-h" slot="title-h">用户注册</span>
    </com-header>
    <div class="container">
      <div class="page-main">
        <div class="title clear-fix">
          <h2 class="fl">注册新用户</h2>
          <span class="fr">
            已有账号去
            <a href="javaScript:;" @click="$router.push('/login')">登录</a>
          </span>
        </div>
        <div class="reg-info">
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
            class="info-form"
            :rules="rules"
          >
            <el-form-item label="用户名" prop="userName">
              <el-input
                v-model="form.userName"
                type="text"
                prefix-icon="el-icon-info"
                placeholder="请输入用户名"
              ></el-input>
              <i class="el-icon-success" :class="{ isRight: isRight.user }"></i>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="form.phone"
                type="text"
                prefix-icon="el-icon-mobile-phone"
                placeholder="请输入手机号"
              ></el-input>
              <i
                class="el-icon-success"
                :class="{ isRight: isRight.phone }"
              ></i>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                type="email"
                prefix-icon="el-icon-message"
                placeholder="请输入邮箱"
              ></el-input>
              <i
                class="el-icon-success"
                :class="{ isRight: isRight.email }"
              ></i>
            </el-form-item>
            <el-form-item label="登录密码" prop="pwd">
              <el-input
                v-model="form.pwd"
                :type="isShow.pwd ? 'text' : 'password'"
                prefix-icon="el-icon-edit"
                auto-complete="new-password"
                placeholder="请输入密码"
                ><i
                  slot="suffix"
                  class="el-input__icon el-icon-view"
                  style="cursor: pointer"
                  @click="isShow.pwd = !isShow.pwd"
                ></i>
              </el-input>
              <i class="el-icon-success" :class="{ isRight: isRight.pwd }"></i>
            </el-form-item>
            <el-form-item label="确认密码" prop="compwd">
              <el-input
                v-model="form.compwd"
                :type="isShow.compwd ? 'text' : 'password'"
                prefix-icon="el-icon-edit"
                placeholder="请确认密码"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-view"
                  style="cursor: pointer"
                  @click="isShow.compwd = !isShow.compwd"
                ></i>
              </el-input>
              <i
                class="el-icon-success"
                :class="{ isRight: isRight.compwd }"
              ></i>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('form')"
                :class="{ noDrop: registerLoad }"
              >
                <span style="position: relative"
                  >立即注册<loading v-if="registerLoad"
                /></span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <modal
      :showModal="showModal"
      confirmText="去登录"
      :buttonNum="1"
      @onConfirm="toLoginModal"
    >
      <div slot="body" class="modal-body-text">
        注册成功，
        <span class="body-time">{{ time }}</span>
        后自动跳转到登录页面,或点击底部登录按钮跳转到登录页面
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from "components/modal/Modal";

import ComHeader from "components/comheader/ComHeader";
import Loading from "components/loading/Loading";

import { registerForm, findUser } from "network/register";

export default {
  name: "register",
  components: {
    ComHeader,
    Modal,
    Loading,
  },
  data() {
    return {
      form: {
        sex: "男",
        userName: "",
        pwd: "",
        compwd: "",
        email: "",
        phone: "",
      },
      showModal: false,
      // 匹配规则
      rules: {
        userName: [
          { validator: this.checkUserName, required: true, trigger: "blur" },
        ],
        phone: [
          { validator: this.checkPhone, required: true, trigger: "blur" },
        ],
        email: [
          { validator: this.checkEmail, required: true, trigger: "blur" },
        ],
        pwd: [
          {
            validator: this.checkPwd,
            required: true,
            trigger: "blur",
          },
        ],
        compwd: [
          { validator: this.checkCompwd, required: true, trigger: "blur" },
        ],
        // qq: [{ validator: this.checkQq, required: true, trigger: "blur" }],
      },
      isRight: {
        user: false,
        email: false,
        phone: false,
        pwd: false,
        compwd: false,
      },
      isShow: {
        pwd: false,
        compwd: false,
      },
      time: 5,
      timer: null,
      registerLoad: false,
    };
  },
  methods: {
    /**
     * 检查字段
     */
    checkUserName(rule, value, callback) {
      const str = value.trim();
      const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/; // 中文编码
      if (str === "") {
        this.isRight.user = false;
        callback(new Error("请输入您的昵称"));
      } else {
        if (str.length >= 2 && str.length <= 10 && reg.test(str)) {
          // 后台查询又无该用户
          findUser(str).then((res) => {
            if (res.data.length > 0) {
              this.isRight.user = false;
              callback(new Error("该用户名已经被注册过了"));
            } else {
              this.isRight.user = true;
              callback();
            }
          });
        } else {
          this.isRight.user = false;
          callback(
            new Error("请输入2到10个字符，可包含中文、英文、数字和下划线")
          );
        }
      }
    },
    checkPhone(rule, value, callback) {
      const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (value === "") {
        this.isRight.phone = false;
        callback(new Error("请输入您的手机号码"));
      } else if (reg.test(value) == true) {
        this.isRight.phone = true;
        callback();
      } else {
        this.isRight.phone = false;
        callback(new Error("您输入的手机号格式有误"));
      }
    },
    checkEmail(rule, value, callback) {
      const reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
      if (value === "") {
        this.isRight.email = false;
        callback(new Error("请输入您的邮箱地址"));
      } else if (reg.test(value) == true) {
        this.isRight.email = true;
        callback();
      } else {
        this.isRight.email = false;
        callback(new Error("您输入的邮箱地址格式有误"));
      }
    },
    checkPwd(rule, value, callback) {
      const reg = /^[a-z0-9_-]{3,18}$/;
      if (value === "") {
        this.isRight.pwd = false;
        callback(new Error("请输入密码"));
      } else if (reg.test(value) == true) {
        if (this.form.compwd !== "") {
          this.$refs.form.validateField("compwd");
        }
        this.isRight.pwd = true;
        callback();
      } else {
        this.isRight.pwd = false;
        callback(new Error("密码包含3-18个字符 可包含数字、字母、下划线"));
      }
    },
    checkCompwd(rule, value, callback) {
      if (value === "") {
        this.isRight.compwd = false;
        callback(new Error("请输入确认密码"));
      } else if (value === this.form.pwd) {
        this.isRight.compwd = true;
        callback();
      } else {
        this.isRight.compwd = false;
        callback(new Error("两次输入的密码不一致"));
      }
    },
    /**
     * 提交表单
     */
    submitForm(form) {
      // 如果正在提交，则不响应按钮点击
      if (this.registerLoad) {
        return;
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.registerLoad = true;
          registerForm(
            this.form.userName,
            this.form.pwd,
            this.form.email,
            this.form.sex,
            this.form.phone
          )
            .then((res) => {
              if (res.data.affectedRows === 1) {
                this.registerLoad = false;
                this.showModal = true;
                this.timer = setInterval(() => {
                  this.time--;
                  if (this.time === 0) {
                    clearInterval(this.timer);
                    this.$router.push("/login");
                  }
                }, 1000);
              } else {
                this.registerLoad = false;
                this.$toach.show("请求失败");
              }
            })
            .catch((err) => {
              this.registerLoad = false;
              this.$toach.show("当前网络较差，请刷新网络");
              console.log(err);
            });
        } else {
          this.$toach.show("您的表单输入有误喔");
          return false;
        }
      });
    },
    /**
     * 修改成功后跳转到登录页面
     */
    toLoginModal() {
      // 清除定时器
      clearInterval(this.timer);
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#register > .container {
  margin-top: 30px;
}
#register .page-main {
  border: 1px solid rgb(223, 223, 223);
}
#register .page-main .title {
  background-color: #ececec;
  padding: 0 15px;
  line-height: 44px;
}
#register .title > span {
  color: #333;
  font-size: 14px;
}
#register .title > span > a {
  color: var(--color-topic);
}
#register .reg-info {
  padding: 50px 0;
}
#register .reg-info .info-form {
  margin-left: 35%;
}
#register .el-input {
  width: 35%;
}
#register .el-form-item__error {
  top: 50%;
  left: 36%;
  transform: translate(0, -50%);
}
#register .el-icon-success {
  display: none;
}
#register .page-main .isRight {
  display: inline-block;
  margin-left: 5px;
  font-size: 20px;
  color: #26ff00;
}
/* #register .reg-info .info-item input {
  width: 220px;
} */
/* height: 35px;
  border: 1px solid #999;
  font-size: 14px;
  padding-left: 5px;
  color: #666;
  margin-left: 10px;
} */
#register .el-button--primary {
  width: 35%;
}
#register .el-radio {
  margin-left: 60px;
  margin-right: 0;
}
#register .el-radio__input.is-checked .el-radio__inner {
  border-color: var(--color-topic);
  background: var(--color-topic);
}
#register .el-radio__input.is-checked + .el-radio__label {
  color: var(--color-topic);
}
#register .el-button--primary {
  border-color: var(--color-topic);
  background: var(--color-topic);
}
#register .body-time {
  color: var(--color-topic);
}
</style>
