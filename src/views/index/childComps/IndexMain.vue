<template>
  <!-- 产品列表 -->
  <div class="product-box">
    <!-- 手机 -->
    <div class="product-title">
      <h3 class="big-title">{{ title }}</h3>
    </div>
    <!-- 产品列表 -->
    <div class="index-product-list">
      <div class="product-item">
        <ul class="product-item-col">
          <li
            v-for="(sub, number) in mainProductList"
            :key="number"
            class="product-item-row"
          >
            <a
              href="javaScript:;"
              @click="$router.push(`/product/${sub.spu_id}`)"
            >
              <img v-lazy="sub.imgurl" alt="" />
              <h3 class="title">{{ sub.title }}</h3>
              <p class="intro">{{ sub.intro }}</p>
              <p class="price">{{ sub.price }}元起</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index-main",
  props: {
    mainProductList: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: "标题",
    },
  },
};
</script>

<style>
.product-box {
  overflow: hidden;
}
.product-box .product-title {
  position: relative;
  height: 60px;
}
.product-box .big-title {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 45px;
  line-height: 45px;
  padding: 0 30px;
  font-size: 28px;
  color: #333;
  text-align: center;
  transform: translate(-50%, -50%);
}
.product-box .big-title::before,
.product-box .big-title::after {
  position: absolute;
  content: "";
  left: 0;
  top: 10px;
  width: 25px;
  height: 20px;
  background: url("~assets/imgs/index/sprite.png") 0 0;
}
.product-box .big-title::after {
  left: auto;
  right: 0;
  background: url("~assets/imgs/index/sprite.png") 25px 0;
}

.index-product-list {
  overflow: hidden;
}
.product-box .price {
  color: var(--color-topic);
  font-size: 14px;
  margin-top: 20px;
}
.product-box .intro {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #b0b0b0;
  margin: 10px 25px 0;
}
.product-box .title {
  margin: 0 45px 0;
  font-size: 14px;
  font-weight: 400;
  text-overflow: ellipsis;
  color: #212121;
  overflow: hidden;
  white-space: nowrap;
}
.index-product-list .product-item .product-item-row:nth-child(5n + 1) {
  margin-left: 0;
}

.index-product-list .product-item .product-item-row {
  float: left;
  background-color: #fff;
  width: 234px;
  height: 260px;
  padding: 50px 0;
  text-align: center;
  margin: 24px 0 24px 24px;
  transition: all 0.2s linear;
}
.index-product-list .product-item .product-item-row:hover,
.index-product-list .banner-left img:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  transform: translate3d(0, -7px, 0);
}
.index-product-list .product-item .product-item-row img {
  display: block;
  width: 160px;
  height: 160px;
  margin: 0 auto 15px;
}

.index-product-list .product-item .product-item-row:nth-child(6),
.index-product-list .product-item .product-item-row:nth-child(7),
.index-product-list .product-item .product-item-row:nth-child(8),
.index-product-list .product-item .product-item-row:nth-child(9),
.index-product-list .product-item .product-item-row:nth-child(10) {
  margin-top: 0;
}
</style>
