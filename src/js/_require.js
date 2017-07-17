/*!
 * 
 * _require.js v1.0.5
 * (c) 2016-2017 Blue
 * https://github.com/azhanging/_require
 * Released under the MIT License.
 *      
 */

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

		//兼容IE8中 的indexOf
		if(!isFn(Array.prototype.indexOf)) {
			Array.prototype.indexOf = function(val) {
				for(var index = 0, len = this.length; index < len; index++) {
					if(this[index] === val) {
						return index;
					}
				}
				return -1;
			}
		}

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

		//map
		if(!isFn(Array.prototype.map)) {
			Array.prototype.map = function(fn) {
				var mapArr = [];
				for(var i = 0; i < this.length; i++) {
					mapArr.push(fn(this[i], i));
				}
				return mapArr;
			}
		}

		//filter
		if(!isFn(Array.prototype.filter)) {
			Array.prototype.filter = function(fn) {
				var mapArr = [];
				for(var i = 0; i < this.length; i++) {
					var item = this[i];
					if(fn(item, i)) {
						mapArr.push(item);
					}
				}
				return mapArr;
			}
		}

	})();

	function isObj(obj) {
		return obj instanceof Object && !(obj instanceof Array) && obj !== null;
	}

	function isArr(array) {
		return array instanceof Array;
	}

	function isFn(fn) {
		return typeof fn === 'function';
	}

	function isStr(string) {
		return typeof string === 'string';
	}

	//获取模块
	function _require(path) {
		//获取路径模块
		var getModules = _require.modules.installedModules[getUrl(path)];
		//获取不到路径模块为id模块
		if(!getModules) {
			//获取的可能是id
			try {
				return new _require.modules.installedModules[path]._export_();
			} catch(e) {
				error(1, path);
			}
		} else if(getModules) {
			//获取不到路径模块
			try {
				return new getModules._export_();
			} catch(e) {
				error(1, path);
			}
		} else {
			//获取不到模块
			error(1, path);
		}
	}

	//获取根路径
	_require.origin = (function() {
		return(location.origin || location.protocol + '//' + location.host);
	})();

	//最后加载成功的模块路径
	var lastLoadModuleHandler = null,
		//最后加载模块设置的id值
		lastLoadId = null,
		//最后加载模块依赖
		lastDepModules = [];

	//模块信息
	_require.modules = {
		//路径模块加载
		installedModules: {},
		//模块列表
		modulesLists: [],
		//执行use队列
		installUse: []
	};

	//存储是否配置了模块
	var configed = false;

	//设置配置信息,并且初始化
	_require.config = function(options) {
		//不能重新配置模块
		if(configed) {
			console.warn('不能重复配置模块！');
			return;
		}

		_require.baseUrl = options.baseUrl ? options.baseUrl : _require.origin;

		_require.alias = options.alias;
		//加载模块
		loadModules(setUrl(options.paths));

		configed = true;
	}

	//动态加载id模块
	_require.defineId = function() {
		//动态的id模块必须定义id
		if(!isStr(arguments[0])) {
			this.error('', 3);
			return;
		}
		_require.define.apply(_require, arguments);
		//设置接口
		set_export();
		//检查当前模块是全部否完成
		isLoad();
	}

	//动态加载id模块
	_require.loadModules = function(paths) {
		if(isArr(paths)) loadModules(setUrl(paths));
		else if(isStr(paths)) loadModules(setUrl([paths]));
	}

	//定义模块
	_require.define = function() {
		var modules = _require.modules;
		var hasLastModuleHandler = false;
		var arg_0 = arguments[0],
			arg_1 = arguments[1],
			arg_2 = arguments[2];

		var dep = null,
			cb = null;

		//是否为id模块
		var isIdModule = isStr(arg_0);

		if(isIdModule) {
			if(_require.modules.installedModules[arg_0]) {
				error(2, arg_0);
			}
			dep = arg_1;
			cb = arg_2;
		} else {
			dep = arg_0;
			cb = arg_1;
		}

		//设置id和非id的数据处理
		if(dep instanceof Array) {
			depHandler(dep);
			if(isIdModule) {
				lastLoadId = arg_0;
			}
			lastDepModules = dep;
			lastLoadModuleHandler = function() {
				//设置依赖模块
				var deps = dep.map(function(moduleName) {
					return _require(moduleName);
				});
				return cb.apply(this, deps);
			};
		} else if(isFn(dep)) {
			//如果第一个参数是模块函数
			if(isIdModule) {
				lastLoadId = arg_0;
			}
			lastLoadModuleHandler = dep;
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

	//检查路径是开始还是结束的
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

	//处理路径解析
	function urlResolve(path) {
		var _path = _require.baseUrl;
		var route = path.split('/');
		var tempPath = '';
		for(var index = 0; index < route.length; index++) {
			//第一为绝对路径
			if(route[index] === '' && index === 0) {
				_path = _require.origin;
			} else if(route[index] === '.') {
				//第一位为相对路径
				if(index !== 0) {
					error(4);
				}
				_path += '';
			} else if(route[index] == '..') {
				//其他为上级目录
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
				hasSprit.end(_path) ? (_path += route[index]) : (_path += ('/' + route[index]));
			}
		}
		return _path;
	}

	var scriptModules = [],
		status = true;

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
			//当前模块添加到列表中
			modules.modulesLists.push(path);
			//设置当前模块加载状态
			modules.installedModules[path] = {};
			modules.installedModules[path].loaded = false;
			//监听模块状态
			(function(index, path, scriptElement) {
				//处理scripr加载完毕后的处理
				function scriptEventHandler() {
					status = true;
					//设置接口
					set_export(path);
					//检查当前模块是全部否完成
					isLoad();

					if(scriptModules.length > 0) {
						status = false;
						scriptModules.shift()();
					}
				}

				scriptElement.onload = function() {
					scriptEventHandler();
				};
				scriptElement.onerror = function() {
					error(1, path);
					scriptEventHandler();
				};

				if(status) {
					status = false;
					document.getElementsByTagName('head')[0].appendChild(scriptElement);
				} else {
					scriptModules.push(function() {
						document.getElementsByTagName('head')[0].appendChild(scriptElement)
					});
				}

			})(index, path, scriptElement);

		}
	}

	//设置接口
	function set_export(path) {
		var installModules = _require.modules.installedModules;

		//设置最后加载的模块已经模块路径
		if(path) {
			installModules[path]._export_ = lastLoadModuleHandler;
			installModules[path].dep = lastDepModules;
			//修改当前模块加载状态
			installModules[path].loaded = true;
		}
		//是否存在设置id的模块
		if(lastLoadId) {
			installModules[lastLoadId] = {};
			//设置id的模块
			installModules[lastLoadId]._export_ = lastLoadModuleHandler;
			installModules[lastLoadId].dep = lastDepModules;
			installModules[lastLoadId].loaded = true;
		}

		//初始化所有的及接口配置
		lastLoadId = null;
		lastLoadModuleHandler = function() {
			return function() {}
		};
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
	function error(errorCode, msg) {
		switch(errorCode) {
			case 1:
				console.warn('加载' + msg + '模块有误');
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

	_require.version = 'v1.0.5';

	return _require;
});