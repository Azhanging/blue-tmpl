//tmpl的初始化
import init from './init';
//处理模板数据的Render类
import Render from './render';
//常用的类方法
import fn from './fn';
//Dom的操作
import Dom from './dom';
//config配置
import config from './config';
//转义html
import escapeCode from './escapeCode';
//set
import { setEl } from './set';
//setAlias
import { setAlias } from './alias';

//tmpl的render解析
import {
	render
} from './tmpl-render';

export default class Tmpl extends Dom {
	//Tmpl构造
	constructor(opts) {
		super();
		this.config = fn.extend(fn.copy(config), opts);
		this.init();
	}

	//安装插件
	static install(constructor) {
		constructor.install(this);
	}

	//直接解析
	static render(domStr, state) {

		const tmpl = new this({
			template: domStr
		});

		return tmpl.render(state).template;
	}

	//解析path
	static setAlias(paths) {
		setAlias.call(this, paths);
	}

	//初始化对象
	init() {
		init.call(this);
	}

	//解析模板和数据
	render(state) {
		return new Render({
			tmpl: this,
			state
		});
	}

	//添加数据更新模板
	update() {
		this.template = setEl.call(this);
		render.call(this);
		return this;
	}

	/*回调*/
	cb(cb) {
		fn.cb(cb, this);
		return this;
	}

	/*转义*/
	escape(escapeVal) {
		fn.each(escapeCode, (item, key) => {
			escapeVal = escapeVal.replace(new RegExp(key, 'g'), item);
		});
		return escapeVal;
	}
}

//常用的方法给tmpl的fn属性中
Tmpl.prototype.fn = fn;

//设置路径别名常量
Tmpl.alias = {};