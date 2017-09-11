//运行环境是否在浏览器
import inBrowser from './in_browser';
/*常用的方法*/
class Fn {
	isArr(array) {
		return array instanceof Array || !!(array && array.length);
	}
	
	isObj(obj) {
		return obj instanceof Object && !(obj instanceof Array) && obj !== null;
	}
	
	isFn(fn) {
		return typeof fn === 'function';
	}
	isStr(string) {
		return typeof string === 'string';
	}

	isNum(num) {
		return typeof num === 'number' || !isNaN(num);
	}

	isEl(el) {
		return !!(el && el.nodeType);
	}

	each(obj, cb) { //遍历
		let i = 0,
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
	}

	getEl(exp) { //获取节点
		if(!exp) return null;
		if(!this.isFn(document.querySelector))
			return document.getElementById(exp);
		const getEl = document.querySelector(exp),
			el = document.getElementById(exp);
		return getEl !== null ? getEl : (el ? el : null);
	}

	getEls(exp) { //获取多个节点
		if(!exp) return null;
		if(!this.isFn(document.querySelectorAll))
			return document.getElementsByClassName(exp);
		const getEls = document.querySelectorAll(exp),
			el = document.getElementsByClassName(exp);
		return getEls.length > 0 ? getEls : (el ? el : []);
	}

	extend(obj, options) { //合并
		this.each(options, (option, key) => {
			obj[key] = option;
		});
		return obj;
	}

	cb(cb, context, args) { //回调
		args = args ? args : [];
		this.isFn(cb) ? (cb.apply(context, args)) : null;
	}

	run(cb, context, args) { //执行函数
		this.cb(cb, context, args);
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

	copy(obj) { /*深拷贝*/
		if(this.isObj(obj) || this.isArr(obj))
			return JSON.parse(JSON.stringify(obj));
		return null;
	}

	ajax(options) {
		//创建xhr
		const xhr = new XMLHttpRequest();
		//连接类型
		options.type = (options.type ? options.type.toUpperCase() : 'GET');
		//超时
		xhr.timeout = options.timeout && options.async !== false ? options.timeout : 0;

		if(options.type === "GET") {
		    
			xhr.open(options.type, (() => {
			    
				return options.url.indexOf('?') ?
					options.url + this.serialize(options.data) :
					options.url + '?' + this.serialize(options.data);
					
			})(), options.async);
			
		} else if(options.type === "POST") {
		    
			xhr.open(options.type, options.url, options.async);
			
		}
		xhr.setRequestHeader('Content-Type', options.contentType ?
			options.contentType :
			'application/x-www-form-urlencoded; charset=UTF-8');
		//响应事件
		xhr.addEventListener('readystatechange', () => {
		    let data;
		    
			try {
				data = JSON.parse(xhr.responseText);
			} catch(e) {
				data = xhr.responseText;
			}
			
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					this.cb(options.success, this, [data]);
				} else if(xhr.status >= 400) {
					this.cb(options.error, this, [data]);
				}
			}
		}, false);

		//send指令
		if(options.type === "GET") {
		    
			xhr.send();
			
		} else if(options.type === "POST") {
		    
			xhr.send(this.serialize(options.data));
			
		}
	}

	serialize(data) { //初始化form数据
		let result = '';
		
		if(!this.isObj(data) || !this.isArr(data)) return '';
		
		this.each(data, (val, key) => {
		    
			result = result + key + '=' + encodeURIComponent(val) + '&';
			
		});
		
		return result.substring(0, result.length - 1);
	}
}

//设置事件
Fn.prototype.on = (function() {
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
Fn.prototype.off = (function() {
    if(!inBrowser) return;
    if(typeof document.removeEventListener === 'function') {
        return function off(el, type, cb) {
            el.addEventListener(type, cb, false);
        }
    } else {
        return function off(el, type, cb) {
            el.detachEvent('on' + type, cb);
        };
    }
})();

export default new Fn();
