<template>
  <div>
    <el-row>
      <!-- 按测区-测站-测点查看 -->
      <el-col :span="3">
        <el-select
          size="mini"
          @change="getSites"
          multiple
          collapse-tags
          v-model="select.plane"
          placeholder="选择测区"
        >
          <el-option v-for="plane in planes" :key="plane" :label="plane" :value="plane"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select
          size="mini"
          v-model="select.site"
          multiple
          collapse-tags
          @change="getPoints"
          placeholder="选择测站"
        >
          <el-option v-for="site in sites" :key="site" :label="site" :value="site"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select size="mini" v-model="select.point" multiple collapse-tags placeholder="选择测点">
          <el-option v-for="point in points" :key="point" :label="point" :value="point"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select size="mini" v-model="select.type" multiple collapse-tags placeholder="选择类型">
          <el-option v-for="type in types" :key="type" :label="type" :value="type"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select size="mini" v-model="select.time" collapse-tags placeholder="选择周期">
          <el-option v-for="time in times" :key="time" :label="time" :value="time"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button
          type="primary"
          @click="renderPlot(select.plane,select.site,select.point)"
          size="mini"
        >查 看</el-button>
        <el-button type="info" @click="reset" size="mini">重 置</el-button>
      </el-col>
    </el-row>
    <div class="graph-container">
      <div id="placeholder" v-show="showPlaceholder"></div>
      <div class="types" id="allTypes" v-show="showTypes">
        <div v-for="id in containerId" :key="id" :id="id"></div>
      </div>
      <div class="one-point" v-show="showOnePoint">
        <div :id="container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Line } from "@antv/g2plot";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      //所有测点
      allPoints: [],
      //已选择测区-测站-测点
      select: {
        plane: [],
        site: [],
        point: [],
        type: [],
        time: ""
      },
      planes: [],
      sites: [],
      points: [],
      types: [],
      times: ["1小时", "12小时", "1天", "1周", "1个月"],
      placeholderData: [
        { time: "8 mins ago", value: 3 },
        { time: "7 mins ago", value: 4 },
        { time: "6 mins ago", value: 3.5 },
        { time: "5 mins ago", value: 5 },
        { time: "4 mins ago", value: 4.9 },
        { time: "3 mins ago", value: 6 },
        { time: "2 mins ago", value: 7 },
        { time: "1 mins ago", value: 9 },
        { time: "0 mins ago", value: 13 }
      ],
      // 多个图形使用
      containerId: [],
      // 信息整体
      allInfo: {},
      allPlanePoints: [],
      oneSitePoints: [],
      // 一个图形使用
      container: "",
      // 单个测点详细信息
      oneInfo: {}
    };
  },
  // mixins: [initProjectData],
  computed: {
    ...mapState(["project"]),
    showPlaceholder: function() {
      return this.container === "" && this.containerId.length === 0
        ? true
        : false;
    },
    showTypes: function() {
      return this.containerId.length >= 0 && this.container === "";
    },
    showOnePoint: function() {
      return this.containerId.length === 0 && this.container;
    }
  },
  methods: {
    ...mapMutations(["INIT_CURRENT_PROJECT"]),
    getSites(val) {
      this.sites = [];
      this.select.site = [];
      this.select.point = [];
      this.select.type = [];
      this.allPoints.forEach(allplane => {
        if (val.indexOf(allplane.name) >= 0) {
          allplane.children.forEach(item => {
            this.sites.push(item.name);
            item.value.forEach(inner => {
              if (this.types.indexOf(inner.type) === -1) {
                this.types.push(inner.type);
              }
            });
          });
        }
      });
    },
    getPoints(val) {
      this.points = [];
      this.select.point = [];
      this.allPoints.forEach(allplane => {
        if (this.select.plane.indexOf(allplane.name) >= 0) {
          allplane.children.forEach(allsite => {
            if (val.indexOf(allsite.name) >= 0) {
              allsite.value.forEach(item => {
                this.points.push(item.name);
              });
            }
          });
        }
      });
    },
    renderPlaceholder() {
      const linePlot = new Line(document.getElementById("placeholder"), {
        title: {
          visible: true,
          text: "示例图表"
        },
        description: {
          visible: true,
          text:
            "①选择上方的测面（必需项）+ 测站 +测点，根据选择结果会显示不同类型图表。\n②其他图表显示时，此示例图表会隐藏。\n③点击下方Slider即可改变显示时间区域。"
        },
        forceFit: true,
        padding: "auto",
        data: this.placeholderData,
        xField: "time",
        yField: "value",
        point: {
          visible: true
        },
        label: {
          visible: true,
          type: "point"
        }
        // interactions: [
        //   {
        //     type: "slider",
        //     cfg: {
        //       start: 0,
        //       end: 1
        //     }
        //   }
        // ]
      });

      linePlot.render();
    },
    reset() {
      this.select.plane = [];
      this.select.site = [];
      this.select.point = [];
      this.select.type = [];
      this.select.time = [];
      this.sites = [];
      this.points = [];
      this.$message.success("选择数据已重置。");
    },
    renderPlot(plane, site, point) {
      if (plane.length === 0) {
        this.$message.error("未选择任何测区！");
      } else if (site.length === 0 && point.length === 0) {
        this.container = "";
        this.containerId = [];
        this.$nextTick(() => {
          this.renderOnePlanePoints(plane);
        });
      } else if (site.length >= 0 && point.length === 0) {
        this.container = "";
        this.containerId = [];
        this.$nextTick(() => {
          this.renderOneSitePoints(plane, site);
        });
      } else if (site.length >= 0 && point.length >= 0) {
        this.container = "";
        this.containerId = [];
        this.$nextTick(() => {
          this.renderOnePoints(plane, site, point);
        });
      } else {
        this.$message.error("选择有误，无法绘制图形！");
      }
    },
    renderOnePlanePoints(plane) {
      this.getBaseInfo();
      this.allPlanePoints = [];
      // 生成并获取div#id
      this.allPoints.forEach(planes => {
        if (plane.indexOf(planes.name) >= 0) {
          planes.children.forEach(sites => {
            sites.value.forEach(points => {
              // 获取所有满足所选测区的结点
              this.allPlanePoints.push({
                name: points.name,
                unit: points.unit,
                type: points.type,
                value: points.value
              });
              if (this.select.type.length > 0) {
                this.select.type.forEach(type => {
                  if (this.containerId.indexOf(type) === -1)
                    this.containerId.push(type);
                });
              } else {
                if (this.containerId.indexOf(points.type) === -1) {
                  this.containerId.push(points.type);
                }
              }
            });
          });
        }
      });
      // window.console.log(this.allPlanePoints);
      // 绘制图表到div#id里面
      this.$nextTick(() => {
        this.containerId.forEach(id => {
          let graphData = [];
          let info = {};
          info.id = id;
          info.type = id;
          this.allPlanePoints.forEach(item => {
            info.unit = item.unit;
            if (item.type === id) {
              let count = 0;
              item.value.forEach(value => {
                graphData.unshift({
                  time:
                    (parseInt(this.allInfo.timeStamp) * count) / 60 + "分钟前",
                  type: item.name,
                  value: value
                });
                count++;
              });
            }
          });
          this.renderOneType(info, graphData);
        });
      });
    },
    renderOneSitePoints(plane, site) {
      this.getBaseInfo();
      // 生成并获取div#id
      this.oneSitePoints = [];
      this.allPoints.forEach(planes => {
        if (plane.indexOf(planes.name) >= 0) {
          planes.children.forEach(sites => {
            if (site.indexOf(sites.name) >= 0) {
              sites.value.forEach(points => {
                // 获取所有满足所选测站的结点
                this.oneSitePoints.push({
                  name: points.name,
                  unit: points.unit,
                  type: points.type,
                  value: points.value
                });
                if (this.select.type.length > 0) {
                  this.select.type.forEach(type => {
                    if (this.containerId.indexOf(type) === -1)
                      this.containerId.push(type);
                  });
                } else {
                  if (this.containerId.indexOf(points.type) === -1) {
                    this.containerId.push(points.type);
                  }
                }
                // if (this.containerId.indexOf(points.type) === -1) {
                //   this.containerId.push(points.type);
                // }
              });
            }
          });
        }
      });
      // 绘制图表到div#id里面
      this.$nextTick(() => {
        this.containerId.forEach(id => {
          let graphData = [];
          let info = {};
          info.id = id;
          info.type = id;
          this.oneSitePoints.forEach(item => {
            info.unit = item.unit;
            if (item.type === id) {
              let count = 0;
              item.value.forEach(value => {
                graphData.unshift({
                  time:
                    (parseInt(this.allInfo.timeStamp) * count) / 60 + "分钟前",
                  type: item.name,
                  value: value
                });
                count++;
              });
            }
          });
          this.renderOneType(info, graphData);
        });
      });
    },
    getBaseInfo() {
      this.allInfo.time = this.allPoints[0].currenttime;
      this.allInfo.timeStamp = this.allPoints[0].timeStamp;
    },
    renderOneType(typeInfo, graphData) {
      let des = `表中值为${typeInfo.type}，数据的采集时间为${this.allInfo.time}，采集间隔为${this.allInfo.timeStamp}，数据单位为${typeInfo.unit}`;
      let title = "";
      if (this.select.site === "") {
        title = `${this.select.plane}--${typeInfo.type}实时数据波动显示`;
      } else {
        title = `${this.select.plane}--${this.select.site}--${typeInfo.type}实时数据波动显示`;
      }
      const container = document.getElementById(typeInfo.id);
      const linePlot = new Line(container, {
        title: {
          visible: true,
          text: title
        },
        description: {
          visible: true,
          text: des
        },
        padding: "auto",
        forceFit: true,
        data: graphData,
        xField: "time",
        yField: "value",
        legend: {
          position: "right-top"
        },
        seriesField: "type",
        responsive: true
        // interactions: [
        //   {
        //     type: "slider",
        //     cfg: {
        //       start: 0,
        //       end: 1
        //     }
        //   }
        // ]
      });
      // 渲染表格
      linePlot.render();
    },
    //测区+测站+测点
    renderOnePoints(plane, site, point) {
      this.oneInfo = {};
      //获取结点的监测值
      let data = [];
      this.allPoints.forEach(planes => {
        if (plane.indexOf(planes.name) >= 0) {
          this.oneInfo.time = planes.currenttime;
          this.oneInfo.timeStamp = planes.timeStamp;
          planes.children.forEach(sites => {
            if (site.indexOf(sites.name) >= 0) {
              sites.value.forEach(points => {
                if (point.indexOf(points.name) >= 0) {
                  data = points.value;
                  this.oneInfo.type = points.type;
                  this.oneInfo.unit = points.unit;
                }
              });
            }
          });
        }
      });
      //对监测值进行格式化，以便进行表渲染
      let graphData = [];
      let count = 0;
      data.forEach(item => {
        graphData.unshift({
          time: (parseInt(this.oneInfo.timeStamp) * count) / 60 + "分钟前",
          value: parseInt(item)
        });
        count++;
      });
      //动态生成一个div#id
      this.container = "container";
      //根据数据显示表格
      this.$nextTick(() => {
        const container = document.getElementById("container");
        //清空内容，多次渲染
        container.innerHTML = "";
        this.$nextTick(() => {
          let des = `表中值为${this.oneInfo.type}，数据的采集时间为${this.oneInfo.time}，数据单位为${this.oneInfo.unit}`;
          let title = `${this.select.plane}--${this.select.site}--${this.select.point}实时数据波动显示`;
          const linePlot = new Line(container, {
            title: {
              visible: true,
              text: title
            },
            description: {
              visible: true,
              text: des
            },
            forceFit: true,
            data: graphData,
            padding: "auto",
            xField: "time",
            yField: "value",
            point: {
              visible: true
            },
            xAxis: {
              type: "dateTime",
              tickCount: 5
            }
            // interactions: [
            //   {
            //     type: "slider",
            //     cfg: {
            //       start: 0,
            //       end: 1
            //     }
            //   }
            // ]
          });
          // 渲染表格
          linePlot.render();
        });
      });
    }
  },
  created() {
    if (this.project == null) {
      this.$http.get(`/project/${this.$route.params.id}/sensor`).then(res => {
        this.INIT_CURRENT_PROJECT(res.data);
        this.allPoints = res.data;
      });
    } else {
      this.allPoints = this.project;
    }
    this.allPoints.forEach(allplane => {
      this.planes.push(allplane.name);
    });
    this.$nextTick(() => {
      this.renderPlaceholder();
    });
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.el-row {
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.graph-container {
  padding: 10px 20px;
}
</style>