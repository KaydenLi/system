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
              <el-carousel-item v-for="item in bannners" :key="item._id">
                <img class="banner-img" :src="item.url" alt :title="item.title" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="section-header">
            <span>
              <i class="el-icon-microphone"></i>&nbsp;公告通知
            </span>
            <el-button @click="toAllNotes" type="text" style="float:right;font-size:14px;">
              所有公告
              <i class="el-icon-position"></i>
            </el-button>
          </div>
          <div v-if="posts">
            <div v-for="news in posts.slice(0,5)" :key="news._id">
              <p class="note">
                <i class="el-icon-caret-right"></i>&nbsp;
                <el-button
                  type="text"
                  class="note-link"
                  @click="toPostDetail(news._id)"
                >{{news.title}}</el-button>
              </p>
            </div>
          </div>
          <div v-else class="placeholder">
            <p>暂时没有任何通告</p>
          </div>

          <div class="section-header">
            <span>
              <i class="el-icon-link"></i> 相关链接
            </span>
          </div>
          <div v-if="allLinks">
            <el-link
              v-for="link in allLinks"
              :key="link._id"
              type="primary"
              :underline="false"
              :href="link.url"
              style="margin-right:2em;"
            >{{link.title}}</el-link>
          </div>
          <div v-else class="placeholder">
            <p>没有相关链接推荐</p>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <siteFooter></siteFooter>
  </el-container>
</template>

<script>
import bannerData from "../../mockData/banners.js";
import postsData from "../../mockData/notes.js";
import linkData from "../../mockData/links.js";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      bannersCount: 5,
      allLinks: [],
      bannners: []
    };
  },
  computed: {
    ...mapState(["posts"])
  },
  methods: {
    ...mapMutations(["initPosts"]),
    toLogin() {
      this.$router.push("/login");
    },
    toAllNotes() {
      this.$router.push("/notes");
    },
    toPostDetail(id) {
      let path = "/notes/" + id;
      this.$router.push(path);
    }
  },
  created() {
    this.bannersCount = 5;
    this.initPosts(postsData);
    this.allLinks = linkData;
    this.bannners = bannerData.slice(0, this.bannersCount);
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
.banner-img {
  width: 100%;
  height: 100%;
}
.placeholder {
  color: #99a9bf;
  font-size: 14px;
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
.note {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.note-link {
  padding: 0;
  color: #606266;
}
.note-link:hover {
  color: #409eff;
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
  padding: 7px 0;
  border-bottom: 1px solid #e4e7ed;
  font-size: 18px;
}
</style>