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
          {{ list.title }}
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
  left: 242px;
  top: -1px;
  width: 1025px;
  height: 460px;
  background-color: #fff;
  display: none;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border: 1px solid #e0e0e0;
  border-left: 0;
  z-index: 24;
}
.nav-product .nav-product-row {
  float: left;
  height: 42px;
  width: 255px;
  line-height: 76px;
  padding: 17px 0;
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
.nav-product .nav-product-col .nav-product-row .row-a:hover {
  color: var(--color-topic);
}
.nav-product .nav-product-row span {
  color: #333;
}
.nav-product .nav-product-row span:hover {
  color: #ff6700;
}
</style>
