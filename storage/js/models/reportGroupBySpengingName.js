var reportGroupBySpengingName = {
	
	_data: null,
	_url: myWallet.apiBaseUrl + '/reports/group-by-spending-name/',
	_sortOptions: {'field': 'amount', 'direction': 'desc'},
	_dateBegin: null,
	_dateEnd: null,
	
	_loadData: function()
	{
		var report = this;

		$.ajax({
			type: "GET",
			url: this._url,
			async: false,
			headers: myWallet.getAuthHeader(),
			data: {dateBegin: this._dateBegin, dateEnd: this._dateEnd},
			dataType: 'json',
			success: function(data)
			{
				report._data = data.data;
				report._sort();
			},
			error: myWallet.processAjaxError
		});
	},
	
	_sort: function()
	{
		this._data = _.sortBy(this._data, this.getSortOptions().field);
		
		if(this.getSortOptions().direction == 'desc')
		{
			this._data = this._data.reverse();
		}
	},
		
	setSortOptions: function(sortOptions)
	{
		this._sortOptions = sortOptions;
		this._sort();
	},
	
	setDateBegin: function(dateBegin)
	{
		this._data = null;
		this._dateBegin = dateBegin;
	},
	
	setDateEnd: function(dateEnd)
	{
		this._data = null;
		this._dateEnd = dateEnd;
	},
	
	getSortOptions: function()
	{
		return this._sortOptions;
	},
	
	getDateBegin: function()
	{
		return  this._dateBegin;
	},
	
	getDateEnd: function()
	{
		return this._dateEnd;
	},
	
	getData: function()
	{
		if(this._data == null)
		{
			this._loadData();
		}
		
		return this._data;
	}
}