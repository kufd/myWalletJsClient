
myWallet.templates.login = _.template(
	'<div class="login">\
\
		<p class="about">\
			Сервіс який допоможе підсумувати ваші витрати.\
			<a href="#about">\
				Більше інформації.\
			</a>\
		</p>\
\
		<div class="form">\
			<h3>Вхід</h3>\
\
			<table>\
			<tr>\
				<td>Логін</td>\
				<td><input type="text" name="login"></td>\
			</tr>\
			<tr>\
				<td>Пароль</td>\
				<td><input type="password" name="password"></td>\
			</tr>\
			<tr>\
				<td></td>\
				<td><label><input type="checkbox" name="remember"> Запам’ятати</label></td>\
			</tr>\
			<tr>\
				<td colspan="2" class="submit">\
					<input type="button" value="Увійти" />\
				</td>\
			</tr>\
			<tr>\
				<td colspan="2">\
					<a href="#forgotPassword" class="forgot">Забув пароль</a>\
					<a href="#register" class="register">\
						Зареєструватись\
					</a>\
				</td>\
			</tr>\
			</table>\
		</div>\
\
	</div>'
);


