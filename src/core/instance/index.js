//tmpl的初始化
import init from './init';
//处理模板数据的Render类
import Render from '../render';
//常用的类方法
import util from '../../util';
//Dom的操作
import Dom from './dom';
//config配置
import config from '../config';
//转义html
import escapeCode from '../compile/escape-code';
//set
import { setEl } from './set';
//setAlias
import { setAlias } from '../alias';

//tmpl的render解析
import {
  compile
} from '../compile';

export default class BlueTmpl extends Dom {
	//Tmpl构造
	constructor(opts) {
		super();
		this.$config = util.extend(util.deepCopy(config), opts);
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
	render(state, stateName) {
		return new Render({
			tmpl: this,
			state,
			stateName
		});
	}

	//添加数据更新模板
	update() {
		this.$template = setEl.call(this);
    compile.call(this);
		return this;
	}

	/*回调*/
	cb(cb) {
		util.cb(cb, this);
		return this;
	}

	/*转义*/
	escape(escapeVal) {
		util.each(escapeCode, (item, key) => {
			escapeVal = escapeVal.replace(new RegExp(key, 'g'), item);
		});
		return escapeVal;
	}
}

BlueTmpl.prototype.util = util;

BlueTmpl.alias = {};

BlueTmpl.version = "v1.1.2";