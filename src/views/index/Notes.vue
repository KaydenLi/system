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
            <div
              v-if="!notes.length"
              style="color:#C0C4CC;text-align:center;margin-top:10em;"
            >还没有任何公告！</div>
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
                  <el-button @click="toDetail(note._id)" size="mini" type="primary">查看详情</el-button>
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
import postData from "../../mockData/notes.js";
export default {
  data() {
    return {
      header: { menu: "通知公告", toPageName: "返回首页", to: "/index" },
      notes: []
    };
  },
  methods: {
    toDetail(id) {
      let path = "/notes/" + id;
      this.$router.push(path);
    }
  },
  created() {
    this.notes = postData;
  }
};
</script>

<style lang="scss" scoped>
.block {
  margin-bottom: 100px;
}
</style>