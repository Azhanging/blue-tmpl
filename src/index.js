//兼容性处理
import compatibility from './tmpl/compatibility';
import inBrowaer from './tmpl/in_browser';
//Tmpl 文件入口
import BlueTmpl from './tmpl/tmpl';

(function (global, factory) {
	if(typeof demand === 'function' && typeof demand.define === 'function')
		demand.define('blue-tmpl', factory);
	else if(typeof _require === 'function' && typeof _require.define === 'function')
		_require.define('blue-tmpl', factory);
	else if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
})(typeof window !== 'undefined' ? window : this, function () {
	BlueTmpl.version = "v1.1.1";
	//删除webpack打包后多出的构造对象
	if(inBrowaer && typeof window.BlueTmpl !== 'function') delete window.BlueTmpl;
	return BlueTmpl;
});