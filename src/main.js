import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'default-passive-events'

//注册header和footer两个全局组件
import includedHeader from './components/Header.vue'
import includedFooter from './components/Footer.vue'
Vue.component('siteHeader', includedHeader)
Vue.component('siteFooter', includedFooter)

Vue.config.productionTip = false

//导入axios，并在vue的原型上绑定一个axios实例，以便全局使用
import axios from 'axios'
Vue.prototype.$http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/web/api'
  baseURL: 'http://localhost:3000/web/api'
})

//响应拦截器，收到服务器响应时先进行对应处理
Vue.prototype.$http.interceptors.response.use(res => {
  //未出现错误则直接返回res
  return res;
}, err => {
  //>=400错误，进行错误处理
  // if (err.response.data.message) {
  //使用$message提示错误信息
  Vue.prototype.$message({
    type: 'error',
    message: err.response.data.message
  })
  // }
  //根据状态码进行处理
  if (err.response.status === 401) {
    //401，未登录，路由到登录页面
    router.push('/login')
  }
  //根据状态码进行处理
  if (err.response.status === 422) {
    //401，未登录，路由到登录页面
    router.push('/')
  }
  return Promise.reject(err)
})

//请求拦截器，发送请求时先进行处理
Vue.prototype.$http.interceptors.request.use(config => {
  if (localStorage.token) {
    //对于登录用户，页面请求时将token写入config中
    config.headers.Authorization = 'Bearer ' + localStorage.token;
  }
  return config;
}, err => {
  return Promise.reject(err)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
