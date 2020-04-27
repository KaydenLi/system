<template>
  <div>
    <div class="project">
      <div class="project-img">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload/img'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="updateForm.img" :src="updateForm.img" title="点击修改图片" class="avatar el-upload" />
          <i v-else class="el-icon-plus avatar-uploader-icon el-upload"></i>
          <div slot="tip" class="el-upload__tip">点击即可修改项目图片，支持jpg/png文件，建议尺寸为：400*300。</div>
        </el-upload>
      </div>
      <div class="project-edit">
        <div class="project-item">
          <i class="el-icon-price-tag"></i>
          <span class="item-title">项目名称：</span>
          <span>{{projectInfo.projectName}}</span>
        </div>
        <div class="project-item">
          <i class="el-icon-map-location"></i>
          <span class="item-title">项目地址：</span>
          <span>{{projectInfo.address}}</span>
        </div>
        <div class="project-item">
          <i class="el-icon-guide"></i>
          <span class="item-title">结构类型：</span>
          <span>{{projectInfo.structuralType}}</span>
        </div>
        <div class="project-item">
          <i class="el-icon-view"></i>
          <span class="item-title">开放状态：</span>
          <span>{{projectInfo.openStatus===false?"未开放":"已开放"}}</span>
        </div>
        <div class="project-item">
          <el-button
            class="edit-item"
            @click="dialogEditVisible = true"
            type="primary"
            size="mini"
          >修改</el-button>
        </div>
      </div>
    </div>

    <div class="project-info">
      <div
        v-for="item in baseInfo"
        :key="item._id"
        @click="dialogEditInfoVisible=true;editInfo(item)"
        class="item-class"
        title="点击修改信息"
      >
        <p>
          <i :class="item.icon"></i>
        </p>
        <span>{{item.name}}</span>
        <p class="value">{{item.value}}{{item.unit}}</p>
      </div>
      <div class="item-class add-info" @click="dialogTableVisible = true" title="点击新增信息">
        <p>
          <i class="el-icon-circle-plus-outline"></i>
        </p>
        <span>新增</span>
        <p class="value">自定义数据</p>
      </div>
    </div>

    <el-dialog title="添加项目当前信息" :visible.sync="dialogTableVisible" width="40%" top="20px">
      <el-form :model="itemForm">
        <el-form-item label="信息项名称" label-width="6em">
          <el-input v-model="itemForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="信息项图标" label-width="6em">
          <el-input v-model="itemForm.icon" autocomplete="off">
            <el-button slot="append" icon="el-icon-search" @click="toIcons" title="点击查看图标列表"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="信息项值" label-width="6em">
          <el-input v-model="itemForm.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" label-width="6em">
          <el-input v-model="itemForm.unit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false;cancelAddInfo()">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false;addInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改项目当前信息" :visible.sync="dialogEditInfoVisible" width="40%" top="20px">
      <el-form :model="editInfoForm">
        <el-form-item label="信息项名称" label-width="6em">
          <el-input v-model="editInfoForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="信息项图标" label-width="6em">
          <el-input v-model="editInfoForm.icon" autocomplete="off">
            <el-button slot="append" icon="el-icon-search" @click="toIcons" title="点击查看图标列表"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="信息项值" label-width="6em">
          <el-input v-model="editInfoForm.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" label-width="6em">
          <el-input v-model="editInfoForm.unit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogEditInfoVisible = false;deleteInfo()">删 除</el-button>
        <el-button type="primary" @click="dialogEditInfoVisible = false;updateInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改项目基本信息" :visible.sync="dialogEditVisible" width="40%" top="20px">
      <el-form :model="updateForm">
        <el-form-item label="项目名称" label-width="6em">
          <el-input v-model="updateForm.projectName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在省区" label-width="6em">
          <el-input v-model="updateForm.province" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在县市" label-width="6em">
          <el-input v-model="updateForm.city" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" label-width="6em">
          <el-input v-model="updateForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目结构" label-width="6em">
          <el-input v-model="updateForm.structuralType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开放状态" label-width="6em">
          <el-select v-model="openStatusValue">
            <el-option label="开放" value="开放"></el-option>
            <el-option label="不开放" value="不开放"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false;cancelUpdateProject()">取 消</el-button>
        <el-button type="primary" @click="dialogEditVisible = false;updateProject()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogEditVisible: false,
      dialogEditInfoVisible: false,
      baseInfo: [],
      itemForm: {
        name: "信息项",
        icon: "el-icon-menu",
        value: "0",
        unit: "m/s"
      },
      updateForm: {
        projectName: "",
        province: "",
        city: "",
        address: "",
        structuralType: "",
        openStatus: false,
        img: ""
      },
      editInfoForm: {},
      openStatusValue: ""
    };
  },
  computed: {
    ...mapState(["projectInfo"]),
    // openStatusValue: function() {
    //   return this.updateForm.openStatus === false ? "不开放" : "开放";
    // }
  },
  components: {},
  methods: {
    ...mapMutations(["INIT_CURRENT_PROJECT_INFO"]),
    editProject() {
      this.$message.info(`修改`);
    },
    handleSuccess() {
      this.$message.info(`封面图片上传成功`);
    },
    updateProject() {
      let id = this.$route.params.id;
      if (this.openStatusValue === "不开放") {
        this.updateForm.openStatus = false;
      } else {
        this.updateForm.openStatus = true;
      }
      this.$http.post(`project/${id}/update`, this.updateForm).then(res => {
        this.INIT_CURRENT_PROJECT_INFO(res.data);
        this.$message.success("信息修改成功");
      });
    },
    cancelUpdateProject() {
      this.$message("已取消修改项目信息");
    },
    cancelAddInfo() {
      this.$message("已取消添加信息项");
    },
    addInfo() {
      let flag = false;
      this.baseInfo.forEach(item => {
        if (item.name === this.itemForm.name) {
          flag = true;
        }
      });
      if (flag) {
        this.$message.error("信息项已存在，请勿重复添加");
        return;
      }
      this.$http
        .post(`/project/${this.$route.params.id}/addinfo`, this.itemForm)
        .then(res => {
          this.INIT_CURRENT_PROJECT_INFO(res.data);
          this.baseInfo = this.projectInfo.baseInfo;
          this.$message.success("成功添加了一条信息项");
        });
    },
    editInfo(item) {
      this.editInfoForm = item;
    },
    deleteInfo() {
      this.$http
        .post(
          `/project/${this.$route.params.id}/deleteinfo/${this.editInfoForm._id}`,
          this.editInfoForm
        )
        .then(res => {
          this.INIT_CURRENT_PROJECT_INFO(res.data);
          this.baseInfo = this.projectInfo.baseInfo;
          this.$message.success("已删除信息项");
        });
    },
    updateInfo() {
      this.$http
        .post(
          `/project/${this.$route.params.id}/editinfo/${this.editInfoForm._id}`,
          this.editInfoForm
        )
        .then(res => {
          this.INIT_CURRENT_PROJECT_INFO(res.data);
          this.$message.success("成功修改信息项");
        });
    },
    toIcons() {
      window.open("https://element.eleme.cn/#/zh-CN/component/icon", "_blank");
    },
    afterUpload(res) {
      this.$set(this.updateForm, "img", res.url);
      this.$http
        .post(`project/${this.$route.params.id}/update`, this.updateForm)
        .then(res => {
          this.INIT_CURRENT_PROJECT_INFO(res.data);
          this.$message.success("图片修改成功");
        });
    }
  },
  created() {
    let id = this.$route.params.id;
    this.$http.get(`project/${id}`).then(res => {
      this.INIT_CURRENT_PROJECT_INFO(res.data);
      this.baseInfo = this.projectInfo.baseInfo;
      this.updateForm.projectName = this.projectInfo.projectName;
      this.updateForm.province = this.projectInfo.province;
      this.updateForm.city = this.projectInfo.city;
      this.updateForm.address = this.projectInfo.address;
      this.updateForm.structuralType = this.projectInfo.structuralType;
      this.updateForm.openStatus = this.projectInfo.openStatus;
      this.updateForm.img = this.projectInfo.img;
    });
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
      display: inline;
      padding-right: 20px;
      // height: 30px;
      .edit-item {
        margin-left: 10px;
      }
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
    // display: inline-block;
    text-align: center;
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
    &:hover {
      cursor: pointer;
    }
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