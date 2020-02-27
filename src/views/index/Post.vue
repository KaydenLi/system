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
            <p>发布时间：{{post.time}}</p>
            <p>摘要：{{post.summary}}</p>
          </div>
          <div id="content"></div>
        </el-col>
      </el-row>
    </el-main>
    <siteFooter></siteFooter>
  </div>
</template>

<script>
import postData from "../../mockData/posts.js";
export default {
  data() {
    return {
      header: { menu: "通告详情", toPageName: "返回首页", to: "/index" },
      post: null
    };
  },
  methods: {
    toList() {
      this.$router.push("/notes");
    },
    render(content) {
      var renderTree = document.getElementById("content");
      window.console.log(renderTree);
      renderTree.innerHTML = content;
    },
    goBack() {
      this.$router.push("/notes");
    }
  },
  created() {
    this.post = postData;
  },
  mounted() {
    //window.console.log(this.$route.params.id);
    this.render(this.post.content);
  }
};
</script>

<style scoped>
.block {
  margin-bottom: 100px;
}
.box-card {
  margin: 0;
  padding: 0;
  border: none;
}
.release {
  color: #909399;
  margin-bottom: 40px;
}
</style>