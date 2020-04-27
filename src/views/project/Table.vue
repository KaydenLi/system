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
      <el-table-column prop="type" :filters="types" :filter-method="filterTypes" label="类型"></el-table-column>
      <el-table-column prop="value" sortable label="当前值"></el-table-column>
      <el-table-column prop="position" label="坐标"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column prop="ratio" label="系数"></el-table-column>
      <el-table-column
        prop="group"
        :formatter="formatGroup"
        :filters="groups"
        :filter-method="filterGroups"
        label="所属组"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { initProjectData } from "../../components/mixins/initProjectData.mixin";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      // 所有测点表格数据
      tableData: [
        //  {
        //     plane: "测区1",//
        //     site: "测站1",//
        //     name: "1",//
        //     type: "应力",//
        //     unit:""
        //     value: "1000MPa",//
        //     ratio: "1.0",//
        //     group:[],
        //   }
      ]
    };
  },
  computed: {
    ...mapState(["project"])
  },
  mixins: [initProjectData],
  methods: {
    ...mapMutations(["INIT_CURRENT_PROJECT"]),
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
    formatGroup(row) {
      return row.group.join("，");
    },
    filterGroups(value, row, column) {
      const property = column["property"];
      return row[property].indexOf(value) >= 0;
    },
    initTableData(data) {
      if (data.length === 0) return;
      data.forEach(planes => {
        if (planes.length === 0) return;
        let plane = planes.name;
        planes.children.forEach(sites => {
          if (sites.length === 0) return;
          let site = sites.name;
          let machineinfo = sites.machineinfo;
          sites.value.forEach(points => {
            let data = {};
            data.ratio = points.ratio;
            data.name = points.name;
            data.type = points.type;
            data.unit = points.unit;
            data.value = points.value[0];
            data.group = points.group;
            data.position = points.position;
            data.site = site;
            data.machineinfo = machineinfo;
            data.plane = plane;
            this.tableData.push(data);
          });
        });
      });
      this.baseInfo.pointsNumber = this.tableData.length;
    }
  },
  created() {
    if (this.project.length > 0) {
      this.$_initBaseInfo(this.project);
      this.initTableData(this.project);
    } else {
      this.$http.get(`/project/${this.$route.params.id}/sensor`).then(res => {
        this.$_initBaseInfo(res.data);
        this.initTableData(res.data);
      });
    }
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