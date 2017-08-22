_require.define(function() {
	var Tmpl = _require('tmpl');
	
	console.log(Tmpl.router);

	function tmpl1() {
		
		var mBtn = new Tmpl({
			el:"m-btn"
		});
		
		new Tmpl({
			el: "tmpl1",
			data: {
				isReady: false,
				i: 0,
				view:mBtn.fn.getEl('tmp1')
			},
			methods: {
				add: function() {
				    var _this = this;
				    var i = _this.i;
				    $.ajax({
				        url:'/php/get_data.php',
				        data:{
				            page:_this.i++
				        },
				        success:function(data){
				            data.i = i;
				            _this.render(data).appendTo(_this.childrens(_this.view, 'content')[0]);
                            mBtn.render([i]).appendTo(_this.view);
				        }
				    });
				},
				showDetailed: function(event, el) {
					var content = this.html(el);
					var wrap = this.fn.getEl('detailed');
					this.html(wrap, content);
					this.toggle(wrap);
				}
			},
			mounted: function() {
				this.add();
			},
			events: function() {
				this.on(this.fn.getEl('tmp1'), 'on-add-tmpl', 'click', this.add);
				Tmpl.router.changeRoutereStatus(true);
			}
		});
	}
	return tmpl1;
});