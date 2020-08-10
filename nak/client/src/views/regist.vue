<template>
	<div class="regist">
		<div class="register">
				<div><h3>会员注册</h3></div>
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
						<span>确认密码 <sup>*</sup>:</span>
						<input type="password" v-model="reupwd" placeholder="输入确认密码" @change="reupwd_check">
						<span class="hide" :class="{success:reupwdok,fail:reupwdok==false}">{{reupwd_msg}}</span>
					</div>
					<div>
						<span>电子邮箱 <sup>*</sup>:</span>
						<input type="email" v-model="email" placeholder="输入邮箱" @change="email_check">
						<span class="hide" :class="{success:emailok,fail:emailok==false}">{{email_msg}}</span>
					</div>
					<div>
						<span>注册协议 <sup>*</sup>:</span>
						<input type="checkbox" @click="checked" :checked="ischeck" class="agree">&nbsp; &nbsp;同意 &nbsp; &nbsp;
						<span>点击查看注册协议</span>
					</div>
					<div @click="submit"><p>提交注册用户</p></div>
				</div>
		</div>
	</div>
</template>

<script>
import qs from 'qs'
export default {
	data() {
		return {
			//用户名需要的变量
			unameok:false,
			uname:'',
			uname_msg:"",
			unameState:'',
		//密码需要的变量
			upwd:'',
			upwd_msg:'',
			upwdok:false,
			upwdState:'',
		//确认密码需要的变量
		reupwd:'',
		reupwd_msg:'',
		reupwdok:false,
		reupwdState:'',
		//邮箱验证需要的变量
		email:'',
		email_msg:'',
		emailok:false,
		ischeck:false,
		emailState:'',
		}
	},
	methods: {
		// 检查用户注册时，是否用户名已存在，如果存在提示用户
		uname_check(){
			//检验用户名的格式是否正确
			let unameReg=/^[0-9a-zA-Z]{2,}$|^[\u4E00-\u9FA5]{2,}$/g;
			//如果正则表达式通过，才回去发送请求，看是否有这个用户了
			if(unameReg.test(this.uname)){
			this.$axios.get('user/check',{
				params:{
					uname:this.uname
				}
			}).then(res=>{
			// console.log(res.data,this.uname)
			//如果后端返回结果是1.
			if(res.data=="1"){
				//提示该用户已存在
				this.uname_msg="该用户已存在";
				this.unameok=false;
				//并把这个函数的返回结果设为false
				this.unameState=false;
			}else{
				this.uname_msg="OK!"
				this.unameok=true;
				this.unameState=true;
			}
			});
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
		reupwd_check(){
			this.reupwdok=false
			if(this.upwd!==this.reupwd){
				this.reupwd_msg="两次密码不一致！"
				this.reupwdok=false
				this.reupwdState=false;
			}else{
				this.reupwd_msg="OK"
				this.reupwdok=true;
				this.reupwdState=true;
			}
		},
		email_check(){
			this.emailok=false
			//进行邮箱的正则表达式验证
			let emReg=/^[0-9a-zA-Z]{3,}@[0-9a-zA-Z]{2,4}.\w{2,}$/g;
			if(emReg.test(this.email)){
				this.email_msg="OK";
				this.emailok=true;
				this.emailState=true;
			}else{
				this.email_msg="请输入正确的邮箱格式";
				this.emailok=false;
				this.emailState=false;
			}
		},
		checked(){
			if(this.ischeck==false){
				this.ischeck=true
			}else{
				this.ischeck=false
			}
			
		},
		submit(){
			// console.log(this.unameState,this.upwdState,this.reupwdState,this.emailState,this.ischeck)
			if(this.unameState && this.upwdState && this.reupwdState && this.emailState &&this.ischeck ){
			console.log(this.uname)
				this.$axios.post('/user/regist',qs.stringify({
					uname:this.uname,
					upwd:this.upwd,
					uemail:this.email
				}),{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then(res=>{
					if(res.data.code==200){
						alert("注册成功")
						this.$router.push('/login')
					}else{
						alert("注册失败")
					}
				})
			}else{
				alert("注册失败")
			}
	
			
		}
	},
	//绑定监听事件，当表单中的值改变就立马调用拥有正则表达式的函数进行验证
	watch: {
		uname(){
			this.uname_check();
		},
		upwd(){
			this.upwd_check();
		},
		reupwd(){
			this.reupwd_check();
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
.agree{
	width: 15px !important; height: 15px!important;
	vertical-align: middle;
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
.form>div:last-child>p{
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
	margin-top: -20px;
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
	.regist>.register>div>h3{
		font-size: 20px; 
		padding: 10px 0 10px 0;
	}
	.regist{
		width:100%;
	}
	.regist>.register{
		width:1240px; margin: 0 auto;
	}

</style>