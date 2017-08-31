_require.define(function() {
	var Tmpl = _require('tmpl');

	return function tmpl1() {
		new Tmpl({
			el: "tmpl3",
			data: {
				i: 0,
				isReady: false
			},
			methods: {
				add: function() {
					this.render([this.i++, this.i++, this.i++, this.i++])
						.appendTo(this.childrens(this.view, 'content')[0]);
				}
			},
			created:function(){
				const view = this.fn.getEl('tmp3');
				this.view = view;
			},
			mounted: function() {
				this.add();
			},
			events: function() {
				this.on(this.view, 'on-add-tmpl', 'click', this.add);
			}
		});
	}
});