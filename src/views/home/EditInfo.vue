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
          :lg="{span: 10, offset: 7}"
          :xl="{span: 8, offset: 8}"
        >
          <el-form
            :model="model"
            :rules="rules"
            ref="rules"
            status-icon
            label-width="80px"
            class="demo-ruleForm"
            label-position="right"
          >
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="model.userName" clearable></el-input>
            </el-form-item>
            <el-form-item label="修改头像">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+'/upload/img'"
                :show-file-list="false"
                :on-success="afterUpload"
              >
                <img v-if="model.img" :src="model.img" class="avatar el-upload" />
                <i v-else class="el-icon-plus avatar-uploader-icon el-upload"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="model.phone" clearable :disabled="disabledChangePhone">
                <el-button slot="append" @click="changePhone">更换手机号</el-button>
              </el-input>
            </el-form-item>
            <el-form-item v-if="showVerifyCode" label="验证码" prop="verificationCode">
              <el-input v-model="model.verificationCode" clearable>
                <el-button slot="append" @click="getVerificationCode">发送验证码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="model.email" clearable></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="model.address" clearable></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="(editUser('rules'))">修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <siteFooter></siteFooter>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      showVerifyCode: false,
      disabledChangePhone: true,
      model: {
        img: "",
        userName: "kayden",
        phone: "",
        email: "kayden@qq.com",
        address: "华中科技大学",
        verificationCode: ""
      },
      header: {
        menu: "编辑资料",
        toPageName: "返回主页",
        to: "/"
      },
      getVerificationCode() {
        alert("获取验证码");
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "change" }
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "长度为4个字符", trigger: "change" }
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          {
            min: 6,
            max: 50,
            message: "长度在 6 到 50 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(["INIT_USER_INFO"]),
    changePhone() {
      this.disabledChangePhone = false;
      this.showVerifyCode = true;
    },
    editUser(rules) {
      this.$refs[rules].validate(valid => {
        if (valid) {
          this.$http
            .post(`/user/update/${this.userInfo._id}`, this.model)
            .then(res => {
              this.INIT_USER_INFO(res.data);
              this.$message.success("信息更新成功");
            });
        } else {
          return false;
        }
      });
      //TODO：修改信息
      //TODO：修改state.userInfo
    },
    handleAvatarSuccess() {
      this.$message.info(`头像上传成功`);
    },
    afterUpload(res) {
      this.$set(this.model, "img", res.url);
    }
  },
  created() {
    this.model.img = this.userInfo.img;
    this.model.userName = this.userInfo.userName;
    this.model.phone = this.userInfo.phone;
    this.model.email = this.userInfo.email;
    this.model.address = this.userInfo.address;
  }
};
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 30px;
  @media screen and (max-width: 769px) {
    border: none;
    box-shadow: none;
    .demo-ruleForm {
      margin: 0;
      padding: 0;
    }
  }
  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
}
</style>