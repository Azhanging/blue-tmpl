_require.define(function() {
	var Tmpl = _require('tmpl');
	
	var TmplRouter = _require('tmpl-router');

	Tmpl.install(TmplRouter);
	
	var router = new TmplRouter({
		keepLive: true,
		data: {
			a: 1
		},
		methods: {

		},
		router: {
			'/detail':{
				tmplUrl: "./php/get_tmpl.php?tmpl=detail",
				routerStatus:true
			},
			'/tm1': {
				tmplUrl: "./php/get_tmpl.php?tmpl=tmpl1",
				alias: '/tm2/tm2-2/tm2-2-1',
				keepLive: true,
				modules: {
					'/tm1-1': {
						tmplUrl: "./php/get_tmpl.php?tmpl=tmpl1",
						alias: '/tm1/index',
						modules: {
							'/tm1-1-1': {
								modules: {
									'/a': {}
								}
							},
							'/tm1-1-2': {}
						}
					},
					'/tm1-2': {
						modules: {
							'/tm1-2-1': {},
							'/tm1-2-2': {}
						}
					}
				}
			},
			'/tm2': {
				tmplUrl: "./php/get_tmpl.php?tmpl=tmpl2",
				alias: '/',
				keepLive: false,
				modules: {
					'/tm2-1': {
						modules: {
							'/tm2-1-1': {},
							'/tm2-1-2': {}
						}
					},
					'/tm2-2': {
						modules: {
							'/tm2-2-1': {},
							'/tm2-2-2': {}
						}
					},
				}
			},
			'/tm3': {
				tmplUrl: "./php/get_tmpl4.php?tmpl=tmpl3"
			},
			'/tm6': {},
			'/tm8': {
				tmplUrl: "./php/get_tmpl.php?tmpl=tmpl5",
				routerStatus:true,
				alias: '/tm9'
			},
			'/tm9': {
				routerStatus:true
			},
			'/tm10': {
				tmplUrl: "./php/get_tmpl.php?tmpl=tmpl2"
			}
		},
		error: function() {
//			var _this = this;
//			console.log('error');
//			setTimeout(function() {
//				_this.redirect('/');
//			}, 1000);
		},
		routerEnter: function(path, viewEl) {
			console.log('跳转中。。。');
		},
		/*hash更新后的钩子*/
		routerEntered: function(path, viewEl, el) {
			var _this = this;
			console.log(path, viewEl, el);
		},
		mounted: function() {}
	});
	
	return router;
});