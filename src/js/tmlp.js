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
		on: (function() {
			if(typeof document.addEventListener === 'function') {
				return function(type, fn) {
					document.addEventListener(type, fn, false);
				}
			} else {
				return function(type, fn) {
					document.attachEvent('on' + type, fn);
				};
			}
		})(),
		bind: function(el, className, type) {
			//获得el中的className{type:string}
			var className = className.split(' ');
			var _className = el.className.split(' ');

			for(var index = 0; index < className.length; index++) {
				var findIndex = _className.indexOf(className[index]);
				if(type == 'bind') {
					if(findIndex == -1) {
						_className.push(className[index]);
					}
				} else {
				    if(findIndex != -1) {
				    	_className.splice(findIndex, 1);
				    }
				}
			}

			el.className = _className.join(' ');
		},
		each: function(obj, cb) {
			var i = 0,
				len = obj.length;
			if(isArray(obj)) {
				for(; i < len; i++) {
					cb(obj[i], i);
				}
			} else {
				for(i in obj) {
					if(obj.hasOwnProperty(i)) {
						cb(obj[i], i);
					}
				}
			}
		}
	};

	//处理函数集合

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
		this.config = extend.call(this,config, opts);
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
		//设置事件
		isFn(this.config.events) ? (this.config.events.apply(this)) : null;
		//所有完毕后的钩子
		isFn(this.config.mounted) ? (this.config.mounted.apply(this)) : null;
	};

	

	
	Tmpl.prototype = {
		/*数据绑定添加*/
		appendTo: function(el, data, cb) {

			var fragment = document.createDocumentFragment();
			var tempEl = document.createElement('div');

			tempEl.innerHTML = new Function('data', this.dom).apply(this, [data]);

			while(tempEl.childNodes.length !== 0) {
				fragment.appendChild(tempEl.childNodes[0]);
			}

			getEl(el).appendChild(fragment);

			isFn(cb) ? (cb.apply(this)) : null;
		},
		//添加事件
		on: function(exp, type, fn) {
			if(this.eventType.indexOf(type) == -1) {
				setEntrust.apply(this, [type, fn]);
			}

			//查找现在的节点是否存在事件
			if(!this.events[type]) {
				this.events[type] = {};
			}

			//当前的事件是否有设置
			if(!this.events[type][exp]) {
				this.events[type][exp] = [];
			}

			this.events[type][exp].push(fn);
		},
		//移除事件
		off: function(exp, type, fn) {
			var eventIndex = this.events[type][exp].indexOf(fn);
			if(eventIndex != -1) {
				this.events[type][exp].splice(eventIndex, 1);
			}
		},
		handler:new Handler(),
		bind:function(el, bind){
		    this.handler.bind(el, bind, 'bind');
		},
		unbind:function(el, bind){
		    this.handler.bind(el, bind, 'unbind');
		}
	}

	//设置主的委托事件
	function setEntrust(type, fn) {
		var _this = this;
		this.handler.on(type, function(event) {
			var el = event.target || window.event.srcElement;
			var eventType = _this.events[type];
			_this.handler.each(eventType,function(_eventType,bind){
				if(el.className && Array.prototype.indexOf.call(el.className.split(' '), bind) != -1) {
					_this.handler.each(_eventType, function(fn, index) {
						fn.apply(_this, [event, el]);
					});
				}
			});
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
		var _this = this;
		
		if(!isObj(methods)) {
			return;
		}
		
		this.handler.each(methods, function(method, methodKey) {
			_this[methodKey] = method;
		});
	}

	//设置正则
	function setRegExp() {
		var open_tag = this.config.open_tag;
		var close_tag = this.config.close_tag;
		//解析原生的表达式
		SCRIPT_REGEXP = new RegExp(open_tag + '[^=][\\\s\\\S]*?' + close_tag + '|' + open_tag + '=[\\\s\\\S]*?' + config.close_tag, 'g');
		//解析输出的表达式
		ECHO_SCRIPT_REGEXP = new RegExp(open_tag + '=[\\\s\\\S]*?' + close_tag, 'g');
		//替换输出的开头表达式
		REPLACE_ECHO_SCRIPT_OPEN_TAG = new RegExp(open_tag + '=', 'g');
		//替换输出的开始表达式
		OPEN_TAG_REGEXP = new RegExp(open_tag, 'g');
		//替换输出的结束表达式
		CLOSE_TAG_REGEXP = new RegExp(close_tag, 'g');
		//过滤转义字符
		FILTER_TRANFORM = /[\\\b\\\t\\\r\\\f\\\n]/g;
		//转义双引号
		QUEST = /"/g;
	}

	function extend(obj, options) {
		
		this.handler.each(options,function(option,key){
			obj[key] = option;
		});
		
		return obj;
	}

	function setDom() {

		var script = this.template.match(SCRIPT_REGEXP);
		var echoScript = this.template.match(ECHO_SCRIPT_REGEXP);
		var replaceScript = setSeize.call(this);
		var echoString = replaceScript.split(/___SCRIPT___|___ECHO_SCRIPT___/);

		var domString = [];
		var longString = echoString.length > script.length ? echoString : script;

		this.handler.each(echoString , function(_echoString,index){
			echoString[index] = "___.push(\"" + filterTransferredMeaning(_echoString) + "\");";
		});
		
		this.handler.each(script , function(_string,index){
			/*恢复正则的索引位置*/
			ECHO_SCRIPT_REGEXP.lastIndex = 0;
			if(ECHO_SCRIPT_REGEXP.test(_string)) {
				script[index] = _string.replace(REPLACE_ECHO_SCRIPT_OPEN_TAG, "___.push(").replace(CLOSE_TAG_REGEXP, ");");
			} else {
				script[index] = _string.replace(OPEN_TAG_REGEXP, '').replace(CLOSE_TAG_REGEXP, '');
			}
		});
		
		this.handler.each(longString , function(_longString,index){
			if(typeof echoString[index] === 'string') {
				domString.push(echoString[index]);
			}
			if(typeof script[index] === 'string') {
				domString.push(script[index]);
			}
		});

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

	function isArray(array) {
		return array instanceof Array;
	}

	Tmpl.version = "v1.0.0";

	return Tmpl;
});