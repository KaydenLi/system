<template>
  <div>
    <el-tabs type="border-card" :value="importSensor">
      <el-tab-pane v-for="(module,index) in project" :key="module._id">
        <span slot="label">
          <i class="el-icon-files"></i>
          {{module.name}}
        </span>
        <!-- 测面信息 -->
        <p class="moudle-title">
          测区{{module.name}}
          <el-button
            type="primary"
            size="mini"
            @click="setIndex(index,-1,-1),editPlaneVisible = true,getPlane()"
            style="float:right;"
          >编辑测区</el-button>
        </p>
        <div class="block">
          <el-image :src="module.img"></el-image>
        </div>
        <el-row>
          <el-col
            :xs="{span: 24, offset: 0}"
            :sm="{span: 18, offset: 3}"
            :md="{span: 22, offset: 1}"
            :lg="{span: 22, offset: 1}"
            :xl="{span: 22, offset: 1}"
          >
            <!-- 测站信息 -->
            <div v-for="(item,index2) in module.children" :key="item._id" class="tree">
              <span class="site-name">
                <i :class="iconClass"></i>
                测站：{{item.name}}
                <el-button
                  type="primary"
                  size="mini"
                  @click="setIndex(index,index2,-1),editSiteVisible=true,getSite()"
                  style="float:right;"
                >编辑测站</el-button>
              </span>
              <p class="machine-info">{{item.machineinfo}}</p>
              <!-- 测点信息 -->
              <el-table
                :data="item.value"
                stripe
                :row-style="{height:0+'px'}"
                :cell-style="{padding:0+'px'}"
              >
                <el-table-column prop="name" label="测点编号" width="120"></el-table-column>
                <el-table-column prop="type" label="测值类型" width="80"></el-table-column>
                <el-table-column prop="value[0]" label="当前值" width="120"></el-table-column>
                <el-table-column prop="threshold" label="设计限值" width="120"></el-table-column>
                <el-table-column prop="unit" label="单位" width="80"></el-table-column>
                <el-table-column prop="initialError" label="初值" width="80"></el-table-column>
                <el-table-column prop="ratio" label="灵敏系数" width="120"></el-table-column>
                <el-table-column
                  prop="position"
                  :formatter="formatPosition"
                  label="三维坐标"
                  width="120"
                ></el-table-column>
                <el-table-column prop="group" :formatter="formatGroup" label="所属分组"></el-table-column>
                <el-table-column fixed="right" label="操作" width="80">
                  <template slot-scope="scope">
                    <el-button
                      @click="setIndex(index,index2,scope.$index),getPoint(),editPointVisible=true"
                      type="text"
                      size="small"
                    >修改</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 添加测点 -->
              <div class="tree-item-add">
                <el-button type="text" @click="addPointVisible = true,setIndex(index,index2,-1)">
                  <i class="el-icon-circle-plus-outline"></i>
                  添加测点
                </el-button>
              </div>
            </div>
            <!-- 添加测站 -->
            <div class="tree-site-add">
              <el-button
                type="text"
                @click="addSiteVisible = true,setIndex(index,-1,-1),getPlane()"
              >
                <i class="el-icon-circle-plus-outline"></i>
                添加测站
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane name="addPlane">
        <span slot="label">
          <i class="el-icon-circle-plus-outline"></i>添加测区
        </span>
        <div>
          <el-row>
            <el-col
              :xs="{span: 24, offset: 0}"
              :sm="{span: 18, offset: 3}"
              :md="{span: 24, offset: 2}"
              :lg="{span: 14, offset: 3}"
              :xl="{span: 14, offset: 3}"
            >
              <el-form :model="planeForm" label-position="left">
                <el-form-item label-width="80px" label="测区名">
                  <el-input v-model="planeForm.name"></el-input>
                </el-form-item>
                <el-form-item label-width="80px" label="截面图片">
                  <el-input v-model="planeForm.img"></el-input>
                </el-form-item>
                <el-form-item label-width="80px" label="测量间隔">
                  <el-input v-model="planeForm.timeStamp"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" @click="addPlane">确 定</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane name="importSensor">
        <span slot="label">
          <i class="el-icon-upload"></i>测点导入
        </span>
        <div>
          <el-upload
            class="upload-demo"
            action
            :on-change="handleChange"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :limit="limitUpload"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/wps-office.xls"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传 Microsoft Excel 的 xlsx / xls 文件</div>
          </el-upload>
          <el-button size="small" type="success" @click="uploadExcel">开始导入</el-button>
          <div v-if="hasExcelData">
            <span>上传预览：</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加测点dialog -->
    <el-dialog title="添加测点" width="40%" top="1em" :visible.sync="addPointVisible">
      <el-form :model="pointForm" label-position="left">
        <el-form-item label="测点名称" label-width="80px">
          <el-input v-model="pointForm.name"></el-input>
        </el-form-item>
        <el-form-item label="测值类型" label-width="80px">
          <el-select
            v-model="pointForm.type"
            placeholder="测值类型"
            filterable
            allow-create
            default-first-option
          >
            <el-option
              v-for="item in types"
              :key="item.value"
              :value="item.value"
              :lable="item.text"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测值单位" label-width="80px">
          <el-select v-model="pointForm.unit" filterable allow-create default-first-option>
            <el-option v-for="item in units" :key="item" :value="item" :lable="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属分组" label-width="80px">
          <el-select
            v-model="pointForm.group"
            placeholder="输入新组名后回车即可新建新组"
            multiple
            filterable
            allow-create
            default-first-option
          >
            <el-option
              v-for="item in groups"
              :key="item.value"
              :value="item.value"
              :lable="item.text"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设计限值" label-width="80px">
          <el-input v-model="pointForm.threshold"></el-input>
        </el-form-item>
        <el-form-item label="灵敏系数" label-width="80px">
          <el-input v-model="pointForm.ratio"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addPointVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPointVisible = false,addPoint()">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 添加测站dialog -->
    <el-dialog title="添加测站" width="40%" top="1em" :visible.sync="addSiteVisible">
      <el-form :model="siteForm" label-position="left">
        <el-form-item label="测站名称" label-width="80px">
          <el-input v-model="siteForm.name"></el-input>
        </el-form-item>
        <el-form-item label="设备信息" label-width="80px">
          <el-input v-model="siteForm.machineinfo" autosize type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSiteVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSiteVisible = false;addSite()">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 修改测区dialog -->
    <el-dialog title="编辑测区" width="40%" top="1em" :visible.sync="editPlaneVisible">
      <el-form :model="editPlaneForm" label-position="left">
        <el-form-item label="测区名称" label-width="80px">
          <el-input v-model="editPlaneForm.name"></el-input>
        </el-form-item>

        <el-form-item label="截面图片" label-width="80px">
          <el-input v-model="editPlaneForm.img"></el-input>
        </el-form-item>
        <el-form-item label="测量间隔" label-width="80px">
          <el-input v-model="editPlaneForm.timeStamp"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          @click="editPlaneVisible = false,deletePlane(editPlaneForm._id)"
        >删 除</el-button>
        <el-button type="primary" @click="editPlaneVisible = false,editPlane(editPlaneForm._id)">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 添加测站dialog -->
    <el-dialog title="编辑测站" width="40%" top="1em" :visible.sync="editSiteVisible">
      <el-form :model="editSiteForm" label-position="left">
        <el-form-item label="测站名称" label-width="80px">
          <el-input v-model="editSiteForm.name"></el-input>
        </el-form-item>
        <el-form-item label="设备信息" label-width="80px">
          <el-input v-model="editSiteForm.machineinfo" autosize type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="editSiteVisible = false;deleteSite()">删 除</el-button>
        <el-button type="primary" @click="editSiteVisible = false;editSite()">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 修改测点dialog -->
    <el-dialog title="编辑测点" width="40%" top="1em" :visible.sync="editPointVisible">
      <el-form :model="editPointForm" label-position="left">
        <el-form-item label="测点名称" label-width="80px">
          <el-input v-model="editPointForm.name"></el-input>
        </el-form-item>
        <el-form-item label="测点坐标" label-width="80px">
          <el-input v-model="editPointForm.position"></el-input>
        </el-form-item>
        <el-form-item label="测值类型" label-width="80px">
          <el-select
            v-model="editPointForm.type"
            placeholder="测值类型"
            filterable
            allow-create
            default-first-option
          >
            <el-option
              v-for="item in types"
              :key="item.value"
              :value="item.value"
              :lable="item.text"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测值单位" label-width="80px">
          <el-select v-model="editPointForm.unit" filterable allow-create default-first-option>
            <el-option v-for="item in units" :key="item" :value="item" :lable="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属组" label-width="80px">
          <el-select
            v-model="editPointForm.group"
            placeholder="所属分组"
            multiple
            filterable
            allow-create
            default-first-option
          >
            <el-option
              v-for="item in groups"
              :key="item.value"
              :value="item.value"
              :lable="item.text"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阈值" label-width="80px">
          <el-input v-model="editPointForm.threshold"></el-input>
        </el-form-item>
        <el-form-item label="设备初值" label-width="80px">
          <el-input v-model="editPointForm.initialError"></el-input>
        </el-form-item>
        <el-form-item label="灵敏系数" label-width="80px">
          <el-input v-model="editPointForm.ratio"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="editPointVisible = false,deletePoint()">删 除</el-button>
        <el-button type="primary" @click="editPointVisible = false,editPoint()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XLSX, { utils } from "xlsx";
