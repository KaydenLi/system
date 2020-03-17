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
    <div class="item">
      <i class="el-icon-data-analysis"></i>
      <p>超限测点数</p>
      <p class="value">{{estimationInfo.overLevel}}</p>
    </div>
    <div class="item">
      <i class="el-icon-pie-chart"></i>
      <p>超限百分比</p>
      <p class="value">{{estimationInfo.proportion}}</p>
    </div>
    <div class="item">
      <i class="el-icon-bell"></i>
      <p>历史预警数</p>
      <p class="value">{{estimationInfo.hisNCount}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      estimationInfo: {
        statusLevel: "A",
        damage: "1",
        overLevel: 9,
        proportion: 0.1,
        hisNCount: 0
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
    border-bottom:1px solid #409eff ;
  }
  .value{
    font-weight: 400;
    font-size: 18px;
  }
}
</style>