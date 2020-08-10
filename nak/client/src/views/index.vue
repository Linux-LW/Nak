<template>
<!-- 首页内容 -->
<div class="index">
    <!-- 轮播图区域 -->
        <div class="banner">
            <!-- 侧边导航栏 -->
            <div class="index-list">
                <ul>
                    <li @click="cookie">曲奇</li>
                    <li @click="bread">面包</li>
                    <li @click="cake">蛋糕</li>
                    <li @click="gift">礼盒</li>
                    <li @click="flaky">酥饼</li>
                </ul>
            </div>
            <!-- 轮播图 -->
            <div class="index-banner">
                <div>
                <img :src="banner[bannerIndex]" @mouseover="stop" @mouseout="start">
                </div>
                <div class="page" v-if="this.banner.length>1">
                    <ul>
                        <li @click="goto(prev)" @mouseover="stop" @mouseout="start" >&lt;</li>
                        <li v-for="(item,index) in banner" :key="index" @click="goto(index)" :class="{'current':bannerIndex == index}">{{index+1}}</li>
                        <li @click="goto(next)" @mouseover="stop" @mouseout="start" >&gt;</li>
                    </ul>
                </div>
            
            </div>
        </div>
        <!-- 首页商品展示栏 -->
            <div class="proFloor">
                <div class="Floor">
                    <div class="Floor-number"><h4>1F/{{type[0]}}</h4></div>
                    <div class="FloorPic" v-for="(i,k) in imgData.slice(0,4)" :key="k">
                      <router-link :to="`/details/${i.id}`"><img :src="i.purl"></router-link>
                      <p><router-link :to="`/details/${i.id}`">{{i.pname}}</router-link></p>
                      <span>￥{{i.pprice.toFixed(2)}}元</span>
                      <!-- 首页商品列表加入购物车按钮 -->
                      <div class="indexShop hide">
                          <img src="../assets/shopcar.png" alt="">&nbsp;&nbsp;
                          <span><router-link :to="`/details/${i.id}`">加入购物车</router-link></span>
                      </div>
                    </div>  
                </div>
          
                <div class="Floor">
                    <div class="Floor-number"><h4>2F/{{type[1]}}</h4></div>
                    <div class="FloorPic" v-for="(i,k) in imgData.slice(4,8)" :key="k">
                       <router-link :to="`/details/${i.id}`"><img :src="i.purl" title=""></router-link>
                      <p><router-link :to="`/details/${i.id}`">{{i.pname}}</router-link></p>
                      <span>￥{{i.pprice.toFixed(2)}}元</span>
                        <!-- 首页商品列表加入购物车按钮 -->
                      <div class="indexShop hide">
                          <img src="../assets/shopcar.png" alt="">&nbsp;&nbsp;
                          <span><router-link :to="`/details/${i.id}`">加入购物车</router-link></span>
                      </div>
                    </div>  
                </div>

                <div class="Floor">
                    <div class="Floor-number"><h4>3F/{{type[2]}}</h4></div>
                    <div class="FloorPic" v-for="(i,k) in imgData.slice(9,11)" :key="k">
                       <router-link :to="`/details/${i.id}`"><img :src="i.purl" title=""></router-link>
                      <p><router-link :to="`/details/${i.id}`">{{i.pname}}</router-link></p>
                      <span>￥{{i.pprice.toFixed(2)}}元</span>
                      <!-- 首页商品列表加入购物车按钮 -->
                      <div class="indexShop hide">
                          <img src="../assets/shopcar.png" alt="">&nbsp;&nbsp;
                          <span><router-link :to="`/details/${i.id}`">加入购物车</router-link></span>
                          
                      </div>
                    </div>  
                </div>
        
                <div class="Floor">
                    <div class="Floor-number"><h4>4F/{{type[3]}}</h4></div>
                    <div class="FloorPic" v-for="(i,k) in imgData.slice(10,12)" :key="k">
                       <router-link :to="`/details/${i.id}`"><img :src="i.purl" title=""></router-link>
                      <p><router-link :to="`/details/${i.id}`">{{i.pname}}</router-link></p>
                      <span>￥{{i.pprice.toFixed(2)}}元</span>
                      <!-- 首页商品列表加入购物车按钮 -->
                      <div class="indexShop hide">
                          <img src="../assets/shopcar.png" alt="">&nbsp;&nbsp;
                          <span><router-link :to="`/details/${i.id}`">加入购物车</router-link></span>
                      </div>
                    </div>  
                </div>
            </div>
        
</div>
</template>

<script>

