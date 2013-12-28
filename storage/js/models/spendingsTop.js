var spendingsTop = {
	
	url: myWallet.apiBaseUrl + '/spendings/top/',
	list: null,
	
	initialize: function () {
		
		myWallet.user.bind(
			'login:success', 
			function(){ 
				spendingsTop.load(); 
			}
		);
    },
	
	load: function()
	{
		var self = this;
		$.ajax({
			type: "GET",
			url: this.url,
			async: true,
			headers: myWallet.getAuthHeader(),
			data: {},
			dataType: 'json',
			error: myWallet.processAjaxError,
			success: function(spendingNamesList)
			{
				self.list = spendingNamesList;
			}
		});
	},
	
	get: function()
	{
		return this.list;
	}

}
