/*!
 * 
 * tmpl-router.js v1.0.2
 * (c) 2016-2017 Blue
 * https://github.com/azhanging/tmpl
 * Released under the MIT License.
 *      
 */

(function(global, factory) {
	if(typeof _require === 'function') {
		_require.defineId('tmpl-router', factory);
	} else {
		(global ? (global.TmplRouter = factory()) : {});
	}
})(typeof window !== 'undefined' ? window : this, function() {

	/*默认配置*/
	var config = {
		routerLink: 'tmpl-router',
		activeClassName: 'tmpl-router-active',
		data: {},
		methods: {},
		error: function() {}
	}

	var _Tmpl = null;

	var tmpl = null;

	var fn = null;

	//设置路由参数
	function TmplRouter(opts) {
		this.init(opts);
	}

	//安装插件
	TmplRouter.install = function(Tmpl) {
		if(this.installed) return TmplRouter;

		this.installed = true;

		_Tmpl = Tmpl;

		tmpl = new _Tmpl({});

		fn = tmpl.fn;
	}

	//查看是否在全部中存在插件
	if(window.Tmpl) {
		TmplRouter.install(Tmpl);
	}

	//路由器原型
	TmplRouter.prototype = {
		constructor: TmplRouter,
		init: function(opts) {
			var _this = this;
			this.config = fn.extend(fn.copy(config), opts);
			this.router = this.config.router ? this.config.router : {};
			this.tmpl = tmpl;
			//设置methods
			setInstance.call(this, 'methods');
			//设置data
			setInstance.call(this, 'data');
			//处理别名内容
			setPaths.call(this);
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
			var hash = window.location.hash.replace('#', '');
			//获取路由绑定的节点
			var routerBtns = fn.getEls(this.config.routerLink);
			//存储hash点击的对象
			var alinkEl = null;
			//视图容器
			var viewEl = null;
			//处理回调
			var cb = null;
			//如果不存在hash设置为根目录
			if(hash === '') hash = '/';
			//判断是不是别名的路由
			if(this.alias[hash]) hash = this.alias[hash];
			//存在路由绑定
			if(routerBtns.length === 0) return this;
			//修改对应的状态
			fn.each(routerBtns, function(el, index) {

				var href = tmpl.attr(el, 'href').replace('#', '');

				var view = tmpl.attr(el, 'view');

				if(href === hash) {

					viewEl = fn.getEl(view);

					alinkEl = el;
					//路由回调
					cb = _this.router[hash]['cb'];

					tmpl.addClass(el, _this.config.activeClassName);

					fn.isEl(viewEl) ? (tmpl.show(viewEl)) : null;

					if(fn.isFn(cb)) cb.apply(_this, [el, viewEl, hash]);

				} else {
					viewEl = fn.getEl(view);

					tmpl.removeClass(el, _this.config.activeClassName);

					fn.isEl(viewEl) ? (tmpl.hide(viewEl)) : null;
				}
			});
			//error页面
			if(!this.alias[hash] && !this.router[hash]) this.config.error.call(this);
		},
		go: function(page) {

			if(fn.isNum(page)) history.go(1);

		},
		redirect: function(hash) {
			var href = location.href.split('#');
			if(hash === '/') {
				location.href = href[0];
			} else {
				href[1] = hash;
				location.href = href.join('#');
			}
		}
	}

	//处理路径
	function setPaths() {
		var _this = this;
		this.alias = {};
		this.paths = [];
		fn.each(this.config.router, function(router, path) {
			var alias = router.alias;
			_this.paths.push(path);
			//存在别名
			if(alias) {
				_this.alias[alias] = path;
			}
		});
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

	TmplRouter.version = 'v1.0.0';

	return TmplRouter;
});