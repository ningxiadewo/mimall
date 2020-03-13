<template>
  <div class="product-ads">
    <ul>
      <li
        v-for="(item, index) in productAbsList"
        :key="index"
        class="product-item"
      >
      <a :href="/product/ + item.ID">
          <img :src="item.imgurl" alt="" />
      </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "product-ads",
  props: {
    productAbsList: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.product-ads {
  height: 170px;
  margin: 15px 0 20px 0;
}
.product-ads .product-item {
  float: left;
  width: 305px;
  height: 170px;
  margin-right: 15px;
}
.product-ads .product-item:last-child {
  margin: 0;
}
.product-ads .product-item img {
  width: 100%;
  height: 100%;
}
</style>
