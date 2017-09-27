//运行环境是否在浏览器
import inBrowser from './in_browser';
//常用的方法
import fn from './fn';

//绑定相关函数
function bindFn(el, className, type) {

	const _className = el.className.split(' ');

	//替换
	if(fn.isObj(className) && (type == 'replaceBind' || type == 'replaceClass')) {
		fn.each(className, (__className, key) => {
			var findIndex = _className.indexOf(key);
			if(findIndex != -1) _className[findIndex] = __className;
		});
	} else {
		//获得el中的className{type:string}
		className = className.split(' ');

		for(var index = 0; index < className.length; index++) {

			const findIndex = _className.indexOf(className[index]);

			if(type == 'bind' || type == 'addClass') {

				if(findIndex == -1) _className.push(className[index]);

			} else if(type == 'unbind' || type == 'removeClass') {

				if(findIndex != -1) _className.splice(findIndex, 1);

			}
		}
	}

	el.className = _className.join(' ');

	return this;
}

//设置主的委托事件
function setEntrust(ctx, type, cb) {
	fn.on(ctx, type, (event) => {
		const ev = event || window.event,

			el = ev.target || ev.srcElement,

			eventType = this.events[type];

		fn.each(eventType, (_eventType, bind) => {

			if(!this.hasClass(el, bind)) return;

			fn.each(_eventType, (cb, index) => {

				cb.apply(this, [ev, el]);

			});
		});

	});

	//添加委托事件
	this.eventType.push(type);
}

class Dom {
    getEl(exp) { //获取节点
        if(!exp) return null;
        if(!this.fn.isFn(document.querySelector))
            return document.getElementById(exp);
        const getEl = document.querySelector(exp),
            el = document.getElementById(exp);
        return getEl !== null ? getEl : (el ? el : null);
    }

    getEls(exp) { //获取多个节点
        if(!exp) return null;
        if(!this.fn.isFn(document.querySelectorAll))
            return document.getElementsByClassName(exp);
        const getEls = document.querySelectorAll(exp),
            el = document.getElementsByClassName(exp);
        return getEls.length > 0 ? getEls : (el ? el : []);
    }
	//绑定事件
	on(ctx, exp, type, cb) {
		if(arguments.length === 4) {
			if(this.eventType.indexOf(type) == -1)
				setEntrust.apply(this, [ctx, type, cb]);
			//查找现在的节点是否存在事件
			if(!this.events[type])
				this.events[type] = {};
			//当前的事件是否有设置
			if(!this.events[type][exp])
				this.events[type][exp] = [];
			//添加处理函数到事件列表中
			this.events[type][exp].push(cb);
		} else if(arguments.length === 3) {
			cb = type;
			type = exp;
			fn.on(ctx, type, (event) => {
				cb.call(this, event);
			});
		}

		return this;
	}

	//取消绑定事件
	off(ctx, exp, type, cb) {
		if(arguments.length === 4) {
			var eventIndex = this.events[type][exp].indexOf(cb);
			if(eventIndex != -1)
				this.events[type][exp].splice(eventIndex, 1);
		} else if(arguments.length === 3) {
			/*删除事件*/
			fn.off(ctx, type, cb);
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

			for(var index = 0; index < hasClassName.length; index++) {
				if(_className.indexOf(hasClassName[index]) !== -1) ++hasLen;
			}

			if(hasLen === hasClassName.length) return true;

			return false;

		} catch(e) {

			return false;

		}
	}

