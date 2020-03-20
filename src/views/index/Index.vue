<template>
  <!-- 主页详情内容 -->
  <div id="index">
    <nav-header :HeaderProductList="HeaderProductList"></nav-header>
    <div class="container">
      <swiper
        :swiperSlides="swiperSlides"
        :navProductList="navProductList"
      ></swiper>
      <product-ads :productAbsList="productAbsList"></product-ads>
      <index-main
        :fastProductList="fastProductList"
        :longBannerList="longBannerList"
        :mainProductList="mainProductList"
        :endTime="endTime"
      ></index-main>
      <tool-bar></tool-bar>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "components/NavHeader/NavHeader";

import Swiper from "./childCons/Swiper";
import ProductAds from "./childCons/ProductAds";
import IndexMain from "./childCons/main/IndexMain";
import ToolBar from "./childCons/ToolBar";

import NavFooter from "components/NavFooter/NavFooter";

// 导入首页网络请求
import {
  getIndexData,
  getHeaderData,
  getAllgoods
} from "network/indexQequest.js";

export default {
  name: "index",
  components: {
    NavFooter,
    NavHeader,
    Swiper,
    ProductAds,
    IndexMain,
    ToolBar
  },
  data() {
    return {
      // 头部隐藏数据
      HeaderProductList: [],
      // 轮播图
      swiperSlides: [
        {
          imgurl: "http://39.107.45.210/images/Environmenta_chart/1.jpg"
        },
        {
          imgurl: "http://39.107.45.210/images/Environmenta_chart/2.jpg"
        },
        {
          imgurl: "http://39.107.45.210/images/Environmenta_chart/3.jpg"
        },
        {
          imgurl: "http://39.107.45.210/images/Environmenta_chart/4.jpg"
        },
        {
          imgurl: "http://39.107.45.210/images/Environmenta_chart/5.jpg"
        }
      ],
      // 轮播图下的四个广告位
      productAbsList: [
        {
          brand_id: "BRAND1005",
          category_id: "1006",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "水滴式除水风刀",
          low_price: 450,
          spu_id: "spu_1071",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_193.jpg"
        },
        {
          brand_id: "BRAND1005",
          category_id: "1006",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "电动尘推车",
          low_price: 4500,
          spu_id: "spu_1072",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_195.jpg"
        },
        {
          brand_id: "BRAND1005",
          category_id: "1006",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "高温高压清洗机",
          low_price: 16470,
          spu_id: "spu_1076",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_205.jpg"
        },
        {
          brand_id: "BRAND1006",
          category_id: "1006",
          gmt_create: "2020-03-15T03:48:40.000Z",
          gmt_update: "0000-00-00 00:00:00",
          goods_name: "小广告清洗机",
          low_price: 8500,
          spu_id: "spu_1074",
          imgurl: "http://39.107.45.210/images/sku_pictures/sku_199.jpg"
        }
      ],
      // 轮播图左边的隐藏数据
      navProductList: {
        energy: [
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
        ],
        air: [
          {
            brand_id: "BRAND1003",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "空气净化加湿一体机",
            low_price: 2680,
            spu_id: "spu_1021",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_88.jpg"
          },
          {
            brand_id: "BRAND1005",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "工地降尘自动雾炮机",
            low_price: 1688,
            spu_id: "spu_1022",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_91.jpg"
          },
          {
            brand_id: "BRAND1005",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "紫外线杀菌灯",
            low_price: 998,
            spu_id: "spu_1023",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_92.jpg"
          },
          {
            brand_id: "BRAND1005",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "静电油烟净化器",
            low_price: 8899,
            spu_id: "spu_1024",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_94.jpg"
          },
          {
            brand_id: "BRAND1006",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "空气过滤器",
            low_price: 1500,
            spu_id: "spu_1025",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_97.jpg"
          },
          {
            brand_id: "BRAND1006",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "高效除湿机",
            low_price: 4850,
            spu_id: "spu_1026",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_99.jpg"
          },
          {
            brand_id: "BRAND1005",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "植物液除臭喷雾除臭系统",
            low_price: 10000,
            spu_id: "spu_1027",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_102.jpg"
          },
          {
            brand_id: "BRAND1005",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "变频排气扇",
            low_price: 1499,
            spu_id: "spu_1028",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_105.jpg"
          },
          {
            brand_id: "BRAND1006",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "纯水雾化器",
            low_price: 500,
            spu_id: "spu_1029",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_106.jpg"
          },
          {
            brand_id: "BRAND1006",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "空气过滤器芯",
            low_price: 18,
            spu_id: "spu_1030",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_108.jpg"
          },
          {
            brand_id: "BRAND1006",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "空气过滤器",
            low_price: 6800,
            spu_id: "spu_1031",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_111.jpg"
          },
          {
            brand_id: "BRAND1007",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "无菌车间设计装修改造",
            low_price: 2800,
            spu_id: "spu_1032",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_114.jpg"
          },
          {
            brand_id: "BRAND1008",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "粉尘抑制剂",
            low_price: 93.2,
            spu_id: "spu_1033",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_118.jpg"
          },
          {
            brand_id: "BRAND1008",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "蜂窝活性炭",
            low_price: 65,
            spu_id: "spu_1034",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_119.jpg"
          },
          {
            brand_id: "BRAND1007",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "空气洁净度检测仪",
            low_price: 3800,
            spu_id: "spu_1035",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_121.jpg"
          },
          {
            brand_id: "BRAND1007",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "医院样式移动无菌室",
            low_price: 5000,
            spu_id: "spu_1036",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_122.jpg"
          },
          {
            brand_id: "BRAND1007",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "带过滤通风管",
            low_price: 200,
            spu_id: "spu_1037",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_125.jpg"
          },
          {
            brand_id: "BRAND1006",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "医用空气消毒器",
            low_price: 3900,
            spu_id: "spu_1038",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_128.jpg"
          },
          {
            brand_id: "BRAND1006",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "空气消声器",
            low_price: 263,
            spu_id: "spu_1039",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_130.jpg"
          },
          {
            brand_id: "BRAND1006",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "防护服",
            low_price: 140,
            spu_id: "spu_1040",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_131.jpg"
          }
        ],
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
        ],
        clean: [
          {
            brand_id: "BRAND1005",
            category_id: "1006",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "水滴式除水风刀",
            low_price: 450,
            spu_id: "spu_1071",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_193.jpg"
          },
          {
            brand_id: "BRAND1005",
            category_id: "1006",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "电动尘推车",
            low_price: 4500,
            spu_id: "spu_1072",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_195.jpg"
          },
          {
            brand_id: "BRAND1006",
            category_id: "1006",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "不锈钢医用水池",
            low_price: 12000,
            spu_id: "spu_1073",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_197.jpg"
          },
          {
            brand_id: "BRAND1006",
            category_id: "1006",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "小广告清洗机",
            low_price: 8500,
            spu_id: "spu_1074",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_199.jpg"
          },
          {
            brand_id: "BRAND1005",
            category_id: "1006",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "清洁垃圾桶",
            low_price: 50,
            spu_id: "spu_1075",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_201.jpg"
          },
          {
            brand_id: "BRAND1005",
            category_id: "1006",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "高温高压清洗机",
            low_price: 16470,
            spu_id: "spu_1076",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_205.jpg"
          },
          {
            brand_id: "BRAND1005",
            category_id: "1006",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "全自动脉冲吸尘器",
            low_price: 8880,
            spu_id: "spu_1077",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_207.jpg"
          },
          {
            brand_id: "BRAND1007",
            category_id: "1006",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "户外环卫间设计",
            low_price: 2800,
            spu_id: "spu_1078",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_208.jpg"
          },
          {
            brand_id: "BRAND1003",
            category_id: "1006",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "环卫机器人",
            low_price: 6000,
            spu_id: "spu_1079",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_213.jpg"
          },
          {
            brand_id: "BRAND1003",
            category_id: "1006",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "小型手推式扫地车",
            low_price: 3400,
            spu_id: "spu_1080",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_217.jpg"
          }
        ]
      },
      // 12张轮播图
      fastProductList: [
        [
          {
            brand_id: "BRAND1003",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "空气净化加湿一体机",
            low_price: 2680,
            spu_id: "spu_1021",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_88.jpg"
          },
          {
            brand_id: "BRAND1005",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "工地降尘自动雾炮机",
            low_price: 1688,
            spu_id: "spu_1022",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_91.jpg"
          },
          {
            brand_id: "BRAND1005",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "紫外线杀菌灯",
            low_price: 998,
            spu_id: "spu_1023",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_92.jpg"
          },
          {
            brand_id: "BRAND1005",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "静电油烟净化器",
            low_price: 8899,
            spu_id: "spu_1024",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_94.jpg"
          }
        ],
        [
          {
            brand_id: "BRAND1006",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "空气过滤器",
            low_price: 1500,
            spu_id: "spu_1025",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_97.jpg"
          },
          {
            brand_id: "BRAND1006",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "高效除湿机",
            low_price: 4850,
            spu_id: "spu_1026",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_99.jpg"
          },
          {
            brand_id: "BRAND1005",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "植物液除臭喷雾除臭系统",
            low_price: 10000,
            spu_id: "spu_1027",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_102.jpg"
          },
          {
            brand_id: "BRAND1005",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "变频排气扇",
            low_price: 1499,
            spu_id: "spu_1028",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_105.jpg"
          }
        ],
        [
          {
            brand_id: "BRAND1006",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "纯水雾化器",
            low_price: 500,
            spu_id: "spu_1029",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_106.jpg"
          },
          {
            brand_id: "BRAND1006",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "空气过滤器芯",
            low_price: 18,
            spu_id: "spu_1030",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_108.jpg"
          },
          {
            brand_id: "BRAND1006",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "空气过滤器",
            low_price: 6800,
            spu_id: "spu_1031",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_111.jpg"
          },
          {
            brand_id: "BRAND1007",
            category_id: "1002",
            gmt_create: "2020-03-15T03:48:40.000Z",
            gmt_update: "0000-00-00 00:00:00",
            goods_name: "无菌车间设计装修改造",
            low_price: 2800,
            spu_id: "spu_1032",
            imgurl: "http://39.107.45.210/images/sku_pictures/sku_114.jpg"
          }
        ]
      ],
      // 三张长广告图
      longBannerList: {},
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
    this.getHeaderData();
    getAllgoods()
      .then(res => {
        console.log(res);
      })
      .catch(arr => {
        console.log(arr);
      });
  },
  methods: {
    /**
     * 网络请求部分
     */
    getIndexData(res) {
      getIndexData().then(res => {
        // this.productAbsList = res.data.abs;
        // this.swiperSlides = res.data.swiper;
        // this.fastProductList = res.data.fast;
        // console.log(res);
        // this.navProductList = res.data.nav;
        // console.log(res.data.nav);
        // this.mainProductList = res.data.main;
      });
    },
    getHeaderData(res) {
      getHeaderData().then(res => {
        this.HeaderProductList = res.data;
      });
    }
  }
};
</script>

<style></style>
