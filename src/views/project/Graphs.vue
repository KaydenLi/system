<template>
  <div>
    <div v-for="item in infos" :key="item.name" class="item-class">
      <p>
        <i :class="item.icon"></i>
      </p>
      <span>当前{{item.name}}</span>
      <p class="value">{{item.value}}{{item.unit}}</p>
    </div>
    <el-button type="primary" @click="dialogTableVisible = true" class="custom">自定义数据</el-button>
    <el-dialog title="添加项目当前信息" :visible.sync="dialogTableVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="信息项名称" label-width="6em">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="信息项图标" label-width="6em">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="信息项值" label-width="6em">
          <el-input v-model="form.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" label-width="6em">
          <el-input v-model="form.unit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false;cancelAddInfo()">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false;addInfo()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infos: [
        {
          name: "温度",
          icon: "el-icon-sunny",
          value: 25,
          unit: "℃"
        },
        { name: "风速", icon: "el-icon-wind-power", value: 3.5, unit: "m/s" },
        { name: "气压", icon: "el-icon-timer", value: 1.0, unit: "MPa" },
        {
          name: "风向",
          icon: "el-icon-wind-power",
          value: "西偏北15",
          unit: "°"
        }
      ],
      dialogTableVisible: false,
      form: {
        name: "信息项",
        icon: "el-icon-menu",
        value: "0",
        unit: "m/s"
      }
    };
  },
  methods: {
    cancelAddInfo() {
      this.$message("已取消添加信息项");
    },
    addInfo() {
      //TODO添加信息项
      const names = [];
      this.infos.forEach(item => {
        names.push(item.name);
      });
      if (names.indexOf(this.form.name) >= 0) {
        this.$message.error("该信息项已存在");
        return;
      }
      this.infos.push(this.form);
      this.$message.success("成功添加了一条信息项");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.item-class {
  border: 1px solid #e4e7ed;
  padding: 10px 15px;
  display: inline-block;
  margin: 10px;
  border-radius: 5px;
  text-align: center;
  font-weight: 300;
  i {
    font-size: 25px;
    color: #409eff;
    display: inline-block;
    padding-bottom: 10px;
    border-bottom: 1px solid #409eff;
  }
  .value{
    font-weight: 400;
    font-size: 18px;
  }
}
.custom{
  display: block;
  margin: 20px;
  padding: 7px;
}
</style>