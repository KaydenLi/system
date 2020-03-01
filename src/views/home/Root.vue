<template>
  <div>
    <!-- header部分 -->
    <el-header>
      <div class="nav">
        <span class="logo">结构三维可视化监测系统&nbsp;</span>
        <div class="float-right">
          <el-button size="small" @click="logout" type="primary">
            <i class="el-icon-bell"></i>
            退出登录
          </el-button>&nbsp;
        </div>
      </div>
    </el-header>

    <el-main class="main-content">
      <el-row>
        <el-col
          :xs="{span: 24, offset: 0}"
          :sm="{span: 18, offset: 3}"
          :md="{span: 20, offset: 2}"
          :lg="{span: 20, offset: 2}"
          :xl="{span: 18, offset: 3}"
        >
          <div v-if="userInfo.welcomeFlag" class="welcome">
            {{userInfo.userName}}，你好。欢迎使用结构三维可视化监测系统！
            <i
              @click="closeWelcom"
              class="el-icon-close colse-btn"
            ></i>
          </div>
          <el-tabs type="border-card" :value="activeTab" style="min-height:450px;">
            <!-- 我的项目标签页 -->
            <el-tab-pane name="first">
              <span slot="label" @click="setActiveTab(`first`)">
                <i class="el-icon-house"></i> 我的项目
              </span>
              <Header :header="projectsHeader"></Header>
              <el-table stripe :data="userInfo.projects" :empty-text="emptyText.myprojects">
                <el-table-column type="index" label="序号" :index="1" width="100px"></el-table-column>
                <el-table-column
                  v-for="item in projrctsTable"
                  :key="item.projectName"
                  :prop="item.prop"
                  :label="item.label"
                ></el-table-column>
                <el-table-column label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="toDetail(scope.row._id)">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 开放项目标签页 -->
            <el-tab-pane name="second">
              <span slot="label" @click="setActiveTab(`second`);getApplicationProject()">
                <i class="el-icon-sold-out"></i> 开放项目
              </span>
              <Header :header="requestHeader"></Header>
              <el-table
                stripe
                :data="applicationProjects.toQuest"
                :empty-text="emptyText.requests"
                v-loading="loading.applicationLoading"
              >
                <el-table-column type="index" label="序号" :index="1" width="100px"></el-table-column>
                <el-table-column
                  v-for="item in toAuthTable"
                  :key="item.projectName"
                  :prop="item.prop"
                  :label="item.label"
                ></el-table-column>
                <el-table-column label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="toApplicationDetail(scope.row._id)"
                    >操作</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <Header :header="viewableHeader" class="top-margin"></Header>
              <el-table
                stripe
                :data="applicationProjects.getAuthed"
                :empty-text="emptyText.viewables"
                v-loading="loading.applicationLoading"
              >
                <el-table-column type="index" label="序号" :index="1" width="100px"></el-table-column>
                <el-table-column
                  v-for="item in viewablesTable"
                  :key="item.projectName"
                  :prop="item.prop"
                  :label="item.label"
                ></el-table-column>
                <el-table-column label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="toViewableDetail(scope.row._id)"
                    >查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 授权项目标签页 -->
            <el-tab-pane name="third">
              <span slot="label" @click="setActiveTab(`third`);getAuthProject()">
                <i class="el-icon-sell"></i> 授权项目
              </span>
              <Header :header="openRequestHeader"></Header>
              <el-table
                stripe
                :data="authProjects.toCheck"
                :empty-text="emptyText.checks"
                v-loading="loading.authLoading"
              >
                <el-table-column type="index" label="序号" :index="1" width="100px"></el-table-column>
                <el-table-column
                  v-for="item in authTable"
                  :key="item.projectName"
                  :prop="item.prop"
                  :label="item.label"
                ></el-table-column>
                <el-table-column label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="toAuthDetail(scope.row._id)">操作</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <Header :header="openHeader" class="top-margin"></Header>
              <el-table
                stripe
                :data="authProjects.getChecked"
                :empty-text="emptyText.opens"
                v-loading="loading.authLoading"
              >
                <el-table-column type="index" label="序号" :index="1" width="100px"></el-table-column>
                <el-table-column
                  v-for="item in authedTable"
                  :key="item.projectName"
                  :prop="item.prop"
                  :label="item.label"
                ></el-table-column>
                <el-table-column label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="toDetail(scope.row._id)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 用户中心标签页 -->
            <el-tab-pane name="fourth">
              <span slot="label" @click="setActiveTab(`fourth`)">
                <i class="el-icon-user"></i> 用户中心
              </span>
              <Header :header="centerHeader"></Header>
              <User :userInfo="userInfo"></User>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-main>

    <!-- footer部分 -->
    <siteFooter></siteFooter>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
