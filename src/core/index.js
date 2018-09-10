//兼容性处理
import './compatibility';

//Tmpl 文件入口
import BlueTmpl from './instance';

(function (global, factory) {
	if(typeof demand === 'function' && typeof demand.define === 'function')
		demand.define('blue-tmpl', factory);
	else if(typeof _require === 'function' && typeof _require.define === 'function')
		_require.define('blue-tmpl', factory);
})(typeof window !== 'undefined' ? window : this, function () {
	return BlueTmpl;
});

export default BlueTmpl;