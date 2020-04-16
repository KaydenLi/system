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
          <el-page-header @back="goBack" title="通告列表" :content="post.title"></el-page-header>
          <el-divider></el-divider>
          <div class="release">
            <p>发布时间：{{post.createTime}}</p>
            <p>摘要：{{post.digest}}</p>
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
      header: { menu: "通告详情", toPageName: "返回首页", to: "/index" },
      post: {}
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
    this.$http.get(`/post/${this.$route.params.id}`).then(res => {
      this.post = res.data;
      var div = document.createElement("div");
      div.innerHTML = this.post.content;
      document.getElementById("content").appendChild(div);
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