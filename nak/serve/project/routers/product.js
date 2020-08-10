const express=require('express');
const router=express.Router();
const pool=require('../pool/pool.js');
const { error } = require('console');

// 根据商品类型检索商品
router.get('/search',(req,res)=>{
	let $obj=req.query;
	// console.log(req.query)
	//获取得到的参数  页数  跟  关键词
	let page=$obj.page*1; 
	let $ptype=$obj.ptype;
	//设置每一页想要多少条数据
	let pageSize=8;
	let offset=(page-1)*pageSize;
	//也有可能有些商品数量不够分页，会导致页码数不够，传过来是空值，所以当page不等于空的时候，我才做分页
	if(page!=null){
		pool.query(`select * from products where ptype like '%${$ptype}%' or pname like '%${$ptype}%'`,(err,result)=>{
			if(err) throw err
			let rowCount=result.length;
			let pageCount=Math.ceil(rowCount/pageSize)
			pool.query(`select * from products where ptype like '%${$ptype}%' or pname like '%${$ptype}%' limit ${offset},${pageSize}`,(err,s)=>{
				if(err) throw err
				res.send({result:s,pageCount:pageCount})
			})
		})
	}
})
// 获取相关商品信息，只要用户一点击某个商品，就查找出与之相关的其他商品，显示到对应页面位置
router.get('/relative',(req,res)=>{
	let type=req.query.ptype;
	pool.query(`select * from products where ptype like '%${type}%'`,(err,result)=>{
		if(err) throw err;
		res.send(result)
	})
})

//导出路由
module.exports=router;