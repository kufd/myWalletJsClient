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
		var data = {dateBegin: this._dateBegin, dateEnd: this._dateEnd, period: this._groupByPeriod};
		if(this._spendingName)
		{
			data.spendingName = this._spendingName;
		}

		$.ajax({
			type: "GET",
			url: this._url,
			async: false,
			headers: myWallet.getAuthHeader(),
			data: data,
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
	},
	
	getDataForChart: function()
	{
		var data = {
			labels: [],
			datasets: [
				{
					label: "",
					fillColor: "rgba(151,187,205,0.2)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: []
				}
			]
		};
	
		for (var k in this.getData())
		{
			var value = this.getData()[k];
			
			var label = value.year;
			if(value.month)
			{
				label += '.' + ('0' + value.month).slice(-2);
			}
			if(value.week)
			{
				label += ' '+myWallet.t("тиждень")+' ' + value.week;
			}
			data.labels.push(label);
			
			data.datasets[0].data.push(value.amount);
		}
		
		return data;
	}
}