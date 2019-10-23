// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
// axios
import axios from 'axios'
import filters from '@/filter'
import $ from 'jquery'
Vue.prototype.$ = $
//git  find . "(" -name "*.css" -or -name "*.vue" -or -name "*.js" -or -name "*.styl" ")" -print | xargs wc -l

// 过滤器//
for (const key in filters) {
  Vue.filter(key, filters[key])
}

// 请求拦截 config-你发送的参数
axios.interceptors.request.use(config => {
  config.a = 10;
  console.log("=========qingqiu拦截====================", config.url)
  // if(1){//未登录
  //   router.replace("/login")
  //   return;
  // }
  return config
})

// http://pzpj1ev9k.bkt.clouddn.com/1571760446169.jpg

//响应拦截 config-后端返你的数据
axios.interceptors.response.use(res => {
  console.log('=====' + res + '====响应拦截=========' + res.config.url)
  // if (store.state.users.type != 0 && store.state.users.type != 1) {//未登录
  //   router.replace("/login")
  //   return;
  // }
  return res;
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
