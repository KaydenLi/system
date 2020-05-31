<template>
  <div>
    <div class="root">根域名：{{root}}</div>
    <el-table :data="apis" stripe :row-style="{height:0+'px'}" :cell-style="{padding:4+'px'}">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" label-width="100px" class="demo-table-expand">
            <el-form-item label="接口">
              <span>{{root+ props.row.api }}</span>
            </el-form-item>
            <el-form-item label="功能">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item label="返回值">
              <span>{{ props.row.back }}</span>
            </el-form-item>
            <el-form-item label="返回内容">
              <span>{{ props.row.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="api" label="接口"></el-table-column>
      <el-table-column prop="desc" label="接口说明"></el-table-column>
      <el-table-column prop="back" label="返回值"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      root: "http://127.0.0.1:3000",
      apis: [
        {
          id: "1",
          api: "/:id/sensor",
          desc: "其中id为项目ID，用于获取传感器数据",
          back: "Array",
          content:
            "name(String), value(Number), ratio(Number), limit(Number), threshold(Number), initialError(Number) ,type(String) ,unit(Number) "
        },
        {
          id: "2",
          api: "/:id/baseinfo",
          desc: "其中id为项目ID，用于获取项目基本信息",
          back: "Object",
          content: "children(Array), currenttime(Date), timeStamp(Date)"
        },
        {
          id: "3",
          api: "/:id/infos",
          desc: "其中id为项目ID，用于获取项目信息项列表",
          back: "Array",
          content: "name(String), icon(String), value(Number), unit(String)"
        },
        {
          id: "4",
          api: "/:id/threshlod",
          desc: "其中id为项目ID，用于获取阈值",
          back: "Number",
          content: "therold(Number)"
        },
        {
          id: "5",
          api: "/:projectid/:siteid/:pointid/data",
          desc: "用于获取测点数据",
          back: "Object",
          content:
            "name(String), value(Number), ratio(Number), limit(Number), threshold(Number), initialError(Number) ,type(String) ,unit(Number) "
        }
      ],
      rules: [{ name: "自定义方法1", desc: "用于计算。。。。。。。" }]
      // rules: []
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.root {
  font-weight: 200;
  padding-bottom: 10px;
}
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand {
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    span {
      font-weight: 300;
    }
  }
}
.rules {
  margin: 10px 0 40px;
}
.add-rule {
  text-align: center;
  span {
    color: #409eff;
    cursor: pointer;
  }
}
.add {
  font-weight: 200;
  span {
    color: #409eff;
    cursor: pointer;
    font-weight: 400;
    padding-bottom: 10px;
  }
}
</style>