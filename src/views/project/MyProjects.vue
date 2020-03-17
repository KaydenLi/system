<template>
  <div>
    <div class="project-item">
      <span class="item-title">项目封面：</span>
      <span>
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload/avatars'"
          :show-file-list="false"
          :on-success="handleSuccess"
        >
          <img v-if="project.img" :src="project.img" class="avatar el-upload" />
          <i v-else class="el-icon-plus avatar-uploader-icon el-upload"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb。建议尺寸为：400*300。</div>
        </el-upload>
      </span>
    </div>
    <div class="project-item">
      <span class="item-title">项目ID：</span>
      <span>{{project._id}}</span>
    </div>
    <div class="project-item">
      <span class="item-title">项目名称：</span>
      <span>{{project.projectName}}</span>
      <i class="el-icon-edit" @click="updateProject('项目名称')"></i>
    </div>
    <div class="project-item">
      <span class="item-title">项目地址：</span>
      <span>{{project.address}}</span>
      <i class="el-icon-edit" @click="updateProject('项目地址')"></i>
    </div>
    <div class="project-item">
      <span class="item-title">开放授权数：</span>
      <span>{{project.watcher}}</span>
    </div>
    <div class="project-item">
      <span class="item-title">创建日期：</span>
      <span>{{project.createdDate}}</span>
    </div>
    <div class="project-item">
      <span class="item-title">结构类型：</span>
      <span>{{project.type}}</span>
      <i class="el-icon-edit" @click="updateProject('结构类型')"></i>
    </div>
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
        watcher: 1234,
        img:
          "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        timePoints: "",
        idPoints: "",
        type: "钢筋混凝土结构，框架结构"
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
    }
  },
  created() {
    //TODO:通过axios获取对应ID的项目信息
  }
};
</script>

<style lang="scss" scoped>
.project-item {
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