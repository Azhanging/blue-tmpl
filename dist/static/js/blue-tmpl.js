/*!
 * 
 * blue-tmpl.js 1.1.2
 * (c) 2016-2017 Blue
 * Released under the MIT License.
 * https://github.com/azhanging/blue-tmpl
 * time:Sun, 21 Oct 2018 01:37:33 GMT
 * 		
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BlueTmpl"] = factory(require("fs"));
	else
		root["BlueTmpl"] = factory(root[undefined]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_11__) {
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
/******/ 	__webpack_require__.p = "./static";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_in_browser__ = __webpack_require__(1);


class Util {

  nullPlainObject(val) {
    return JSON.stringify(val) === "{}";
  }

  isStr(val) {
    return typeof val === 'string';
  }

  isFn(fn) {
    return typeof fn === 'function';
  }

  isNum(num) {
    return typeof num === 'number' || !isNaN(num);
  }

  isEl(el) {
    return !!(el && el.nodeType);
  }

  isPlainObject(val) {
    return val && val !== null && val.toString() === '[object Object]';
  }

  isArray(val) {
    return val instanceof Array;
  }

  isObjcet(val) {
    return this.isPlainObject(val) || this.isArray(val);
  }

  isDef(val) {
    return val !== undefined && val !== null;
  }

  isUndef(val) {
    return val === undefined || val === null;
  }

  isBlankSpace(val) {
    return val.trim().length === 0;
  }

  isTrue(bool) {
    return bool === true;
  }

  isFalse(bool) {
    return bool === false;
  }

  run(context, callback = function () {}, args = []) {
    callback.apply(context, args);
  }

  each(obj, cb, isReturn = false) {
    if (this.isUndef(obj)) return;
    let i = 0,
        index = 0,
        newVal = [];

    const len = obj.length;

    if (this.isArray(obj)) {
      for (; i < len; i++) {
        if (isReturn) {
          newVal.push(cb(obj[i], i));
        } else {
          cb(obj[i], i);
        }
      }
    } else {
      for (i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (isReturn) {
          newVal.push(cb(obj[i], i, index++));
        } else {
          cb(obj[i], i, index++);
        }
      }
    }

    if (isReturn) return newVal;
  }

  definePropertyVal(obj, key, val) {
    Object.defineProperty(obj, key, {
      configurable: false,
      enumerable: false,
      value: val
    });
  }

