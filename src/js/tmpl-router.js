/*!
 * 
 * tmpl-router.js v1.0.1
 * (c) 2016-2017 Blue
 * https://github.com/azhanging/tmpl
 * Released under the MIT License.
 *      
 */

(function(global, factory) {
	if(typeof _require === 'function') {
		_require.defineId('tmpl-router', factory);
	} else if(typeof exports === 'object' && typeof module === 'object') {
		module.exports = factory();
	} else if(typeof define === 'function' && define.amd) {
		define("tmpl-router", [], factory);
	} else {
		(global ? (global.TmplRouter = factory()) : {});
	}
})(typeof window !== 'undefined' ? window : this, function() {

	/*默认配置*/
	var config = {
		routerLink: 'tmpl-router', //.tmpl-router						
		routerLinkActive: 'tmpl-router-active', //.tmpl-router-active
		routerView: 'tmpl-router-view', //#tmpl-router-view
		routerAnchor: 'tmpl-router-anchor', //锚点用的class
		data: {},
		methods: {}
	};

	var _Tmpl = null;

	var tmpl = null;

	var fn = null;

	var lastRouter = null;

	//设置路由参数
	function TmplRouter(opts) {

		if(window.hasTmplRouter) return {};

		this.init(opts);
	}

	//安装插件
	TmplRouter.install = function(Tmpl) {
		if(this.installed) return TmplRouter;

		this.installed = true;

		_Tmpl = Tmpl;

		tmpl = new _Tmpl({});

		fn = tmpl.fn;
	};

	//查看是否在全部中存在插件
	if(window.Tmpl) {
		TmplRouter.install(Tmpl);
	}

	//路由初始
	TmplRouter.prototype.init = function(opts) {

		var _this = this;

		this.router = {};

		this.config = fn.extend(fn.copy(config), opts);

		setRouter.call(this, this.config.router ? this.config.router : {});

		this.tmpl = tmpl;

		setInstance.call(this, 'methods'); //设置methods

		setInstance.call(this, 'data'); //设置data

		setRouterStatus.call(this); //设置路由链接的状态

		setRouterAnchor.call(this); //设置路由的锚点形式

		keepLive.call(this); //设置保持状态

		setPaths.call(this, this.router); //处理路由详情 

		setHashEvent.call(this); //设置hash

		fn.run(this.config.created, this); //所有创建后的钩子

		this.hashChange(); //初始化好了初始化hash

		fn.run(this.config.mounted, this); //所有完毕后的钩子

	};

	/*设置路由路径*/
	TmplRouter.prototype.set = function(routerOpts) {
		var _this = this;
		if(fn.isObj(routerOpts)) {
			fn.each(routerOpts, function(opt, key) {
				_this.router[key] = opt;
			});
		}
		//设置路由配置
		setPaths.call(this, routerOpts);
		return this;
	};

	//hash改变调用
	TmplRouter.prototype.hashChange = function() {

		var path = window.location.hash.replace('#', '');

		var hash = this.getHash(path); //获取hash

		var search = this.search(path); //获取参数

		var routerBtns = fn.getEls(this.config.routerLink); //获取路由绑定的节点

		var viewEl = fn.getEl(this.config.routerView); //视图容器

		var hasAlias = false; //是否有别名

		if(hash === '') hash = '/'; //如果不存在hash设置为根目录

		if(this.alias[hash]) {
			hasAlias = true;
			hash = getPathAlias.apply(this, [(hash === '/' ? hash : path), viewEl, null]); //判断是不是别名的路由	
		}

		if(routerBtns.length === 0) return this; //存在路由绑定

		if(!this.alias[hash] && !this.router[hash]) { //error页面
			fn.run(this.config.error, this);
			return;
		}

		/*路由进入的钩子*/
		fn.run(this.config.routerEnter, this, [path, viewEl]);

		/*修改路由状态*/
		if(this.router[hash]['routerStatus'] !== undefined) {
			this.routerStatus = true;
		}

		/*如果是存在别名路径，返回代理的那个路径*/
		hashChange.apply(this, [routerBtns, (hasAlias ? hash : path), viewEl]);
	};

	TmplRouter.prototype.go = function(page) {
		if(fn.isNum(page)) history.go(page);
	};

	TmplRouter.prototype.redirect = function(hash) {
		hash = hash.replace('#', '');
		var href = location.href.split('#');
		if(hash === '/') {
			location.href = href[0];
		} else {
			href[1] = hash;
			location.href = href.join('#');
		}
	};

	/*获取模板*/
	TmplRouter.prototype.getTmpl = function(el, hash) {
		var _this = this;

		if((!this.router[hash]) || this.router[hash]['temp'].childNodes.length > 0 || this.router[hash]['view'].length > 0) return; //查看当前的路由模板是否加载回来了

		var tmplUrl = this.router[hash]['tmplUrl']; //获取请求的url

		var tmplId = this.router[hash]['tmplId']; //获取静态模板的id

		/*动态模板*/
		if(tmplUrl) {
			tmpl.fn.ajax({
				async: false,
				url: tmplUrl,
				success: function(data) {
					_this.router[hash]['temp'].appendChild(tmpl.create(data.tmpl));
					filterTextNode.call(this, _this.router[hash]['temp']);
					_this.routerStatus = false;
				},
				error: function(data) {
					_this.routerStatus = true;
				}
			});
		} else if(tmplId) {
			try {
				_this.router[hash]['temp'].appendChild(tmpl.create(tmpl.html(fn.getEl(tmplId)))); //非动态模板	
			} catch(e) {
				_this.router[hash]['temp'].appendChild(tmpl.create(''));
			}
			_this.routerStatus = true;
		}
	};

	/*获取参数*/
	TmplRouter.prototype.query = function(searchs) {
		if(!fn.isStr(search)) return {};
		var query = {};
		var search = searchs.split('&');
		fn.each(search, function(_search, index) {
			var temp = _search.split('=');
			if(temp.length !== 1) {
				var key = temp[0];
				var value = temp[1];
				query[key] = value;
			}
		});
		return query;
	};

	/*获取参数*/
	TmplRouter.prototype.search = function(el, search) {
		try {
			var path = tmpl.attr(el, 'href').split('?');
		} catch(e) {
			var path = el.split('?');
		}

		if(search) {
			if(fn.isObj(search)) {
				search = fn.serialize(search);
			}
			path[1] = search;
			tmpl.attr(el, {
				href: path.join('?')
			});
		} else {
			return path[1];
		}
	};

	/*获取hash，不带参数*/
	TmplRouter.prototype.getHash = function(hash) {
		var path = '';
		path = hash.replace('#', '').split('?');
		return path[0];
	};

	/*设置路由的状态是够允许跳转*/
	function setRouterStatus() {
		var _this = this;
		
		this.routerStatus = true;
		
		var routerBtns = fn.getEls(this.config.routerLink); //获取路由绑定的节点
		
		fn.each(routerBtns, function(routerBtn, index) {
			fn.on(routerBtn, 'click', function(event) {
				if(!_this.routerStatus) event.preventDefault();
			});
		});
	}

	/*设置路由的锚点形式*/
	function setRouterAnchor() {
		var _this = this;
		//获取路由绑定的节点
		tmpl.on(document, this.config.routerAnchor, 'click', function(event, el) {

			var anchorId = tmpl.attr(el, 'tmpl-anchor');
			
			var anchorOffsetTop = tmpl.attr(el, 'tmpl-anchor-top');
			
			anchorOffsetTop = fn.isNum(anchorOffsetTop) ? Number(anchorOffsetTop) : 0;

			var anchorEl = fn.getEl(anchorId);
			
			if(fn.isEl(anchorEl)) {
				tmpl.animate(document,{
				    'scrollTop':tmpl.offset(anchorEl).top + anchorOffsetTop    
				},1000);
			}
		});
	}

	/*设置路由的路径*/
	function setRouter(routers, path) {
		var _this = this;
		var _path = (path ? path : '');
		fn.each(routers, function(router, key) {
			if(fn.isObj(router.modules)) {
				setRouter.apply(_this, [router.modules, _path + key]);
			}

			_this.router[_path + key] = router;

			delete router['modules'];
		});
	}

	/*hashChange的处理*/
	function hashChange(routerBtns, path, viewEl) {
		var _this = this;

		var alinkEl = null;

		var hash = this.getHash(path);

		//修改对应的状态
		fn.each(routerBtns, function(el, index) {

			var path = tmpl.attr(el, 'href');

			var href = _this.getHash(path);

			var search = _this.search(path);

			if(href === hash) {

				_this.currentRouter = href; //保存当前的路由

				alinkEl = el; //保存按钮节点

				_this.getTmpl(el, hash); //默认动态加载模块

				//是否存在最后一个路由地址
				if(lastRouter) {
					/*如果不是匹配的路由视图，则不显示在路由视图中*/
					hideTmplEl.call(_this, lastRouter);
				}

				showTmplEl.apply(_this, [href, viewEl]);

				tmpl.addClass(el, _this.config.routerLinkActive); //修改路由link的样式

				lastRouter = hash; //记录最后的路由路径

				/*是否使用了保存之前的状态*/
				if(_this.config.keepLive && _this.router[href]['keepLive'])
					setScrollTop.call(this, _this.router[href]['scrollTop']);
				else
					setScrollTop.call(this, 0);
			} else {
				/*存在配置路由*/
				if(_this.router[href])
					hideTmplEl.call(_this, href); //如果不是匹配的路由视图，则不显示在路由视图中
				tmpl.removeClass(el, _this.config.routerLinkActive);
			}

			/*如果设置的节点没有绑定到对应的节点上*/
			if(!alinkEl)
				_this.currentRouter = hash;

		});

		fn.run(this.config.routerEntered, this, [path, viewEl, alinkEl]);
	}

	/*设置保持状态*/
	function keepLive() {
		var _this = this;
		if(!this.config.keepLive) return;
		fn.on(window, 'scroll', function(event) {
			if(_this.router[_this.currentRouter] && _this.router[_this.currentRouter]['keepLive'])
				_this.router[_this.currentRouter]['scrollTop'] = document.body.scrollTop || document.documentElement.scrollTop;
		});
	}

	/*设置scrollTop*/
	function setScrollTop(num) {
		if(!fn.isNum(num)) return 0;
		try {
			document.body.scrollTop = parseFloat(num);
		} catch(e) {
			document.documentElement.scrollTop = parseFloat(num);
		}
	}

	/*保存节点信息*/
	function hideTmplEl(hash) {
		var _this = this;
		/*如果不是匹配的路由视图，则不显示在路由视图中*/
		fn.each(_this.router[hash]['view'], function(el, index) {
			_this.router[hash]['temp'].appendChild(el);
		});
		this.router[hash]['view'] = [];
	}

	/*显示节点信息*/
	function showTmplEl(hash, viewEl) {
		var _this = this;
		viewEl.appendChild(this.router[hash]['temp']); //更新view层
		fn.each(tmpl.children(viewEl), function(el, index) { //保存view层节点
			_this.router[hash]['view'].push(el);
		});
	}

	/*检查当前路径是否存在别名*/
	function getPathAlias(path, viewEl, el) {
		var hash = this.getHash(path);
		var alias = this.alias[hash];
		var cb = null;
		if(this.router[hash]) {
			fn.run(this.config.routerEnter, this, [path, viewEl, el]);

			/*修改路由状态*/
			if(this.router[hash]['routerStatus'] !== undefined) {
				this.routerStatus = true;
			}

			fn.run(this.config.routerEntered, this, [path, viewEl, el]);

		}
		if(this.alias[alias]) {
			return getPathAlias.apply(this, [alias, viewEl, el]);
		} else return alias;
	}

	/*清空空的文本节点*/
	function filterTextNode(parentEl) {
		fn.each(parentEl.childNodes, function(el, index) {
			if(el.nodeType === 3 && el.textContent.trim() === '') {
				tmpl.remove(el);
			}
		});
	}

	//初始处理路由信息
	function setPaths(routes) {
		var _this = this;
		this.alias = {};
		fn.each(routes, function(router, path) {
			var alias = router.alias;

			_this.router[path]['view'] = []; //设置视图节点

			//如果设置了全局的keepLive，就会默认设置保持节点为true,全局设定状态的时候是支持保持状态的
			if(_this.config.keepLive && _this.router[path]['keepLive'] === undefined) {
				_this.router[path]['keepLive'] = true;
			}

			_this.router[path]['temp'] = document.createDocumentFragment(); //设置临时存放节点

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
			window.hasTmplRouter = true;
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

	TmplRouter.version = 'v1.0.1';

	return TmplRouter;
});