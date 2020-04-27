<template>
  <div>
    <siteHeader :header="header"></siteHeader>
    <el-main>
      <el-row>
        <el-col
          :xs="{span: 24, offset: 0}"
          :sm="{span: 18, offset: 3}"
          :md="{span: 16, offset: 4}"
          :lg="{span: 16, offset: 4}"
          :xl="{span: 14, offset: 5}"
        >
          <p>
            <span class="title">项目名称：</span>
            <span
              @click="checkProject(quest.projectInfo[0].project_id)"
              class="link"
            >{{quest.projectInfo[0].projectName}}</span>
          </p>
          <p>
            <span class="title">所有者：</span>
            <span
              @click="checkUser(quest.userInfo[0].userName)"
              class="link"
            >{{quest.userInfo[0].userName}}</span>
          </p>
          <p>
            <span class="title">项目地址：</span>
            {{quest.projectInfo[0].province+" "+quest.projectInfo[0].city+" "+quest.projectInfo[0].address}}
          </p>
          <p>
            <span class="title">申请日期：</span>
            {{quest.createdTime}}
          </p>
          <p>
            <span class="title">申请理由：</span>
            {{quest.description}}
          </p>
          <el-button type="danger" size="mini" @click="cancelQuest(quest._id)">取消申请</el-button>
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
      header: { menu: "申请内容", toPageName: "返回首页", to: "/" },
      quest: {}
    };
  },
  methods: {
    checkUser(id) {
      this.$router.push(`/user/${id}/show`);
    },
    checkProject(id) {
      this.$router.push(`/project/${id}/show`);
    },
    cancelQuest(id) {
      //TODO:数据库操作
      this.$confirm("确定取消该申请吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.get(`/apply/cancelrequest/${id}`).then(res => {
            if (res.data === "ok") this.$message.success("已取消该申请!");
            this.$router.push(`/`);
          });
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    }
  },
  created() {
    this.$http.get(`apply/applydetail/${this.$route.params.id}`).then(res => {
      this.quest = res.data[0];
      window.console.log(res.data[0]);
    });
  }
};
</script>

<style lang="scss" scoped>
.title {
  color: #909399;
  font-weight: 300;
}
.link {
  color: #409eff;
  &:hover {
    cursor: pointer;
  }
}
</style>