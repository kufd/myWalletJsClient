
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


