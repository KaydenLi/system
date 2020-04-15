<template>
  <div class="user-container">
    <div class="user-info">
      <div class="left">
        <div class="avatar">
          <img :src="userInfo.img" alt="头像" />
        </div>
        <p>
          <i class="el-icon-user"></i>
          &nbsp;{{userInfo.userName}}
        </p>
        <p>
          <i class="el-icon-message"></i>
          &nbsp;{{userInfo.email||"邮箱待完善"}}
        </p>
        <p>
          <i class="el-icon-mobile-phone"></i>
          &nbsp;{{userInfo.phone}}
        </p>
      </div>
      <div class="right">
        <table>
          <tr>
            <th class="title">ID</th>
            <td>
              <i class="el-icon-house small-screen-show"></i>
              {{userInfo._id}}
            </td>
          </tr>
          <tr>
            <th class="title">用户权限</th>
            <td>
              <i class="el-icon-s-check small-screen-show"></i>
              {{userType}}
            </td>
          </tr>
          <tr>
            <th class="title">用户住址</th>
            <td>
              <i class="el-icon-place small-screen-show"></i>
              {{userInfo.address||"地址待完善"}}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: null
  },
  computed: {
    userType() {
      return this.userInfo.adminFlag == true ? "管理员" : "普通用户";
    }
  }
};
</script>

<style scoped>
.user-container {
  margin-top: 10px;
  display: inline-block;
  text-align: center;
}
.user-info {
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.left {
  height: 100%;
  text-align: center;
  padding: 20px;
}
.left p i {
  color: #409eff;
}
.right {
  padding-left: 20px;
  border-left: 1px solid #ebeef5;
}
.avatar img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
}
.title {
  height: 3em;
  line-height: 3em;
  text-align: right;
  padding-right: 30px;
}
.small-screen-show {
  display: none;
}
@media screen and (max-width: 769px) {
  .avatar img {
    width: 50px;
    height: 50px;
  }
  .title {
    display: none;
  }
  .left {
    padding: 0;
    margin: 0;
  }
  .right {
    border: none;
    padding: 0;
    margin: 0;
  }
  .small-screen-show {
    display: inline-block;
    color: #409eff;
  }
}
</style>>
