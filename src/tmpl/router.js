/*路由相关*/

//常用的方法
import fn from './fn';

//把路由实例挂靠到模板中
export function setRouter() {
	if(fn.isObj(this.config.router)) {
		this.constructor.router = this.config.router;
	}
}

//检查路由状态
export function checkRouterStatus() {
	//获取路由
	const router = this.constructor.router,
		status = this.config.async;
	if(!(status === false) && router) {
		router.changeRoutereStatus(true);
	}
}