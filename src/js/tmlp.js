/*!
 * 
 * 			tmpl.js v1.0.1
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
	function Fn() {}

	Fn.prototype = {
		isArr: function(array) {
			return array instanceof Array;
		},
		isObj: function(obj) {
			return obj instanceof Object && !(obj instanceof Array) && obj !== null;
		},
		isFn: function(fn) {
			return typeof fn === 'function';
		},
		isStr: function(string) {
			return typeof string === 'string';
		},
		isNum: function(num) {
			return typeof num === 'number' || /^\d*(.\d*)?$/.test(num);
		},
		on: (function() {
			if(typeof document.addEventListener === 'function') {
				return function(el, type, fn) {
					el.addEventListener(type, fn, false);
				}
			} else {
				return function(el, type, fn) {
					el.attachEvent('on' + type, fn);
				};
			}
		})(),
		each: function(obj, cb) {
			var i = 0,
				len = obj.length;
			if(this.isArr(obj)) {
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
		},
		getEl: function(exp) {
			if(document.querySelector) {
				var getEl = document.querySelector(exp);
				return getEl !== null ? getEl : document.getElementById(exp);
			} else {
				return document.getElementById(exp);
			}
		},
		extend: function(obj, options) {
			this.each(options, function(option, key) {
				obj[key] = option;
			});

			return obj;
		}
	};

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
		this.config = this.fn.extend(config, opts);
		this.el = this.fn.getEl(opts.el);
		this.template = this.el.innerHTML;
		setRegExp.call(this);
		init.call(this);
	}

	/*初始化*/
	function init() {
		//转化为js执行
		setDom.apply(this);
		//初始化方法
		setInstance.call(this, 'methods');
		//初始化数据
		setInstance.call(this, 'data');
		//初始化事件
		setEvent.call(this);
		//设置事件
		this.fn.isFn(this.config.events) ? (this.config.events.apply(this)) : null;
		//所有完毕后的钩子
		this.fn.isFn(this.config.mounted) ? (this.config.mounted.apply(this)) : null;
	};

	Tmpl.prototype = {
		constructor: Tmpl,
		/*数据绑定添加*/
		appendTo: function(el, data, cb) {

			var fragment = document.createDocumentFragment();
			var tempEl = document.createElement('div');

			tempEl.innerHTML = new Function('data', this.dom).apply(this, [data]);

			while(tempEl.childNodes.length !== 0) {
				fragment.appendChild(tempEl.childNodes[0]);
			}

			this.fn.getEl(el).appendChild(fragment);

			this.fn.isFn(cb) ? (cb.apply(this)) : null;

			return this;
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

			return this;
		},
		//移除事件
		off: function(exp, type, fn) {
			var eventIndex = this.events[type][exp].indexOf(fn);
			if(eventIndex != -1) this.events[type][exp].splice(eventIndex, 1);
			return this;
		},
		//继承处理实例
		fn: new Fn(),
		//添加方法绑定
		bind: function(el, bind) {
			bindFn.apply(this, [el, bind, 'bind']);
			return this;
		},
		//取消方法绑定
		unbind: function(el, bind) {
			bindFn.apply(this, [el, bind, 'unbind']);
			return this;
		},
		//替换绑定
		replaceBind: function(el, bind) {
			bindFn.apply(this, [el, bind, 'replaceBind']);
			return this;
		},
		//添加class
		addClass: function(el, className) {
			bindFn.apply(this, [el, bind, 'addClass']);
			return this;
		},
		//删除class
		removeClass: function(el, bind) {
			bindFn.apply(this, [el, bind, 'removeClass']);
			return this;
		},
		//替换className
		replaceClass: function(el, bind) {
			bindFn.apply(this, [el, bind, 'replaceClass']);
			return this;
		},
		//是否存在class
		hasClass: function(el, className) {
			//节点中存在的className
			var _className = el.className.split(' ');
			//是否存在的className
			var hasClassName = className.split(' ');
			var hasLen = 0;

			for(var index = 0; index < hasClassName.length; index++) {
				if(_className.indexOf(hasClassName[index]) !== -1) ++hasLen;
			}
			if(hasLen === hasClassName.length) return true;
			return false;
		},
		//获取属性
		attr: function(el, attr) {
			var _this = this;
			if(this.fn.isObj(attr)) {
				this.fn.each(attr, function(_attr, key) {
					if(typeof _attr === 'boolean') {
						el[key] = _attr;
						el.setAttribute(key, _attr);
					} else if(_attr === '') {
						el.removeAttribute(key);
					} else {
						el.setAttribute(key, _attr);
					}
				});
				return this;
			} else {
				if(attr instanceof Array) {
					var attrs = [];
					this.fn.each(attr, function(_attr, index) {
						attrs.push(_this.attr(el, _attr));
					});
					return attrs;
				} else if(/^bind-\S*/.test(attr)) {
					return new Function('return ' + el.getAttribute(attr) + ';').apply(this);
				} else {
					return el.getAttribute(attr);
				}
			}
		},
		//获取、设置prop属性
		prop: function(el, prop) {
			//设置节点属性
			if(this.fn.isObj(prop)) {
				this.fn.each(prop, function(_prop, key) {
					el[key] = _prop;
				});
				return this;
			} else if(this.fn.isStr(prop)) { //获得节点属性
				if(/^bind-\S*/.test(prop)) return new Function('return ' + el[prop] + ';').apply(this);
				return el[prop];
			}
		},
		//获取、设置html
		html: function(el, html) {
			if(html === undefined) return el.innerHTML;
			el.innerHTML = html;
			return this;
		},
		//获取、设置value
		val: function(el, val) {
			if(val === undefined) return el.value;
			el.value = val;
			return this;
		},
		//获取、设置textContent
		text: function(el, text) {
			if(text === undefined) return el.textContent;
			el.textContent = text;
			return this;
		},
		//查找符合的一个父级节点
		parent: function(el, hasClassName) {

			var parent = el.parentNode;

			if(parent === document || parent === null) return null;

			if(!hasClassName) return parent;

			if(this.hasClass(parent, hasClassName)) return parent;

			return this.parent(parent, hasClassName);

		},
		//超找所有符合的父元素
		parents: function(el, hasClassName, hasClassParent) {

			var parent = el.parentNode;

			hasClassParent = (hasClassParent ? hasClassParent : []);

			if(parent === document || parent === null) return null;

			if(this.hasClass(parent, hasClassName)) hasClassParent.push(parent);

			this.parents(parent, hasClassName, hasClassParent);

			return hasClassParent;
		},
		//获取直接的当个子节点
		children: function(el) {
			return el.children;
		},
		//查找对应的class存在的节点
		childrens: function(el, className, hasClassChild) {
			var i = 0;
			hasClassChild = (hasClassChild ? hasClassChild : []);
			for(; i < el.children.length; i++) {
				if(this.hasClass(el.children[i], className)) hasClassChild.push(el.children[i]);
				this.find(el.children[i], className, hasClassChild);
			}
			return hasClassChild;
		},
		//下一个节点
		next: function(el) {
			var nextEl = el.nextSibling;
			if(nextEl === null) return null;
			if(nextEl.nodeType !== 1) return this.next(nextEl);
			return nextEl;
		},
		//获取当前元素同级前的节点
		nextAll: function(el) {
			return this.siblings(el, 'nextAll');
		},
		//获取当前元素同级后的节点
		prevAll: function(el) {
			return this.siblings(el, 'prevAll');
		},
		//上一个节点
		prev: function(el) {
			var prevEl = el.previousSibling;
			if(prevEl === null) return null;
			if(prevEl.nodeType !== 1) return this.prev(prevEl);
			return prevEl;
		},
		//获取同级的兄弟节点
		siblings: function(el, type) {
			var parent = this.parent(el);
			if(parent === null) return null;
			var child = parent.children;
			var siblings = [];
			var i = 0;
			if(type === 'nextAll') i = Array.prototype.indexOf.call(child, el);
			for(; i < child.length; i++) {
				if(child[i] !== el) siblings.push(child[i]);
				if(type === 'prevAll' && child[i] === el) return siblings;
			}
			return siblings;
		}
	}

	//绑定相关函数
	function bindFn(el, className, type) {
		var _className = el.className.split(' ');
		//替换
		if(this.fn.isObj(className) && (type == 'replaceBind' || type == 'replaceClass')) {
			this.fn.each(className, function(__className, key) {
				var findIndex = _className.indexOf(key);
				if(findIndex != -1) {
					_className[findIndex] = __className;
				}
			});
		} else {
			//获得el中的className{type:string}
			var className = className.split(' ');
			for(var index = 0; index < className.length; index++) {
				var findIndex = _className.indexOf(className[index]);
				if(type == 'bind' || type == 'addClass') {
					if(findIndex == -1) {
						_className.push(className[index]);
					}
				} else if(type == 'unbind' || type == 'removeClass') {
					if(findIndex != -1) {
						_className.splice(findIndex, 1);
					}
				}
			}
		}

		el.className = _className.join(' ');

		return this;
	}

	//设置主的委托事件
	function setEntrust(type, fn) {
		var _this = this;
		this.fn.on(document, type, function(event) {
			var el = event.target || window.event.srcElement;
			var eventType = _this.events[type];
			_this.fn.each(eventType, function(_eventType, bind) {
				if(el.className && Array.prototype.indexOf.call(el.className.split(' '), bind) != -1) {
					_this.fn.each(_eventType, function(fn, index) {
						fn.apply(_this, [event, el]);
					});
				}
			});
		});

		//添加委托事件
		this.eventType.push(type);
	}

	//初始化时间中的参数
	function setEvent() {
		//初始化事件
		this.events = {};
		//设置事件类型
		this.eventType = [];
	}

	//设置实例
	function setInstance(type) {
		var get = this.config[type];
		var _this = this;

		if(!this.fn.isObj(get)) {
			return;
		}

		this.fn.each(get, function(_get, key) {
			_this[key] = _get;
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

	//初始化dom生成
	function setDom() {

		var script = this.template.match(SCRIPT_REGEXP);
		var echoScript = this.template.match(ECHO_SCRIPT_REGEXP);
		var replaceScript = setSeize.call(this);
		var echoString = replaceScript.split(/___SCRIPT___|___ECHO_SCRIPT___/);

		var domString = [];
		var longString = echoString.length > script.length ? echoString : script;

		this.fn.each(echoString, function(_echoString, index) {
			echoString[index] = "___.push(\"" + filterTransferredMeaning(_echoString) + "\");";
		});

		this.fn.each(script, function(_string, index) {
			/*恢复正则的索引位置*/
			ECHO_SCRIPT_REGEXP.lastIndex = 0;
			if(ECHO_SCRIPT_REGEXP.test(_string)) {
				script[index] = _string.replace(REPLACE_ECHO_SCRIPT_OPEN_TAG, "___.push(").replace(CLOSE_TAG_REGEXP, ");");
			} else {
				script[index] = _string.replace(OPEN_TAG_REGEXP, '').replace(CLOSE_TAG_REGEXP, '');
			}
		});

		this.fn.each(longString, function(_longString, index) {
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

	Tmpl.version = "v1.0.1";

	return Tmpl;
});