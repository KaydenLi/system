import Vue from 'vue'
import Vuex from 'vuex'
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
    authProjects: {
        _id: "",
        userName: "",
        getChecked: [],
        toCheck: [],
        updated: false
    },
    applicationProjects: {
        _id: "",
        userName: "",
        getCheckedAuthed: [],
        toQuest: [],
        updated: false
    },
    posts: [],
    activeTab: "first"
}

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    getters,
    actions,
    mutations
})