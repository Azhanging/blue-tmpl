_require.define('tmpl1', function() {
	var Tmpl = _require('tmpl');
	function tmpl1() {
		new Tmpl({
			el: "tmpl1",
			data: {
				i: 0
			},
			methods: {
				add: function() {
					this.data([this.i++, this.i++, this.i++, this.i++])
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
				this.on('on-add-tm1', 'click', this.add);
			}
		});
	}
	return tmpl1;
});