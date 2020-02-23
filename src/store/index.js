import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)
const state = { 
    userInfo: null, //用户信息
 }

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    getters,
    actions,
    mutations
})