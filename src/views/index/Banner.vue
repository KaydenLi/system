<template>
  <div>
    <siteHeader :header="header"></siteHeader>
    <el-main>
      <el-row>
        <el-col
          :xs="{span: 24, offset: 0}"
          :sm="{span: 20, offset: 2}"
          :md="{span: 20, offset: 2}"
          :lg="{span: 18, offset: 3}"
          :xl="{span: 18, offset: 3}"
        >
          <p>{{banner.title || ""}}</p>
          <div class="release">
            <p>发布时间：{{banner.createTime}}</p>
          </div>
          <div id="content"></div>
        </el-col>
      </el-row>
    </el-main>
    <siteFooter></siteFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: { menu: "轮播图详情", toPageName: "返回首页", to: "/index" },
      banner: {}
    };
  },
  methods: {
    toList() {
      this.$router.push("/notes");
    },
    goBack() {
      this.$router.push("/notes");
    }
  },
  created() {
    this.$http.get(`/banner/${this.$route.params.id}`).then(res => {
      this.banner = res.data;
      if (this.banner.content == null) {
        let div = document.createElement("div");
        div.innerHTML = "暂无内容";
        document.getElementById("content").appendChild(div);
      } else {
        let div = document.createElement("div");
        div.innerHTML = this.banner.content;
        document.getElementById("content").appendChild(div);
      }
    });
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.block {
  margin-bottom: 100px;
}
.release {
  color: #909399;
  margin-bottom: 40px;
}
</style>