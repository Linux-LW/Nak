<template>
  <div class="details">
    <div class="scroll hide" :class="{active:distance}" @scroll="scrollEvent">
      <div class="scrollbar">
        <table></table>
        <img :src="this.purl" alt="">
        <div>
          <span style="font-size:15px">{{this.pname}}</span><br>
          <span style="font-size:15px;color:orange">￥ {{parseFloat(this.price).toFixed(2)}} 元</span>
        </div>
        <div class="scrollnavbar">
          <ul>
            <li>详细信息</li>
            <li>商品评价</li>
            <li>商品咨询</li>
            <li>售后服务</li>
            <li>如何购买</li>
          </ul>
        </div>
        <button @click="join(purl)">+加入购物车</button>
      </div>

    </div>
    <div class="noticHide" :class="{notic:ischeck}">
        <h3>侬安康在线商城&nbsp;&nbsp;提示</h3>
        <div class="notic_text">
          <div><img :src="purl" alt=""><span>{{pname}}</span>&nbsp;&nbsp;<span style="font-weight:600">添加购物车成功!</span></div>
        </div>
        <div class="notic_foot">
          <div class="continue" @click="continu">继续购物</div>
          <div></div>
          <div class="resolve" @click="sum">去购物车结算</div>
        </div>
      </div>
    <div class="navbar">
      
      <router-link to="/">首页</router-link>
      <span>/</span>
      <span v-text="ptype"></span>
      <span>/</span>
      <span v-text="pname"></span>
    </div>
    <!-- 查询商品详情开始 -->
    <div class="proInfo">
      <!-- 查询商品名字 -->
      <div>
        <h2 v-text="pname"></h2>
      </div>
      <!-- 广告标语 -->
      <div class="adv">
        <!-- 广告标语头部 -->
        <div class="adv_title">侬安康在线商城&nbsp;品质保证</div>
        <!-- 广告内容正文 -->
        <div class="adv_text">
          侬安康休闲食品在线小栈欢迎您！
          <br />
          <br />小栈一站式为您提供各种面包、蛋糕、手制天然巧克力、月饼、绿豆糕和各式中西糕点。休闲食品品类不断更新中，敬请长期关注！
          <br />
          <br />如有问题，欢迎您随时咨询小栈在线客服，我们很高兴能够为您提供服务！
          <br />
          <br />在线客服Q Q：463563296
          <br />
          <br />在线客服电话：0551-66672880
        </div>
      </div>
      <!-- 查询商品展详情区域 -->
      <div class="goods_block">
        <!-- 左侧查看商品图片的区域 -->
        <div class="goods_picBlock">
          <!-- 放大图跟小图的容器 -->
          <div class="wrap">
            <img :src="purl" alt />
            <!-- 放小图的位置 -->
            <div class="minipic">
              <ul>
                <li v-for="(i,k) of small" :key="k">
                  <img :src="i" alt="" @click="change(i)">
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 右侧商品详情一览 -->
        <div class="goods_info">
          <dd>
            <strong>货 号 :</strong>
            <span v-text="pnumber"></span>
          </dd>
          <dd>
            <strong>店铺价 :</strong>
            <span
              style="font-size:20px;font-weight:700;color:red"
            >￥{{parseFloat(price).toFixed(2)}}元</span>
          </dd>
          <dd>
            <strong>库 存 :</strong>
            <span>{{isHas?'有货':'暂无该商品'}}</span>
          </dd>
          <dd>
            <strong>评 分 :</strong>
            <span>
              <ul>
                <li>
                  <img src="../assets/Start.png" alt />
                </li>
                <li>
                  <img src="../assets/Start.png" alt />
                </li>
                <li>
                  <img src="../assets/Start.png" alt />
                </li>
                <li>
                  <img src="../assets/Start.png" alt />
                </li>
                <li>
                  <img src="../assets/Start.png" alt />
                </li>
              </ul>
            </span>
          </dd>
          <dd class="goods_in_car">
            <div>
              我想买:
              <button @click="minus">-</button>
              <input v-model="count" />
              <button @click="add">+</button>
            </div>
            <div>
              <button @click="join(purl)">+加入购物车</button>
              <button>❤</button>
            </div>
          </dd>
          <dd style="font-size:13px">最近3人已经购买</dd>
          <div class="share">
            <img src="../assets/shareTo.png" alt />
            <span style="color:deepskyblue">分享到</span>
            <img src="../assets/qqzoom.png" alt />
            <span>QQ空间</span>
            <img src="../assets/sinia.png" alt />
            <span>新浪微博</span>
            <img src="../assets/tcVblock.png" alt />
            <span>腾讯微博</span>
            <img src="../assets/people.png" alt />
            <span>人人网</span>
            <img src="../assets/wechat.png" alt />
            <span>微信</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 相关商品以及商品详细图片 -->
    <div class="bottom">
      <!-- 相关商品 -->
      <div class="relative">
        <div class="cardHeader">
          <p>相关商品</p>
        </div>
        <div class="cardBody">
          <ul>
            <li class="cardItem" v-for="(key,i) in relativeData" :key="i" @click="turnto(key)">
              <img :src="key.purl" alt />
              <div class="cardInfo">
                <div v-text="key.pname"></div>
                <div v-text="`￥${key.pprice.toFixed(2)}元`" class="cardPrice"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品详细信息 -->
      <div class="picInfo">
				<div class="buttom_title">
					<ul>
						<li v-for="(i,key) of title" :key="key">
							<a href="javascript:;" :class="{'active':isActive}">{{i}}</a>
						</li>
					</ul>
				</div>
				<div class="bigPic">
					<img :src="pdetails" alt="">
				</div>
			</div>
		
    </div>
  </div>
