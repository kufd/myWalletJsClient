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
				view.$('a.reports, a.logout, a.profile').show();
			}
		);
		
		myWallet.views.login.bind(
			'render', 
			function(){ 
				view.$('a.login, a.logout, a.spendings, a.profile, a.reports').hide();
			}
		);
		
		myWallet.views.register.bind(
			'render', 
			function(){ 
				view.$('a.logout, a.spendings, a.profile, a.reports').hide();
				view.$('a.login').show();
			}
		);
		
		myWallet.views.about.bind(
			'render', 
			function(){ 
				view.$('a.logout, a.spendings, a.profile, a.reports').hide();
				view.$('a.login').show();
			}
		);
		
		myWallet.views.profile.bind(
			'render', 
			function(){ 
				view.$('a.login, a.profile').hide();
				view.$('a.reports, a.logout, a.spendings').show();
			}
		);
		
		myWallet.views.forgotPassword.bind(
			'render', 
			function(){ 
				view.$('a.profile, a.logout, a.spendings, a.reports').hide();
				view.$('a.login').show();
			}
		);

		myWallet.views.reports.bind(
			'render', 
			function(){ 
				view.$('a.reports, a.login').hide();
				view.$('a.spendings, a.logout, a.profile').show();
			}
		);

		myWallet.views.reportGroupBySpengingName.bind(
			'render', 
			function(){ 
				view.$('a.login').hide();
				view.$('a.spendings, a.logout, a.profile, a.reports').show();
			}
		);

		myWallet.views.reportAmountByPeriod.bind(
			'render', 
			function(){ 
				view.$('a.login').hide();
				view.$('a.spendings, a.logout, a.profile, a.reports').show();
			}
		);
	}
});

