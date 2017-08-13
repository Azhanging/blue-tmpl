_require.define(function() {
	var Tmpl = _require('tmpl');
	return function tmpl2() {
		new Tmpl({
			el: "tmpl2",
			data: {
				i: 0
			},
			methods: {
				add: function() {
					this.render([this.i++, this.i++, this.i++, this.i++])
						.appendTo(this.childrens(this.fn.getEl('tmp2'), 'content')[0]);
				}
			},
			mounted: function() {
				this.add();	
			},
			events: function() {
				this.on(this.fn.getEl('tmp2'),'on-add-tmpl', 'click', this.add);	
				Tmpl.router.changeRoutereStatus(true);
			}
		});
	}
});