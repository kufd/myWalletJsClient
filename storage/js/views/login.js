var LoginView = Backbone.View.extend({
	
	el: '#page',
	template: myWallet.templates.login,
	
	events: {
	    "click .submit input": "login"
	},
	
	render: function () {
		this.$el.html(this.template());
	},
	
	login: function(){
		myWallet.user.authorize(
			this.$("input[name=login]").val(), 
			this.$("input[name=password]").val()
		);
	}
	
});

