//常用的方法
import fn from './fn';
//解析方法
import tmplRender from './tmpl-render';
//运行环境是否在浏览器
import inBrowser from './in_browser';
//tmpl的render解析
import {
	setRegExp,
	setDom
} from './tmpl-render';
//初始化设置
import {
	setInstance,
	setEvent,
	setEl,
	setTemplate
} from './set';

//router相关
import {
	setRouter,
	checkRouterStatus
} from './router';

export default function init() {
	//构建开始的钩子
	fn.run(this.config.created, this);
	//初始配置信息
	this.el = setEl.call(this);
	//初始化方法
	setInstance.call(this, 'methods');
	//初始化数据
	setInstance.call(this, 'data');
	//初始化路由
	setRouter.call(this);
	//查找模板
	if(this.el) {
		this.template = setTemplate.call(this);

		setRegExp.call(this);
		//转化为js执行
		setDom.call(this);
	}
	//初始化事件
	setEvent.call(this);
	//设置事件
	fn.run(this.config.events, this);
	//所有完毕后的钩子
	fn.run(this.config.mounted, this);
	//检查是否存在路由的状态
	checkRouterStatus.call(this);
}