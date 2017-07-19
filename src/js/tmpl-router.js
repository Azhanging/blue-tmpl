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

			this.router = {};

			setRouter.call(this, this.config.router ? this.config.router : {});

			this.tmpl = tmpl;

			setInstance.call(this, 'methods'); //设置methods

			setInstance.call(this, 'data'); //设置data

			setPaths.call(this, this.router); //处理别名内容 

			setHashEvent.call(this); //设置hash

			this.hashChange(); //初始化好了初始化hash

			fn.run(this.config.mounted, this); //所有完毕后的钩子
		},
		/*设置路由路径*/
		set: function(routerOpts) {
			var _this = this;
			if(fn.isObj(routerOpts)) {
				fn.each(routerOpts, function(opt, key) {
					_this.router[key] = opt;
				});
			}
			//设置路由配置
			setPaths.call(this, routerOpts);
			return this;
		},
		//hash改变调用
		hashChange: function() {

			var path = window.location.hash.replace('#', '').split('?');

			var hash = path[0]; //获取hash

			var search = path[1]; //获取参数

			var routerBtns = fn.getEls(this.config.routerLink); //获取路由绑定的节点

			var viewEl = fn.getEl(this.config.routerView); //视图容器

			if(hash === '') hash = '/'; //如果不存在hash设置为根目录

			if(this.alias[hash]) hash = getPathAlias.apply(this, [{
				path: path.join(''),
				hash: hash,
				search: search
			}, viewEl, null]); //判断是不是别名的路由

			if(routerBtns.length === 0) return this; //存在路由绑定

			if(!this.alias[hash] && !this.router[hash]) { //error页面
				this.config.error.call(this);
				return;
			}

			hashChange.apply(this, [routerBtns, hash, viewEl]);
		},
		go: function(page) {
			if(fn.isNum(page)) history.go(page);
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

			if((!this.router[hash]) || this.router[hash]['temp'].childNodes.length > 0 || this.router[hash]['view'].length > 0) return; //查看当前的路由模板是否加载回来了

			var tmplUrl = this.router[hash]['tmplUrl']; //获取请求的url

			var tmplId = this.router[hash]['tmplId']; //获取静态模板的id
			/*动态模板*/
			if(tmplUrl) {
				tmpl.fn.ajax({
					url: tmplUrl,
					success: function(data) {
						_this.router[hash]['temp'].appendChild(tmpl.create(data.tmpl));
						filterTextNode.call(this, _this.router[hash]['temp']);
					}
				});
			} else if(tmplId) {
				_this.router[hash]['temp'].appendChild(tmpl.create(tmpl.html(fn.getEl(tmplId)))); //非动态模板
			}
		},
		/*获取参数*/
		query: function(searchs) {
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
		},
		/*获取参数*/
		search: function(el, search) {
		    var path = tmpl.attr(el,'href').split('?');
			if(search) {
			    if(fn.isObj(search)){
			        search = fn.serialize(search);
			    }
                path[1] = search;
                tmpl.attr(el,{
                    href:path.join('?')
                });
			}else {
                return path[1];
			}
		}
	}

	/*设置路由的路径*/
	function setRouter(routers, path) {
		var _this = this;
		var _path = (path ? path : '');
		fn.each(routers, function(router, key) {
			_this.router[_path + key] = router;
			if(fn.isObj(router.modules)) {
				setRouter.apply(_this, [router.modules, _path + key]);
			}
		});
	}

	/*hashChange的处理*/
	function hashChange(routerBtns, hash, viewEl) {
		var _this = this;

		var alinkEl = null;

		var hashPath = null;

		var hashSearch = null;

		//修改对应的状态
		fn.each(routerBtns, function(el, index) {

			var path = tmpl.attr(el, 'href').replace('#', '').split('?');

			var href = path[0];

			var search = path[1] ? path[1] : '';

			if(href === hash) {

				hashPath = path.join('?');

				hashSearch = search;

				alinkEl = el; //保存按钮节点

				_this.getTmpl(el, hash); //默认动态加载模块

				//是否存在最后一个路由地址
				if(lastRouter) {

					/*如果不是匹配的路由视图，则不显示在路由视图中*/
					fn.each(_this.router[lastRouter]['view'], function(el, index) {
						_this.router[lastRouter]['temp'].appendChild(el);
					});

					_this.router[lastRouter]['view'] = [];
				}

				viewEl.appendChild(_this.router[href]['temp']); //更新view层

				fn.each(tmpl.children(viewEl), function(el, index) { //保存view层节点
					_this.router[href]['view'].push(el);
				});

				tmpl.addClass(el, _this.config.activeClassName); //修改路由link的样式

				lastRouter = hash; //记录最后的路由路径
			} else {
				/*存在配置路由*/
				if(_this.router[href]) {
					/*如果不是匹配的路由视图，则不显示在路由视图中*/
					fn.each(_this.router[href]['view'], function(el, index) {
						_this.router[href]['temp'].appendChild(el);
					});

					_this.router[href]['view'] = [];
				}

				tmpl.removeClass(el, _this.config.activeClassName);
			}

			if(_this.router[href]) {
				_this.router[href]['path'] = {
					path: path.join(''),
					hash: href,
					search: search
				}
			}
		});

		if(fn.isFn(this.config.routerChange)) {
			this.config.routerChange.apply(_this, [{
				path: hashPath,
				hash: hash,
				search: hashSearch
            }, viewEl, alinkEl]); //路由回调   
		}
	}
	/*检查当前路径是否存在别名*/

	function getPathAlias(path, viewEl, el) {
		var alias = this.alias[path.hash];
		var cb = null;
		if(this.router[path.hash]) {
			if(fn.isFn(this.config.routerChange)) this.config.routerChange.apply(this, [path, viewEl, el]);
		}
		if(this.alias[alias]) {
			return getPathAlias.apply(this, [path, viewEl, el]);
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

	//处理路径
	function setPaths(routes) {
		var _this = this;
		this.alias = {};
		fn.each(routes, function(router, path) {
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