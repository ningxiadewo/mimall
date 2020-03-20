<template>
  <!-- :style="{ width: navProductList[0].length * 255 + 'px' }" -->
  <div class="nav-product">
    <ul class="nav-product-col">
      <li
        class="nav-product-row"
        v-for="(list, index) in navProductList"
        :key="index"
      >
        <a class="row-a" :href="/product/ + list.spu_id">
          <img :src="list.imgurl" alt="" />
          {{ list.goods_name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavProduct",
  props: {
    navProductList: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.nav-product {
  position: absolute;
  left: 243px;
  top: 0;
  width: 1203px;
  height: 460px;
  background-color: #fff;
  display: none;
}
.nav-product .nav-product-row {
  float: left;
  height: 76px;
  width: 255px;
  line-height: 76px;
}
.nav-product .nav-product-row img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin-right: 10px;
}
.nav-product .nav-product-col .nav-product-row .row-a {
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nav-product .nav-product-row span {
  color: #333;
}
.nav-product .nav-product-row span:hover {
  color: #ff6700;
}
</style>
