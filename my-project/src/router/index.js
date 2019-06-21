import Vue from 'vue'
import Router from 'vue-router'

// 引入login组件
import Login from '@/components/login/login.vue'
// 引入home组件
import Home from '@/components/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/login', name: 'login', component: Login },
    {path: '/home', name: 'home', component: Home}
  ]
})
