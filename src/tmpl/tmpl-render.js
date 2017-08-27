/*
 * 一堆解析模板的方法,tmpl的核心算法
 * */
//运行环境是否在浏览器
import inBrowser from './in_browser';
//常用的方法
import Fn from './fn';
//模板正则配置
import {
    FILTER_TRANFORM,
    QUEST,
    INCLUDE_ID,
    INCLUDE_FILE,
    INCLUDE_NULL,
    INCLUDE_ERROR,
    BLOCK,
    BLOCK_APPEND,
    BLOCK_INSETR,
    EXTENDS
} from './tmpl-regexp';

//html中的转义
import escapeCode from './escapeCode';

//实例化常用的方法
const fn = new Fn();

//在node环境中使用需要用到fs获取文件
let fs;

if(!inBrowser) {
	try{	    
	    /*兼容webpack的写法来获取nodejs中的核心模块*/
	    fs = __non_webpack_require__('fs');
	}catch(e){
	    /*在webpack中打包出现报错问题*/
	    fs = node.fs;
	}
}

//由于模块接口中都是只读的，不能放在配置中；
let SCRIPT_REGEXP,
	/*原生script*/
	NATIVE_SCRIPT,
	/*输出script*/
	ECHO_SCRIPT_REGEXP,
	//转义输出
	ECHO_ESCAPE_REGEXP,
	/*替换输出script*/
	REPLACE_ECHO_SCRIPT_OPEN_TAG,
	//转义的开头表达式
	ECHO_ESCAPE_REGEXP_OPEN_TAG,
	/*起始*/
	OPEN_TAG_REGEXP,
	/*闭合*/
	CLOSE_TAG_REGEXP;

//把路由实例挂靠到模板中
export function setRouter() {
	if(fn.isObj(this.config.router))
		this.constructor.router = this.config.router;
}

//初始化时间中的参数
export function setEvent() {
	//初始化事件
	this.events = {};
	//设置事件类型
	this.eventType = [];
}

//设置实例
export function setInstance(type) {

	const get = this.config[type];

	if(!fn.isObj(get)) {
		return;
	}

	fn.each(get, (_get, key) => {
		this[key] = _get;
	});
}

//处理正则数据
export function initRegExp(expr) {
	const tm = '\\/*.?+$^[](){}|\'\"';
	fn.each(tm, (tmItem, index) => {
		expr = expr.replace(new RegExp('\\' + tmItem, 'g'), '\\' + tmItem);
	});
	return expr;
}

//设置正则
export function setRegExp() {

	const open_tag = initRegExp.call(this, this.config.open_tag);

	const close_tag = initRegExp.call(this, this.config.close_tag);
	//解析所有的表达式
	SCRIPT_REGEXP = new RegExp(open_tag + '[^=-][\\\s\\\S]*?' + close_tag + '|' + open_tag + '=[\\\s\\\S]*?' + close_tag + '|' + open_tag + '-[\\\s\\\S]*?' + close_tag, 'g');
	//原生的script
	NATIVE_SCRIPT = new RegExp(open_tag + '[^=-][\\\s\\\S]*?' + close_tag, 'g');
	//解析输出的表达式
	ECHO_SCRIPT_REGEXP = new RegExp(open_tag + '=([\\\s\\\S]*?)' + close_tag, 'g');
	//转义输出
	ECHO_ESCAPE_REGEXP = new RegExp(open_tag + '-([\\\s\\\S]*?)' + close_tag, 'g');
	//替换输出的开头表达式
	REPLACE_ECHO_SCRIPT_OPEN_TAG = new RegExp(open_tag + '=', 'g');
	//转义的开头表达式
	ECHO_ESCAPE_REGEXP_OPEN_TAG = new RegExp(open_tag + '-', 'g');
	//替换输出的开始表达式
	OPEN_TAG_REGEXP = new RegExp(open_tag, 'g');
	//替换输出的结束表达式
	CLOSE_TAG_REGEXP = new RegExp(close_tag, 'g');
}

//初始化dom生成
export function setDom() {

	//node中使用block
	if(!inBrowser) {
		replaceBlock.call(this);
	}

	/*重新检查依赖里面有没有引入的数据*/
	replaceAlias.call(this);

	/*清除遗留的block块*/
	clearBlock.call(this);

	/*替换include中的内容*/
	replaceInclude.call(this);

	/*解析script*/
	let script = this.template.match(SCRIPT_REGEXP);

	const replaceScript = setSeize.call(this);

	const echoString = replaceScript.split(/___SCRIPT___|___ECHO_SCRIPT___/);

	const domString = [];

	if(!script) script = [];

	const longString = echoString.length > script.length ? echoString : script;

	fn.each(echoString, (_echoString, index) => {
		echoString[index] = "___.push(\"" + filterTransferredMeaning(_echoString) + "\");";
	});

	fn.each(script, (_string, index) => {

		//恢复正则的索引位置
		ECHO_SCRIPT_REGEXP.lastIndex = 0;
		NATIVE_SCRIPT.lastIndex = 0;
		ECHO_ESCAPE_REGEXP.lastIndex = 0;

		//处理对应表达式
		if(ECHO_SCRIPT_REGEXP.test(_string)) {
			script[index] = _string.replace(REPLACE_ECHO_SCRIPT_OPEN_TAG, "___.push(").replace(CLOSE_TAG_REGEXP, ");");
		} else if(NATIVE_SCRIPT.test(_string)) {
			script[index] = _string.replace(OPEN_TAG_REGEXP, '').replace(CLOSE_TAG_REGEXP, '');
		} else if(ECHO_ESCAPE_REGEXP.test(_string)) {
			script[index] = _string.replace(ECHO_ESCAPE_REGEXP_OPEN_TAG, "___.push(_this_.escape(").replace(CLOSE_TAG_REGEXP, "));");
		}

	});

	fn.each(longString, (_longString, index) => {
		if(typeof echoString[index] === 'string') domString.push(echoString[index]);
		if(typeof script[index] === 'string') domString.push(script[index].replace(FILTER_TRANFORM, ""));
	});
	
	this.dom = 'var _this_ = this,___ = [];' + domString.join('') + 'return ___.join("");';
};

