//常用的类方法
import utils from '../../utils';

export function setAlias(paths, key = '') {

  if (!utils.isObjcet(paths)) return;

  utils.each(paths, (path, _key) => {

    if (!path) return;

    const __key = key ? key + '.' + _key : _key;

    if (utils.isObjcet(path)) {
      setAlias.apply(this, [path, __key]);
    } else {
      this.alias[__key] = path;
    }

  });
}