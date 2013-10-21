
myWallet.templates.forgotPassword = _.template(
	'<div class="forgotPassword">\
\
		<div class="alert">\
			<h2>Увага!</h3>\
			При використанні процедури відновлення паролю буде втрачена зашифрована інформація.\
		</div>\
\
		<div class="form">\
			<h3>Відровлення паролю</h3>\
\
			<table>\
			<tr>\
				<td>Введіть ваш логін</td>\
				<td><input type="text" name="login"></td>\
			</tr>\
			<tr>\
				<td colspan="2" class="submit">\
					<input type="button" value="Відновити" />\
				</td>\
			</tr>\
			</table>\
		</div>\
\
	</div>'
);