/*替换include引入的模板*/
export function replaceInclude() {

	const include = (() => {
		if(inBrowser) {
			//在浏览器环境清空include[file]
			return INCLUDE_ID;
		} else {
			//在node环境清空include[name]
			return INCLUDE_FILE;
		}
	})();

	let includeTmpl, includeId;

	//清空空的引入模块
	this.template = this.template.replace(INCLUDE_NULL, '');

	//去重
	includeTmpl = fn.unique(this.template.match(include));
	includeId = includeTmpl.toString()
		.replace(include, "$2")
		.split(',');

	//找不到include//查找的id和include匹配的数量必须相同
	if(includeTmpl.length === 0 || fn.trimArr(includeId)
		.length === 0 ||
		!(includeTmpl.length > 0 &&
			includeId.length > 0 &&
			includeId.length === includeTmpl.length
		)) return;

	fn.each(includeId, (id, index) => {
		const replaceIncludeRegExp = new RegExp(initRegExp.call(this, includeTmpl[index]), 'g');
		/*浏览器环境下执行*/
		if(inBrowser) {
			const el = fn.getEl(id);
			if(el) this.template = this.template.replace(replaceIncludeRegExp, this.html(el));
			//找不到就清空原来的内容
			else this.template = this.template.replace(replaceIncludeRegExp, '');
		} else {
			/*node环境下执行*/
			try {
				const tmpl = fs.readFileSync(id, {
					encoding: 'UTF8'
				});

				this.template = this.template.replace(replaceIncludeRegExp, tmpl);

			} catch(e) {
				//找不到就清空原来的内容
				this.template = this.template.replace(replaceIncludeRegExp, '');
			}
		}
	});

    /*去掉重复的include*/
	includeTmpl = fn.unique(this.template.match(include));
    
    /*查找是否还有include的引入*/
	if(includeTmpl.length > 0) replaceInclude.call(this);
	
	/*清空错误的include*/
	this.template = this.template.replace(INCLUDE_ERROR, '');
}

/*替换Block块内容*/
export function replaceBlock() {

	//先设置获取include的引入模板
	replaceAlias.call(this);

	const baseFile = fn.unique(this.template.match(EXTENDS));

	/*只获取第一个base的名字*/
	const baseFileName = baseFile.toString()
		.replace(EXTENDS, "$2")
		.split(',')[0];

	/*如果不存在block的内容，直接跳出*/
	if(baseFileName === '') return;

	const blockTmpl = fn.unique(this.template.match(BLOCK));

	let tmpl = fs.readFileSync(baseFileName, {
		encoding: 'UTF8'
	});

	const baseTmpl = tmpl.match(BLOCK);

	const baseBlockName = baseTmpl.toString()
		.replace(BLOCK, "$2")
		.split(',');

	fn.each(baseBlockName, (name, index) => {

		const replaceBlock = new RegExp(initRegExp.call(this, baseTmpl[index]), 'g');

		let hasBlock = false;

		fn.each(blockTmpl, (blocktmpl, _index) => {
		    
			BLOCK.test(blocktmpl);
			
			const _name = RegExp.$2,
				blockContent = RegExp.$3;
					
			//匹配到name的
			if(name === _name) {
			    
				tmpl = tmpl.replace(replaceBlock, blockContent);
				hasBlock = true;
				
			} else if(BLOCK_APPEND.test(_name) && name === _name.replace(BLOCK_APPEND, '')) {
			    
				tmpl = tmpl.replace(replaceBlock, baseTmpl[index].replace(BLOCK, "$3") + blockContent);
				hasBlock = true;
				
			} else if(BLOCK_INSETR.test(_name) && name === _name.replace(BLOCK_INSETR, '')) {
			    
				tmpl = tmpl.replace(replaceBlock, blockContent + baseTmpl[index].replace(BLOCK, "$3"));
				hasBlock = true;
				
			}
			BLOCK.lastIndex = 0;
		});

		/*如果当前的block是在extends的模板中不存在，则显示默认里面的*/
		if(!hasBlock) {
			tmpl = tmpl.replace(replaceBlock, baseTmpl[index].replace(BLOCK, '$3'));
		}
	});

	this.template = tmpl;
}

/*替换别名的常量*/
export function replaceAlias() {
	const constructor = this.constructor;
	fn.each(constructor.alias, (replaceAlias, alias) => {
		this.template = this.template.replace(new RegExp(initRegExp.call(this, alias), 'g'), replaceAlias);
	});
}

/*清除多余的block块*/
export function clearBlock() {
	this.template = this.template.replace(EXTENDS, '').replace(BLOCK, '');
}

//设置占位
export function setSeize() {
	const replaceScript = this.template
		.replace(ECHO_SCRIPT_REGEXP, '___ECHO_SCRIPT___')
		.replace(SCRIPT_REGEXP, '___SCRIPT___');
	return replaceScript;
}

//过滤string中的引号
export function filterTransferredMeaning(string) {
	return string.replace(FILTER_TRANFORM, "")
		.replace(QUEST, '\\\"');
}