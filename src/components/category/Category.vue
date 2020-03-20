<template>
  <div class="category">
    <!-- 左边菜单 -->
    <div class="nav-menu">
      <ul>
        <li class="nav-menu-item">
          <a href="javascript:;">环保节能商品</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList.energy"
          ></nav-product>
        </li>
        <li class="nav-menu-item">
          <a href="javascript:;">空气净化商品</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList.air"
          ></nav-product>
        </li>
        <li class="nav-menu-item">
          <a href="javascript:;">过滤设备</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList.filter"
          ></nav-product>
        </li>
        <li class="nav-menu-item">
          <a href="javascript:;">环保材料</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList.material"
          ></nav-product>
        </li>
        <li class="nav-menu-item">
          <a href="javascript:;">化学环保商品</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList.chemistry"
          ></nav-product>
        </li>
        <li class="nav-menu-item">
          <a href="javascript:;">节能清洁</a>
          <nav-product
            class="item-children"
            :navProductList="navProductList.clean"
          ></nav-product>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavProduct from "./childComps/NavProduct";
export default {
  name: "category",
  components: {
    NavProduct
  },
  props: {
    navProductList: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style>
/* 菜单栏 */
.category .nav-menu {
  width: 243px;
  height: 460px;
  position: absolute;
  z-index: 9;
  background: rgba(105, 101, 101, 0.6);
  padding: 20px 0;
  box-sizing: border-box;
}
.category .nav-menu .nav-menu-item {
  height: 70px;
  line-height: 70px;
}
.category .nav-menu .nav-menu-item > a:hover {
  background-color: #ff6700;
}
.category .nav-menu .nav-menu-item a {
  position: relative;
  font-size: 14px;
  color: #fff;
  height: 42px;
  line-height: 42px;
  padding-left: 30px;
  box-sizing: border-box;
}
.category .nav-menu .nav-menu-item a::before {
  position: absolute;
  right: 10%;
  top: 50%;
  content: "";
  width: 16px;
  height: 16px;
  background: url("/imgs/icon-arrow.png") no-repeat;
  background-size: contain;
  transform: translate(0, -50%);
}
.category .nav-menu-item a:hover + .item-children,
.category .nav-menu-item .item-children:hover {
  display: block;
}
</style>