</template>

<style scoped>
.hide{
  display: none;
}
.active{
  display: block;
}
.scrollnavbar+button{
  text-decoration: none;
  color: white;
  font-size: 18px;
}
.scrollnavbar+button{
  float: right;
  width: 200px;
  height: 40px;
  border: 0;
  outline: 0;
  background-color:#ed6343 ;
  margin-top: -39px;
  margin-right:11px;
}

.scrollnavbar>ul{
  list-style: none;
  margin-top: -48px;
  margin-left: 160px;
}
.scrollnavbar>ul:after{
  content: '';
  display: block;
  clear: both;
}
.scrollnavbar>ul>li{
float: left;

  width: 150px;
  text-align: center;
  font-size: 20px;
}
.scrollbar>div{
  margin-top: 20px;
  margin-left:60px;
}
.scrollbar>img{
  float: left;
  padding-top:16px;
}
.scroll{
  width: 100%;
  height: 70px;
  
  box-sizing: border-box;
  padding:10px 0 10px 0;
  border:1px solid lightgray;
  background-color: #fff;
  position: fixed;
  top: 0; 
}
.scroll>.scrollbar{
  width: 1240px;
  margin:0 auto;
  margin-top: -20px;
}
.scroll>.scrollbar>img{
  width: 48px;height: 48px;
  vertical-align: middle;
}
.notic_foot>div:first-child,.notic_foot>div:last-child{
  height: 30px;
  color: white;
  background-color:#ed6343;
  line-height: 30px;
  box-sizing: border-box;
  padding:0 10px 5px 10px;
  cursor: pointer;
}
.notic_foot>div:nth-child(2){
  width: 20px;
}
.notic_foot{
  width: 100%;
  background-color:#fafafa;
  box-sizing: 5px 0 5px 0;
  height: 65px;
  line-height: 65px;
  display: flex;
  justify-content: center;
}
.notic_text>div>img{
  width: 67px; height: 67px;
  vertical-align: middle;
}
.notic_text>div>span{
  margin-left: 20px;
}
.notic_text>div{
  display: inline-block;
  
}
.notic_text{
  width: 100%;
  box-sizing: border-box;
  padding: 30px 20px 30px 20px;

}
.details>.notic>h3{
  font-size: 20px; font-weight: 600;
  line-height: 60px;
  border-bottom: .5px solid #dddddd;
  height: 60px;
  box-sizing: border-box;
  margin:0 20px 0 20px;
 
}
.noticHide{
  width: 590px; height: 258px;
  background-color:white;
  top:50%;left: 50%; margin-left: -295px!important;
  margin-top: -730px;
  position: fixed;
  box-sizing: border-box;
  border:0.5px solid lightgray;
  box-shadow: 0 0 2px lightgray;

  z-index: 1;
  transition: all .5s linear;
}
.notic{
  position: absolute;
  width: 590px; height: 258px;
  background-color:white;
  top:50%;left: 50%; margin-left: -295px!important;
  margin-top: -179px;
  position: fixed;
  box-sizing: border-box;
  border:0.5px solid lightgray;
  box-shadow: 0 0 2px lightgray;
  
  z-index: 1;
}
.picInfo>.bigPic>img{
	width: 930px;
  margin-top: 20px;
}
.detailsPic>img{
	width: 930px;
}

