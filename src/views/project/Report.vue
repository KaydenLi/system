<template>
  <div>
    <p class="title">项目基本信息：</p>
    <div class="dis-flex">
      <p class="name">项目名称：{{project.projectName}}</p>
      <p class="name">所在省份：{{project.province}}</p>
      <p class="name">所在县市：{{project.city}}</p>
      <p class="name">详细地址：{{project.address}}</p>
      <p class="name">结构类型：{{project.structuralType}}</p>
      <p class="name">开放状态： {{project.openStatus}}</p>
      <p class="name">创建时间： {{project.createdTime}}</p>
    </div>
    <el-divider></el-divider>

    <p class="title">当前信息项：</p>
    <div class="dis-flex">
      <p
        class="name"
        v-for="item in project.baseInfo"
        :key="item._id"
      >{{item.name}}：{{item.value}}{{item.unit}}</p>
    </div>
    <el-divider></el-divider>

    <p class="title">综合阈值法评估结果：</p>
    <div class="dis-flex">
      <p class="name">阈值： {{threshlod}}</p>
      <p class="name">安全状态值： {{estimationInfo.statusLevel}}</p>
      <p class="name">损伤状态值： {{estimationInfo.damage}}</p>
    </div>
    <el-divider></el-divider>

    <p class="title">剩余寿命法评估结果：</p>
    <div class="dis-flex">
      <p class="name">安全状态值： {{lifeEstimationInfo.statusLevel}}</p>
      <p class="name">损伤状态值： {{lifeEstimationInfo.damage}}</p>
    </div>
    <el-divider></el-divider>

    <div class="btn-container">
      <el-button type="primary" @click="exportWord">导出报表</el-button>
    </div>
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
      project: {},
      threshlod: 0,
      estimationInfo: {
        statusLevel: "",
        damage: ""
      },
      lifeEstimationInfo: {
        statusLevel: "",
        damage: ""
      }
    };
  },
  methods: {
    exportWord() {
      let _this = this;
      JSZipUtils.getBinaryContent(`../../../docx/report.docx`, function(
        error,
        content
      ) {
        if (error) {
          throw error;
        }
        let zip = new PizZip(content);
        let doc = new docxtemplater().loadZip(zip);
        doc.setData({
          project: _this.project,
          threshlod: _this.threshlod,
          estimationInfo: _this.estimationInfo,
          lifeEstimationInfo: _this.lifeEstimationInfo
        });
        try {
          doc.render();
        } catch (error) {
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          window.console.log(JSON.stringify({ error: e }));
          throw error;
        }
        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        saveAs(out, "report.docx");
      });
    }
  },
  created() {
    this.$http.get(`/project/${this.$route.params.id}`).then(res => {
      this.project = res.data;
    });
    this.$http.get(`/project/${this.$route.params.id}`).then(res => {
      this.threshlod = res.data.threshlod;
    });
    this.$http.get(`/project/${this.$route.params.id}/estimation`).then(res => {
      this.estimationInfo = res.data.estimationInfo;
    });
    this.$http
      .get(`/project/${this.$route.params.id}/lifeestimation`)
      .then(res => {
        this.lifeEstimationInfo = res.data.lifeEstimationInfo;
      });
  }
};
</script>

<style lang="scss" scoped>
.dis-flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  .title {
    font-weight: 500;
  }
  .name {
    flex: 0 0 33%;
    font-weight: 300;
    text-indent: 2em;
  }
}
.btn-container {
  margin: 20px;
  text-align: center;
}
</style>