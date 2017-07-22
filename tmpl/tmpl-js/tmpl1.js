_require.define(function() {
	var Tmpl = _require('tmpl');
	
	var changeStatus = _require('@base-js/changeStatus.js');

	function tmpl1() {
		new Tmpl({
			el: "tmpl1",
			data: {
				isReady: false,
				i: 0
			},
			methods: {
				add: function() {
					this.data([this.i++, this.i++, this.i++, this.i++, this.i++, this.i++, this.i++, this.i++, this.i++, this.i++, this.i++, this.i++, this.i++, this.i++, this.i++, this.i++, this.i++])
						.appendTo(this.childrens(this.fn.getEl('tmp1'), 'content')[0]);
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
				changeStatus();
			}
		});
	}
	return tmpl1;
});