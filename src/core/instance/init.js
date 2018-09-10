//常用的方法
import util from '../../util';

//tmpl的render解析
import {
  setRegExp,
  compile
} from '../compile';

//初始化设置
import {
  setInstance,
  setEl
} from './set';

//router相关
import {
  setRouter,
  checkRouterStatus
} from '../router';

export default function init() {
  util.run(this.$config.create, this);
  this.$template = setEl.call(this);
  setInstance.call(this, 'methods');
  setInstance.call(this, 'data');
  util.run(this.$config.created, this);

  //初始化路由
  setRouter.call(this);

  if (this.$template) {
    //创建配置的解析正则
    setRegExp.call(this);
    //转化为js执行
    compile.call(this);
  }
  util.run(this.$config.events, this);
  util.run(this.$config.mounted, this);
  checkRouterStatus.call(this);
}