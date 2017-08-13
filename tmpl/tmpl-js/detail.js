_require.define(function() {
	var Tmpl = _require('tmpl');
	
	var router = Tmpl.router;
	
	var tmpl = new Tmpl({
		el: 'detail',
		data:{
		   page:''
		},
		methods: {
			getData: function(el) {
			    
                var _this = this;
                
                var page = router.query(router.search(location.hash))['id'];
                
                if(this.page == page) return;
                
                if(el) el.innerHTML = '';
                
				$.ajax({
				    cache:false,
					url: '/php/get_data.php',
					data: {
						page: page
					},
					success: function(data) {
					    _this.page = page;
						_this.render(data).appendTo('tmp1');
					}
				});
			}
		},
		mounted: function() {
			this.getData();
			router.router['/detail']['tmpl'] = this;
		}
	});
});