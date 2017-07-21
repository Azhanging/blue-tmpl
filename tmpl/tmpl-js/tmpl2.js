_require.define('tmpl2', function() {
	var Tmpl = _require('tmpl');
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
				if(this.fn.getEl('tmp2')){
					this.add();	
				}	
			},
			events: function() {
				if(this.fn.getEl('tmp2')){	
					this.on(this.fn.getEl('tmp2'),'on-add-tmpl', 'click', this.add);		
				}
			}
		});
	}
});