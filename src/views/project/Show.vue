<template>
  <div>
    <siteHeader :header="header"></siteHeader>
    <el-main>
      <el-row>
        <el-col
          :xs="{span: 24, offset: 0}"
          :sm="{span: 18, offset: 3}"
          :md="{span: 14, offset: 5}"
          :lg="{span: 10, offset: 7}"
          :xl="{span: 8, offset: 8}"
        >
          <div class="block">
            <el-image :src="project.img">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <siteFooter></siteFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: { menu: "查看详情", toPageName: "返回主页", to: "/" },
      project: {
        projectName: "测试",
        _id: "111",
        img:
          "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
      }
    };
  },
  methods: {}
};
</script>

<style scoped>
.block {
  margin-bottom: 100px;
}
.box-card {
  margin: 0;
  padding: 0;
  border: none;
}
</style>