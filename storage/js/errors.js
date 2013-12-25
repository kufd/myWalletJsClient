
(function(){
	
	var errors = {
		1 : 'Невідома помилка',
		11 : 'Помилка при з’єднанні з сервером.',
		
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
	};
	
	myWallet.setErrors(errors);
	
})();