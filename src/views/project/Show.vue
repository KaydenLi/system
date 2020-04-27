<template>
  <div>
    <siteHeader :header="header"></siteHeader>
    <el-row>
      <el-col
        :xs="{span: 24, offset: 0}"
        :sm="{span: 24, offset: 0}"
        :md="{span: 22, offset: 1}"
        :lg="{span: 22, offset: 1}"
        :xl="{span: 22, offset: 1}"
      >
        <el-tabs v-model="activeName" stretch>
          <el-tab-pane name="first">
            <span slot="label">
              <i class="el-icon-tickets"></i> 基本信息
            </span>
            <div>
              <div class="img-container">
                <img class="img" :src="project.img" alt />
              </div>
              <p class="item">
                项目ID：
                <span class="item-detail">{{project._id}}</span>
              </p>
              <p class="item">
                项目名称：
                <span class="item-detail">{{project.projectName}}</span>
              </p>
              <p class="item">
                所在省份：
                <span class="item-detail">{{project.province}}</span>
              </p>
              <p class="item">
                所在县市：
                <span class="item-detail">{{project.city}}</span>
              </p>
              <p class="item">
                详细地址：
                <span class="item-detail">{{project.address}}</span>
              </p>
              <p class="item">
                创建时间：
                <span class="item-detail">{{time}}</span>
              </p>
              <p class="item">
                查看人数：
                <span class="item-detail">{{watchs}}</span>
              </p>
              <p class="item">
                所有者：
                <span
                  class="link item-detail"
                  @click="checkUser(project.ownerId)"
                  title="点击查看用户信息"
                >详情</span>
              </p>
              <p class="item">
                开放状态：
                <span class="item-detail">{{status}}</span>
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane name="second">
            <span slot="label" @click="getTableDatas">
              <i class="el-icon-files"></i> 表格显示
            </span>
            <div>
              <el-table
                :data="tableData"
                border
                stripe
                height="90vh"
                :row-style="{height:0+'px'}"
                :cell-style="{padding:4+'px'}"
              >
                <el-table-column prop="plane" label="测面"></el-table-column>
                <el-table-column prop="site" label="测站"></el-table-column>
                <el-table-column prop="name" label="测点"></el-table-column>
                <el-table-column prop="type" label="类型"></el-table-column>
                <el-table-column prop="value" label="当前值"></el-table-column>
                <el-table-column prop="unit" label="单位"></el-table-column>
                <el-table-column prop="ratio" label="系数"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane name="third">
            <span slot="label">
              <i class="el-icon-data-line"></i> 曲线显示
            </span>
            <div>
              <el-row>
                <!-- 按测区-测站-测点查看 -->
                <el-col :span="3" :offset="1">
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
                  <el-select
                    size="mini"
                    v-model="select.point"
                    multiple
                    collapse-tags
                    placeholder="选择测点"
                  >
                    <el-option v-for="point in points" :key="point" :label="point" :value="point"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="3" :offset="1">
                  <el-select
                    size="mini"
                    v-model="select.type"
                    multiple
                    collapse-tags
                    placeholder="选择类型"
                  >
                    <el-option v-for="type in types" :key="type" :label="type" :value="type"></el-option>
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
                <div class="types" id="allTypes" v-show="showTypes">
                  <div v-for="id in containerId" :key="id" :id="id"></div>
                </div>
                <div class="one-point" v-show="showOnePoint">
                  <div :id="container"></div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="fourth">
            <span slot="label">
              <i class="el-icon-view"></i> 全景查看
            </span>
            <div>
              <div id="objcontainer" class="obj-container"></div>
              <div v-if="!project.obj" style="text-align:center;font-weight:200">该用户暂未导入模型</div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <siteFooter></siteFooter>
  </div>
</template>

