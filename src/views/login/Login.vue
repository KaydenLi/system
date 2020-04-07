<template>
  <div>
    <siteHeader :header="header"></siteHeader>
    <el-main>
      <el-row>
        <el-col
          class="border"
          :xs="{span: 24, offset: 0}"
          :sm="{span: 18, offset: 3}"
          :md="{span: 14, offset: 5}"
          :lg="{span: 8, offset: 8}"
          :xl="{span: 8, offset: 8}"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix login-header">
              <span>登录</span>
            </div>
            <div class="box-content">
              <el-form status-icon class="demo-ruleForm" @submit.native.prevent="Login">
                <el-form-item>
                  <el-input
                    id="user"
                    v-model="model.phone"
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
                    v-model="model.password"
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
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<style lang="scss" scoped>
.box-card {
  width: 25em;
  margin: 3em auto;
  @media screen and (max-width: 769px) {
    padding-top: 50px;
    width: 100%;
    height: 100%;
    margin-top: 0;
    border: none;
    box-shadow: none;
  }
  .box-content {
    margin-top: 20px;
    padding: 0;
    @media screen and (max-width: 769px) {
      margin-top: 20px;
      padding: 0;
      border: none;
      box-shadow: none;
    }
    .centerBtn {
      text-align: center;
    }
  }
  .login-header {
    text-align: center;
    span {
      font-size: 1.5em;
    }
  }
}
</style>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      header: { menu: "登录", toPageName: "取消登录", to: "/index" },
      model: {
        phone: "15752084956",
        password: "12345678"
      },
      userIcon: "el-icon-loading",
      passwordIcon: "el-icon-loading",
      inputType: "password"
    };
  },
  methods: {
    ...mapMutations(["INIT_USER_INFO"]),
    checkUserName() {
      if (!/^1[3456789]\d{9}$/.test(this.model.phone)) {
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
      if (!this.model.phone) {
        this.$message({
          message: "账号不能为空!",
          type: "error"
        });
        return;
      }
      if (!this.model.password) {
        this.$message({
          message: "请输入密码!",
          type: "error",
          center: true
        });
        return;
      }
      var loginForm = {};
      loginForm.phone = this.model.phone;
      loginForm.password = this.model.password;
      this.$http.post("user/login", this.model).then(res => {
        window.console.log(res.data);
        this.INIT_USER_INFO(res.data.userInfo);
        localStorage.token = res.data.token;
        this.$message({
          message: "登录成功!",
          type: "success",
          center: true
        });
        this.$router.push("/");
      });
    }
  },
  created() {}
};
</script>