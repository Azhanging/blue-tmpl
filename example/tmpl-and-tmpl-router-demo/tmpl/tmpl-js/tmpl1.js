demand.define(function() {
	var Tmpl = demand('BlueTmpl');

	function tmpl1() {

		var mBtn = new Tmpl({
			template: "m-btn"
		});

		var tmpl = new Tmpl({
			template: "tmpl1",
			data: {
				isReady: false,
				i: 0
			},
			methods: {
				add: function() {
					var _this = this;
					var i = _this.i;
					$.ajax({
						url: '/php/get_data.php',
						data: {
							page: _this.i++
						},
						success: function(data) {
							data.i = i;
							_this.render(data).appendTo(_this.childrens(_this.view, 'content')[0]);
							mBtn.render([i]).appendTo(_this.view);
						}
					});
				},
				showDetailed: function(event, el) {
					var content = this.html(el);
					var wrap = this.getEl('detailed');
					this.html(wrap, content);
					this.toggle(wrap);
				}
			},
			created: function() {

				const view = this.getEl('tmp1');

				this.view = view;

			},
			mounted: function() {
				this.add();
			},
			events: function() {
				this.on(this.view, 'on-add-tmpl', 'click', this.add);
			}
		});
		console.log(tmpl);
	}
	return tmpl1;
});