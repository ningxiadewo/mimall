<template>
  <!-- 产品列表 -->
  <div class="index-product-list">
    <div class="product-item">
      <ul class="product-item-col">
        <li
          v-for="(sub, number) in mainProductList"
          :key="number"
          class="product-item-row"
        >
          <a :href="/product/ + sub.ID">
            <img :src="sub.imgurl" alt="" />
            <h3 class="index-title">{{ sub.goods_name }}</h3>
            <!-- <p class="index-desc">{{ sub.desc }}</p> -->
            <p class="index-price">{{ sub.low_price }}元</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "index-product-list",
  props: {
    mainProductList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      dataList: [],
      leftData: []
    };
  }
};
</script>

<style>
.index-product-list {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.index-product-list .product-item .product-item-row:nth-child(1),
.index-product-list .product-item .product-item-row:nth-child(6) {
  margin-left: 0;
  overflow: hidden;
}
.index-product-list .product-item .product-item-row:nth-child(1) img,
.index-product-list .product-item .product-item-row:nth-child(6) img {
  margin: 0;
  width: 234px;
  height: 300px;
}
.index-product-list .product-item .product-item-row {
  float: left;
  margin-left: 24px;
  background-color: #fff;
  width: 234px;
  height: 300px;
  text-align: center;
  margin-bottom: 24px;
  transition: all 0.2s linear;
}
.index-product-list .product-item .product-item-row:hover,
.index-product-list .banner-left img:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transform: translate3d(0, -2px, 0);
}
.index-product-list .product-item .product-item-row img {
  display: block;
  width: 160px;
  height: 160px;
  margin: 30px auto;
}
</style>
