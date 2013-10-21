var AboutView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.about,
	render: function () {
		this.$el.html(this.template());
	},
});

