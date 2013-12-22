var LoginView = Backbone.View.extend({
	
	el: '#page',
	rootEl:'div.login',
	template: myWallet.templates.login,
	
	events: {
		"click div.login .submit input": "login"
	},
	
	initialize: function () {
		myWallet.user.bind(
			'logout', 
			function(){ 
				myWallet.router.navigate("#login", {trigger: true}); 
			}
		);
    },
	
	render: function () {
		if(myWallet.isUserLoggedIn())
		{
			myWallet.router.navigate("#spendings", {trigger: true}); 
		}
		else
		{
			this.trigger('render');
			this.$el.html(this.template());
		}
	},
	
	login: function(){
		myWallet.user.login(
			this.$("input[name=login]").val(), 
			this.$("input[name=password]").val(),
            this.$("input[name=remember]").is(':checked')
		);
	}
	
});

