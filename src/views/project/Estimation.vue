<template>
  <div>
    <el-form :inline="true" label-width="100px">
      <el-form-item label="材料强度阈值">
        <el-input size="mini" v-model="threshlod.strength" :width="200" placeholder="请输入阈值"></el-input>
      </el-form-item>
      <el-form-item label="设计限值">
        <el-input size="mini" v-model="threshlod.limit" :width="200" placeholder="请输入阈值"></el-input>
      </el-form-item>
      <el-form-item label="增长速率值">
        <el-input size="mini" v-model="threshlod.rate" :width="200" placeholder="请输入阈值"></el-input>
      </el-form-item>
      <el-form-item label="绝对增量值">
        <el-input size="mini" v-model="threshlod.absolute" :width="200" placeholder="请输入阈值"></el-input>
      </el-form-item>
      <el-form-item label="绝对增量值">
        <el-input size="mini" v-model="threshlod.absolute" :width="200" placeholder="请输入阈值"></el-input>
      </el-form-item>
    </el-form>
    <el-form label-width="100px">
      <el-form-item>
        <el-button size="mini" type="primary" @click="updateThreslod(threshlod)">修改</el-button>
      </el-form-item>
    </el-form>
    <p class="divider"></p>
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
    <p class="divider"></p>
    <div class="note">
      <p class="title">综合阈值法结果说明：</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      threshlod: {
        strength: 0,
        limit: 0,
        rate: 0,
        absolute: 0
      },
      estimationInfo: {
        statusLevel: "",
        damage: ""
      }
    };
  },
  methods: {
    updateThreslod(val) {
      this.$http
        .post(`/project/${this.$route.params.id}/update`, { threshlod: val })
        .then(res => {
          this.threshlod = res.data.threshlod;
          this.currentThreshlod = res.data.threshlod;
          this.$message.success("阈值修改成功。");
        });
    }
  },
  created() {
    this.$http.get(`/project/${this.$route.params.id}`).then(res => {
      this.threshlod = res.data.threshlod;
      this.currentThreshlod = res.data.threshlod;
      window.console.log(this.threshlod);
    });
    this.$http.get(`/project/${this.$route.params.id}/estimation`).then(res => {
      this.estimationInfo = res.data.estimationInfo;
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