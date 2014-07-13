;
(function(){
	
	var errors = {
		1 : myWallet.t('Невідома помилка'),
		11 : myWallet.t('Помилка при з’єднанні з сервером.'),
		12 : myWallet.t('Неправильний логін або пароль'),
		
		101 : myWallet.t('Довжина логіну має бути більшою 5 і меншою 50 символів'),
		102 : myWallet.t('Довжина імені має бути більшою 2 і меншою 100 символів'),
		103 : myWallet.t('Неправильний код мови'),
		104 : myWallet.t('Неправильний email'),
		105 : myWallet.t('Не введений пароль'),
		106 : myWallet.t('Не введено підтвердження паролю'),
		107 : myWallet.t('Не правильно задана опція шифрування даних'),
		109 : myWallet.t('Такий логін вже існує'),
		110 : myWallet.t('Такий email вже існує'),
		111 : myWallet.t('Пароль та його підтвердження не співпадають'),
		112 : myWallet.t('Неправильний пароль'),
		
		114 : myWallet.t('Введіть назву витрати'),
		115 : myWallet.t('Сума витрати має бути числом'),
		116 : myWallet.t('Не задана дата для витрати'),
		
		
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