  deepCopy(obj) {
    if (!obj || !(obj instanceof Array) && !(obj.toString() === "[object Object]")) return obj;
    const _obj = obj instanceof Array ? [] : {};
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      if (obj instanceof Array || obj instanceof Object) {
        _obj[key] = this.deepCopy(obj[key]);
      } else {
        _obj[key] = obj[key];
      }
    }
    return _obj;
  }

  extend(object, _object) {

    object = this.deepCopy(object);

    const oldObjKeys = this.each(object, (obj, key) => {
      return key;
    }, true);

    this.each(_object, (obj, key) => {

      const findIndexInOld = oldObjKeys.indexOf(key);
      if (findIndexInOld != -1) {
        oldObjKeys.splice(findIndexInOld, 1);
      }

      if (this.isPlainObject(obj)) {
        if (!object[key]) {
          object[key] = {};
        }
        this.extend(object[key], obj);
      }
      object[key] = obj;
    });

    this.each(oldObjKeys, key => {
      _object[key] = object[key];
    });

    return object;
  }

  cb(cb, context, args) {
    //回调
    args = args ? args : [];
    this.isFn(cb) ? cb.apply(context, args) : null;
  }

  unique(arr) {
    /*去重*/
    if (!this.isArray(arr)) return [];
    let newArray = [];
    this.each(arr, (item, index) => {
      if (newArray.indexOf(item) === -1) {
        newArray.push(item);
      }
    });
    return newArray;
  }

  trimArr(arr) {
    /*清空数组中空的值*/
    let newArr = [];
    this.each(arr, (item, index) => {
      if (item !== '') {
        newArr.push(item);
      }
    });
    return newArr;
  }

  serialize(data) {
    //初始化form数据
    let result = '';

    if (!this.isObj(data) || !this.isArr(data)) return '';

    this.each(data, (val, key) => {

      result = result + key + '=' + encodeURIComponent(val) + '&';
    });

    return result.substring(0, result.length - 1);
  }

  initRegExp(expr) {
    const tm = '\\/*.?+$^[](){}|\'\"';
    this.each(tm, (tmItem, index) => {
      expr = expr.replace(new RegExp('\\' + tmItem, 'g'), '\\' + tmItem);
    });
    return expr;
  }

  //执行函数
  run(cb, context, args) {
    this.cb(cb, context, args);
  }

  //把当前key-value复制到对应对象的key-value上
  copy(object, _object) {
    util.each(_object, (obj, key) => {
      object[key] = obj;
    });
  }

  //获取表达式
  getRegExp(expr) {
    const tm = '\\/*.?+$^[](){}|\'\"';
    this.each(tm, (tmItem, index) => {
      expr = expr.replace(new RegExp('\\' + tmItem, 'g'), '\\' + tmItem);
    });
    return expr;
  }

  getObjLen(obj) {
    let index = 0;
    this.each(obj, () => {
      ++index;
    });
    return index;
  }

  ajax(options) {
    //创建xhr
    const xhr = new XMLHttpRequest();
    //连接类型
    options.type = options.type ? options.type.toUpperCase() : 'GET';
    //超时
    xhr.timeout = options.timeout && options.async !== false ? options.timeout : 0;

    if (options.type === "GET") {

      xhr.open(options.type, (() => {

        return options.url.indexOf('?') ? options.url + this.serialize(options.data) : options.url + '?' + this.serialize(options.data);
      })(), options.async);
    } else if (options.type === "POST") {

      xhr.open(options.type, options.url, options.async);
    }
    xhr.setRequestHeader('Content-Type', options.contentType ? options.contentType : 'application/x-www-form-urlencoded; charset=UTF-8');
    //响应事件
    xhr.addEventListener('readystatechange', () => {
      let data;

      try {
        data = JSON.parse(xhr.responseText);
      } catch (e) {
        data = xhr.responseText;
      }

      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          this.cb(options.success, this, [data]);
        } else if (xhr.status >= 400) {
          this.cb(options.error, this, [data]);
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
}

//设置事件
Util.prototype.on = function () {
  if (!__WEBPACK_IMPORTED_MODULE_0__core_in_browser__["a" /* default */]) return;
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
Util.prototype.off = function () {
  if (!__WEBPACK_IMPORTED_MODULE_0__core_in_browser__["a" /* default */]) return;
  if (typeof document.removeEventListener === 'function') {
    return function off(el, type, cb) {
      el.removeEventListener(type, cb, false);
    };
  } else {
    return function off(el, type, cb) {
      el.detachEvent('on' + type, cb);
    };
  }
}();

const util = new Util();

/* harmony default export */ __webpack_exports__["a"] = (util);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 *  检测是否在浏览器的环境中 
 * */

const inBrowser = typeof window !== 'undefined';

/* harmony default export */ __webpack_exports__["a"] = (inBrowser);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = setRegExp;
/* harmony export (immutable) */ __webpack_exports__["a"] = compile;
/* harmony export (immutable) */ __webpack_exports__["b"] = replaceAlias;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__in_browser__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__include__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compile_regexp__ = __webpack_require__(3);
/*
 * 一堆解析模板的方法,tmpl的核心算法
 * */

//运行环境是否在浏览器

//常用的方法

//include

//extend


//模板正则配置


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

//设置正则
function setRegExp() {

  const open_tag = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].initRegExp(this.$config.open_tag),
        close_tag = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].initRegExp(this.$config.close_tag);
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
function compile() {
  //node中使用block
  if (!__WEBPACK_IMPORTED_MODULE_0__in_browser__["a" /* default */]) {
    __WEBPACK_IMPORTED_MODULE_3__block__["a" /* default */].call(this);
    /*清除遗留的block块*/
    clearBlock.call(this);
  }
  /*重新检查依赖里面有没有引入的数据*/
  replaceAlias.call(this);
  /*替换include中的内容*/
  __WEBPACK_IMPORTED_MODULE_2__include__["a" /* default */].call(this);
  /*解析script*/
  let script = this.$template.match(SCRIPT_REGEXP) || [];
  //设置占位
  const replaceScript = setSeize.call(this),
        echoString = replaceScript.split(/___SCRIPT___|___ECHO_SCRIPT___/),
        //拆分占位
  domString = [],
        longString = echoString.length > script.length ? echoString : script;

  //排除了运算和赋值表达式，处理直接输出的字符串
  __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].each(echoString, (_echoString, index) => {
    echoString[index] = "___.push(\"" + filterTransferredMeaning(_echoString) + "\");";
  });

  //这里是处理所有表达式内容
  __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].each(script, (_string, index) => {
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

  __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].each(longString, (_longString, index) => {
    //直接输出的dom结构
    if (__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].isStr(echoString[index])) {
      domString.push(echoString[index]);
    }
    //js的源码
    if (__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].isStr(script[index])) {
      domString.push(script[index].replace(__WEBPACK_IMPORTED_MODULE_4__compile_regexp__["e" /* FILTER_TRANFORM */], ""));
    }
  });

  this.vTmpl = 'with(this){try{var _this_ = tmpl,___ = [];' + domString.join('') + 'return ___.join("");}catch(e){console.warn(e);return "";}}';
};

