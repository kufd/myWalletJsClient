/* English/UK initialisation for the jQuery UI date picker plugin. */
/* Written by Stuart. */
jQuery(function($){
	$.datepicker.regional['en'] = {
		closeText: 'Done',
		prevText: 'Prev',
		nextText: 'Next',
		currentText: 'Today',
		monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
		monthNamesGenitive: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
});
/* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Andrew Stromnov (stromnov@gmail.com). */
jQuery(function($){
        $.datepicker.regional['ru'] = {
                closeText: 'Закрыть',
                prevText: '&#x3c;Пред',
                nextText: 'След&#x3e;',
                currentText: 'Сегодня',
                monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
                'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
                monthNamesGenitive: ['Січня','Лютого','Березня','Квітня','Травня','Червня',
                'Липня','Серпня','Вересня','Жовтня','Листопада','Грудня'],
                monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
                'Июл','Авг','Сен','Окт','Ноя','Дек'],
                dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
                dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
                dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
                weekHeader: 'Не',
                dateFormat: 'dd.mm.yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''};
});
/* Ukrainian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Maxim Drogobitskiy (maxdao@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ua'] = {
		closeText: 'Закрити',
		prevText: '&#x3c;',
		nextText: '&#x3e;',
		currentText: 'Сьогодні',
		monthNames: ['Січень','Лютий','Березень','Квітень','Травень','Червень',
		'Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'],
		monthNamesGenitive: ['Січня','Лютого','Березня','Квітня','Травня','Червня',
		'Липня','Серпня','Вересня','Жовтня','Листопада','Грудня'],
		monthNamesShort: ['Січ','Лют','Бер','Кві','Тра','Чер',
		'Лип','Сер','Вер','Жов','Лис','Гру'],
		dayNames: ['неділя','понеділок','вівторок','середа','четвер','п’ятниця','субота'],
		dayNamesShort: ['нед','пнд','вів','срд','чтв','птн','сбт'],
		dayNamesMin: ['Нд','Пн','Вт','Ср','Чт','Пт','Сб'],
		weekHeader: 'Не',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
});
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
	
	myWallet.user.bind(
		'login:success', 
		function(){ 
			if(myWallet._getDefaultUserLang() != myWallet.user.get('lang'))
			{
				myWallet.reloadTranslation();
			}
		}
	);
}

myWallet._setLangSettings = function()
{
	this.translator.extend(this.translations[this.user.get('lang')]);
	$.datepicker.setDefaults($.datepicker.regional[this.user.get('lang')]);
}

myWallet._getDefaultUserLang = function()
{
	var userLang = navigator.language || navigator.userLanguage;
	userLang = userLang == 'uk' ? 'ua' : userLang;
	
	if(_.indexOf(this.availableLanguages, userLang) == -1)
	{
		userLang = 'en';
	}
	
	return userLang;
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


myWallet.translations.en = {
	"Мій гаманець" : "My Wallet",
	"Звіти" : "Reports",
	"Профіль" : "Profile",
	"Вихід" : "Sign out",
	"Додати витрату" : "Add spending",
	"Гаманець": "Wallet",
	"Адмін-панель": "Admin-panel",
	"Вхід": "Sign in",
	"Логін": "Login",
	"Ім’я": "Name",
	"Мова": "Language",
	"Валюта": "Currency",
	"Шифрувати дані": "Encrypt data",
	"Новий пароль": "New password",
	"Повтор нового паролю": "Retype new password",
	"Поточний пароль": "Current password",
	"Зберегти": "Save",
	"Період": "Period",
	"Витрата": "Spending",
	"Сума": "Amount",
	"Дата": "Date",
	"Дії": "Actions",
	"Редагувати": "Edit",
	"Видалити": "Delete",
	"Загальна сума": "Total amount",
	"Сервіс який допоможе підсумувати ваші витрати": "Service which can count money you spend",
	"Більше інформації": "More information",
	"Пароль": "Password",
	"Запам’ятати": "Keep me signed in",
	"Увійти": "Sign in",
	"Забув пароль": "Forgot password",
	"Зареєструватись": "Register",
	"це сервіс з допомогою якого ви можете підсумовувати свої витрати за періоди часу": "service which can count money your spend for some period of time",
	"А потім, з допомогою <b>MyWallet</b> внесені витрати можна групувати по днях та назвах і визначити на що ви найбільше витрачали грошей": "Then, with <b>MyWallet</b> you can group spendings by days and names. And you can see the biggest spendings",
	"Всі цифри які ви вносите можуть шифруватись, але <b>у випадку втрати паролю цю інформацію не можна буде відновити</b>": "All amounts you save could be enncrypted, but <b>if you lose password it is imposible to get this information</b>",
	"Реєстрація": "Sign up",
	"Повтор пароля": "Retype password",
	"Контакти": "Contacts",
	"Увага": "Attention",
	"При використанні процедури відновлення паролю буде втрачена зашифрована інформація": "If you use restore password process, encrypted information will be lost",
	"Відровлення паролю": "Restore passwrod",
	"Введіть ваш логін": "Enter your login",
	"Відновити": "Restore",
	"Сума по витратах": "Amount by spending name",
	"Нова витрата": "New spending",
	"Інша витрата": "another spending",
	"Звіт: сума по витратах": "Report: amount by spending name",
	"Відмінити": "Cancel",
}

myWallet.translations.ua = {
	"Мій гаманець" : "Мій гаманець",
	"Звіти" : "Звіти",
	"Профіль" : "Профіль",
	"Вихід" : "Вихід",
	"Додати витрату" : "Додати витрату",
	"Гаманець": "Гаманець",
	"Адмін-панель": "Адмін-панель",
	"Вхід": "Вхід",
	"Логін": "Логін",
	"Ім’я": "Ім’я",
	"Мова": "Мова",
	"Валюта": "Валюта",
	"Шифрувати дані": "Шифрувати дані",
	"Новий пароль": "Новий пароль",
	"Повтор нового паролю": "Повтор нового паролю",
	"Поточний пароль": "Поточний пароль",
	"Зберегти": "Зберегти",
	"Період": "Період",
	"Витрата": "Витрата",
	"Сума": "Сума",
	"Дата": "Дата",
	"Дії": "Дії",
	"Редагувати": "Редагувати",
	"Видалити": "Видалити",
	"Загальна сума": "Загальна сума",
	"Сервіс який допоможе підсумувати ваші витрати": "Сервіс який допоможе підсумувати ваші витрати",
	"Більше інформації": "Більше інформації",
	"Пароль": "Пароль",
	"Запам’ятати": "Запам’ятати",
	"Увійти": "Увійти",
	"Забув пароль": "Забув пароль",
	"Зареєструватись": "Зареєструватись",
	"це сервіс з допомогою якого ви можете підсумовувати свої витрати за періоди часу": "це сервіс з допомогою якого ви можете підсумовувати свої витрати за періоди часу",
	"А потім, з допомогою <b>MyWallet</b> внесені витрати можна групувати по днях та назвах і визначити на що ви найбільше витрачали грошей": "А потім, з допомогою <b>MyWallet</b> внесені витрати можна групувати по днях та назвах і визначити на що ви найбільше витрачали грошей",
	"Всі цифри які ви вносите можуть шифруватись, але <b>у випадку втрати паролю цю інформацію не можна буде відновити</b>": "Всі цифри які ви вносите можуть шифруватись, але <b>у випадку втрати паролю цю інформацію не можна буде відновити</b>",
	"Реєстрація": "Реєстрація",
	"Повтор пароля": "Повтор пароля",
	"Контакти": "Контакти",
	"Увага": "Увага",
	"При використанні процедури відновлення паролю буде втрачена зашифрована інформація": "При використанні процедури відновлення паролю буде втрачена зашифрована інформація",
	"Відровлення паролю": "Відровлення паролю",
	"Введіть ваш логін": "Введіть ваш логін",
	"Відновити": "Відновити",
	"Сума по витратах": "Сума по витратах",
	"Нова витрата": "Нова витрата",
	"Інша витрата": "Інша витрата",
	"Звіт: сума по витратах": "Звіт: сума по витратах",
	"Відмінити": "Відмінити",
}

;
(function(){
	
	var errors = {
		1 : 'Невідома помилка',
		11 : 'Помилка при з’єднанні з сервером.',
		12 : 'Неправильний логін або пароль',
		
		101 : 'Довжина логіну має бути більшою 5 і меншою 50 символів',
		102 : 'Довжина імені має бути більшою 2 і меншою 100 символів',
		103 : 'Неправильний код мови',
		104 : 'Неправильний email',
		105 : 'Не введений пароль',
		106 : 'Не введено підтвердження паролю',
		107 : 'Не правильно задана опція шифрування даних',
		109 : 'Такий логін вже існує',
		110 : 'Такий email вже існує',
		111 : 'Пароль та його підтвердження не співпадають',
		112 : 'Неправильний пароль',
		
		114 : 'Введіть назву витрати',
		115 : 'Сума витрати має бути числом',
		116 : 'Не задана дата для витрати',
		
		
		UNKNOWN: 1,
		CONNECTION: 11,
		UNAUTHORIZED: 12,
	};
	
	myWallet.setErrors(errors);
	
})();


var Exception = function(message, code)
{
	var code;
	var message;
	
	this.getMessage = function()
	{
		return message;
	}
	
	this.getCode = function()
	{
		return code;
	}
}

Exception.prototype = new Error();
Exception.prototype.constructor = Exception;

$( document ).ready(function() {
  
	myWallet.init();

});
var spendingsTop = {
	
	url: myWallet.apiBaseUrl + '/spendings/top/',
	list: null,
	
	initialize: function () {
		
		myWallet.user.bind(
			'login:success', 
			function(){ 
				spendingsTop.load(); 
			}
		);
    },
	
	load: function()
	{
		var self = this;
		$.ajax({
			type: "GET",
			url: this.url,
			async: true,
			headers: myWallet.getAuthHeader(),
			data: {},
			dataType: 'json',
			error: myWallet.processAjaxError,
			success: function(spendingNamesList)
			{
				self.list = spendingNamesList;
			}
		});
	},
	
	get: function()
	{
		return this.list;
	}

}

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
	
	destroy: function()
	{
		var spending = this;
		
		$.ajax({
			type: "DELETE",
			url: this.url + spending.get('id') + "/",
			async: false,
			headers: myWallet.getAuthHeader(),
			data: {},
			dataType: 'json',
			error: myWallet.processAjaxError
		});
	},
	
	save: function(attributes, options)
	{
		attributes = attributes || {};
		options = options || {};
		options.headers = myWallet.getAuthHeader();
		options.async = false;
		options.patch = true;
		options.wait = true;
		
		if(!this.isNew())
		{
			options.url = this.url + this.get('id');
		}
				
		return Backbone.Model.prototype.save.call(this, attributes, options);
	}
});

var reportGroupBySpengingName = {
	
	_data: null,
	_url: myWallet.apiBaseUrl + '/reports/group-by-spending-name/',
	_sortOptions: {'field': 'amount', 'direction': 'desc'},
	_dateBegin: null,
	_dateEnd: null,
	
	_loadData: function()
	{
		var report = this;

		$.ajax({
			type: "GET",
			url: this._url,
			async: false,
			headers: myWallet.getAuthHeader(),
			data: {dateBegin: this._dateBegin, dateEnd: this._dateEnd},
			dataType: 'json',
			success: function(data)
			{
				report._data = data.data;
				report._sort();
			},
			error: myWallet.processAjaxError
		});
	},
	
	_sort: function()
	{
		this._data = _.sortBy(this._data, this.getSortOptions().field);
		
		if(this.getSortOptions().direction == 'desc')
		{
			this._data = this._data.reverse();
		}
	},
		
	setSortOptions: function(sortOptions)
	{
		this._sortOptions = sortOptions;
		this._sort();
	},
	
	setDateBegin: function(dateBegin)
	{
		this._data = null;
		this._dateBegin = dateBegin;
	},
	
	setDateEnd: function(dateEnd)
	{
		this._data = null;
		this._dateEnd = dateEnd;
	},
	
	getSortOptions: function()
	{
		return this._sortOptions;
	},
	
	getDateBegin: function()
	{
		return  this._dateBegin;
	},
	
	getDateEnd: function()
	{
		return this._dateEnd;
	},
	
	getData: function()
	{
		if(this._data == null)
		{
			this._loadData();
		}
		
		return this._data;
	}
}

var Spendings = Backbone.Collection.extend({
	model: Spending,
	url: myWallet.apiBaseUrl + '/spendings/',
	sortOptions: {'field': 'date', 'direction': 'desc'},
	
	fetch: function(dateBegin, dateEnd){
		
		var spendings = this;
		
		$.ajax({
			type: "GET",
			url: this.url,
			async: false,
			headers: myWallet.getAuthHeader(),
			data: {dateBegin: dateBegin, dateEnd: dateEnd},
			dataType: 'json',
			success: function(data)
			{
				spendings.set(data.spendings);
			},
			error: myWallet.processAjaxError
		});
	},

	deleteSpending: function(spendingId)
	{
		var spending = this.get(spendingId);
		
		spending.destroy();
		
		this.remove(spending);
	},
	
	comparator: function(spending1, spending2)
    {
		var result = 0;
		
		var val1 = spending1.get(this.sortOptions.field);
		var val2 = spending2.get(this.sortOptions.field);
		var id1 = spending1.get('id');
		var id2 = spending2.get('id');
		
		if(this.sortOptions.field == 'amount')
		{
			val1 = parseFloat(val1);
			val2 = parseFloat(val2);
		}
		
		if(val1 > val2 || val1 == val2 && id1 > id2)
		{
			result = 1;
		}
		else if(val1 < val2 || val1 == val2 && id1 < id2)
		{
			result = -1;
		}
		
		if(this.sortOptions.direction == 'desc')
		{
			result = -result;
		}

		return result;
    },
});

myWallet.templates.about = _.template(
	'<div class="about">\
\
		<p>\
			<b>MyWallet</b> - <%=myWallet.t("це сервіс з допомогою якого ви можете підсумовувати свої витрати за періоди часу")%>.\
			<br/>\
			<%=myWallet.t("А потім, з допомогою <b>MyWallet</b> внесені витрати можна групувати по днях та назвах і визначити на що ви найбільше витрачали грошей")%>.\
		</p>\
\
		<p>\
			<%=myWallet.t("Всі цифри які ви вносите можуть шифруватись, але <b>у випадку втрати паролю цю інформацію не можна буде відновити</b>")%>.\
		</p>\
\
	</div>'
);




myWallet.templates.forgotPassword = _.template(
	'<div class="forgotPassword">\
\
		<div class="alert">\
			<h2><%=myWallet.t("Увага")%>!</h3>\
			<%=myWallet.t("При використанні процедури відновлення паролю буде втрачена зашифрована інформація")%>.\
		</div>\
\
		<div class="form">\
			<h3><%=myWallet.t("Відровлення паролю")%></h3>\
\
			<table>\
			<tr>\
				<td><%=myWallet.t("Введіть ваш логін")%></td>\
				<td><input type="text" name="login"></td>\
			</tr>\
			<tr>\
				<td colspan="2" class="submit">\
					<input type="button" value="<%=myWallet.t("Відновити")%>" />\
				</td>\
			</tr>\
			</table>\
		</div>\
\
	</div>'
);




myWallet.templates.formAddSpending =
	'<div class="formAddSpending" title="<%=myWallet.t("Нова витрата")%>">\
		<table>\
		<tr>\
			<td class="name"><%=myWallet.t("Витрата")%></td>\
			<td class="value">\
				<% if(!spendingsTop.get()){ %>\
					<input type="text" name="spendingName" />\
				<% }else{ %>\
					<select name="spendingName">\
						<% $.each(spendingsTop.get(), function(index, spendingTopName) { %>\
							<option value="<%=spendingTopName%>"><%=spendingTopName%></option>\
						<% }); %>\
						<option value=""><%=myWallet.t("Інша витрата")%></option>\
					</select>\
				<% } %>\
			</td>\
		</tr>\
		<tr>\
			<td class="name"><%=myWallet.t("Сума")%></td>\
			<td class="value"><input type="text" name="amount" value="" /></td>\
		</tr>\
		<tr>\
			<td class="name"><%=myWallet.t("Дата")%></td>\
			<td class="value">\
				<input type="text" name="dateFront" value="" readonly="readonly" />\
				<input type="hidden" name="date" value="" />\
			</td>\
		</tr>\
		</table>\
		<input type="hidden" name="spendingId" value="" />\
	</div>';



myWallet.templates.login = _.template(
	'<div class="login">\
\
		<p class="about">\
			<%=myWallet.t("Сервіс який допоможе підсумувати ваші витрати")%>.\
			<a href="#about">\
				<%=myWallet.t("Більше інформації")%>.\
			</a>\
		</p>\
\
		<div class="form">\
			<h3><%=myWallet.t("Вхід")%></h3>\
\
			<table>\
			<tr>\
				<td><%=myWallet.t("Логін")%></td>\
				<td><input type="text" name="login"></td>\
			</tr>\
			<tr>\
				<td><%=myWallet.t("Пароль")%></td>\
				<td><input type="password" name="password"></td>\
			</tr>\
			<tr>\
				<td></td>\
				<td><label><input type="checkbox" name="remember"> <%=myWallet.t("Запам’ятати")%></label></td>\
			</tr>\
			<tr>\
				<td colspan="2" class="submit">\
					<input type="button" value="<%=myWallet.t("Увійти")%>" />\
				</td>\
			</tr>\
			<tr>\
				<td colspan="2">\
					<a href="#forgotPassword" class="forgot"><%=myWallet.t("Забув пароль")%></a>\
					<a href="#register" class="register">\
						<%=myWallet.t("Зареєструватись")%>\
					</a>\
				</td>\
			</tr>\
			</table>\
		</div>\
\
	</div>'
);




myWallet.templates.main = _.template(
	'<!-- start header -->\
	<div id="header">\
		<div id="logo">\
			<h1><a href="#spendings"><%=myWallet.t("Мій гаманець")%><sup></sup></a></h1>\
			<h2></h2>\
		</div>\
		<div id="menu">\
			<ul>\
				<li><a href="#reports" class="reports"><%=myWallet.t("Звіти")%></a></li>\
				<li><a href="#spendings" class="spendings"><%=myWallet.t("Гаманець")%></a></li>\
				<li><a href="#profile" class="profile"><%=myWallet.t("Профіль")%></a></li>\
				<li><a href="#" class="controlPanel"><%=myWallet.t("Адмін-панель")%></a></li>\
				<li><a href="#login" class="login"><%=myWallet.t("Вхід")%></a></li>\
				<li><a href="#" class="logout"><%=myWallet.t("Вихід")%></a></li>\
			</ul>\
		</div>\
	</div>\
	<!-- end header -->\
\
	<!-- start page -->\
	<div id="page">\
	</div>\
	<!-- end page -->\
\
	<!-- start footer -->\
	<div id="footer">\
		<div id="footer-menu">\
			<!--ul>\
				<li class="active"><a href="index.html">головна</a></li>\
			</ul-->\
		</div>\
		<div class="contacts"><%=myWallet.t("Контакти")%>: <a href="mailto:mywallet.service@gmail.com">mywallet.service@gmail.com</a></div>\
		<p id="legal">(c) 2013 mywallet.com. Design by <a href="http://www.freecsstemplates.org/" target="_blank">Free CSS Templates</a>.</p>\
	</div>\
	<!-- end footer -->'
);




myWallet.templates.profile = 
	'<div class="profile">\
\
		<h3><%=myWallet.t("Профіль")%></h3>\
\
		<table>\
		<tr>\
			<td><%=myWallet.t("Логін")%></td>\
			<td><input type="text" name="login" readonly="readonly" value="<%=user.get(\'login\')%>"/></td>\
		</tr>\
		<tr>\
			<td><%=myWallet.t("Ім’я")%></td>\
			<td><input type="text" name="name" value="<%=user.get(\'name\')%>"/></td>\
		</tr>\
		<tr>\
			<td>e-mail</td>\
			<td><input type="text" name="email" value="<%=user.get(\'email\')%>"/></td>\
		</tr>\
		<tr>\
			<td><%=myWallet.t("Мова")%></td>\
			<td>\
				<select name="lang">\
					<% for (var i in availableLanguages) { %>\
						<% var lang = availableLanguages[i]; %>\
						<option value="<%=lang%>" <%=user.get(\'lang\') == lang ? \'selected="selected"\' : \'\'%>><%=lang%></option>\
					<% } %>\
				</select>\
			</td>\
		</tr>\
		<tr>\
			<td><%=myWallet.t("Валюта")%></td>\
			<td><input type="text" name="currency" value="<%=user.get(\'currency\')%>"/></td>\
		</tr>\
		<tr>\
			<td><%=myWallet.t("Шифрувати дані")%></td>\
			<td><input type="checkbox" name="useEncryption" <%=user.get(\'useEncryption\')==1 ? \'checked="checked"\' : \'\'%> title="При активації цієї опції будуть зашифровані цифри витрат. Але при втраті паролю, їх не можна буде відновити"/></td>\
		</tr>\
		<tr>\
			<td class="pt-15"><%=myWallet.t("Новий пароль")%></td>\
			<td class="pt-15"><input type="password" name="newPassword"/></td>\
		</tr>\
		<tr>\
			<td><%=myWallet.t("Повтор нового паролю")%></td>\
			<td><input type="password" name="confirmNewPassword"/></td>\
		</tr>\
		<tr>\
			<td class="pt-15"><%=myWallet.t("Поточний пароль")%></td>\
			<td class="pt-15"><input type="password" name="password"/></td>\
		</tr>\
		<tr>\
			<td colspan="2" class="submit">\
				<input type="button" value="<%=myWallet.t("Зберегти")%>" />\
			</td>\
		</tr>\
		</table>\
\
	</div>';




myWallet.templates.register = _.template(
	'<div class="register">\
\
		<h3><%=myWallet.t("Реєстрація")%></h3>\
\
		<table>\
		<tr>\
			<td><%=myWallet.t("Логін")%></td>\
			<td><input type="text" name="login"></td>\
		</tr>\
		<tr>\
			<td><%=myWallet.t("Ім’я")%></td>\
			<td><input type="text" name="name"></td>\
		</tr>\
		<tr>\
			<td>e-mail</td>\
			<td><input type="text" name="email"></td>\
		</tr>\
		<tr>\
			<td><%=myWallet.t("Пароль")%></td>\
			<td><input type="text" name="password"></td>\
		</tr>\
		<tr>\
			<td><%=myWallet.t("Повтор пароля")%></td>\
			<td><input type="text" name="confirmPassword"></td>\
		</tr>\
		<tr>\
			<td colspan="2" class="submit">\
				<input type="button" value="<%=myWallet.t("Зареєструватись")%>" />\
			</td>\
		</tr>\
		</table>\
\
	</div>'
);




myWallet.templates.reportGroupBySpengingName = 
	'<div class="reportGroupBySpengingName">\
\
		<h2><%=myWallet.t("Звіт: сума по витратах")%></h2>\
		<div class="tool_panel">\
			Період: \
			<input name="dateBeginFront" type="text">\
			<input type="hidden" name="dateBegin" />\
			&mdash;\
			<input name="dateEndFront" type="text">\
			<input type="hidden" name="dateEnd" />\
		</div>\
\
		<table class="spendings">\
		<tr>\
			<th class="spendingName">\
				<div data-field="spendingName" class="<%=sortOptions.field == "spendingName" ? sortOptions.direction : ""%>"><%=myWallet.t("Витрата")%></div>\
			</th>\
			<th class="amount">\
				<div data-field="amount" class="<%=sortOptions.field == "amount" ? sortOptions.direction : ""%>"><%=myWallet.t("Сума")%></div>\
			</th>\
		</tr>\
\
		<% var sum = 0; %>\
		<% for (var key in data) { %>\
			<% spending = data[key]; %>\
			<% sum+=parseInt(spending.amount*100); %>\
			<tr>\
				<td class="spendingName">\
					<%=spending.spendingName%>\
				</td>\
				<td class="amount">\
					<%=spending.amount%>  <%=user.get("currency")%>\
				</td>\
			</tr>\
		<% } %>\
\
		<tr class="sum">\
			<td class="spendingName">\
				<%=myWallet.t("Загальна сума")%>\
			</td>\
			<td class="amount">\
				<%=sum/100%> <%=user.get("currency")%>\
			</td>\
		</tr>\
		</table>\
\
	</div>';




myWallet.templates.reports =
	'<div class="reports">\
\
		<ul>\
			<li><a href="#reportGroupBySpengingName"><%=myWallet.t("Сума по витратах")%></a></li>\
		</ul>\
\
	</div>';



myWallet.templates.spendings =
	'<div class="spendings">\
\
		<div class="tool_panel">\
			<div class="button_add_spending"><%=myWallet.t("Додати витрату")%></div>\
			<div class="dateFilter">\
				<h5><%=myWallet.t("Період")%>:</h5>\
				<input type="text" name="dateBeginFront" />\
				<input type="hidden" name="dateBegin" />\
				&mdash;\
				<input type="text" name="dateEndFront" />\
				<input type="hidden" name="dateEnd" />\
			</div>\
		</div>\
\
		<table class="spendings">\
		<tr>\
			<th class="spendingName">\
				<div data-field="spendingName" class="<%=sortOptions.field == "spendingName" ? sortOptions.direction : ""%>"><%=myWallet.t("Витрата")%></div>\
			</th>\
			<th class="amount">\
				<div data-field="amount" class="<%=sortOptions.field == "amount" ? sortOptions.direction : ""%>"><%=myWallet.t("Сума")%></div>\
			</th>\
			<th class="date">\
				<div data-field="date" class="<%=sortOptions.field == "date" ? sortOptions.direction : ""%>"><%=myWallet.t("Дата")%></div>\
			</th>\
			<th class="actions">\
				<%=myWallet.t("Дії")%>\
			</th>\
		</tr>\
\
		<% var sum = 0; %>\
		<% spendings.each(function(spending) { %>\
		<% sum+=parseInt(spending.get("amount")*100); %>\
		<tr data-spending-id="<%=spending.get("id")%>">\
			<td class="spendingName">\
				<%=spending.get("spendingName")%>\
			</td>\
			<td class="amount">\
			<%=spending.get("amount")%>  <%=user.get("currency")%>\
			</td>\
			<td class="date">\
				<%=$.datepicker.formatDate("d GG yy", new Date(spending.get("date")))%>\
			</td>\
			<td class="actions">\
				<div class="edit" title="<%=myWallet.t("Редагувати")%>">&nbsp;</div>\
				<div class="delete" title="<%=myWallet.t("Видалити")%>">&nbsp;</div>\
			</td>\
		</tr>\
		<% }); %>\
\
		<tr class="sum">\
			<td class="spendingName">\
				<%=myWallet.t("Загальна сума")%>\
			</td>\
			<td class="amount">\
				<%=sum/100%> <%=user.get("currency")%>\
			</td>\
			<td class="date">\
			</td>\
			<td class="actions">\
			</td>\
		</tr>\
		</table>\
	</div>';


var MainView = Backbone.View.extend({
	el: 'body',
	template: myWallet.templates.main,
	
	events: {
	    "click .logout": "logout"
	},
	
	initialize: function () {
		
		var view = this;
		
    },
	
	render: function () {
		this.$el.html(this.template());
	},
	
	logout: function(){
		myWallet.user.logout();
	},
	
	initAfterEvrithing: function()
	{
		var view = this;
		
		myWallet.views.spendings.bind(
			'render', 
			function(){ 
				view.$('a.spendings, a.login').hide();
				view.$('a.reports, a.logout, a.profile').show();
			}
		);
		
		myWallet.views.login.bind(
			'render', 
			function(){ 
				view.$('a.login, a.logout, a.spendings, a.profile, a.reports').hide();
			}
		);
		
		myWallet.views.register.bind(
			'render', 
			function(){ 
				view.$('a.logout, a.spendings, a.profile, a.reports').hide();
				view.$('a.login').show();
			}
		);
		
		myWallet.views.about.bind(
			'render', 
			function(){ 
				view.$('a.logout, a.spendings, a.profile, a.reports').hide();
				view.$('a.login').show();
			}
		);
		
		myWallet.views.profile.bind(
			'render', 
			function(){ 
				view.$('a.login, a.profile').hide();
				view.$('a.reports, a.logout, a.spendings').show();
			}
		);
		
		myWallet.views.forgotPassword.bind(
			'render', 
			function(){ 
				view.$('a.profile, a.logout, a.spendings, a.reports').hide();
				view.$('a.login').show();
			}
		);

		myWallet.views.reports.bind(
			'render', 
			function(){ 
				view.$('a.reports, a.login').hide();
				view.$('a.spendings, a.logout, a.profile').show();
			}
		);
	}
});


var LoginView = Backbone.View.extend({
	
	el: '#page',
	rootEl:'div.login',
	template: myWallet.templates.login,
	
	events: {
		"click div.login .submit input": "login",
		"keyup div.login div.form table": function(event){
			if (event.which == 13) 
			{
				this.login();
			} 
		}
	},
	
	initialize: function () {
		myWallet.user.bind(
			'logout', 
			function(){ 
				myWallet.router.navigate("#login", {trigger: true}); 
			}
		);
    },
	
	render: function () {
		if(myWallet.isUserLoggedIn())
		{
			myWallet.router.navigate("#spendings", {trigger: true}); 
		}
		else
		{
			this.trigger('render');
			this.$el.html(this.template());
		}
	},
	
	login: function(){
		
		if(!this.$("input[name=login]").val())
		{
			myWallet.throwException(new Exception('Введіть логін'));
		}
		
		if(!this.$("input[name=password]").val())
		{
			myWallet.throwException(new Exception('Введіть пароль'));
		}
		
		myWallet.user.login(
			this.$("input[name=login]").val(), 
			this.$("input[name=password]").val(),
			this.$("input[name=remember]").is(':checked')
		);
	}
	
});


var AboutView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.about,
	render: function () {
		this.trigger('render');
		this.$el.html(this.template());
	},
});


var RegisterView = Backbone.View.extend({
	el: '#page',
	rootEl:'div.register',
	template: myWallet.templates.register,
	
	events: {
	    "click div.register .submit input": "register"
	},
	
	render: function () {
		this.trigger('render');
		this.$el.html(this.template());
	},
	
	register: function(){
		myWallet.user.register({
			'login': this.$("input[name=login]").val(), 
			'name': this.$("input[name=name]").val(), 
			'email': this.$("input[name=email]").val(), 
			'password': this.$("input[name=password]").val(),
			'confirmPassword': this.$("input[name=confirmPassword]").val(),
			'lang': 'ua', 
			'currency': 'грн', 
			'useEncryption': '0'
		});
	}
});


var ForgotPasswordView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.forgotPassword,
	
	render: function () {
		this.trigger('render');
		this.$el.html(this.template());
	},
});


var SpendingsView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.spendings,
	spendings: null,
	dateBegin: null,
	dateEnd: null,
	
	events: {
		"click div.spendings table.spendings .delete": "deleteSpending",
		"click div.spendings div.tool_panel .button_add_spending": "showFormAddSpending",
		"click div.spendings table.spendings div.edit": "showFormEditSpending",
		"click div.spendings table.spendings th div": "sortSpendings",
	},
	
	initialize: function () {
		
		myWallet.user.bind(
			'login:success', 
			function(){ 
				myWallet.router.navigate("spendings", {trigger: true}); 
			}
		);
		
		this.dateBegin = $.datepicker.formatDate('yy-mm-01', new Date());
		this.dateEnd = $.datepicker.formatDate('yy-mm-'+this.countDaysOfMont(), new Date());
    },
    
    countDaysOfMont: function()
    {
    	var date = new Date();
    	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    },
    
    render: function () {
		if(myWallet.isUserLoggedIn())
		{
			this._getSpendings().sort();
			var template = _.template(
				this.template, 
				{
					spendings: this._getSpendings(), 
					user: myWallet.user, 
					sortOptions: this.spendings.sortOptions
				}
			);
			this.$el.html(template);
			
			//---------------- initializing tool panel ---------------
			this.$('div.tool_panel .button_add_spending').button();
			
			
			var view = this;
			this.$("input[name=dateBegin]").val(this.dateBegin);
			this.$("input[name=dateBeginFront]")
			.val($.datepicker.formatDate('d GG yy', new Date(this.dateBegin)))
			.datepicker({
				dateFormat:'d GG yy',
				altField: this.$("input[name=dateBegin]"),
				altFormat: "yy-mm-dd",
				onClose: function(){
					view.dateBegin = view.$("input[name=dateBegin]").val();
					view._getSpendings(true);
					view.render();
				}
			});
			
			this.$("input[name=dateEnd]").val(this.dateEnd);
			this.$("input[name=dateEndFront]")
			.val($.datepicker.formatDate('d GG yy', new Date(this.dateEnd)))
			.datepicker({
				dateFormat:'d GG yy',
				altField: this.$("input[name=dateEnd]"),
				altFormat: "yy-mm-dd",
				onClose: function(){
					view.dateEnd = view.$("input[name=dateEnd]").val();
					view._getSpendings(true);
					view.render();
				}
			});
			//-------------------
			
			this.trigger('render');
		}
	},
	
	deleteSpending: function(event)
	{
		var spendingId = $(event.target).parents('tr').attr('data-spending-id');
		this._getSpendings().deleteSpending(spendingId);
		
		this.render();
	},
	
	_getSpendings: function(force)
	{
		if (force || this.spendings == null)
		{
			this.spendings = new Spendings(); 
			this.spendings.fetch(this.dateBegin, this.dateEnd);
		}
		
		return this.spendings;
	},
	
	showFormAddSpending: function()
	{
		myWallet.views.formAddSpending.render();
	},
	
	showFormEditSpending: function(event)
	{
		var spendingId = $(event.target).parents('tr').attr('data-spending-id');
		var spending = this._getSpendings().get(spendingId);
		
		myWallet.views.formAddSpending.render(spending);
	},
	
	saveSpending: function(spendingId, spendingData)
	{
		var spending = this._getSpendings().get(spendingId);
		spending = spending || new Spending();	

		spending.save(
			spendingData, 
			{
				success: function(model, response, options){
					if(spending.isNew())
					{
						spending.set('id', response.spendingId);
					}
				},
				error: function(model, xhr, options){ myWallet.processAjaxError(xhr, null, null) }
			}
		);

		this.trigger('spending:save:success');

		this._getSpendings().add(spending);
		this.render();
	},
	
	sortSpendings: function(event)
	{
		var field = $(event.target).attr('data-field');
		
		if(this.spendings.sortOptions.field == field)
		{
			this.spendings.sortOptions.direction = this.spendings.sortOptions.direction == 'asc' ? 'desc' : 'asc';
		}
		else
		{
			this.spendings.sortOptions.direction = 'desc';
			this.spendings.sortOptions.field = field;
		}
		
		this.render();
	}
	
});


var ProfileView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.profile,
	
	events: {
		"click div.profile .submit input": "save"
	},
		
	render: function () {
		if(myWallet.isUserLoggedIn())
		{
			var template = _.template(this.template, {user: myWallet.user, availableLanguages: myWallet.availableLanguages});
			this.$el.html(template);
			
			this.trigger('render');
		}
	},
	
	save: function(){
		var fields = {
			'name': this.$("input[name=name]").val(),
			'email': this.$("input[name=email]").val(),
			'lang': this.$("select[name=lang]").val(),
			'currency': this.$("input[name=currency]").val(),
			'useEncryption': this.$("input[name=useEncryption]").prop('checked') ? '1' : '0',
			'newPassword': this.$("input[name=newPassword]").val(),
			'confirmNewPassword': this.$("input[name=confirmNewPassword]").val(),
			'password': this.$("input[name=password]").val(),
		};
		
		if(myWallet.user.patch(fields))
		{
			myWallet.reloadTranslation();
			myWallet.msg('Профіль збережено');			
		}
		
		this.$("input[name=password], input[name=newPassword], input[name=confirmNewPassword]").val('');
	}
});


var FormAddSpendingView = Backbone.View.extend({
	el: 'body',
	template: myWallet.templates.formAddSpending,
	urlAutocomplete: '/v1/spendings/autocomplete/',
	cacheAutocoplete: {},
	
	events: {
		"click div.formAddSpending select[name=spendingName]": "selectSpendingName"
	},

	initialize: function () {
		
		var form = this;
		
		myWallet.views.spendings.bind(
			'spending:save:success', 
			function(){ 
				form.remove();
			}
		);
    },
	
	render: function (spending) {
		var view = this;
		var template = _.template(this.template);
		this.$el.append(template);
		
		if(spending instanceof Spending)
		{
			if($.inArray(spending.get('spendingName'), spendingsTop.get()) == -1)
			{
				this.replaceSpengingNameSelectByInput();
			}
			
			this.$("input[name=spendingName], select[name=spendingName]").val(spending.get('spendingName'));
			this.$("input[name=amount]").val(spending.get('amount'));
			this.$("input[name=date]").val(spending.get('date'));
			this.$("input[name=dateFront]").val($.datepicker.formatDate('d GG yy', new Date(spending.get('date'))));
			this.$("input[name=spendingId]").val(spending.get('id'));
		}
		else
		{
			this.$("input[name=date]").val($.datepicker.formatDate('yy-mm-dd', new Date()));
			this.$("input[name=dateFront]").val($.datepicker.formatDate('d GG yy', new Date()));
		}
		
		this.$("input[name=dateFront]").datepicker({
			dateFormat:'d GG yy',
			altField: this.$("input[name=date]"),
			altFormat: "yy-mm-dd",
		});
		
		this.$('div.formAddSpending').dialog({
			buttons:
				[ 
					{
		               	text: myWallet.t("Зберегти"),
		               	click: function() { view.saveSpending(); }
					},
				 	{
				 		text: myWallet.t("Відмінити"),
				 		click: function() { view.remove(); }
				 	}
				],
			close: function() { view.remove(); },
			modal: true,
			width: 320
		});
	},
	
	remove: function () {
		$('div.formAddSpending').remove();
	},
	
	saveSpending: function(){
		myWallet.views.spendings.saveSpending(
			this.$("input[name=spendingId]").val(),
			{
				spendingName: this.$("select[name=spendingName], input[name=spendingName]").val(),
				amount: this.$("input[name=amount]").val().replace(',', '.'),
				date: this.$("input[name=date]").val()
			}
		);
	},
	
	selectSpendingName: function()
	{
		if(!this.$("select[name=spendingName]").val())
		{
			this.replaceSpengingNameSelectByInput();
		}
	},
	
	replaceSpengingNameSelectByInput: function()
	{
		var view = this;
		
		this.$("select[name=spendingName]").replaceWith('<input type="text" name="spendingName" />');
		this.$("input[name=spendingName]").autocomplete({
			minLength: 2,
			source: function( request, response ){
				var term = request.term;
				
				if (term in view.cacheAutocoplete) 
				{
					response(view.cacheAutocoplete[term]);
					return;
				}
				
				$.ajax({
					type: "GET",
					url: view.urlAutocomplete,
					async: false,
					headers: myWallet.getAuthHeader(),
					data: {name: request.term},
					dataType: 'json',
					success: function(fields)
					{
						view.cacheAutocoplete[term] = fields;
						response(fields);
					},
					error: myWallet.processAjaxError
				});
			}
		});
	}
});


var ReportsView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.reports,
	
	initialize: function () {
		
    },
    
    render: function () {
		if(myWallet.isUserLoggedIn())
		{
			var template = _.template(this.template);
			this.$el.html(template);
			
			this.trigger('render');
		}
	}
});


var ReportGroupBySpengingNameView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.reportGroupBySpengingName,
	report: null,
	
	events: {
		"click div.reportGroupBySpengingName table.spendings th div": "sortSpendings",
	},
	
	initialize: function () {
		this.report = reportGroupBySpengingName;
		
		this.report.setDateBegin($.datepicker.formatDate('yy-mm-01', new Date()));
		this.report.setDateEnd($.datepicker.formatDate('yy-mm-'+this.countDaysOfMont(), new Date()));
    },
	
	countDaysOfMont: function()
    {
    	var date = new Date();
    	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    },
	
	sortSpendings: function(event)
	{
		var field = $(event.target).attr('data-field');
		var sortOptions = this.report.getSortOptions();
		
		if(sortOptions.field == field)
		{
			sortOptions.direction = sortOptions.direction == 'asc' ? 'desc' : 'asc';
		}
		else
		{
			sortOptions.direction = 'desc';
			sortOptions.field = field;
		}
		
		this.report.setSortOptions(sortOptions);
		
		this.render();
	},
    
    render: function () {
		if(myWallet.isUserLoggedIn())
		{
			var template = _.template(
				this.template,
				{
					data: this.report.getData(), 
					user: myWallet.user,
					sortOptions: this.report.getSortOptions()
				}
			);
			this.$el.html(template);
			
			//---------------- initializing tool panel ---------------
			var view = this;
			this.$("input[name=dateBegin]").val(this.report.getDateBegin());
			this.$("input[name=dateBeginFront]")
			.val($.datepicker.formatDate('d GG yy', new Date(this.report.getDateBegin())))
			.datepicker({
				dateFormat:'d GG yy',
				altField: this.$("input[name=dateBegin]"),
				altFormat: "yy-mm-dd",
				onClose: function(){
					view.report.setDateBegin(view.$("input[name=dateBegin]").val())
					
					view.render();
				}
			});
			
			this.$("input[name=dateEnd]").val(this.report.getDateEnd());
			this.$("input[name=dateEndFront]")
			.val($.datepicker.formatDate('d GG yy', new Date(this.report.getDateEnd())))
			.datepicker({
				dateFormat:'d GG yy',
				altField: this.$("input[name=dateEnd]"),
				altFormat: "yy-mm-dd",
				onClose: function(){
					view.report.setDateEnd(view.$("input[name=dateEnd]").val())
					
					view.render();
				}
			});
			//-------------------
			
			this.trigger('render');
		}
	}
	
});

