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
            <span class="title">申请者：</span>
            <span @click="checkUser(auth.project_id)" class="link">{{auth.userName}}</span>
          </p>
          <p>
            <span class="title">项目名称：</span>
            <span @click="checkProject(auth.project_id)" class="link">{{auth.projectName}}</span>
          </p>
          <p>
            <span class="title">项目地址：</span>
            {{auth.address}}
          </p>
          <p>
            <span class="title">状态：</span>
            {{auth.status}}
          </p>
          <p>
            <span class="title">申请日期：</span>
            {{auth.date}}
          </p>
          <p>
            <span class="title">申请理由：</span>
            {{auth.description}}
          </p>
          <el-button type="primary" size="mini" @click="acquireQuest(auth._id)">同意申请</el-button>
          <el-button type="danger" size="mini" @click="cancelQuest(auth._id)">拒绝申请</el-button>
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
      header: { menu: "授权详情", toPageName: "返回首页", to: "/" },
      auth: {
        _id: "0001",
        user_id: "0002",
        userName: "kaydenJobs",
        project_id: "1",
        address: "wuhan hust",
        projectName: "待开放授权项目1",
        title: "申请项目授权",
        date: "2020-02-02",
        status: "waitting",
        authdate: "",
        description: "测试-申请理由。"
      }
    };
  },
  methods: {
    checkUser(id) {
      this.$router.push(`/user/${id}/show`);
    },
    checkProject(id) {
      this.$router.push(`/project/${id}`);
    },
    cancelQuest(id) {
      window.console.log("拒绝" + id);
      this.$confirm("确定拒绝该申请吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已拒绝该申请!"
          });
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    acquireQuest(id) {
      window.console.log("拒绝" + id);
      this.$confirm("确定同意该申请吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已同意该申请!"
          });
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
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