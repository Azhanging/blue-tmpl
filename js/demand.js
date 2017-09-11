/*!
 * 
 * 			demand.js v1.0.0
 * 			(c) 2016-2017 Blue
 * 			Released under the MIT License.
 * 			https://github.com/azhanging/demand
 * 			time:Mon Sep 11 2017 11:51:04 GMT+0800 (中国标准时间)
 * 		
 */
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//常用方法
var Fn = function () {
	function Fn() {
		_classCallCheck(this, Fn);
	}

	_createClass(Fn, [{
		key: 'isArr',
		value: function isArr(array) {
			return array instanceof Array;
		}
	}, {
		key: 'isObj',
		value: function isObj(obj) {
			return obj instanceof Object && !(obj instanceof Array) && obj !== null;
		}
	}, {
		key: 'isFn',
		value: function isFn(fn) {
			return typeof fn === 'function';
		}
	}, {
		key: 'isStr',
		value: function isStr(string) {
			return typeof string === 'string';
		}
	}, {
		key: 'isNum',
		value: function isNum(num) {
			return typeof num === 'number' || !isNaN(num);
		}
	}, {
		key: 'each',
		value: function each(obj, cb) {
			//遍历
			var i = 0,
			    len = obj.length;
			if (this.isArr(obj)) {
				for (; i < len; i++) {
					cb(obj[i], i);
				}
			} else {
				for (i in obj) {
					if (obj.hasOwnProperty(i)) cb(obj[i], i);
				}
			}
		}
	}, {
		key: 'cb',
		value: function cb(_cb, context, args) {
			//回调
			args = args ? args : [];
			this.isFn(_cb) ? _cb.apply(context, args) : null;
		}
		//处理正则数据

	}, {
		key: 'initRegExp',
		value: function initRegExp(expr) {
			var tm = '\\/*.?+$^[](){}|\'\"';
			this.each(tm, function (tmItem, index) {
				expr = expr.replace(new RegExp('\\' + tmItem, 'g'), '\\' + tmItem);
			});
			return expr;
		}
	}, {
		key: 'extend',
		value: function extend(obj, options) {
			//合并
			this.each(options, function (option, key) {
				obj[key] = option;
			});
			return obj;
		}
	}]);

	return Fn;
}();

exports.default = new Fn();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = error;
/*
 *	错误处理 
 * */

