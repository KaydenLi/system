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
          <!-- start baidu map -->
          <keep-alive>
            <baidu-map
              ak="uo6L73tzaIMlLDgXZiw1xXM6ntgBL8EQ"
              class="map"
              center="湖北省武汉市"
              @ready="showPoint"
            >
              <div v-if="projects.length>0">
                <bm-local-search
                  v-for="project in projects"
                  :key="project._id"
                  :keyword="project.address"
                  :auto-viewport="true"
                  :location="project.province || ''+project.city||''"
                  :selectFirstResult="true"
                  :pageCapacity="1"
                  :panel="false"
                ></bm-local-search>
              </div>
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
              <bm-geolocation
                anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                :showAddressBar="true"
                :autoLocation="true"
              ></bm-geolocation>
            </baidu-map>
          </keep-alive>
          <!-- end baidu map -->
          <el-tabs type="border-card" :value="activeTab" style="min-height:450px;">
            <!-- 我的项目标签页 -->
            <el-tab-pane name="first">
              <span slot="label" @click="SET_ACTIVE_TAB(`first`)">
                <i class="el-icon-house"></i> 我的项目
              </span>
              <Header :header="projectsHeader"></Header>
              <el-table
                stripe
                :data="projects"
                :empty-text="emptyText.myprojects"
                v-loading="loading.projectsLoading"
                :row-style="{height:0+'px'}"
                :cell-style="{padding:4+'px'}"
              >
                <el-table-column type="index" label="序号" :index="1" width="100px"></el-table-column>
                <el-table-column label="项目名称" prop="projectName"></el-table-column>
                <el-table-column label="创建日期" prop="createdTime" :formatter="formatDate"></el-table-column>
                <el-table-column label="项目地址" prop="address" :formatter="formatAddress"></el-table-column>
                <el-table-column label="操作" fixed="right" width="150">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="mini"
                      :disabled="!scope.row.operationFlag"
                      @click="toDetail(scope.row._id)"
                    >详情</el-button>
                    <el-button type="danger" size="mini" @click="deleteProject(scope.row._id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 开放项目标签页 -->
            <el-tab-pane name="second">
              <span slot="label" @click="SET_ACTIVE_TAB(`second`);getApplicationProject()">
                <i class="el-icon-sold-out"></i> 开放项目
              </span>
              <Header :header="requestHeader"></Header>
              <el-table
                stripe
                :data="applicationProjects.toQuest"
                :empty-text="emptyText.requests"
                v-loading="loading.applicationLoading"
                :row-style="{height:0+'px'}"
                :cell-style="{padding:4+'px'}"
              >
                <el-table-column type="index" label="序号" :index="1" width="100px"></el-table-column>
                <el-table-column
                  v-for="item in toAuthTable"
                  :key="item._id"
                  :prop="item.prop"
                  :label="item.label"
                ></el-table-column>
                <el-table-column label="操作" fixed="right" width="100">
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
                :row-style="{height:0+'px'}"
                :cell-style="{padding:4+'px'}"
              >
                <el-table-column type="index" label="序号" :index="1" width="100px"></el-table-column>
                <el-table-column
                  v-for="item in viewablesTable"
                  :key="item._id"
                  :prop="item.prop"
                  :label="item.label"
                ></el-table-column>
                <el-table-column label="操作" fixed="right" width="100">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!scope.row.projectInfo[0].openStatus"
                      size="mini"
                      type="primary"
                      @click="toViewableDetail(scope.row.project_id)"
                    >查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 授权项目标签页 -->
            <el-tab-pane name="third">
              <span slot="label" @click="SET_ACTIVE_TAB(`third`);getAuthProject()">
                <i class="el-icon-sell"></i> 授权项目
              </span>
              <Header :header="openRequestHeader"></Header>
              <el-table
                stripe
                :data="authProjects.toCheck"
                :empty-text="emptyText.checks"
                v-loading="loading.authLoading"
                :row-style="{height:0+'px'}"
                :cell-style="{padding:4+'px'}"
              >
                <el-table-column type="index" label="序号" :index="1" width="100px"></el-table-column>
                <el-table-column
                  v-for="item in authTable"
                  :key="item.projectName"
                  :prop="item.prop"
                  :label="item.label"
                ></el-table-column>
                <el-table-column label="操作" fixed="right" width="100">
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
                :row-style="{height:0+'px'}"
                :cell-style="{padding:4+'px'}"
              >
                <el-table-column type="index" label="序号" :index="1" width="100px"></el-table-column>
                <el-table-column
                  v-for="item in authedTable"
                  :key="item.projectName"
                  :prop="item.prop"
                  :label="item.label"
                ></el-table-column>
                <el-table-column label="操作" fixed="right" width="100">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="toDetail(scope.row._id)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 用户中心标签页  -->
            <el-tab-pane name="fourth">
              <span slot="label" @click="SET_ACTIVE_TAB(`fourth`)">
                <i class="el-icon-user"></i> 用户中心
              </span>
              <Header :header="centerHeader"></Header>
              <el-alert
                v-if="fullfill"
                class="warning"
                title="你有信息未完善，点击'编辑资料'完善个人信息"
                type="warning"
                show-icon
              ></el-alert>
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
// 导入百度地图组件
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmGeolocation from "vue-baidu-map/components/controls/Geolocation.vue";
import BmNavigation from "vue-baidu-map/components/controls/Navigation.vue";
import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch.vue";
export default {
  data() {
    return {
      //表格内容为空时的占位符
      emptyText: {
        myprojects: "您还没有创建任何项目",
        requests: "没有正在进行的请求",
        viewables: "您还没有可查看的开放项目",
        checks: "暂无任何授权请求",
        opens: "您还没有开放任何项目"
      },
      //用户请求授权表格
      toAuthTable: [
        { prop: "projectInfo[0].projectName", label: "项目名称" },
        { prop: "createdTime", label: "申请日期" }
      ],
      //用户已获得授权表格
      viewablesTable: [
        { prop: "projectInfo[0].projectName", label: "项目名称" },
        { prop: "userInfo[0].userName", label: "所有者" },
        { prop: "projectInfo[0].province", label: "省份" },
        { prop: "projectInfo[0].city", label: "县市" },
        { prop: "projectInfo[0].address", label: "详细地址" }
      ],
      //等待用户授权表格
      authTable: [
        { prop: "projectInfo[0].projectName", label: "项目名称" },
        { prop: "userInfo[0].userName", label: "申请人" },
        { prop: "createdTime", label: "申请日期" },
        { prop: "projectInfo[0].province", label: "省份" },
        { prop: "projectInfo[0].city", label: "县市" },
        { prop: "projectInfo[0].address", label: "详细地址" }
      ],
      //用户已开放授权表格
      authedTable: [
        { prop: "projectName", label: "项目名称" },
        { prop: "createdTime", label: "创建日期" },
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
        title: "正在申请列表 ",
        todo: "申请记录",
        url: "/history",
        icon: "el-icon-view",
        hasQuestion: false
      },
      //标签页内用户已获得授权项目部分header
      viewableHeader: {
        title: "已获授权项目 ",
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
        title: "发放授权列表 ",
        todo: "授权记录",
        url: "/auth",
        icon: "el-icon-coordinate",
        hasQuestion: false
      },
      //标签页内用户已已开放授权项目部分header
      openHeader: {
        title: "我的开放项目 ",
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
        projectsLoading: false,
        applicationLoading: false,
        authLoading: false
      }
    };
  },
  components: {
    Header,
    User,
    BaiduMap,
    BmGeolocation,
    BmNavigation,
    BmLocalSearch
  },
  computed: {
    ...mapState([
      "projects",
      "userInfo",
      "loadingFlags",
      "authProjects",
      "applicationProjects",
      "activeTab"
    ]),
    fullfill: function() {
      if (this.userInfo.email === "") return true;
      if (this.userInfo.address === "") return true;
      return false;
    }
  },
  methods: {
    ...mapMutations([
      "INIT_PROJECTS",
      "INIT_AUTH_ABOUT_PROJECTS",
      "INIT_APPLICATION_ABOUT_PROJECTS",
      "CHANGE_LOADING",
      "SET_ACTIVE_TAB"
    ]),
    formatDate(row) {
      if (row.createdTime) {
        return row.createdTime.split("T")[0];
      } else {
        return;
      }
    },
    formatAddress(row) {
      return (
        (row.province == null ? "" : row.province) +
        " " +
        (row.city == null ? "" : row.city) +
        " " +
        row.address
      );
    },
    toDetail(id) {
      this.$http.get(`project/${id}/operation`).then(res => {
        if (res.data === true) {
          this.$router.push(`/project/${id}/index`);
        } else {
          this.$message.info("管理员还未授权使用");
        }
      });
    },
    deleteProject(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`/project/${id}`).then(res => {
            if (res.data === "ok") {
              this.getProjects();
              this.$message.success("删除成功!");
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    toViewableDetail(id) {
      this.$http.get(`/project/${id}/openstatus`).then(res => {
        if (res.data === true) {
          this.$router.push(`/project/${id}/show`);
        } else {
          this.$message.error("用户已停止开放项目");
        }
      });
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
      window.localStorage.token = "";
      window.localStorage.userName = "";
      this.$router.push("/index");
    },
    closeWelcom() {
      this.$store.commit("CLOSE_WELCOME");
    },
    getProjects() {
      this.loading.projectsLoading = true;
      this.$http.get(`project/${this.userInfo._id}/list`).then(res => {
        this.INIT_PROJECTS(res.data.projects);
        this.loading.projectsLoading = false;
      });
    },
    getApplicationProject() {
      this.loading.applicationLoading = true;
      this.$http.get("/apply/applys").then(res => {
        window.console.log(res.data);
        this.INIT_APPLICATION_ABOUT_PROJECTS(res.data);
        this.loading.applicationLoading = false;
      });
    },
    getAuthProject() {
      this.loading.authLoading = true;
      this.$http.get("/apply/auths").then(res => {
        this.INIT_AUTH_ABOUT_PROJECTS(res.data);
        this.loading.authLoading = false;
      });
    },
    showPoint() {}
  },
  created() {
    this.getProjects();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.nav {
  height: 3em;
  line-height: 3em;
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
  padding: 10px 20px;
  width: 100%;
  min-height: 100vh;
  .welcome {
    font-size: 14px;
    height: 2em;
    line-height: 2em;
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
  .map {
    width: 100%;
    height: 500px;
    margin: 20px 0;
    border-radius: 5px;
  }
  .project {
    margin: 20px 0;
    padding: 10px 10px 40px;
    .user-onfo {
      margin: 20px 0;
    }
  }
  .top-margin {
    margin-top: 80px;
  }
  .warning {
    margin: 10px 0;
  }
}
</style>