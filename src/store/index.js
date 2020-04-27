import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)
const state = {
    userInfo: { //用户信息
        // _id: "",
        // adminFlag: false,
        // loginStatus: false,
        // welcomeFlag: true,
        // userName: "user",
        // address: "cn",
        // phone: "157********",
        // email: "********@**.com",
        // avatar: "",
    },
    projects: [//用户项目
        // {
        // projectName:"",//项目名称
        // address: "",//项目地址
        // structuralType:"",//结构类型
        // createdTime: "",//创建时间
        // openStatus: "",//开放状态
        // img: "",//项目图片
        // }
    ],
    authProjects: {//授权项目
        getChecked: [],
        toCheck: [],
    },
    applicationProjects: {//申请项目
        getAuthed: [],
        toQuest: [],
    },
    posts: [],//首页通告列表
    activeTab: "first",//默认活动tab页
    toogleSideBar: false,//隐藏/显示侧边栏项目中心
    project: [],
    projectInfo: {
        // {
        // _id: "1",
        // projectName: "湖北省武汉市洪山区华中科技大学xxxxxx建设项目",
        // ownerId: "1",
        // createdTime: "2019-09-08",
        // address: "湖北省武汉市洪山区华中科技大学湖北省武汉市洪山区华中科技大学",
        // img:
        // "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        // planeId: "",
        // structuralType: "钢筋混凝土结构，框架结构",
        // baseInfo: [
        //   { name: "ID", icon: "el-icon-bank-card", value: "1", unit: "" },
        //   {
        //     name: "创建日期",
        //     icon: "el-icon-date",
        //     value: "2020/02/02",
        //     unit: ""
        //   },
        //   { name: "查看人数", icon: "el-icon-view", value: 1234, unit: "人" },
        //   { name: "温度", icon: "el-icon-sunny", value: 25, unit: "℃" },
        //   { name: "气压", icon: "el-icon-timer", value: 1.0, unit: "MPa" },
        //   { name: "风速", icon: "el-icon-wind-power", value: 3.5, unit: "m/s" },
        //   {
        //     name: "风向",
        //     icon: "el-icon-wind-power",
        //     value: "西偏北15",
        //     unit: "°"
        //   }
        // ]
        // },//当前打开项目详细信息
    },
    threeDatas: [],
}

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    getters,
    actions,
    mutations,
    plugins: [
        persistedState({ storage: window.sessionStorage })
    ]
})