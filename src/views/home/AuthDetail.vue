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
            {{auth.userName}}
          </p>
          <p>
            <span class="title">项目名称：</span>
            {{auth.projectName}}
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
    cancelQuest(id) {
      alert("拒绝" + id);
    },
    acquireQuest(id) {
      alert("同意" + id);
    }
  }
};
</script>

<style scoped>
.title {
  color: #909399;
}
</style>