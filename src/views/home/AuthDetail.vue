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
            <span @click="checkUser(auth.owner_id)" class="link">{{auth.userInfo[0].userName}}</span>
          </p>
          <p>
            <span class="title">项目名称：</span>
            <span
              @click="checkProject(auth.project_id)"
              class="link"
            >{{auth.projectInfo[0].projectName}}</span>
          </p>
          <p>
            <span class="title">项目地址：</span>
            {{auth.projectInfo[0].province+" "+auth.projectInfo[0].city+" "+auth.projectInfo[0].address}}
          </p>
          <p>
            <span class="title">状态：</span>
            {{status}}
          </p>
          <p>
            <span class="title">申请日期：</span>
            {{auth.createdTime}}
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
        // _id: "0001",
        // user_id: "0002",
        // userName: "kaydenJobs",
        // project_id: "1",
        // address: "wuhan hust",
        // projectName: "待开放授权项目1",
        // title: "申请项目授权",
        // date: "2020-02-02",
        // status: "waitting",
        // authdate: "",
        // description: "测试-申请理由。"
      }
    };
  },
  computed: {
    status: function() {
      let st = this.auth.status;
      if ( st=== "WAIT") {
        return "等待授权";
      }else {
        return "error"
      }
    }
  },
  methods: {
    checkUser(id) {
      this.$router.push(`/user/${id}/show`);
    },
    checkProject(id) {
      this.$router.push(`/project/${id}`);
    },
    cancelQuest(id) {
      this.$confirm("确定拒绝该申请吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.get(`apply/rejectrequest/${id}`).then(res => {
            if (res.data === "ok") {
              this.$message.success("已拒绝该申请!");
              this.$router.push("/");
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
    acquireQuest(id) {
      this.$confirm("确定同意该申请吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.get(`apply/acquirequest/${id}`).then(res => {
            if (res.data === "ok") {
              this.$message.success("已同意该申请!");
              this.$router.push("/");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  created() {
    this.$http.get(`apply/detail/${this.$route.params.id}`).then(res => {
      window.console.log(res.data[0]);
      this.auth = res.data[0];
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