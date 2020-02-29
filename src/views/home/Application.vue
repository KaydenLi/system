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
            {{quest.projectName}}
          </p>
          <p>
            <span class="title">项目地址：</span>
            {{quest.address}}
          </p>
          <p>
            <span class="title">所有者：</span>
            {{quest.userName}}
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
    cancelQuest(id) {
      alert("取消" + id);
    }
  },
  created() {
    //TODO:根据ID获取具体请求的数据
  }
};
</script>

<style scoped>
.title {
  color: #909399;
}
</style>