var reportAmountBySpenging = {
	
	_data: null,
	_url: myWallet.apiBaseUrl + '/reports/amount-by-period/',
	_dateBegin: null,
	_dateEnd: null,
	_groupByPeriod: null,
	_spendingName: null,
	
	_loadData: function()
	{
		var report = this;

		$.ajax({
			type: "GET",
			url: this._url,
			async: false,
			headers: myWallet.getAuthHeader(),
			data: {dateBegin: this._dateBegin, dateEnd: this._dateEnd, period: this._groupByPeriod},
			dataType: 'json',
			success: function(data)
			{
				report._data = data.data;
			},
			error: myWallet.processAjaxError
		});
	},
	
	setGroupByPeriod: function(groupByPeriod)
	{
		this._data = null;
		this._groupByPeriod = groupByPeriod;
	},
	
	setSpendingName: function(spendingName)
	{
		this._data = null;
		this._spendingName = spendingName;
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
	
	getSpendingName: function()
	{
		return  this._spendingName;
	},
	
	getGroupByPeriod: function()
	{
		return  this._groupByPeriod;
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