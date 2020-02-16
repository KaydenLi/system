<template>
  <div>
    <el-header>
      <el-menu default-active="index" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="index">项目管理</el-menu-item>
        <el-menu-item index="graphs">可视化图形分析</el-menu-item>
        <el-menu-item index="estimation">评估预警系统</el-menu-item>
        <el-menu-item index="detection">全景监测系统</el-menu-item>
        <el-menu-item index="/" style="float:right;color:#409EFF;">返回主页</el-menu-item>
        <el-menu-item class="project" style="float:right;cursor: default;">当前项目：{{project.name}}</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <siteFooter></siteFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {
        name: "测试",
        address: "wuhan"
      }
    };
  }
};
</script>

<style scoped>
</style>