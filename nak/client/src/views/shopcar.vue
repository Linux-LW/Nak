<template>
    <div class="shop" v-if=" this.$store.state.car.length>0">
        <div class="shop_body">
            <h3>我的购物车</h3>
            <table border="1" cellspacing='0' cellpadding='0'>
                <tr>
                    <th style="width:518px">商品</th>
                    <th>货号</th>
                    <th>规格</th>
                    <th>数量</th>
                    <th>价格</th>
                    <th>总价</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(i,k) in this.$store.state.car" :key="k" >
                    <td> <a href="javascript:;"><img :src="i.purl" alt=""></a>&nbsp;{{i.pname}}</td>
                    <td>{{i.pnumber}}</td>
                    <td>无</td>
                    <td>
                        <div>
                            <button @click="minus(i)">-</button>
                            <input readonly :value="i.addCount">
                            <button @click="add(i)">+</button>
                        </div>
                    
                    </td>
                    <td>￥{{i.price}}元</td>
                    <td>￥{{(i.price*i.addCount).toFixed(2)}}元</td>
                    <td @click="remove(i)">删除</td>
                </tr>
            </table>
            <div class="sumbox">
                <div class="sum">
                    <p><span style="font-size:16px;color:#ff4a00;font-weight:600">应付总额(</span> <span style="color:Green">不含运费
                        </span> <span style="font-size:16px;color:#ff4a00;font-weight:600"> )</span>
                             : <span style="font-size:25px;color:#ff4a00;font-weight:600">￥{{total.toFixed(2)}}元</span></p>
                </div>
            </div>
            <div class="clear">
                <div><a href="javascript:;" @click="clear">x清空购物车</a></div>
                <div>
                    <button>继续购物</button>
                    <button>结算</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="none">
        <p>您还没有添加商品，请去添加</p>
    </div>
</template>

<script>
import {mutations,mapState,getters} from 'vue'
export default {
    data() {
        return {
            count:'',
        }
    },    
    methods: {
        minus(i){
            if(i.addCount>1){
                i.addCount--;
            }
        },
        add(i){
           i.addCount++
            
        },
        remove(i){ 
        let removeStr ="您确定删除该商品吗？"
        if(confirm(removeStr)==true){
             this.$store.state.car= this.$store.state.car.filter((item)=>{
            return item !=i;
           })
            //获取到最新的一个对象
            //把这个对象转换成json字符串，存入本地缓存
            let shopcar =JSON.stringify( this.$store.state.car);
            localStorage.setItem('car',shopcar)
            //将移除之后的数据重新赋值给 store商店 里面的 car数组，以后取得时候，就会得到修改之后的car数组
            this.$store.state.car= this.$store.state.car
        }
        },
        clear(){
           let msg="您确定想要清空购物车？"
           if(confirm(msg)==true){
            //当用户点击清空购物车，那么就让当前从缓存中拔下来的数组清空
            this.$store.state.car=[];
            //再放回本地缓存
            localStorage.setItem('car',this.$store.state.car)
            
           }
        },
        // showcar(){
        
        // }
    },
    
    mounted() {
        // console.log(localStorage.getItem("shopcar"))
    //    this.showcar();
    },
    computed: {
   
        total(){
            let sum=0;
            for(var i of  this.$store.state.car){
                sum+=i.price*i.addCount;
            }
            return sum
        }
    },
    watch: {
        
    },
    
}

</script>
<style scoped>
.none{
    width: 1240px; margin: 0 auto;
    font-size: 20px; font-weight: 600;
    box-sizing: border-box;
    padding: 100px 200px 100px 200px;
}
table>tr:not(:first-child)>td:first-child{
  box-sizing: border-box;
  padding: 20px 0 20px 20px;
  text-align: start;
}
.clear>div:last-child{
    float: right;
}
.clear>div:last-child>button:last-child{
    width: 54px; height: 30px;
    background-color:#ff4a00;
    border:0;
    outline: 0;
    color: white;
    cursor: pointer;
}
.clear>div:last-child>button:first-child{
    width: 82px;height: 30px;
    border: 0.5px solid gray;margin-right: 30px;cursor: pointer;
    outline: none;
    transition: all 0.5s linear;
}
.clear>div:last-child>button:first-child:hover{
 box-shadow: 2px 5px 5px gray inset;
}
.clear>div:first-child>a{
    text-decoration: none;
    font-size: 14px;
    color:red;
}
.clear>div:first-child{
    float: left;
    width: 100px;
    text-align: center;
}
.clear{
    box-sizing: border-box;
    background-color: #fafafa;
    padding: 50px 20px 50px 50px;
}
.sumbox{
    width: 1240px;margin: 0 auto;
}
.sumbox>.sum{
    display: flex;flex-direction: row-reverse;
   
}
table>tr>td>div{
    text-align: center;
}
table>tr>td:last-child{
    cursor: pointer;
    text-decoration: underline;
}
table>tr>td>div>button{
    width: 30px;height: 30px;
    border: 0;
    background-color:orangered
  
}
table>tr>td>div>input{
    width:50px;height: 30px;
    box-sizing: border-box;
    padding: 2px 5px 2px 20px;
}
table>tr>td>a>img{
    vertical-align: middle;
    width: 68px;
}
table{
    width: 1240px;
    margin-bottom: 50px;
}
table,table tr th, table tr td { border:.5px solid #dfdfdf; 
text-align: center;font-size: 13px;}
table>tr>th{
    background-color:#fafafa;
}
    .shop{
        width: 100%;
    }
    .shop_body{
        width: 1240px;
        margin: 0 auto;
    }
    .shop_body>h3{
        font-size: 22px; font-weight: 600;
        box-sizing: border-box;
        padding: 30px 0 30px 0;
    }
</style>