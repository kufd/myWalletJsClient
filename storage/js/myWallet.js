var myWallet = {
	templates:{},
	views:{},
	user:null,
	apiBaseUrl: '/v1',
	apiJsErrorsUrl: '/jsErrors',
	router: null,
	errors:{},
	lastException: null,
	availableLanguages: ['ua', 'en'],
	translator: new Polyglot(),
	translations:{},
};




myWallet.init = function()
{
	this._initErrorHandler();
	
	this._initUser();
	
	this.views.main = new MainView();
	this.views.main.render();
	
	this.views.login = new LoginView();
	this.views.about = new AboutView();
	this.views.register = new RegisterView();
	this.views.forgotPassword = new ForgotPasswordView();
	this.views.spendings = new SpendingsView();
	this.views.profile = new ProfileView();
	this.views.formAddSpending = new FormAddSpendingView();
	this.views.reports = new ReportsView();
	this.views.reportGroupBySpengingName = new ReportGroupBySpengingNameView();
	
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
			"reports": "reports",
			"reportGroupBySpengingName": "reportGroupBySpengingName",
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
		},
		
		reports: function() {
			myWallet.views.reports.render();
		},
		
		reportGroupBySpengingName: function() {
			myWallet.views.reportGroupBySpengingName.render();
		}

	});

	this.router = new Router();
	
	Backbone.history.start();
}

myWallet._initErrorHandler = function()
{
	window.onerror = function(msg, url, lineNumber){
		errorMsg = myWallet.lastException instanceof Exception ? myWallet.lastException.getMessage() : myWallet.getErrorMessage(myWallet.errors.UNKNOWN);
		myWallet.lastException = null;
		myWallet.errorMsg(errorMsg);
		
		var errorData = {
			msg: msg,
			lineNumber: lineNumber,
			usersMsg : errorMsg,
			pageUrl: document.URL,
			scriptUrl: url,
			user: myWallet.user ? myWallet.user.get('login') : null,
			date: myWallet.now(),
			userAgent: navigator.userAgent
		};
			
		$.ajax({
			type: "POST",
			url: myWallet.apiJsErrorsUrl,
			async: true,
			contentType: 'application/json',
			data: JSON.stringify(errorData)
		});
		
	}
}

myWallet.now = function()
{
	var now = new Date(); 
	
	return $.datepicker.formatDate('yy-mm-dd', now) + " " + now.getHours() + ":" + now.getMinutes() + ":" + ("0" + now.getSeconds()).slice(-2);
}

/**
 * Method for translation
 * 
 * @param string text
 * @returns string
 */
myWallet.t = function(text)
{
	return this.translator.t(text);
}

myWallet.reloadTranslation = function()
{
	this._setLangSettings();
	
	//reload main view and set new root alements for all other views
	this.views.main.render();
	
	for (var viewName in this.views)
	{
		if(viewName != 'main')
		{
			this.views[viewName].setElement('#page');
		}
	}

	//reload current view
	//this hardcode i use to change anchor because render menthod is not called if anchor was not changed
	var fragment = document.location.hash.slice(1);
	this.router.navigate('reports');
	this.router.navigate(fragment, {trigger: true});
}

myWallet._initUser = function()
{
	this.user = new User();
	
	spendingsTop.initialize();
	
	this.user.loginWithSavedLoginData();
	
	this._setLangSettings();
}

myWallet._setLangSettings = function()
{
	this.translator.extend(this.translations[this.user.get('lang')]);
	$.datepicker.setDefaults($.datepicker.regional[this.user.get('lang')]);
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
}