/*替换别名的常量*/
function replaceAlias() {
  const constructor = this.constructor;
  __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].each(constructor.alias, (replaceAlias, alias) => {
    this.$template = this.$template.replace(new RegExp(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].initRegExp(alias), 'g'), replaceAlias);
  });
}

/*清除多余的block块*/
function clearBlock() {
  this.$template = this.$template.replace(__WEBPACK_IMPORTED_MODULE_4__compile_regexp__["d" /* EXTEND */], '').replace(__WEBPACK_IMPORTED_MODULE_4__compile_regexp__["a" /* BLOCK */], '');
}

//设置占位
function setSeize() {
  const replaceScript = this.$template.replace(ECHO_SCRIPT_REGEXP, '___ECHO_SCRIPT___').replace(SCRIPT_REGEXP, '___SCRIPT___');
  return replaceScript;
}

//过滤string中的引号
function filterTransferredMeaning(string) {
  //检查script的标签
  return string.replace(__WEBPACK_IMPORTED_MODULE_4__compile_regexp__["e" /* FILTER_TRANFORM */], '').replace(/\n/g, '\\n').replace(__WEBPACK_IMPORTED_MODULE_4__compile_regexp__["i" /* QUEST */], '\\\"');
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return FILTER_TRANFORM; });
/* unused harmony export SCRIPT_TAG */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return QUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return INCLUDE_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return INCLUDE_FILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return INCLUDE_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BLOCK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BLOCK_APPEND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return BLOCK_INSETR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return EXTEND; });
const FILTER_TRANFORM = /[\b\f\r\v]/g,
      //过滤转义字符  
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



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__in_browser__ = __webpack_require__(1);
//运行环境是否在浏览器


//在node环境中使用需要用到fs获取文件
let fs;

if (!__WEBPACK_IMPORTED_MODULE_0__in_browser__["a" /* default */]) {
  fs = __webpack_require__(11);
}

/* harmony default export */ __webpack_exports__["a"] = (fs);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = setInstance;
/* harmony export (immutable) */ __webpack_exports__["a"] = setEl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__in_browser__ = __webpack_require__(1);
//常用的方法

//运行环境是否在浏览器


//设置实例属性
function setInstance(type) {
  const get = this.$config[type];
  if (!__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].isObjcet(get)) {
    return;
  }
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(get, (_get, key) => {
    this[key] = _get;
  });
}

//设置this.$template
function setEl() {
  if (__WEBPACK_IMPORTED_MODULE_1__in_browser__["a" /* default */]) {
    try {
      return this.getEl(this.$config.template).innerHTML.trim();
    } catch (e) {
      return this.$config.template;
    }
  } else {
    return this.$config.template;
  }
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compatibility__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__instance__ = __webpack_require__(8);
//兼容性处理


//Tmpl 文件入口


(function (global, factory) {
  if (typeof demand === 'function' && typeof demand.define === 'function') demand.define('blue-tmpl', factory);else if (typeof _require === 'function' && typeof _require.define === 'function') _require.define('blue-tmpl', factory);
})(typeof window !== 'undefined' ? window : this, function () {
  return __WEBPACK_IMPORTED_MODULE_1__instance__["a" /* default */];
});

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__instance__["a" /* default */]);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__in_browser__ = __webpack_require__(1);
var _this = this;

//运行环境是否在浏览器


//兼容性IE8
(() => {
  //兼容IE8中 的indexOf
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = val => {
      for (let index = 0, len = _this.length; index < len; index++) {
        if (_this[index] === val) {
          return index;
        }
      }
      return -1;
    };
  }

  /*只在浏览器环境使用*/
  if (__WEBPACK_IMPORTED_MODULE_0__in_browser__["a" /* default */] && !document.getElementsByClassName) {
    document.getElementsByClassName = (className, el) => {
      const children = (el || document).getElementsByTagName('*'),
            elements = new Array();
      for (let i = 0; i < children.length; i++) {

        const child = children[i],
              classNames = child.className.split(' ');

        for (let j = 0; j < classNames.length; j++) {
          if (classNames[j] == className) {
            elements.push(child);
            break;
          }
        }
      }

      return elements;
    };
  }
})();

/* unused harmony default export */ var _unused_webpack_default_export = (true);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__init__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__render__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dom__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__compile_escape_code__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__set__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__alias__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__compile__ = __webpack_require__(2);
//tmpl的初始化

//处理模板数据的Render类

//常用的类方法

//Dom的操作

//config配置

//转义html

//set

//setAlias


//tmpl的render解析


