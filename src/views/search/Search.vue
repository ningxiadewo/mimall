<template>
  <div id="search">
    <nav-header @searchPage="_searchGoods" />
    <div class="page-main">
      <div class="container">
        <div class="sort-nav content">
          <a href="javaScript:;" class="sort-item"
            >全部商品分类
            <category class="children"></category>
          </a>
        </div>
        <div class="search-loading" v-if="showLoading">
          <loading class="search-loading-row" :loadingNum="2" />
        </div>
        <search-goods
          :goodsList="goodsList"
          v-else-if="!showLoading && goodsList.length > 0"
        ></search-goods>
        <div class="notice clear-fix" v-else>
          <div class="bg-img fl"></div>
          <div class="text fl">抱歉没有找到该商品,请换一个关键词试试</div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "components/navheader/NavHeader";
import NavFooter from "components/NavFooter/NavFooter";
import Category from "components/category/Category";
import Loading from "components/loading/Loading";

import SearchGoods from "./childComps/SearchGoods";

import { searchGoods } from "network/search";

export default {
  name: "search",
  components: {
    NavHeader,
    NavFooter,
    SearchGoods,
    Category,
    Loading,
  },
  created() {
    this._searchGoods();
  },
  data() {
    return {
      goodsList: [],
      showLoading: true,
      searchText: "",
    };
  },
  methods: {
    /**
     * 网络请求
     */
    _searchGoods(text) {
      if (!this.showLoading) {
        this.showLoading = true;
      }
      // 如果搜索框里有值
      // if (text) {
      //   this.searchText = text;
      // } else {
      this.searchText = this.$route.params.searchId;
      // }
      searchGoods(this.searchText)
        .then((res) => {
          console.log(res);

          this.showLoading = false;
          this.goodsList = res.data;
        })
        .catch((err) => {
          console.log(err);

          this.$toach.show("当前网络较差，请刷新网络");
        });
    },
  },
  watch: {
    // 监听点击返回按钮时，如果是在搜索页，就发送请求，请求数据
    $route(to, form) {
      if (
        form.path.indexOf("search") !== -1 &&
        this.$route.path.indexOf("search") !== -1
      ) {
        this._searchGoods(this.$route.params.searchId);
      }
    },
  },
};
</script>

<style>
#search > .page-main {
  border-top: 1px solid#ccc;
}
#search > .page-main > .container {
  overflow: hidden;
}
#search > .page-main .sort-nav {
  padding: 7px 0;
  border: 1px solid #e5e5e5;
  margin-top: 20px;
  margin-bottom: 30px;
}
#search > .page-main .content {
  position: relative;
  padding: 0;
  height: 46px;
  line-height: 46px;
}
#search > .page-main .content > a {
  display: inline-block;
  font-size: 16px;
  color: #333;
  text-align: end;
  line-height: 46px;
  font-size: 14px;
}
#search > .page-main .content a:hover {
  color: var(--color-topic);
}
#search > .page-main .content a:hover > .children {
  display: block;
}
#search > .page-main .sort-item {
  display: inline-block;
  line-height: 30px;
  font-size: 12px;
  color: #333;
  padding: 0 20px;
  border-right: 1px solid #e5e5e5;
}
#search > .page-main .sort-item:last-child {
  border: none;
}
#search > .page-main .sort-item:hover {
  color: var(--color-topic);
}
#search .notice {
  padding: 60px 30px;
  background-color: #f0f0f0;
}
#search .notice .bg-img {
  height: 32px;
  width: 32px;
  background: url("~assets/imgs/search/notice.png") no-repeat;
  vertical-align: middle;
}
#search .notice .text {
  height: 32px;
  line-height: 32px;
  color: #333;
  font-size: 16px;
}
#search .search-loading {
  position: relative;
  width: 1266px;
  margin: 0 auto;
  height: 200px;
}
#search .search-loading .search-loading-row {
  right: 50%;
  transform: translate(50%, -50%);
}
</style>
