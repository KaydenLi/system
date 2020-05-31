<template>
  <div>
    <el-row>
      <el-col
        :xs="{span:22,offset:1}"
        :sm="{span:22,offset:1}"
        :md="{span:20,offset:2}"
        :lg="{span:14,offset:5}"
        :xl="{span:14,offset:5}"
      >
        <el-header>
          <div class="nav">
            <span class="logo">结构三维可视化监测系统</span>
            <el-link href="/login" type="primary" :underline="false" class="float-right">
              <i class="el-icon-switch-button"></i>&nbsp;登录/注册
            </el-link>
          </div>
        </el-header>
        <div class="block" v-if="banners.length">
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in banners" :key="item._id" :style="item.bgcolor">
              <img
                class="banner-img"
                @click="toBannerDetail(item._id)"
                :src="item.img"
                :alt="item.title"
                :title="item.title"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div v-else class="placeholder welcome">欢迎使用结构三维可视化监测系统</div>
        <div class="section-header">
          <span>
            <i class="el-icon-microphone"></i>&nbsp;公告通知
          </span>
          <el-button @click="toAllNotes" type="text" class="all-notes">
            所有公告
            <i class="el-icon-position"></i>
          </el-button>
        </div>
        <div v-if="posts.length">
          <div v-for="news in posts" :key="news._id">
            <p class="note">
              <i class="el-icon-caret-right"></i>&nbsp;
              <el-button
                type="text"
                class="note-link"
                @click="toPostDetail(news._id)"
                :title="news.digest"
              >{{news.title}}</el-button>
              <span class="note-time">{{news.createTime.slice(0,10)}}</span>
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
        <div v-if="allLinks.length">
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
          <p>暂时没有相关链接</p>
        </div>
        <siteFooter></siteFooter>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannersCount: 5,
      allLinks: [],
      banners: [],
      posts: []
    };
  },
  computed: {},
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    toAllNotes() {
      this.$router.push("/notes");
    },
    toPostDetail(id) {
      let path = "/notes/" + id;
      this.$router.push(path);
    },
    toBannerDetail(id) {
      let path = "/banner/" + id;
      this.$router.push(path);
    }
  },
  created() {
    this.$http.get(`/post/list`).then(res => {
      this.posts = res.data;
    });
    this.$http.get(`/banner/list`).then(res => {
      this.banners = res.data;
    });
    this.$http.get(`/link/list`).then(res => {
      this.allLinks = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  .nav {
    height: 4em;
    line-height: 4em;
    border-bottom: 1px solid #DCDFE6;
    .logo {
      font-size: 20px;
      color: #303133;
    }
    .float-right {
      float: right;
    }
  }
}

.el-main {
  min-height: 60vh;
}
.block {
  padding-top: 20px;
  height: 300px;
  text-align: center;
  .banner-img {
    width: 100%;
    &:hover {
      cursor: pointer;
    }
  }
}
.welcome {
  margin: 40px;
}
.section-header {
  margin-top: 10px;
  padding: 7px 0;
  border-bottom: 1px solid #DCDFE6;
  font-size: 18px;
  .all-notes {
    float: right;
  }
}
.note {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &:hover {
    background-color: #ebeef5;
  }
  .note-link {
    padding: 0;
    color: #606266;
    &:hover {
      color: #409eff;
    }
  }
  .note-time {
    font-size: 14px;
    padding-right: 10px;
    float: right;
    color: #606266;
  }
}
.placeholder {
  text-align: center;
  font-weight: 200;
  color: #99a9bf;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>