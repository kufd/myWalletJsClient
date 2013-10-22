var MainView = Backbone.View.extend({
	el: 'body',
	template: myWallet.templates.main,
	
	events: {
	    "click .logout": "logout"
	},
	
	render: function () {
		this.$el.html(this.template());
	},
	
	logout: function(){
		myWallet.user.logout();
	}
});