//导入Header，在标签页面内作为页面标题使用；导入user标签作为用户资料卡
import Header from "../../components/HeaderinTab.vue";
import User from "../../components/User.vue";
//mockData
import authProjectsData from "../../mockData/authProjects.js";
import applicationProjectsData from "../../mockData/applicationProjects.js";
export default {
  data() {
    return {
      //表格内容为空时的占位符
      emptyText: {
        myprojects: `您还没有创建任何项目。`,
        requests: "没有正在进行的请求。",
        viewables: "您还没有可查看的开放项目。",
        checks: "暂无任何授权请求。",
        opens: "您还没有开放任何项目。"
      },
      //用户项目表格
      projrctsTable: [
        { prop: "projectName", label: "项目名称" },
        { prop: "date", label: "创建日期" },
        { prop: "address", label: "项目地址" }
      ],
      //用户请求授权表格
      toAuthTable: [
        { prop: "projectName", label: "项目名称" },
        { prop: "project_id", label: "项目ID" },
        { prop: "date", label: "申请日期" }
      ],
      //用户已获得授权表格
      viewablesTable: [
        { prop: "projectName", label: "项目名称" },
        { prop: "project_id", label: "项目ID" },
        { prop: "address", label: "项目地址" }
      ],
      //等待用户授权表格
      authTable: [
        { prop: "projectName", label: "项目名称" },
        { prop: "userName", label: "申请人" },
        { prop: "address", label: "申请日期" }
      ],
      //用户已开放授权表格
      authedTable: [
        { prop: "projectName", label: "项目名称" },
        { prop: "date", label: "创建日期" },
        { prop: "address", label: "项目地址" }
      ],
      //标签页内用户项目部分header
      projectsHeader: {
        title: "项目列表 ",
        todo: "新建项目",
        url: "/createProjects",
        icon: "el-icon-plus",
        hasQuestion: true,
        alertTitle: "关于可查看项目的说明",
        message:
          "1.表中所列项目为您曾建立的项目。<br />2.点击<strong>新建项目</strong>即可以新建项目。<br />3.点击<strong>详情</strong>即查看对应项目的详细信息。"
      },
      //标签页内用户正在申请项目部分header
      requestHeader: {
        title: "申请列表 ",
        todo: "申请记录",
        url: "/history",
        icon: "el-icon-view",
        hasQuestion: false
      },
      //标签页内用户已获得授权项目部分header
      viewableHeader: {
        title: "授权项目列表 ",
        todo: "开放项目",
        url: "/list",
        icon: "el-icon-folder-opened",
        hasQuestion: true,
        alertTitle: "关于可查看项目的说明",
        message:
          "1.表中展示项目为得到授权可查看的项目。<br />2.点击<strong>开放项目</strong>可以查看所有开放的项目。<br />3.在开放项目获取授权后即可查看项目的详细信息。"
      },
      //标签页内等待用户授权项目部分header
      openRequestHeader: {
        title: "请求列表 ",
        todo: "所有请求",
        url: "/auth",
        icon: "el-icon-coordinate",
        hasQuestion: false
      },
      //标签页内用户已已开放授权项目部分header
      openHeader: {
        title: "开放项目列表 ",
        todo: "我的开放",
        url: "/myopen",
        icon: "el-icon-tickets",
        hasQuestion: false
      },
      //标签页内用户资料卡部分header
      centerHeader: {
        title: "用户资料 ",
        todo: "编辑资料",
        url: "/center",
        icon: "el-icon-user",
        hasQuestion: false
      },
      loading: {
        applicationLoading: false,
        authLoading: false
      }
    };
  },
  components: {
    Header,
    User
  },
  computed: {
    ...mapState([
      "userInfo",
      "loadingFlags",
      "authProjects",
      "applicationProjects",
      "activeTab"
    ])
  },
  methods: {
    ...mapMutations([
      "initAuthAboutProjects",
      "initApplicationAboutProjects",
      "changeLoading",
      "setActiveTab",
      "setAuthStatus",
      "setApplicationStatus"
    ]),
    toDetail(id) {
      this.$router.push(`/project/${id}/index`);
    },
    toViewableDetail(id) {
      this.$router.push(`/project/${id}/show`);
    },
    toAllProjects() {
      this.$router.push("/list");
    },
    toApplicationDetail(id) {
      this.$router.push(`/application/${id}`);
    },
    toAuthDetail(id) {
      this.$router.push(`/auth/${id}`);
    },
    logout() {
      this.$router.push("/index");
    },
    closeWelcom() {
      this.$store.commit("closeWelcome");
    },
    getApplicationProject() {
      if (this.applicationProjects.updated) {
        return;
      }
      this.loading.applicationLoading = true;
      setTimeout(() => {
        this.initApplicationAboutProjects(applicationProjectsData);
        this.loading.applicationLoading = false;
        this.setApplicationStatus();
        //TODO:用axios获取数据，并进行初始化
        return;
      }, 1000);
    },
    getAuthProject() {
      if (this.authProjects.updated) {
        return;
      }
      this.loading.authLoading = true;
      setTimeout(() => {
        this.initAuthAboutProjects(authProjectsData);
        this.loading.authLoading = false;
        this.setAuthStatus();
        //TODO:用axios获取数据，并进行初始化
      }, 1000);
    },
    init() {}
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.nav {
  height: 4em;
  line-height: 4em;
  border-bottom: 1px solid #e4e7ed;
  .logo {
    font-size: 20px;
    color: #303133;
  }
  .float-right {
    float: right;
    font-size: 14px;
  }
}

.main-content {
  width: 100%;
  min-height: 100vh;
  .welcome {
    font-size: 14px;
    margin: 0 0 20px;
    height: 3em;
    line-height: 3em;
    text-align: center;
    border: 1px solid rgb(228, 248, 219);
    color: #67c23a;
    border-radius: 5px;
    background-color: rgb(228, 248, 219);
    @media screen and (max-width: 769px) {
      display: none;
    }
    .colse-btn {
      &:hover {
        cursor: pointer;
        color: #fff;
        background-color: #67c23a;
        border-radius: 50%;
      }
    }
  }
  .top-margin {
    margin-top: 80px;
  }
}
</style>