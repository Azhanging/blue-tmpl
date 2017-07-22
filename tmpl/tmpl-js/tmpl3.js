_require.define(function() {
	var Tmpl = _require('tmpl');
	var changeStatus = _require('@base-js/changeStatus.js');
	
	return function tmpl1() {
		new Tmpl({
			el: "tmpl3",
			data: {
				i: 0,
				isReady:false
			},
			methods: {
				add: function() {
					this.data([this.i++, this.i++, this.i++, this.i++])
						.appendTo(this.childrens(this.fn.getEl('tmp3'), 'content')[0]);
				}
			},
			mounted: function() {
				this.add();
			},
			events: function() {
				this.on(this.fn.getEl('tmp3'), 'on-add-tmpl', 'click', this.add);
				changeStatus();
			}
		});
	}
});