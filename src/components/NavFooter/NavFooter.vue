<template>
  <div class="footer">
    <nav-size-footer></nav-size-footer>
    <nav-size-info></nav-size-info>
  </div>
</template>

<script>
import NavSizeFooter from "./childComps/NavSizeFooter";
import NavSizeInfo from "./childComps/NavSizeInfo";
export default {
  name: "nav-footer",
  components: {
    NavSizeFooter,
    NavSizeInfo
  }
};
</script>

<style></style>
