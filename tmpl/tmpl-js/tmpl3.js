_require.define('tmpl3', function() {
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
					this.data([this.i++, this.i++, this.i++, this.i++])
						.appendTo(this.childrens(this.fn.getEl('tmp3'), 'content')[0]);
				}
			},
			mounted: function() {
				if(this.fn.getEl('tmp3')){
					this.add();	
				}
			},
			events: function() {
				if(this.fn.getEl('tmp3')){
					this.on(this.fn.getEl('tmp3'), 'on-add-tmpl', 'click', this.add);	
				}
			}
		});
	}
});