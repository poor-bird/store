// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 导入axios组件
import axios from 'axios'
// 导入element-ui组件
import ElementUI from 'element-ui'
// 导入样式
import '../node_modules/element-ui/lib/theme-chalk/index.css'

import './assets/css/style.css'
import router from './router'
// 将axios 挂在到Vue.prototype
Vue.prototype.$http = axios

// 使用element-ui组件
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
