var User = Backbone.Model.extend({
	
	url: myWallet.apiBaseUrl + '/auth-users/',
	
	initialize: function(){
		
		
		
	},
	defaults: {
		login: null,
		password: null,
		name: null,
		email: null,
		role: null,
		lang: null,
		currency: null,
		useEncryption: null,
		autorized: false
	},
	
	isLoaded: function()
	{
		return this.autorized;
	},
	
	autorize: function(login, password)
	{
		$.ajax({
			type: "GET",
			url: this.url,
			async: false,
			headers: {
		        "Authorization": "Basic " + btoa(login+":"+password)
		    },
			data: {},
			dataType: 'json',
		});
	}
});