.picInfo>.buttom_title>ul>li>a{
	display: block;
	text-decoration: none;
	color:#333333;
	float: left;
	width: 120px;
	font-size: 18px;
}

.picInfo>.buttom_title>ul{
	list-style: none;
	height: 53px;
	border-bottom: 1px solid red;
	line-height: 50px;
}
.picInfo{
	width: 930px;

}
.cardInfo > .cardPrice {
  color: #ed6343;
  font-weight: 600;
}
.cardInfo {
  font-size: 14px;
  font-weight: 300;
  margin-left: 10px;
  color: #6d6d6d;
}
.cardItem {
  display: flex;
  justify-content: start;
}

.cardItem > img {
  width: 80px;
  height: 80px;
}
.cardBody > ul {
  list-style: none;
}
.cardBody {
  cursor: pointer;
}
.cardBody > ul > li {
  width: 290px;
  height: 103px;
  box-sizing: border-box;
  padding-top: 20px;
}
.relative > .cardHeader {
  width: 290px;
  height: 55px;
  border-bottom: 1px solid #ed6343;
  font-size: 18px;
  line-height: 55px;
  box-sizing: border-box;
  padding-right: 30px;
}
.bottom > .relative {
  width: 310px;
  height: 709px;
 
}
.bottom {
  width: 1240px;
  margin: 0 auto;
  
	display: flex;
	justify-content: start;

}
.share > img:not(:first-child) {
  margin-left: 10px;
}
.share > img {
  vertical-align: middle;
}
.share {
  width: 380px;
  height: 56px;
  font-size: 12px;
  margin-top: 20px;
}
.goods_in_car > div:nth-child(2) > button:last-child:hover {
  background-color: black;
}
.goods_in_car > div:nth-child(2) > button:last-child {
  margin-left: 10px;
  width: 40px;
  height: 40px;
  background-color: #6d6d6d;
  color: white;
}
.goods_in_car > div:nth-child(2) > button:first-child {
  margin-top: 15px;
  font-size: 15px;
  width: 235px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: white;
}
.goods_in_car > div > button:hover {
  background-color: Black;
}
.goods_in_car > div > input {
  box-sizing: border-box;
  width: 43px;
  height: 30px;
  outline: none;
  border: 0.5px solid lightgray;
  margin: 0 5px 0 5px;
  padding: 2px 5px 2px 10px;
}
.goods_in_car > div > button {
  background-color: #ed6343;
  color: white;
  width: 20px;
  height: 30px;
  border: 0;
}
.goods_in_car {
  width: 380px;
  height: 103px;

  box-sizing: border-box;
  padding-top: 20px;
}
.goods_info > dd:nth-child(4) {
  margin-bottom: 15px;
}
.goods_info > dd:nth-child(4) > span > ul > li {
  float: left;
}
.goods_info > dd:nth-child(4) > span > ul {
  list-style: none;
  position: relative;
  top: -20px;
  left: 56px;
}
.goods_info > dd + dd {
  margin-top: 10px;
}
.goods_block > .goods_info {
  width: 432px;
  box-sizing: border-box;
  padding-top: 19px !important;
  padding-left: 20px;
}
.goods_picBlock > .wrap > .minipic > ul {
  list-style: none;
}
.goods_picBlock > .wrap > .minipic > ul > li>img {
  float: left;
  height: 68px;
  width: 68px;
  margin-top: 10px;
  cursor:pointer;
}
.goods_picBlock > .wrap > .minipic > ul > li>img+img{
  margin-left: 10px!important;
  display: block;
}
.goods_picBlock > .wrap > .minipic > ul > li{
  width: 68px;
  height: 68px;
  float: left;
}
.goods_picBlock > .wrap > .minipic > ul > li+li{
  margin-left:10px;
}
.goods_picBlock > .wrap > img {
  width: 430px;
  height: 430px;
  cursor: crosshair;
  padding-top: 20px;
}
.goods_picBlock > .wrap {
  width: 490px;
  height: 560px;
}
.details > .proInfo > .goods_block > .goods_picBlock {
  width: 496px;
  height: 570px;
  border-right: 0.5px solid lightgray;
}
.details > .proInfo > .goods_block {
  box-sizing: border-box;
  display: flex;
  width: 925px;
  height: 604px;
}
.details > .proInfo > .adv > .adv_text {
  font-size: 13px;
  margin-top: 15px;
  padding: 40px 10px 10px 10px;
}
.details > .proInfo > .adv > .adv_title {
  width: 100%;
  float: left;
  box-sizing: border-box;
  padding: 5px 5px;
  color: white;
  font-weight: bold;
  font-size: 15px;
  background-color: #ed6343;
}
.details > .proInfo > .adv {
  width: 310px;
  height: 277px;
  border: 1px solid #ed6343;
  float: right;
  margin-top: -51px;
}
.details > .proInfo {
  margin: 0 auto;
  width: 1240px;
  box-sizing: border-box;
}
.details {
  width: 100%;
  position: relative;
}

