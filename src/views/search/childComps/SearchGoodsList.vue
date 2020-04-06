<template>
  <div class="search-goods-list">
    <a :href="/product/ + goodsInfo.spu_id">
      <img :src="goodsInfo.imgurl" alt="" />
      <div class="wrapper">
        <p class="name">{{ goodsInfo.goods_name }}</p>
        <p class="intro">{{ goodsInfo.goods_name }}</p>
        <p class="price">￥{{ goodsInfo.low_price }}</p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "search-goods-list",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style>
.search-goods-list {
  float: left;
  width: 230px;
  height: 370px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 29px 29px 0;
  position: relative;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}
.search-goods-list:nth-child(5n) {
  margin-right: 0;
}
.search-goods-list > a {
  display: block;
  width: 100%;
  height: 100%;
}
.search-goods-list > a > img {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  /* width: 230px; */
  height: 294px;
}
.search-goods-list .name {
  color: #333;
}
.search-goods-list > a > .wrapper {
  position: absolute;
  left: 0;
  top: 310px;
  padding: 0 10px;
}
.search-goods-list > a .name {
  height: 18px;
  line-height: 18px;
  color: #666;
}
.search-goods-list > a .intro {
  height: 18px;
  line-height: 18px;
  color: #666;
}
.search-goods-list > a .price {
  font-size: 14px;
  color: #333;
  line-height: 20px;
  font-weight: 700;
}
</style>
