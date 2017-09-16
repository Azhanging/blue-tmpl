demand.define(['@base-js/routerHandler.js', 'tmpl'], function(routerHandler, Tmpl) {

    var TmplRouter = demand('tmpl-router');

    Tmpl.install(TmplRouter);

    var router = new TmplRouter({
        keepLive: true,
        data: {
            a: 1
        },
        methods: {

        },
        routes: [{
                path: '/detail',
                tmplUrl: "/php/get_tmpl.php?tmpl=detail",
                viewWrap: 'tmp1',
                alias: '/tm8'
            }, {
                path: '/tm1',
                tmplUrl: "/php/get_tmpl.php?tmpl=tmpl1",
                alias: '/tm2/tm2-2/tm2-2-1',
                keepLive: true,
                modules: [{
                    path: '/tm1-2',
                    modules: [{
                        path: '/tm1-2-1',
                    }, {
                        path: '/tm1-2-2'
                    }]
                }],
                routerEnter: function(path) {
                    console.log('------------' + path);
                }
            },
            {
                path: '/tm2',
                tmplUrl: "/php/get_tmpl.php?tmpl=tmpl2",
                alias: '/',
                keepLive: false
            },
            {
                path: '/tm3',
                tmplUrl: "/php/get_tmpl4.php?tmpl=tmpl3"
            },
            {
                path: '/tm6'
            },
            {
                path: '/tm8',
                tmplUrl: "/php/get_tmpl.php?tmpl=tmpl5",
                alias: '/tm9'
            },
            {
                path: '/tm9'
            },
            {
                path: '/tm10',
                tmplUrl: "/php/get_tmpl.php?tmpl=tmpl2"
            },
            {
                path: '/tm11'
            }
        ],
        error: function() {
            var _this = this;
            console.log('error');
            //          this.redirect('/');
        },
        triggerRouter: function(btn, hash) {
//          console.log(btn, hash);
        },
        routerEnter: function(path,from) {
            console.log('跳转中。。。');
            console.log(path,from);
        },
        /*hash更新后的钩子*/
        routerEntered: function(path, from, el) {
            var _this = this;
            routerHandler.routerEnter.call(this, path);
            routerHandler.routerEntered.apply(this, [path, from, el]);
        },
        methods: {},
        mounted: function() {}
    });

    return router;
});