<template>
  <div>
    <div class="only-large-screen">
      <el-header>
        <el-menu default-active="index" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="index">项目管理</el-menu-item>
          <el-menu-item index="graphs">可视化分析</el-menu-item>
          <el-menu-item index="estimation">评估预警系统</el-menu-item>
          <el-menu-item index="detection">全景监测系统</el-menu-item>
          <el-menu-item index="/" style="float:right;color:#409EFF;">返回主页</el-menu-item>
          <el-menu-item class="project" style="float:right;cursor: default;">当前项目：{{project.name}}</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="set-height">
        <el-row>
          <el-col
            :xs="{span:22,offset:1}"
            :sm="{span:22,offset:1}"
            :md="{span:20,offset:2}"
            :lg="{span:14,offset:5}"
            :xl="{span:14,offset:5}"
          >
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-main>
      <siteFooter></siteFooter>
    </div>
    <div class="only-small-screen">
      <siteHeader :header="header"></siteHeader>
      <el-main class="set-height">
        <div>
          <p>为保证良好使用体验，</p>
          <p>请使用大屏设备查看。</p>
        </div>
      </el-main>
      <siteFooter></siteFooter>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {},
      header: { menu: "项目详情", toPageName: "返回主页", to: "/" }
    };
  }
};
</script>

<style scoped>
.set-height {
  min-height: 75vh;
}
.only-small-screen {
  display: none;
}
@media screen and (max-width: 769px) {
  .only-small-screen {
    display: block;
  }
  .only-large-screen {
    display: none;
  }
  .set-height {
    text-align: center;
    color: #909399;
  }
  .set-height div {
    margin-top: 5em;
  }
}
</style>