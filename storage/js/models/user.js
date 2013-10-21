var User = Backbone.Model.extend({
	
	url: myWallet.apiBaseUrl + '/auth-users/',
	
	defaults: {
		login: null,
		password: null,
		name: null,
		email: null,
		role: null,
		lang: null,
		currency: null,
		useEncryption: null,
		authorized: false
	},
	
	isAuthorized: function()
	{
		return this.get('authorized');
	},
	
	authorize: function(login, password)
	{
		var user = this;
		
		$.ajax({
			type: "GET",
			url: this.url,
			async: false,
			headers: {
		        "Authorization": "Basic " + btoa(login+":"+password)
		    },
			data: {},
			dataType: 'json',
			success: function(fields)
			{
				user.set(fields);
				user.set('authorized', true);
				user.set('password', password);
				user.trigger('autorize:success');
			},
			error: function(data)
			{
				alert($.parseJSON(data.responseText).message);
			}
		});
	}
});