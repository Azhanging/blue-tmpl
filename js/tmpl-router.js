/*!
 * 
 * 			tmpl-router.js v1.0.2
 * 			(c) 2016-2017 Blue
 * 			Released under the MIT License.
 * 			https://github.com/azhanging/tmpl-router
 * 			time:Mon Sep 11 2017 09:43:21 GMT+0800 (中国标准时间)
 * 		
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("TmplRourt", [], factory);
	else if(typeof exports === 'object')
		exports["TmplRourt"] = factory();
	else
		root["TmplRourt"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //初始化

//hashChange

//动态加载模板


var _init2 = __webpack_require__(5);

var _init3 = _interopRequireDefault(_init2);

var _hashChange2 = __webpack_require__(4);

var _hashChange3 = _interopRequireDefault(_hashChange2);

var _getTmpl2 = __webpack_require__(3);

var _getTmpl3 = _interopRequireDefault(_getTmpl2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * 路由构造
 * 
 * */
var TmplRouter = function () {
	function TmplRouter(opts) {
		_classCallCheck(this, TmplRouter);

		//如果已经实例化了一次，直接返回实例化的路由
		if (this.constructor.hasTmplRouter) {
			return this.constructor.tmplRouter;
		};
		this.init(opts);
	}

	//安装插件


	_createClass(TmplRouter, [{
		key: 'init',
		value: function init(opts) {
			_init3.default.call(this, opts);
		}

		/*设置路由路径*/

	}, {
		key: 'set',
		value: function set(routerOpts) {
			var _this = this;

			var fn = this.constructor.fn;
			if (fn.isObj(routerOpts)) {
				fn.each(routerOpts, function (opt, key) {
					_this.router[key] = opt;
				});
			}
			//设置路由配置
			setPaths.call(this, routerOpts);
			return this;
		}

		//hash改变调用

	}, {
		key: 'hashChange',
		value: function hashChange() {
			_hashChange3.default.call(this);
		}
	}, {
		key: 'go',
		value: function go(page) {
			var fn = this.constructor.fn;
			if (fn.isNum(page)) history.go(page);
		}
	}, {
		key: 'redirect',
		value: function redirect(hash) {
			hash = hash.replace('#', '');
			var href = location.href.split('#');
			if (hash === '/') {
				location.href = href[0];
			} else {
				href[1] = hash;
				location.href = href.join('#');
			}
		}

		/*获取模板*/

	}, {
		key: 'getTmpl',
		value: function getTmpl(hash) {
			_getTmpl3.default.call(this, hash);
		}

		/*返回参数对象*/

	}, {
		key: 'query',
		value: function query(searchs) {
			var fn = this.constructor.fn;
			if (!fn.isStr(searchs)) return {};
			var query = {},
			    search = searchs.split('&');
			fn.each(search, function (_search, index) {
				var temp = _search.split('=');
				if (temp.length !== 1) {
					var key = temp[0];
					var value = temp[1];
					query[key] = value;
				}
			});
			return query;
		}

		/*获取|设置hash-url参数*/

	}, {
		key: 'search',
		value: function search(el, _search2) {

			var fn = this.constructor.fn,
			    tmpl = this.constructor.tmpl;

			var path = '';

			try {
				path = tmpl.attr(el, 'href').split('?');
			} catch (e) {
				path = el.split('?');
			}

			if (_search2) {
				if (fn.isObj(_search2)) {
					_search2 = fn.serialize(_search2);
				}
				path[1] = _search2;
				tmpl.attr(el, {
					href: path.join('?')
				});
			} else {
				return path[1];
			}
		}

		/*分离hash和hash-search，只取hash*/

	}, {
		key: 'getHash',
		value: function getHash(hash) {
			if (hash === undefined) {
				hash = window.location.hash.replace('#', '');
			}
			var path = hash.replace('#', '').split('?');
			return path[0];
		}

		/* 修改路由link的点击的状态 */

	}, {
		key: 'changeRoutereStatus',
		value: function changeRoutereStatus(status) {
			this.routerStatus = status;
		}
	}], [{
		key: 'install',
		value: function install(Tmpl) {

			//检查是否安装过路由了
			if (this.installed) {
				return this;
			}

			this.installed = true;

			this.tmpl = new Tmpl({});

			this.fn = this.tmpl.fn;
		}
	}]);

	return TmplRouter;
}();

//查看是否在全局中存在插件


if (window.Tmpl && typeof Tmpl === 'function') {
	TmplRouter.install(Tmpl);
}

