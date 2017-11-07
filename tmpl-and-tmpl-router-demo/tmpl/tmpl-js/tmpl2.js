demand.define(function() {
	var Tmpl = demand('tmpl');

	return function tmpl2() {
		new Tmpl({
			template: "tmpl2",
			data: {
				i: 0
			},
			methods: {
				add: function() {
					this.render([this.i++, this.i++, this.i++, this.i++])
						.appendTo(this.childrens(this.view, 'content')[0]);
				}
			},
			created: function() {
				const view = this.getEl('tmp2');
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