class BlueTmpl extends __WEBPACK_IMPORTED_MODULE_3__dom__["a" /* default */] {
  //Tmpl构造
  constructor(opts) {
    super();
    this.$config = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].deepCopy(__WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */]), opts);
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
    __WEBPACK_IMPORTED_MODULE_7__alias__["a" /* setAlias */].call(this, paths);
  }

  //初始化对象
  init() {
    __WEBPACK_IMPORTED_MODULE_0__init__["a" /* default */].call(this);
  }

  //解析模板和数据
  render(state, stateName) {
    return new __WEBPACK_IMPORTED_MODULE_1__render__["a" /* default */]({
      tmpl: this,
      state,
      stateName
    });
  }

  //添加数据更新模板
  update() {
    this.$template = __WEBPACK_IMPORTED_MODULE_6__set__["a" /* setEl */].call(this);
    __WEBPACK_IMPORTED_MODULE_8__compile__["a" /* compile */].call(this);
    return this;
  }

  /*回调*/
  cb(cb) {
    __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].cb(cb, this);
    return this;
  }

  /*转义*/
  escape(escapeVal) {
    __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].each(__WEBPACK_IMPORTED_MODULE_5__compile_escape_code__["a" /* default */], (item, key) => {
      escapeVal = escapeVal.replace(new RegExp(key, 'g'), item);
    });
    return escapeVal;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BlueTmpl;


BlueTmpl.prototype.util = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */];

BlueTmpl.alias = {};

BlueTmpl.version = "v1.1.2";

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__compile__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__set__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router__ = __webpack_require__(13);
//常用的方法


//tmpl的render解析


//初始化设置


//router相关


function init() {
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].run(this.$config.create, this);
  this.$template = __WEBPACK_IMPORTED_MODULE_2__set__["a" /* setEl */].call(this);
  __WEBPACK_IMPORTED_MODULE_2__set__["b" /* setInstance */].call(this, 'methods');
  __WEBPACK_IMPORTED_MODULE_2__set__["b" /* setInstance */].call(this, 'data');
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].run(this.$config.created, this);

  //初始化路由
  __WEBPACK_IMPORTED_MODULE_3__router__["b" /* setRouter */].call(this);

  if (this.$template) {
    //创建配置的解析正则
    __WEBPACK_IMPORTED_MODULE_1__compile__["c" /* setRegExp */].call(this);
    //转化为js执行
    __WEBPACK_IMPORTED_MODULE_1__compile__["a" /* compile */].call(this);
  }
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].run(this.$config.events, this);
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].run(this.$config.mounted, this);
  __WEBPACK_IMPORTED_MODULE_3__router__["a" /* checkRouterStatus */].call(this);
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = replaceInclude;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__in_browser__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fs__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__compile_regexp__ = __webpack_require__(3);
//运行环境是否在浏览器

//常用的方法

//在node环境中使用需要用到fs获取文件


//模板正则配置


/*替换include引入的模板*/
function replaceInclude() {
  const include = (() => {
    if (__WEBPACK_IMPORTED_MODULE_0__in_browser__["a" /* default */]) {
      //在浏览器环境清空include[file]
      return __WEBPACK_IMPORTED_MODULE_3__compile_regexp__["h" /* INCLUDE_ID */];
    } else {
      //在node环境清空include[name]
      return __WEBPACK_IMPORTED_MODULE_3__compile_regexp__["g" /* INCLUDE_FILE */];
    }
  })();

  let includeTmpl, includeId;

  //去重
  includeTmpl = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].unique(this.$template.match(include));
  includeId = includeTmpl.toString().replace(include, "$2").split(',');

  //找不到include//查找的id和include匹配的数量必须相同
  if (includeTmpl.length === 0 || __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].trimArr(includeId).length === 0 || !(includeTmpl.length > 0 && includeId.length > 0 && includeId.length === includeTmpl.length)) return;

  __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].each(includeId, (id, index) => {
    const replaceIncludeRegExp = new RegExp(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].initRegExp(includeTmpl[index]), 'g');
    /*浏览器环境下执行*/
    if (__WEBPACK_IMPORTED_MODULE_0__in_browser__["a" /* default */]) {
      const el = this.getEl(id);
      if (el) {
        this.$template = this.$template.replace(replaceIncludeRegExp, this.html(el));
      } else {
        //找不到就清空原来的内容
        this.$template = this.$template.replace(replaceIncludeRegExp, '');
      }
    } else {
      /*node环境下执行*/
      try {
        const tmpl = __WEBPACK_IMPORTED_MODULE_2__fs__["a" /* default */].readFileSync(id, {
          encoding: 'UTF8'
        });

        this.$template = this.$template.replace(replaceIncludeRegExp, tmpl);
      } catch (e) {
        //找不到就清空原来的内容
        this.$template = this.$template.replace(replaceIncludeRegExp, '');
      }
    }
  });

  /*去掉重复的include*/
  includeTmpl = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].unique(this.$template.match(include));

  /*查找是否还有include的引入*/
  if (includeTmpl.length > 0) replaceInclude.call(this);

  /*清空错误的include*/
  this.$template = this.$template.replace(__WEBPACK_IMPORTED_MODULE_3__compile_regexp__["f" /* INCLUDE_ERROR */], '');
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = replaceBlock;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__compile__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fs__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__compile_regexp__ = __webpack_require__(3);
//常用的方法




