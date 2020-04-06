<template>
  <!-- 主页详情内容 -->
  <div id="index">
    <nav-header></nav-header>
    <div class="container">
      <category />
      <index-swiper :swiperSlides="swiperSlides" ref="swiper"></index-swiper>
      <index-abs :productAbsList="productAbsList"></index-abs>
      <index-fast
        :fastProductList="fastProductList"
        :endTime="endTime"
      ></index-fast>
      <index-main
        :title="'过滤设备'"
        :mainProductList="mainProductList.filter"
      ></index-main>
      <index-main
        :title="'环保材料'"
        :mainProductList="mainProductList.material"
      ></index-main>
      <index-main
        :title="'节能清洁'"
        :mainProductList="mainProductList.chemistry"
      ></index-main>
      <index-back-top></index-back-top>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "components/NavHeader";
import Category from "components/category/Category";

import IndexSwiper from "./childComps/IndexSwiper";
import IndexAbs from "./childComps/IndexAbs";
import IndexFast from "./childComps/IndexFast";
import IndexMain from "./childComps/IndexMain";
// import IndexMain from "./childComps/main/IndexMain";
import IndexBackTop from "./childComps/IndexBackTop";

import NavFooter from "components/NavFooter/NavFooter";

// 导入首页网络请求
import { getIndexData } from "network/index.js";

