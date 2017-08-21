_require.define(function() {
	var Tmpl = _require('tmpl');
	
	return function tmpl1() {
		new Tmpl({
			el: "tmpl3",
			data: {
				i: 0,
				isReady:false
			},
			methods: {
				add: function() {
					this.render([this.i++, this.i++, this.i++, this.i++])
						.appendTo(this.childrens(this.fn.getEl('tmp3'), 'content')[0]);
				}
			},
			mounted: function() {
				this.add();
			},
			events: function() {
				this.on(this.fn.getEl('tmp3'), 'on-add-tmpl', 'click', this.add);
				Tmpl.router.changeRoutereStatus(true);
			}
		});
	}
});