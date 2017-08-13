_require.define(function() {

	function routerEntered(path, el) {
		var _path = this.getHash(path);
//		alert(_path === '/detail');
		switch(_path) {
			case '/detail':
//			    alert('detail。。。。。。');
				this.search(el, this.search(path));
				break;
			default:
				;
		}
	}

	function routerEnter(path) {
		var _path = this.getHash(path);
		switch(_path) {
			case '/detail':
				(function() {
					var el = this.tmpl.fn.getEl(this.router['/detail']['viewWrap']);
					if(el &&　this.router['/detail'].tmpl) {
						this.router['/detail'].tmpl.getData(el);
					}
				}).call(this);
				break;
			default:
				;
		}
	}

	return {
		routerEnter: routerEnter,
		routerEntered: routerEntered
	};
});