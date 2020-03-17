<template>
  <div>
    <el-container class="only-large-screen">
      <el-aside :class="{hideSideBar:toogleSideBar,showSideBar:!toogleSideBar}">
        <el-menu
          router
          :default-active="this.$route.path"
          :default-open="[1]"
          unique-opened
          class="el-menu-demo"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span class="menu-title">构建项目</span>
            </template>
            <el-menu-item index="index">
              <i class="menu-item-icon el-icon-minus"></i>基本信息
            </el-menu-item>
            <el-menu-item index="config">
              <i class="menu-item-icon el-icon-minus"></i>配置信息
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-data-line"></i>
              <span class="menu-title">可视化</span>
            </template>
            <el-menu-item index="graphs">
              <i class="menu-item-icon el-icon-minus"></i>总体信息
            </el-menu-item>
            <el-menu-item index="tables">
              <i class="menu-item-icon el-icon-minus"></i>表格显示
            </el-menu-item>
            <el-menu-item index="lines">
              <i class="menu-item-icon el-icon-minus"></i>波动统计
            </el-menu-item>
            <el-menu-item index="important">
              <i class="menu-item-icon el-icon-minus"></i>关键结点
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-view"></i>
              <span class="menu-title">全景监测</span>
            </template>
            <el-menu-item index="detection">
              <i class="menu-item-icon el-icon-minus"></i>全景监测系统
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-bell"></i>
              <span class="menu-title">评估预警</span>
            </template>
            <el-menu-item index="estimation">
              <i class="menu-item-icon el-icon-minus"></i>当前状态
            </el-menu-item>
            <el-menu-item index="history">
              <i class="menu-item-icon el-icon-minus"></i>历史记录
            </el-menu-item>
            <el-menu-item index="rules">
              <i class="menu-item-icon el-icon-minus"></i>自定义规则
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="set-height">
        <el-header class="content-header" height="40px">
          <i class="el-icon-s-grid header-icon" title="隐藏/显示侧边栏" @click="TOOGLE_SIDE_BAR"></i>
          <span>{{project.name}}结构三维可视化监测系统</span>
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
      project: {
        name: "湖北省武汉市洪山区华中科技大学xxxxxx建设项目"
      },
      header: { menu: "项目详情", toPageName: "返回主页", to: "/" }
    };
  },
  computed: {
    ...mapState(["toogleSideBar"])
  },
  methods: {
    ...mapMutations(["TOOGLE_SIDE_BAR"]),
    quitCurProject() {
      this.$router.push("/");
    }
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
      height: 90vh;
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