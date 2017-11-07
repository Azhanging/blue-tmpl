let Tmpl = require('../dist/js/tmpl');

let fs = require('fs');

let path = require('path');

const url = require('url');

Tmpl.alias = {
	'__PUBLIC__': './js',
	'__BASE__': './tmpl-views',
	'__TMPL__': './tmpl-views'
}

var tmpl = fs.readFileSync('./tmpl-views/tmpl1.tmpl', {
	encoding: 'UTF8'
});

let time = new Date().getTime();

let t = new Tmpl({
	template: tmpl
});

console.log('处理耗时:' + (new Date().getTime() - time));



let http = require('http');

let data = [];

for(var i = 0; i < 10; i++) {
	data.push(i);
}

http.createServer(function(req, res) {
    
	
	if(/.*\.js(.*?)/.test(req.url)) {

		res.writeHead(200, {
			'Content-Type': 'application/javascript'
		});
		
		console.log(path.join(path.resolve(__dirname,'../') , req.url.replace(/(.*?\.js)(.*)?/,"$1")));
		
		const js = fs.readFileSync(path.join(path.resolve(__dirname,'../') , req.url.replace(/(.*?\.js)(.*)?/,"$1")));
		
		res.write(js);

	} else {
	    

		res.writeHead(200, {
			'Content-Type': 'text-plain'
		});
		
		res.write(t.render(data).dom);
		
		delete t.render(data).dom;

		
	}
	

	res.end();

}).listen(8888);