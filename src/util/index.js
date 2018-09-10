import inBrowser from "../core/in_browser";

class Util{

  nullPlainObject(val){
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
    return val && val !== null && (val.toString() === '[object Object]');
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

  run(context, callback = function () {
  }, args = []) {
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
      if ((obj instanceof Array) || (obj instanceof Object)) {
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

    this.each(oldObjKeys, (key) => {
      _object[key] = object[key];
    });

    return object;
  }

  cb(cb, context, args) { //回调
    args = args ? args : [];
    this.isFn(cb) ? (cb.apply(context, args)) : null;
  }

  unique(arr) { /*去重*/
    if(!this.isArr(arr)) return [];
    let newArray = [];
    this.each(arr, (item, index) => {
      if(newArray.indexOf(item) === -1) {
        newArray.push(item);
      }
    });
    return newArray;
  }

  trimArr(arr) { /*清空数组中空的值*/
    let newArr = [];
    this.each(arr, (item, index) => {
      if(item !== '') {
        newArr.push(item);
      }
    });
    return newArr;
  }

  serialize(data) { //初始化form数据
    let result = '';

    if(!this.isObj(data) || !this.isArr(data)) return '';

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
    this.each(obj,()=>{
      ++index;
    });
    return index;
  }
}

//设置事件
Util.prototype.on = (function () {
  if(!inBrowser) return;
  if(typeof document.addEventListener === 'function') {
    return function on(el, type, cb) {
      el.addEventListener(type, cb, false);
    }
  } else {
    return function on(el, type, cb) {
      el.attachEvent('on' + type, cb);
    };
  }
})();

//移除事件
Util.prototype.off = (function () {
  if(!inBrowser) return;
  if(typeof document.removeEventListener === 'function') {
    return function off(el, type, cb) {
      el.removeEventListener(type, cb, false);
    }
  } else {
    return function off(el, type, cb) {
      el.detachEvent('on' + type, cb);
    };
  }
})();

const util = new Util();


export default util;
