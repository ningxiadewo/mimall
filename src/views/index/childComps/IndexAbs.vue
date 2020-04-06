<template>
  <div class="product-ads">
    <ul>
      <li
        v-for="(item, index) in productAbsList"
        :key="index"
        class="product-item"
      >
        <a :href="/product/ + item.spu_id">
          <img :src="item.imgurl" alt="" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "index-abs",
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
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.5s;
}
.product-ads .product-item:last-child {
  margin: 0;
}
.product-ads .product-item img {
  width: 100%;
  height: 100%;
}
.product-ads .product-item:hover {
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.15);
  transform: translate3d(0, -7px, 0);
}
</style>
