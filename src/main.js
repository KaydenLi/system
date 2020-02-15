import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

//注册header和footer两个全局组件
import includedHeader from './components/Header.vue'
import includedFooter from './components/Footer.vue'
Vue.component('siteHeader', includedHeader)
Vue.component('siteFooter', includedFooter)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
