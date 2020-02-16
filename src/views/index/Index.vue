<template>
  <el-container>
    <el-header>
      <div class="nav">
        <span class="logo">结构三维可视化检测系统</span>
        <el-link href="/login" type="primary" :underline="false" class="float-right">
          <i class="el-icon-switch-button"></i>&nbsp;登录/注册
        </el-link>
      </div>
    </el-header>
    <el-main>
      <div>
        <el-row>
          <el-col
            :xs="{span:22,offset:1}"
            :sm="{span:22,offset:1}"
            :md="{span:20,offset:2}"
            :lg="{span:14,offset:5}"
            :xl="{span:14,offset:5}"
          >
            <div class="block">
              <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in 4" :key="item">
                  <!-- <h3 class="small">{{ item }}</h3> -->
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col
            :xs="{span:22,offset:1}"
            :sm="{span:22,offset:1}"
            :md="{span:20,offset:2}"
            :lg="{span:14,offset:5}"
            :xl="{span:14,offset:5}"
          >
            <div>
              <div class="section-header">
                <span>
                  <i class="el-icon-microphone"></i>&nbsp;公告通知
                </span>
                <el-link
                  href="/notes"
                  type="primary"
                  :underline="false"
                  style="float:right;font-size:14px;"
                >
                  所有公告
                  <i class="el-icon-position"></i>
                </el-link>
              </div>
              <div v-for="news in allNews" :key="news._id">
                <p style="white-space: nowrap;text-overflow:ellipsis;overflow:hidden;">
                  <i class="el-icon-caret-right"></i>&nbsp;
                  <el-link :href="news.url" :underline="false">{{news.title}}</el-link>
                </p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col
            :xs="{span:22,offset:1}"
            :sm="{span:22,offset:1}"
            :md="{span:20,offset:2}"
            :lg="{span:14,offset:5}"
            :xl="{span:14,offset:5}"
          >
            <div>
              <div class="section-header">
                <span>
                  <i class="el-icon-link"></i> 相关链接
                </span>
              </div>
              <div>
                <el-link
                  v-for="link in allLinks"
                  :key="link._id"
                  type="primary"
                  :underline="false"
                  :href="link.url"
                  style="margin-right:2em;"
                >{{link.title}}</el-link>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <siteFooter></siteFooter>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      allNews: [
        {
          title: "结构三维可视化系统使用说明",
          url: "/notes/111",
          _id: "1"
        },
        {
          title: "结构三维可视化系统全景监测模型说明",
          url: "",
          _id: "2"
        },
        {
          title: "结构三维可视化系统注册使用说明",
          url: "",
          _id: "3"
        },
        {
          title: "一二三四五六七八九十一二三四五六七八九",
          url: "",
          _id: "4"
        },
        {
          title: "结构三维可视化系统系统说明",
          url: "",
          _id: "5"
        }
      ],
      allLinks: [
        {
          title: "vue",
          url: "",
          _id: "1"
        },
        {
          title: "node",
          url: "",
          _id: "2"
        },
        { title: "thingJs", url: "", _id: "3" }
      ]
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.nav {
  height: 4em;
  line-height: 4em;
  border-bottom: 1px solid #e4e7ed;
}
.logo {
  font-size: 20px;
  color: #303133;
}
.float-right {
  float: right;
  font-size: 14px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.box-card {
  margin-bottom: 2em;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.section-header {
  margin-top: 10px;
  border-bottom: 1px solid #e4e7ed;
  font-size: 18px;
}
</style>