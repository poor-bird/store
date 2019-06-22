import Vue from 'vue'
import Router from 'vue-router'

// 引入login组件
import Login from '@/components/login/login.vue'
// 引入home组件
import Home from '@/components/home/home'
// 导入用户列表组件
import UserList from '@/components/user/userList'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', name: 'login', component: Login},
    {path: '/home',
      name: 'home',
      component: Home,
      children: [
        {path: '/userList', name: 'userList', component: UserList}
      ]}

  ]
})
