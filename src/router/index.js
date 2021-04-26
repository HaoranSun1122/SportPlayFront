import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/Welcome.vue'
import UserList from '../components/admin/UserList.vue'
// 引入login组件
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/login"
  },
  {
    path:"/login",
    component: Login
  },
  {
    path:"/home",
    component: Home,
    redirect:"/welcome",
    children:[
      {path:"/home",component:Welcome,},
      {path:"/user",component:UserList,},
    ]
  }
 
]

const router = new VueRouter({
  routes
})

export default router
