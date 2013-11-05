var SpendingsView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.spendings,
	spendings: null,
	
	initialize: function () {
		
		this.spendings = new Spendings(); 
		
		myWallet.user.bind(
			'login:success', 
			function(){ 
				myWallet.router.navigate("spendings", {trigger: true}); 
			}
		);
    },
	
	render: function () {
		if(myWallet.isUserLoggedIn())
		{
			
			this.spendings.fetch();
			
			_.each(this.spendings, function(spending) {
				//alert(spending);
			});
			
			var template = _.template(this.template, {spendings: this.spendings});
			this.$el.html(template);
			
			this.trigger('render');
		}
	},
});

