<template>
  <div>
    <div class="item">
      <i class="el-icon-warning-outline"></i>
      <p>安全状态值</p>
      <p class="value">{{lifeEstimationInfo.statusLevel}}</p>
    </div>
    <div class="item">
      <i class="el-icon-link"></i>
      <p>损伤状态值</p>
      <p class="value">{{lifeEstimationInfo.damage}}</p>
    </div>
    <p class="divider"></p>
    <div class="note">
      <p class="title">剩余寿命评估结果说明：</p>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lifeEstimationInfo: {
        statusLevel: "",
        damage: ""
      }
    };
  },
  methods: {},
  created() {
    this.$http
      .get(`/project/${this.$route.params.id}/lifeestimation`)
      .then(res => {
        this.lifeEstimationInfo = res.data.lifeEstimationInfo;
      });
  }
};
</script>

<style lang="scss" scoped>
.divider {
  border-bottom: 1px solid #e4e7ed;
  margin: 20px 0;
}
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
.note {
  margin-top: 30px;
  font-weight: 300;
  .title {
    font-weight: 400;
  }
}
</style>