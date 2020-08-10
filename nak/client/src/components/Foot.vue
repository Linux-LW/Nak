<template>
    <div class="foot">
        <div class="foot-content">
            <!-- <div v-for="(i,k) in n" :key="k">
                <p>{{n[k]}}</p>
            </div> -->
            <ul>
                <li v-for="(i,k) in n" :key="k">{{n[k]}}</li>
            </ul>
            <div class="foot-detail">
                <p>Copyright ©2012-2020 DBShop 版权所有</p>
                <p>皖ICP备15026019号</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            n:["帮助中心","服务支持","支付方式","关于我们","客服中心"]
        }
    }
}
</script>
<style>
    .foot{
        width: 100%;
        background-color:#292929;
    }
    .foot>.foot-content{
        width: 1240px;
        margin: 0 auto;
        height: 243px;
        box-sizing: border-box;
        padding: 40px 0 40px 0;
    }
    .foot>.foot-content>ul{
        list-style: none; 
         border-bottom: 1px solid #dfdfdf;
         height: 50px;
    }
   
    .foot>.foot-content>ul>li{
        font-size: 20px;
        color: white;
        float: left;
        border-right: 1px solid #dfdfdf;
        width: 165px;
        cursor: pointer;
    }
    .foot>.foot-content>ul>li+li{
        margin-left: 30px;
    }
    .foot>.foot-content>.foot-detail{
        color:#dfdfdf;
        font-size: 12px;
        text-align:center;
        padding-top:20px;
    }
</style>