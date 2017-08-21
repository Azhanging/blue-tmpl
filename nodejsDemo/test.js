let Tmpl = require('../dist/js/tmpl');

let fs = require('fs');

let path = require('path');

Tmpl.alias = {
	'__PUBLIC__':'./js',
	'__BASE__':'./tmpl-views',
	'__TMPL__':'./tmpl-views'
}

var tmpl = fs.readFileSync('./tmpl-views/tmpl1.tmpl',{
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
	
	res.write(t.render(data).dom);
	
	res.end();
	
}).listen(8888);




