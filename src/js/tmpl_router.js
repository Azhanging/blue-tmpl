(function() {
	var tmplRouterConfig = {
		routerLink: 'tmpl-router',
		activeClassName: 'tmpl-router-active',
		data: {},
		methods: {}
	}

	var tmpl = new Tmpl({});

	var fn = tmpl.fn;

	//设置路由参数
	Tmpl.Router = function(opts) {
		this.init(opts);
	}

	//路由器原型
	Tmpl.Router.prototype = {
		constructor: Tmpl.Router,
		init: function(opts) {
			var _this = this;
			this.config = fn.extend(fn.copy(tmplRouterConfig), opts);
			this.router = this.config.router ? this.config.router : {};
			this.tmpl = tmpl;
			//设置methods
			setInstance.call(this, 'methods');
			//设置data
			setInstance.call(this, 'data');
			//设置路由的className
			setRouterStatusClassName.call(this);
			//设置hash
			setHashEvent.call(this);
			//所有完毕后的钩子
			fn.run(this.config.mounted, this);
		},
		set: function(opts) {
			var _this = this;
			if(fn.isObj(opts)) {
				fn.each(opts, function(fn, key) {
					_this.router[key] = function(args) {
						fn.apply(_this, args);
					};
				});
			}
			return this;
		},
		//hash改变调用
		hashChange: function() {
			var _this = this;
			//获取hash
			var hash = window.location.hash;
			//获取路由绑定的节点
			var routerBtns = fn.getEls(this.routerLink);
			//存储hash点击的对象
			var alinkEl = null;
			//存在路由绑定
			if(routerBtns.length === 0) return this;
			//修改对应的状态
			fn.each(routerBtns, function(el, index) {

				var href = tmpl.attr(el, 'href');
				var view = tmpl.attr(el, 'view');
				var cb = null;
				var viewEl = null;

				if(href === hash) {
					viewEl = fn.getEl(view);
					alinkEl = el;
					tmpl.addClass(el, _this.activeClassName);
					tmpl.show(viewEl);
					cb = _this.router[hash];
					if(fn.isFn(cb)) {
						cb.apply(_this, [el, viewEl]);
					}
				} else {
					tmpl.removeClass(el, _this.activeClassName);
					tmpl.hide(fn.getEl(view));
				}
			});
		}
	}

	//设置路由className
	function setRouterStatusClassName() {
		//绑定路由链接router-link
		this.routerLink = this.config.routerLink;
		//选中绑定路由的class
		this.activeClassName = this.config.activeClassName;
	}

	//设置hash
	function setHashEvent() {
		var _this = this;
		if(!window.hasTmplRouter) {;
			//修改hash时触发修改
			fn.on(window, 'hashchange', function(event) {
				var hash = window.location.hash;
				_this.hashChange();
				tmpl.preventDefault(event);
			});
		}
	}

	//设置data和methods方法
	function setInstance(type) {
		var _this = this;

		var get = this.config[type];

		if(!fn.isObj(get)) {
			return;
		}

		fn.each(get, function(_get, key) {
			_this[key] = _get;
		});
	}
})();