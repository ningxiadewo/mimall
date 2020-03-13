<template>
  <div class="nav-site">
    <div class="container">
      <div class="site-logo"></div>
      <div class="site-menu">
        <ul>
          <li class="site-menu-item">
            小米手机
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[0]"
            ></product-list>
          </li>
          <li class="site-menu-item">
            Redmi红米
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[1]"
            ></product-list>
          </li>
          <li class="site-menu-item">
            电视
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[2]"
            ></product-list>
          </li>
          <li class="site-menu-item">
            <a>笔记本</a>
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[3]"
            ></product-list>
          </li>
          <li class="site-menu-item">
            <a>家电</a>
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[4]"
            ></product-list>
          </li>
          <li class="site-menu-item">
            <a>路由器</a>
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[5]"
            ></product-list>
          </li>
          <li class="site-menu-item">
            <a>智能硬件</a>
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[6]"
            ></product-list>
          </li>
          <li class="site-menu-item">
            <a>服务</a>
            <product-list
              class="item-children"
              :HeaderProductList="HeaderProductList[7]"
            ></product-list>
          </li>
        </ul>
      </div>
      <div class="site-search">
        <div class="wraper">
          <input type="text" name="keywokd" class="search-text" />
          <input type="sumbit" class="search-btn" />
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from "./ProductList";
export default {
  name: "nav-site",
  components: {
    ProductList
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

<style>
.nav-site {
  height: 100px;
  line-height: 100px;
}
.nav-site .container {
  position: relative;
  height: 100px;
}
.nav-site .site-logo {
  position: absolute;
  left: 0;
  top: 50%;
  width: 55px;
  height: 55px;
  background: url("/imgs/logo-mi.png") no-repeat;
  background-size: contain;
  transform: translate(0, -50%);
}
.nav-site .site-menu {
  margin-left: 200px;
}
.nav-site .site-menu .site-menu-item {
  float: left;
  margin-right: 18px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
}
.nav-site .site-menu .site-menu-item:hover {
  color: #ff6700;
}
.nav-site .site-menu .site-menu-item:hover .item-children {
  height: 220px;
  opacity: 1;
}
.site-search .wraper .search-text {
  position: absolute;
  top: 50%;
  right: 51px;
  width: 223px;
  height: 50px;
  padding: 0 10px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  line-height: 48px;
  outline: 0;
  transform: translate(0, -50%);
}
.site-search .wraper .search-btn {
  position: absolute;
  right: 0;
  top: 50%;
  width: 52px;
  height: 50px;
  border: 1px solid #e0e0e0;
  line-height: 24px;
  background-color: #fff;
  color: #616161;
  outline: 0;
  transform: translate(0, -50%);
  cursor: pointer;
}
.site-search .wraper .search-btn:hover {
  background: #ff6700;
}
.site-search .wraper span {
  position: absolute;
  right: 19px;
  top: 50%;
  width: 16px;
  height: 16px;
  background: url("/imgs/icon-search.png") no-repeat center;
  background-size: contain;
  transform: translate(0, -50%);
}
</style>
