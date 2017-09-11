//常用的方法
import fn from './fn';
//运行环境是否在浏览器
import inBrowser from './in_browser';

//初始化时间中的参数
export function setEvent() {
	//初始化事件
	this.events = {};
	//设置事件类型
	this.eventType = [];
}

//设置实例
export function setInstance(type) {

	const get = this.config[type];

	if(!fn.isObj(get)) {
		return;
	}

	fn.each(get, (_get, key) => {
		this[key] = _get;
	});
}

//设置this.el
export function setEl(){
	if(inBrowser) {
		return fn.getEl(this.config.el)
	} else {
		return this.config.el;
	}
}

//设置当前的template
export function setTemplate(){
	if(inBrowser) {
		this.config.template = this.el.innerHTML;
		return this.el.innerHTML;
	} else {
		this.config.template = this.el;
		return this.el;
	}
}