<script>
import { Line } from "@antv/g2plot";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import OrbitControls from "three-orbitcontrols";
export default {
  data() {
    return {
      header: { menu: "查看详情", toPageName: "返回主页", to: "/" },
      project: {},
      activeName: "first",
      tableData: [],
      planes: [],
      sites: [],
      points: [],
      types: [],
      select: {
        plane: [],
        site: [],
        point: [],
        type: []
      },
      allPlanePoints: [],
      oneSitePoints: [],
      containerId: [],
      container: "",
      oneInfo: {},
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      axisHelper: null,
      light: null,
      projectInfo: {}
    };
  },
  computed: {
    time: function() {
      if (this.project.createdTime == null) {
        return "";
      } else {
        return new Date(this.project.createdTime);
      }
    },
    watchs: function() {
      if (this.project.watchersId == null) {
        return 0;
      } else {
        return this.project.watchersId.length || 0;
      }
    },
    status: function() {
      if (this.project.openStatus === true) {
        return "已开放";
      } else {
        return "未开放";
      }
    },
    showTypes: function() {
      return this.containerId.length >= 0 && this.container === "";
    },
    showOnePoint: function() {
      return this.containerId.length === 0 && this.container;
    }
  },
  methods: {
    checkUser(id) {
      this.$router.push(`/user/${id}/show`);
    },
    getTableDatas() {
      this.$http
        .get(`/project/${this.$route.params.id}/authsensor`)
        .then(res => {
          this.tableData = res.data;
          this.tableData.forEach(item => {
            if (this.planes.indexOf(item.plane) === -1) {
              this.planes.push(item.plane);
            }
            if (this.types.indexOf(item.type) === -1) {
              this.types.push(item.type);
            }
          });
        });
    },
    getSites(val) {
      this.sites = [];
      this.tableData.forEach(point => {
        if (val.indexOf(point.plane) >= 0) {
          if (this.sites.indexOf(point.site) === -1) {
            this.sites.push(point.site);
          }
        }
      });
    },
    getPoints() {
      this.points = [];
      this.tableData.forEach(points => {
        if (this.select.plane.indexOf(points.plane) >= 0) {
          if (this.select.site.indexOf(points.site) >= 0) {
            this.points.push(points.name);
          }
        }
      });
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
      this.allPlanePoints = [];
      // 生成并获取div#id
      this.tableData.forEach(points => {
        if (plane.indexOf(points.plane) >= 0) {
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
        }
      });
      // 绘制图表到div#id里面
      this.$nextTick(() => {
        this.containerId.forEach(id => {
          let graphData = [];
          let info = {};
          info.id = id;
          info.type = id;
          this.allPlanePoints.forEach(item => {
            if (item.type === id) {
              let count = 0;
              info.unit = item.unit;
              item.value.forEach(value => {
                graphData.unshift({
                  time: count + "分钟前",
                  type: item.name,
                  value: value
                });
                count++;
              });
            }
          });
          window.console.log(graphData);
          this.renderOneType(info, graphData);
        });
      });
    },
    renderOneSitePoints(plane, site) {
      // 生成并获取div#id
      this.oneSitePoints = [];
      this.tableData.forEach(points => {
        if (plane.indexOf(points.plane) >= 0) {
          if (site.indexOf(points.site) >= 0) {
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
          }
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
            if (item.type === id) {
              info.unit = item.unit;
              let count = 0;
              item.value.forEach(value => {
                graphData.unshift({
                  time: count + "分钟前",
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
    renderOneType(typeInfo, graphData) {
      let des = `表中值为${typeInfo.type}，数据单位为${typeInfo.unit}`;
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
      });
      // 渲染表格
      linePlot.render();
    },
    //测区+测站+测点
    renderOnePoints(plane, site, point) {
      this.oneInfo = {};
      //获取结点的监测值
      let data = [];
      this.tableData.some(points => {
        if (plane.indexOf(points.plane) >= 0) {
          if (site.indexOf(points.site) >= 0) {
            if (point.indexOf(points.name) >= 0) {
              if (points.value) data = points.value;
              this.oneInfo.type = points.type;
              this.oneInfo.unit = points.unit;
              return;
            }
          }
        }
      });
      //对监测值进行格式化，以便进行表渲染
      let graphData = [];
      let count = 0;
      if (data.length) {
        data.forEach(item => {
          graphData.unshift({
            time: count + "分钟前",
            value: parseInt(item)
          });
          count++;
        });
      }

      //动态生成一个div#id
      this.container = "container";
      //根据数据显示表格
      this.$nextTick(() => {
        const container = document.getElementById("container");
        //清空内容，多次渲染
        container.innerHTML = "";
        this.$nextTick(() => {
          let des = `表中值为${this.oneInfo.type}，数据单位为${this.oneInfo.unit}`;
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
          });
          // 渲染表格
          linePlot.render();
        });
      });
    },
    reset() {
      this.points = [];
      this.sites = [];
      // this.planes = [];
      this.select.point = [];
      this.select.site = [];
      this.select.plane = [];
      this.select.type = [];
    },

    // ----------3d可视化部分
    initRenderer(element) {
      // 渲染一个场景
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(1200, 600);
      // this.renderer.setSize(element.clientWidth, element.clientHeight);
      this.renderer.setClearColor(0xb9d3ff, 0.5);
      element.appendChild(this.renderer.domElement);
    },
    initScene() {
      // 添加一个场景
      this.scene = new THREE.Scene();
    },
    initAxisHelper() {
      this.axisHelper = new THREE.AxesHelper(250);
      this.scene.add(this.axisHelper);
    },
    initCamera() {
      // 添加一个相机
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        6000
      );
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 100;
      this.camera.rotation.x -= 45 * (Math.PI / 180);
      this.scene.add(this.camera);
    },
    initLight() {
      //创建灯光
      this.light = new THREE.AmbientLight(0xffffff);
      this.scene.add(this.light);
    },
    initControl() {
      //创建控件对象
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.25;
      this.controls.enableZoom = true;
      this.controls.autoRotate = true;
      this.controls.minDistance = 1;
      this.controls.maxDistance = 2000;
      this.controls.enablePan = true;
    },

    initThree(element) {
      this.initRenderer(element);
      this.initScene();
      this.initAxisHelper();
      this.initCamera();
      this.initLight();
      // 导入文件
      let mtlLoader = new MTLLoader();
      let objLoader = new OBJLoader();
      if (this.projectInfo.obj && this.projectInfo.mtl) {
        mtlLoader.load(`${this.projectInfo.mtl}`, materials => {
          materials.preload();
          objLoader.setMaterials(materials);
          objLoader.load(`${this.projectInfo.obj}`, object => {
            object.position.set(0, 0, 0);
            this.scene.add(object);
          });
        });
      }
      this.initControl();
    },
    animate() {
      this.renderer.render(this.scene, this.camera);
      //再次调用animate方法实现刷新
      requestAnimationFrame(this.animate);
    }
  },
  created() {
    this.$http.get(`project/show/${this.$route.params.id}`).then(res => {
      this.project = res.data;
      if (this.project.obj) {
        this.$set(this.projectInfo, "obj", this.project.obj);
      }
      if (this.project.mtl) {
        this.$set(this.projectInfo, "mtl", this.project.mtl);
      }
    });
    this.getTableDatas();
  },
  mounted() {
    this.initThree(document.getElementById("objcontainer"));
    // 执行动画循环
    this.animate();
  }
};
</script>

<style lang="scss" scoped>
.img-container {
  text-align: center;
  .img {
    width: 600px;
  }
}
.item {
  font-weight: 200;
  .item-detail {
    font-weight: 400;
  }
  .link {
    color: #409eff;
    &:hover {
      cursor: pointer;
    }
  }
}
.graph-container {
  min-height: 70vh;
}
.obj-container {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  text-align: center;
  height: 80vh;
  width: 100%;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>