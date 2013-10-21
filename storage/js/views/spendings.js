var SpendingsView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.spendings,
	
	initialize: function () {
		myWallet.user.bind(
			'autorize:success', 
			function(){ 
				myWallet.router.navigate("spendings", {trigger: true}); 
			}
		);
    },
	
	render: function () {
		if(myWallet.isUserAuthorized())
		{
			this.$el.html(this.template());
		}
	},
});

