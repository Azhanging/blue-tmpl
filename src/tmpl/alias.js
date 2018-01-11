//常用的类方法
import fn from './fn';

export function setAlias(paths, key = '') {

	if(!fn.isObj(paths)) return;

	fn.each(paths, (path, _key) => {

		if(!path) return;

		const __key = key ? key + '.' + _key : _key;

		if(fn.isObj(path)) {
			setAlias.apply(this, [path, __key]);
		} else {
			this.alias[__key] = path;
		}

	});
}