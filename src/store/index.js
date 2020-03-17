import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)
const state = {
    userInfo: { //用户信息
        _id: "",
        adminFlag: false,
        loginStatus: false,
        welcomeFlag: true,
        userName: "user",
        address: "cn",
        phone: "157********",
        email: "********@**.com",
        projectsCount: 0,
        viewablesCount: 0,
        avatar: "",
        projects: []
    },
    authProjects: {//授权项目
        _id: "",
        userName: "",
        getChecked: [],
        toCheck: [],
        updated: false
    },
    applicationProjects: {//申请项目
        _id: "",
        userName: "",
        getCheckedAuthed: [],
        toQuest: [],
        updated: false
    },
    posts: [],//首页通告列表
    activeTab: "first",//默认活动tab页
    toogleSideBar: false,//隐藏/显示侧边栏项目中心
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