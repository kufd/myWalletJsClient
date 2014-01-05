var myWallet = {
	templates:{},
	views:{},
	user:null,
	apiBaseUrl: 'http://my-wallet-js-client/v1',
	router: null,
	errors:{},
	lastException: null,
};




myWallet.init = function()
{
	this._initErrorHandler();
	
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

myWallet._initErrorHandler = function()
{
	window.onerror = function(msg, url, lineNumber){
		errorMsg = myWallet.lastException instanceof Exception ? myWallet.lastException.getMessage() : myWallet.getErrorMessage(myWallet.errors.UNKNOWN);
		myWallet.lastException = null;
		myWallet.errorMsg(errorMsg);
	}
}

myWallet._initUser = function()
{
	this.user = new User();
},

myWallet._loginUser = function()
{
	this.user.loginWithSavedLoginData();
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
	var exception;
	
	if(jqXHR.status == 502)
	{
		exception = new Exception(myWallet.getErrorMessage(myWallet.errors.CONNECTION), myWallet.errors.CONNECTION);
	}
	else if(jqXHR.status == 401)
	{
		exception = new Exception(myWallet.getErrorMessage(myWallet.errors.UNAUTHORIZED), myWallet.errors.UNAUTHORIZED);
	}
	else
	{
		try
		{
			exception = new Exception(myWallet.getErrorMessage($.parseJSON(jqXHR.responseText).code), $.parseJSON(jqXHR.responseText).code);
		}
		catch(e)
		{
			exception = new Exception(myWallet.getErrorMessage(myWallet.errors.UNKNOWN), myWallet.errors.UNKNOWN);
		}
	}
	
	myWallet.throwException(exception);
}

myWallet.throwException = function(exception)
{
	myWallet.lastException = exception;
	
	throw myWallet.lastException;
}

myWallet.getAuthHeader = function(login, password)
{
	login = login ? login : this.user.get('login');
	password = password ? password : this.user.get('password');
	return {"Authorization": "Basic " + btoa(login+":"+password)};
};

