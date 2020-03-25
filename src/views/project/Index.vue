<template>
  <div>
    <div class="project">
      <div class="project-img">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload/avatars'"
          :show-file-list="false"
          :on-success="handleSuccess"
        >
          <img v-if="project.img" :src="project.img" class="avatar el-upload" />
          <i v-else class="el-icon-plus avatar-uploader-icon el-upload"></i>
          <div slot="tip" class="el-upload__tip">点击即可修改项目图片，支持jpg/png文件，建议尺寸为：400*300。</div>
        </el-upload>
      </div>
      <div class="project-edit">
        <div class="project-item">
          <i class="el-icon-price-tag"></i>
          <span class="item-title">项目名称：</span>
          <span>{{project.projectName}}</span>
          <i class="el-icon-edit" @click="updateProject('项目名称')"></i>
        </div>
        <div class="project-item">
          <i class="el-icon-map-location"></i>
          <span class="item-title">项目地址：</span>
          <span>{{project.address}}</span>
          <i class="el-icon-edit" @click="updateProject('项目地址')"></i>
        </div>
        <div class="project-item">
          <i class="el-icon-guide"></i>
          <span class="item-title">结构类型：</span>
          <span>{{project.type}}</span>
          <i class="el-icon-edit" @click="updateProject('结构类型')"></i>
        </div>
      </div>
    </div>

    <div class="project-info">
      <div v-for="item in project.infos" :key="item.name" class="item-class">
        <p>
          <i :class="item.icon"></i>
        </p>
        <span>{{item.name}}</span>
        <p class="value">{{item.value}}{{item.unit}}</p>
      </div>
      <div class="item-class add-info" @click="dialogTableVisible = true">
        <p>
          <i class="el-icon-circle-plus-outline"></i>
        </p>
        <span>新增</span>
        <p class="value">自定义数据</p>
      </div>
    </div>

    <el-dialog title="添加项目当前信息" :visible.sync="dialogTableVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="信息项名称" label-width="6em">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="信息项图标" label-width="6em">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="信息项值" label-width="6em">
          <el-input v-model="form.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" label-width="6em">
          <el-input v-model="form.unit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false;cancelAddInfo()">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false;addInfo()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {
        _id: "1",
        projectName: "湖北省武汉市洪山区华中科技大学xxxxxx建设项目",
        owner: "kaydenli",
        owner_id: "1",
        createdDate: "2019-09-08",
        address: "湖北省武汉市洪山区华中科技大学湖北省武汉市洪山区华中科技大学",
        img:
          "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        points: "",
        type: "钢筋混凝土结构，框架结构",
        infos: [
          { name: "ID", icon: "el-icon-bank-card", value: "1", unit: "" },
          {
            name: "创建日期",
            icon: "el-icon-date",
            value: "2020/02/02",
            unit: ""
          },
          {
            name: "所有者",
            icon: "el-icon-user",
            value: "kaydenli",
            unit: ""
          },
          { name: "查看人数", icon: "el-icon-view", value: 1234, unit: "人" },
          { name: "温度", icon: "el-icon-sunny", value: 25, unit: "℃" },
          { name: "气压", icon: "el-icon-timer", value: 1.0, unit: "MPa" },
          { name: "风速", icon: "el-icon-wind-power", value: 3.5, unit: "m/s" },
          {
            name: "风向",
            icon: "el-icon-wind-power",
            value: "西偏北15",
            unit: "°"
          }
        ]
      },

      dialogTableVisible: false,
      form: {
        name: "信息项",
        icon: "el-icon-menu",
        value: "0",
        unit: "m/s"
      }
    };
  },
  components: {},
  methods: {
    editProject() {
      this.$message.info(`修改`);
    },
    handleSuccess() {
      this.$message.info(`封面图片上传成功`);
    },
    updateProject(title) {
      this.$prompt(`请输入新的${title}`, "更新项目信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: `${title}已成功更新为` + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消更新${title}`
          });
        });
    },
    cancelAddInfo() {
      this.$message("已取消添加信息项");
    },
    addInfo() {
      //TODO添加信息项
      const names = [];
      this.infos.forEach(item => {
        names.push(item.name);
      });
      if (names.indexOf(this.form.name) >= 0) {
        this.$message.error("该信息项已存在");
        return;
      }
      this.infos.push(this.form);
      this.$message.success("成功添加了一条信息项");
    }
  },
  created() {
    //TODO:通过axios获取对应ID的项目信息
  }
};
</script>

<style lang="scss" scoped>
.project {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e4e7ed;
  .project-edit {
    vertical-align: top;
    display: inline-block;
    padding: 20px;
    .project-item {
      height: 30px;
      .item-title {
        font-weight: 300;
      }
      i {
        margin-left: 10px;
        color: #409eff;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .project-img {
    display: inline-block;
  }
}

.project-info {
  .item-class {
    border: 1px solid #e4e7ed;
    padding: 10px 15px;
    display: inline-block;
    margin: 10px;
    border-radius: 5px;
    text-align: center;
    font-weight: 300;
    min-width: 100px;
    i {
      font-size: 25px;
      color: #409eff;
      display: inline-block;
      padding-bottom: 10px;
      border-bottom: 1px solid #409eff;
    }
    .value {
      font-weight: 400;
      font-size: 18px;
    }
  }
  .add-info {
    cursor: pointer;
    border: 1px solid #67c23a;
  }
}

.el-menu-vertical-demo {
  border: none;
}
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 400px;
    height: 300px;
    line-height: 300px;
    text-align: center;
  }
  .avatar {
    width: 400px;
    height: 300px;
    display: block;
  }
}
</style>