<template>
  <div>
    <siteHeader menu="开放列表" toPageName="返回主页" to="/"></siteHeader>
    <el-main>
      <div class="list-holder">
        <p>
          请使用&nbsp;
          <strong>电脑</strong>&nbsp;打开本页面，以获取更好的浏览体验。
        </p>
      </div>
      <div class="open-list">
        <el-row>
          <el-col
            :xs="{span: 24, offset: 0}"
            :sm="{span: 18, offset: 3}"
            :md="{span: 14, offset: 5}"
            :lg="{span: 10, offset: 7}"
            :xl="{span: 10, offset: 7}"
          >
            <el-input
              placeholder="请输入项目名称/项目ID"
              v-model="serchContent"
              clearable
              autofocus
              class="input-with-select"
            >
              <el-select v-model="searchType" slot="prepend" placeholder="请选择">
                <el-option label="项目名称" value="projectName"></el-option>
                <el-option label="项目ID" value="_id"></el-option>
              </el-select>
              <el-button
                slot="append"
                @click="serchProject"
                icon="el-icon-search"
                style="color:#409EFF"
              ></el-button>
            </el-input>
          </el-col>
        </el-row>
        <div>
          <el-divider></el-divider>
          <el-row>
            <el-col
              :xs="{span: 24, offset: 0}"
              :sm="{span: 22, offset: 1}"
              :md="{span: 22, offset: 1}"
              :lg="{span: 20, offset: 2}"
              :xl="{span: 10, offset: 2}"
            >
              <div style="text-align:center;margin:20px 0;">
                <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
              </div>
              <el-table :data="project" stripe highlight-current-row style="width: 100%;">
                <el-table-column prop="date" label="创建日期" width="180"></el-table-column>
                <el-table-column prop="views" label="查看人数" width="180"></el-table-column>
                <el-table-column prop="name" label="项目名称"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column label="操作" width="180">
                  <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="getAuthorization(scope.row._id)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-main>
    <siteFooter></siteFooter>
  </div>
</template>

<style scoped>
.box-card {
  margin: 0;
  padding: 0;
  border: none;
}
.el-input .el-select {
  width: 8em;
}
@media screen and (max-width: 769px) {
  .open-list {
    display: none;
  }
  .list-holder {
    margin: 20px 0;
    display: block;
    color: #c0c4cc;
    text-align: center;
  }
}
@media screen and (min-width: 768px) {
  .list-holder {
    display: none;
  }
}
</style>>

<script>
export default {
  data() {
    return {
      serchContent: "",
      searchType: "",
      project: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          views: 10,
          _id: "111"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          views: 9,
          _id: "111"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          views: 8,
          _id: "111"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          views: 7,
          _id: "111"
        },
        {
          date: "2016-05-02",
          name: "王小虎王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          views: 6,
          _id: "111"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          views: 5,
          _id: "111"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          views: 4,
          _id: "111"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          views: 3,
          _id: "111"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          views: 2,
          _id: "111"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          views: 1,
          _id: "111"
        }
      ]
    };
  },
  methods: {
    serchProject() {
      alert("serchProject");
    },
    getAuthorization(id) {
      this.$router.push(`/project/${id}/authorization`);
    }
  }
};
</script>