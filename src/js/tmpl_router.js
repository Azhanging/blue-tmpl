(function() {
	var tmplRouterConfig = {
		routerLink: 'tmpl-router',
		activeClassName: 'tmpl-router-active',
		data: {},
		methods: {}
	}

	//(单例)
	var hasRouter = false;

	var tmpl = new Tmpl({});

	var fn = tmpl.fn;

	//设置路由参数
	Tmpl.Router = function(opts) {
		//如果已经挂在了全局的路由，则不设置新的事件监听
		if(hasRouter) return {};
		this.init(opts);
	}

	//路由器原型
	Tmpl.Router.prototype = {
		constructor: Tmpl.Router,
		init: function(opts) {
			var _this = this;
			this.config = fn.extend(fn.copy(tmplRouterConfig), opts);
			//设置methods
			setInstance.call(this, 'methods');
			//设置data
			setInstance.call(this, 'data');
			//设置路由的className
			setRouterStatusClassName.call(this);
			//设置hash
			setHashEvent.call(this);
			//改变路由状态
			hasRouter = true;
		},
		//hash改变调用
		hashChange: function() {
			var _this = this;
			//获取hash
			var hash = window.location.hash;
			//获取路由绑定的节点
			var routerBtns = fn.getEls(_this.routerLink);
			//存储hash点击的对象
			var alinkEl = null;
			//存在路由绑定
			if(routerBtns.length === 0) return this;
			//修改对应的状态
			fn.each(routerBtns, function(router, index) {
				var href = tmpl.attr(router, 'href');
				if(href === hash) {
					alinkEl = router;
					tmpl.addClass(router, _this.activeClassName);
					tmpl.show(fn.getEl(hash.replace('#', '')));
				} else {
					tmpl.removeClass(router, _this.activeClassName);
					tmpl.hide(fn.getEl(href.replace('#', '')));
				}
			});
		}
	}
	
	//设置路由className
	function setRouterStatusClassName(){
		//绑定路由链接router-link
		this.routerLink = this.config.routerLink;
		//选中绑定路由的class
		this.activeClassName = this.config.activeClassName;
	}

	//设置hash
	function setHashEvent() {
		var _this = this;
		//修改hash时触发修改
		fn.on(window, 'hashchange', function(event) {
			_this.hashChange();
			tmpl.preventDefault(event);
		});

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