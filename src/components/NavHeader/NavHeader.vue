<template>
  <!-- 头部部分 -->
  <div class="header">
    <!-- 顶部导航 -->
    <nav-topbar></nav-topbar>
    <!-- 顶部下面导航 -->
    <nav-site :HeaderProductList="HeaderProductList"></nav-site>
  </div>
</template>

<script>
import NavTopbar from "./childCons/NavTopbar";
import NavSite from "./childCons/NavSite";
export default {
  name: "nav-header",
  components: {
    NavTopbar,
    NavSite
  },
  props: {
    HeaderProductList: {
      type: Array,
      defaule() {
        return [];
      }
    }
  }
};
</script>

<style></style>
