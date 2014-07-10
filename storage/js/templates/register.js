
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


