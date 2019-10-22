// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
// axios
import axios from 'axios'
import filters from '@/filter'



// 过滤器//
for (const key in filters) {
  Vue.filter(key, filters[key])
}

// 请求拦截 config-你发送的参数
axios.interceptors.request.use(config => {
  config.a = 10;
  console.log("=========qingqiu拦截====================")
  // if(1){//未登录
  //   router.replace("/login")
  //   return;
  // }
  return config
})

//响应拦截 config-后端返你的数据
axios.interceptors.response.use(config => {
  console.log(config, '=========响应拦截=========')
  // if (store.state.users.type != 0 && store.state.users.type != 1) {//未登录
  //   router.replace("/login")
  //   return;
  // }
  return config;
})

// 全局守卫
router.beforeEach((to, from, next) => {
  // console.log(store.state.users, '=========全局守卫=========',to, from)
  if (store.state.users.type && (store.state.users.type == 0 || store.state.users.type == 1) || to.path == "/login") {
    // console.log(store.state.users.type, '=========全局守卫=小行星========', to.path);
    next()
  } else {
    console.log('=========全局守卫=========', to);

    next("/login")
  }
})
// router.afterEach((to,from)=>{

// })

// 路由独享守卫
// [{
//   path: "/login",
//   component: login,
//   beforeEnter(to,from,next){
//     next()
//   }
// },
// 组件内守卫
// beforeRouteEnter (to, from, next) {//（ // 在渲染该组件的对应路由被 confirm 前调用 不！能！获取组件实例 `this`）
// beforeRouteUpdate(to, from, next) {
//   beforeRouteLeave (to, from, next) {


// export default {
//     methods:{},
//     // beforeRouteEnter(){

//     // }
// }

Vue.prototype.$axios = axios;
// element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// vuex
import Vuex from 'vuex'
Vue.use(Vuex)

import '@/assets/css/reset.css'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
