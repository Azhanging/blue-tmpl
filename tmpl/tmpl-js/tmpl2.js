_require.define(function() {
	var Tmpl = _require('tmpl');
	var changeStatus = _require('@base-js/changeStatus.js');
	return function tmpl2() {
		new Tmpl({
			el: "tmpl2",
			data: {
				i: 0
			},
			methods: {
				add: function() {
					this.data([this.i++, this.i++, this.i++, this.i++])
						.appendTo(this.childrens(this.fn.getEl('tmp2'), 'content')[0]);
				}
			},
			mounted: function() {
				this.add();	
			},
			events: function() {
				this.on(this.fn.getEl('tmp2'),'on-add-tmpl', 'click', this.add);	
				changeStatus();
			}
		});
	}
});