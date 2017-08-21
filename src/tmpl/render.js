/*
 *  Render代理实例,针对tmpl中的数据流
 * */

//运行环境是否在浏览器
import inBrowser from './in_browser';
//常用的方法
import Fn from './fn';
//实例化常用的方法
const fn = new Fn();


class Render {
	constructor(opts) {
	    
		this.init(opts);
		
	}
	//初始render类
	init(opts) {
	    
		this.tmpl = opts.tmpl;
		
		this.data = opts.data;
		
		this.dom = new Function('data', this.tmpl.dom).apply(this.tmpl, [this.data]);
		
		inBrowser ? (this.fragment = this.tmpl.create(this.dom)): null;
		
	}
	//在父节点中插入解析后的模板
	appendTo(el, cb) {
	    
		const fn = this.tmpl.fn;
		
		if(el.nodeType === 1) el.appendChild(this.fragment);
		
		else fn.getEl(el).appendChild(this.fragment);
		
		fn.cb(cb, this.tmpl);
		
		return this.tmpl;
	}
    //在el子节点ex中插入解析后的模板	
	insertBefore(){
	    
	    const fn = this.tmpl.fn;
	    
        fn.getEl(el).insertBefore(this.fragment, ex);
        
        fn.cb(cb, this.tmpl);
        
        return this.tmpl;
	}
	
}

export default Render;