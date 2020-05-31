<template>
  <div class="search-goods-list">
    <a
      href="javaScript:;"
      @click="$router.push(`/product/${goodsInfo.spu_id}`)"
    >
      <img :src="goodsInfo.imgurl" alt="" />
      <div class="wrapper">
        <p class="name">
          <span>{{ goodsInfo.goods_name }}</span>
          {{ goodsInfo.intro }}
        </p>
        <p class="price">￥{{ goodsInfo.low_price }}起</p>
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
      },
    },
  },
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
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  transition: all 0.3s;
}
.search-goods-list:hover {
  transform: translate3d(0, -10px, 0);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
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
.search-goods-list > a > .wrapper {
  position: absolute;
  left: 0;
  top: 310px;
  padding: 0 10px;
}
.search-goods-list > a .name {
  height: 36px;
  line-height: 18px;
  overflow: hidden;
  color: #666;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.search-goods-list > a .name > span {
  color: var(--color-topic);
  font-weight: 700;
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
