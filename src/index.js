//兼容性处理
import compatibility from './tmpl/compatibility';
//Tmpl 文件入口
import Tmpl from './tmpl/tmpl';

(function(global, factory) {
    if(typeof demand === 'function' && typeof demand.define === 'function')
        demand.define('tmpl', factory);
    else if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else
        (global ? (global.Tmpl = factory()) : {});
})(typeof window !== 'undefined' ? window : this, function() {
    Tmpl.version = "v1.0.5";
    return Tmpl;
});