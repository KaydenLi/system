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
      header: { menu: "我的开放列表", toPageName: "返回首页", to: "/" }
    };
  }
};
</script>

<style lang="acss" scoped>
</style>