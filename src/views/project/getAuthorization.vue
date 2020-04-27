<template>
  <div>
    <siteHeader :header="header"></siteHeader>
    <el-row>
      <el-col
        :xs="{span: 24, offset: 0}"
        :sm="{span: 18, offset: 3}"
        :md="{span: 14, offset: 5}"
        :lg="{span: 10, offset: 7}"
        :xl="{span: 8, offset: 8}"
      >
        <el-image :src="project.img">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <p>
          <span class="item-header">项目名称：</span>
          <span>{{project.projectName}}</span>
        </p>
        <p>
          <span class="item-header">项目地址：</span>
          <span>{{address}}</span>
        </p>
        <p>
          <span class="item-header">开放状态：</span>
          <span>{{status}}</span>
        </p>
        <p>
          <span class="item-header">项目所有：</span>
          <span @click="checkUser(project.ownerId)" class="link">所有者</span>
        </p>
        <el-button type="primary" @click="getAuth">请求查看</el-button>
      </el-col>
    </el-row>
    <siteFooter></siteFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: { menu: "获取授权", toPageName: "返回列表", to: "/list" },
      project: {}
    };
  },
  computed: {
    status: function() {
      return this.project.openStatus === true ? "开放" : "error";
    },
    address: function() {
      return (
        (this.project.province || "") +
        (this.project.city || "") +
        (this.project.address || "")
      );
    }
  },
  methods: {
    getAuth() {
      let id = this.$route.params.id;
      this.$http.get(`apply/getapply/${id}`).then(res => {
        if (res.data === "ok") {
          window.console.log(res.data);
          this.$message.success("已发送申请");
          this.$router.push("/");
        } else {
          this.$message.error("申请出错，请稍后再试");
        }
      });
    },
    checkUser(id) {
      this.$router.push(`/user/${id}/show`);
    }
  },
  created() {
    this.$http.get(`project/show/${this.$route.params.id}`).then(res => {
      this.project = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.item-header {
  color: #909399;
}
.link {
  color: #409eff;
  &:hover {
    cursor: pointer;
  }
}
</style>