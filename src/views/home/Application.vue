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
            <span @click="checkProject(quest.project_id)" class="link">{{quest.projectName}}</span>
          </p>
          <p>
            <span class="title">所有者：</span>
            <span @click="checkUser(quest.project_id)" class="link">{{quest.userName}}</span>
          </p>
          <p>
            <span class="title">项目地址：</span>
            {{quest.address}}
          </p>
          <p>
            <span class="title">申请日期：</span>
            {{quest.date}}
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
      quest: {
        _id: "01",
        user_id: "0002",
        userName: "kayden",
        project_id: "1",
        address: "湖北省武汉市洪山区华中科技大学",
        projectName: "某教学楼",
        date: "2020-02-02",
        status: "waitting",
        authdate: "",
        description: "申请用于项目建设期的安全监测和使用期的健康管理。"
      }
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
      window.console.log("接受" + id);
      this.$confirm("确定取消该申请吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已取消该申请!"
          });
          this.$router.push(`/`);
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
    //TODO:根据ID获取具体请求的数据
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