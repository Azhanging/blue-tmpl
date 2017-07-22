/*!
 * 
 * 			tmpl.js v1.0.1
 * 			(c) 2016-2017 Blue
 * 			Released under the MIT License.
 * 		
 */

(function(global, factory) {
	if(typeof _require === 'function') {
		_require.defineId('tmpl', factory);
	} else if(typeof exports === 'object' && typeof module === 'object') {
		module.exports = factory();
	} else if(typeof define === 'function' && define.amd) {
		define("tmpl", [], factory);
	} else {
		(global ? (global.Tmpl = factory()) : {});
	}
})(typeof window !== 'undefined' ? window : this, function() {

	var SCRIPT_REGEXP, ECHO_SCRIPT_REGEXP, REPLACE_ECHO_SCRIPT_OPEN_TAG, OPEN_TAG_REGEXP, CLOSE_TAG_REGEXP, FILTER_TRANFORM, QUEST, INCLUDE, INCLUDE_NULL;

	var inBrowser = typeof window !== 'undefined';

	/*配置信息*/
	var config = {
		open_tag: "<%", //OPEN_TAG
		close_tag: "%>", //CLOSE_TAG,
		template: "",
		data: {},
		methods: {}
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
			return typeof num === 'number' || /^\d*(\.\d*)?$/.test(num);
		},
		isEl: function(el) {
			return el && el.nodeType;
		},
		on: (function() {
			if(!inBrowser) return;
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
		off: (function() {
			if(!inBrowser) return;
			if(typeof document.removeEventListener === 'function') {
				return function(el, type, fn) {
					el.addEventListener(type, fn, false);
				}
			} else {
				return function(el, type, fn) {
					el.detachEvent('on' + type, fn);
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
					if(obj.hasOwnProperty(i)) cb(obj[i], i);
				}
			}
		},
		getEl: function(exp) {
			if(!exp) return null;
			if(!this.isFn(document.querySelector)) return document.getElementById(exp);
			var getEl = document.querySelector(exp);
			var el = document.getElementById(exp);
			return getEl !== null ? getEl : (el ? el : null);
		},
		getEls: function(exp) {
			if(!exp) return null;
			if(!this.isFn(document.querySelectorAll)) return document.getElementsByClassName(exp);
			var getEls = document.querySelectorAll(exp);
			var el = document.getElementsByClassName(exp);
			return getEls.length > 0 ? getEls : (el ? el : []);
		},
		extend: function(obj, options) {
			this.each(options, function(option, key) {
				obj[key] = option;
			});

			return obj;
		},
		cb: function(cb, context, args) {
			args = args ? args : [];
			this.isFn(cb) ? (cb.apply(context, args)) : null;
		},
		run: function(cb, context, args) {
			this.cb(cb, context, args);
		},
		/*去重*/
		unique: function(arr) {
			if(!this.isArr(arr)) return [];
			var newArray = [];
			this.each(arr, function(item, index) {
				if(newArray.indexOf(item) === -1) {
					newArray.push(item);
				}
			});
			return newArray;
		},
		/*清空数组中空的值*/
		clearNull: function(arr) {
			var newArr = [];
			this.each(arr, function(item, index) {
				if(item !== '') {
					newArr.push(item);
				}
			});
			return newArr;
		},
		/*深拷贝*/
		copy: function(obj) {
			if(this.isObj(obj) || this.isArr(obj))
				return JSON.parse(JSON.stringify(obj));
			return null;
		},
		ajax: function(options) {
			var _this = this;
			//创建xhr
			var xhr = new XMLHttpRequest();
			//连接类型
			options.type = (options.type ? options.type.toUpperCase() : 'GET');
			//超时
			xhr.timeout = options.timeout && options.async !== false ? options.timeout : 0;

			if(options.type === "GET") {
				xhr.open(options.type, (function() {
					return options.url.indexOf('?') ? options.url + _this.serialize(options.data) : options.url + '?' + _this.serialize(options.data)
				})(), options.async);
			} else if(options.type === "POST") {
				xhr.open(options.type, options.url, options.async);
			}
			xhr.setRequestHeader('Content-Type', options.contentType ? options.contentType : 'application/x-www-form-urlencoded; charset=UTF-8');
			//响应事件
			xhr.addEventListener('readystatechange', function() {
				try {
					var data = JSON.parse(xhr.responseText);
				} catch(e) {
					var data = xhr.responseText;
				}

				if(xhr.readyState == 4) {
					if(xhr.status == 200) {
						_this.cb(options.success, _this, [data]);
					} else if(xhr.status >= 400) {
						_this.cb(options.error, _this, [data]);
					}
				}
			}, false);

			//send指令
			if(options.type === "GET") {
				xhr.send();
			} else if(options.type === "POST") {
				xhr.send(this.serialize(options.data));
			}
		},
		//初始化数据
		serialize: function(data) {
			var result = '';
			for(var k in data) {
				if(data.hasOwnProperty(k)) {
					result = result + k + '=' + encodeURIComponent(data[k]) + '&';
				}
			}
			return result.substring(0, result.length - 1);
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

		/*只在浏览器环境使用*/
		if(inBrowser) {
			if(!document.getElementsByClassName) {
				document.getElementsByClassName = function(className, element) {
					var children = (element || document).getElementsByTagName('*');
					var elements = new Array();
					for(var i = 0; i < children.length; i++) {
						var child = children[i];
						var classNames = child.className.split(' ');
						for(var j = 0; j < classNames.length; j++) {
							if(classNames[j] == className) {
								elements.push(child);
								break;
							}
						}
					}
					return elements;
				};
			}
		}
	})();

	/*
	 *	Data代理实例
	 * */
	/*针对tmpl中的数据流*/
	function Data(options) {
		this.init(options);
	}

	//插入方法
	Data.prototype = {
		constructor: Data,
		init: function(options) {
			this.tmpl = options.tmpl;
			this.data = options.data;
			this.dom = new Function('data', this.tmpl.dom)
				.apply(this.tmpl, [this.data]);
			this.fragment = this.setDom();
		},
		setDom: function() {
			return this.tmpl.create(this.dom);
		},
		appendTo: function(el, cb) {
			var fn = this.tmpl.fn;
			if(el.nodeType === 1) el.appendChild(this.fragment);
			else fn.getEl(el)
				.appendChild(this.fragment);

			fn.cb(cb, this.tmpl);
			return this.tmpl;
		},
		insertBefore: function(el, ex, cb) {
			var fn = this.tmpl.fn;
			fn.getEl(el)
				.insertBefore(this.fragment, ex);
			fn.cb(cb, this.tmpl);
			return this.tmpl;
		}
	};

	/*
	 *	Tmpl实例
	 * */
	/*实例构造*/
	function Tmpl(opts) {
		this.config = this.fn.extend(this.fn.copy(config), opts);
		this.init();
	}

	//安装插件
	Tmpl.install = function(constructor) {
		constructor.install(this);
	}

	Tmpl.prototype = {
		constructor: Tmpl,
		/*初始化*/
		init: function() {
			var _this = this;
			//构建开始的钩子
			this.fn.run(this.config.created, this);
			//初始配置信息
			this.el = (function(){
				if(inBrowser) {
					return _this.fn.getEl(_this.config.el)
				} else {
					return _this.config.el;
				}
			})();
			
			//初始化方法
			setInstance.call(this, 'methods');
			//初始化数据
			setInstance.call(this, 'data');
			//初始化路由
			setRouter.call(this);
			//查找模板
			if(this.el) {
				
				this.template = (function() {
					if(inBrowser) {
						_this.config.template = _this.el.innerHTML;
						return _this.el.innerHTML;
					} else {
						_this.config.template = _this.el;
						return _this.el;
					}
				})();
				
				setRegExp.call(this);
				//转化为js执行
				setDom.call(this);
			}
			//初始化事件
			setEvent.call(this);
			//所有完毕后的钩子
			this.fn.run(this.config.mounted, this);
			//设置事件
			this.fn.run(this.config.events, this);
		},
		/*绑定临时数据*/
		data: function(data) {
			var _this = this;
			return new Data({
				tmpl: _this,
				data: data
			});
		},
		update: function() {
			this.template = this.config.template;
			setDom.call(this);
		},
		//添加事件
		on: function(elContext, exp, type, fn) {
			if(arguments.length === 4) {
				if(this.eventType.indexOf(type) == -1) setEntrust.apply(this, [elContext, type, fn]);
				//查找现在的节点是否存在事件
				if(!this.events[type]) this.events[type] = {};
				//当前的事件是否有设置
				if(!this.events[type][exp]) this.events[type][exp] = [];
				this.events[type][exp].push(fn);
				return this;
			} else if(arguments.length === 3) {
				var _this = this;
				fn = type;
				type = exp;
				this.fn.on(elContext, type, function(event) {
					fn.call(_this, event);
				});
				return this;
			}
		},
		router: function(options) {
			this.router[options.path] = options.content;
		},
		//移除事件
		off: function(elContext, exp, type, fn) {
			if(arguments.length === 4) {
				var eventIndex = this.events[type][exp].indexOf(fn);
				if(eventIndex != -1) this.events[type][exp].splice(eventIndex, 1);
			} else if(arguments.length === 3) {
				/*删除事件*/
				this.fn.off(elContext, type, fn);
			}
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
			bindFn.apply(this, [el, className, 'addClass']);
			return this;
		},
		//删除class
		removeClass: function(el, className) {
			bindFn.apply(this, [el, className, 'removeClass']);
			return this;
		},
		//替换className
		replaceClass: function(el, className) {
			bindFn.apply(this, [el, className, 'replaceClass']);
			return this;
		},
		//是否存在class
		hasClass: function(el, className) {
			try {
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
			} catch(e) {
				return false;
			}
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
					return new Function('return ' + el.getAttribute(attr) + ';')
						.apply(this);
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
				if(/^bind-\S*/.test(prop)) return new Function('return ' + el[prop] + ';')
					.apply(this);
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
			var els = [];
			this.fn.each(el.childNodes, function(child) {
				if(child.nodeType === 1) {
					els.push(child);
				}
			});
			return els;
		},
		//查找对应的class存在的节点
		childrens: function(el, className, hasClassChild) {
			var i = 0;
			hasClassChild = (hasClassChild ? hasClassChild : []);
			for(; i < el.children.length; i++) {
				if(this.hasClass(el.children[i], className)) hasClassChild.push(el.children[i]);
				this.childrens(el.children[i], className, hasClassChild);
			}
			return hasClassChild;
		},
		hasId: function(id) {
			return !!this.fn.getEl(id);
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
		},
		show: function(el, time) {
			el.style.display = '';
			this.animate(el, 'show', time);
			return this;
		},
		hide: function(el, time) {
			el.style.display = 'none';
			this.animate(el, 'hide', time);
			return this;
		},
		toggle: function(el) {
			if(el.style.display === '') this.hide(el);
			else this.show(el);
		},
		animate: function(el, type, time) {
			var num = 0.1;
			if(type === 'show') {
				opacity = 0;
			} else if(type === 'hide') {
				opacity = 1;
				num = -0.1;
			}
			if(this.fn.isNum(time)) {
				el.style.opacity = 0;
				var time = setInterval(function() {
					if(el.style.opacity == 1) {
						clearInterval(time);
					} else {
						el.style.opacity = parseFloat(el.style.opacity) + num;
					}
				}, time / 60);
			}
		},
		remove: function(el) {
			try {
				el.remove();
			} catch(e) {
				var parent = this.parent(el);
				parent !== null ? parent.removeChild(el) : (console.warn('element remove error!'));
			}
			return this;
		},
		create: function(dom) {
			var fragment = dom;
			if(inBrowser){				
				fragment = document.createDocumentFragment();
				var tempEl = document.createElement('div');
				tempEl.innerHTML = dom;
				while(tempEl.childNodes.length !== 0) {
					var child = tempEl.childNodes[0];
					var childHtml = child.innerHTML;
					if(child.tagName === 'SCRIPT') {
						var newScript = document.createElement('script');
						newScript.innerHTML = childHtml;
						this.fn.each(child.attributes, function(attr) {
							if(!attr) true;
							newScript.setAttribute(attr.name, attr.value);
						});
						this.remove(child);
						child = newScript;
					}
					fragment.appendChild(child);
				}
			}
			
			return fragment;
		},
		append: function(el, child) {
			if(el.nodeType === 1) el.appendChild(child);
			else this.fn.getEl(el)
				.appendChild(child);
			return this;
		},
		cb: function(fn) {
			this.fn.cb(fn, this);
			return this;
		},
		//取消冒泡
		preventDefault: function(event) {
			var ev = event || window.event;
			ev.stopPropagation();
			ev.cancelBubble = true;
		}
	};

	/*允许错误*/
	function tryRun(resolve, reject) {
		try {
			return resolve.call(this);
		} catch(e) {
			return reject.call(this);
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
	function setEntrust(elContext, type, fn) {
		var _this = this;
		this.fn.on(elContext, type, function(event) {
			var ev = event || window.event;
			var el = ev.target || ev.srcElement;
			var eventType = _this.events[type];
			_this.fn.each(eventType, function(_eventType, bind) {
				if(!_this.hasClass(el, bind)) return;
				_this.fn.each(_eventType, function(fn, index) {
					fn.apply(_this, [ev, el]);
				});
			});
		});

		//添加委托事件
		this.eventType.push(type);
	}

	//把路由实例挂靠到模板中
	function setRouter() {
		if(this.fn.isObj(this.config.router)) this.router = this.config.router;
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
		var _this = this;
		var get = this.config[type];

		if(!this.fn.isObj(get)) {
			return;
		}

		this.fn.each(get, function(_get, key) {
			_this[key] = _get;
		});
	}

	//处理正则数据
	function initRegExp(expr) {
		var tm = '\\/*.?+$^[](){}|\'\"';
		this.fn.each(tm, function(tmItem, index) {
			expr = expr.replace(new RegExp('\\' + tmItem, 'g'), '\\' + tmItem);
		});
		return expr;
	}

	//设置正则
	function setRegExp() {
		var open_tag = initRegExp.call(this, this.config.open_tag);
		var close_tag = initRegExp.call(this, this.config.close_tag);
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
		//引入模板
		INCLUDE = /<tmpl name=(\'|\")(\S*?)\1.*?>[\s\S]*?<\/tmpl>/g;
		//空模板
		INCLUDE_NULL = /<tmpl\s*?>[\s\S]*?<\/tmpl>/g;
	}

	//初始化dom生成
	function setDom() {
		//先设置获取include的引入模板
		replaceInclude.call(this);
		var script = this.template.match(SCRIPT_REGEXP);
		var echoScript = this.template.match(ECHO_SCRIPT_REGEXP);
		var replaceScript = setSeize.call(this);
		var echoString = replaceScript.split(/___SCRIPT___|___ECHO_SCRIPT___/);
		var domString = [];

		if(!script) script = [];
		if(!echoScript) echoScript = [];

		var longString = echoString.length > script.length ? echoString : script;

		this.fn.each(echoString, function(_echoString, index) {
			echoString[index] = "___.push(\"" + filterTransferredMeaning(_echoString) + "\");";
		});

		this.fn.each(script, function(_string, index) {
			/*恢复正则的索引位置*/
			ECHO_SCRIPT_REGEXP.lastIndex = 0;
			if(ECHO_SCRIPT_REGEXP.test(_string)) {
				script[index] = _string.replace(REPLACE_ECHO_SCRIPT_OPEN_TAG, "___.push(")
					.replace(CLOSE_TAG_REGEXP, ");");
			} else {
				script[index] = _string.replace(OPEN_TAG_REGEXP, '')
					.replace(CLOSE_TAG_REGEXP, '');
			}
		});

		this.fn.each(longString, function(_longString, index) {
			if(typeof echoString[index] === 'string') domString.push(echoString[index]);
			if(typeof script[index] === 'string') domString.push(script[index].replace(FILTER_TRANFORM, ""));
		});

		this.dom = 'var _this = this,___ = [];' + domString.join('') + 'return ___.join("");';
	};

	/*替换include引入的模板*/
	function replaceInclude() {
		var _this = this;
		var includeTmpl, includeId;

		//清空空的引入模块
		this.template = this.template.replace(INCLUDE_NULL, '');

		//去重
		includeTmpl = this.fn.unique(this.template.match(INCLUDE));
		includeId = includeTmpl.toString()
			.replace(INCLUDE, "$2")
			.split(',');

		//找不到include//查找的id和include匹配的数量必须相同
		if(includeTmpl.length === 0 || this.fn.clearNull(includeId)
			.length === 0 ||
			!(includeTmpl.length > 0 && includeId.length > 0 && includeId.length === includeTmpl.length)) return;

		this.fn.each(includeId, function(id, index) {
			var el = _this.fn.getEl(id);
			var replaceInclude = new RegExp(initRegExp.call(_this, includeTmpl[index]), 'g');
			if(el) _this.template = _this.template.replace(replaceInclude, _this.html(el));
			else _this.template = _this.template.replace(replaceInclude, '');
		});

		includeTmpl = this.fn.unique(this.template.match(INCLUDE));
		if(includeTmpl.length > 0) replaceInclude.call(this);
	}

	//设置占位
	function setSeize() {
		var replaceScript = this.template.replace(ECHO_SCRIPT_REGEXP, '___ECHO_SCRIPT___')
			.replace(SCRIPT_REGEXP, '___SCRIPT___');
		return replaceScript;
	}

	//过滤string中的引号
	function filterTransferredMeaning(string) {
		return string.replace(FILTER_TRANFORM, "")
			.replace(QUEST, '\\\"');
	}

	Tmpl.version = "v1.0.2";

	return Tmpl;
});