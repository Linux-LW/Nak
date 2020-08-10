<template>
    <div class="product">
        <div class="navbar">
            <router-link to="/">首页</router-link>
            <span>/</span>
            <span>商品搜索结果</span>
        </div>
        <h3>{{keyword}}</h3>
    <!-- 排序导航 -->
        <div class="sort">
            <ul>
                <li>价格从高到低</li>
                <li>价格从低到高</li>
                <li>人气从高到低</li>
                <li>人气从低到高</li>
            </ul>
    <!-- 将一共查询到几个商品显示到网页上给用户看 -->
                <!-- 如果返回来的数据是0，那么就没有查询到数据，此时把0放在查询显示上面 
                    如果不等于0，那么就返回查询到的数组的长度
                -->
            <p class="count">共<span>{{listData.length>0?`${listData.length}`:'0'}}</span>个商品</p>
        </div>
    <!-- 已查询到的商品列表 -->
        <div class="proList">
           <ul v-if="ishas">    <!-- 如果查询结果返回一个true，就显示以下商品 -->
                <li v-for="(i,k) of listData" :key="k" class="listItem">
                        <router-link :to="`/details/${i.id}`"><img :src="i.purl" alt=""></router-link>
                       <div class="Listinfo">
                        <span>￥{{i.pprice.toFixed(2)}}元</span><br>
                        <span @click="goto($event,k)"><router-link :to="`/details/${i.id}`">{{i.pname}}</router-link></span>
                       </div>
                       <div class="shopBox">
                           <router-link :to="`/details/${i.id}`"><div class="addshop"><font style="font-weight:1500">+</font>加入购物车</div></router-link>
                           <div class="care">❤</div>
                       </div>
                </li>
            </ul>
            <!-- 如果查询返回结果是一个false，那么就显示未找到该商品 -->
            <div  class="notFound" v-else>
                <p>抱歉！请换个<font style="color:red">关键词</font>查找，或者<font style="color:red">该商品暂时还未上架！</font>请您选择别的商品</p>   
            </div>
            <div class="page">
                <ul>
                    <li @click="up">上一页</li>
                    <li v-for="(i,k) in pageCount" :key="k" @click="go(i)">{{i}}</li>
                    <li @click="down">下一页</li>
                </ul>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    //把上个页面路由传参的到的参数获取，变成自己的值
    props:["keyword"],
    data() {
        return {
            listData:'',
            ishas:'',
            page:1,
            pageCount:'',
        }
    },
    methods:{
        down(){
            if(this.page!=this.pageCount){
                this.page+=1;
                this.load();
            }
        },
    up(){
        if(this.page!=1){
            this.page-=1;
            this.load();
        }
    },
    go(i){
        this.page=i
        this.load();
    },
    load(){ //封装一个请求axios的函数
         this.$axios.get(`pro/search?ptype=${this.keyword}&page=${this.page}`).then(res=>{
           if(res.data.result.length>0){
            this.listData=res.data.result;
            this.pageCount=res.data.pageCount;
            console.log(this.pageCount)
           this.ishas=true;
           }else{
               this.listData=0;
               this.ishas=false
           }
        })
    },
  
    },
  created() {
    this.load() //搜索框跳转
  },
  
    watch: {  //并且监听地址栏，如果一旦改变，就要马上重新请求axios
        keyword(){
          if(this.$route.params.keyword!=''){
              this.load(); 
          }
        },

    },
 }
</script>

<style scoped>

.page>ul>li:hover{
    background-color: rgb(125,125,125,.3);
}
    .page>ul>li{
        float: left;
        border: 1px solid lightgray;
        box-sizing: border-box;
        padding: 5px 10px 5px 10px;
        cursor: pointer;
        transition: all .2s linear;
    }
    .page>ul>li+li{
        border-left: 0;
        
    }
    .page>ul{
        list-style: none;
        width: 100%;
        display: flex;
        justify-content:center;
    }
    .page{
        width: 1240px; margin: 0 auto;
    }
    .product{
        width: 100%;
        margin-bottom: 50px;
        
    }
    .product>.navbar{
        width: 1240px;
        height: 30px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 5px 0px;
    }
    .product>.navbar>span{
        margin-left: 20px;
    }
    .product>.navbar>a,.product>.navbar>span{
        font-size: 12px;
        color: gray;
        text-decoration: none;
        
    }
    .product>.navbar>a:hover{
        color:red;
        
    }
    .product h3{
        height: 30px;
        margin-bottom: 20px;
        margin: 0 auto;
        width: 1240px;
        padding-top: 20px;
        border-bottom: 2px solid #ed6343;
        font-size: 18px;
    }
    .product .sort{
        width: 1240px;
        margin: 0 auto;
        height: 48px;
        line-height: 48px;
        background-color: #fafafa;
    }
    .product .sort ul{
        list-style: none;
    } 
    .product .sort ul>li{
        color: black;
        font-size: 12px;
        float: left;
    }
    .product .sort ul>li+li{
        margin-left:20px;
    }
    .product .sort ul>li:hover{
        color: red;
        cursor: pointer;
    }
    .product .sort .count{
        float: right;
        font-size: 10px;
    }
    .product .sort p.count>span{
        color: red;
        margin-left: 5px;
        margin-right: 5px;
    }
     .proList{
         width: 1240px;
         margin: 0 auto;
     }
     .proList>ul{
         list-style: none;
         margin-left: 20px;
     }
    .proList>ul>li{
        float: left;
        width: 280px;height: 407px;
        border-bottom: 1px solid gray;
        text-align: center;
        padding:10px 10px 10px 10px;
        transition: all .5s linear;
        margin-bottom: 10px;
        overflow: hidden;
    }
     
    .proList>ul::after{
        content: '';
        display: block;
        clear: both;
    }
    .proList>ul>li>a>img{
        width: 220px;height: 240px;
         cursor: pointer;
    }
    .proList>ul>li:hover{
        box-shadow: 2px 2px 5px gray; 
    }
    
    .Listinfo{
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        margin-top: 20px;
    }
    .Listinfo>span:first-child{
        color: orangered;
        font-size: 14px;
        font-weight: bold;
    }
    .Listinfo>span:last-child>a{
        font-size: 12px;
        text-decoration: none;
        color: black;
    }
    .Listinfo>span{
        box-sizing: border-box;
        padding: 2px 24px;
    }
    .Listinfo>span:last-child>a:hover{
        color:red ;
        cursor: pointer;
    }
    .notFound{
        width: 1240px;
        margin: 0 auto;
        height: 200px;
        font-size: 20px;
       display: flex;
       justify-content: center;
       align-items: center;
    }
    .shopBox>a>.addshop,.shopBox>.care{
        width: 120px; height: 30px;
        float: left;
        border: 1px solid black;
        margin-top:30px ;
        text-align: center;
        line-height: 30px;
        background-color:#ed6343 ;
        color: white;
        cursor: pointer;
    }
     .shopBox>a>.addshop:hover,.shopBox>.care:hover{
         background-color:black;
     }
    .shopBox>.care{
        float: right;
        background-color: #8c8c8c;
    }
    .shopBox{
        display: none;
        height:30px;
        
    }
    
    .listItem:hover>.shopBox{
        display: block;
    }
</style>