exports.default = TmplRouter;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tmplRouter = __webpack_require__(0);

var _tmplRouter2 = _interopRequireDefault(_tmplRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (global, factory) {
	if (typeof demand === 'function') {
		demand.define('tmpl-router', factory);
	}
})(typeof window !== 'undefined' ? window : undefined, function () {

	_tmplRouter2.default.version = "v1.0.3";

	return _tmplRouter2.default;
}); //Tmpl 文件入口

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/*默认配置*/
var config = {
	routerLink: 'tmpl-router', //.tmpl-router                       
	routerLinkActive: 'tmpl-router-active', //.tmpl-router-active
	routerView: 'tmpl-router-view', //#tmpl-router-view
	routerAnchor: 'tmpl-router-anchor', //锚点用的class
	routerAnchorAttr: 'tmpl-anchor', //路由锚点的id属性
	routerAnchorTop: 'tmpl-anchor-top', //路由锚点的差点
	anchorTime: 1000, //默认锚点路由 1000/17
	data: {},
	methods: {}
};

exports.default = config;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = getTmpl;
/*
 *	动态加载模板 
 * */

function getTmpl(hash) {

	var fn = this.constructor.fn;

	var tmpl = this.constructor.tmpl;

	var _this = this;

	//查看当前的路由 模板是否加载回来了
	if (!this.router[hash] || this.router[hash]['view'].length > 0 || this.router[hash]['temp'].childNodes.length > 0) return;

	var tmplUrl = this.router[hash]['tmplUrl']; //获取请求的url

	var tmplId = this.router[hash]['tmplId']; //获取静态模板的id

	/*动态模板*/
	if (tmplUrl) {
		try {
			$.ajax({
				async: false,
				url: tmplUrl,
				success: function success(data) {
					_this.router[hash]['temp'].appendChild(tmpl.create(data.tmpl));
					filterTextNode.call(_this, _this.router[hash]['temp']);
					_this.changeRoutereStatus(false);
				},
				error: function error(data) {
					_this.changeRoutereStatus(true);
				}
			});
		} catch (e) {
			fn.ajax({
				async: false,
				url: tmplUrl,
				success: function success(data) {
					_this.router[hash]['temp'].appendChild(tmpl.create(data.tmpl));
					filterTextNode.call(_this, _this.router[hash]['temp']);
					_this.changeRoutereStatus(false);
				},
				error: function error(data) {
					_this.changeRoutereStatus(true);
				}
			});
		}
	} else if (tmplId) {
		try {
			this.router[hash]['temp'].appendChild(tmpl.create(tmpl.html(fn.getEl(tmplId)))); //非动态模板	
		} catch (e) {
			this.router[hash]['temp'].appendChild(tmpl.create(''));
		}
		this.changeRoutereStatus(true);
	}
}

