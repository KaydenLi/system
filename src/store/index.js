import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)
const state = {
    userInfo: null,//用户信息
    authProjects: null,//授权项目
    applicationProjects: null,//申请项目
    posts: [],//首页通告列表
    activeTab: "first"
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