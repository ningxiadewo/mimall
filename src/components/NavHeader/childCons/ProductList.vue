<template>
  <div class="product-list">
    <ul>
      <li
        class="product-list-item"
        v-for="(item, index) in HeaderProductList"
        :key="index"
      >
        <a :href="/product/ + item.ID">
          <div class="pro-img">
            <img :src="item.imgurl" alt="" />
          </div>
          <div class="pro-name">
            {{ item.title }}
          </div>
          <div class="pro-price">{{ item.price }}元起</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "product-list",
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
.product-list {
  position: absolute;
  left: 0;
  width: 1266px;
  height: 0;
  opacity: 0;
  overflow: hidden;
  border-top: 1px solid #e5e5e5;
  box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  transition: all 0.3s;
  z-index: 11;
}
.product-list .product-list-item {
  position: relative;
  float: left;
  width: 16.6%;
  height: 220px;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
}
.product-list .pro-img {
  height: 136px;
}
.product-list .product-list-item img {
  width: auto;
  height: 100px;
  margin-top: 26px;
}
.product-list .product-list-item a {
  display: inline-block;
  margin: 0;
}
.product-list .pro-name {
  font-weight: bold;
  margin-top: 19px;
  margin-bottom: 8px;
  color: #333;
}
.product-list .pro-price {
  color: #ff6700;
}
.product-list-item::before {
  content: " ";
  position: absolute;
  top: 28px;
  right: 0;
  border-left: 1px solid #e5e5e5;
  height: 100px;
  width: 1px;
}
.product-list-item:last-child:before {
  border: 0;
}
</style>
