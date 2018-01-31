//常用的方法
import fn from './fn';
//运行环境是否在浏览器
import inBrowser from './in_browser';

//初始化时间中的参数
export function setEvent() {


}

//设置实例属性
export function setInstance(type) {
	const get = this.$config[type];
	if(!fn.isObj(get)) {
		return;
	}
	fn.each(get, (_get, key) => {
		this[key] = _get;
	});
}

//设置this.$template
export function setEl() {
	if(inBrowser) {
		try {
			return this.getEl(this.$config.template).innerHTML;
		} catch (e) {
			return this.$config.template;
		}
	} else {
		return this.$config.template;
	}
}