//在node环境中使用需要用到fs获取文件


//模板正则配置


/*替换Block块内容*/
function replaceBlock() {
  //先设置获取include的引入模板
  __WEBPACK_IMPORTED_MODULE_1__compile__["b" /* replaceAlias */].call(this);

  const baseFile = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].unique(this.$template.match(__WEBPACK_IMPORTED_MODULE_3__compile_regexp__["d" /* EXTEND */])),

  /*只获取第一个base的名字*/
  baseFileName = baseFile.toString().replace(__WEBPACK_IMPORTED_MODULE_3__compile_regexp__["d" /* EXTEND */], "$2").split(',')[0];

  /*如果不存在block的内容，直接跳出*/
  if (baseFileName === '') return;

  //获取入口模板
  const blockTmpl = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].unique(this.$template.match(__WEBPACK_IMPORTED_MODULE_3__compile_regexp__["a" /* BLOCK */]));

  //获取继承的模板
  let layoutTmpl = __WEBPACK_IMPORTED_MODULE_2__fs__["a" /* default */].readFileSync(baseFileName, {
    encoding: 'UTF8'
  });

  //从继承模板中筛选出block
  const layoutTmplFindBlock = layoutTmpl.match(__WEBPACK_IMPORTED_MODULE_3__compile_regexp__["a" /* BLOCK */]) || [],
        layoutTmplFindBlockStr = layoutTmplFindBlock.toString(),
        baseBlockName = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].unique(layoutTmplFindBlockStr !== '' ? layoutTmplFindBlockStr.replace(__WEBPACK_IMPORTED_MODULE_3__compile_regexp__["a" /* BLOCK */], "$2").split(',') : []);

  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(baseBlockName, (name, index) => {

    const block = layoutTmplFindBlock[index],
          replaceBlock = new RegExp(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].initRegExp(block), 'g');

    let hasBlock = false;

    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(blockTmpl, blocktmpl => {

      __WEBPACK_IMPORTED_MODULE_3__compile_regexp__["a" /* BLOCK */].test(blocktmpl);

      const _name = RegExp.$2,
            blockContent = RegExp.$3;

      //匹配到name的
      if (name === _name) {
        layoutTmpl = layoutTmpl.replace(replaceBlock, blockContent);
        hasBlock = true;
      } else if (__WEBPACK_IMPORTED_MODULE_3__compile_regexp__["b" /* BLOCK_APPEND */].test(_name) && name === _name.replace(__WEBPACK_IMPORTED_MODULE_3__compile_regexp__["b" /* BLOCK_APPEND */], '')) {
        layoutTmpl = layoutTmpl.replace(replaceBlock, block.replace(__WEBPACK_IMPORTED_MODULE_3__compile_regexp__["a" /* BLOCK */], "$3") + blockContent);
        hasBlock = true;
      } else if (__WEBPACK_IMPORTED_MODULE_3__compile_regexp__["c" /* BLOCK_INSETR */].test(_name) && name === _name.replace(__WEBPACK_IMPORTED_MODULE_3__compile_regexp__["c" /* BLOCK_INSETR */], '')) {
        layoutTmpl = layoutTmpl.replace(replaceBlock, blockContent + block.replace(__WEBPACK_IMPORTED_MODULE_3__compile_regexp__["a" /* BLOCK */], "$3"));
        hasBlock = true;
      }

      __WEBPACK_IMPORTED_MODULE_3__compile_regexp__["a" /* BLOCK */].lastIndex = 0;
    });

    /*如果当前的block是在extends的模板中不存在，则显示默认里面的*/
    if (!hasBlock) {
      layoutTmpl = layoutTmpl.replace(replaceBlock, block.replace(__WEBPACK_IMPORTED_MODULE_3__compile_regexp__["a" /* BLOCK */], '$3'));
    }
  });

  this.$template = layoutTmpl;
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = setRouter;
/* harmony export (immutable) */ __webpack_exports__["a"] = checkRouterStatus;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/*路由相关*/

//常用的方法


//把路由实例挂靠到模板中
function setRouter() {
  if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].isObjcet(this.$config.router)) {
    this.constructor.router = this.$config.router;
  }
}

