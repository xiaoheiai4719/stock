#!/usr/bin/env node
var http = require('http');
var iconv = require('iconv-lite'); 
var BufferHelper = require('bufferhelper');//格式转换
var schedule = require("node-schedule");//定时任务

var sinaStockSite = 'http://hq.sinajs.cn/list='
var stockNumber = process.argv[2];
// var exec = require('child_process').exec;
// var child = exec('echo hello ' + stockNumber, function(err, stdout, stderr) {
//   if (err) throw err;
//   console.log(stdout);
// });

var rule = new schedule.RecurrenceRule();
var times = [];
for(var i=1; i<60; i++){
	times.push(i);
}
rule.second = times;
var c=0;
var j = schedule.scheduleJob(rule, function(){
    http.get(sinaStockSite+stockNumber,function(req,res){
	var bufferHelper = new BufferHelper();

    req.on('data',function(data){  
    	bufferHelper.concat(data);
    });  
    req.on('end',function(){  
    	console.log(iconv.decode(bufferHelper.toBuffer(),'GBK'));
    	});  
	})
    
});




// var rule = new schedule.RecurrenceRule();
// rule.second = 1;
// var j = schedule.scheduleJob(rule, function(){
	
// });