export default {
    data(){
        return{
            //将轮播图素材的路径使用数组的方式保存起来
            banner:["http://localhost:3001/img/banner1.png","http://localhost:3001/img/banner2.png","http://localhost:3001/img/banner3.png","http://localhost:3001/img/banner4.png"],
            //默认显示图片
            bannerIndex:0,
            //定时器
            tmier:null,
            floorCount:[1,2,3,4],
            type:["曲奇","面包","礼盒","酥饼"],
            imgData:[],
            isActive:false,    
        }
    },
    methods: {
    // 首页点击添加购物车事件
    indexShopClick(index,e){
        e.target.innerHTML="已加入购物车"
        },
        goto(index){
            this.bannerIndex=index
        },
        //当鼠标移入时，停止播放
        stop(){
          clearInterval(this.tmier) 
        },
        //当鼠标移出时，开始播放
        start(){
        this.tmier=setInterval(() => {
           //调用next函数
           this.goto(this.next)
       }, 1500);
        },
        cookie(e){
            //点击导航栏上的导航获取内容，并发送给商品详情页面
            // console.log(e.target.innerHTML)
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
    computed: {
        //点击大于符号，让他返回上一张图片
        prev(){
            //如果当前下标为0
            if(this.bannerIndex==0){
                //返回当前数组的个数
               return this.banner.length-1;
            }else{
                //否则 让下标减一，
               return this.bannerIndex-1;
            }
        },
        next(){
            //如果当前下标等于当前数组的最大下标
            if(this.bannerIndex==this.banner.length -1){
            //就跳转到第一张图片
                return 0;
            }else{
                //否则就让下标+1，前进一张图片
                return this.bannerIndex+1;
            }
        },
    },
   mounted() {
       //当创建完成以及加载完成开始计时
       this.tmier=setInterval(() => {
           //调用next函数
           this.goto(this.next)
       }, 1500);
       this.$axios.get("index/index").then(res=>{ //因为axios已经加入vue对象大家族，所以用 “this.你的axios自命名.get/post” 的方式使用，在你的界面组件内使用
           this.imgData=res.data
       })
    console.log(localStorage.getItem("uname"),localStorage.getItem("id"))
   },
 
}
</script>
<style scoped>
div.indexShop span>a{
    text-decoration: none;color: wheat;
}
    .FloorPic:hover>div.indexShop{
        display: block;
    }
    .hide{
        display: none;
    }
    .index{
        width: 100%;
    }
    .index>.banner{
        margin: 0 auto;
        width: 1240px;
        height: 420px;
    }
    .index>.banner>.index-list{
        float: left;
    }
    .index>.banner>.index-list>ul{
        list-style: none;
    }
    .index-banner>div{
        cursor: pointer;
    }
    .index>.banner>.index-list>ul>li{
        width: 248px; height: 51px;
        box-sizing: border-box;
        padding: 15px 10px 10px 20px;
        border: 1px solid #dfdfdf;
        transition: all .1s linear;
        
    }
     .index>.banner>.index-list>ul>li>a{
         text-decoration: none;
         color: #6d6d6d;
     }
      .index>.banner>.index-list>ul>li:hover{
          border-left: 3px solid #ed6343;
          cursor: pointer;
          box-shadow: 2px 2px 10px lightgray inset;
      }
    .index>.banner>.index-banner{
        float: left;
        width: 990px;
        height: 100%;
        position: relative;
    }
    .index-banner .page{
        position: absolute;
        top:0px;
        left: 0px;
    }
    .index-banner .page>ul{
        list-style: none;
      width: 990px;
    }
    .index-banner .page>ul>li{
        float: left;
    }
    .index-banner .page>ul>li:first-child{
        color: white;
        font-size: 70px;
        position: absolute;
        top: 200px;
        margin-top: -35px;
        opacity: 0.8;
        display: block;
    }
     .index-banner .page>ul>li:last-child{
        position: absolute;
        right: 0;
        color: white;
        font-size: 70px;
        top: 200px;
        margin-top: -35px;
         opacity: 0.8;
        display: block;
    }
    .index-banner .page>ul>li{
        display: none;
    }
    .index .proFloor{
        width: 100%;
    }
    .index .proFloor>.Floor{
        margin: 0 auto;
        width: 1240px;
        height:287px;
        border-top:3px solid #ed6343;
        margin-bottom: 10px;
        margin-top: 5px;
      
    }
     .index .proFloor>.Floor>.Floor-number{
         width: 246px;height: 80px;
         box-sizing: border-box;
         padding: 30px;
         float: left;
         border-left:1px solid orange;
         border-right:1px solid orange;
         font-size: 15px;
     }
     .FloorPic{
         width: 248px;
         height: 287px;
         box-sizing: border-box;
         padding: 10px;
         border-right:1px solid lightgray;
         text-align: center;
         float: left;
         transition: all 0.2s linear;
     }
     .FloorPic:hover{
         box-shadow: 5px 5px 10px lightgray;
     }
      .FloorPic>a>img{
          width: 200px;height: 200px;
          cursor: pointer;
      }
      .FloorPic>p>a{
        color:black;
        font-size: 14px;
        text-decoration: none;
       
      }
      .FloorPic>p>a:hover{
        color:lightgreen;
      }

      .FloorPic>span>a{
        font-weight: 600;
        font-size: 14px;
        color:#35373e;
        text-decoration: none;
      }
      .indexShop{
          background-color: #ed6343;
          height: 30px;
          line-height: 30px;
          color:white;
          text-align: center;
          cursor: pointer;
          font-size: 14px;
          
      }
      .indexShop>img{
          vertical-align: middle;
      }
</style>

