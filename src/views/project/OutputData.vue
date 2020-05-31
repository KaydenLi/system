<template>
  <div>
    <el-table
      :data="tables"
      stripe
      :row-style="{height:0+'px'}"
      :cell-style="{padding:4+'px'}"
    >
      <el-table-column prop="name" label="报表名称"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="exportWord(scope.row.model,scope.row.dataName)"
          >导出</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      project: {},
      sensor: { name: "kayden" },
      threshold: {},
      life: {},
      tables: [
        {
          id: 1,
          name: "项目信息汇总",
          model: "project.docx",
          dataName: "project"
        }
      ],
      options: [
        {
          value: "now",
          label: "实时"
        },
        {
          value: "hour",
          label: "1小时前"
        }
      ]
    };
  },
  methods: {
    exportWord(model, dataName) {
      let _this = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(`../../../docx/${model}`, function(
        error,
        content
      ) {
        // 抛出异常
        if (error) {
          throw error;
        }

        // 创建一个JSZip实例，内容为模板的内容
        let zip = new PizZip(content);
        // 创建并加载docxtemplater实例对象
        let doc = new docxtemplater().loadZip(zip);
        // 设置模板变量的值
        if (dataName === "project") {
          doc.setData({
            data: _this.tableData,
            project: _this.project
          });
        }
        try {
          // 用模板变量的值替换所有模板变量
          doc.render();
        } catch (error) {
          // 抛出异常
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          window.console.log(JSON.stringify({ error: e }));
          throw error;
        }

        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, model);
      });
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
    }
  },
  created() {
    this.$http.get(`/project/${this.$route.params.id}/sensor`).then(res => {
      this.initTableData(res.data);
    });
    this.$http.get(`/project/${this.$route.params.id}`).then(res => {
      this.project = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
</style>