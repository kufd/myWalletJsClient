
var Spendings = Backbone.Collection.extend({
	model: Spending,
	url: myWallet.apiBaseUrl + '/spendings/',
	sortOptions: {'field': 'date', 'direction': 'desc'},
	
	fetch: function(dateBegin, dateEnd){
		
		var spendings = this;
		
		$.ajax({
			type: "GET",
			url: this.url,
			async: false,
			headers: myWallet.getAuthHeader(),
			data: {dateBegin: dateBegin, dateEnd: dateEnd},
			dataType: 'json',
			success: function(data)
			{
				spendings.set(data.spendings);
			},
			error: myWallet.processAjaxError
		});
	},

	deleteSpending: function(spendingId)
	{
		var spending = this.get(spendingId);
		
		spending.destroy();
		
		this.remove(spending);
	},
	
	comparator: function(spending1, spending2)
    {
		var result = 0;
		
		var val1 = spending1.get(this.sortOptions.field);
		var val2 = spending2.get(this.sortOptions.field);
		var id1 = spending1.get('id');
		var id2 = spending2.get('id');
		
		if(val1 > val2 || val1 == val2 && id1 > id2)
		{
			result = 1;
		}
		else if(val1 < val2 || val1 == val2 && id1 < id2)
		{
			result = -1;
		}
		
		if(this.sortOptions.direction == 'desc')
		{
			result = -result;
		}

		return result;
    },
});