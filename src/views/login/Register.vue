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
          <el-form
            :model="model"
            :rules="rules"
            ref="rules"
            status-icon
            label-width="100px"
            class="demo-ruleForm"
            label-position="left"
            @submit.native.prevent="createUser('rules')"
          >
            <el-form-item label="用户名" prop="nickName">
              <el-input v-model="model.nickName" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userPassword">
              <el-input v-model="model.userPassword" clearable type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="acknowledgement">
              <el-input v-model="model.acknowledgement" clearable type="password"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="model.phone" clearable></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verificationCode">
              <el-input v-model="model.verificationCode" clearable>
                <el-button slot="append" @click="getVerificationCode">发送验证码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" native-type="submit">创建</el-button>
              <el-button @click="cancelCreate">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/box-border.scss";
</style>>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.model.userPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      header: { menu: "注册账号", toPageName: "去登陆", to: "/login" },
      model: {
        nickName: "",
        userPassword: "",
        acknowledgement: "",
        phone: "",
        verificationCode: "0000"
      },
      rules: {
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 50, message: "长度在 6 到 50 个字符", trigger: "blur" }
        ],
        acknowledgement: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "change" }
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "长度为4个字符", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    getVerificationCode() {
      alert("当前未设置验证码验证，请忽略");
    },
    createUser(rules) {
      this.$refs[rules].validate(valid => {
        if (valid) {
          var date = new Date();
          var year = date.getFullYear();
          var month = date.getMonth();
          var day = date.getDate();
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var seconds = date.getSeconds();
          //初始化用户注册信息
          var userInfo = {};
          userInfo.userName = this.model.nickName;
          userInfo.password = this.model.userPassword;
          userInfo.phone = this.model.phone;
          userInfo.createdTime = year + "-" + (month + 1) + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
          //发送创建用户请求
          this.$http.post("user/create", userInfo).then(res => {
            let user = res.data;
            this.$message({
              message: `成功创建用户 ${user}，请登录!`,
              type: "success"
            });
            this.$router.push("/login");
          });
        } else {
          this.$message({
            message: "信息验证失败，请修改后再试!",
            type: "info"
          });
        }
      });
    },
    cancelCreate() {
      this.$message({
        message: "已取消创建用户!",
        type: "info",
        center: true
      });
      this.$router.push("/login");
      return;
    }
  }
};
</script>