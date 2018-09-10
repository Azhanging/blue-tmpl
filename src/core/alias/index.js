//常用的类方法
import util from '../../util';

export function setAlias(paths, key = '') {

	if(!util.isObjcet(paths)) return;

	util.each(paths, (path, _key) => {

		if(!path) return;

		const __key = key ? key + '.' + _key : _key;

		if(util.isObjcet(path)) {
			setAlias.apply(this, [path, __key]);
		} else {
			this.alias[__key] = path;
		}

	});
}