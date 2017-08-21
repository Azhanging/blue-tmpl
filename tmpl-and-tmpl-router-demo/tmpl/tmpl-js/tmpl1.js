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
				i: 0
			},
			methods: {
				add: function() {
				    var _this = this;
				    $.ajax({
				        url:'/php/get_data.php',
				        data:{
				            page:_this.i++
				        },
				        success:function(data){
				            console.log(data);
				            _this.render(data).appendTo(_this.childrens(_this.fn.getEl('tmp1'), 'content')[0]);
                            mBtn.render([_this.i]).appendTo(_this.fn.getEl('tmp1'));
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