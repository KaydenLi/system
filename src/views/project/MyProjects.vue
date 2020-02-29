<template>
  <div>
    <el-form label-position="right" label-width="150px" :model="project">
      <el-form-item label="项目封面：">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload/avatars'"
          :show-file-list="false"
          :on-success="handleSuccess"
        >
          <img v-if="project.img" :src="project.img" class="avatar el-upload" />
          <i v-else class="el-icon-plus avatar-uploader-icon el-upload"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb。建议尺寸为：400*300。</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="项目ID：">
        <el-input disabled v-model="project._id"></el-input>
      </el-form-item>
      <el-form-item label="项目名称：">
        <el-input v-model="project.projectName"></el-input>
      </el-form-item>
      <el-form-item label="所有者：">
        <el-input disabled v-model="project.owner"></el-input>
      </el-form-item>
      <el-form-item label="项目地址：">
        <el-input v-model="project.address"></el-input>
      </el-form-item>
      <el-form-item label="开放授权数：">
        <el-input disabled v-model="project.watcher"></el-input>
      </el-form-item>
      <el-form-item label="项目地址：">
        <el-input v-model="project.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editProject">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {}
    };
  },
  components: {},
  methods: {
    editProject() {
      this.$message.info(`修改`);
    },
    handleSuccess() {
      this.$message.info(`封面图片上传成功`);
    }
  },
  created() {
    //TODO:通过axios获取对应ID的项目信息
    this.project = {
      _id: "1",
      projectName: "测试1",
      owner: "kaydenli",
      owner_id: "1",
      date: "2019-09-08",
      address: "wuhan",
      watcher: 1234,
      img:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      timePoints: "",
      idPoints: ""
    };
  }
};
</script>

<style scoped>
.el-menu-vertical-demo {
  border: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 400px;
  height: 300px;
  line-height: 300px;
  text-align: center;
}
.avatar {
  width: 400px;
  height: 300px;
  display: block;
}
</style>