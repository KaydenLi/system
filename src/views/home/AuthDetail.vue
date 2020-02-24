<template>
  <div>
    <siteHeader :header="header"></siteHeader>
    <el-main></el-main>
    <siteFooter></siteFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: { menu: "授权详情", toPageName: "返回首页", to: "/" }
    };
  }
};
</script>

<style>
</style>