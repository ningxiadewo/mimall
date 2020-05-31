<template>
  <div id="profile">
    <nav-header
      @myOrder="tabClick(0)"
      @myCollect="tabClick(2)"
      @myProfile="tabClick(3)"
    ></nav-header>
    <div class="page-main">
      <div class="container clear-fix">
        <!-- 左边菜单栏 -->
        <div class="nav-menu fl">
          <div
            class="menu-item"
            v-for="(item, index) in menu"
            :key="index"
            @click="tabClick(index)"
            :class="{ isTabActive: currentIndex === index }"
          >
            {{ item }}
          </div>
        </div>
        <!-- 右边内容 -->
        <div class="content fr">
          <!-- 我的订单 -->
          <div class="my-order" v-show="currentIndex === 0">
            <h1 class="title">我的订单</h1>
            <div class="order-tab">全部有效订单</div>
            <table class="order-info" v-if="orderInfo.length > 0">
              <thead>
                <tr>
                  <th class="detail">订单详情</th>
                  <th>数量</th>
                  <th>金额</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody
                class="tbody-item"
                v-for="(item, index) in orderInfo"
                :key="index"
              >
                <tr class="empty-row">
                  <td></td>
                </tr>
                <tr class="split">
                  <td>
                    <span>{{ item[0].paytime | filtertime }}</span>
                    <span class="split-name">
                      收货人：{{ item[0].addressee }}
                      <div class="order-address">
                        <p class="name">{{ item[0].addressee }}</p>
                        <p class="detail">
                          {{ item[0].address_area }}{{ item[0].address_name }}
                        </p>
                        <p class="phone">{{ item[0].addressee_mobile }}</p>
                        <div class="arrow-left"></div>
                      </div>
                    </span>
                  </td>
                  <td>&nbsp;</td>
                  <td class="all-price">
                    订单总金额：
                    <span> ￥{{ allPrice(index) | price }}</span>
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <tr class="item" v-for="(sub, num) in item" :key="num">
                  <td>
                    <img :src="sub.imgurl" alt="" />
                    <span>{{ sub.sku_name }}</span>
                  </td>
                  <td>x{{ sub.product_num }}</td>
                  <td>{{ (sub.product_num * sub.price) | price }}元</td>
                  <td @click="delOrder(sub)">删除</td>
                </tr>
              </tbody>
            </table>
            <p class="empty" v-else>当前没有交易订单</p>
          </div>
          <!-- 地址管理 -->
          <Address v-show="currentIndex === 1"></Address>
          <!-- 收藏 -->
          <div class="collect" v-show="currentIndex === 2">
            <h3 class="title">我的收藏</h3>
            <ul class="collect-goods clear-fix" v-if="collectGoods.length > 0">
              <li
                class="collect-goods-item fl"
                v-for="(item, index) in collectGoods"
                :key="index"
              >
                <a
                  href="javaScript:;"
                  @click="$router.push(`/product/${item.spu_id}`)"
                >
                  <img :src="item.imgurl" alt="" />
                  <span class="info">
                    <span class="name">{{ item.goods_name }}</span>
                    <span class="price">￥{{ item.price }}</span>
                    <span
                      class="icon-collect"
                      @click.stop="closeCollect(item.spu_id)"
                      ></span
                    >
                  </span>
                </a>
              </li>
            </ul>
            <p class="empty" v-else>当前没有收藏的商品</p>
          </div>
          <!-- 个人资料 -->
          <div class="one-info" v-show="currentIndex === 3">
            <h3 class="title">我的资料</h3>
            <h4 class="settings-title">基本资料</h4>
            <div class="show-info">
              <dl>
                <dt>
                  <span class="left">用户名：</span>
                  <span class="right">{{ userInfo.user_name }}</span>
                </dt>
                <dt>
                  <span class="left">性别：</span>
                  <span class="right">{{ userInfo.user_sex }}</span>
                </dt>
                <dt>
                  <span class="left">邮箱：</span>
                  <span class="right">{{ userInfo.user_email }}</span>
                </dt>
                <dt>
                  <span class="left">手机号：</span>
                  <span class="right">{{ userInfo.user_tel }}</span>
                </dt>
              </dl>
            </div>
          </div>
          <!-- 修改密码 -->
          <div class="change-pwd" v-show="currentIndex === 4">
            <h3 class="title">修改密码</h3>
            <div class="wrapper">
              <el-form
                ref="form"
                :model="form"
                label-width="80px"
                class="info-form"
                :rules="rules"
              >
                <el-form-item label="旧密码" prop="pwd">
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
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                  <el-input
                    v-model="form.newPwd"
                    :type="isShow.newPwd ? 'text' : 'password'"
                    prefix-icon="el-icon-edit"
                    placeholder="请输入新密码"
                  >
                    <i
                      slot="suffix"
                      class="el-input__icon el-icon-view"
                      style="cursor: pointer"
                      @click="isShow.newPwd = !isShow.newPwd"
                    ></i>
                  </el-input>
                  <i
                    class="el-icon-success"
                    :class="{ isRight: isRight.newPwd }"
                  ></i>
                </el-form-item>
                <el-form-item
                  label="确认新密码"
                  prop="comNewPwd"
                  class="com-newPwd"
                >
                  <el-input
                    v-model="form.comNewPwd"
                    :type="isShow.comNewPwd ? 'text' : 'password'"
                    prefix-icon="el-icon-edit"
                    placeholder="请确认新密码"
                  >
                    <i
                      slot="suffix"
                      class="el-input__icon el-icon-view"
                      style="cursor: pointer"
                      @click="isShow.comNewPwd = !isShow.comNewPwd"
                    ></i>
                  </el-input>
                  <i
                    class="el-icon-success"
                    :class="{ isRight: isRight.comNewPwd }"
                  ></i>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitForm('form')"
                    style="width: 100%"
                  >
                    <span style="position: relative"
                      >立即修改<loading v-if="changeLoad"/></span
                  ></el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal
      :showModal="showDelModal"
      @onConfirm="delModalOrder(deteleGoods)"
      @onClose="showDelModal = false"
    >
      <div class="modal-body-text" slot="body">确定要删除本条订单记录吗</div>
    </modal>
    <modal
      :showModal="showChangePwdModal"
      confirmText="去登录"
      :buttonNum="1"
      @onConfirm="toLoginModal"
    >
      <div slot="body" class="modal-body-text">
        修改密码成功，
        <span class="body-time">{{ time }}</span
        >秒后自动跳转到登录页面，或点击下面去登录按钮跳转到登录页面
      </div>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

