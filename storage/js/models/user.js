var User = Backbone.Model.extend({
	
	urlAuth: myWallet.apiBaseUrl + '/auth-users/',
	url: myWallet.apiBaseUrl + '/users/',
	
	defaults: {
		login: null,
		password: null,
		name: null,
		email: null,
		role: null,
		lang: myWallet._getDefaultUserLang(),
		currency: null,
		useEncryption: null,
		authorized: false
	},
	
	isLoggedIn: function()
	{
		return this.get('loggedIn');
	},
	
	login: function(login, password, keepLoggedIn)
	{
		var user = this;

		$.ajax({
			type: "GET",
			url: this.urlAuth,
			async: false,
			headers: myWallet.getAuthHeader(login, password),
			data: {},
			dataType: 'json',
			success: function(fields)
			{
				user.set(fields);
				user.set('loggedIn', true);
				user.set('password', password);
				user.trigger('login:success');
			},
			error: myWallet.processAjaxError
		});

		if(this.isLoggedIn() && keepLoggedIn)
		{
			this._saveLoginData();
		}
	},
	
	logout: function()
	{
		var userLang = this.get('lang');
		
		this.clear();
		this.set('lang', userLang);
		this._removeLoginData();
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
			error: myWallet.processAjaxError
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
			headers: myWallet.getAuthHeader(),
			data: fields,
			dataType: 'json',
			success: function()
			{
				user.set(fields);
				if(fields['newPassword'])
				{
					user.set('password', fields['newPassword']);

					if(user._getSavedLoginData())
					{
						user._saveLoginData();
					}
				}
				result = true;
			},
			error: myWallet.processAjaxError
		});
		
		return result;
	},

	_getSavedLoginData: function()
	{
		return $.localStorage.isSet(['login','password']) ? $.localStorage.get(['login','password']) : null;
	},

	_saveLoginData: function()
	{
		$.localStorage.set(
			{
				'login': this.get('login'),
				'password': this.get('password')
			}
		);
	},

	_removeLoginData: function()
	{
		return $.localStorage.remove(['login','password']);
	},

	loginWithSavedLoginData: function()
	{
		if(this._getSavedLoginData())
		{
			this.login(this._getSavedLoginData().login, this._getSavedLoginData().password);
		}
	}
});