<template>
  <div>
    <el-alert
      v-if="projectInfo.obj"
      class="info"
      title="你已上传文件，点击下方按钮即可重新上传。"
      type="info"
      show-icon
    ></el-alert>
    <el-upload
      :limit="1"
      :on-exceed="handleExceed"
      class="upload-demo"
      ref="uploadobj"
      :action="$http.defaults.baseURL+'/upload/obj'"
      :on-success="afterUploadObj"
    >
      <el-button slot="trigger" size="small" type="primary">选取obj文件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传obj文件</div>
    </el-upload>
    <el-upload
      :limit="1"
      :on-exceed="handleExceed"
      class="upload-demo"
      ref="uploadmtl"
      :action="$http.defaults.baseURL+'/upload/mtl'"
      :on-success="afterUploadMtl"
    >
      <el-button slot="trigger" size="small" type="primary">选取mtl文件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传mtl文件</div>
    </el-upload>
    <el-button size="small" type="success" @click="submitUpload">上传文件</el-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      obj: "",
      mtl: "",
      objlist: [],
      mtllist: []
    };
  },
  computed: {
    ...mapState(["projectInfo"])
  },
  methods: {
    ...mapMutations(["INIT_CURRENT_PROJECT_INFO"]),
    async submitUpload() {
      let model = {};
      model.obj = this.obj;
      model.mtl = this.mtl;
      this.$http
        .post(`/project/${this.$route.params.id}/updatemodel`, model)
        .then(res => {
          this.INIT_CURRENT_PROJECT_INFO(res.data);
          this.$refs.uploadmtl.clearFiles();
          this.$refs.uploadobj.clearFiles();
          this.$message.success("文件已加载到项目");
        });
    },
    afterUploadObj(res) {
      this.obj = res.url;
      this.$message.success("obj文件上传成功");
    },
    afterUploadMtl(res) {
      this.mtl = res.url;
      this.$message.success("mtl文件上传成功");
    },
    handleExceed() {
      this.$message.error("每次只能上传一个文件");
    }
  }
};
</script>

<style lang="scss" scoped>
.input {
  width: 50%;
}
.upload-title {
  padding-bottom: 20px;
}
.upload-demo {
  margin-bottom: 20px;
}
.info {
  margin: 0 0 10px 0;
}
</style>