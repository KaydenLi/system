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

    <el-main style="width:100%;min-height:80vh;">
      <el-row>
        <el-col
          :xs="{span: 24, offset: 0}"
          :sm="{span: 18, offset: 3}"
          :md="{span: 20, offset: 2}"
          :lg="{span: 20, offset: 2}"
          :xl="{span: 18, offset: 3}"
        >
          <div v-if="welcomeClose" class="welcome">
            {{name}}，你好。欢迎使用结构三维可视化监测系统！
            <i @click="closeWelcom" class="el-icon-close colse-btn"></i>
          </div>
          <div v-if="projects.length || viewableProjects.length">
            <el-card class="box-card" v-if="projects.length">
              <div slot="header" class="clearfix">
                <span>
                  我的项目
                  <i class="el-icon-question" @click="myProjectInfo"></i>
                </span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="createProjects">
                  <i class="el-icon-plus"></i>&nbsp;新建项目
                </el-button>
              </div>
              <el-table stripe :data="projects">
                <el-table-column type="index" label="序号" :index="1" width="100px"></el-table-column>
                <el-table-column prop="projectName" label="项目名称"></el-table-column>
                <el-table-column prop="date" label="创建日期"></el-table-column>
                <el-table-column prop="address" label="项目地址"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="toDetail(scope.row._id)">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card class="box-card" v-if="viewableProjects.length">
              <div slot="header" class="clearfix">
                <span>
                  可查看项目
                  <i class="el-icon-question" @click="viewableProjectInfo"></i>
                </span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toAllProjects">
                  <i class="el-icon-folder-opened"></i>&nbsp;开放项目
                </el-button>
              </div>
              <el-table stripe :data="viewableProjects">
                <el-table-column type="index" label="序号" :index="1" width="100px"></el-table-column>
                <el-table-column prop="projectName" label="项目名称"></el-table-column>
                <el-table-column prop="_id" label="项目ID"></el-table-column>
                <el-table-column prop="address" label="项目地址"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="toViewableDetail(scope.row._id)"
                    >查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </div>
          <div v-else style="text-align:center;margin-top:10rem;">
            <p>你还没有作任可操何项目。你可以</p>
            <p>
              <el-button type="text" @click="createProjects">新建项目</el-button>
              <el-button type="text" @click="toList">申请访问</el-button>
            </p>
          </div>
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
      welcomeClose: true,
      name: "userName",
      projects: [
        {
          projectName: "测试1",
          date: "2019-09-09",
          address: "wuhan",
          _id: "1"
        },
        {
          projectName: "测试2",
          date: "2019-09-09",
          address: "wuhan",
          _id: "2"
        },
        {
          projectName: "测试3",
          date: "2019-09-09",
          address: "wuhan",
          _id: "3"
        },
        {
          projectName: "测试4",
          date: "2019-09-09",
          address: "wuhan",
          _id: "4"
        },
        {
          projectName: "测试5",
          date: "2019-09-09",
          address: "wuhan",
          _id: "5"
        }
      ],
      viewableProjects: [
        {
          projectName: "测试",
          date: "2019-09-09",
          address: "wuhan",
          _id: "111"
        }
      ]
    };
  },
  methods: {
    createProjects() {
      this.$router.push("/createProjects");
    },
    toList() {
      this.$router.push("/list");
    },
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
      this.welcomeClose = false;
    },
    viewableProjectInfo() {
      this.$alert(
        "1.表中展示项目为得到授权可查看的项目。<br />2.点击<strong>开放项目</strong>可以查看所有开放的项目。<br />3.在开放项目获取授权后即可查看其他作者项目的详细信息。",
        "关于可查看项目的说明",
        {
          confirmButtonText: "确定",
          dangerouslyUseHTMLString: true
        }
      );
    },
    myProjectInfo() {
      this.$alert(
        "1.表中所列项目为您曾建立的项目。<br />2.点击<strong>新建项目</strong>即可以新建项目。<br />3.点击<strong>详情</strong>即查看对应项目的详细信息。",
        "关于可查看项目的说明",
        {
          confirmButtonText: "确定",
          dangerouslyUseHTMLString: true
        }
      );
    }
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
  margin: 10px 0;
  height: 3em;
  line-height: 3em;
  text-align: center;
  border: 1px solid rgb(228, 248, 219);
  color: #67c23a;
  border-radius: 5px;
  background-color: rgb(228, 248, 219);
}
@media screen and (max-width: 769px){
  .welcome{
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
.el-icon-question {
  color: #909399;
}
.el-icon-question:hover {
  cursor: pointer;
}
</style>