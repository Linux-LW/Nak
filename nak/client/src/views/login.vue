<template>
	<div class="login">
		<div class="loginer">
				<div><h3>会员登录</h3></div>
				<div class="form">
					<div>
						<span>会员名称 <sup>*</sup>:</span>
						<input type="text" v-model="uname" placeholder="输入会员名称" @change="uname_check">
						<span class="hide" :class="{success:unameok,fail:unameok==false}">{{uname_msg}}</span>
					</div>
					<div>
						<span>会员密码 <sup>*</sup>:</span>
						<input type="password" v-model="upwd" placeholder="设置您的密码" @change="upwd_check">
						<span class="hide" :class="{success:upwdok,fail:upwdok==false}">{{upwd_msg}}</span>
					</div>
                    <div>
						<span>验证码 <sup>*</sup>:</span>
						<input type="text"  placeholder="输入验证码" class="checktest" >
					</div>
					<dd>
                        <div @click="login"><p>会员登录</p></div>
                        <div> <router-link to="/regist">您还不是会员？快去注册</router-link> </div>
                    </dd>

                   <div style="clear:both" class="forget"><p style="width:100px">会员忘记密码？</p></div>
				</div>
		</div>
	</div>
</template>

<script>
import {mapActions} from 'vuex' //把vuex中所有action里面函数变成组件的methods
export default {
	data() {
		return {
		//用户名需要的变量
			id:'',
			unameok:false,
			uname:'',
			uname_msg:"",
			unameState:'',
		//密码需要的变量
			upwd:'',
			upwd_msg:'',
			upwdok:false,
			upwdState:'',
		}
	},
	methods: {
        login(){
            if(this.uname=='' || this.upwd==''){
				alert(`请输入账号或密码`)
			}else{
				this.myLogin();
			}
        },
		// 检查用户注册时，是否用户名已存在，如果存在提示用户
		uname_check(){
        let unameReg=/^[0-9a-zA-Z]{2,}$|^[\u4E00-\u9FA5]{2,}$/g;
        if(unameReg.test(this.uname)){
            this.uname_msg="ok!";
            this.unameok=true;
            this.unameState=true;
			//如果没有通过，就说明不能进去验证
			}else{
				this.uname_msg="请输入正确的用户名，不能有空格";
				this.unameok=false;
				this.unameState=false;
			}
		},
		upwd_check(){
			let upwd=this.upwd;
			this.upwdok=false
			let pwdRegExp=/^[0-9a-zA-Z]{6,}$/
			if(!pwdRegExp.test(upwd)){
				this.upwd_msg="密码不得有空格，且长度不得小于6位,大于10位";
				this.upwdok=false;
				this.upwdState=false;
			}else{
				this.upwd_msg="OK!";
				this.upwdok=true;
				this.upwdState=true;
			}
		},
		checked(){
			if(this.ischeck==false){
				this.ischeck=true
			}else{
				this.ischeck=false
			}
			
		},
        myLogin(){
            this.submit({
                username:this.uname,
                password:this.upwd
            }).then(()=>{  //登陆之后把用户名保存在本地存储以及本地缓存
				localStorage.setItem("uname",this.uname);
				sessionStorage.setItem("uname",this.uname);
			})
        },
        ...mapActions([ //三点用于讲里面的数组打算，方便取出想要的函数
            //去vuex中取出登录的函数
            "submit"
        ])
	},
	//绑定监听事件，当表单中的值改变就立马调用拥有正则表达式的函数进行验证
	watch: {
		uname(){
			this.uname_check();
		},
		upwd(){
			this.upwd_check();
		},
		check(){
			if(this.ischeck=true){
				this.ischeck=false;
				return false
			}else{
				this.ischeck=true;
				return true
			}
		}
	},
}
</script>
<style scoped>
.form .forget{
    font-size: 13px;
    margin-top:76px;
    margin-left: 200px;
}
.form .forget:hover{
    text-decoration: underline;
    color:orangered;
    cursor: pointer;
}
.form>dd>div{
    float: left;
    margin-top: 30px;
}
.form>dd>div:last-child{
   height: 28px;
   line-height: 26px;
border: 1px solid #ed6343;
box-sizing: border-box;
padding: 0px 5px 0px 5px;
font-size: 15px;
margin-left: 20px;
}
.form>dd>div:last-child:hover{
    background-color:#ed6343;
    cursor: pointer;
}
.form>dd>div:last-child:hover>a{
    text-decoration: none;
    color:white;
}
.form>dd>div:last-child>a{
    text-decoration: none;
    color:black;
}
.hide{
	display: none;
}
.success{
	color: green;
	display: inline;
}
.fail{
	color: red;
	display: inline;
}
.form>div+div{
	margin-top: 30px;
}
form>dd::after{
    content: '';
    display: block;
    clear: both;
}
.form>dd>div>p{
	color: white;
	background-color: #ed6343;
	text-align: center;
	height: 28px;
	width: 110px;
	line-height: 15px;
	box-sizing: border-box;
	padding: 5px;
	margin-left: 187px;
	cursor: pointer;
}
.form>div>input:hover{
	border: 1px solid deepskyblue;
}
.form>div>input{
	width: 228px; height: 30px;
	box-sizing: border-box;
	padding: 5px 0 5px 10px;
	outline: none;
	border: 1px solid #d9d9d9;
	margin-left: 28px!important;
}
.form>div>span:first-child{
	width: 160px;height: 26px;
	font-size: 18px;
	display: inline-block;
	text-align: end;
}
.form{
	width: 1240px;
	border: 1px solid #dfdfdf;
	height: 359px;
	box-sizing: border-box;
	padding: 40px 10px 20px;
	margin-bottom:20px ;
}
	.login>.loginer>div>h3{
		font-size: 20px; 
		padding: 10px 0 10px 0;
	}
	.login{
		width:100%;
	}
	.login>.loginer{
		width:1240px; margin: 0 auto;
	}

</style>