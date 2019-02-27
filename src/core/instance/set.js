//常用的方法
import utils from '../../utils';
//运行环境是否在浏览器
import inBrowser from '../in_browser';

//设置实例属性
export function setInstance(type) {
  const get = this.$opts[type];
  if (!utils.isObjcet(get)) {
    return;
  }
  utils.each(get, (_get, key) => {
    this[key] = _get;
  });
}

//设置this.$template
export function setEl() {
  if (inBrowser) {
    try {
      return this.getEl(this.$opts.template).innerHTML.trim();
    } catch (e) {
      return this.$opts.template;
    }
  } else {
    return this.$opts.template;
  }
}

