var MainView = Backbone.View.extend({
	el: 'body',
	template: myWallet.templates.main,
	render: function () {
		this.$el.html(this.template());
	},
});

