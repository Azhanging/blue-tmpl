//常用的方法
import Fn from './fn';
//解析方法
import tmplRender from './tmpl-render';
//运行环境是否在浏览器
import inBrowser from './in_browser';
//tmpl的render解析
import { 
    setInstance, 
    setRouter, 
    setRegExp, 
    setDom, 
    setEvent 
} from './tmpl-render';

//实例化常用的方法
const fn = new Fn();

export default function init() {
	//构建开始的钩子
	fn.run(this.config.created, this);
	//初始配置信息
	this.el = (() => {
		if(inBrowser) {
			return fn.getEl(this.config.el)
		} else {
			return this.config.el;
		}
	})();

	//初始化方法
	setInstance.call(this, 'methods');
	//初始化数据
	setInstance.call(this, 'data');
	//初始化路由
	setRouter.call(this);
	//查找模板
	if(this.el) {
		this.template = (() => {
			if(inBrowser) {
				this.config.template = this.el.innerHTML;
				return this.el.innerHTML;
			} else {
				this.config.template = this.el;
				return this.el;
			}
		})();
		
		setRegExp.call(this);
		//转化为js执行
		setDom.call(this);
	}
	//初始化事件
	setEvent.call(this);
	//所有完毕后的钩子
	fn.run(this.config.mounted, this);
	//设置事件
	fn.run(this.config.events, this);
}