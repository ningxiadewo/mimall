<template>
  <div class="nav-header">
    <nav-topbar @toMyOrder="_toMyOrder" @toMyProfile="_toMyProfile" />
    <div class="wrapper">
      <nav-site
        @toMyOrder="_toMyOrder"
        @searchGoods="_searchGoods"
        @toMyProfile="_toMyProfile"
        @toMyCollect="_toMyCollect"
      />
    </div>
    <nav-site
      :class="{ isFixed: this.isShowFixed }"
      class="nav-fix"
      :fixed="true"
      @searchGoods="_searchGoods"
    ></nav-site>
  </div>
</template>

<script>
import NavTopbar from "./childComps/NavTopbar";
import NavSite from "./childComps/NavSite";

import { debounce } from "utils/debounce";
export default {
  name: "nav-header",
  components: {
    NavTopbar,
    NavSite,
  },
  data() {
    return {
      isShowFixed: false,
      top: 0,
    };
  },
  methods: {
    /**
     * 距离顶部400px显示搜索框
     */
    initHeight() {
      let scroll =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scroll > 400) {
        this.isShowFixed = true;
      } else {
        this.isShowFixed = false;
      }
    },
    /**
     * 去我的订单页面
     */
    _toMyOrder() {
      // 判断是否在profile页面
      if (this.$route.path.indexOf("profile") !== -1) {
        this.$emit("myOrder");
      } else {
        this.$router.push("/profile?id=0", () => {});
      }
    },
    /**
     * 去个人中心
     */
    _toMyProfile() {
      // 判断是否在profile页面
      if (this.$route.path.indexOf("profile") !== -1) {
        this.$emit("myProfile");
      } else {
        this.$router.push("/profile?id=3", () => {});
      }
    },
    /**
     * 去我的收藏
     */
    _toMyCollect() {
      // 判断是否在profile页面
      if (this.$route.path.indexOf("profile") !== -1) {
        this.$emit("myCollect");
      } else {
        this.$router.push("/profile?id=2", () => {});
      }
    },
    /**
     * 搜索产品
     */
    _searchGoods(text) {
      // 查看内容是否为空
      if (text.trim() === "") {
        this.$toach.show("您输入的内容为空");
      } else {
        this.$router.push(`/search/${text}`, () => {});
      }
      // }
    },
  },
  mounted() {
    if (this.$route.path === "/index") {
      window.addEventListener("scroll", debounce(this.initHeight, 30));
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.initHeight);
  },
};
</script>
<style>
.nav-header > .wrapper {
  padding: 15px 0;
  z-index: 14;
  background-color: #fff;
}
.nav-header .nav-fix {
  width: 100%;
  height: 0;
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  transition: height 0.3s linear;
  overflow: hidden;
}
.nav-header > .isFixed {
  height: 70px;
}
</style>
