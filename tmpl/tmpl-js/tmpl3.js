_require.define('tmpl3', function() {
	var Tmpl = _require('tmpl');
	return function tmpl1() {
		new Tmpl({
			el: "tmpl3",
			data: {
				i: 0
			},
			methods: {
				add: function() {
					this.data([this.i++, this.i++, this.i++, this.i++]).appendTo(this.childrens(this.fn.getEl('tmp3'), 'content')[0]);
				}
			},
			mounted: function() {
				this.add();
			},
			events: function() {
				this.on('on-add-tm3', 'click', this.add);
			}
		});
	}
});