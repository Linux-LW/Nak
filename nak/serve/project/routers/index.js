const express=require('express');
const router=express.Router();
const pool=require('../pool/pool.js');
const { error } = require('console');

router.get('/index',(req,res)=>{
	var sql='select * from products';
	pool.query(sql,(err,result)=>{
		if(err)throw err;
		res.send(result);
	})
})
// 获取指定id的商品信息
router.get('/details',(req,res)=>{
	let obj=req.query;
	let $pid=obj.id;
	// console.log(obj)
	pool.query('select * from products where id=?',[$pid],(err,s)=>{
		res.send(s)
	})
})

//导出路由
module.exports=router;