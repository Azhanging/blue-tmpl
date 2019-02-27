//常用的方法
import utils from '../../utils';

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
  utils.hook(this, this.$opts.create);
  this.$template = setEl.call(this);
  setInstance.call(this, 'methods');
  setInstance.call(this, 'data');
  utils.hook(this, this.$opts.created);

  //初始化路由
  setRouter.call(this);

  if (this.$template) {
    //创建配置的解析正则
    setRegExp.call(this);
    //转化为js执行
    compile.call(this);
  }
  utils.hook(this, this.$opts.events);
  utils.hook(this, this.$opts.mounted);
  checkRouterStatus.call(this);
}