_require.define(['@base-js/routerHandler.js', 'tmpl'], function(routerHandler, Tmpl) {

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
			'/detail': {
				tmplUrl: "/php/get_tmpl.php?tmpl=detail",
				viewWrap: 'tmp1'
			},
			'/tm1': {
				tmplUrl: "/php/get_tmpl.php?tmpl=tmpl1",
				alias: '/tm2/tm2-2/tm2-2-1',
				keepLive: true,
				modules: {
					'/tm1-2': {
						modules: {
							'/tm1-2-1': {},
							'/tm1-2-2': {}
						}
					}
				}
			},
			'/tm2': {
				tmplUrl: "/php/get_tmpl.php?tmpl=tmpl2",
				alias: '/',
				keepLive: false
			},
			'/tm3': {
				tmplUrl: "/php/get_tmpl4.php?tmpl=tmpl3"
			},
			'/tm6': {},
			'/tm8': {
				tmplUrl: "/php/get_tmpl.php?tmpl=tmpl5",
				alias: '/tm9',
				routerStatus:true
			},
			'/tm9': {
				routerStatus: true
			},
			'/tm10': {
				tmplUrl: "/php/get_tmpl.php?tmpl=tmpl2"
			}
		},
		error: function() {
			var _this = this;
			console.log('error');
			this.redirect('/');
		},
		triggerRouter:function(btn,hash){
			console.log(btn,hash);
		},
		routerEnter: function(path) {
			console.log('跳转中。。。');
			console.log(this);
		},
		/*hash更新后的钩子*/
		routerEntered: function(path, el) {
			var _this = this;
			routerHandler.routerEnter.call(this, path);
			routerHandler.routerEntered.apply(this, [path, el]);
		},
		methods: {},
		mounted: function() {}
	});

	return router;
});