<template>
  <!-- :style="{ width: navProductList[0].length * 255 + 'px' }" -->
  <div class="nav-product">
    <ul class="nav-product-col">
      <li
        class="nav-product-rel"
        v-for="(list, index) in navProductList"
        :key="index"
      >
        <a :href="/product/ + list.ID">
          <img :src="list.imgurl" alt="" />
          <span>{{ list.title }}</span>
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
  /* width: 1203px; */
  height: 460px;
  background-color: #fff;
  display: none;
}
.nav-product .nav-product-rel {
  /* float: left; */
  height: 76px;
  width: 255px;
  line-height: 76px;
}
.nav-product .nav-product-rel img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin-right: 10px;
}
.nav-product .nav-product-rel span {
  color: #333;
}
.nav-product .nav-product-rel span:hover {
  color: #ff6700;
}
</style>
