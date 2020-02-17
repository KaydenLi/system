import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    //网站默认首页
    path: '/index',
    name: 'index',
    component: () => import('../views/index/Index.vue'),
    meta: { isPublic: true },
  },
  {
    //通知公告页面
    path: '/notes',
    name: 'notes',
    component: () => import('../views/index/Notes.vue'),
    meta: { isPublic: true },
  },
  {
    //通知公告详情页面
    path: '/notes/:id',
    name: 'post',
    component: () => import('../views/index/Post.vue'),
    meta: { isPublic: true },
  },
  {
    //开放列表页面
    path: '/list',
    name: 'list',
    component: () => import('../views/index/List.vue'),
  },
  {
    //注册页面
    path: '/register',
    name: 'register',
    component: () => import('../views/login/Register.vue'),
    meta: { isPublic: true }
  },
  {
    //忘记密码页面
    path: '/forget',
    name: 'forget',
    component: () => import('../views/login/Forget.vue'),
    meta: { isPublic: true }
  },
  {
    //登录页面
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue'),
    meta: { isPublic: true },
  },
  {
    //其他页面路由到404页面
    path: "/404",
    name: "404",
    component: () => import('../views/404/404.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/Home.vue'),
    children: [
      {
        //登录后页面根页面
        path: '/',
        name: 'root',
        component: () => import('../views/home/Root.vue')
      },
      {
        //创建项目页面
        path: 'createProjects',
        name: 'createProjects',
        component: () => import('../views/project/CreateProject.vue')
      },
      {
        path: 'project/:id/',
        name: 'detail',
        component: () => import('../views/project/Detail.vue'),
        children: [
          {
            //具体项目默认页面|项目管理页面
            path: 'index',
            name: 'projects',
            component: () => import('../views/project/MyProjects.vue')
          },
          {
            //具体项目图形可视化页面
            path: 'graphs',
            name: 'graphs',
            component: () => import('../views/project/Graphs.vue')
          },
          {
            //具体项目全景监测页面
            path: 'detection',
            name: 'detection',
            component: () => import('../views/project/Detection.vue')
          },
          {
            //具体项目评估预警系统页面
            path: 'estimation',
            name: 'estimation',
            component: () => import('../views/project/Estimation.vue')
          }
        ]
      },
      {
        //获取查看项目权限授权页面
        path: 'project/:id/authorization',
        name: 'authorization',
        component: () => import('../views/project/getAuthorization.vue')
      },
      {
        //查看其他作者项目页面
        path: 'project/:id/show',
        name: 'show',
        component: () => import('../views/project/Show.vue')
      },
    ]
  },
  {
    //其他页面路由到404页面
    path: "*",
    name: "others",
    component: () => import('../views/404/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
