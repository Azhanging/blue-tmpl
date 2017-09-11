//Tmpl 文件入口
import Tmpl from './tmpl/tmpl';
//兼容性处理
import compatibility from './tmpl/compatibility';

(function(global, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof demand === 'function')
        demand.define('tmpl', factory);
    else
        (global ? (global.Tmpl = factory()) : {});
})(typeof window !== 'undefined' ? window : this, function() {

    Tmpl.version = "v1.0.5";

    return Tmpl;
});