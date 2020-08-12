import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uname:'', 
    //组件一开始加载时，执行这个文件时，先从本地缓存把购物车数据拉下来，保存进全局
    car:JSON.parse(localStorage.getItem('car')||'[]')
  },
  mutations: { //专门负责修改state中的变量
    setUname(state,uname){
      state.uname=uname;
    },
    logout(state){
      state.car=[]
    },
    addToCar(state,goodsInfo){ //点击加入购物车，把商品保存到store的car上
      let flag=false;//假设购物车中没有找到
      //如果购物车之前有商品，只需要更新数量，否则添加新的商品
      state.car.forEach(item => {
        if(item.pid==goodsInfo.pid){
          item.addCount += parseInt(goodsInfo.addCount);
          flag=true;
          return true;
        }
      });
      //如果最终循环完毕，得到flag还是false，则把商品数据直接添加到car中
      if(!flag){
        state.car.push(goodsInfo);
      }
      // console.log(state.car)
      //把car 存储到本地的localstorage里面
      localStorage.setItem('car',JSON.stringify(state.car))
    } 
  },
  actions: {  //专门发起异步请求，负责从服务器拿数据
    submit(context,user){
			(async function(){
       var result= await axios.post('/user/login',`username=${user.username}&password=${user.password}`);
      //  console.log(result.data.result)
       if(result.data.result!=undefined){
        context.commit("setUname",result.data.result.uname)
        alert('登陆成功')
        router.push('/')
       }else{
         alert('账号或密码错误')
       }
      })()
	}
  },
  modules: {
  },
  getters:{ 
    //用来获取右上角加入购物车的数量，总数量c
    getAllCount(state){
    var c =0;
    state.car.forEach(item=>{
      c+=item.addCount;
    })
    return c;
    }
  }
})
