<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix login-header">
        <span>登录</span>
      </div>
      <div class="box-content">
        <el-form status-icon class="demo-ruleForm" @submit.native.prevent="Login">
          <el-form-item>
            <el-input
              id="user"
              v-model="model.userName.value"
              placeholder="输入手机号"
              autocomplete="off"
              :suffix-icon="userIcon"
              @blur="checkUserName"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              id="password"
              :type="inputType"
              v-model="model.password.value"
              autocomplete="off"
              placeholder="输入密码"
            >
              <i
                class="el-icon-view el-input__icon"
                type="primary"
                slot="suffix"
                @click="togglePassword"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item class="centerBtn">
            <el-button type="primary" native-type="submit">登录</el-button>
          </el-form-item>
          <el-form-item class="centerBtn">
            <el-button type="text" size="mini" @click="getRegisterPage">注册账号</el-button>
            <el-button type="text" size="mini" @click="getForgetPage">忘记密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.box-card {
  width: 25rem;
  margin: 6rem auto;
}
.box-content {
  margin-top: 20px;
  padding: 0;
}
.login-header {
  text-align: center;
}
.login-header span {
  font-size: 1.5em;
}
.centerBtn {
  text-align: center;
}
@media screen and (max-width: 769px) {
  .box-card {
    padding-top: 100px;
    width: 100%;
    height: 100%;
    border: none;
    box-shadow: none;
  }
  .box-content {
    margin-top: 20px;
    padding: 0;
    border: none;
    box-shadow: none;
  }
}
</style>

<script>
//mockdata
import userInfo from "../../mockData/userInfo";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      model: {
        userName: {
          type: Number,
          value: "13456789000"
        },
        password: {
          type: String,
          value: "123456"
        }
      },
      userIcon: "el-icon-loading",
      passwordIcon: "el-icon-loading",
      inputType: "password"
    };
  },
  methods: {
    ...mapMutations(["initUserInfo"]),
    checkUserName() {
      if (!/^1[3456789]\d{9}$/.test(this.model.userName.value)) {
        this.userIcon = "el-icon-circle-close";
      } else {
        this.userIcon = "el-icon-circle-check";
      }
    },
    togglePassword() {
      if (this.inputType === "password") {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
    },
    getRegisterPage() {
      this.$router.push("/register");
    },
    getForgetPage() {
      this.$router.push("/forget");
    },
    Login() {
      if (!this.model.userName.value) {
        this.$message({
          message: "账号不能为空!",
          type: "error"
        });
        return;
      }
      if (!this.model.password.value) {
        this.$message({
          message: "请输入密码!",
          type: "error",
          center: true
        });
        return;
      }
      // const userInfo = await this.$http.post('login',this.model);
      this.initUserInfo(userInfo);
      this.$message({
        message: "登录成功!",
        type: "success",
        center: true
      });
      this.$router.push("/");
    }
  },
  created() {
    if (this.model.userName.value) {
      this.checkUserName();
    }
  }
};
</script>