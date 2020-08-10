import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 将头部、尾部内容 定义为全局组件 引入
import Head from './components/Head.vue'
import Foot from './components/Foot.vue'
import Top from './components/top.vue'
import qs from 'qs'




//引入element ui 组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import axios from 'axios' //1.在main.js 入口文件 引入已经下载好的 axios包，引号内的名字不能改，import右边的名字自取
import { mapState } from 'vuex'

//引用这个头部 尾部组件
Vue.component("Head",Head);
Vue.component("Foot",Foot);
Vue.component("Top",Top)


axios.defaults.WithCredentials=true;
axios.defaults.baseURL="http://localhost:3001"  //2.配置axios的默认地址，后面在用的时候就可以直接写接口名
Vue.prototype.$axios = axios //3.将axios,继承vue的原型链，加入vue的大家族

Vue.prototype.promise = function(url,data){
  return new Promise((resolv,reject) => {
    axios.get(url,{
      params: data
    }).then((res)=>{
        resolv(res)
    })
  })
}

Vue.config.productionTip = false

new Vue({
  computed: {
    ...mapState(["uname"])
  },
  router,  //路由器组件——实现单页面应用的核心
  store, //下个阶段要讲的vuex的只是
  render: h => h(App) //引入app.vue的内容
}).$mount('#app') //替换到页面中id为app的div位置
