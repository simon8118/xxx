import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = () => import('../pages/login.vue')
const index = () => import("../pages/index.vue")
const manage = () => import("../pages/manage.vue")
const welcome = () => import("../pages/welcome.vue")
const modifyPwd = () => import("../pages/modifyPwd.vue")
const teaching = () => import("../pages/teaching.vue")
const banner = () => import("../pages/banner.vue")
const water = () => import("../pages/water.vue")
const repair = () => import("../pages/repair.vue")
const homeMaking = () => import("../pages/homeworker.vue")

export default new Router({

  routes: [
    {
      path: "/index",
      component: index,
      children: [
        {
          path: 'manage',
          name: '管理员管理',
          component: manage,
        },
        {
          path: 'welcome',
          component: welcome
        },
        {
          path: 'modifyPwd',
          name: '修改密码',
          component: modifyPwd
        },
        {
          path: 'banner',
          name: 'banner管理',
          component: banner
        },
        {
          path: 'water',
          name: '水站管理',
          component: water
        },
        {
          path: 'homeMaking',
          name: '家政管理',
          component: homeMaking
        },
        {
          path: 'repair',
          name: '维修管理',
          component: repair
        },
        {
          path: 'teaching',
          name: '家教管理',
          component: teaching,
        },
        {
          path: '',
          redirect: "welcome"
        }
      ]
    },
    {
      path: '/login',
      component: login
    },
    
    {
      path:"*",
      redirect:"/login"
    }
  ]
})
