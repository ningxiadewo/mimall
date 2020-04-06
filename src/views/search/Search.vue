<template>
  <div id="search">
    <nav-header></nav-header>
    <div class="page-main">
      <!-- <div class="container">
        <div class="sort-nav">
          <a href="javaScript:;" class="sort-item">综合</a>
          <a href="javaScript:;" class="sort-item">销量</a>
          <a href="javaScript:;" class="sort-item">价格</a>
        </div>
        <search-goods :goodsList="goodsList"></search-goods>
      </div> -->
      <div class="container">
        <div class="notice clear-fix">
          <div class="bg-img fl"></div>
          <div class="text fl">抱歉没有找到该商品,请换一个关键词试试</div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "components/NavHeader";
import NavFooter from "components/NavFooter/NavFooter";

import SearchGoods from "./childComps/SearchGoods";

export default {
  name: "search",
  components: {
    NavHeader,
    NavFooter,
    SearchGoods
  },
  data() {
    return {
      goodsList: [
        {
          brand_id: "BRAND1001",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "环保购物袋",
          low_price: 36.99,
          spu_id: "spu_1001",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_01.jpg"
        },
        {
          brand_id: "BRAND1002",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "USB充电电池",
          low_price: 5.9,
          spu_id: "spu_1002",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_05.jpg"
        },
        {
          brand_id: "BRAND1003",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "环保节能灯",
          low_price: 29.9,
          spu_id: "spu_1003",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_06.jpg"
        },
        {
          brand_id: "BRAND1002",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "环保耐温电线",
          low_price: 0.3,
          spu_id: "spu_1004",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_11.jpg"
        },
        {
          brand_id: "BRAND1003",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.00Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "厕所浴霸灯暖",
          low_price: 199,
          spu_id: "spu_1005",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_15.jpg"
        },
        {
          brand_id: "BRAND1002",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "快充环保数据线TYPE_C",
          low_price: 29.9,
          spu_id: "spu_1006",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_21.jpg"
        },
        {
          brand_id: "BRAND1003",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "集成灶智能高效环保",
          low_price: 3480,
          spu_id: "spu_1008",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_41.jpg"
        },
        {
          brand_id: "BRAND1001",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "韩式环保雨衣",
          low_price: 118,
          spu_id: "spu_1009",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_42.jpg"
        },
        {
          brand_id: "BRAND1001",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "羽绒衣环保材料",
          low_price: 699,
          spu_id: "spu_1010",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_47.jpg"
        },
        {
          brand_id: "BRAND1004",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "环保天然乳胶气垫床",
          low_price: 4090,
          spu_id: "spu_1011",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_54.jpg"
        },
        {
          brand_id: "BRAND1004",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "吸音装饰画家居环保声学材料",
          low_price: 6680,
          spu_id: "spu_1012",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_56.jpg"
        },
        {
          brand_id: "BRAND1004",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "收纳箱环保材料制",
          low_price: 25.8,
          spu_id: "spu_1013",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_60.jpg"
        },
        {
          brand_id: "BRAND1004",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "纯手工柳编收纳篮",
          low_price: 59.9,
          spu_id: "spu_1014",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_66.jpg"
        },
        {
          brand_id: "BRAND1004",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "环保材料制油漆",
          low_price: 55,
          spu_id: "spu_1015",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_69.jpg"
        },
        {
          brand_id: "BRAND1004",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "家居环保材料瓷砖",
          low_price: 10.5,
          spu_id: "spu_1016",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_73.jpg"
        },
        {
          brand_id: "BRAND1004",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "环保材料与家居设计书",
          low_price: 45,
          spu_id: "spu_1017",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_75.jpg"
        },
        {
          brand_id: "BRAND1001",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "新材料环保礼品杯",
          low_price: 7.63,
          spu_id: "spu_1018",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_76.jpg"
        },
        {
          brand_id: "BRAND1003",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "智能分类环保垃圾桶",
          low_price: 89.9,
          spu_id: "spu_1019",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_80.jpg"
        },
        {
          brand_id: "BRAND1003",
          category_id: "1001",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "可降解环保垃圾袋",
          low_price: 8.9,
          spu_id: "spu_1020",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_85.jpg"
        }
      ]
    };
  }
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
#search > .page-main .sort-item {
  display: inline-block;
  line-height: 30px;
  font-size: 12px;
  color: #333;
  padding: 0 20px;
  border-right: 1px solid #e5e5e5;
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
</style>
