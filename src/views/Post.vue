<template>
  <div>
    <siteHeader menu="通告详情" toPageName="返回通告" to="/notes"></siteHeader>
    <el-main>
      <el-row>
        <el-col
          :xs="{span: 24, offset: 0}"
          :sm="{span: 18, offset: 3}"
          :md="{span: 14, offset: 5}"
          :lg="{span: 10, offset: 7}"
          :xl="{span: 8, offset: 8}"
        >
          <div class="block"></div>
        </el-col>
      </el-row>
    </el-main>
    <siteFooter></siteFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toList() {
      this.$router.push("/notes");
    }
  }
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