import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'

//为防止多次点击同一路由跳转控制台报错，做一个push处理
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/product/:keyword',
    name: 'Product',
    component: () => import( '../views/product.vue'),
    props:true
  },
  {
    path:'/details/:id',
    name:'Details',
    component:()=>import('../views/details.vue'),
    props:true
  },
 {
   path:'/regist',
   name:'Regist',
   component:()=>import('../views/regist.vue')
 },
 {
   path:'/login',
   name:'Login',
   component:()=>import('../views/login.vue')
 },
 {
   path:'/shopcar',
   name:'Shopcar',
   component:()=>import('../views/shopcar.vue')
 },
 
]

const router = new VueRouter({
  routes
})

export default router