//检查路由状态
function checkRouterStatus() {
  //获取路由
  const router = this.constructor.router,
        status = this.$config.async;
  if (!(status === false) && router) {
    router.changeRoutereStatus(true);
  }
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__in_browser__ = __webpack_require__(1);
/*
 *  Render代理实例,针对tmpl中的数据流
 * */

//运行环境是否在浏览器


class Render {
    constructor(opts) {
        this.init(opts);
    }

    /*
    * 初始render类
    * */
    init(opts) {

        this.tmpl = opts.tmpl;

        this.state = opts.state || {};

        this.template = new Function('tmpl', this.tmpl.vTmpl).apply(this.state, [this.tmpl]);

        __WEBPACK_IMPORTED_MODULE_0__in_browser__["a" /* default */] ? this.fragment = this.tmpl.create(this.template) : null;
    }

    //在父节点中插入解析后的模板
    appendTo(el, cb) {

        const tmpl = this.tmpl,
              util = tmpl.util;

        if (el.nodeType === 1) el.appendChild(this.fragment);else tmpl.getEl(el).appendChild(this.fragment);

        util.cb(cb, this.tmpl);

        return tmpl;
    }

    //在el子节点ex中插入解析后的模板
    insertBefore(el, ex, cb) {

        const tmpl = this.tmpl,
              util = tmpl.util,
              _el = el.nodeType === 1 ? el : tmpl.getEl(el),
              _ex = el.nodeType === 1 ? ex : tmpl.getEl(ex);

        _el.insertBefore(this.fragment, _ex);

        util.cb(cb, tmpl);

        return tmpl;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Render);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
//常用的方法


//绑定相关函数
function bindFn(el, className, type) {

  const _className = el.className.split(' ');

  //替换
  if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].isObjcet(className) && (type == 'replaceBind' || type == 'replaceClass')) {
    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(className, (__className, key) => {
      var findIndex = _className.indexOf(key);
      if (findIndex != -1) _className[findIndex] = __className;
    });
  } else {
    //获得el中的className{type:string}
    className = className.split(' ');

    for (var index = 0; index < className.length; index++) {

      const findIndex = _className.indexOf(className[index]);

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
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].on(ele, type, event => {
    const ev = event || window.event,
          el = ev.target || ev.srcElement,
          eventType = ele.events[type];

    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(eventType, (_eventType, bind) => {

      if (!this.hasClass(el, bind)) return;

      __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(_eventType, (cb, index) => {

        cb.apply(this, [ev, el]);
      });
    });
  });
}

class Dom {
  getEl(exp) {

    //获取节点
    if (!exp) return null;

    if (!this.util.isFn(document.querySelector)) {
      return document.getElementById(exp);
    }

    const getEl = document.querySelector(exp),
          el = document.getElementById(exp);

    return getEl !== null ? getEl : el ? el : null;
  }

  getEls(exp) {

    //获取多个节点
    if (!exp) return null;

    if (!this.util.isFn(document.querySelectorAll)) {
      return document.getElementsByClassName(exp);
    }

    const getEls = document.querySelectorAll(exp),
          el = document.getElementsByClassName(exp);

    return getEls.length > 0 ? getEls : el ? el : [];
  }

  //绑定事件
  on(ele, exp, type, cb) {
    if (arguments.length === 4) {

      //初始化事件
      if (!ele.events) {
        ele.events = {};
      }

      if (!ele.events[type]) {
        //添加委托事件
        setEntrust.apply(this, [ele, type, cb]);
      }

      //查找现在的节点是否存在事件
      if (!ele.events[type]) {
        ele.events[type] = {};
      }

      //当前的事件是否有设置
      if (!ele.events[type][exp]) {
        ele.events[type][exp] = [];
      }

      //添加处理函数到事件列表中
      ele.events[type][exp].push(cb);
    } else if (arguments.length === 3) {
      cb = type;
      type = exp;
      __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].on(ele, type, event => {
        cb.call(this, event);
      });
    }

    return this;
  }

  //取消绑定事件
  off(ele, exp, type, cb) {
    if (arguments.length === 4) {
      var eventIndex = ele.events[type][exp].indexOf(cb);
      if (eventIndex != -1) {
        ele.events[type][exp].splice(eventIndex, 1);
      }
      if (ele.events[type][exp].length === 0) {
        __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].off(ele, type, cb);
      }
    } else if (arguments.length === 3) {
      /*删除事件*/
      __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].off(ele, type, cb);
    }
    return this;
  }

  //设置事件委托的class
  bind(el, bind) {
    bindFn.apply(this, [el, bind, 'bind']);
    return this;
  }

  //取消方法绑定
  unbind(el, bind) {
    bindFn.apply(this, [el, bind, 'unbind']);
    return this;
  }

  //替换绑定
  replaceBind(el, bind) {
    bindFn.apply(this, [el, bind, 'replaceBind']);
    return this;
  }

  //添加class
  addClass(el, className) {
    bindFn.apply(this, [el, className, 'addClass']);
    return this;
  }

  //删除class
  removeClass(el, className) {
    bindFn.apply(this, [el, className, 'removeClass']);
    return this;
  }

  //替换className
  replaceClass(el, className) {
    bindFn.apply(this, [el, className, 'replaceClass']);
    return this;
  }

  //是否存在class
  hasClass(el, className) {
    try {
      //节点中存在的className
      const _className = el.className.split(' '),

      //是否存在的className
      hasClassName = className.split(' ');

      let hasLen = 0;

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
  attr(el, attr) {
    if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].isObjcet(attr)) {

      __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(attr, (_attr, key) => {

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

      if (attr instanceof Array) {

        var attrs = [];

        __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(attr, (_attr, index) => {

          attrs.push(this.attr(el, _attr));
        });

        return attrs;
      } else if (/^bind-\S*/.test(attr)) {

        return new Function('return ' + el.getAttribute(attr) + ';').apply(this);
      } else {

        return el.getAttribute(attr);
      }
    }
  }

  //获取、设置prop属性
  prop(el, prop) {
    //设置节点属性
    if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].isObjcet(prop)) {
      __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(prop, (_prop, key) => {

        el[key] = _prop;
      });

      return this;
    } else if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].isStr(prop)) {
      //获得节点属性

      if (/^bind-\S*/.test(prop)) return new Function('return ' + el[prop] + ';').apply(this);

      return el[prop];
    }
  }

  //获取、设置html
  html(el, html) {
    if (html === undefined) return el.innerHTML;
    el.innerHTML = html;
    return this;
  }

  //获取、设置value
  val(el, val) {
    if (val === undefined) return el.value;
    el.value = val;
    return this;
  }

  //获取、设置textContent
  text(el, text) {
    if (text === undefined) return el.textContent;
    el.textContent = text;
    return this;
  }

  //查找符合的一个父级节点
  parent(el, hasClassName) {

    var parent = el.parentNode;

    if (parent === document || parent === null) return null;

    if (!hasClassName) return parent;

    if (this.hasClass(parent, hasClassName)) return parent;

    return this.parent(parent, hasClassName);
  }

  //超找所有符合的父元素
  parents(el, hasClassName, hasClassParent) {

    var parent = el.parentNode;

    hasClassParent = hasClassParent ? hasClassParent : [];

    if (parent === document || parent === null) return null;

    if (this.hasClass(parent, hasClassName)) hasClassParent.push(parent);

    this.parents(parent, hasClassName, hasClassParent);

    return hasClassParent;
  }

  //获取直接的当个子节点
  children(el) {
    const els = [];
    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(el.childNodes, child => {
      if (child.nodeType === 1) {
        els.push(child);
      }
    });
    return els;
  }

  //查找对应的class存在的节点
  childrens(el, className, hasClassChild) {
    var i = 0;
    hasClassChild = hasClassChild ? hasClassChild : [];
    for (; i < el.children.length; i++) {
      if (this.hasClass(el.children[i], className)) hasClassChild.push(el.children[i]);
      this.childrens(el.children[i], className, hasClassChild);
    }
    return hasClassChild;
  }

  //下一个节点
  next(el) {
    const nextEl = el.nextSibling;
    if (nextEl === null) return null;
    if (nextEl.nodeType !== 1) return this.next(nextEl);
    return nextEl;
  }

  //获取当前元素同级前的节点
  nextAll(el) {
    return this.siblings(el, 'nextAll');
  }

  //获取当前元素同级后的节点
  prevAll(el) {
    return this.siblings(el, 'prevAll');
  }

  //上一个节点
  prev(el) {
    const prevEl = el.previousSibling;
    if (prevEl === null) return null;
    if (prevEl.nodeType !== 1) return this.prev(prevEl);
    return prevEl;
  }

  //获取同级的兄弟节点
  siblings(el, type) {
    const parent = this.parent(el);

    if (parent === null) return null;

    const child = parent.children;

    const siblings = [];

    let i = 0;

    if (type === 'nextAll') i = Array.prototype.indexOf.call(child, el);

    for (; i < child.length; i++) {

      if (child[i] !== el) siblings.push(child[i]);

      if (type === 'prevAll' && child[i] === el) return siblings;
    }

    return siblings;
  }

  //显示
  hide(el, time) {

    var opacity = this.css(el, 'opacity');

    el.opacity = opacity ? opacity : 1;

    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].isNum(time) ? this.animate(el, {
      opacity: 0
    }, time, () => {
      el.style.display = 'none';
    }) : el.style.display = 'none';

    return this;
  }

  //隐藏
  show(el, time) {

    var opactiy = el.opactiy ? el.opactiy : 100;

    if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].isNum(time)) {

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
  toggle(el, time) {
    if (el.style.display === '') this.hide(el, time);else this.show(el, time);
  }

  /*动画*/
  animate(el, animate, time, cb) {

    if (!el) return;

    el.timer = setInterval(() => {

      let animateStatus = true;

      __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(animate, (val, type) => {

        let speed = 0,
            cssVal = 0;

        if (type === 'opacity') {

          cssVal = Number(this.css(el, 'opacity')) * 100;
        } else if (type === 'scrollTop') {

          cssVal = Math.ceil(document.documentElement.scrollTop || document.body.scrollTop);

          let maxScrollTop = Math.ceil(document.body.scrollHeight - window.innerHeight);

          if (val > maxScrollTop) {
            val = maxScrollTop;
            animate['scrollTop'] = maxScrollTop;
          }
        } else {
          cssVal = parseInt(this.css(el, type));
        }

        speed = (val - cssVal) / 8;

        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        const setVal = {};

        if (type === 'opacity') {
          setVal['opacity'] = (cssVal + speed) / 100;
          this.css(el, setVal);
        } else if (type === 'scrollTop') {
          this.setScrollTop(cssVal + speed);
        } else {
          setVal[type] = cssVal + speed + 'px';
          this.css(el, setVal);
        }

        if (parseInt(val) !== cssVal) {
          animateStatus = false;
        }
      });

      if (animateStatus) {
        clearInterval(el.timer);
        __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].cb(cb, this);
      }
    }, time / 60);
  }

  /*操作css*/
  css(el, css) {
    //获取css
    if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].isStr(css)) {
      return this.curCss(el, css);
    } else if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].isObjcet(css)) {
      //设置style
      this.setStyle(el, css);
      return this;
    }
  }

  /*处理驼峰和非驼峰*/
  camelCase(text, isCameCase) {
    let camelCases;

    const AZ = /[A-Z]/g,
          _AZ = /-[a-z]/g;

    if (!__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].isStr(text)) return text;

    camelCases = isCameCase ? text.match(_AZ) : text.match(AZ);

    camelCases = camelCases ? camelCases : [];

    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(camelCases, str => {
      if (isCameCase) text = text.replace(str, str.replace(/-/g, '').toUpperCase());else text = text.replace(str, '-' + str.toLowerCase());
    });

    return text;
  }

  /*获取计算好的值*/
  curCss(el, css) {

    let _css;

    if (window.getComputedStyle) {

      _css = this.camelCase(css, true);

      return window.getComputedStyle(el, null)[_css];
    } else if (document.documentElement.currentStyle) {

      _css = this.camelCase(css, false);

      return document.documentElement.currentStyle[_css];
    }
  }

  /*设置css*/
  setStyle(el, css) {

    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(css, (style, cssName) => {

      el.style[cssName] = style;
    });
  }

  /*删除节点*/
  remove(el) {
    try {
      el.remove();
    } catch (e) {
      const parent = this.parent(el);
      parent !== null ? parent.removeChild(el) : console.warn('element remove error!');
    }
    return this;
  }

  /*创建元素*/
  create(dom) {

    const fragment = document.createDocumentFragment();

    const tempEl = document.createElement('div');

    tempEl.innerHTML = dom;

    while (tempEl.childNodes.length !== 0) {

      let child = tempEl.childNodes[0];

      const childHtml = child.innerHTML;

      if (child.tagName === 'SCRIPT') {

        const newScript = document.createElement('script');

        newScript.innerHTML = childHtml;

        __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(child.attributes, attr => {

          if (!attr) true;

          newScript.setAttribute(attr.name, attr.value);
        });

        this.remove(child);

        child = newScript;
      }

      fragment.appendChild(child);
    }

    return fragment;
  }

  /*插入节点*/
  append(el, child) {

    if (el.nodeType === 1) el.appendChild(child);else this.getEl(el).appendChild(child);

    return this;
  }

  //取消冒泡
  preventDefault(event) {

    const ev = event || window.event;

    ev.stopPropagation();

    ev.cancelBubble = true;
  }

  //offset
  offset(el) {

    const box = el.getBoundingClientRect(),
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
  setScrollTop(top, animate) {

    document.body.scrollTop = top;

    document.documentElement.scrollTop = top;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Dom);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*配置信息*/
const config = {
  open_tag: "<%", //OPEN_TAG
  close_tag: "%>", //CLOSE_TAG,
  template: "",
  data: {},
  methods: {}
};

/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// html转义
const escapeCode = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

/* harmony default export */ __webpack_exports__["a"] = (escapeCode);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setAlias;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
//常用的类方法


function setAlias(paths, key = '') {

  if (!__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].isObjcet(paths)) return;

  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(paths, (path, _key) => {

    if (!path) return;

    const __key = key ? key + '.' + _key : _key;

    if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].isObjcet(path)) {
      setAlias.apply(this, [path, __key]);
    } else {
      this.alias[__key] = path;
    }
  });
}

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=blue-tmpl.js.map