//常用的方法
import fn from './fn';

//tmpl的render解析
import {
	setRegExp,
	render
} from './tmpl-render';

//初始化设置
import {
	setInstance,
	setEvent,
	setEl
} from './set';

//router相关
import {
	setRouter,
	checkRouterStatus
} from './router';

export default function init() {
	fn.run(this.$config.create, this);
	this.$template = setEl.call(this);
	setInstance.call(this, 'methods');
	setInstance.call(this, 'data');
	fn.run(this.$config.created, this);

	//初始化路由
	setRouter.call(this);

	if(this.$template) {
		//创建配置的解析正则
		setRegExp.call(this);
		//转化为js执行
		render.call(this);
	}
	setEvent.call(this);
	fn.run(this.$config.events, this);
	fn.run(this.$config.mounted, this);
	checkRouterStatus.call(this);
}