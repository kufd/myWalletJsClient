var RegisterView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.register,
	render: function () {
		this.$el.html(this.template());
	},
});

