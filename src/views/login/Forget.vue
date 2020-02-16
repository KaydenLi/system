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
          >
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="model.phone" clearable></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verificationCode">
              <el-input v-model="model.verificationCode" clearable>
                <el-button slot="append" @click="getVerificationCode">发送验证码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="userPassword">
              <el-input v-model="model.userPassword" clearable type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="acknowledgement">
              <el-input v-model="model.acknowledgement" clearable type="password"></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="(changePassword('rules'))">更改</el-button>
              <el-button @click="cancelCreate">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<style scoped>
.border {
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 30px;
}
@media screen and (max-width: 767px) {
  .border {
    border: none;
  }
}
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
      header: {
        menu: "忘记密码",
        toPageName: "去登陆",
        to: "/login"
      },
      model: {
        userPassword: "",
        acknowledgement: "",
        phone: "",
        verificationCode: ""
      },
      rules: {
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
      alert("验证码已发送");
    },
    changePassword(rules) {
      this.$refs[rules].validate(valid => {
        if (valid) {
          alert("submit!");
          //TODO:路由到登录页面
        } else {
          return false;
        }
      });
    },
    cancelCreate() {
      this.$message({
        message: "已取消修改密码!",
        type: "info",
        center: true
      });
      this.$router.push("/login");
      return;
    }
  }
};
</script>