import NavHeader from "components/navheader/NavHeader";
import NavFooter from "components/NavFooter/NavFooter";
import Address from "components/address/Address";
import Modal from "components/modal/Modal";
import Loading from "components/loading/Loading";

import { showOrder, deleteOrder } from "network/order";
import { showCollection, deleteCollectionGood } from "network/collect";
import { changePassword } from "network/password";

export default {
  name: "profile",
  components: {
    NavHeader,
    NavFooter,
    Address,
    Modal,
    Loading,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  filters: {
    price(value) {
      return typeof value === "number" ? value.toFixed(2) : value;
    },
    filtertime(value) {
      console.log(value);

      return value.substr(0, 10) + " " + value.substr(11, 8);
    },
  },
  created() {
    const index = parseInt(this.$route.query.id);
    // 请求数据
    if (index !== null) {
      this.currentIndex = index;
      this.requestData(index);
    } else {
      this.currentIndex = 0;
      this.requestData(0);
    }
  },
  data() {
    return {
      menu: ["我的订单", "地址管理", "收藏夹", "个人资料", "账号管理"],
      orderInfo: [], // 订单信息
      currentIndex: -1, // 当前左边导航按钮的索引
      showDelModal: false, // 删除的模态框
      deteleGoods: {}, // 删除的订单中的商品信息
      collectGoods: [], // 收藏的商品
      form: {
        // 修改密码的表单信息
        pwd: "",
        newPwd: "",
        comNewPwd: "",
      },
      isShow: {
        // 显示密码
        pwd: false,
        newPwd: false,
        comNewPwd: false,
      },
      isRight: {
        // 正确输入验证规则
        newPwd: false,
        comNewPwd: false,
      },
      rules: {
        // 定义修改密码部分规则
        pwd: [{ validator: this.checkoldPwd, required: true, trigger: "blur" }],
        newPwd: [
          { validator: this.checkNewPwd, required: true, trigger: "blur" },
        ],
        comNewPwd: [
          { validator: this.checkComNewPwd, required: true, trigger: "blur" },
        ],
      },
      time: 5, // 跳转到登录的时间
      timer: null, // 定时器
      showChangePwdModal: false,
      changeLoad: false,
    };
  },
  methods: {
    // 切换左边菜单
    tabClick(index) {
      // 若点击的是已经显示的模块，则不作处理
      if (this.currentIndex === index) return;
      this.currentIndex = index;
      // 改变查询的值，做刷新处理
      this.$router.push({
        path: "/profile",
        query: {
          id: index,
        },
      });
      // this.$router.go(0);
      // 发送数据请求
      // this.requestData(index);
    },
    // 网络请求
    requestData(index) {
      this.currentIndex = index;
      switch (index) {
        // 我的订单
        case 0:
          showOrder(this.userInfo.user_id)
            .then((res) => {
              this.orderInfo = res.data;
              // 显示已付款的订单
              this.orderInfo = this.orderInfo.filter(
                (item) => item[0].status === 1
              );
            })
            .catch((err) => {
              console.log(err);

              this.$toach.show("当前网络较差", "请刷新页面");
            });
          break;
        // 地址管理
        case 1:
          break;
        // 收藏夹
        case 2:
          // 获取收藏的商品
          showCollection(this.userInfo.user_id)
            .then((res) => {
              // console.log(res);
              console.log(res);
              this.collectGoods = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
          break;
        // 个人资料
        case 3:
          break;
        // 修改密码
        case 4:
          break;
      }
    },
    // 删除订单
    delOrder(goods) {
      this.showDelModal = true;
      this.deteleGoods = goods;
    },
    delModalOrder(goods) {
      deleteOrder(goods.detail_id)
        .then((res) => {
          this.requestData(0);
          this.showDelModal = false;
          this.$toach.show("删除成功");
        })
        .catch((err) => {
          console.log(err);
          this.$toach.show("删除失败", "当前网络较差");
        });
    },
    // 计算总价格
    allPrice(index) {
      // 计算一次订单商品的总价格
      const sum = this.orderInfo[index].reduce((item, data) => {
        return item + data.product_num * data.price;
      }, 0);
      return sum;
    },
    /**
     * 验证规则
     */
    checkoldPwd(rule, value, callback) {
      const reg = /^[a-z0-9_-]{3,18}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (reg.test(value) == true) {
        callback();
      } else {
        this.isRight.newPwd = false;
        callback(new Error("3-18个字符，可包含数字、字母、下划线"));
      }
    },
    checkNewPwd(rule, value, callback) {
      const reg = /^[a-z0-9_-]{3,18}$/;
      if (value === "") {
        this.isRight.newPwd = false;
        callback(new Error("请输入密码"));
      } else if (reg.test(value) == true) {
        // 验证与确认密码是否一致
        if (this.form.newPwd !== "") {
          this.$refs.form.validateField("comNewPwd");
        }
        this.isRight.newPwd = true;
        callback();
      } else {
        this.isRight.newPwd = false;
        callback(new Error("3-18个字符，可包含数字、字母、下划线"));
      }
    },
    checkComNewPwd(rule, value, callback) {
      if (value === "") {
        this.isRight.comNewPwd = false;
        callback(new Error("请输入确认密码"));
      } else if (value === this.form.newPwd) {
        this.isRight.comNewPwd = true;
        callback();
      } else {
        this.isRight.comNewPwd = false;
        callback(new Error("两次输入的密码不一致"));
      }
    },
    /**
     * 修改密码提交表单
     */
    submitForm(form) {
      // 如果正在提交，则不响应按钮点击
      if (this.changeLoad) {
        return;
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.changeLoad = true;
          changePassword(
            this.userInfo.user_name,
            this.form.pwd,
            this.form.newPwd
          )
            .then((res) => {
              // 密码错误
              if (res.data.code === -1) {
                this.changeLoad = false;
                this.$toach.show("您输入的旧密码不正确", 4000);
              } else if (res.data.affectedRows === 1) {
                // 修改密码成功
                // 退出登录
                this.$store
                  .dispatch("logOut")
                  .then(() => {
                    this.changeLoad = false;
                    // 5秒后跳转到登录页面
                    this.showChangePwdModal = true;
                    this.timer = setInterval(() => {
                      this.time--;
                      if (this.time === 0) {
                        clearInterval(this.timer);
                        this.$router.replace("/login");
                      }
                    }, 1000);
                  })
                  .catch((err) => {
                    this.changeLoad = false;
                    console.log(err);
                    this.$toach.show("修改密码成功，请退出登录");
                  });
              } else {
                this.changeLoad = false;
                this.$toach.show("没有查询到该用户");
              }
            })
            .catch((err) => {
              this.changeLoad = false;
              console.log(err);
              this.$toach.show("当前网络较差，修改密码失败");
            });
        } else {
          this.$toach.show("您输入的表单有误");
        }
      });
    },
    // 修改密码点击去登录
    toLoginModal() {
      // 先清除定时器
      clearInterval(this.timer);
      // 跳转到登录页面
      this.$router.replace("/login");
    },
    /**
     * 取消收藏
     */
    closeCollect(spu_id) {
      deleteCollectionGood(this.userInfo.user_id, spu_id)
        .then((res) => {
          console.log(res);
          // 更新收藏的商品
          showCollection(this.userInfo.user_id)
            .then((res) => {
              // console.log(res);
              console.log(res);
              this.collectGoods = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    // 监听点击返回按钮时，如果是在搜索页，就发送请求，请求数据
    $route(to, form) {
      if (
        form.path.indexOf("profile") !== -1 &&
        this.$route.path.indexOf("profile") !== -1
      ) {
        this.requestData(parseInt(this.$route.query.id));
      }
    },
  },
};
</script>
<style>
#profile > .page-main {
  background-color: #f5f5f5;
  overflow: hidden;
  padding: 40px 0 150px 0;
}
#profile .nav-menu {
  width: 234px;
  padding: 36px 48px;
  background-color: #fff;
  box-sizing: border-box;
}
#profile .menu-item {
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  cursor: pointer;
}
#profile .menu-item:hover {
  color: var(--color-topic);
}
#profile .content {
  width: 978px;
  padding: 36px 48px;
  background-color: #fff;
  box-sizing: border-box;
}
#profile .content .title {
  color: #757575;
  font-size: 30px;
  line-height: 58px;
  margin: 0;
  font-weight: normal;
}
#profile .my-order {
  width: 100%;
  /* padding: 0 48px; */
}
#profile .my-order .order-tab {
  font-size: 16px;
  line-height: 56px;
  color: var(--color-topic);
}
#profile table {
  border-collapse: collapse;
  width: 100%;
}
#profile table thead {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #e5e5e5;
  font-size: 14px;
  background-color: #f5f5f5;
  color: #aaa;
  font-weight: normal;
}
#profile table thead th {
  font-weight: normal;
}
#profile table thead .detail {
  width: 500px;
}
#profile table .tbody-item {
  line-height: 40px;
  margin-top: 20px;
  text-align: center;
}
#profile table .tbody-item .empty-row {
  height: 20px;
}
#profile table .tbody-item .split {
  border: 1px solid #e5e5e5;
  background-color: #f5f5f5;
}
#profile table .split .split-name {
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-left: 30px;
}
#profile table .split-name .order-address {
  display: none;
}
#profile table .split .split-name:hover {
  color: var(--color-topic);
}
#profile table .split-name:hover .order-address {
  display: block;
  position: absolute;
  right: -276px;
  top: 50%;
  width: 200px;
  background-color: #fff;
  text-align: start;
  transform: translate(0, -50%);
  width: 220px;
  padding: 15px 20px;
  order: 1px solid #ddd;
  box-shadow: 0 0 2px 2px #eee;
  border-radius: 1px;
  color: #333;
}
#profile table .split .all-price > span {
  font-weight: 700;
}
#profile table .order-address p {
  line-height: 20px;
}
#profile table .order-address .arrow-left {
  position: absolute;
  width: 0;
  left: -20px;
  top: 50%;
  height: 0;
  border-top: 14px solid transparent;
  border-right: 10px solid #fff;
  border-bottom: 14px solid transparent;
  border-left: 10px solid transparent;
  transform: translate(0, -50%);
}
#profile table .tbody-item .item {
  background-color: #fff;
}
#profile table .tbody-item .item img {
  width: 60px;
  height: 60px;
  vertical-align: middle;
}
#profile table .tbody-item .item td:first-child {
  padding: 14px;
}
#profile table .tbody-item .item td:last-child {
  cursor: pointer;
}
#profile table .tbody-item .item td:last-child:hover {
  color: var(--color-topic);
}
#profile table .tbody-item .item td {
  border: 1px solid #f5f5f5;
}
#profile table .tbody-item .item td:first-child {
  text-align: start;
}
#profile table .tbody-item .item td:first-child > span {
  display: inline-block;
  width: 300px;
  line-height: 20px;
  margin-left: 10px;
}
#profile .isTabActive {
  color: var(--color-topic);
}
#profile .collect .collect-goods {
  margin-top: 30px;
}
#profile .collect .collect-goods-item {
  width: 205px;
  height: 330px;
  margin: 0 20px 20px 0;
}
#profile .collect .collect-goods-item:nth-child(4n) {
  margin-right: 0;
}
#profile .collect .collect-goods-item a {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

