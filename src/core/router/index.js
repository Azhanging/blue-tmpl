/*路由相关*/

//常用的方法
import utils from '../../utils';

//把路由实例挂靠到模板中
export function setRouter() {
  if (utils.isObjcet(this.$opts.router)) {
    this.constructor.router = this.$opts.router;
  }
}

//检查路由状态
export function checkRouterStatus() {
  //获取路由
  const router = this.constructor.router,
    status = this.$opts.async;
  if (!(status === false) && router) {
    router.changeRoutereStatus(true);
  }
}