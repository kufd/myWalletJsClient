var ForgotPasswordView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.forgotPassword,
	
	render: function () {
		this.trigger('render');
		this.$el.html(this.template());
	},
});

