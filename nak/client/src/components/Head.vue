<template>
    <div class="head">
        <!-- 这里是登录注册 -->
        <div class="head-top">
            <div class="user">
                <ul>
                    <li><router-link to="/userinfo">用户中心</router-link></li>
                    <li><router-link to="/mycard">我的订单</router-link></li>
                    <li v-if="uname==''"><router-link to="/login">登录</router-link></li>
                    <li v-else class="admin">欢迎您：{{uname}}</li>
                    <li v-if="uname==''"><router-link to="/regist">注册</router-link></li>
                    <li v-else class="logout" @click="logout">退出</li>
                </ul>
            </div>
        </div>
        <div class="nav">
            <!-- 搜索框一栏 -->
            <div class="container">
                <img src="../assets/logo.jpg" alt="">
                <div class="con-info">
                    <input type="text" placeholder="简简单单爱" v-model="keyword" @keyup.13="search">
                    <div class="search" @click="search" ></div>
                    <div class="shopcar">
                        <div @click="toShop">
                            <img src="../assets/shopcar.png" alt=""> &nbsp; &nbsp;
                            <span v-if="$store.getters.getAllCount>0">购物车{{$store.getters.getAllCount}}</span>
                            <span v-else>购物车</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 导航栏 -->
            <div class="nav-list">
                <div class="list-info">
                    <div class="nav-type">
                        <p>商品分类</p>
                    </div>
                    <ul>
                        <li @click="index">首页</li>
                        <li @click="cookie">曲奇</li>
                        <li @click="bread">面包</li>
                        <li @click="cake">蛋糕</li>
                        <li @click="gift">礼盒</li>
                        <li @click="flaky">酥饼</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//分发抓取vuex中的方法，让里面的东西变成当前组件的内容
import {mapState,mapMutations,getters} from 'vuex'
export default {
    data(){
        return{
            keyword:'',
            timer:null,
            shp:''
        }
    },
    computed: {
        ...mapState(["uname"]),
      
    },
    methods: {
        ...mapMutations(["setUname"]),

        logout(){
            let msg="您确定需要退出登陆吗？"
            if(confirm(msg)==true){
                this.setUname(''); 
                this.$store.state.car=[]
                localStorage.clear();
                sessionStorage.clear();
               
            }
        },
        
        toShop(){
            if(!localStorage.uname){
                alert('请先登录您的账号密码')
            }else{
                this.$router.push('/shopcar')
            }
        },
        index(){
            this.$router.push('/')
        },
        search(){
        if(this.keyword==undefined || this.keyword.trim()==""){
         this.$router.push('/product/曲奇')
         }else{ this.$router.push("/product/"+this.keyword)};
        },
        cookie(e){
        //点击导航栏上的导航获取内容，并发送给商品列表页面
        this.$router.push('/product/'+e.target.innerHTML)
        },
        bread(e){
        this.$router.push('/product/'+e.target.innerHTML)
        },
        gift(e){
         this.$router.push('/product/'+e.target.innerHTML)
        },
        cake(e){
            this.$router.push('/product/'+e.target.innerHTML)
        },
        flaky(e){
            this.$router.push('/product/'+e.target.innerHTML)
        }
    },
    created() {
        this.keyword=this.$route.params.keyword;
    },
    mounted() {
        //尝试从浏览器的localstorage或sessionStorage中获取变量
        let uname=localStorage.getItem("uname")||sessionStorage.getItem("uname");
        //如果获取到了，就把uname放在setUname中，没有就放空字符串表示没有
        this.setUname(uname||"")
    },
    watch: {
        $route(){
          this.keyword=this.$route.params.keyword;
        }
    },
     
}
</script>
<style>
*{
    margin: 0; padding: 0;
}
.admin:hover{
    cursor: pointer;
}
.logout:hover{
    cursor: pointer;
    color:orange
}
    .head{
        width: 100%;
        min-width: 1200px;
    }
    .head>.head-top{
        width: 100%;
        height: 37px;
        background-color: #f8f8f8;
        border-top: 1px solid lightgray;
        border-bottom: 1px solid lightgray;
    }
    .head>.head-top>.user{
        margin: 0 auto;
        width: 1240px;
        height: 37px;
        line-height: 37px;
        
    }
    .head>.head-top>.user>ul{
        float: right;
        margin-bottom: 0;
    }
    .head>.head-top>.user>ul>li{
        list-style: none outside none;
        float: left;
        text-decoration: none;
        font-size: 12px;
        color: gray;
    }

    .head>.head-top>.user>ul>li>a{
        text-decoration: none;
        font-size: 12px;
        color: gray;
    }
     .head>.head-top>.user>ul>li>a:hover{
         color: black;
     }
    .head>.head-top>.user>ul>li+li{
        margin-left: 10px;
    }
    .head>.nav{
        width:100%;
        height: 145px;
        background-color: #fff;
        box-sizing: border-box;
       padding-top: 5px;
    }
    .head>.nav>.container{
        width: 1240px;
        height: 90px;
        margin:0 auto;
    }
    .head>.nav>.container>img{
        vertical-align:middle
    }
    .container>.con-info{
        float: right;
        margin-top: 30px;
        margin-bottom: 15px;
        width: 50%;
    }
    .container>.con-info>input{
        width: 382px;height: 40px;
        box-sizing: border-box;
        padding: 5px 10px;
        outline: none;
        border:1px solid lightgray;
        transition: all .1s linear;
    }
    .container>.con-info>input:hover{
        box-shadow: 0 2px 3px lightgray inset;
    }
    .search{
        width: 40px;
        height: 40px;
        background-color:#ed6343;
        display: inline-block;
        vertical-align: middle;
        background-image: url(../assets/search.png);
        background-repeat: no-repeat;
        background-position:center;
        cursor: pointer;
        transition: all .2s linear;
    }
    .search:hover{
        box-shadow: 3px 3px 30px gray inset;
        cursor: pointer;
    }
    .shopcar{
        width: 126px;
        height: 40px;
        background-color:#ed6343;
         vertical-align: middle;
         float:right;
         color: white;
        
         text-align: center;
         line-height: 40px;
         cursor: pointer;
    }
    .shopcar>div>img{
        vertical-align: middle;
    }
  
    .head .nav .nav-list{
        width: 100%;
        height: 50px;
        background-color:#383d40;
    }
    .head .nav .list-info{
        margin: 0 auto;
        width: 1240px;
        height: 50px;
        line-height: 50px;
    }
    .head .nav .list-info ul{
        list-style: none;
    }
    .nav-list>.list-info>.nav-type{
        float: left;
        box-sizing: border-box;
        width: 248px; height: 50px;
        background-color: #ed6343;
        font-size: 18px;
        color:white;
        padding: 0 20px;
       
    }
     .head .nav .list-info ul>li{
         float: left;
        height: 50px;
        width: 82px;
        text-align: center;
        font-size: 18px; color: white;
     }
      .head .nav .list-info ul>li:hover{
          cursor: pointer;
          background-color: #8c8c8c;
      }
</style>