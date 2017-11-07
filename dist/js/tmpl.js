/*!
 * 
 * 			tmpl.js v1.0.5
 * 			(c) 2016-2017 Blue
 * 			Released under the MIT License.
 * 			https://github.com/azhanging/tmpl
 * 			time:Tue Nov 07 2017 18:04:45 GMT+0800 (中国标准时间)
 * 		
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Tmpl", [], factory);
	else if(typeof exports === 'object')
		exports["Tmpl"] = factory();
	else
		root["Tmpl"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //运行环境是否在浏览器


var _in_browser = __webpack_require__(1);

var _in_browser2 = _interopRequireDefault(_in_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*常用的方法*/
var Fn = function () {
    function Fn() {
        _classCallCheck(this, Fn);
    }

    _createClass(Fn, [{
        key: 'isArr',
        value: function isArr(array) {
            return array instanceof Array || !!(array && array.length);
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
        key: 'isEl',
        value: function isEl(el) {
            return !!(el && el.nodeType);
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
        key: 'extend',
        value: function extend(obj, options) {
            //合并
            this.each(options, function (option, key) {
                obj[key] = option;
            });
            return obj;
        }
    }, {
        key: 'cb',
        value: function cb(_cb, context, args) {
            //回调
            args = args ? args : [];
            this.isFn(_cb) ? _cb.apply(context, args) : null;
        }
    }, {
        key: 'run',
        value: function run(cb, context, args) {
            //执行函数
            this.cb(cb, context, args);
        }
    }, {
        key: 'unique',
        value: function unique(arr) {
            /*去重*/
            if (!this.isArr(arr)) return [];
            var newArray = [];
            this.each(arr, function (item, index) {
                if (newArray.indexOf(item) === -1) {
                    newArray.push(item);
                }
            });
            return newArray;
        }
    }, {
        key: 'trimArr',
        value: function trimArr(arr) {
            /*清空数组中空的值*/
            var newArr = [];
            this.each(arr, function (item, index) {
                if (item !== '') {
                    newArr.push(item);
                }
            });
            return newArr;
        }
    }, {
        key: 'copy',
        value: function copy(obj) {
            /*深拷贝*/
            if (this.isObj(obj) || this.isArr(obj)) return JSON.parse(JSON.stringify(obj));
            return null;
        }
    }, {
        key: 'ajax',
        value: function ajax(options) {
            var _this = this;

            //创建xhr
            var xhr = new XMLHttpRequest();
            //连接类型
            options.type = options.type ? options.type.toUpperCase() : 'GET';
            //超时
            xhr.timeout = options.timeout && options.async !== false ? options.timeout : 0;

            if (options.type === "GET") {

                xhr.open(options.type, function () {

                    return options.url.indexOf('?') ? options.url + _this.serialize(options.data) : options.url + '?' + _this.serialize(options.data);
                }(), options.async);
            } else if (options.type === "POST") {

                xhr.open(options.type, options.url, options.async);
            }
            xhr.setRequestHeader('Content-Type', options.contentType ? options.contentType : 'application/x-www-form-urlencoded; charset=UTF-8');
            //响应事件
            xhr.addEventListener('readystatechange', function () {
                var data = void 0;

                try {
                    data = JSON.parse(xhr.responseText);
                } catch (e) {
                    data = xhr.responseText;
                }

                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        _this.cb(options.success, _this, [data]);
                    } else if (xhr.status >= 400) {
                        _this.cb(options.error, _this, [data]);
                    }
                }
            }, false);

            //send指令
            if (options.type === "GET") {

                xhr.send();
            } else if (options.type === "POST") {

                xhr.send(this.serialize(options.data));
            }
        }
    }, {
        key: 'serialize',
        value: function serialize(data) {
            //初始化form数据
            var result = '';

            if (!this.isObj(data) || !this.isArr(data)) return '';

            this.each(data, function (val, key) {

                result = result + key + '=' + encodeURIComponent(val) + '&';
            });

            return result.substring(0, result.length - 1);
        }
    }, {
        key: 'initRegExp',
        value: function initRegExp(expr) {
            var tm = '\\/*.?+$^[](){}|\'\"';
            this.each(tm, function (tmItem, index) {
                expr = expr.replace(new RegExp('\\' + tmItem, 'g'), '\\' + tmItem);
            });
            return expr;
        }
    }]);

    return Fn;
}();

//设置事件


Fn.prototype.on = function () {
    if (!_in_browser2.default) return;
    if (typeof document.addEventListener === 'function') {
        return function on(el, type, cb) {
            el.addEventListener(type, cb, false);
        };
    } else {
        return function on(el, type, cb) {
            el.attachEvent('on' + type, cb);
        };
    }
}();

//移除事件
Fn.prototype.off = function () {
    if (!_in_browser2.default) return;
    if (typeof document.removeEventListener === 'function') {
        return function off(el, type, cb) {
            el.addEventListener(type, cb, false);
        };
    } else {
        return function off(el, type, cb) {
            el.detachEvent('on' + type, cb);
        };
    }
}();

exports.default = new Fn();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 *  检测是否在浏览器的环境中 
 * */

var inBrowser = typeof window !== 'undefined';

exports.default = inBrowser;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var FILTER_TRANFORM = /[\b\t\f\n\r\v]/g,
    //过滤转义字符
//script输出节点信息
FILTER_SCRIPT = /[\b\f\r\v]/g,

//script的表达是
SCRIPT_TAG = /<script.*?>([\s\S]*?)<\/script>/g,

//转义双引号
QUEST = /"/g,

