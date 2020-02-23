<template>
  <div>
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

    <el-main style="width:100%;min-height:100vh;">
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
          <el-tabs type="border-card" value="first" style="min-height:450px;">
            <el-tab-pane label="我的项目" name="first">
              <Header :header="projectsHeader"></Header>
              <el-table stripe :data="userInfo.projects">
                <el-table-column type="index" label="序号" :index="1" width="100px"></el-table-column>
                <el-table-column prop="projectName" label="项目名称"></el-table-column>
                <el-table-column prop="date" label="创建日期"></el-table-column>
                <el-table-column prop="address" label="项目地址"></el-table-column>
                <el-table-column label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="toDetail(scope.row._id)">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="可查看项目" name="second">
              <Header :header="viewableHeader"></Header>
              <el-table stripe :data="userInfo.viewables">
                <el-table-column type="index" label="序号" :index="1" width="100px"></el-table-column>
                <el-table-column prop="projectName" label="项目名称"></el-table-column>
                <el-table-column prop="_id" label="项目ID"></el-table-column>
                <el-table-column prop="address" label="项目地址"></el-table-column>
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
            <el-tab-pane label="用户中心" name="third">
              <Header :header="centerHeader"></Header>
              <User :userInfo="userInfo"></User>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-main>
    <siteFooter></siteFooter>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import { mapMutations } from "vuex";
//导入Header，在标签页面内作为页面标题使用
import Header from "../../components/HeaderinTab.vue";
import User from "../../components/User.vue";
//mockdata
import userInfo from "../../mockData/userInfo";
export default {
  data() {
    return {
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
      viewableHeader: {
        title: "项目列表 ",
        todo: "开放项目",
        url: "/list",
        icon: "el-icon-folder-opened",
        hasQuestion: true,
        alertTitle: "关于可查看项目的说明",
        message:
          "1.表中展示项目为得到授权可查看的项目。<br />2.点击<strong>开放项目</strong>可以查看所有开放的项目。<br />3.在开放项目获取授权后即可查看项目的详细信息。"
      },
      centerHeader: {
        title: "用户资料 ",
        todo: "编辑资料",
        url: "", //登录时获取用户信息，将URL改为'/user/${id}'
        icon: "el-icon-user",
        hasQuestion: false
      }
    };
  },
  components: {
    Header,
    User
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(["initUserInfo"]),
    toDetail(id) {
      this.$router.push(`/project/${id}/index`);
    },
    toViewableDetail(id) {
      this.$router.push(`/project/${id}/show`);
    },
    toAllProjects() {
      this.$router.push("/list");
    },
    logout() {
      this.$router.push("/index");
    },
    closeWelcom() {
      this.$store.commit("closeWelcome");
    },
    init() {
      //异步获取用户数据userInfo；暂时使用mock数据
      this.initUserInfo(userInfo);
      this.centerHeader.url = "/center/" + this.userInfo._id;
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped>
.nav {
  height: 4em;
  line-height: 4em;
  border-bottom: 1px solid #e4e7ed;
}
.logo {
  font-size: 20px;
  color: #303133;
}
.float-right {
  float: right;
  font-size: 14px;
}
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
}
@media screen and (max-width: 769px) {
  .welcome {
    display: none;
  }
}
.colse-btn:hover {
  cursor: pointer;
  color: #fff;
  background-color: #67c23a;
  border-radius: 50%;
}
.box-card {
  margin-bottom: 20px;
}
.closeIt {
  display: none;
}
</style>