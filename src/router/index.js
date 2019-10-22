import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = () => import('../pages/login.vue')
const index = () => import("../pages/index.vue")
const manage = () => import("../pages/manage.vue")
const welcome = () => import("../pages/welcome.vue")
const modifyPwd = () => import("../pages/modifyPwd.vue")
const teaching = () => import("../pages/teaching.vue")
const addimg = () => import("../components/common/addimg.vue")

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
          // children: [
          //   {
          //     path: 'add',
          //     component: add
          //   }
          // ]
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
          path: 'teaching',
          name: '家教管理',
          component: teaching,
          children: [
            {
              path: 'addimg',
              name: '添加家教banner',
              component: addimg
            },
          ]
        },
        // {
        //   path: 'add',
        //   component: add
        // },
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
