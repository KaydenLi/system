<template>
  <div>
    <div class="item">
      <i class="el-icon-warning-outline"></i>
      <p>安全状态值</p>
      <p class="value">{{estimationInfo.statusLevel}}</p>
    </div>
    <div class="item">
      <i class="el-icon-link"></i>
      <p>损伤状态值</p>
      <p class="value">{{estimationInfo.damage}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      estimationInfo: {
        statusLevel: "A-",
        damage: "2"
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.item {
  border: 1px solid #e4e7ed;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
  font-weight: 300;
  i {
    font-size: 25px;
    color: #409eff;
    display: inline-block;
    padding-bottom: 10px;
    border-bottom: 1px solid #409eff;
  }
  .value {
    font-weight: 400;
    font-size: 18px;
  }
}
</style>