var myWallet = {
	templates:{},
	views:{},
	user:null,
	apiBaseUrl: 'http://my-wallet-js-client/v1',
	router: null,
	errors:{},
};




myWallet.init = function()
{
	this.templates = new Object();
	this.views = new Object();
	
	this._initUser();
	
	spendingsTop.initialize();

	this.views.main = new MainView();
	this.views.main.render();
	
	this.views.login = new LoginView();
	this.views.about = new AboutView();
	this.views.register = new RegisterView();
	this.views.forgotPassword = new ForgotPasswordView();
	this.views.spendings = new SpendingsView();
	this.views.profile = new ProfileView();
	this.views.formAddSpending = new FormAddSpendingView();
	
	this.views.main.initAfterEvrithing();
	
		
	var Router = Backbone.Router.extend({

		routes: {
			"": "login",
			"login": "login",
			"about": "about",
			"register": "register",
			"forgotPassword": "forgotPassword",
			"spendings": "spendings",
			"profile": "profile",
		},

		login: function() {
			myWallet.views.login.render();
		},

		about: function() {
			myWallet.views.about.render();
		},

		register: function() {
			myWallet.views.register.render();
		},

		forgotPassword: function() {
			myWallet.views.forgotPassword.render();
		},

		spendings: function() {
			myWallet.views.spendings.render();
		},

		profile: function() {
			myWallet.views.profile.render();
		}

	});

	this.router = new Router();
	
	Backbone.history.start();

	this._loginUser();
}


myWallet._initUser = function()
{
	this.user = new User();
},

myWallet._loginUser = function()
{
	try
	{
		this.user.loginWithSavedLoginData();
	}
	catch(e)
	{
		myWallet.errorMsg(e);
	}
}

myWallet.isUserLoggedIn = function()
{
	if(!this.user.isLoggedIn())
	{
		this.router.navigate("login", {trigger: true});
	}
	
	return this.user.isLoggedIn();
}

myWallet.errorMsg = function(msg)
{
	$.jboxmessage('Помилка!', msg, 'top', 'error');
}

myWallet.msg = function(msg)
{
	$.jboxmessage('Повідомлення', msg, 'top');
}

myWallet.setErrors = function(errors)
{
	this.errors = errors;
}

myWallet.getErrorMessage = function(code)
{
	return this.errors[code] ? this.errors[code] : this.errors[1];
}

/**
 * 
 * @param jqXHR login
 * @param String password
 * @param String errorThrown
 */
myWallet.processAjaxError = function(jqXHR, textStatus, errorThrown)
{
	if(jqXHR.status == 502)
	{
		throw myWallet.getErrorMessage(myWallet.errors.CONNECTION);
	}
	else
	{
		try
		{
			throw myWallet.getErrorMessage($.parseJSON(data.responseText).code);
		}
		catch(e)
		{
			throw myWallet.getErrorMessage(myWallet.errors.UNKNOWN);
		}
	}
}

myWallet.getAuthHeader = function(login, password)
{
	login = login ? login : this.user.get('login');
	password = password ? password : this.user.get('password');
	return {"Authorization": "Basic " + btoa(login+":"+password)};
}

