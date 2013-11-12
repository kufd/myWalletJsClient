var SpendingsView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.spendings,
	spendings: null,
	
	events: {
		"click table.spendings .delete": "deleteSpending"
	},
	
	initialize: function () {
		
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
			
			var template = _.template(this.template, {spendings: this._getSpendings(), user: myWallet.user});
			this.$el.html(template);
			
			this.trigger('render');
		}
	},
	
	deleteSpending: function(event)
	{
		try
		{
			var spendingId =$(event.target).parents('tr').attr('data-spending-id');
			this._getSpendings().deleteSpending(spendingId);
		}
		catch(e)
		{
			myWallet.errorMsg(e);
		}
		
		this.render();
	},
	
	_getSpendings: function()
	{
		if (this.spendings == null)
		{
			this.spendings = new Spendings(); 
			this.spendings.fetch();
		}
		
		return this.spendings;
	}
	
	
});