.details > .navbar {
  width: 1240px;
  height: 30px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 5px 0px 10px;
}
.details > .navbar > span,
.details > .navbar > a {
  margin-left: 10px;
  font-size: 12px;
  text-decoration: none;
  color: gray;
}
.details > div.navbar + div {
  width: 1240px;
  margin: 0 auto;
}
.details > .proInfo > div > h2 {
  width: 920px;
  font-weight: 600;
  font-size: 24px;
  box-sizing: border-box;
  padding: 10px 0 10px 0;
}
</style>

<script>
import {mutations,mapActions, mapState} from 'vuex'
export default {
  props: ["id"],
  data() {
    return {
      distance:false,
      detailList: [],
      ptype: "",
      pname: "",
      purl: "",
      pdetails: "",
      pnumber: "",
      pid: "",
      price: "",
      isHas: "",
      count: 1,
			relativeData: [],
			isActive:false,
			nowIndex:0,
      title:["详细信息","商品评价","商品咨询","售后服务","如何购买"],
      small:'',
      ischeck:false,
      shopCar:[]
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.$axios
      .get("/de/details", {
        params: {
          id: this.id
        }
      })
      .then(res => {
				this.detailList = res.data;
          // console.log(this.detailList)
        //获取商品的类型
        this.ptype = this.detailList[0].ptype;
        //获取商品的id
        this.pid = this.detailList[0].id;
        //获取商品的编号
        this.pnumber = this.detailList[0].pnumber;
        //获取商品的路径
        this.purl = this.detailList[0].purl;
        //获取商品的价格
        this.price = this.detailList[0].pprice;
        //获取商品的名字
				this.pname = this.detailList[0].pname;
				//获取商品的详情大图
        this.pdetails=this.detailList[0].pdetails;
        //得到小图的数组信息
        this.smallPic=this.detailList[0].smallPic;
        //将得到的字符串用 | 切割成数组
        this.small =this.smallPic.split("|")
      
        //如果当前库存的状态，如果不等于0，那就是有货，返回true
        if (this.detailList[0].pishas != 0) {
          this.isHas = true;
        } else {
          //否则 返回false
          this.isHas = false;
        }
      });
  },
  mounted() {
   window.addEventListener('scroll', this.scrollEvent);
    this.id = this.$route.params.id;
    this.promise("/de/details", { id: this.id }).then(res => {
			this.detailList = res.data;
      //获取商品的类型
      this.ptype = this.detailList[0].ptype;
      //获取商品的id
      this.pid = this.detailList[0].id;
      //获取商品的编号
      this.pnumber = this.detailList[0].pnumber;
      //获取商品的路径
      this.purl = this.detailList[0].purl;
      //获取商品的价格
      this.price = this.detailList[0].pprice;
      //获取商品的名字
			this.pname = this.detailList[0].pname;
			//获取商品大图的路径
			this.pdetails=this.detailList[0].pdetails;
      //如果当前库存的状态，如果不等于0，那就是有货，返回true
      if (this.detailList[0].pishas != 0) {
        this.isHas = true;
      } else {
        //否则 返回false
        this.isHas = false;
      }
      this.promise("pro/relative", { ptype: this.ptype }).then(res => {
        for (var i of res.data) {
          if (i.ptype === this.ptype && i.pname !== this.pname) {
            this.relativeData.push(i);
          }
        }
      });
    });
  },
  methods: {
    scrollEvent(e){
      var scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop;
      if(scrollTop>300){
        this.distance=true
     }else{
       this.distance=false
     }
    },
    sum(){
      this.$router.push('/shopcar')
    },
    continu(){
      this.ischeck=false
    },
    join(url){
      //点击之后，把当前商品的所有信息都搜集起来
      let goodsInfo={
        pid:this.pid,
        pname:this.pname,
        pnumber:this.pnumber,
        price:this.price,
        addCount:this.count,
        purl:this.purl
      }
      this.ischeck=true;
      //调用store中的mutaitions 来讲商品加入购物车
      this.$store.commit('addToCar',goodsInfo)

    },
    change(index){
      this.purl=index
    },
    minus() {
      if (this.count > 1) {
        this.count--;
      }
    },
    add() {
      this.count++;
		},
		//当点击左侧相关产品时，数据再次请求，完成不刷新页面就改变数据
    turnto(index) {
      // console.log(index.id);
      this.$axios
        .get("/de/details", {
          params: {
            id: index.id
          }
        })
        .then(res => {
          console.log(res.data);
          this.detailList = res.data;
          //获取商品的类型
          this.ptype = this.detailList[0].ptype;
          //获取商品的id
          this.pid = this.detailList[0].id;
          //获取商品的编号
          this.pnumber = this.detailList[0].pnumber;
          //获取商品的路径
          this.purl = this.detailList[0].purl;
          //获取商品的价格
          this.price = this.detailList[0].pprice;
          //获取商品的名字
          this.pname = this.detailList[0].pname;
          //得到小图的数组信息
        this.smallPic=this.detailList[0].smallPic;
        this.small =this.smallPic.split("|");
    
					this.pdetails=this.detailList[0].pdetails;
          //如果当前库存的状态，如果不等于0，那就是有货，返回true
          if (this.detailList[0].pishas != 0) {
            this.isHas = true;
          } else {
            //否则 返回false
            this.isHas = false;
          }
        });
    }
  },
  computed: {
  
  },
};
</script>