<template>
  <div>
    <siteHeader :header="header"></siteHeader>
    <el-main>
      <el-row>
        <el-col
          :xs="{span: 24, offset: 0}"
          :sm="{span: 18, offset: 3}"
          :md="{span: 14, offset: 5}"
          :lg="{span: 10, offset: 7}"
          :xl="{span: 8, offset: 8}"
        >
          <div class="block">
            <div class="not-found">4 0 4</div>
            <p>你要查看的页面"{{url}}"不存在</p>
            <el-button type="text" @click="toIndex">返回首页</el-button>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <siteFooter class="footer"></siteFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: {
        menu: "页面不存在",
        toPageName: "返回首页",
        to: "/index"
      },
      url: ""
    };
  },
  methods: {
    toIndex() {
      this.$router.push("/index");
    }
  },
  created() {
    this.url = this.$route.params.pathMatch;
  }
};
</script>

<style lang="scss" scoped>
.block {
  margin: 100px 0;
  text-align: center;
  .not-found {
    font-size: 50px;
    color: #f56c6c;
  }
}
.footer {
  margin-top: 100px;
}
</style>