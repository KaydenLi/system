<template>
  <div>
    <div class="info-container">
      <span class="base-info">
        <i class="el-icon-bell"></i>
        <span>超限测点数</span>
        <span class="info">{{overNumber}}</span>
      </span>
      <span class="base-info">
        <i class="el-icon-pie-chart"></i>
        <span>超限百分比</span>
        <span class="info">{{percent}}</span>
      </span>
    </div>

    <el-table
      :data="tableData"
      border
      stripe
      :row-style="{height:0+'px'}"
      :cell-style="{padding:4+'px'}"
    >
      <el-table-column prop="plane" :filters="planes" :filter-method="filterPlanes" label="测面"></el-table-column>
      <el-table-column prop="site" :filters="sites" :filter-method="filterSites" label="测站"></el-table-column>
      <el-table-column prop="name" label="测点"></el-table-column>
      <el-table-column prop="value" label="当前值"></el-table-column>
      <el-table-column prop="threshold" label="阈值"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column prop="over" label="超值与否"></el-table-column>
      <el-table-column fixed="right" label="修改阈值" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editLimit(scope.row.threshold,scope.row._id)"
            type="text"
            size="small"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//MOCKDATA
import { planes } from "../../mockData/plane.js";
export default {
  data() {
    return {
      // 所有测点表格数据
      tableData: [
        //  {
        //     plane: "测区1",//
        //     site: "测站1",//
        //     name: "1",//
        //     unit:""
        //     value: "1000MPa",//
        //   }
      ],
      selectPlanes: [],
      selectSites: [],
      planes: [],
      sites: [],
      overNumber: 0,
      count: 0,
      percent: 0
    };
  },
  methods: {
    filterPlanes(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterSites(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    initTableData(data) {
      if (data.length === 0) return;
      data.forEach(planes => {
        if (planes.length === 0) return;
        let plane = planes.name;
        if (this.selectPlanes.indexOf(plane) === -1)
          this.planes.push({ text: plane, value: plane });
        planes.children.forEach(sites => {
          if (sites.length === 0) return;
          let site = sites.name;
          if (this.selectSites.indexOf(site) === -1)
            this.sites.push({ text: site, value: site });
          sites.value.forEach(points => {
            this.count++;
            let data = {};
            data.plane = plane;
            data.site = site;
            data._id = points._id;
            data.name = points.name;
            data.unit = points.unit;
            data.value = points.value[0];
            data.threshold = points.threshold;
            data.over =
              parseInt(points.threshold) - parseInt(points.initialError) <
              parseInt(points.value)
                ? "是"
                : "否";
            data.initialError = points.initialError;
            if (data.over === "是") this.overNumber++;
            this.tableData.push(data);
          });
        });
      });
      window.console.log(this.overNumber);
      window.console.log(this.count);
      this.percent =
        parseInt((parseInt(this.overNumber) / parseInt(this.count)) * 100) +
        "%";
    },
    editLimit(val, point) {
      this.$prompt("请输入新阈值", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: val
      })
        .then(({ value }) => {
          this.tableData.forEach(points => {
            if (points._id === point) {
              points.value = value;
              window.console.log(points, value);
            }
          });
          this.$message.success("已设置新阈值为 " + value);
        })
        .catch(() => {
          this.$message.info("已取消输入新阈值");
        });
    }
  },
  created() {
    this.initTableData(planes);
  }
};
</script>

<style lang="scss" scoped>
.info-container {
  color: #909399;
  height: 3em;
  .base-info {
    margin-right: 20px;
    i {
      color: #409eff;
    }
    span {
      font-weight: 300;
      color: #909399;
    }
    .info {
      font-weight: 500;
    }
  }
}
.el-table .success-row {
  background: #000;
}
</style>