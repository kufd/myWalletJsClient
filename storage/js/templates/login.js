
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