	//获取属性
	attr(el, attr) {
		if(fn.isObj(attr)) {

			fn.each(attr, (_attr, key) => {

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

				fn.each(attr, (_attr, index) => {

					attrs.push(this.attr(el, _attr));

				});

				return attrs;

			} else if(/^bind-\S*/.test(attr)) {

				return new Function('return ' + el.getAttribute(attr) + ';').apply(this);

			} else {

				return el.getAttribute(attr);

			}
		}
	}

	//获取、设置prop属性
	prop(el, prop) {
		//设置节点属性
		if(fn.isObj(prop)) {
			fn.each(prop, (_prop, key) => {

				el[key] = _prop;

			});

			return this;

		} else if(fn.isStr(prop)) { //获得节点属性

			if(/^bind-\S*/.test(prop))

				return new Function('return ' + el[prop] + ';').apply(this);

			return el[prop];

		}
	}

	//获取、设置html
	html(el, html) {
		if(html === undefined) return el.innerHTML;
		el.innerHTML = html;
		return this;
	}

	//获取、设置value
	val(el, val) {
		if(val === undefined) return el.value;
		el.value = val;
		return this;
	}

	//获取、设置textContent
	text(el, text) {
		if(text === undefined) return el.textContent;
		el.textContent = text;
		return this;
	}

	//查找符合的一个父级节点
	parent(el, hasClassName) {

		var parent = el.parentNode;

		if(parent === document || parent === null) return null;

		if(!hasClassName) return parent;

		if(this.hasClass(parent, hasClassName)) return parent;

		return this.parent(parent, hasClassName);

	}

	//超找所有符合的父元素
	parents(el, hasClassName, hasClassParent) {

		var parent = el.parentNode;

		hasClassParent = (hasClassParent ? hasClassParent : []);

		if(parent === document || parent === null) return null;

		if(this.hasClass(parent, hasClassName)) hasClassParent.push(parent);

		this.parents(parent, hasClassName, hasClassParent);

		return hasClassParent;
	}

	//获取直接的当个子节点
	children(el) {
		const els = [];
		fn.each(el.childNodes, (child) => {
			if(child.nodeType === 1) {
				els.push(child);
			}
		});
		return els;
	};

	//查找对应的class存在的节点
	childrens(el, className, hasClassChild) {
		var i = 0;
		hasClassChild = (hasClassChild ? hasClassChild : []);
		for(; i < el.children.length; i++) {
			if(this.hasClass(el.children[i], className)) hasClassChild.push(el.children[i]);
			this.childrens(el.children[i], className, hasClassChild);
		}
		return hasClassChild;
	}

	//下一个节点
	next(el) {
		const nextEl = el.nextSibling;
		if(nextEl === null) return null;
		if(nextEl.nodeType !== 1) return this.next(nextEl);
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
		if(prevEl === null) return null;
		if(prevEl.nodeType !== 1) return this.prev(prevEl);
		return prevEl;
	}

	//获取同级的兄弟节点
	siblings(el, type) {
		const parent = this.parent(el);

		if(parent === null) return null;

		const child = parent.children;

		const siblings = [];

		let i = 0;

		if(type === 'nextAll')
			i = Array.prototype.indexOf.call(child, el);

		for(; i < child.length; i++) {

			if(child[i] !== el) siblings.push(child[i]);

			if(type === 'prevAll' && child[i] === el) return siblings;

		}

		return siblings;
	}

	//显示
	hide(el, time) {

		var opacity = this.css(el, 'opacity');

		el.opacity = opacity ? opacity : 1;

		fn.isNum(time) ? (this.animate(el, {
			opacity: 0
		}, time, () => {
			el.style.display = 'none';
		})) : el.style.display = 'none';

		return this;
	}

	//隐藏
	show(el, time) {

		var opactiy = el.opactiy ? el.opactiy : 100;

		if(fn.isNum(time)) {

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
		if(el.style.display === '') this.hide(el, time);
		else this.show(el, time);
	}

	/*动画*/
	animate(el, animate, time, cb) {

		if(!el) return;

		el.timer = setInterval(() => {

			let animateStatus = true;

			fn.each(animate, (val, type) => {

				let speed = 0,
					cssVal = 0;

				if(type === 'opacity') {

					cssVal = Number(this.css(el, 'opacity')) * 100;

				} else if(type === 'scrollTop') {

					cssVal = Math.ceil(document.documentElement.scrollTop || document.body.scrollTop);

					let maxScrollTop = Math.ceil(document.body.scrollHeight - window.innerHeight);

					if(val > maxScrollTop) {
						val = maxScrollTop;
						animate['scrollTop'] = maxScrollTop;
					}

				} else {
					cssVal = parseInt(this.css(el, type));
				}

				speed = (val - cssVal) / 8;

				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

				const setVal = {};

				if(type === 'opacity') {
					setVal['opacity'] = (cssVal + speed) / 100;
					this.css(el, setVal);
				} else if(type === 'scrollTop') {
					this.setScrollTop(cssVal + speed);
				} else {
					setVal[type] = cssVal + speed + 'px';
					this.css(el, setVal);
				}

				if(parseInt(val) !== cssVal) {
					animateStatus = false;
				}
			});

			if(animateStatus) {
				clearInterval(el.timer);
				fn.cb(cb, this);
			}

		}, time / 60);
	}

	/*操作css*/
	css(el, css) {
		//获取css
		if(fn.isStr(css)) {
			return this.curCss(el, css);
		} else if(fn.isObj(css)) {
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

		if(!fn.isStr(text)) return text;

		camelCases = isCameCase ? text.match(_AZ) : text.match(AZ);

		camelCases = camelCases ? camelCases : [];

		fn.each(camelCases, (str, index) => {
			if(isCameCase) text = text.replace(str, str.replace(/-/g, '').toUpperCase());
			else text = text.replace(str, '-' + str.toLowerCase());
		});

		return text;
	}

	/*获取计算好的值*/
	curCss(el, css) {

		let _css;

		if(window.getComputedStyle) {

			_css = this.camelCase(css, true);

			return window.getComputedStyle(el, null)[_css];

		} else if(document.documentElement.currentStyle) {

			_css = this.camelCase(css, false);

			return document.documentElement.currentStyle[_css];

		}
	}

	/*设置css*/
	setStyle(el, css) {

		fn.each(css, (style, cssName) => {

			el.style[cssName] = style;

		});
	}

	/*删除节点*/
	remove(el) {
		try {
			el.remove();
		} catch(e) {
			const parent = this.parent(el);
			parent !== null ? parent.removeChild(el) : (console.warn('element remove error!'));
		}
		return this;
	}

	/*创建元素*/
	create(dom) {

		const fragment = document.createDocumentFragment();

		const tempEl = document.createElement('div');

		tempEl.innerHTML = dom;

		while(tempEl.childNodes.length !== 0) {

			let child = tempEl.childNodes[0];

			const childHtml = child.innerHTML;

			if(child.tagName === 'SCRIPT') {

				const newScript = document.createElement('script');

				newScript.innerHTML = childHtml;

				fn.each(child.attributes, (attr) => {

					if(!attr) true;

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

		if(el.nodeType === 1) el.appendChild(child);

		else fn.getEl(el).appendChild(child);

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

export default Dom;