<template>
  <div class="category" :class="{ hide: isSearchPage }">
    <!-- 左边菜单 -->
    <div
      class="nav-menu"
      v-if="Object.keys(this.navProductList).length > 0"
      :class="{ isSearch: isSearchPage }"
    >
      <ul>
        <li class="nav-menu-item" v-for="(item, index) in navMenu" :key="index">
          <a href="javascript:;" :class="{ showBgc: currentIndex === index }">{{
            item.name
          }}</a>
          <nav-product
            class="item-children"
            :navProductList="item.children"
            @mouseenter.native="currentIndex = index"
            @mouseleave.native="currentIndex = 999"
          ></nav-product>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavProduct from "./childComps/NavProduct";

import { getCategoryData } from "network/category";

export default {
  name: "category",
  components: {
    NavProduct
  },
  data() {
    return {
      isSearchPage: false,
      currentIndex: 99,
      navMenu: [],
      navProductList: {}
    };
  },
  created() {
    this.categoryRequest();
  },
  mounted() {
    // 搜索页显示的分类样式
    if (this.$route.name === "search") {
      this.isSearchPage = true;
    } else {
      this.isSearchPage = false;
    }
  },
  methods: {
    /**
     * 网络请求
     */
    categoryRequest() {
      getCategoryData().then(res => {
        this.navProductList = res.data;
        this.navMenu = [
          {
            name: "环保节能商品",
            children: this.navProductList.energy
          },
          {
            name: "空气净化商品",
            children: this.navProductList.air
          },
          {
            name: "过滤设备",
            children: this.navProductList.filter
          },
          {
            name: "环保材料",
            children: this.navProductList.meterial
          },
          { name: "化学环保商品", children: this.navProductList.chemistry },
          {
            name: "节能清洁",
            children: this.navProductList.clean
          }
        ];
        console.log(this.navProductList);
      });
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
  background-color: rgba(105, 101, 101, 0.6);
  padding: 20px 0;
  box-sizing: border-box;
}
.category .nav-menu .nav-menu-item {
  height: 70px;
  line-height: 70px;
}
.category .nav-menu .nav-menu-item > a:hover {
  background-color: var(--color-topic);
}
.category .nav-menu .nav-menu-item a {
  position: relative;
  display: inline-block;
  width: 100%;
  font-size: 14px;
  color: #fff;
  height: 42px;
  line-height: 42px;
  padding-left: 30px;
  box-sizing: border-box;
  transition: all 0.5s;
}
.category .nav-menu .nav-menu-item > .showBgc {
  background-color: var(--color-topic);
}
.category .nav-menu .nav-menu-item a::before {
  position: absolute;
  right: 10%;
  top: 50%;
  content: "";
  width: 16px;
  height: 16px;
  background: url("~assets/imgs/index/icon-arrow.png") no-repeat;
  background-size: contain;
  transform: translate(0, -50%);
}
.category .nav-menu-item a:hover + .item-children,
.category .nav-menu-item .item-children:hover {
  display: block;
}
.category .isSearch {
  top: 56px;
  background-color: #fff;
  border: 1px solid var(--color-topic);
}
.category .isSearch .nav-menu-item {
  text-align: start;
}
/* .category .isSearch .nav-menu-item:hover > .item-children {
  display: block;
} */
.category .isSearch .nav-menu-item a {
  color: #333;
}
.category .isSearch .nav-menu-item a:hover,
.category .isSearch .nav-menu-item .showBgc {
  color: #fff;
}
</style>
