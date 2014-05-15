var express = require('express');
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
	name: String, 			//应用名称
	description : String,  	//描述
	appid : String,			//应用id，由推荐系统分配
	marketid : String 		//市场的marketid
});

//将recommend数据库中app映射到前面定义的appSchema上
//后面就可以直接使用app进行增删改查了
var db = mongoose.model('app',appSchema);

var app = express();

app.get('/recommend',function(req,res) {
	//获取query串中的appid值
	var appid = req.query.appid;
	
	db.find({},function(err,apps){
		//创建一个结果列表
		var result = new Array();
		//过滤掉调用appid相同的数据
		apps.forEach(function(app){
			if(app.appid != appid)
				result.push(app);
		});
		res.send({applist:result});
	});
});

app.listen(3000);