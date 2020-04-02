<template>
  <div>
    <span class="upload-title">选择上传文件类型：</span>
    <el-select size="mini" v-model="upType">
      <el-option v-for="up in ups" :key="up" :label="up" :value="up"></el-option>
    </el-select>
    <el-divider></el-divider>
    <div v-if="flag">
      <el-form label-width="100px">
        <el-form-item label="iframe地址">
          <el-input class="input" size="mini" v-model="frameUrl"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="!flag">
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
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传obj/mtl文件，且不超过50MB</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      ups: ["iframe上传", "obj文件上传"],
      upType: "iframe上传"
    };
  },
  computed: {
    flag: function() {
      return this.upType === this.ups[0] ? true : false;
    }
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
.input {
  width: 50%;
}
.upload-title {
  padding-bottom: 20px;
}
</style>