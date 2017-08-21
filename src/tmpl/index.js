//tmpl的初始化
import init from './init';
//处理模板数据的Render类
import Render from './render';
//常用的类方法
import Fn from './fn';
//Dom的操作
import Dom from './dom';

//实例化常用的方法
const fn = new Fn();

/*配置信息*/
const config = {
    open_tag: "<%", //OPEN_TAG
    close_tag: "%>", //CLOSE_TAG,
    template: "",
    data: {},
    methods: {}
};

// html转义
const escapeCode = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
}

export default class Tmpl extends Dom{
    //Tmpl构造
	constructor(opts) {
	    super();
		this.config = fn.extend(fn.copy(config), opts);
		this.init();
	}
	
	//安装插件
	static install(constructor) {
        constructor.install(this);
    }
	
	//初始化对象
	init(){
	    init.call(this);
	}
	
	//解析模板和数据
	render(data) {
        var _this = this;
        return new Render({
            tmpl: _this,
            data: data
        });
    }
	
	//添加数据更新模板
	update() {
        this.template = this.config.template;
        setDom.call(this);
    }
	
    /*回调*/
    cb(cb) {
        fn.cb(cb, this);
        return this;
    }
    
    /*转义*/
    escape(escapeVal) {
        fn.each(escapeCode, (item, key) => {
            escapeVal = escapeVal.replace(new RegExp(key, 'g'), item);
        });
        return escapeVal;
    }
}

//常用的方法给tmpl的fn属性中
Tmpl.prototype.fn = fn;


//设置路径别名常量
Tmpl.alias = {};