function error(errCode, msg) {
	switch (errCode) {
		case 0:
			console.warn('只允许实例化一次！');
			break;
		case 1:
			console.error(msg + '加载模块出错！');
			break;
		case 2:
			console.error('模块使用有误，不能当前模块依赖于自身！');
			break;
		case 3:
			console.error('非paths和dep中加载的模块（即直接加载script的模块需要添加id来识别模块）');
			break;
		default:
			console.error('模块运行有误：' + msg);
	}
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.hasModule = hasModule;
exports.findModule = findModule;
exports.removeModule = removeModule;
exports.setModule = setModule;
exports.isScriptModule = isScriptModule;
exports.setScriptLoadedModule = setScriptLoadedModule;

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

var _init = __webpack_require__(5);

var _path = __webpack_require__(3);

var _script = __webpack_require__(7);

var _config = __webpack_require__(4);

var _error = __webpack_require__(1);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//has module in demand
function hasModule(m) {
	var path = _path.resolvePath.call(this, m),
	    module = this.module;
	if (module.pathModule[m] || module.idModule[m] || module.urlModule[path]) return true;
	return false;
}

//find module in demand.module[path|url|id]  权重：path > url > id

//初始化
function findModule(m) {
	var module = this.module,
	    path = _path.resolvePath.call(this, m);
	if (module.pathModule[m]) return module.pathModule[m];
	if (module.urlModule[path]) return module.urlModule[path];
	if (module.idModule[m]) return module.idModule[m];
	return false;
}

//del error module
function removeModule(opts) {
	delete this.module.urlModule[opts.url];
	delete this.module.pathModule[opts.name];
	resetLastLoadedModule.call(this);
}

//set module config
function setModule(opts) {

	var lastLoader = this.module.lastLoadedModule;

	var dep = lastLoader.dep;

	//把最后加载的模块内容加载进去
	_fn2.default.each(lastLoader, function (module, type) {
		opts.findM[type] = module;
	});

	//扶弱当前的模块中存在id的名，设置id的模块
	if (lastLoader.id) {
		this.module.idModule[lastLoader.id] = opts.findM;
	}

	//查看依赖，设置一下依赖
	if (dep.length > 0) {
		var loadModules = _init.setPaths.call(this, dep);
		_script.runCreateScript.call(this, loadModules);
	}

	//设置初始化的状态
	opts.findM.isDemand = false;

	//运行模块内容，返回接口
	this.module.depManage.push(opts.findM);

	//重设最后的模块
	resetLastLoadedModule.call(this);
}

/*
 * 重设最后的模块,在http模块中会存在不同规格的内容，需要设置一个空的规格
 * */
function resetLastLoadedModule() {
	this.module.lastLoadedModule = _config.resetLastModule;
}

//是否为script直接加载的模块
function isScriptModule(module) {
	if (module !== _config.resetLastModule) return true;
	return false;
}

//设置script直接加载的模块
function setScriptLoadedModule(module) {

	if (module.id === null) {
		(0, _error2.default)(3);
		return;
	}

	setModule.call(this, {
		url: null,
		name: null,
		findM: module
	});
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.resolvePath = resolvePath;
exports.resolveJsExt = resolveJsExt;
exports.isHttpModule = isHttpModule;

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HTTP = /^http(s)?:\/\//;

//路径处理
function resolvePath(path) {
	//如果是http的链接，直接返回直接的http链接
	if (isHttpModule(path)) {
		return path;
	}

	//处理完alias的路径
	var resolveAliasPath = resolveAlias.call(this, path);

	var resPath = [this.baseUrl],
	    splitResPath = resolveAliasPath.split('/');

	_fn2.default.each(splitResPath, function (p, index) {
		switch (p) {
			case '':
				if (index === 0) resPath[index] = '';
				break;
			case '.':
				break;
			case '..':
				resPath.pop();
				break;
			default:
				resPath.push(p);
		}
	});

	return resPath.join('/').replace(/\/{2,}/g, '\/');;
}

//处理是否存在js后缀
function resolveJsExt(url) {
	if (/\.js/g.test(url)) return url;else return url + '.js';
}

//判断是否为http(s)的模块
function isHttpModule(url) {
	return HTTP.test(url);
}

var ALIAS = /@(.*?)/g;

//处理alias的数据
function resolveAlias(path) {
	ALIAS.lastIndex = 0;
	//如果不存在别名，直接返回路径
	if (!ALIAS.test(path)) {
		return path;
	}

	//存在别名，把别名替换掉
	_fn2.default.each(this.alias, function (_alias, key) {
		ALIAS.lastIndex = 0;
		if (!ALIAS.test(path)) return path;
		path = path.replace(new RegExp(_fn2.default.initRegExp(key), 'g'), _alias);
	});

	return path;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/*默认配置参数*/
var config = exports.config = {
	alias: {},
	shim: {},
	paths: {}

	/*设置默认reset的lastModule*/
};var resetLastModule = exports.resetLastModule = {
	_export_: function _export_() {
		return function () {};
	},

	dep: [],
	id: null
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setPaths = setPaths;
exports.setAlias = setAlias;

var _path = __webpack_require__(3);

var _module = __webpack_require__(2);

var _script = __webpack_require__(7);

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//设置模块路径
function setPaths(paths) {
	var _this = this;

	var loadModules = [];

	_fn2.default.each(paths, function (path, name) {

		var demand = _this,
		    resPath = _path.resolvePath.call(_this, path),
		    //处理完的路径
		urlModules = _this.module.urlModule,
		    //通过url处理的模块
		pathModules = _this.module.pathModule,
		    //通过config中path的模块
		pathConfig = {
			url: resPath,
			name: name
		};

		//检查是否存在对应的模块，存在跳过
		if (_module.hasModule.call(_this, path)) {
			var hasCreateScript = _script.isCreateScript.call(_this, path);
			//当前的模块是否被加载script
			if (hasCreateScript) {
				hasCreateScript.call(_this);
			}
			return;
		}

		urlModules[resPath] = {
			createScript: function createScript() {
				_script.createScript.call(demand, pathConfig);
			}
		};

		//如果是从paths中配置的路径
		if (_fn2.default.isStr(name)) {
			pathModules[name] = urlModules[resPath];
		}

		loadModules.push(pathConfig);
	});

	//返回处理完的模块路径
	return loadModules;
}

//设置别名路径
function setAlias(alias) {
	var aliasPath = {};
	_fn2.default.each(alias, function (path, key) {
		aliasPath['@' + key] = path;
	});
	return aliasPath;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    队列 
 * */

var Queue = function () {
    function Queue(opts) {
        _classCallCheck(this, Queue);

        this.queue = [];
    }

    _createClass(Queue, [{
        key: "push",
        value: function push(fn) {
            this.queue.push(fn);
        }
    }, {
        key: "next",
        value: function next() {
            if (this.hasVal()) {
                this.queue.shift();
            }

            if (this.queue.length === 0) this.cb();
        }
    }, {
        key: "hasVal",
        value: function hasVal() {
            return this.queue.length != 0;
        }
    }]);

    return Queue;
}();

//创建队列


exports.default = Queue;
var queue = exports.queue = new Queue();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createScript = createScript;
exports.isCreateScript = isCreateScript;
exports.runCreateScript = runCreateScript;

var _module = __webpack_require__(2);

var _path = __webpack_require__(3);

var _queue = __webpack_require__(6);

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

var _error = __webpack_require__(1);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//创建script节点
function createScript(opts) {
	var _this = this;

	var script = document.createElement('script');
	//获取模块
	opts.findM = _module.findModule.call(this, opts.url);
	//异步加载    
	script.async = true;

	delete opts.findM.createScript;

	script.onload = function () {
		_module.setModule.call(_this, opts);
		_queue.queue.next();
	};

	script.onerror = function () {
		_module.removeModule.call(_this, opts);
		(0, _error2.default)(1, opts.url);
		try {
			script.remove();
		} catch (e) {
			script.parentNode.removeChild(script);
		}
		_queue.queue.next();
	};

	script.type = "text/javascript";

	//先判断是否为http模块，否则就是baseUrl中的模块
	script.src = (0, _path.isHttpModule)(opts.url) ? opts.url : (0, _path.resolveJsExt)(opts.url);

	//添加依赖队列数据
	_queue.queue.push(false);

	document.getElementsByTagName('head')[0].appendChild(script);
}

//检测单前模块script是否加载了
function isCreateScript(path) {
	var findM = _module.findModule.call(this, path);
	if (_fn2.default.isFn(findM.createScript)) {
		return findM.createScript;
	} else {
		return false;
	}
}

//运行插入模块
function runCreateScript(loadModules) {
	var _this2 = this;

	_fn2.default.each(loadModules, function (path, index) {
		createScript.call(_this2, path);
	});
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//兼容性IE8
(function () {

    //兼容IE8中 的indexOf
    if (!_fn2.default.isFn(Array.prototype.indexOf)) {
        Array.prototype.indexOf = function (val) {
            var index = 0,
                len = this.length;
            for (; index < len; index++) {
                if (this[index] === val) return index;
            }
            return -1;
        };
    }

    //map
    if (!_fn2.default.isFn(Array.prototype.map)) {
        Array.prototype.map = function (fn) {
            var mapArr = [],
                i = 0,
                len = this.length;
            for (; i < len; i++) {
                mapArr.push(fn(this[i], i));
            }
            return mapArr;
        };
    }

    //filter
    if (!_fn2.default.isFn(Array.prototype.filter)) {
        Array.prototype.filter = function (fn) {
            var mapArr = [],
                i = 0,
                len = this.length;
            for (; i < len; i++) {
                var item = this[i];
                if (fn(item, i)) mapArr.push(item);
            }
            return mapArr;
        };
    }
})();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
//初始化


exports.default = demand;

var _module2 = __webpack_require__(2);

var _use = __webpack_require__(12);

var _init = __webpack_require__(5);

var _shim = __webpack_require__(11);

var _config = __webpack_require__(4);

var _script = __webpack_require__(7);

var _error = __webpack_require__(1);

var _error2 = _interopRequireDefault(_error);

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function demand(dep, cb) {
	var _this = demand,
	    module = _this.module;
	//运行依赖
	if (_fn2.default.isArr(dep)) {
		_fn2.default.each(dep, function (name, index) {
			if (!_module2.hasModule.call(_this, name)) return;
			var findM = _module2.findModule.call(_this, name);
			_fn2.default.cb(findM.createScript, _this);
		});

		//存储回调，等所有的模块加载完毕后调用
		module.use.push({
			dep: dep,
			cb: cb
		});

		module.status ? _use.runUse.call(_this) : null;
	} else if (_fn2.default.isFn(dep)) {
		/*
   * 使用情况：1.在模块全部加在后追加使用
   *          2.在模块加载依赖的时候使用
   * */
		module.use.push({
			dep: [],
			cb: dep
		});

		module.status ? _use.runUse.call(_this) : null;
	} else if (_fn2.default.isStr(dep)) {

		//获取模块
		var _module = _module2.findModule.call(_this, dep);
		//这理由循环依赖的问题，如果当前的模块是未加载的，直接返回undefined
		return _module.isDemand ? _module['_export_'] : undefined;
	}
}

//获取根路径
demand.origin = function () {
	return location.origin || location.protocol + '//' + location.host;
}();

//是否config过
var isConfig = false;

//配置
demand.config = function (opts) {
	if (isConfig) {
		(0, _error2.default)(0);
		return;
	}

	opts = _fn2.default.extend(_config.config, opts);

	//设置源路径
	this.baseUrl = opts.baseUrl ? opts.baseUrl : this.origin;
	//配置别名
	this.alias = (0, _init.setAlias)(opts.alias);
	//设置shim配置
	_shim.setShim.call(this, opts.shim);
	//设置paths
	_init.setPaths.call(this, opts.paths);
	//设置queue的回调
	_use.useQueue.call(this);
	//只允许config一次
	isConfig = true;
};

//再config后以后加载模块
demand.loadModule = function (paths) {
	var loadModules = void 0;

	if (_fn2.default.isObj(paths)) {
		loadModules = _init.setPaths.call(this, paths);
	} else if (_fn2.default.isStr(paths)) {
		loadModules = _init.setPaths.call(this, [paths]);
	}

	_script.runCreateScript.call(this, loadModules);

	this.module.status = false;
};

//设置一下全局的环境
demand.global = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined ? window : undefined;

//模块存储
demand.module = {
	pathModule: {}, //config中的path模块
	idModule: {}, //id模块
	urlModule: {}, //url路径的模块
	use: [], //use集合
	lastLoadedModule: _config.resetLastModule, //最后获取到的模块
	depManage: [], //依赖管理
	depQueue: [], //依赖队列
	status: false //全部的use加载状态
};

//加载模块
demand.define = function (id, dep, cb) {
	var module = {};
	//存在id的模块
	if (_fn2.default.isStr(id)) {
		module['id'] = id;
		if (_fn2.default.isArr(dep)) {
			module['dep'] = dep;
			module['_export_'] = cb;
		} else if (_fn2.default.isFn(dep)) {
			module['dep'] = [];
			module['_export_'] = dep;
		}
	} else if (_fn2.default.isArr(id)) {
		module['id'] = null;
		module['dep'] = id;
		module['_export_'] = dep;
	} else if (_fn2.default.isFn(id)) {
		module['id'] = null;
		module['dep'] = [];
		module['_export_'] = id;
	} else {
		throw 'error';
	}
	/*
  *	检查非paths或者是dep中加载的模块设置
  * */

	if ((0, _module2.isScriptModule)(this.module.lastLoadedModule)) {
		_module2.setScriptLoadedModule.call(this, this.module.lastLoadedModule);
	}

	//设置到最后一个接
	this.module.lastLoadedModule = module;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.buildModuleDep = buildModuleDep;

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

var _module = __webpack_require__(2);

var _error = __webpack_require__(1);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *	设置模块内的依赖depData 
 * 	{
 * 		dep:[dep1,dep2],
 * 		module:module
 * 	}
 * */

function buildModuleDep(module) {
	var _this = this;

	var deps = module.dep,
	    demandDep = [];

	module.build = true;

	//初始化模块依赖
	_fn2.default.each(deps, function (dep) {
		var findM = _module.findModule.call(_this, dep),
		    depExport = findM._export_;

		//自己依赖自己的话，返回undefined
		if (module === findM) {
			demandDep.push(undefined);
		} else {
			/*
    *	有关循环依赖的问题问题
    * */

			if (findM && !findM.build) {
				buildModuleDep.call(_this, findM);
			}

			if (!findM.isDemand) {
				demandDep.push(undefined);
			} else {
				demandDep.push(findM._export_);
			}
		}
	});

	//初始化模块接口
	if (!module.isDemand) {
		module._export_ = module._export_.apply(this, demandDep);
		module.isDemand = true;
	}
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setShim = setShim;

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

var _module = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *	设置垫片库 
 * */
function setShim(shim) {
	var _this = this;

	_fn2.default.each(shim, function (_shim, id) {

		_this.define(id, _shim.dep, function () {
			return shimContext.call(_this, _shim);
		});

		var lastLoadedModule = _this.module.lastLoadedModule;

		_module.setModule.call(_this, {
			url: null,
			name: null,
			findM: lastLoadedModule
		});
	});
}

//处理shim中作用域和export接口
function shimContext(_shim) {
	var context = _shim.context || this.global,
	    _export_ = _shim._export_;
	if (_fn2.default.isFn(_shim._export_)) {
		return _export_.call(context);
	}
	return context[_shim._export_];
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.useQueue = useQueue;
exports.runUse = runUse;

var _dep = __webpack_require__(10);

var _queue = __webpack_require__(6);

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

var _error = __webpack_require__(1);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//设置模块的依赖队列和use中的cb
function useQueue() {
	var _this = this;

	_queue.queue.cb = function () {
		var module = _this.module;
		//设置dep的依赖
		while (module.depManage.length !== 0) {
			var _module = module.depManage.shift();
			_dep.buildModuleDep.call(_this, _module);
		}
		//处理use
		runUse.call(_this);
		//第一次的模块加载全部完毕
		module.status = true;
	};
}

//运行依赖
function runUse() {
	var _this2 = this;

	var module = this.module;
	var cbDeps = [];

	//异步加载并发出现use顺序加载问题
	if (_queue.queue.hasVal()) return;

	while (module.use.length !== 0) {
		var depData = module.use.shift();
		_fn2.default.each(depData.dep, function (dep, index) {
			cbDeps.push(_this2(dep));
		});

		try {
			depData.cb.apply(this, cbDeps);
		} catch (err) {
			(0, _error2.default)(null, err);
		}

		//依赖处理完后清空
		cbDeps = [];
	}
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _demand = __webpack_require__(9);

var _demand2 = _interopRequireDefault(_demand);

var _compatibility = __webpack_require__(8);

var _compatibility2 = _interopRequireDefault(_compatibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//demand文件入口
(function (global, factory) {
    global ? global.demand = factory() : {};
})(typeof window !== 'undefined' ? window : undefined, function () {

    _demand2.default.version = "v1.0.0";

    return _demand2.default;
});
//兼容性处理

/***/ })
/******/ ]);
//# sourceMappingURL=demand.js.map