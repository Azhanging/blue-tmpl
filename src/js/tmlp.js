/*!
 * 
 * 			tmpl.js v1.0.0
 * 			(c) 2016-2017 Blue
 * 			Released under the MIT License.
 * 		
 */

(function(global, factory) {
	if(typeof _require === 'function') {
		_require.define('tmpl', factory);
	} else {
		(global ? (global.Tmpl = global.tmpl = factory()) : {});
	}
})(typeof window !== 'undefined' ? window : this, function() {

	var SCRIPT_REGEXP, ECHO_SCRIPT_REGEXP, REPLACE_ECHO_SCRIPT_OPEN_TAG, OPEN_TAG_REGEXP, CLOSE_TAG_REGEXP, FILTER_TRANFORM, QUEST;

	/*配置信息*/
	var config = {
		open_tag: "<%", //OPEN_TAG
		close_tag: "%>" //CLOSE_TAG
	};

	//事件兼容处理
	function Handler() {}
	Handler.prototype = {
		on : (function() {
			if(typeof document.addEventListener === 'function') {
				return function(type, fn) {
					document.addEventListener(type, fn, false);
				}
			} else {
				return function(type, fn) {
					document.attachEvent('on' + type, fn);
				};
			}
		})()
	};

	var handler = new Handler();

	/*Array indexof方法*/
	//兼容性IE8
	(function() {
		//兼容IE8中 的indexOf
		if(!Array.prototype.indexOf) {
			Array.prototype.indexOf = function(val) {
				for(var index = 0, len = this.length; index < len; index++) {
					if(this[index] === val) {
						return index;
					}
				}
				return -1;
			}
		}
	})();

	/*实例构造*/
	function Tmpl(opts) {
		this.config = extend(config, opts);
		this.el = getEl(opts.el);
		this.template = this.el.innerHTML;
		setRegExp.call(this);
		init.call(this);
	}

	/*初始化*/
	function init() {
		//转化为js执行
		setDom.apply(this);
		//初始化方法
		setMethods.call(this);
		//初始化事件
		setEvent.call(this);
		//所有完毕后的钩子
		isFn(this.config.ready) ? (this.config.ready.apply(this)) : null;
	};

	/*数据绑定添加*/
	Tmpl.prototype.appendTo = function(el, data, cb) {

		var fragment = document.createDocumentFragment();
		var tempEl = document.createElement('div');

		tempEl.innerHTML = new Function('data', this.dom).apply(this, [data]);

		while(tempEl.childNodes.length !== 0) {
			fragment.appendChild(tempEl.childNodes[0]);
		}

		getEl(el).appendChild(fragment);

		isFn(cb) ? (cb.apply(this)) : null;
	};


    //添加事件
	Tmpl.prototype.on = function(exp, type, fn) {

		if(this.eventType.indexOf(type) == -1) {
			setEntrust.apply(this, [exp, type, fn]);
		}

		//查找现在的节点是否存在事件
		if(!this.events[exp]) {
			this.events[exp] = {};
		}

		//当前的事件是否有设置
		if(!this.events[exp][type]) {
			this.events[exp][type] = [];
		}

		this.events[exp][type].push(fn);
	}
	
	//移除事件
	Tmpl.prototype.off = function(exp, type, fn) {
	    var eventIndex = this.events[exp][type].indexOf(fn);
	    if(eventIndex != -1){
	        this.events[exp][type].splice(eventIndex,1);
	    }
    }
	

	//设置主的委托事件
	function setEntrust(exp, type, fn) {
		var _this = this;
		handler.on(type, function(event) {
			var el = event.target || window.event.srcElement;
			if(Array.prototype.indexOf.call(el.classList || el.className.split(' '), exp) != -1) {
				var fnLen = _this.events[exp][type].length;
				for(var index = 0; index < fnLen; index++) {
					_this.events[exp][type][index].apply(_this, [event, el]);
				}
			}
		});
		//添加委托事件
		this.eventType.push(type);
	}

	function setEvent() {
		//初始化事件
		this.events = {};
		//设置事件类型
		this.eventType = [];
	}

	//设置实例方法
	function setMethods() {
		var methods = this.config.methods;
		if(!isObj(methods)) {
			return;
		}
		for(var method in methods) {
			if(methods.hasOwnProperty(method)) {
				this[method] = methods[method];
			}
		}
	}

	//设置正则
	function setRegExp() {
		//解析原生的表达式
		SCRIPT_REGEXP = new RegExp(this.config.open_tag + '[^=][\\\s\\\S]*?' + this.config.close_tag + '|' + this.config.open_tag + '=[\\\s\\\S]*?' + config.close_tag, 'g');
		//解析输出的表达式
		ECHO_SCRIPT_REGEXP = new RegExp(this.config.open_tag + '=[\\\s\\\S]*?' + this.config.close_tag, 'g');
		//替换输出的开头表达式
		REPLACE_ECHO_SCRIPT_OPEN_TAG = new RegExp(this.config.open_tag + '=', 'g');
		//替换输出的开始表达式
		OPEN_TAG_REGEXP = new RegExp(this.config.open_tag, 'g');
		//替换输出的结束表达式
		CLOSE_TAG_REGEXP = new RegExp(this.config.close_tag, 'g');
		//过滤转义字符
		FILTER_TRANFORM = /[\\\b\\\t\\\r\\\f\\\n]/g;
		//转义双引号
		QUEST = /"/g;
	}

	function extend(obj, options) {
		for(var key in options) {
			if(options.hasOwnProperty(key)) {
				obj[key] = options[key];
			}
		}
		return obj;
	}

	function setDom() {

		var script = this.template.match(SCRIPT_REGEXP);
		var echoScript = this.template.match(ECHO_SCRIPT_REGEXP);
		var replaceScript = setSeize.call(this);
		var echoString = replaceScript.split(/___SCRIPT___|___ECHO_SCRIPT___/);

		var domString = []; 
		var longString = echoString.length > script.length ? echoString : script;

		for(var i = 0; i < echoString.length; i++) {
			echoString[i] = "___.push(\"" + filterTransferredMeaning(echoString[i]) + "\");";
		}

		for(var index = 0; index < script.length; index++) {
			/*恢复正则的索引位置*/
			ECHO_SCRIPT_REGEXP.lastIndex = 0;
			if(ECHO_SCRIPT_REGEXP.test(script[index])) {
				script[index] = script[index].replace(REPLACE_ECHO_SCRIPT_OPEN_TAG, "___.push(").replace(CLOSE_TAG_REGEXP, ");");
			} else {
				script[index] = script[index].replace(OPEN_TAG_REGEXP, '').replace(CLOSE_TAG_REGEXP, '');
			}
		}

		for(var _index = 0, len = longString.length; _index < len; _index++) {
			if(typeof echoString[_index] === 'string') {
				domString.push(echoString[_index]);
			}
			if(typeof script[_index] === 'string') {
				domString.push(script[_index]);
			}
		}

		this.dom = 'var ___ = [];' + domString.join('') + 'return ___.join("");';
	};

	//设置占位
	function setSeize() {
		var replaceScript = this.template.replace(ECHO_SCRIPT_REGEXP, '___ECHO_SCRIPT___').replace(SCRIPT_REGEXP, '___SCRIPT___');
		return replaceScript;
	}

	//过滤string中的引号
	function filterTransferredMeaning(string) {
		return string.replace(FILTER_TRANFORM, "").replace(QUEST, '\\\"');
	}

	/*获取元素*/
	function getEl(exp) {
		if(document.querySelector(exp)) {
			return document.querySelector(exp);
		} else {
			return document.getElementById(exp);
		}
	}

	//获取class中的节点
	function getEls(exp) {
		if(document.querySelectorAll(exp)) {
			return document.querySelector(exp);
		} else {
			return document.getElementsByClassName(exp);
		}
	}

	/*是否为函数*/
	function isFn(fn) {
		return typeof fn === 'function';
	}

	/*是否为对象*/
	function isObj(obj) {
		return obj instanceof Object && !(obj instanceof Array) && obj !== null;
	}

	Tmpl.version = "v1.0.0";

	return Tmpl;
});