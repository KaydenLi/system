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
            <div v-if="!notes.length" style="color:#C0C4CC;text-align:center;">还没有任何公告！</div>
            <el-timeline>
              <el-timeline-item
                v-for="note in notes"
                :key="note._id"
                :timestamp="note.time"
                placement="top"
              >
                <el-card>
                  <h4>{{note.title}}</h4>
                  <p>{{note.summary}}</p>
                  <el-link :href="note.url" type="primary">查看详情</el-link>
                </el-card>
              </el-timeline-item>
            </el-timeline>
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
      header: { menu: "通知公告", toPageName: "返回首页", to: "/index" },
      notes: [
        {
          _id: "1",
          time: "2020/02/05",
          title: "结构三维可视化系统使用说明",
          summary: "介绍了结构三维可视化系统的使用说明,及注意事项。",
          url: "/notes/111"
        },
        {
          _id: "2",
          time: "2020/02/04",
          title: "结构三维可视化系统使用说明",
          summary: "介绍了结构三维可视化系统的使用说明,及注意事项。",
          url: ""
        },
        {
          _id: "3",
          time: "2020/02/03",
          title: "结构三维可视化系统使用说明",
          summary: "介绍了结构三维可视化系统的使用说明,及注意事项。",
          url: ""
        },
        {
          _id: "4",
          time: "2020/02/02",
          title: "结构三维可视化系统使用说明",
          summary: "介绍了结构三维可视化系统的使用说明,及注意事项。",
          url: ""
        },
        {
          _id: "5",
          time: "2020/02/01",
          title: "结构三维可视化系统使用说明",
          summary: "介绍了结构三维可视化系统的使用说明,及注意事项。",
          url: ""
        }
      ]
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