//引入模板
INCLUDE_ID = /<tmpl-include .*?name=(\'|\")([\s\S]*?)\1.*?>([\s\S]*?)<\/tmpl-include>/g,

//引入模板
INCLUDE_FILE = /<tmpl-include .*?file=(\'|\")([\s\S]*?)\1.*?>([\s\S]*?)<\/tmpl-include>/g,

//错误的模板
INCLUDE_ERROR = /<tmpl-include.*?>([\s\S]*?)<\/tmpl-include>/g,

//嵌入block块
BLOCK = /<tmpl-block .*?name=(\'|\")([\s\S]*?)\1.*?>([\s\S]*?)<\/tmpl-block>/g,

//append_block
BLOCK_APPEND = /^append:/,

//inser_block
BLOCK_INSETR = /^insert:/,

//base路径解析
EXTEND = /<tmpl-extend .*?file=(\'|\")([\s\S]*?)\1.*?\/>/g;

exports.FILTER_TRANFORM = FILTER_TRANFORM;
exports.FILTER_SCRIPT = FILTER_SCRIPT;
exports.SCRIPT_TAG = SCRIPT_TAG;
exports.QUEST = QUEST;
exports.INCLUDE_ID = INCLUDE_ID;
exports.INCLUDE_FILE = INCLUDE_FILE;
exports.INCLUDE_ERROR = INCLUDE_ERROR;
exports.BLOCK = BLOCK;
exports.BLOCK_APPEND = BLOCK_APPEND;
exports.BLOCK_INSETR = BLOCK_INSETR;
exports.EXTEND = EXTEND;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// html转义
var escapeCode = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
};

exports.default = escapeCode;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _in_browser = __webpack_require__(1);

var _in_browser2 = _interopRequireDefault(_in_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//在node环境中使用需要用到fs获取文件
var fs = void 0; //运行环境是否在浏览器


if (!_in_browser2.default) {
    fs = require('fs');
}

exports.default = fs;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setEvent = setEvent;
exports.setInstance = setInstance;
exports.setEl = setEl;

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

var _in_browser = __webpack_require__(1);

var _in_browser2 = _interopRequireDefault(_in_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//初始化时间中的参数
//常用的方法
function setEvent() {
	if (this.constructor._event) return;
	this.constructor._event = {
		events: {},
		eventType: [],
		eventEl: []
	};
}

//设置实例

//运行环境是否在浏览器
function setInstance(type) {
	var _this = this;

	var get = this.config[type];

	if (!_fn2.default.isObj(get)) {
		return;
	}

	_fn2.default.each(get, function (_get, key) {
		_this[key] = _get;
	});
}

//设置this.template
function setEl() {
	if (_in_browser2.default) {
		try {
			return this.getEl(this.config.template).innerHTML;
		} catch (e) {
			return null;
		}
	} else {
		return this.config.template;
	}
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setRegExp = setRegExp;
exports.setDom = setDom;
exports.replaceAlias = replaceAlias;

var _in_browser = __webpack_require__(1);

var _in_browser2 = _interopRequireDefault(_in_browser);

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

var _include = __webpack_require__(14);

var _include2 = _interopRequireDefault(_include);

var _block = __webpack_require__(11);

var _block2 = _interopRequireDefault(_block);

var _tmplRegexp = __webpack_require__(2);

var _escapeCode = __webpack_require__(3);

var _escapeCode2 = _interopRequireDefault(_escapeCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//由于模块接口中都是只读的，不能放在配置中；

//模板正则配置

//include
/*
 * 一堆解析模板的方法,tmpl的核心算法
 * */
//运行环境是否在浏览器
var SCRIPT_REGEXP = void 0,

/*原生script*/
NATIVE_SCRIPT = void 0,

/*输出script*/
ECHO_SCRIPT_REGEXP = void 0,

//转义输出
ECHO_ESCAPE_REGEXP = void 0,

/*替换输出script*/
REPLACE_ECHO_SCRIPT_OPEN_TAG = void 0,

//转义的开头表达式
ECHO_ESCAPE_REGEXP_OPEN_TAG = void 0,

/*起始*/
OPEN_TAG_REGEXP = void 0,

/*闭合*/
CLOSE_TAG_REGEXP = void 0;

//设置正则


//html中的转义

//extend

//常用的方法
function setRegExp() {

    var open_tag = _fn2.default.initRegExp(this.config.open_tag),
        close_tag = _fn2.default.initRegExp(this.config.close_tag);
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
function setDom() {
    //node中使用block
    if (!_in_browser2.default) {
        _block2.default.call(this);
        /*清除遗留的block块*/
        clearBlock.call(this);
    }
    /*重新检查依赖里面有没有引入的数据*/
    replaceAlias.call(this);
    /*替换include中的内容*/
    _include2.default.call(this);
    /*解析script*/
    var script = this.template.match(SCRIPT_REGEXP) || [];
    //设置占位
    var replaceScript = setSeize.call(this),
        echoString = replaceScript.split(/___SCRIPT___|___ECHO_SCRIPT___/),
        //拆分占位
    domString = [],
        longString = echoString.length > script.length ? echoString : script;

    //排除了运算和赋值表达式，处理直接输出的字符串
    _fn2.default.each(echoString, function (_echoString, index) {
        echoString[index] = "___.push(\"" + filterTransferredMeaning(_echoString) + "\");";
    });

    //这里是处理所有表达式内容
    _fn2.default.each(script, function (_string, index) {
        //恢复正则的索引位置
        ECHO_SCRIPT_REGEXP.lastIndex = 0;
        NATIVE_SCRIPT.lastIndex = 0;
        ECHO_ESCAPE_REGEXP.lastIndex = 0;
        //处理对应表达式
        if (ECHO_SCRIPT_REGEXP.test(_string)) {
            script[index] = _string.replace(REPLACE_ECHO_SCRIPT_OPEN_TAG, "___.push(").replace(CLOSE_TAG_REGEXP, ");");
        } else if (NATIVE_SCRIPT.test(_string)) {
            script[index] = _string.replace(OPEN_TAG_REGEXP, '').replace(CLOSE_TAG_REGEXP, '');
        } else if (ECHO_ESCAPE_REGEXP.test(_string)) {
            script[index] = _string.replace(ECHO_ESCAPE_REGEXP_OPEN_TAG, "___.push(_this_.escape(").replace(CLOSE_TAG_REGEXP, "));");
        }
    });

    _fn2.default.each(longString, function (_longString, index) {
        //直接输出的dom结构
        if (_fn2.default.isStr(echoString[index])) {
            domString.push(echoString[index]);
        }
        //js的源码
        if (_fn2.default.isStr(script[index])) {
            domString.push(script[index].replace(_tmplRegexp.FILTER_TRANFORM, ""));
        }
    });

    this.dom = 'var _this_ = this,___ = [];' + domString.join('') + 'return ___.join("");';
};

/*替换别名的常量*/
function replaceAlias() {
    var _this = this;

    var constructor = this.constructor;
    _fn2.default.each(constructor.alias, function (replaceAlias, alias) {
        _this.template = _this.template.replace(new RegExp(_fn2.default.initRegExp(alias), 'g'), replaceAlias);
    });
}

/*清除多余的block块*/
function clearBlock() {
    this.template = this.template.replace(_tmplRegexp.EXTEND, '').replace(_tmplRegexp.BLOCK, '');
}

//设置占位
function setSeize() {
    var replaceScript = this.template.replace(ECHO_SCRIPT_REGEXP, '___ECHO_SCRIPT___').replace(SCRIPT_REGEXP, '___SCRIPT___');
    return replaceScript;
}

//过滤string中的引号
function filterTransferredMeaning(string) {
    //检查script的标签
    var scriptTags = string.match(_tmplRegexp.SCRIPT_TAG),
        _string = string.replace(_tmplRegexp.SCRIPT_TAG, '___SCRIPT_TAG___').replace(_tmplRegexp.FILTER_TRANFORM, "").replace(_tmplRegexp.QUEST, '\\\"');

    return !scriptTags ? _string : filterScriptTag(_string, scriptTags);
}

//过滤script标签
function filterScriptTag(string, scriptTags) {
    var splitScriptTag = string.split('___SCRIPT_TAG___'),
        dom = [];
    _fn2.default.each(splitScriptTag, function (script, index) {
        dom.push(script);
        if (scriptTags[index]) {
            dom.push(scriptTags[index].replace(_tmplRegexp.QUEST, '\\\"').replace(_tmplRegexp.FILTER_SCRIPT, '').replace(/\n/g, '\\n'));
        }
    });
    return dom.join("");
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _in_browser = __webpack_require__(1);

var _in_browser2 = _interopRequireDefault(_in_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//兼容性IE8
(function () {
	//兼容IE8中 的indexOf
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (val) {
			for (var index = 0, len = undefined.length; index < len; index++) {
				if (undefined[index] === val) {
					return index;
				}
			}
			return -1;
		};
	}

	/*只在浏览器环境使用*/
	if (_in_browser2.default && !document.getElementsByClassName) {
		document.getElementsByClassName = function (className, el) {
			var children = (el || document).getElementsByTagName('*'),
			    elements = new Array();
			for (var i = 0; i < children.length; i++) {

				var child = children[i],
				    classNames = child.className.split(' ');

				for (var j = 0; j < classNames.length; j++) {
					if (classNames[j] == className) {
						elements.push(child);
						break;
					}
				}
			}

			return elements;
		};
	}
})(); //运行环境是否在浏览器
exports.default = true;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _init2 = __webpack_require__(15);

var _init3 = _interopRequireDefault(_init2);

var _render = __webpack_require__(16);

var _render2 = _interopRequireDefault(_render);

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

var _dom = __webpack_require__(13);

var _dom2 = _interopRequireDefault(_dom);

var _config = __webpack_require__(12);

var _config2 = _interopRequireDefault(_config);

var _escapeCode = __webpack_require__(3);

var _escapeCode2 = _interopRequireDefault(_escapeCode);

var _set = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //tmpl的初始化

//处理模板数据的Render类

//常用的类方法

//Dom的操作

//config配置

//转义html

//set


var Tmpl = function (_Dom) {
    _inherits(Tmpl, _Dom);

    //Tmpl构造
    function Tmpl(opts) {
        _classCallCheck(this, Tmpl);

        var _this = _possibleConstructorReturn(this, (Tmpl.__proto__ || Object.getPrototypeOf(Tmpl)).call(this));

        _this.config = _fn2.default.extend(_fn2.default.copy(_config2.default), opts);
        _this.init();
        return _this;
    }

    //安装插件


    _createClass(Tmpl, [{
        key: 'init',


        //初始化对象
        value: function init() {
            _init3.default.call(this);
        }

        //解析模板和数据

    }, {
        key: 'render',
        value: function render(data) {
            var tmpl = this;
            return new _render2.default({
                tmpl: tmpl,
                data: data
            });
        }

        //添加数据更新模板

    }, {
        key: 'update',
        value: function update() {
            this.template = _set.setEl.call(this);
            setDom.call(this);
        }

        /*回调*/

    }, {
        key: 'cb',
        value: function cb(_cb) {
            _fn2.default.cb(_cb, this);
            return this;
        }

        /*转义*/

    }, {
        key: 'escape',
        value: function escape(escapeVal) {
            _fn2.default.each(_escapeCode2.default, function (item, key) {
                escapeVal = escapeVal.replace(new RegExp(key, 'g'), item);
            });
            return escapeVal;
        }
    }], [{
        key: 'install',
        value: function install(constructor) {
            constructor.install(this);
        }
    }]);

    return Tmpl;
}(_dom2.default);

//常用的方法给tmpl的fn属性中


exports.default = Tmpl;
Tmpl.prototype.fn = _fn2.default;

//设置路径别名常量
Tmpl.alias = {};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //兼容性处理

//Tmpl 文件入口


var _compatibility = __webpack_require__(8);

var _compatibility2 = _interopRequireDefault(_compatibility);

var _tmpl = __webpack_require__(9);

var _tmpl2 = _interopRequireDefault(_tmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (global, factory) {
    if (typeof demand === 'function' && typeof demand.define === 'function') demand.define('tmpl', factory);else if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else global ? global.Tmpl = factory() : {};
})(typeof window !== 'undefined' ? window : undefined, function () {
    _tmpl2.default.version = "v1.0.5";
    return _tmpl2.default;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = replaceBlock;

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

var _tmplRender = __webpack_require__(6);

var _fs = __webpack_require__(4);

var _fs2 = _interopRequireDefault(_fs);

var _tmplRegexp = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*替换Block块内容*/


//在node环境中使用需要用到fs获取文件
//常用的方法
function replaceBlock() {
    //先设置获取include的引入模板
    _tmplRender.replaceAlias.call(this);

    var baseFile = _fn2.default.unique(this.template.match(_tmplRegexp.EXTEND)),

    /*只获取第一个base的名字*/
    baseFileName = baseFile.toString().replace(_tmplRegexp.EXTEND, "$2").split(',')[0];

    /*如果不存在block的内容，直接跳出*/
    if (baseFileName === '') return;

    //获取入口模板
    var blockTmpl = _fn2.default.unique(this.template.match(_tmplRegexp.BLOCK));

    //获取继承的模板
    var layoutTmpl = _fs2.default.readFileSync(baseFileName, {
        encoding: 'UTF8'
    });

    //从继承模板中筛选出block
    var layoutTmplFindBlock = layoutTmpl.match(_tmplRegexp.BLOCK) || [],
        layoutTmplFindBlockStr = layoutTmplFindBlock.toString(),
        baseBlockName = _fn2.default.unique(layoutTmplFindBlockStr !== '' ? layoutTmplFindBlockStr.replace(_tmplRegexp.BLOCK, "$2").split(',') : []);

    _fn2.default.each(baseBlockName, function (name, index) {

        var block = layoutTmplFindBlock[index],
            replaceBlock = new RegExp(_fn2.default.initRegExp(block), 'g');

        var hasBlock = false;

        _fn2.default.each(blockTmpl, function (blocktmpl, _index) {

            _tmplRegexp.BLOCK.test(blocktmpl);

            var _name = RegExp.$2,
                blockContent = RegExp.$3;

            //匹配到name的
            if (name === _name) {
                layoutTmpl = layoutTmpl.replace(replaceBlock, blockContent);
                hasBlock = true;
            } else if (_tmplRegexp.BLOCK_APPEND.test(_name) && name === _name.replace(_tmplRegexp.BLOCK_APPEND, '')) {
                layoutTmpl = layoutTmpl.replace(replaceBlock, block.replace(_tmplRegexp.BLOCK, "$3") + blockContent);
                hasBlock = true;
            } else if (_tmplRegexp.BLOCK_INSETR.test(_name) && name === _name.replace(_tmplRegexp.BLOCK_INSETR, '')) {
                layoutTmpl = layoutTmpl.replace(replaceBlock, blockContent + block.replace(_tmplRegexp.BLOCK, "$3"));
                hasBlock = true;
            }

            _tmplRegexp.BLOCK.lastIndex = 0;
        });

        /*如果当前的block是在extends的模板中不存在，则显示默认里面的*/
        if (!hasBlock) {
            layoutTmpl = layoutTmpl.replace(replaceBlock, block.replace(_tmplRegexp.BLOCK, '$3'));
        }
    });

    this.template = layoutTmpl;
}

//模板正则配置

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*配置信息*/
var config = {
    open_tag: "<%", //OPEN_TAG
    close_tag: "%>", //CLOSE_TAG,
    template: "",
    data: {},
    methods: {}
};

exports.default = config;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //运行环境是否在浏览器

//常用的方法


var _in_browser = __webpack_require__(1);

var _in_browser2 = _interopRequireDefault(_in_browser);

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//绑定相关函数
function bindFn(el, className, type) {

    var _className = el.className.split(' ');

    //替换
    if (_fn2.default.isObj(className) && (type == 'replaceBind' || type == 'replaceClass')) {
        _fn2.default.each(className, function (__className, key) {
            var findIndex = _className.indexOf(key);
            if (findIndex != -1) _className[findIndex] = __className;
        });
    } else {
        //获得el中的className{type:string}
        className = className.split(' ');

        for (var index = 0; index < className.length; index++) {

            var findIndex = _className.indexOf(className[index]);

            if (type == 'bind' || type == 'addClass') {

                if (findIndex == -1) _className.push(className[index]);
            } else if (type == 'unbind' || type == 'removeClass') {

                if (findIndex != -1) _className.splice(findIndex, 1);
            }
        }
    }

    el.className = _className.join(' ');

    return this;
}

//设置主的委托事件
function setEntrust(ele, type, cb) {
    var _this = this;

    _fn2.default.on(ele, type, function (event) {
        var ev = event || window.event,
            el = ev.target || ev.srcElement,
            eventType = ele.event.events[type];

        _fn2.default.each(eventType, function (_eventType, bind) {

            if (!_this.hasClass(el, bind)) return;

            _fn2.default.each(_eventType, function (cb, index) {

                cb.apply(_this, [ev, el]);
            });
        });
    });
}

var Dom = function () {
    function Dom() {
        _classCallCheck(this, Dom);
    }

    _createClass(Dom, [{
        key: 'getEl',
        value: function getEl(exp) {

            //获取节点
            if (!exp) return null;

            if (!this.fn.isFn(document.querySelector)) {
                return document.getElementById(exp);
            }

            var getEl = document.querySelector(exp),
                el = document.getElementById(exp);

            return getEl !== null ? getEl : el ? el : null;
        }
    }, {
        key: 'getEls',
        value: function getEls(exp) {

            //获取多个节点
            if (!exp) return null;

            if (!this.fn.isFn(document.querySelectorAll)) {
                return document.getElementsByClassName(exp);
            }

            var getEls = document.querySelectorAll(exp),
                el = document.getElementsByClassName(exp);

            return getEls.length > 0 ? getEls : el ? el : [];
        }
        //绑定事件

    }, {
        key: 'on',
        value: function on(ele, exp, type, cb) {
            var _this2 = this;

            if (arguments.length === 4) {

                //初始化事件
                if (this.constructor._event.eventEl.indexOf(ele) == -1) {

                    this.constructor._event.eventEl.push(ele);

                    ele.event = {
                        eventType: [],
                        events: {}
                    };
                }

                if (ele.event.eventType.indexOf(type) == -1) {
                    setEntrust.apply(this, [ele, type, cb]);
                    //添加委托事件
                    ele.event.eventType.push(type);
                }

                //查找现在的节点是否存在事件
                if (!ele.event.events[type]) {
                    ele.event.events[type] = {};
                }

                //当前的事件是否有设置
                if (!ele.event.events[type][exp]) {
                    ele.event.events[type][exp] = [];
                }

                //添加处理函数到事件列表中
                ele.event.events[type][exp].push(cb);
            } else if (arguments.length === 3) {
                cb = type;
                type = exp;
                _fn2.default.on(ele, type, function (event) {
                    cb.call(_this2, event);
                });
            }

            return this;
        }

        //取消绑定事件

    }, {
        key: 'off',
        value: function off(ele, exp, type, cb) {
            if (arguments.length === 4) {
                var eventIndex = this.events[type][exp].indexOf(cb);
                if (eventIndex != -1) ele.events[type][exp].splice(eventIndex, 1);
            } else if (arguments.length === 3) {
                /*删除事件*/
                _fn2.default.off(ele, type, cb);
            }
            return this;
        }

        //设置事件委托的class

    }, {
        key: 'bind',
        value: function bind(el, _bind) {
            bindFn.apply(this, [el, _bind, 'bind']);
            return this;
        }

        //取消方法绑定

    }, {
        key: 'unbind',
        value: function unbind(el, bind) {
            bindFn.apply(this, [el, bind, 'unbind']);
            return this;
        }

        //替换绑定

    }, {
        key: 'replaceBind',
        value: function replaceBind(el, bind) {
            bindFn.apply(this, [el, bind, 'replaceBind']);
            return this;
        }

        //添加class

    }, {
        key: 'addClass',
        value: function addClass(el, className) {
            bindFn.apply(this, [el, className, 'addClass']);
            return this;
        }

        //删除class

    }, {
        key: 'removeClass',
        value: function removeClass(el, className) {
            bindFn.apply(this, [el, className, 'removeClass']);
            return this;
        }

        //替换className

    }, {
        key: 'replaceClass',
        value: function replaceClass(el, className) {
            bindFn.apply(this, [el, className, 'replaceClass']);
            return this;
        }

        //是否存在class

    }, {
        key: 'hasClass',
        value: function hasClass(el, className) {
            try {
                //节点中存在的className
                var _className = el.className.split(' '),

                //是否存在的className
                hasClassName = className.split(' ');

                var hasLen = 0;

                for (var index = 0; index < hasClassName.length; index++) {
                    if (_className.indexOf(hasClassName[index]) !== -1) ++hasLen;
                }

                if (hasLen === hasClassName.length) return true;

                return false;
            } catch (e) {

                return false;
            }
        }

        //获取属性

    }, {
        key: 'attr',
        value: function attr(el, _attr2) {
            var _this3 = this;

            if (_fn2.default.isObj(_attr2)) {

                _fn2.default.each(_attr2, function (_attr, key) {

                    if (typeof _attr === 'boolean') {

                        el[key] = _attr;

                        el.setAttribute(key, _attr);
                    } else if (_attr === '') {

                        el.removeAttribute(key);
                    } else {

                        el.setAttribute(key, _attr);
                    }
                });

                return this;
            } else {

                if (_attr2 instanceof Array) {

                    var attrs = [];

                    _fn2.default.each(_attr2, function (_attr, index) {

                        attrs.push(_this3.attr(el, _attr));
                    });

                    return attrs;
                } else if (/^bind-\S*/.test(_attr2)) {

                    return new Function('return ' + el.getAttribute(_attr2) + ';').apply(this);
                } else {

                    return el.getAttribute(_attr2);
                }
            }
        }

        //获取、设置prop属性

    }, {
        key: 'prop',
        value: function prop(el, _prop2) {
            //设置节点属性
            if (_fn2.default.isObj(_prop2)) {
                _fn2.default.each(_prop2, function (_prop, key) {

                    el[key] = _prop;
                });

                return this;
            } else if (_fn2.default.isStr(_prop2)) {
                //获得节点属性

                if (/^bind-\S*/.test(_prop2)) return new Function('return ' + el[_prop2] + ';').apply(this);

                return el[_prop2];
            }
        }

        //获取、设置html

    }, {
        key: 'html',
        value: function html(el, _html) {
            if (_html === undefined) return el.innerHTML;
            el.innerHTML = _html;
            return this;
        }

        //获取、设置value

    }, {
        key: 'val',
        value: function val(el, _val) {
            if (_val === undefined) return el.value;
            el.value = _val;
            return this;
        }

        //获取、设置textContent

    }, {
        key: 'text',
        value: function text(el, _text) {
            if (_text === undefined) return el.textContent;
            el.textContent = _text;
            return this;
        }

        //查找符合的一个父级节点

    }, {
        key: 'parent',
        value: function parent(el, hasClassName) {

            var parent = el.parentNode;

            if (parent === document || parent === null) return null;

            if (!hasClassName) return parent;

            if (this.hasClass(parent, hasClassName)) return parent;

            return this.parent(parent, hasClassName);
        }

        //超找所有符合的父元素

    }, {
        key: 'parents',
        value: function parents(el, hasClassName, hasClassParent) {

            var parent = el.parentNode;

            hasClassParent = hasClassParent ? hasClassParent : [];

            if (parent === document || parent === null) return null;

            if (this.hasClass(parent, hasClassName)) hasClassParent.push(parent);

            this.parents(parent, hasClassName, hasClassParent);

            return hasClassParent;
        }

        //获取直接的当个子节点

    }, {
        key: 'children',
        value: function children(el) {
            var els = [];
            _fn2.default.each(el.childNodes, function (child) {
                if (child.nodeType === 1) {
                    els.push(child);
                }
            });
            return els;
        }
    }, {
        key: 'childrens',


        //查找对应的class存在的节点
        value: function childrens(el, className, hasClassChild) {
            var i = 0;
            hasClassChild = hasClassChild ? hasClassChild : [];
            for (; i < el.children.length; i++) {
                if (this.hasClass(el.children[i], className)) hasClassChild.push(el.children[i]);
                this.childrens(el.children[i], className, hasClassChild);
            }
            return hasClassChild;
        }

        //下一个节点

    }, {
        key: 'next',
        value: function next(el) {
            var nextEl = el.nextSibling;
            if (nextEl === null) return null;
            if (nextEl.nodeType !== 1) return this.next(nextEl);
            return nextEl;
        }

        //获取当前元素同级前的节点

    }, {
        key: 'nextAll',
        value: function nextAll(el) {
            return this.siblings(el, 'nextAll');
        }

        //获取当前元素同级后的节点

    }, {
        key: 'prevAll',
        value: function prevAll(el) {
            return this.siblings(el, 'prevAll');
        }

        //上一个节点

    }, {
        key: 'prev',
        value: function prev(el) {
            var prevEl = el.previousSibling;
            if (prevEl === null) return null;
            if (prevEl.nodeType !== 1) return this.prev(prevEl);
            return prevEl;
        }

        //获取同级的兄弟节点

    }, {
        key: 'siblings',
        value: function siblings(el, type) {
            var parent = this.parent(el);

            if (parent === null) return null;

            var child = parent.children;

            var siblings = [];

            var i = 0;

            if (type === 'nextAll') i = Array.prototype.indexOf.call(child, el);

            for (; i < child.length; i++) {

                if (child[i] !== el) siblings.push(child[i]);

                if (type === 'prevAll' && child[i] === el) return siblings;
            }

            return siblings;
        }

        //显示

    }, {
        key: 'hide',
        value: function hide(el, time) {

            var opacity = this.css(el, 'opacity');

            el.opacity = opacity ? opacity : 1;

            _fn2.default.isNum(time) ? this.animate(el, {
                opacity: 0
            }, time, function () {
                el.style.display = 'none';
            }) : el.style.display = 'none';

            return this;
        }

        //隐藏

    }, {
        key: 'show',
        value: function show(el, time) {

            var opactiy = el.opactiy ? el.opactiy : 100;

            if (_fn2.default.isNum(time)) {

                this.css(el, {
                    opacity: 0
                });

                el.style.display = '';

                this.animate(el, {
                    opacity: opactiy
                }, time);
            } else {
                el.style.display = '';
            }
            return this;
        }

        /*切换显示状态*/

    }, {
        key: 'toggle',
        value: function toggle(el, time) {
            if (el.style.display === '') this.hide(el, time);else this.show(el, time);
        }

        /*动画*/

    }, {
        key: 'animate',
        value: function animate(el, _animate, time, cb) {
            var _this4 = this;

            if (!el) return;

            el.timer = setInterval(function () {

                var animateStatus = true;

                _fn2.default.each(_animate, function (val, type) {

                    var speed = 0,
                        cssVal = 0;

                    if (type === 'opacity') {

                        cssVal = Number(_this4.css(el, 'opacity')) * 100;
                    } else if (type === 'scrollTop') {

                        cssVal = Math.ceil(document.documentElement.scrollTop || document.body.scrollTop);

                        var maxScrollTop = Math.ceil(document.body.scrollHeight - window.innerHeight);

                        if (val > maxScrollTop) {
                            val = maxScrollTop;
                            _animate['scrollTop'] = maxScrollTop;
                        }
                    } else {
                        cssVal = parseInt(_this4.css(el, type));
                    }

                    speed = (val - cssVal) / 8;

                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                    var setVal = {};

                    if (type === 'opacity') {
                        setVal['opacity'] = (cssVal + speed) / 100;
                        _this4.css(el, setVal);
                    } else if (type === 'scrollTop') {
                        _this4.setScrollTop(cssVal + speed);
                    } else {
                        setVal[type] = cssVal + speed + 'px';
                        _this4.css(el, setVal);
                    }

                    if (parseInt(val) !== cssVal) {
                        animateStatus = false;
                    }
                });

                if (animateStatus) {
                    clearInterval(el.timer);
                    _fn2.default.cb(cb, _this4);
                }
            }, time / 60);
        }

        /*操作css*/

    }, {
        key: 'css',
        value: function css(el, _css2) {
            //获取css
            if (_fn2.default.isStr(_css2)) {
                return this.curCss(el, _css2);
            } else if (_fn2.default.isObj(_css2)) {
                //设置style
                this.setStyle(el, _css2);
                return this;
            }
        }

        /*处理驼峰和非驼峰*/

    }, {
        key: 'camelCase',
        value: function camelCase(text, isCameCase) {
            var camelCases = void 0;

            var AZ = /[A-Z]/g,
                _AZ = /-[a-z]/g;

            if (!_fn2.default.isStr(text)) return text;

            camelCases = isCameCase ? text.match(_AZ) : text.match(AZ);

            camelCases = camelCases ? camelCases : [];

            _fn2.default.each(camelCases, function (str, index) {
                if (isCameCase) text = text.replace(str, str.replace(/-/g, '').toUpperCase());else text = text.replace(str, '-' + str.toLowerCase());
            });

            return text;
        }

        /*获取计算好的值*/

    }, {
        key: 'curCss',
        value: function curCss(el, css) {

            var _css = void 0;

            if (window.getComputedStyle) {

                _css = this.camelCase(css, true);

                return window.getComputedStyle(el, null)[_css];
            } else if (document.documentElement.currentStyle) {

                _css = this.camelCase(css, false);

                return document.documentElement.currentStyle[_css];
            }
        }

        /*设置css*/

    }, {
        key: 'setStyle',
        value: function setStyle(el, css) {

            _fn2.default.each(css, function (style, cssName) {

                el.style[cssName] = style;
            });
        }

        /*删除节点*/

    }, {
        key: 'remove',
        value: function remove(el) {
            try {
                el.remove();
            } catch (e) {
                var parent = this.parent(el);
                parent !== null ? parent.removeChild(el) : console.warn('element remove error!');
            }
            return this;
        }

        /*创建元素*/

    }, {
        key: 'create',
        value: function create(dom) {
            var _this5 = this;

            var fragment = document.createDocumentFragment();

            var tempEl = document.createElement('div');

            tempEl.innerHTML = dom;

            while (tempEl.childNodes.length !== 0) {

                var child = tempEl.childNodes[0];

                var childHtml = child.innerHTML;

                if (child.tagName === 'SCRIPT') {
                    (function () {

                        var newScript = document.createElement('script');

                        newScript.innerHTML = childHtml;

                        _fn2.default.each(child.attributes, function (attr) {

                            if (!attr) true;

                            newScript.setAttribute(attr.name, attr.value);
                        });

                        _this5.remove(child);

                        child = newScript;
                    })();
                }

                fragment.appendChild(child);
            }

            return fragment;
        }

        /*插入节点*/

    }, {
        key: 'append',
        value: function append(el, child) {

            if (el.nodeType === 1) el.appendChild(child);else _fn2.default.getEl(el).appendChild(child);

            return this;
        }

        //取消冒泡

    }, {
        key: 'preventDefault',
        value: function preventDefault(event) {

            var ev = event || window.event;

            ev.stopPropagation();

            ev.cancelBubble = true;
        }

        //offset

    }, {
        key: 'offset',
        value: function offset(el) {

            var box = el.getBoundingClientRect(),
                docElem = document.documentElement,
                body = document.body,
                win = window,
                clientTop = docElem.clientTop || body.clientTop || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0,
                scrollTop = win.pageYOffset || docElem.scrollTop,
                scrollLeft = win.pageXOffset || docElem.scrollLeft;

            return {
                top: box.top + scrollTop - clientTop,
                left: box.left + scrollLeft - clientLeft
            };
        }

        /*设置滚动条高度*/

    }, {
        key: 'setScrollTop',
        value: function setScrollTop(top, animate) {

            document.body.scrollTop = top;

            document.documentElement.scrollTop = top;
        }
    }]);

    return Dom;
}();

exports.default = Dom;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = replaceInclude;

var _in_browser = __webpack_require__(1);

var _in_browser2 = _interopRequireDefault(_in_browser);

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

var _fs = __webpack_require__(4);

var _fs2 = _interopRequireDefault(_fs);

var _tmplRegexp = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*替换include引入的模板*/

//在node环境中使用需要用到fs获取文件
//运行环境是否在浏览器
function replaceInclude() {
    var _this = this;

    var include = function () {
        if (_in_browser2.default) {
            //在浏览器环境清空include[file]
            return _tmplRegexp.INCLUDE_ID;
        } else {
            //在node环境清空include[name]
            return _tmplRegexp.INCLUDE_FILE;
        }
    }();

    var includeTmpl = void 0,
        includeId = void 0;

    //去重
    includeTmpl = _fn2.default.unique(this.template.match(include));
    includeId = includeTmpl.toString().replace(include, "$2").split(',');

    //找不到include//查找的id和include匹配的数量必须相同
    if (includeTmpl.length === 0 || _fn2.default.trimArr(includeId).length === 0 || !(includeTmpl.length > 0 && includeId.length > 0 && includeId.length === includeTmpl.length)) return;

    _fn2.default.each(includeId, function (id, index) {
        var replaceIncludeRegExp = new RegExp(_fn2.default.initRegExp(includeTmpl[index]), 'g');
        /*浏览器环境下执行*/
        if (_in_browser2.default) {
            var el = _this.getEl(id);
            if (el) _this.template = _this.template.replace(replaceIncludeRegExp, _this.html(el));
            //找不到就清空原来的内容
            else _this.template = _this.template.replace(replaceIncludeRegExp, '');
        } else {
            /*node环境下执行*/
            try {
                var tmpl = _fs2.default.readFileSync(id, {
                    encoding: 'UTF8'
                });

                _this.template = _this.template.replace(replaceIncludeRegExp, tmpl);
            } catch (e) {
                //找不到就清空原来的内容
                _this.template = _this.template.replace(replaceIncludeRegExp, '');
            }
        }
    });

    /*去掉重复的include*/
    includeTmpl = _fn2.default.unique(this.template.match(include));

    /*查找是否还有include的引入*/
    if (includeTmpl.length > 0) replaceInclude.call(this);

    /*清空错误的include*/
    this.template = this.template.replace(_tmplRegexp.INCLUDE_ERROR, '');
}

//模板正则配置

//常用的方法

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = init;

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

var _tmplRender = __webpack_require__(6);

var _tmplRender2 = _interopRequireDefault(_tmplRender);

var _in_browser = __webpack_require__(1);

var _in_browser2 = _interopRequireDefault(_in_browser);

var _set = __webpack_require__(5);

var _router = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//初始化设置

//运行环境是否在浏览器
//常用的方法
function init() {
	//构建开始的钩子
	_fn2.default.run(this.config.create, this);
	//初始配置信息
	this.template = _set.setEl.call(this);
	//初始化方法
	_set.setInstance.call(this, 'methods');
	//初始化数据
	_set.setInstance.call(this, 'data');
	//构建开始后的钩子
	_fn2.default.run(this.config.created, this);
	//初始化路由
	_router.setRouter.call(this);
	//查找模板
	if (this.template) {

		_tmplRender.setRegExp.call(this);
		//转化为js执行
		_tmplRender.setDom.call(this);
	}
	//初始化事件
	_set.setEvent.call(this);
	//设置事件
	_fn2.default.run(this.config.events, this);
	//所有完毕后的钩子
	_fn2.default.run(this.config.mounted, this);
	//检查是否存在路由的状态
	_router.checkRouterStatus.call(this);
}

//router相关

//tmpl的render解析

//解析方法

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Render代理实例,针对tmpl中的数据流
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * */

//运行环境是否在浏览器

//常用的方法


var _in_browser = __webpack_require__(1);

var _in_browser2 = _interopRequireDefault(_in_browser);

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Render = function () {
        function Render(opts) {
                _classCallCheck(this, Render);

                this.init(opts);
        }
        //初始render类


        _createClass(Render, [{
                key: 'init',
                value: function init(opts) {

                        this.tmpl = opts.tmpl;

                        this.data = opts.data;

                        //      console.log(this.tmpl.dom);

                        this.dom = new Function('data', this.tmpl.dom).apply(this.tmpl, [this.data]);

                        _in_browser2.default ? this.fragment = this.tmpl.create(this.dom) : null;
                }
                //在父节点中插入解析后的模板

        }, {
                key: 'appendTo',
                value: function appendTo(el, cb) {

                        var tmpl = this.tmpl,
                            fn = tmpl.fn;

                        if (el.nodeType === 1) el.appendChild(this.fragment);else tmpl.getEl(el).appendChild(this.fragment);

                        fn.cb(cb, this.tmpl);

                        return tmpl;
                }
                //在el子节点ex中插入解析后的模板	

        }, {
                key: 'insertBefore',
                value: function insertBefore(el, ex, cb) {

                        var tmpl = this.tmpl,
                            fn = tmpl.fn;

                        tmpl.getEl(el).insertBefore(this.fragment, ex);

                        fn.cb(cb, tmpl);

                        return tmpl;
                }
        }]);

        return Render;
}();

exports.default = Render;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setRouter = setRouter;
exports.checkRouterStatus = checkRouterStatus;

var _fn = __webpack_require__(0);

var _fn2 = _interopRequireDefault(_fn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//把路由实例挂靠到模板中
function setRouter() {
	if (_fn2.default.isObj(this.config.router)) {
		this.constructor.router = this.config.router;
	}
}

//检查路由状态
/*路由相关*/

//常用的方法
function checkRouterStatus() {
	//获取路由
	var router = this.constructor.router,
	    status = this.config.async;
	if (!(status === false) && router) {
		router.changeRoutereStatus(true);
	}
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=tmpl.js.map