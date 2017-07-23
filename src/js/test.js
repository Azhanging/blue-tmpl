let Tmpl = require('./tmpl');

let fs = require('fs');

let path = require('path');

Tmpl.alias = {
	'__PUBLIC__':'../js',
	'__BASE__':'../tmpl',
	'__TMPL__':'../tmpl'
}

var tmpl = fs.readFileSync('../tmpl/tmpl1.tmpl',{
	encoding:'UTF8'
});

let t = new Tmpl({
	el:tmpl
});

let http = require('http');

let data = [];



for(var i = 0;i<10;i++){	
	data.push(i);
}

http.createServer(function(req,res){
	
	res.writeHead(200,{
		'Content-Type':'text-plain'
	});
	
	res.write(t.data(data).dom);
	
	res.end();
	
}).listen(8888);