export default {
  name: "index",
  components: {
    NavHeader,
    Category,
    IndexSwiper,
    IndexAbs,
    IndexFast,
    IndexMain,
    IndexBackTop,
    NavFooter
  },
  data() {
    return {
      // 轮播图
      swiperSlides: [],
      // 轮播图下的四个广告位
      productAbsList: [],
      // 12张轮播图
      fastProductList: [],
      // 10张图片
      mainProductList: {
        filter: [
          {
            brand_id: "BRAND1009",
            category_id: "1003",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "多功能过滤器",
            low_price: 1200,
            spu_id: "spu_1041",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_134.jpg"
          },
          {
            brand_id: "BRAND1009",
            category_id: "1003",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "全自动触摸屏控制润滑油真空滤油机",
            low_price: 69000,
            spu_id: "spu_1042",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_137.jpg"
          },
          {
            brand_id: "BRAND1009",
            category_id: "1003",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "高压高温过滤器",
            low_price: 13888,
            spu_id: "spu_1043",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_138.jpg"
          },
          {
            brand_id: "BRAND1009",
            category_id: "1003",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "循环水旁滤器",
            low_price: 18888,
            spu_id: "spu_1044",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_142.jpg"
          },
          {
            brand_id: "BRAND1009",
            category_id: "1003",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "旋流除污器",
            low_price: 4359,
            spu_id: "spu_1045",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_144.jpg"
          },
          {
            brand_id: "BRAND1009",
            category_id: "1003",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "变压器油真空滤油机",
            low_price: 19358,
            spu_id: "spu_1046",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_146.jpg"
          },
          {
            brand_id: "BRAND1009",
            category_id: "1003",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "全程水处理器",
            low_price: 8000,
            spu_id: "spu_1047",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_148.jpg"
          },
          {
            brand_id: "BRAND1009",
            category_id: "1003",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "洗沙泥浆脱水设备",
            low_price: 1680000,
            spu_id: "spu_1048",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_150.jpg"
          },
          {
            brand_id: "BRAND1009",
            category_id: "1003",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "废弃油再生过滤机",
            low_price: 200000,
            spu_id: "spu_1049",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_151.jpg"
          },
          {
            brand_id: "BRAND1009",
            category_id: "1003",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "除尘滤袋",
            low_price: 65,
            spu_id: "spu_1050",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_153.jpg"
          }
        ],
        material: [
          {
            brand_id: "BRAND10010",
            category_id: "1004",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "抗老化铝箔丁基胶带",
            low_price: 1.6,
            spu_id: "spu_1051",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_154.jpg"
          },
          {
            brand_id: "BRAND10010",
            category_id: "1004",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "外墙保温岩棉板",
            low_price: 11,
            spu_id: "spu_1052",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_156.jpg"
          },
          {
            brand_id: "BRAND10010",
            category_id: "1004",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "环保料彩条布",
            low_price: 1,
            spu_id: "spu_1053",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_157.jpg"
          },
          {
            brand_id: "BRAND10010",
            category_id: "1004",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "钢结构防火涂料",
            low_price: 125,
            spu_id: "spu_1054",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_158.jpg"
          },
          {
            brand_id: "BRAND10010",
            category_id: "1004",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "再生料盖土防尘网",
            low_price: 19,
            spu_id: "spu_1055",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_160.jpg"
          },
          {
            brand_id: "BRAND10010",
            category_id: "1004",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "无菌取样袋",
            low_price: 400,
            spu_id: "spu_1056",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_162.jpg"
          },
          {
            brand_id: "BRAND1007",
            category_id: "1004",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "人工草坪",
            low_price: 20,
            spu_id: "spu_1057",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_165.jpg"
          },
          {
            brand_id: "BRAND10010",
            category_id: "1004",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "环氧树脂防腐墙",
            low_price: 49,
            spu_id: "spu_1058",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_166.jpg"
          },
          {
            brand_id: "BRAND10010",
            category_id: "1004",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "高温防腐胶泥",
            low_price: 11,
            spu_id: "spu_1059",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_170.jpg"
          },
          {
            brand_id: "BRAND10010",
            category_id: "1004",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "不锈钢管件",
            low_price: 20,
            spu_id: "spu_1060",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_171.jpg"
          }
        ],
        chemistry: [
          {
            brand_id: "BRAND1008",
            category_id: "1005",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "缓蚀阻垢剂",
            low_price: 2.9,
            spu_id: "spu_1061",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_174.jpg"
          },
          {
            brand_id: "BRAND1007",
            category_id: "1005",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "离子交换器",
            low_price: 38000,
            spu_id: "spu_1062",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_177.jpg"
          },
          {
            brand_id: "BRAND1007",
            category_id: "1005",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "水质分析仪",
            low_price: 8800,
            spu_id: "spu_1063",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_179.jpg"
          },
          {
            brand_id: "BRAND1008",
            category_id: "1005",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "河道污水除臭剂",
            low_price: 35,
            spu_id: "spu_1064",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_180.jpg"
          },
          {
            brand_id: "BRAND1008",
            category_id: "1005",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "道路专用液体抑尘剂",
            low_price: 12000,
            spu_id: "spu_1065",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_182.jpg"
          },
          {
            brand_id: "BRAND1008",
            category_id: "1005",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "空气净化剂",
            low_price: 300,
            spu_id: "spu_1066",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_183.jpg"
          },
          {
            brand_id: "BRAND1008",
            category_id: "1005",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "生活除臭剂去味剂",
            low_price: 20,
            spu_id: "spu_1067",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_185.jpg"
          },
          {
            brand_id: "BRAND1008",
            category_id: "1005",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "高分子脱销剂",
            low_price: 1500,
            spu_id: "spu_1068",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_187.jpg"
          },
          {
            brand_id: "BRAND1008",
            category_id: "1005",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "甲醛处理剂",
            low_price: 450,
            spu_id: "spu_1069",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_188.jpg"
          },
          {
            brand_id: "BRAND1008",
            category_id: "1005",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "污水化工处理设备",
            low_price: 3500,
            spu_id: "spu_1070",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_191.jpg"
          }
        ]
      },
      // 倒计时
      endTime: "23:00:00"
    };
  },
  created() {
    this.getIndexData();
  },
  methods: {
    /**
     * 网络请求部分
     */
    getIndexData(res) {
      getIndexData().then(res => {
        this.productAbsList = res.data.abs;
        this.swiperSlides = res.data.swiper;
        this.fastProductList = res.data.fast;
        console.log(res);
        // this.navProductList = res.data.nav;
        // console.log(res.data.nav);
        this.mainProductList = res.data.main;
        this.mainProductList.filter = res.data.main.filter;
      });
    }
  }
};
</script>

<style>
#index {
  background-color: #f4f4f4;
}
</style>
