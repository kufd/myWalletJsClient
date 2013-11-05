
var Spendings = Backbone.Collection.extend({
	model: Spending,
	url: myWallet.apiBaseUrl + '/spendings/',
	
	fetch: function(){
		
		var spendings = this;
		var model = this.model;
		
		$.ajax({
			type: "GET",
			url: this.url,
			async: false,
			headers: {
		        "Authorization": "Basic " + btoa(myWallet.user.get('login')+":"+myWallet.user.get('password'))
		    },
			data: {},
			dataType: 'json',
			success: function(data)
			{
				spendings.set(data.spendings);
			},
			error: function(data)
			{
				var msg = myWallet.getErrorMessage($.parseJSON(data.responseText).code);
				myWallet.errorMsg(msg);
			}
		});
	}
});