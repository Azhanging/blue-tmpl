//常用的方法
import util from '../../util';
//运行环境是否在浏览器
import inBrowser from '../in_browser';

//设置实例属性
export function setInstance(type) {
	const get = this.$config[type];
	if(!util.isObjcet(get)) {
		return;
	}
	util.each(get, (_get, key) => {
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

