/*路由相关*/

//常用的方法
import util from '../../util';

//把路由实例挂靠到模板中
export function setRouter() {
  if (util.isObjcet(this.$config.router)) {
    this.constructor.router = this.$config.router;
  }
}

//检查路由状态
export function checkRouterStatus() {
  //获取路由
  const router = this.constructor.router,
    status = this.$config.async;
  if (!(status === false) && router) {
    router.changeRoutereStatus(true);
  }
}