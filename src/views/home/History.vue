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
                <i v-if="item.status==='WAIT'" class="el-icon-warning-outline info-icon"></i>
                <i v-else-if="item.status==='REFUSE'" class="el-icon-circle-close danger-icon"></i>
                <i v-else-if="item.status==='CANCEL'" class="el-icon-remove-outline danger-icon"></i>
                <i v-else class="el-icon-circle-check success-icon"></i>
                您申请查看
                <span class="deco">{{item.userInfo[0].userName||"其他用户"}}</span>创建的项目：
                <span class="deco">{{item.projectInfo[0].projectName}}</span>
              </template>
              <p>
                <span class="item-header">申请账号：</span>
                <span
                  @click="chekUser(item.user_id)"
                  title="点击查看用户信息"
                  class="link"
                >{{item.userInfo[0].userName}}</span>
              </p>
              <p>
                <span class="item-header">项目名称：</span>
                <span
                  @click="checkProject(item.project_id)"
                  class="link"
                  title="点击查看项目信息"
                >{{item.projectInfo[0].projectName}}</span>
              </p>
              <p>
                <span class="item-header">项目地址：</span>
                {{(item.projectInfo[0].province||"")+" "+(item.projectInfo[0].city||"")+" "+(item.projectInfo[0].address||"")}}
              </p>
              <p>
                <span class="item-header">申请时间：</span>
                {{new Date(item.createdTime)}}
              </p>

              <!-- 授权状态与授权日期 -->
              <div v-if="item.status==='WAIT'">
                <p>
                  <span class="item-header">授权状态：</span>
                  等待授权
                </p>
                <p v-if="item.authDate">
                  <span class="item-header">授权日期：</span>
                  等待授权
                </p>
              </div>
              <div v-else-if="item.status==='RESOLVE'">
                <p>
                  <span class="item-header">授权状态：</span>
                  已授权
                </p>
                <p v-if="item.authDate">
                  <span class="item-header">授权日期：</span>
                  {{new Date(item.authDate) || ""}}
                </p>
              </div>
              <div v-else-if="item.status==='REFUSE'">
                <p>
                  <span class="item-header">授权状态：</span>
                  已被拒绝授权
                </p>
                <p v-if="item.authDate">
                  <span class="item-header">授权日期：</span>
                  已被拒绝授权
                </p>
              </div>
              <div v-else>
                <p>
                  <span class="item-header">授权状态：</span>
                  已取消申请
                </p>
                <p v-if="item.authDate">
                  <span class="item-header">授权日期：</span>
                  已取消申请
                </p>
              </div>
              <!-- 授权状态与授权日期 -->
              <p>
                <span class="item-header">申请理由：</span>
                {{item.description}}
              </p>
            </el-collapse-item>
          </el-collapse>
          <div v-else class="no-data">
            您还没有申请过任何项目。您可以点击
            <el-link href="/list" type="primary">开放项目列表</el-link>，查找满意的开放项目。
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
      header: { menu: "申请历史", toPageName: "返回首页", to: "/" },
      list: []
    };
  },
  methods: {
    chekUser(id) {
      this.$router.push(`/user/${id}/show`);
    },
    checkProject(id) {
      this.$router.push(`/project/${id}/show`);
    }
  },
  created() {
    this.$http.get("apply/applylist").then(res => {
      this.list = res.data;
      window.console.log(res.data);
    });
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/item.scss";
</style>