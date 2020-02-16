<template>
  <div>
    <el-tabs tab-position="left">
      <el-tab-pane label="项目详情">
        <el-form label-position="right" label-width="150px" :model="project">
          <el-row>
            <el-col :span="14">
              <el-form-item label="项目ID：">
                <el-input disabled v-model="project._id"></el-input>
              </el-form-item>
              <el-form-item label="名称：">
                <el-input v-model="project.projectName"></el-input>
              </el-form-item>
              <el-form-item label="创建日期：">
                <el-input disabled v-model="project.date"></el-input>
              </el-form-item>
              <el-form-item label="项目地址：">
                <el-input v-model="project.address"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="editProject">修改</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="授权查看">角色管理</el-tab-pane>
      <el-tab-pane label="任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {
        projectName: "测试",
        date: "2019-09-09",
        address: "wuhan",
        _id: "111"
      }
    };
  },
  methods: {
    editProject() {}
  }
};
</script>

<style scoped>
.el-menu-vertical-demo {
  border: none;
}
</style>