#profile .collect .collect-goods-item img {
  position: absolute;
  left: 50%;
  top: 0;
  height: 260px;
  transform: translate(-50%, 0);
}
#profile .collect .collect-goods-item .info {
  position: absolute;
  bottom: 0;
  width: 100%;
}
#profile .collect .collect-goods-item .name {
  display: block;
  width: 100%;
  line-height: 44px;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#profile .collect .collect-goods-item .price {
  display: block;
  line-height: 26px;
  color: #333;
  font-size: 16px;
  font-weight: 700;
}
#profile .collect .collect-goods-item .icon-collect {
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-family: "icomoon";
  font-size: 16px;
  color: var(--color-topic);
  transition: all 0.3s;
}
#profile .collect .collect-goods-item .icon-collect:hover {
  opacity: 0.3;
}
#profile .one-info .settings-title {
  line-height: 30px;
  color: var(--color-topic);
  padding-left: 10px;
  background-color: #f9f9f9;
  font-size: 14px;
  margin: 30px 0;
}
#profile .one-info span {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  color: #666;
  font-size: 14px;
}
#profile .one-info .left {
  width: 105px;
  text-align: end;
}
#profile .change-pwd .wrapper {
  margin-top: 30px;
  position: relative;
  height: 300px;
}
#profile .change-pwd .wrapper .info-form {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
}
#profile .el-icon-success {
  display: none;
}
#profile .isRight {
  display: block;
  position: absolute;
  right: -28px;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 20px;
  color: #26ff00;
}
#profile .com-newPwd .el-form-item__label {
  width: 100px !important;
  margin-left: -20px;
}
#profile .el-button--primary {
  background: var(--color-topic);
  border-color: var(--color-topic);
}
#profile .el-button--primary:hover {
  opacity: 0.7;
}
#profile .body-time {
  color: var(--color-topic);
}
#profile .empty {
  line-height: 80px;
  font-size: 18px;
  color: #b0b0b0;
  text-align: center;
}
</style>
