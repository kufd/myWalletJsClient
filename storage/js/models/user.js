var User = Backbone.Model.extend({
	
	urlAuth: myWallet.apiBaseUrl + '/auth-users/',
	url: myWallet.apiBaseUrl + '/users/',
	
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
			url: this.urlAuth,
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
				var msg = myWallet.getErrorMessage($.parseJSON(data.responseText).code);
				myWallet.errorMsg(msg);
			}
		});
	},
	
	logout: function()
	{
		this.clear();
		this.set('loggedIn', false);
		this.trigger('logout');
	},
	
	register: function(fields)
	{
		$.ajax({
			type: "POST",
			url: this.url,
			async: false,
			data: fields,
			dataType: 'json',
			success: function(fields)
			{
				myWallet.router.navigate("login", {trigger: true});
			},
			error: function(data)
			{
				var msg = myWallet.getErrorMessage($.parseJSON(data.responseText).code);
				myWallet.errorMsg(msg);
			}
		});
	},
	
	patch: function(fields)
	{
		var user = this;
		var url = this.url + user.get('login') + '/';
		var result = false;

		$.ajax({
			type: "PATCH",
			url: url,
			async: false,
			headers: {
		        "Authorization": "Basic " + btoa(user.get('login')+":"+user.get('password'))
		    },
			data: fields,
			dataType: 'json',
			success: function()
			{
				user.set(fields);
				if(fields['newPassword'])
				{
					user.set('password', fields['newPassword']);
				}
				result = true;
			},
			error: function(data)
			{
				var msg = myWallet.getErrorMessage($.parseJSON(data.responseText).code);
				myWallet.errorMsg(msg);
			}
		});
		
		return result;
	},
});