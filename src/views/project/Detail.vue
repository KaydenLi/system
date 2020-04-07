<template>
  <div>
    <el-container class="only-large-screen">
      <el-aside :class="{hideSideBar:toogleSideBar,showSideBar:!toogleSideBar}" style="width:200px">
        <el-menu
          router
          unique-opened
          :default-active="$route.path.split('/').pop()"
          class="el-menu-demo"
        >
          <el-submenu index="0">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span class="menu-title">项目构建</span>
            </template>
            <el-menu-item index="index">
              <i class="menu-item-icon el-icon-minus"></i>基本信息
            </el-menu-item>
            <el-menu-item index="config">
              <i class="menu-item-icon el-icon-minus"></i>测点布置
            </el-menu-item>
          </el-submenu>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-data-line"></i>
              <span class="menu-title">数据可视化</span>
            </template>
            <el-menu-item index="tables">
              <i class="menu-item-icon el-icon-minus"></i>表格显示
            </el-menu-item>
            <el-menu-item index="lines">
              <i class="menu-item-icon el-icon-minus"></i>曲线显示
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-view"></i>
              <span class="menu-title">全景可视化</span>
            </template>
            <el-menu-item index="detection">
              <i class="menu-item-icon el-icon-minus"></i>监测系统
            </el-menu-item>
            <el-menu-item index="import">
              <i class="menu-item-icon el-icon-minus"></i>导入模型
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-bell"></i>
              <span class="menu-title">评估与预警</span>
            </template>
            <el-menu-item index="setlimit">
              <i class="menu-item-icon el-icon-minus"></i>阈值设定
            </el-menu-item>
            <el-menu-item index="estimation">
              <i class="menu-item-icon el-icon-minus"></i>综合阈值法评估
            </el-menu-item>
            <el-menu-item index="lifemethod">
              <i class="menu-item-icon el-icon-minus"></i>剩余寿命评估
            </el-menu-item>
            <el-menu-item index="record">
              <i class="menu-item-icon el-icon-minus"></i>历史评估结果
            </el-menu-item>
            <el-menu-item index="rules">
              <i class="menu-item-icon el-icon-minus"></i>自定义规则
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-receiving"></i>
              <span class="menu-title">数据与报表</span>
            </template>
            <el-menu-item index="importdata">
              <i class="menu-item-icon el-icon-minus"></i>数据导入
            </el-menu-item>
            <el-menu-item index="outputdata">
              <i class="menu-item-icon el-icon-minus"></i>数据导出
            </el-menu-item>
            <el-menu-item index="report">
              <i class="menu-item-icon el-icon-minus"></i>报告生成
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="set-height">
        <el-header class="content-header" height="40px">
          <i class="el-icon-s-grid header-icon" title="隐藏/显示侧边栏" @click="TOOGLE_SIDE_BAR"></i>
          <span>{{projectInfo.projectName}}结构三维可视化监测系统</span>
          <i class="el-icon-switch-button header-icon" title="退出当前项目" @click="quitCurProject"></i>
        </el-header>
        <router-view class="router-container"></router-view>
      </el-main>
    </el-container>
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
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      header: { menu: "项目详情", toPageName: "返回主页", to: "/" }
    };
  },
  computed: {
    ...mapState(["toogleSideBar", "projectInfo"])
  },
  methods: {
    ...mapMutations(["TOOGLE_SIDE_BAR", "INIT_CURRENT_PROJECT_INFO"]),
    quitCurProject() {
      this.$router.push("/");
    }
  },
  created() {
    let id = this.$route.params.id;
    this.$http.get(`project/${id}`).then(res => {
      this.INIT_CURRENT_PROJECT_INFO(res.data);
    });
  }
};
</script>

<style lang="scss" scoped>
.only-large-screen {
  @media screen and (max-width: 769px) {
    display: none;
  }
  .hideSideBar {
    animation: hideSideBar 0.5s forwards;
  }
  .showSideBar {
    animation: showSideBar 0.5s forwards;
  }
  .el-aside {
    background-color: rgb(238, 241, 246);
    .menu-title {
      font-weight: 600;
    }
    .menu-item-icon {
      font-size: 12px;
    }
  }
  .el-main {
    height: 100vh;
    padding: 0;
    padding-top: 10px;
    .content-header {
      line-height: 30px;
      text-align: center;
      border-bottom: 1px solid #e4e7ed;
      .el-icon-s-grid {
        float: left;
        line-height: 30px;
      }
      .el-icon-switch-button {
        float: right;
        line-height: 30px;
      }
      .header-icon {
        color: #409eff;
        cursor: pointer;
      }
      span {
        font-size: 18px;
      }
    }
    .router-container {
      padding: 20px;
      // height: 90vh;
      // overflow: hidden;
    }
  }
}
@keyframes hideSideBar {
  from {
  }
  to {
    width: 0;
  }
}
@keyframes showSideBar {
  from {
    width: 0;
  }
  to {
  }
}
.only-small-screen {
  display: none;
  @media screen and (max-width: 769px) {
    display: block;
  }
  .set-height {
    text-align: center;
    color: #909399;
    div {
      margin-top: 5em;
    }
  }
}
</style>