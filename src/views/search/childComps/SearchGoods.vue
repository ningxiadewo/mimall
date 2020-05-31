<template>
  <div class="search-goods clear-fix">
    <search-goods-list
      v-for="(item, index) in goodsList"
      :key="index"
      :goodsInfo="item"
    ></search-goods-list>
  </div>
</template>

<script>
import SearchGoodsList from "./SearchGoodsList";
export default {
  name: "search-goods",
  components: {
    SearchGoodsList,
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style></style>
