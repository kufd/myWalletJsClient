var Spending = Backbone.Model.extend({
	
	url: myWallet.apiBaseUrl + '/spendings/',
	
	defaults: {
		amount: null, 
		spendingNameId: null, 
		date: null, 
		userId: null, 
		spendingName: null, 
		id: null,
	},
	
	destroy: function()
	{
		var spending = this;
		
		$.ajax({
			type: "DELETE",
			url: this.url + spending.get('id') + "/",
			async: false,
			headers: myWallet.getAuthHeader(),
			data: {},
			dataType: 'json',
			error: myWallet.processAjaxError
		});
	},
	
	save: function(attributes, options)
	{
		attributes = attributes || {};
		options = options || {};
		options.headers = myWallet.getAuthHeader();
		options.async = false;
		options.patch = true;
		options.wait = true;
		
		if(!this.isNew())
		{
			options.url = this.url + this.get('id');
		}
				
		return Backbone.Model.prototype.save.call(this, attributes, options);
	}
});
