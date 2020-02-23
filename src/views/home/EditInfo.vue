<template>
  <div>
    <siteHeader :header="header"></siteHeader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: {
        menu: "编辑资料",
        toPageName: "返回主页",
        to: "/"
      }
    };
  }
};
</script>

<style scoped>
</style>