let Tmpl = require('./tmpl');

let fs = require('fs');

var tmpl = fs.readFileSync('../../tmpl/tmpl1.tmpl',{
	encoding:'UTF8'
});

let t = new Tmpl({
	el:tmpl
});

console.log(t.data({a:1}));


