<template>
  <div>
    <siteHeader :header="header"></siteHeader>
    <el-main class="set-min-height">
      <el-row>
        <el-col
          :xs="{span: 24, offset: 0}"
          :sm="{span: 18, offset: 3}"
          :md="{span: 16, offset: 4}"
          :lg="{span: 16, offset: 4}"
          :xl="{span: 14, offset: 5}"
        >
          <el-collapse accordion v-if="list.length>0">
            <el-collapse-item v-for="item in list" :key="item._id">
              <template slot="title">
                <i v-if="item.status==='waitting'" class="el-icon-warning-outline info-icon"></i>
                <i v-else-if="item.status==='fail'" class="el-icon-circle-close danger-icon"></i>
                <i v-else class="el-icon-circle-check success-icon"></i>
                <span class="deco">{{item.userName}}</span>申请查看项目&nbsp;
                <span class="deco">{{item.projectName}}</span>
              </template>
              <p>
                <span class="item-header">申请账号：</span>
                <span @click="checkUser(item.user_id)" class="link">{{item.userName}}</span>
              </p>
              <p>
                <span class="item-header">项目名称：</span>
                <span @click="checkProject(item.project_id)" class="link">{{item.projectName}}</span>
              </p>
              <p>
                <span class="item-header">项目地址：</span>
                {{item.address}}
              </p>
              <p>
                <span class="item-header">申请时间：</span>
                {{item.date}}
              </p>

              <!-- 授权状态与授权日期 -->
              <div v-if="item.status==='waitting'">
                <p>
                  <span class="item-header">授权状态：</span>
                  等待授权
                </p>
                <p v-if="item.authdate">
                  <span class="item-header">授权日期：</span>
                  等待授权
                </p>
              </div>
              <div v-else-if="item.status==='fail'">
                <p>
                  <span class="item-header">授权状态：</span>
                  已被拒绝授权
                </p>
                <p v-if="item.authdate">
                  <span class="item-header">授权日期：</span>
                  已被拒绝授权
                </p>
              </div>
              <div v-else>
                <p>
                  <span class="item-header">授权状态：</span>
                  已获得授权
                </p>
                <p v-if="item.authdate">
                  <span class="item-header">授权日期：</span>
                  {{item.authdate}}
                </p>
              </div>
              <!-- 授权状态与授权日期 -->
              <p>
                <span class="item-header">申请理由：</span>
                {{item.description}}
              </p>
              <p v-if="item.status==='waitting'">
                <el-button type="primary" size="mini" @click="acquireQuest(item._id)">同意申请</el-button>
                <el-button type="danger" size="mini" @click="refuseQuest(item._id)">拒绝申请</el-button>
              </p>
              <p v-if="item.status==='success'">
                <el-button type="danger" size="mini" @click="deleteItem(item._id)">删除记录</el-button>
              </p>
              <p v-if="item.status==='fail'">
                <el-button type="danger" size="mini" @click="deleteItem(item._id)">删除记录</el-button>
              </p>
            </el-collapse-item>
          </el-collapse>
          <div v-else class="no-data">您还没有授权过任何项目。</div>
        </el-col>
      </el-row>
    </el-main>
    <siteFooter></siteFooter>
  </div>
</template>

<script>
import listData from "../../mockData/authProjects.js";
export default {
  data() {
    return {
      header: { menu: "项目授权", toPageName: "返回首页", to: "/" },
      list: []
    };
  },
  methods: {
    checkUser(id) {
      this.$router.push(`/user/${id}/show`);
    },
    checkProject(id) {
      this.$router.push(`/project/${id}`);
    },
    acquireQuest(id) {
      //TODO:数据库操作
      window.console.log("接受" + id);
      this.$confirm("确定接受该申请吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已同意该申请!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    refuseQuest(id) {
      //TODO:数据库操作
      window.console.log("接受" + id);
      this.$confirm("确定拒绝该申请吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已拒绝该申请!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    deleteItem(id) {
      //TODO:数据库操作
      window.console.log("接受" + id);
      this.$confirm("确定删除该记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已删除记录!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  created() {
    //TODO:获取数据
    this.list = listData.toCheck.concat(listData.getChecked);
    // this.list = [];
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/item.scss";
</style>