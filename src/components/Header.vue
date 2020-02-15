<template>
  <div class="divder">
    <span>
      <i class="el-icon-menu"></i>
      &nbsp;{{menu}}
    </span>
    <el-button class="menu-back-btn" size="mini" type="primary" @click="toSomePage">{{toPageName}}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    menu: String,
    toPageName: String,
    to: String
  },
  methods: {
    toSomePage() {
      this.$router.push(`${this.to}`);
    }
  }
};
</script>

<style scoped>
.divder {
  margin: 20px;
  border-bottom: 1px solid #dcdfe6;
  padding: 0 0 15px 0;
}
.menu-back-btn{
  float: right;
  padding: 7px 12px;
}
@media screen and (max-width: 769px) {
  .divder {
    margin: 0 0 10px 0;
    padding: 10px 15px;
  }
}
</style>