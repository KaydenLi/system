<template>
  <div>
    <siteHeader :header="header"></siteHeader>
    <el-main>
      <div class="list-holder">
        <p>
          请使用&nbsp;
          <strong>大屏设备</strong>&nbsp;打开本页面，以获取更好的浏览体验。
        </p>
      </div>
      <el-row>
        <el-col
          :xs="{span: 24, offset: 0}"
          :sm="{span: 22, offset: 1}"
          :md="{span: 22, offset: 1}"
          :lg="{span: 20, offset: 2}"
          :xl="{span: 20, offset: 2}"
        >
          <el-table
            :data="projects"
            stripe
            highlight-current-row
            style="width: 100%;"
            :row-style="{height:0+'px'}"
            :cell-style="{padding:5+'px'}"
          >
            <el-table-column prop="projectName" label="项目名称"></el-table-column>
            <el-table-column prop="createdTime" :formatter="formatTime" label="创建日期" width="180"></el-table-column>
            <el-table-column prop="watchersId" :formatter="formatWatcher" label="查看人数" width="180"></el-table-column>
            <el-table-column prop="address" :formatter="formatAddress" label="地址"></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="getAuthorization(scope.row._id)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align:center;margin:20px 0;">
            <el-pagination
              background
              layout="prev, pager, next"
              :pager-count="11"
              :page-size="pageSize"
              :total="total"
              @current-change="currentPageChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <siteFooter></siteFooter>
  </div>
</template>

<style lang="scss" scoped>
.list-holder {
  margin: 20px 0;
  display: block;
  color: #c0c4cc;
  text-align: center;
  @media screen and (min-width: 769px) {
    display: none;
  }
}
.el-input .el-select {
  width: 8em;
}
@media screen and (max-width: 769px) {
  .open-list {
    display: none;
  }
}
</style>>

<script>
export default {
  data() {
    return {
      header: { menu: "开放列表", toPageName: "返回主页", to: "/" },
      serchContent: "",
      searchType: "",
      projects: [],
      pageSize: 15,
      pageNumber: 1,
      total: 0
    };
  },
  methods: {
    serchProject() {
      alert("serchProject");
    },
    getAuthorization(id) {
      this.$router.push(`/project/${id}/authorization`);
    },
    formatTime(row) {
      return row.createdTime.slice(0, 10);
    },
    formatWatcher(row) {
      if (row.watchersId.length) {
        return row.watchersId.length;
      } else {
        return 0;
      }
    },
    formatAddress(row) {
      return (row.province || "") + (row.city || "") + (row.address || "");
    },
    currentPageChange(val) {
      this.pageSize = this.pageSize;
      this.pageNumber = val;
      this.$http
        .get(
          `/project/open?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
        )
        .then(res => {
          this.projects = res.data;
        })
        .catch(err => {
          window.console.log(err);
        });
    }
  },
  created() {
    this.$http
      .get(
        `/project/open?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
      )
      .then(res => {
        this.projects = res.data;
      });
    this.$http.get("/project/opencount").then(res => {
      this.total = res.data;
    });
  }
};
</script>