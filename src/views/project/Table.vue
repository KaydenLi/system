<template>
  <div>
    <div class="info-container">
      <span class="base-info">
        <i class="el-icon-alarm-clock"></i>
        <span>测量时间：</span>
        <span class="info">{{baseInfo.time}}</span>
      </span>
      <span class="base-info">
        <i class="el-icon-timer"></i>
        <span>测量间隔：</span>
        <span class="info">{{baseInfo.timeStamp}}</span>
      </span>
      <span class="base-info">
        <i class="el-icon-files"></i>
        <span>测区数：</span>
        <span class="info">{{baseInfo.planesNumber}}</span>
      </span>
      <span class="base-info">
        <i class="el-icon-notebook-2"></i>
        <span>测站数：</span>
        <span class="info">{{baseInfo.sitesNumber}}</span>
      </span>
      <span class="base-info">
        <i class="el-icon-aim"></i>
        <span>测点数：</span>
        <span class="info">{{baseInfo.pointsNumber}}</span>
      </span>
    </div>

    <el-table :data="tableData" border :row-class-name="tableRowClassName">
      <el-table-column prop="plane" :filters="planes" :filter-method="filterPlanes" label="测面"></el-table-column>
      <el-table-column prop="site" :filters="sites" :filter-method="filterSites" label="测站"></el-table-column>
      <el-table-column prop="name" label="测点"></el-table-column>
      <el-table-column prop="type" :filters="types" :filter-method="filterTypes" label="类型"></el-table-column>
      <el-table-column prop="value" label="当前值"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column prop="ratio" label="系数"></el-table-column>
      <el-table-column prop="tag" label="自定义"></el-table-column>
      <el-table-column prop="notes" label="备注"></el-table-column>
    </el-table>
  </div>
</template>

<script>
//MOCKDATA
import { planes } from "../../mockData/plane.js";
export default {
  data() {
    return {
      baseInfo: {
        time: "",
        timeStamp: "",
        planesNumber: 0,
        sitesNumber: 0,
        pointsNumber: 0
      },
      tableData: [
        //  {
        //     plane: "测区1",//
        //     site: "测站1",//
        //     name: "1",//
        //     type: "应力",//
        //     unit:""
        //     value: "1000MPa",//
        //     ratio: "1.0",//
        //     notes: "无"//
        //   }
      ],
      planes: [
        // { text: "测区1", value: "测区1" }
      ],
      sites: [
        // { text: "测站1", value: "测站1" }
      ],
      selecttype: [],
      types: [
        // { text: "应力", value: "应力" }
      ]
    };
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex === 1) {
        window.console.log(rowIndex);
        return "success-row";
      }
    },
    filterPlanes(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterSites(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterTypes(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    initData(data) {
      if (data.length === 0) return;
      this.baseInfo.planesNumber = data.length;
      this.baseInfo.time = data[0].currenttime;
      this.baseInfo.timeStamp = data[0].timeStamp;
      data.forEach(planes => {
        if (planes.length === 0) return;
        let plane = planes.name;
        this.planes.push({ text: plane, value: plane });
        planes.children.forEach(sites => {
          if (sites.length === 0) return;
          let site = sites.name;
          let machineinfo = sites.machineinfo;
          this.baseInfo.sitesNumber++;
          this.sites.push({ text: site, value: site });
          sites.value.forEach(points => {
            let data = {};
            data.notes = points.notes;
            data.ratio = points.ratio;
            data.name = points.name;
            data.type = points.type;
            data.unit = points.unit;
            data.value = points.value[0];
            data.site = site;
            data.machineinfo = machineinfo;
            data.plane = plane;
            this.tableData.push(data);
            if (this.selecttype.indexOf(points.type) === -1) {
              let type = points.type;
              this.selecttype.push(type);
              this.types.push({ text: type, value: type });
            }
          });
        });
      });
      this.baseInfo.pointsNumber = this.tableData.length;
    }
  },
  created() {
    this.initData(planes);
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