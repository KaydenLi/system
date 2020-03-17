<template>
  <div>
    <el-collapse accordion>
      <el-collapse-item v-for="(module,index) in planes" :key="module.moduleName" :name="index">
        <template
          slot="title"
        >测区{{module.name}}，新数据获取时间为{{module.currenttime}}，包含{{module.children.length}}个测站。</template>
        <!-- 测面信息 -->
        <p class="moudle-title">
          <i class="el-icon-files"></i>
          {{module.name}}
          <el-button type="text" @click="saveEdit">编辑测区</el-button>
          <el-button type="primary" size="mini" @click="saveEdit" style="float:right;">保存修改</el-button>
        </p>
        <div class="block">
          <el-image :src="module.img"></el-image>
        </div>
        <!-- 测站信息 -->
        <div v-for="(item,index2) in module.children" :key="item.name" class="tree">
          <span class="site-name">
            <i :class="iconClass"></i>
            测站：{{item.name}}
            <el-button type="text">编辑信息</el-button>
          </span>
          <p class="machine-info">{{item.machineinfo}}</p>
          <!-- 测点信息 -->
          <div>
            <el-table :data="item.value">
              <el-table-column prop="_id" label="ID" width="60"></el-table-column>
              <el-table-column prop="name" label="测点名"></el-table-column>
              <el-table-column prop="type" label="测值类型"></el-table-column>
              <el-table-column prop="value[0]" label="当前"></el-table-column>
              <el-table-column prop="unit" label="单位"></el-table-column>
              <el-table-column prop="important" label="关键结点"></el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <el-button @click.native.prevent="editPoint(index2)" type="text" size="small">修改</el-button>
              </el-table-column>
            </el-table>
          </div>
          <!-- 添加测点 -->
          <div class="tree-item">
            <div class="tree-item-add">
              <el-button type="text" @click="addPointVisible = true">
                <i class="el-icon-circle-plus-outline"></i>
                添加测点
              </el-button>
              <el-dialog title="添加测点" :visible.sync="addPointVisible">
                <el-form :model="pointForm">
                  <el-form-item label="测点编号">
                    <el-input prop="name"></el-input>
                  </el-form-item>
                  <el-form-item label="测值类型">
                    <el-input prop="type"></el-input>
                  </el-form-item>
                  <el-form-item label="测值单位">
                    <el-input prop="unit"></el-input>
                  </el-form-item>
                  <el-form-item label="是否为关键结点">
                    <el-input prop="important"></el-input>
                  </el-form-item>
                  <el-form-item label="限值">
                    <el-input prop="limit"></el-input>
                  </el-form-item>
                  <el-form-item label="系数">
                    <el-input prop="ratio"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="addPointVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addPointVisible = false">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
        </div>
        <!-- 添加测站 -->
        <div class="tree-site-add">
          <el-button type="text" @click="addSiteVisible = true">
            <i class="el-icon-circle-plus-outline"></i>
            添加测站
          </el-button>
          <el-dialog title="添加测站" :visible.sync="addSiteVisible">
            <el-form :model="siteForm">
              <el-form-item label="测站名">
                <el-input v-model="siteForm.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="设备信息">
                <el-input v-model="siteForm.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addSiteVisible = false">取 消</el-button>
              <el-button type="primary" @click="addSiteVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 添加测面 -->
    <div class="add-module">
      <el-button type="text" @click="addPlaneVisible = true">
        <i class="el-icon-circle-plus-outline"></i>
        添加测面
      </el-button>
      <el-dialog title="添加测区" :visible.sync="addPlaneVisible">
        <el-form :model="planeForm">
          <el-form-item label="测区名">
            <el-input v-model="planeForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="截面图片">
            <el-input v-model="planeForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addPlaneVisible = false">取 消</el-button>
          <el-button type="primary" @click="addPlaneVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { planes } from "../../mockData/plane.js";
export default {
  data() {
    return {
      planes: [],
      iconClass: "el-icon-monitor",
      addPlaneVisible: false,
      addSiteVisible: false,
      addPointVisible: false,
      planeForm: {},
      siteForm: {},
      pointForm: {}
    };
  },
  methods: {
    clickTreeNode() {},
    addPlane() {
      this.$prompt(`请输入监测平面`, "添加平面", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value === null) {
            this.$message({
              type: "info",
              message: `监测平面名不能为空`
            });
            return;
          }
          let module = {};
          module.moduleName = value;
          module.img = "";
          module.points = [];
          let planes = this.planes;
          let length = planes.length;
          let flag = false;
          for (let i = 0; i < length; i++) {
            if (planes[i].moduleName === value) flag = true;
          }
          if (flag) {
            this.$message({
              type: "info",
              message: `平面已存在，请重新添加监测平面`
            });
            return;
          } else {
            this.planes.push(module);
            this.$prompt(`添加一个测面图(url)`, `添加测面图`, {
              confirmButtonText: "确定",
              cancelButtonText: "取消"
            })
              .then(({ value }) => {
                if (value === null) {
                  this.$message({
                    type: "info",
                    message: `监测平面图不能为空`
                  });
                  return;
                }
                let length = this.planes.length;
                this.planes[length - 1].img = value;
                this.$message({
                  type: "success",
                  message: `已添加测站`
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: `已取消添加监测平面`
                });
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消添加监测平面`
          });
        });
    },
    addSite(index) {
      this.$prompt(`请输入要添加的测站名`, "添加测站", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value === null) {
            this.$message({
              type: "info",
              message: `测站名不能为空`
            });
            return;
          }
          let site = {};
          site.siteName = value;
          let sites = this.planes[index].points;
          let length = sites.length;
          let flag = false;
          for (let i = 0; i < length; i++) {
            if (sites[i].siteName === value) flag = true;
          }
          if (flag) {
            this.$message({
              type: "info",
              message: `测站已存在，请重新添加`
            });
            return;
          } else {
            site.children = [];
            this.planes[index].points.push(site);
            this.$message({
              type: "success",
              message: `已添加测站` + value
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消添加测站`
          });
        });
    },
    addNode(index, index2) {
      this.$prompt(`请输入要添加的测点名`, "添加测点", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value === null) {
            this.$message({
              type: "info",
              message: `测点名不能为空`
            });
            return;
          }
          let node = {};
          node.nodeName = value;
          let nodes = this.planes[index].points[index2].children;
          let length = nodes.length;
          let flag = false;
          for (let i = 0; i < length; i++) {
            if (nodes[i].nodeName === value) flag = true;
          }
          if (flag) {
            this.$message({
              type: "info",
              message: `测点已定义，请重新添加测点`
            });
            return;
          } else {
            if (this.planes[index].points[index2].children) {
              this.planes[index].points[index2].children.push(node);
            } else {
              this.planes[index].points[index2].children = [];
              this.planes[index].points[index2].children.push(node);
            }
            this.$message({
              type: "success",
              message: `已添加测点` + value
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消添加测点`
          });
        });
    },
    saveEdit() {
      alert("修改已保存");
    }
  },
  created() {
    this.planes = planes;
  }
};
</script>

<style lang="scss" scoped>
.el-collapse-item__header {
  border: none;
}
.moudle-title {
  font-size: 20px;
  line-height: 20px;
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
  // background-color: #f2f6fc;
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