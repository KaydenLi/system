<template>
  <div>
    <div class="upload-title">上传文件</div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传obj/mtl文件，且不超过50MB</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove() {},
    handlePreview() {}
  }
};
</script>

<style lang="scss" scoped>
.upload-title {
 padding-bottom: 20px;
}
</style>