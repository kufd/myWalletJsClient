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
	
});