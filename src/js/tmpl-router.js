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
		created: function() {},
		routerLink: 'tmpl-router', //.tmpl-router						
		activeClassName: 'tmpl-router-active', //.tmpl-router-active
		routerView: 'tmpl-router-view', //#tmpl-router-view
		data: {},
		methods: {},
		error: function() {}
	}

	var _Tmpl = null;

	var tmpl = null;

	var fn = null;
	
	var lastRouter = null;

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
			//视图容器
			var viewEl = fn.getEl(this.config.routerView);
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

				if(href === hash) {
					//动态加载模块
					_this.getTmpl(el, hash);
					//路由回调
					cb = _this.router[hash]['cb'];
					
					if(lastRouter){
						
						/*如果不是匹配的路由视图，则不显示在路由视图中*/
						fn.each(_this.router[lastRouter]['view'],function(el,index){
							_this.router[lastRouter]['temp'].appendChild(el);
						});
						
						_this.router[lastRouter]['view'] = [];
					}

					viewEl.appendChild(_this.router[href]['temp']);
					
					fn.each(tmpl.children(viewEl),function(el,index){
						_this.router[href]['view'].push(el);
					});
					
					tmpl.addClass(el, _this.config.activeClassName);
					
					if(fn.isFn(cb)) cb.apply(_this, [el, viewEl, hash]);
					
					lastRouter = hash;
					
				} else {
					
					/*如果不是匹配的路由视图，则不显示在路由视图中*/
					fn.each(_this.router[href]['view'],function(el,index){
						_this.router[href]['temp'].appendChild(el);
					});
					
					_this.router[href]['view'] = [];

					tmpl.removeClass(el, _this.config.activeClassName);
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
		},
		/*获取模板*/
		getTmpl: function(el, hash) {
			var _this = this;
			//查看当前的路由模板是否加载回来了
			if(this.router[hash]['temp'].childNodes.length > 0) return;
			//获取请求的url
			var tmplUrl = tmpl.attr(el, 'tmpl-url');
			tmpl.fn.ajax({
				url: tmplUrl,
				success: function(data) {
					_this.router[hash]['temp'].appendChild(tmpl.create(data.tmpl));
				}
			});
		}
	}

	//处理路径
	function setPaths() {
		var _this = this;
		this.alias = {};
		fn.each(this.config.router, function(router, path) {
			var alias = router.alias;
			/*设置视图节点*/
			_this.router[path]['view'] = [];
			/*设置临时存放节点*/
			_this.router[path]['temp'] = document.createDocumentFragment();
			//存在别名
			if(alias) {
				_this.alias[alias] = path;
			}
		});
	}

	//设置hash
	function setHashEvent() {
		var _this = this;
		if(!window.hasTmplRouter) {
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