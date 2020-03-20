<template>
  <div class="nav-topbar">
    <div class="container">
      <!-- 左边菜单部分 -->
      <!-- <div class="topbar-menu">
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
      </div> -->
      <!-- 右边用户部分 -->
      <div class="topbar-info">
        <a href="/">返回首页</a>
        <span v-if="Object.keys($store.state.userInfo).length > 0">
          <a href="javaScript:;">个人中心</a>
          <a href="javaScript:;">我的订单</a>
        </span>
        <span v-else>
          <a href="javaScript:;" @click="showModal = true">个人中心</a>
          <a href="javaScript:;" @click="showModal = true">我的订单</a>
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
import Modal from "components/Modal";

export default {
  name: "nav-topbar",
  computed: {
    ...mapState(["userInfo", "loginStatus"])
  },
  components: {
    Modal
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

<style>
.nav-topbar {
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.nav-topbar a:hover {
  color: #fff;
}
.nav-topbar .container {
  position: relative;
}
.nav-topbar .topbar-info {
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  line-height: 40px;
}
.nav-topbar .container .topbar-info a {
  display: inline-block;
  color: #999;
}
.nav-topbar .container .topbar-info a:first-child::after {
  display: inline-block;
  content: "|";
  height: 14px;
  width: 1px;
  margin: 0 14px;
}
.nav-topbar .container .topbar-info a:hover {
  color: #ff6700;
}
</style>
