var MainView = Backbone.View.extend({
	el: 'body',
	template: myWallet.templates.main,
	
	events: {
	    "click .logout": "logout"
	},
	
	initialize: function () {
		
		var view = this;
		
    },
	
	render: function () {
		this.$el.html(this.template());
	},
	
	logout: function(){
		myWallet.user.logout();
	},
	
	initAfterEvrithing: function()
	{
		var view = this;
		
		myWallet.views.spendings.bind(
			'render', 
			function(){ 
				view.$('a.spendings, a.login').hide();
				view.$('a.logout, a.profile').show();
			}
		);
		
		myWallet.views.login.bind(
			'render', 
			function(){ 
				view.$('a.login, a.logout, a.spendings, a.profile').hide();
			}
		);
		
		myWallet.views.register.bind(
			'render', 
			function(){ 
				view.$('a.logout, a.spendings, a.profile').hide();
				view.$('a.login').show();
			}
		);
		
		myWallet.views.about.bind(
			'render', 
			function(){ 
				view.$('a.logout, a.spendings, a.profile').hide();
				view.$('a.login').show();
			}
		);
	}
});

