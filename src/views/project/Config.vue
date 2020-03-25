<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane v-for="(module,index) in planes" :key="module._id">
        <span slot="label">
          <i class="el-icon-files"></i>
          {{module.name}}
        </span>
        <!-- 测面信息 -->
        <p class="moudle-title">
          测区{{module.name}}，共{{module.children.length}}个测站
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
            :md="{span: 20, offset: 2}"
            :lg="{span: 20, offset: 2}"
            :xl="{span: 20, offset: 2}"
          >
            <!-- 测站信息 -->
            <div v-for="(item,index2) in module.children" :key="item.name" class="tree">
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
                <el-table-column prop="_id" label="ID" width="60"></el-table-column>
                <el-table-column prop="name" label="测点名"></el-table-column>
                <el-table-column prop="type" label="测值类型" width="120"></el-table-column>
                <el-table-column prop="value[0]" label="当前值" width="120"></el-table-column>
                <el-table-column prop="limit" label="设计限值" width="120"></el-table-column>
                <el-table-column prop="unit" label="单位" width="80"></el-table-column>
                <el-table-column prop="initialError" label="初值" width="80"></el-table-column>
                <el-table-column prop="ratio" label="灵敏系数" width="120"></el-table-column>
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
              <el-button type="text" @click="addSiteVisible = true,setIndex(index,-1,-1)">
                <i class="el-icon-circle-plus-outline"></i>
                添加测站
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane>
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
              </el-form>
              <el-button type="primary" size="mini" @click="addPlane">确 定</el-button>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加测点dialog -->
    <el-dialog title="添加测点" width="40%" top="2em" :visible.sync="addPointVisible">
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
          <el-input v-model="pointForm.limit"></el-input>
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
    <el-dialog title="添加测站" width="40%" top="2em" :visible.sync="addSiteVisible">
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
        <el-button type="primary" @click="addSiteVisible = false">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 修改测区dialog -->
    <el-dialog title="修改测区" width="40%" top="2em" :visible.sync="editPlaneVisible">
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
        <el-button type="danger" @click="editPlaneVisible = false,deletePlane()">删 除</el-button>
        <el-button type="primary" @click="editPlaneVisible = false,editPlane()">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 添加测站dialog -->
    <el-dialog title="编辑测站" width="40%" top="2em" :visible.sync="editSiteVisible">
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
        <el-button type="primary" @click="editSiteVisible = false">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 修改测点dialog -->
    <el-dialog title="修改测点" width="40%" top="2em" :visible.sync="editPointVisible">
      <el-form :model="editPointForm" label-position="left">
        <el-form-item label="测点名称" label-width="80px">
          <el-input v-model="editPointForm.name"></el-input>
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
        <el-form-item label="设计限值" label-width="80px">
          <el-input v-model="editPointForm.limit"></el-input>
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
        <el-button type="primary" @click="editPointVisible = false,addPoint">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { initProjectData } from "../../components/mixins/initProjectData.mixin";
// MOCKDATA
import { planes as PLANES } from "../../mockData/plane.js";
export default {
  data() {
    return {
      planes: [],
      editPlaneForm: {
        name: "测区名",
        img: "url",
        timeStamp: "60"
      },
      editSiteForm: {
        name: "测站名",
        machineinfo: "设备信息"
      },
      editPointForm: {
        name: "测点名",
        type: "应力",
        unit: "MPa",
        group: [],
        limit: "1000",
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
        _id: "0",
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
        limit: "1000",
        ratio: "1.0"
      },
      index: { planeIndex: -1, siteIndex: -1, pointIndex: -1 }
    };
  },
  mixins: [initProjectData],
  methods: {
    // clickTreeNode() {},
    formatGroup(row) {
      return row.group.join("，");
    },
    setIndex(index, index2, index3) {
      this.index.planeIndex = index;
      this.index.siteIndex = index2;
      this.index.pointIndex = index3;
    },
    addPlane() {
      let tmpPlane = {};
      for (let key in this.planeForm) {
        tmpPlane[key] = this.planeForm[key];
      }
      if (tmpPlane.name === "") {
        this.$message.info("测区名不能为空");
        return;
      }
      let length = this.planes.length;
      tmpPlane._id = length + 1;
      let flag = false;
      for (let i = 0; i < length; i++) {
        if (this.planes[i].name === tmpPlane.name) flag = true;
      }
      if (flag) {
        this.$message.info("测区名已存在");
        return;
      }
      // TODO将数据上传到服务器
      this.planes.push(tmpPlane);
      this.$message.success("测区已添加");
    },
    addSite() {},
    addPoint() {
      window.console.log(this.index);
    },
    getPlane() {
      let plane = this.planes[this.index.planeIndex];
      this.editPlaneForm.name = plane.name;
      this.editPlaneForm.img = plane.img;
      this.editPlaneForm.timeStamp = plane.timeStamp;
    },
    editPlane() {},
    deletePlane() {
      this.$confirm("此操作将永久删除该测站, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    getSite() {
      let plane = this.planes[this.index.planeIndex];
      let site = plane.children[this.index.siteIndex];
      this.editSiteForm.name = site.name;
      this.editSiteForm.machineinfo = site.machineinfo;
    },
    editSite() {},
    deleteSite() {
      this.$confirm("此操作将永久删除该区, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    getPoint() {
      let plane = this.planes[this.index.planeIndex];
      let site = plane.children[this.index.siteIndex];
      let point = site.value[this.index.pointIndex];
      this.editPointForm.name = point.name;
      this.editPointForm.type = point.type;
      this.editPointForm.unit = point.unit;
      this.editPointForm.group = point.group;
      this.editPointForm.limit = point.limit;
      this.editPointForm.ratio = point.ratio;
      this.editPointForm.initialError = point.initialError;
      window.console.log(this.editPointForm);
    },
    editPoint() {},
    deletePoint() {
      this.$confirm("此操作将永久删除该测点, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    saveEdit() {
      alert("修改已保存");
    }
  },
  created() {
    this.$_initIaseInfo(PLANES);
    this.planes = PLANES;
    //添加测区默认值
    let length = this.planes.length;
    if (length > 0) {
      this.planeForm.name = this.planes[length - 1].name;
      this.planeForm.img = this.planes[length - 1].img;
      this.planeForm.timeStamp = this.planes[length - 1].timeStamp;
      let plane = this.planes[length - 1];
      if (plane.children.length > 0) {
        // 添加测站默认值
        let site = plane.children[plane.children.length - 1];
        this.siteForm.machineinfo = site.machineinfo;
        this.siteForm.name = site.name;
      }
    }

    // 添加测点默认信息
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
  height: 300px;
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