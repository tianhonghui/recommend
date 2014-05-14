var http = require('http');
var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
//连接到recommend这个数据库
mongoose.connect('mongodb://localhost/recommend');
//得到recommend的链接
db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function callback() {
	console.log('recommend database connection completed');
});

//定义一个Schema，一个Schema的意思是一个数据模型，就是关系映射的规则
var appSchema = mongoose.Schema({
	name: String,
	description : String,
	appid : String,
});

//将recommend数据库中app映射到前面定义的appSchema上
//后面就可以直接使用app进行增删改查了
var db = mongoose.model('app',appSchema);

var app = express();

app.get('/recommend',function(req,res) {
	db.find({},function(err,app){
		res.send({applist:app});
	});
});

app.listen(3000);