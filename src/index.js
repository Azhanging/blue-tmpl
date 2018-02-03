//兼容性处理
import compatibility from './tmpl/compatibility';
//Tmpl 文件入口
import BlueTmpl from './tmpl/tmpl';

(function (global, factory) {
	if(typeof demand === 'function' && typeof demand.define === 'function')
		demand.define('BlueTmpl', factory);
	else if(typeof _require === 'function' && typeof _require.define === 'function')
		_require.define('BlueTmpl', factory);
	else if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
})(typeof window !== 'undefined' ? window : this, function () {
	BlueTmpl.version = "v1.0.15";
	return BlueTmpl;
});