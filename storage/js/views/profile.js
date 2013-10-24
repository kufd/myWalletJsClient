var ProfileView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.profile,
	
	render: function () {
		if(myWallet.isUserLoggedIn())
		{
			this.trigger('render');
			this.$el.html(this.template());
		}
	},
});

