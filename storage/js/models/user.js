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
	
	isLoggedIn: function()
	{
		return this.get('loggedIn');
	},
	
	login: function(login, password)
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
				user.set('loggedIn', true);
				user.set('password', password);
				user.trigger('login:success');
			},
			error: function(data)
			{
				alert($.parseJSON(data.responseText).message);
			}
		});
	},
	
	logout: function()
	{
		this.clear();
		this.set('loggedIn', false);
		this.trigger('logout');
	}
});