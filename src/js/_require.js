(function(global, factory) {
	//不引入两次
	if(!(typeof global._require == 'function')) {
		global._require = factory(global);
	}
})(typeof window !== 'undefined' ? window : this, function(global) {

	//http、https链接
	var HTTP_PATH = /^http(s)?:\/\//;

	//兼容性IE8
	(function() {
		//不兼容IE8代理数据
		if(navigator.userAgent.indexOf('MSIE 8.0') == -1) {
			//共享变量
			Object.defineProperty(global, 'G', {
				value: {},
				enumerable: true,
				configurable: false,
				writable: false
			});
		}
		//兼容IE8中 的indexOf
		if(!Array.prototype.indexOf) {
			Array.prototype.indexOf = function(val) {
				for(var index = 0, len = this.length; index < len; index++) {
					if(this[index] === val) {
						return index;
					}
				}
				return -1;
			}
		}
	})();

	//获取模块
	function _require(path) {
		var getModules = _require.modules.installedModules[getUrl(path)];
		if(!getModules) {
			//获取的可能是id
			try {
				return new _require.modules.installedModules[path].export();
			} catch(e) {
				_require.error(1, path);
			}
		} else if(getModules) {
			try {
				return new getModules.export();
			} catch(e) {
				_require.error(1, path);
			}
		} else {
			_require.error(1, path);
		}
	}

	//最后加载成功的模块路径
	var lastLoadModuleHandler = null,
		//最后加载模块设置的id值
		lastLoadId = null,
		//最后加载模块依赖
		lastDepModules = []

	//模块信息
	_require.modules = {
		//路径模块加载
		installedModules: {},
		//模块列表
		modulesLists: [],
		//执行use队列
		installUse: []
	};

	//设置配置信息,并且初始化
	_require.config = function(options) {
		_require.baseUrl = options.baseUrl ? options.baseUrl : location.origin;
		_require.alias = options.alias;
		//加载模块
		loadModules(setUrl(options.paths));
	}

	//动态加载id模块
	_require.defineId = function() {
		_require.define.apply(_require, arguments);
		//设置接口
		setExport();
		//检查当前模块是全部否完成
		isLoad();
	}

	//定义模块
	_require.define = function() {
		var modules = _require.modules;
		var hasLastModuleHandler = false;
		var arg_0 = arguments[0],
			arg_1 = arguments[1],
			arg_2 = arguments[2];

		//默认设置了id
		if(typeof arg_0 === 'string') {
			//如果第二个参数是依赖，先设置依赖
			if(arg_1 instanceof Array) {
				depHandler(arg_1);
				lastLoadId = arg_0;
				lastDepModules = arg_1;
				lastLoadModuleHandler = function() {
					//设置依赖模块
					var deps = arg_1.map(function(moduleName) {
						return _require(moduleName);
					});
					return arg_2.apply(this, deps);
				};
			} else if(typeof arg_1 === 'function') {
				//如果第二个参数是模块函数
				lastLoadId = arg_0;
				lastLoadModuleHandler = arg_1;
			}
		} else {
			//非id模块
			if(arg_0 instanceof Array) {
				depHandler(arg_0);
				lastDepModules = arg_0;
				lastLoadModuleHandler = function() {
					//设置依赖模块
					var deps = arg_0.map(function(moduleName) {
						return _require(moduleName);
					});
					return arg_1.apply(this, deps);
				};
			} else if(typeof arg_0 === 'function') {
				//如果第二个参数是模块函数
				lastLoadModuleHandler = arg_0;
			}
		}
	}

	//运行模块
	_require.use = function(callback) {
		_require.modules.installUse.push(callback);
		isLoad();
	};

	//设置路径
	function setUrl(paths) {
		var _paths = [];
		for(var index = 0; index < paths.length; index++) {
			_paths.push(getUrl(paths[index]));
		}
		return _paths;
	}

	//处理dep是否存在已加载的模块
	function depHandler(paths) {
		var newPaths = paths.filter(function(path) {
			return !hasModule(path) && !isIdModule(path);
		});
		loadModules(setUrl(newPaths));
	}

	//获取路径
	function getUrl(path) {
		//http链接
		if(HTTP_PATH.test(path)) {
			return path;
		} else {
			return urlResolve(path);
		}
	}

	//处理路径解析
	function urlResolve(path) {
		var _path = _require.baseUrl;
		var route = path.split('/');
		var tempPath = '';
		for(var index = 0; index < route.length; index++) {

			//第一为绝对路径
			if(route[index] === '' && index === 0) {
				_path = location.origin;
			} else if(route[index] === '.') {
				//第一位为相对路径
				if(index !== 0) {
					_require.error(4);
				}
				_path += '';
			} else if(route[index] == '..') {
				//其他为上级目录
				if(index == 0) {
					_require.error(4);
				}
				_path = _path.split('/');
				_path.pop();
				_path = _path.join('/');
			} else if(/^@/g.test(route[index])) {
				//别名路径
				var alias = _require.alias[route[index].replace(/@/g, '')];
				hasSprit.end(_path) ?
					(hasSprit.start(alias) ? (tempPath = alias.substring(1)) : (tempPath = alias)) :
					(hasSprit.start(alias) ? (tempPath = alias) : (tempPath = '/' + alias));
				_path += tempPath;
			} else {
				//最后的文件
				hasSprit.end(_path) ?
					(_path += route[index]) :
					(_path += ('/' + route[index]));
			}
		}
		return _path;
	}

	var hasSprit = {
		start: function(path) {
			if(/^\//.test(path)) {
				return true;
			}
			return false;
		},
		end: function(path) {
			if(/\/$/.test(path)) {
				return true;
			}
			return false;
		}
	}

	//加载模块
	function loadModules(paths) {
		var modules = _require.modules;
		if(!(paths instanceof Array)) {
			return;
		}
		for(var index = 0; index < paths.length; index++) {
			var path = paths[index]; //获取加载模块的列表
			if(hasModule(path)) { //查看当前的路径是否已经记载的模块					
				continue;
			}
			var scriptElement = document.createElement('script');
			scriptElement.src = path;
			document.getElementsByTagName('head')[0].appendChild(scriptElement);
			//当前模块添加到列表中
			modules.modulesLists.push(path);
			//设置当前模块加载状态
			modules.installedModules[path] = {};
			modules.installedModules[path].loaded = false;
			//监听模块状态
			(function(index, path) {
				scriptElement.onload = function() {
					//设置接口
					setExport(path);
					//检查当前模块是全部否完成
					isLoad();
				};
				scriptElement.onerror = function() {
					_require.error(1, path);
				};
			})(index, path);
		}
	}

	function setExport(path) {
		var installModules = _require.modules.installedModules;
		//设置最后加载的模块已经模块路径
		if(path) {
			installModules[path].export = lastLoadModuleHandler;
			installModules[path].dep = lastDepModules;
			//修改当前模块加载状态
			installModules[path].loaded = true;
		}
		//书否存在设置id的模块
		if(lastLoadId) {
			installModules[lastLoadId] = {};
			//设置id的模块
			installModules[lastLoadId].export = lastLoadModuleHandler;
			installModules[lastLoadId].dep = lastDepModules;
			installModules[lastLoadId].loaded = true;
			//初始化id的选项
			lastLoadId = null;
		}
		lastDepModules = [];
	}

	//检测是否存在了模块
	function hasModule(path) {
		if(_require.modules.modulesLists.indexOf(path) === -1) {
			return false;
		}
		return true;
	}

	//检测是否为id模块
	function isIdModule(path) {
		if(/\.js/.test(path)) {
			return false;
		}
		return true;
	}

	//检测模块是否全部完毕
	function isLoad() {
		var modules = _require.modules;
		var isLoad = Object.keys(modules.installedModules);
		for(var index = 0; index < isLoad.length; index++) {
			if(modules.installedModules[isLoad[index]].loaded === false) {
				return false;
			}
		}
		runUse();
	}

	//运行use
	function runUse() {
		var uses = _require.modules.installUse;
		for(var index = 0, len = uses.length; index < len; index++) {
			uses.shift()();
		}
	}

	//错误处理
	_require.error = function(errorCode, msg) {
		switch(errorCode) {
			case 1:
				console.warn('加载' + msg + '加载有误');
				break;
			case 2:
				console.warn('存在相同' + msg + '模块');
				break;
			case 3:
				console.warn(msg + '模块参数有误');
				break;
			case 4:
				throw('错误的路径！');
				break;
			default:
				;
		}
	}

	return _require;
});