/*清空空的文本节点*/
function filterTextNode(parentEl) {

	var fn = this.constructor.fn;

	var tmpl = this.constructor.tmpl;

	fn.each(parentEl.childNodes, function (el, index) {
		if (el && el.nodeType === 3 && el.textContent.trim() === '') {
			tmpl.remove(el);
		}
	});
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = protoHashChange;
/*
 *	路由中的hash方法处理
 * */
function protoHashChange() {

	var fn = this.constructor.fn;

	var path = window.location.hash.replace('#', '');

	var hash = this.getHash(path); //获取hash

	var routerBtns = fn.getEls(this.config.routerLink); //获取路由绑定的节点

	var hasAlias = false; //是否有别名

	if (hash === '') hash = '/'; //如果不存在hash设置为根目录

	//走别名路由
	if (this.alias[hash]) {
		hasAlias = true;
		hash = getPathAlias.apply(this, [hash === '/' ? hash : path, null]); //判断是不是别名的路由	
	}

	if (routerBtns.length === 0) return this; //存在路由绑定

	if (!this.alias[hash] && !this.router[hash]) {
		//error页面
		fn.run(this.config.error, this);
		return;
	}

	/*路由进入的钩子*/
	fn.run(this.config.routerEnter, this, [path]);

	/*如果是存在别名路径，返回代理的那个路径*/
	hashChange.apply(this, [routerBtns, hasAlias ? hash : path]);
}

/*hashChange的处理*/
function hashChange(routerBtns, path) {
	var _this = this;

	var fn = this.constructor.fn;

	var tmpl = this.constructor.tmpl;

	var alinkEl = null;

	var hash = this.getHash(path);

	this.getTmpl(hash); //默认动态加载模块

	//是否存在最后一个路由地址
	if (this.lastRouter) {
		/*如果不是匹配的路由视图，则不显示在路由视图中*/
		hideTmplEl.call(this, this.lastRouter);
	}

	this.lastRouter = hash; //记录最后的路由路径

	showTmplEl.apply(this, [hash]); //显示路由的view

	setRouterStatus.call(this, hash); //设置路由的链接状态

	//修改对应的状态
	fn.each(routerBtns, function (el, index) {
		var path = tmpl.attr(el, 'href'),
		    href = _this.getHash(path);

		if (href === hash) {
			_this.currentRouter = href; //保存当前的路由

			alinkEl = el; //保存按钮节点

			tmpl.addClass(el, _this.config.routerLinkActive); //修改路由link的样式

			/*是否使用了保存之前的状态*/
			if (_this.config.keepLive && _this.router[href]['keepLive']) {
				setScrollTop.call(_this, _this.router[href]['scrollTop']);
			} else {
				setScrollTop.call(_this, 0);
			}
		} else {
			/*存在配置路由*/
			if (_this.router[href]) {
				hideTmplEl.call(_this, href); //如果不是匹配的路由视图，则不显示在路由视图中
			}
			tmpl.removeClass(el, _this.config.routerLinkActive);
		}

		/*如果设置的节点没有绑定到对应的节点上*/
		if (!alinkEl) {
			_this.currentRouter = hash;
		}
	});
	//调用钩子
	fn.run(this.config.routerEntered, this, [path, alinkEl]);
}

/*检查当前路径是否存在别名*/
function getPathAlias(path, el) {

	var fn = this.constructor.fn,
	    hash = this.getHash(path),
	    alias = this.alias[hash];

	//别名触发钩子
	if (this.router[hash]) {
		fn.run(this.config.routerEnter, this, [path, el]);
		fn.run(this.config.routerEntered, this, [path, el]);
	}

	//如果别名存在别名，递归使用
	if (this.alias[alias]) {
		return getPathAlias.apply(this, [alias, el]);
	} else {
		return alias;
	}
}

/*保存节点信息*/
function hideTmplEl(hash) {
	var _this2 = this;

	var fn = this.constructor.fn;
	/*如果不是匹配的路由视图，则不显示在路由视图中*/
	fn.each(this.router[hash]['view'], function (el, index) {
		_this2.router[hash]['temp'].appendChild(el);
	});
	this.router[hash]['view'] = [];
}

/*显示节点信息*/
function showTmplEl(hash) {
	var _this3 = this;

	var fn = this.constructor.fn,
	    tmpl = this.constructor.tmpl,
	    view = this.routerView;

	view.appendChild(this.router[hash]['temp']); //更新view层

	fn.each(tmpl.children(view), function (el, index) {
		//保存view层节点
		_this3.router[hash]['view'].push(el);
	});
}

/* 设置路由的状态，针对没有方法加载的路由模板中存在方法的 */
function setRouterStatus(hash) {
	/*修改路由状态*/
	if (this.router[hash]['routerStatus'] == true) {
		this.changeRoutereStatus(true);
	}
}

/*设置scrollTop*/
function setScrollTop(num) {
	var fn = this.constructor.fn;
	if (!fn.isNum(num)) return 0;
	try {
		document.body.scrollTop = parseFloat(num);
	} catch (e) {
		document.documentElement.scrollTop = parseFloat(num);
	}
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = init;

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _set = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//路由初始
//配置参数
function init(opts) {

	var fn = this.constructor.fn;

	this.router = {};

	//把第一次的实例对象挂在到构造上
	this.constructor.tmplRouter = this;

	//只有一次路由实例，挂载到tmpl上
	this.constructor.tmpl.constructor.router = this;

	this.config = fn.extend(fn.copy(_config2.default), opts);

	this.routerView = fn.getEl(this.config.routerView);

	_set.setRouter.call(this, this.config.router ? this.config.router : {});

	_set.setInstance.call(this, 'methods'); //设置methods

	_set.setInstance.call(this, 'data'); //设置data

	_set.setRouterLinkStatus.call(this); //设置路由链接的状态

	_set.setRouterAnchor.call(this, this.config.anchorTime); //设置路由的锚点形式

	_set.setkeepLive.call(this); //设置保持状态

	_set.setPaths.call(this, this.router); //处理路由详情 

	_set.setHashEvent.call(this); //设置hash

	fn.run(this.config.created, this); //所有创建后的钩子

	this.hashChange(); //初始化好了初始化hash

	fn.run(this.config.mounted, this); //所有完毕后的钩子
}
//设置的handler
;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setRouter = setRouter;
exports.setInstance = setInstance;
exports.setRouterLinkStatus = setRouterLinkStatus;
exports.setRouterAnchor = setRouterAnchor;
exports.setkeepLive = setkeepLive;
exports.setPaths = setPaths;
exports.setHashEvent = setHashEvent;
//设置路由的路径
function setRouter(routers, path) {
	var _this = this;

	var fn = this.constructor.fn,
	    _path = path ? path : '';

	fn.each(routers, function (router, key) {
		if (fn.isObj(router.modules)) {
			setRouter.apply(_this, [router.modules, _path + key]);
		}
		_this.router[_path + key] = router;
		delete router['modules'];
	});
}

//设置data和methods方法
function setInstance(type) {
	var _this2 = this;

	var fn = this.constructor.fn,
	    get = this.config[type];

	if (!fn.isObj(get)) {
		return;
	}

	fn.each(get, function (_get, key) {
		_this2[key] = _get;
	});
}

/*设置路由的状态是够允许跳转*/
function setRouterLinkStatus() {
	var _this3 = this;

	var fn = this.constructor.fn;

	var tmpl = this.constructor.tmpl;

	this.changeRoutereStatus(true);

	var routerBtns = fn.getEls(this.config.routerLink); //获取路由绑定的节点

	fn.each(routerBtns, function (routerBtn, index) {
		fn.on(routerBtn, 'click', function (event) {
			var path = tmpl.attr(routerBtn, 'href'),
			    hash = _this3.getHash(path);
			if (!(_this3.lastRouter === hash)) {
				//点击路由链接触发的钩子
				fn.run(_this3.config.triggerRouter, _this3, [path, routerBtn]);
			}
			if (!_this3.routerStatus) {
				event.preventDefault();
			}
		});
	});
}

/*设置路由的锚点形式*/
function setRouterAnchor(time) {
	var _this4 = this;

	var fn = this.constructor.fn,
	    tmpl = this.constructor.tmpl;

	function stopScroll(event) {
		event.preventDefault();
	}

	//获取路由绑定的节点
	tmpl.on(document, this.config.routerAnchor, 'click', function (event, el) {

		var anchorId = tmpl.attr(el, _this4.config.routerAnchorAttr),
		    anchorEl = fn.getEl(anchorId);

		var anchorOffsetTop = tmpl.attr(el, _this4.config.routerAnchorTop);

		anchorOffsetTop = fn.isNum(anchorOffsetTop) ? Number(anchorOffsetTop) : 0;

		if (fn.isEl(anchorEl)) {
			//定义滑动阻止默认动作
			window.addEventListener('mousewheel', stopScroll);

			tmpl.animate(document, {
				'scrollTop': tmpl.offset(anchorEl).top + anchorOffsetTop
			}, time, function () {
				window.removeEventListener('mousewheel', stopScroll);
			});
		}
	});
}

/*设置保持状态*/
function setkeepLive() {
	var _this5 = this;

	var fn = this.constructor.fn;
	if (!this.config.keepLive) return;
	fn.on(window, 'scroll', function (event) {
		if (_this5.router[_this5.currentRouter] && _this5.router[_this5.currentRouter]['keepLive']) {
			_this5.router[_this5.currentRouter]['scrollTop'] = document.body.scrollTop || document.documentElement.scrollTop;
		}
	});
}

//初始处理路由信息
function setPaths(routes) {
	var _this6 = this;

	var fn = this.constructor.fn;

	this.alias = {};

	fn.each(routes, function (router, path) {

		var alias = router.alias;

		_this6.router[path]['view'] = []; //设置视图节点

		//如果设置了全局的keepLive，就会默认设置保持节点为true,全局设定状态的时候是支持保持状态的
		if (_this6.config.keepLive && _this6.router[path]['keepLive'] === undefined) {
			_this6.router[path]['keepLive'] = true;
		}

		_this6.router[path]['temp'] = document.createDocumentFragment(); //设置临时存放节点

		//存在别名
		if (alias) {
			_this6.alias[alias] = path;
		}
	});
}

//设置hash
function setHashEvent() {
	var _this7 = this;

	var tmpl = this.constructor.tmpl;

	if (!this.constructor.hasTmplRouter) {
		//修改hash时触发修改
		window.onhashchange = function (event) {
			_this7.hashChange();
			tmpl.preventDefault(event);
		};
		this.constructor.hasTmplRouter = true;
	}
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=tmpl-router.js.map