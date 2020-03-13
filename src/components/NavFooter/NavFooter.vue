<template>
  <div class="footer">
    <nav-size-footer></nav-size-footer>
    <nav-size-info></nav-size-info>
  </div>
</template>

<script>
import NavSizeFooter from "./NavSizeFooter";
import NavSizeInfo from "./NavSizeInfo";
export default {
  name: "nav-footer",
  components: {
    NavSizeFooter,
    NavSizeInfo
  }
};
</script>

<style></style>
