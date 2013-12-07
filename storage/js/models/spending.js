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
			error: function(data)
			{
				throw myWallet.getErrorMessage($.parseJSON(data.responseText).code);
			}
		});
	},
	
	save: function(attributes, options)
	{
		attributes = attributes || {};
		options = options || {};
		options.headers = myWallet.getAuthHeader();
		options.async = false;
				
		return Backbone.Model.prototype.save.call(this, attributes, options);
	}
});
