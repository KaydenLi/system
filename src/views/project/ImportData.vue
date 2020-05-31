<template>
  <div>
    <div class="upload-title">
      <p class="title">
        导入传感器数据：
        <el-button type="primary" size="mini" @click="importExcel">导入</el-button>
      </p>
      <p class="title">
        导入obj/mtl模型：
        <el-button type="primary" size="mini" @click="importModel">导入</el-button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    importExcel() {
      this.$router.push(`/project/${this.$route.params.id}/config`);
    },
    importModel() {
      this.$router.push(`/project/${this.$route.params.id}/import`);
    }
  }
};
</script>

<style lang="scss" scoped>
.title{
  font-weight: 300;
}
</style>