var SpendingsView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.spendings,
	spendings: null,
	
	events: {
		"click div.spendings table.spendings .delete": "deleteSpending",
		"click div.spendings div.tool_panel .button_add_spending": "showFormAddSpending",
		"click div.spendings table.spendings div.edit": "showFormEditSpending",
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
			
			this.$('div.tool_panel .button_add_spending').button();
			
			this.trigger('render');
		}
	},
	
	deleteSpending: function(event)
	{
		try
		{
			var spendingId = $(event.target).parents('tr').attr('data-spending-id');
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
	},
	
	showFormAddSpending: function()
	{
		myWallet.views.formAddSpending.render();
	},
	
	showFormEditSpending: function(event)
	{
		var spendingId = $(event.target).parents('tr').attr('data-spending-id');
		var spending = this._getSpendings().get(spendingId);
		
		myWallet.views.formAddSpending.render(spending);
	},
	
	saveSpending: function(spendingId, spendingData)
	{
		try
		{
			var spending = this._getSpendings().get(spendingId);
			spending = spending || new Spending();	
			
			spending.save(
				spendingData, 
				{
					success: function(model, response, options){
						if(spending.isNew())
						{
							spending.set('id', response.spendingId);
						}
					},
					error: function(model, xhr, options){
						throw myWallet.getErrorMessage($.parseJSON(xhr.responseText).code);
					},
				}
			);
			
			this.trigger('spending:save:success');

			this._getSpendings().add(spending);
			this.render();
		}
		catch(e)
		{
			myWallet.errorMsg(e);
		}
	},
	
});

