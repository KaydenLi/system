<template>
  <div>
    <siteHeader :header="header"></siteHeader>
    <el-main>
      <img :src="user.img" class="avatar" />
      <p class="info">
        <span class="item">用户名：</span>
        <span class="user-name">{{user.userName}}</span>
      </p>
      <p class="info">
        <span class="item">联系方式：</span>
        <span class="user-name">{{user.email||"用户未填写"}}</span>
      </p>
    </el-main>
    <siteFooter></siteFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: { menu: "查看用户", toPageName: "返回首页", to: "/" },
      user: {}
    };
  },
  created() {
    this.$http.get(`user/show/${this.$route.params.id}`).then(res => {
      this.user = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 60px;
  height: 60px;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
  border: 1px solid #409eff;
}
.info {
  text-align: center;
  .item {
    font-weight: 250;
  }
  .user-name {
    font-weight: 400;
  }
}
</style>