import { initProjectData } from "../../components/mixins/initProjectData.mixin";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      importSensor: "importSensor",
      limitUpload: 1,
      fileTemp: null,
      file: null,
      hasExcelData: false,
      excelData: [],
      // planesSitesPoints: [],
      editPlaneForm: {
        _id: "",
        name: "测区名",
        img: "url",
        timeStamp: "60"
      },
      editSiteForm: {
        _id: "",
        name: "测站名",
        machineinfo: "设备信息"
      },
      editPointForm: {
        _id: "",
        plane: "测区名",
        site: "测站名",
        name: "测点名",
        position: [],
        type: "应力",
        unit: "MPa",
        group: [],
        threshold: "1000",
        ratio: "1.0",
        initialError: "0"
      },
      iconClass: "el-icon-monitor",
      addSiteVisible: false,
      addPointVisible: false,
      editPlaneVisible: false,
      editSiteVisible: false,
      editPointVisible: false,
      // 新建测区表单
      planeForm: {
        name: "测区名",
        img: "url",
        timeStamp: "60",
        children: []
      },
      // 新建测站表单
      siteForm: {
        name: "测站名",
        machineinfo: "设备信息"
      },
      // 新建测点表单
      pointForm: {
        name: "测点名",
        type: "应力",
        unit: "MPa",
        group: [],
        threshold: "1000",
        ratio: "1.0"
      },
      index: { planeIndex: -1, siteIndex: -1, pointIndex: -1 }
    };
  },
  mixins: [initProjectData],
  computed: {
    ...mapState(["project"])
  },
  methods: {
    ...mapMutations(["INIT_CURRENT_PROJECT"]),
    handleChange(file) {
      this.fileTemp = file.raw;
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel" ||
          this.fileTemp.type == "application/wps-office.xls"
        ) {
          this.importExcel(this.fileTemp)
            .then(res => {
              if (this.formatExcelData(res)) {
                window.console.log("1");
              }
            })
            .catch(err => {
              this.$message.error(`文件读取失败！+${err}`);
            });
        } else {
          this.$message.error("文件格式错误，请删除后重新上传！");
        }
      } else {
        this.$message.error("请上传excel文件！");
      }
    },
    handleRemove(file, fileList) {
      window.console.log(file, fileList);
      this.fileTemp = null;
    },
    handleExceed() {
      this.$message.error("请删除已选择文件后重新上传！");
    },
    async importExcel(file) {
      const workBook = await this.readerWorkBookFromLocal(file),
        workSheet = workBook.Sheets[workBook.SheetNames[0]],
        content = utils.sheet_to_json(workSheet),
        data = {};
      data.title = Object.keys(content[0]);
      data.body = content;
      return data;
    },
    readerWorkBookFromLocal(file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      return new Promise(function(resolve, reject) {
        reader.onload = function(e) {
          const fileData = e.target.result;
          if (reader.readyState === 2) {
            const workBook = XLSX.read(fileData, { type: "binary" });
            resolve(workBook);
          } else {
            reject("读取文件失败");
          }
        };
      });
    },
    formatExcelData(data) {
      let title = data.title;
      let body = data.body;
      let planes = [];
      let sites = [];
      if (body.length === 0) {
        return false;
      }
      //如果用户传入了测区和测站
      if (title.indexOf("plane") >= 0 && title.indexOf("site") >= 0) {
        // 读取测区
        body.forEach(item => {
          let plane = item.plane.toString();
          if (planes.indexOf(plane) === -1) {
            planes.push(plane);
          }
        });
        // 读取测站
        planes.forEach(plane => {
          body.forEach(item => {
            if (item.plane.toString() === plane) {
              let site = item.site.toString();
              if (sites.indexOf(site) === -1) {
                sites.push(site);
              }
            }
          });
        });
        planes.forEach(plane => {
          let planeName = plane;
          let children = [];
          // 读取测点
          sites.forEach(site => {
            let siteName = site;
            let value = [];
            body.forEach(item => {
              let child = {};
              if (
                item.plane.toString() === plane &&
                item.site.toString() === site
              ) {
                for (let key in item) {
                  if (item[key]) {
                    child[key] = item[key];
                  }
                }
                value.push(child);
              }
            });
            if (value.length > 0) {
              children.push({ name: siteName, value: value, machineinfo: "" });
            }
          });
          this.excelData.push({
            name: planeName,
            img:
              "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
            children: children
          });
        });
      } else {
        //用户上传数据不包括plane或者site
        let children = [];
        let value = [];
        body.forEach(item => {
          let child = {};
          for (let key in item) {
            if (item[key]) {
              child[key] = item[key];
            }
          }
          value.push(child);
        });
        children.push({ name: "site1", value: value });
        this.excelData.push({
          name: "plane1",
          img:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          children: children
        });
      }
    },
    uploadExcel() {
      //TODO上传数据到服务器
      if (this.fileTemp == null) {
        this.$message.error("请先选择文件，再点击导入！");
      } else {
        // this.planesSitesPoints = this.excelData;
        this.$http
          .post(`project/${this.$route.params.id}/import`, this.excelData)
          .then(res => {
            if (res.data.status === true) {
              this.$http
                .get(`project/${this.$route.params.id}/sensor`)
                .then(response => {
                  this.$_initBaseInfo(response.data);
                  // this.planesSitesPoints = response.data;
                  this.INIT_CURRENT_PROJECT(response.data);
                  this.$message.success("数据导入成功");
                });
            } else {
              this.$message.error("导入数据出错");
            }
          });
        this.excelData = [];
        this.fileTemp = null;
      }
    },
    formatPosition(row) {
      return row.position;
    },
    formatGroup(row) {
      if (row.group) {
        return row.group.join("，");
      } else {
        return row.group;
      }
    },
    setIndex(index, index2, index3) {
      this.index.planeIndex = index;
      this.index.siteIndex = index2;
      this.index.pointIndex = index3;
    },
    // 测区操作：增加修改删除
    addPlane() {
      let tmpPlane = {};
      for (let key in this.planeForm) {
        tmpPlane[key] = this.planeForm[key];
      }
      if (tmpPlane.name === "") {
        this.$message.info("测区名不能为空");
        return;
      }
      let length = this.project.length;
      let flag = false;
      for (let i = 0; i < length; i++) {
        if (this.project[i].name === tmpPlane.name) flag = true;
      }
      if (flag) {
        this.$message.info("测区名已存在");
        return;
      }
      this.$http
        .post(`project/${this.$route.params.id}/importplane`, this.planeForm)
        .then(res => {
          this.$_initBaseInfo(res.data);
          this.INIT_CURRENT_PROJECT(res.data);
          this.$message.success("测区已添加");
        });
    },
    editPlane(id) {
      this.$http
        .post(
          `/project/${this.$route.params.id}/editplane/${id}`,
          this.editPlaneForm
        )
        .then(res => {
          this.$_initBaseInfo(res.data);
          this.INIT_CURRENT_PROJECT(res.data);
          this.$message.success("修改成功!");
        });
    },
    deletePlane(id) {
      this.$confirm("此操作将永久删除该测站, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete(`/project/${this.$route.params.id}/deleteplane/${id}`)
            .then(res => {
              this.$_initBaseInfo(res.data);
              this.INIT_CURRENT_PROJECT(res.data);
              this.$message.success("删除成功!");
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    //测站操作：增加修改删除
    addSite() {
      let tmpSite = {};
      for (let key in this.siteForm) {
        tmpSite[key] = this.siteForm[key];
      }
      if (tmpSite.name === "") {
        this.$message.info("测站名不能为空");
        return;
      }
      let flag = false;
      let currentSite = this.project[this.index.planeIndex].children;
      let length = currentSite.length;
      for (let i = 0; i < length; i++) {
        if (currentSite[i].name === tmpSite.name) flag = true;
      }
      if (flag) {
        this.$message.info("测站名已存在");
        return;
      }
      let plane = this.project[this.index.planeIndex];
      let planeId = plane._id;
      this.$http
        .post(
          `project/${this.$route.params.id}/importsite/${planeId}`,
          this.siteForm
        )
        .then(res => {
          this.$_initBaseInfo(res.data);
          this.INIT_CURRENT_PROJECT(res.data);
          this.$message.success("测区已添加");
        });
    },
    editSite() {
      let plane = this.project[this.index.planeIndex];
      let site = plane.children[this.index.siteIndex];
      let planeId = plane._id;
      let siteId = site._id;
      this.$http
        .post(
          `/project/${this.$route.params.id}/editsite/${planeId}/${siteId}`,
          this.editSiteForm
        )
        .then(res => {
          this.$_initBaseInfo(res.data);
          this.INIT_CURRENT_PROJECT(res.data);
          this.$message.success("修改成功!");
        });
    },
    deleteSite() {
      this.$confirm("此操作将永久删除该区, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let plane = this.project[this.index.planeIndex];
          let site = plane.children[this.index.siteIndex];
          let planeId = plane._id;
          let siteId = site._id;
          this.$http
            .delete(
              `/project/${this.$route.params.id}/deletesite/${planeId}/${siteId}`
            )
            .then(res => {
              this.$_initBaseInfo(res.data);
              this.INIT_CURRENT_PROJECT(res.data);
              this.$message.success("删除成功!");
            });
        })
        .catch(() => {
          this.$message.info("删除出错");
        });
    },
    //测点操作：增加修改删除
    addPoint() {
      let tmpPoint = {};
      for (let key in this.pointForm) {
        tmpPoint[key] = this.pointForm[key];
      }
      if (tmpPoint.name === "") {
        this.$message.info("测站名不能为空");
        return;
      }
      let flag = false;
      let currentPoint = this.project[this.index.planeIndex].children[
        this.index.siteIndex
      ].value;
      let length = currentPoint.length;
      for (let i = 0; i < length; i++) {
        if (currentPoint[i].name === tmpPoint.name) flag = true;
      }
      if (flag) {
        this.$message.info("测站名已存在");
        return;
      }
      let plane = this.project[this.index.planeIndex];
      let site = plane.children[this.index.siteIndex];
      let planeId = plane._id;
      let siteId = site._id;
      this.$http
        .post(
          `project/${this.$route.params.id}/importpoint/${planeId}/${siteId}`,
          this.pointForm
        )
        .then(res => {
          this.$_initBaseInfo(res.data);
          this.INIT_CURRENT_PROJECT(res.data);
          this.$message.success("测区已添加");
        });
    },
    editPoint() {
      let plane = this.project[this.index.planeIndex];
      let site = plane.children[this.index.siteIndex];
      let point = site.value[this.index.pointIndex];
      let planeId = plane._id;
      let siteId = site._id;
      let pointId = point._id;
      this.$http
        .post(
          `/project/${this.$route.params.id}/editpoint/${planeId}/${siteId}/${pointId}`,
          this.editPointForm
        )
        .then(res => {
          this.$_initBaseInfo(res.data);
          this.INIT_CURRENT_PROJECT(res.data);
          this.$message.success("修改成功!");
        });
    },
    deletePoint() {
      this.$confirm("此操作将永久删除该测点, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let plane = this.project[this.index.planeIndex];
          let site = plane.children[this.index.siteIndex];
          let point = site.value[this.index.pointIndex];
          let planeId = plane._id;
          let siteId = site._id;
          let pointId = point._id;
          this.$http
            .delete(
              `/project/${this.$route.params.id}/deletepoint/${planeId}/${siteId}/${pointId}`,
              this.editPointForm
            )
            .then(res => {
              this.$_initBaseInfo(res.data);
              this.INIT_CURRENT_PROJECT(res.data);
              this.$message.success("删除成功!");
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },

    getPlane() {
      let plane = this.project[this.index.planeIndex];
      this.editPlaneForm._id = plane._id;
      this.editPlaneForm.name = plane.name;
      this.editPlaneForm.img = plane.img;
      this.editPlaneForm.timeStamp = plane.timeStamp;
    },
    getSite() {
      let plane = this.project[this.index.planeIndex];
      let site = plane.children[this.index.siteIndex];
      this.editSiteForm._id = site._id;
      this.editSiteForm.name = site.name;
      this.editSiteForm.machineinfo = site.machineinfo;
    },
    getPoint() {
      let plane = this.project[this.index.planeIndex];
      let site = plane.children[this.index.siteIndex];
      let point = site.value[this.index.pointIndex];
      this.editPointForm._id = plane._id;
      this.editPointForm.plane = plane.name;
      this.editPointForm.site = site.name;
      this.editPointForm.name = point.name;
      this.editPointForm.position = point.position;
      this.editPointForm.type = point.type;
      this.editPointForm.unit = point.unit;
      this.editPointForm.group = point.group;
      this.editPointForm.threshold = point.threshold;
      this.editPointForm.ratio = point.ratio;
      this.editPointForm.initialError = point.initialError;
    }
  },
  created() {
    this.$http.get(`project/${this.$route.params.id}/sensor`).then(res => {
      this.$_initBaseInfo(res.data);
      this.INIT_CURRENT_PROJECT(res.data);
      //添加测区默认值
      let length = this.project.length;
      if (length > 0) {
        this.planeForm.name = this.project[length - 1].name;
        this.planeForm.img = this.project[length - 1].img;
        this.planeForm.timeStamp = this.project[length - 1].timeStamp;
        let plane = this.project[length - 1];
        if (plane.children.length > 0) {
          // 添加测站默认值
          let site = plane.children[plane.children.length - 1];
          this.siteForm.machineinfo = site.machineinfo;
          this.siteForm.name = site.name;
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.moudle-title {
  font-size: 20px;
  line-height: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e4e7ed;
}
.block {
  margin: 0 auto;
  width: 400px;
  // height: 300px;
  overflow: hidden;
}
.tree {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 5px;
  color: #606266;
  .site-name {
    color: #606266;
    font-size: 20px;
  }
  .machine-info {
    color: #c0c4cc;
    font-size: 14px;
  }
  .tree-item-add {
    padding: 5px;
    height: 25px;
    line-height: 25px;
    color: #409eff;
    &:hover {
      cursor: pointer;
    }
  }
}
.tree-site-add {
  text-align: center;
  color: #409eff;
  &:hover {
    cursor: pointer;
  }
}
.add-module {
  text-align: center;
  color: #409eff;
  margin-top: 20px;
  &:hover {
    cursor: pointer;
  }
}
</style>