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
            label-width="100px"
            class="demo-ruleForm"
            label-position="left"
          >
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="model.projectName" clearable></el-input>
            </el-form-item>
            <el-form-item label="项目地址" prop="address">
              <el-input v-model="model.address" clearable></el-input>
            </el-form-item>
            <div id="container"></div>
            <el-form-item label="结构类型" prop="type">
              <el-input v-model="model.type" clearable></el-input>
            </el-form-item>
            <el-form-item label="申请说明" prop="aim">
              <el-input
                v-model="model.aim"
                clearable
                type="textarea"
                rows="5"
                maxlength="100"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="(createProject('rules'))">申请创建</el-button>
            </el-form-item>
          </el-form>
          <p style="color:#909399;font-size:14px;">
            *注意：以上输入项只是项目的部分必须信息，诸如数据导入等更多的
            <strong>&nbsp;设置&nbsp;</strong>需要进一步完善！当您的项目审核通过后,您可以在&nbsp;
            <strong>主页</strong>=>
            <strong>我的项目</strong>=>
            <strong>详情</strong>=>
            <strong>项目构建</strong>&nbsp;页面进行详细配置、进行更多操作。
          </p>
        </el-col>
      </el-row>
    </el-main>
    <siteFooter></siteFooter>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/box-border.scss";
</style>>

<script>
export default {
  data() {
    return {
      header: {
        menu: "新建项目",
        toPageName: "返回主页",
        to: "/"
      },
      model: {
        projectName: "项目名称",
        address: "湖北省武汉市洪山区",
        aim: "用于！！！项目申请理由。",
        type: "钢筋混凝土结构",
        createdTime: ""
      },
      rules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "change"
          }
        ],
        address: [
          { required: true, message: "请输入项目所在地", trigger: "blur" },
          {
            min: 6,
            max: 50,
            message: "长度在 6 到 50 个字符",
            trigger: "change"
          }
        ],
        aim: [
          {
            required: true,
            message: "请输入申请理由，用于审核",
            trigger: "blur"
          },
          {
            min: 10,
            max: 100,
            message: "长度在 10 到 100 个字符",
            trigger: "change"
          }
        ],
        type: [
          { required: true, message: "请输入结构类型", trigger: "blur" },
          {
            min: 2,
            max: 30,
            message: "长度在 2 到 30 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    // BmLocalSearch
  },
  methods: {
    getVerificationCode() {
      alert("获取验证码");
    },
    createProject(rules) {
      this.$refs[rules].validate(valid => {
        if (valid) {
          let date = new Date();
          this.model.createdTime = date;
          this.model.projectName = this.model.projectName.trim();
          this.$http.post("project/create", this.model).then(res => {
            this.$message.success(`新建项目${res.data.projectName}成功，等待管理员授权后即可使用`);
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>