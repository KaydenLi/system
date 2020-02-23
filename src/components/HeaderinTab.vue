<template>
  <div class="container-in-tab">
    <span>{{header.title}}</span>&nbsp;
    <i v-if="header.hasQuestion" class="el-icon-question" @click="questionHandler()"></i>
    <el-button class="btn-class" @click="handleClick()" size="mini" type="primary">
      <i :class="header.icon"></i>
      &nbsp;{{header.todo}}
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      title: String,
      todo: String,
      url: String,
      icon: String,
      hasQuestion: { type: Boolean, default: true },
      message: String,
      alertTitle: String
    }
  },
  methods: {
    handleClick() {
      this.$router.push(this.header.url);
    },
    questionHandler() {
      this.$alert(this.header.message, this.header.alertTitletitle, {
        confirmButtonText: "确定",
        dangerouslyUseHTMLString: true
      });
    }
  }
};
</script>
<style scoped>
.container-in-tab {
  margin: 20px 0;
  position: relative;
  padding: 0 0 10px;
  border-bottom: 1px solid #dcdfe6;
}
.btn-class {
  float: right;
  padding: 7px;
}
.el-icon-question {
  color: #909399;
}
.el-icon-question:hover {
  cursor: pointer;
}
</style>