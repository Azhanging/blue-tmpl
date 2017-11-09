/*
 *  Render代理实例,针对tmpl中的数据流
 * */

//运行环境是否在浏览器
import inBrowser from './in_browser';
//常用的方法
import fn from './fn';

class Render {
    constructor(opts) {

        this.init(opts);

    }
    //初始render类
    init(opts) {

        this.tmpl = opts.tmpl;

        this.data = opts.data;

        this.vTmpl = new Function('data', this.tmpl.vTmpl).apply(this.tmpl, [this.data]);

        inBrowser ? (this.fragment = this.tmpl.create(this.vTmpl)) : null;

    }
    //在父节点中插入解析后的模板
    appendTo(el, cb) {

        const tmpl = this.tmpl,
            fn = tmpl.fn;

        if(el.nodeType === 1) el.appendChild(this.fragment);

        else tmpl.getEl(el).appendChild(this.fragment);

        fn.cb(cb, this.tmpl);

        return tmpl;
    }
    //在el子节点ex中插入解析后的模板	
    insertBefore(el, ex, cb) {

        const tmpl = this.tmpl,
            fn = tmpl.fn;

        tmpl.getEl(el).insertBefore(this.fragment, ex);

        fn.cb(cb, tmpl);

        return tmpl;
    }

}

export default Render;