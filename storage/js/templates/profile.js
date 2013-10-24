
myWallet.templates.profile = _.template(
	'<div class="profile">\
\
		<h3>Профіль</h3>\
\
		<table>\
		<tr>\
			<td>Логін</td>\
			<td><input type="text" name="login" readonly="readonly" value=""/></td>\
		</tr>\
		<tr>\
			<td>Ім’я</td>\
			<td><input type="text" name="name" value=""/></td>\
		</tr>\
		<tr>\
			<td>e-mail</td>\
			<td><input type="text" name="email" value=""/></td>\
		</tr>\
		<tr>\
			<td>Мова</td>\
			<td>\
				<select name="lang">\
					<option value="ua">ua</option>\
				</select>\
			</td>\
		</tr>\
		<tr>\
			<td>Валюта</td>\
			<td><input type="text" name="currency" value=""/></td>\
		</tr>\
		<tr>\
			<td>Шифрувати дані</td>\
			<td><input type="checkbox" name="useEncryption" title="При активації цієї опції будуть зашифровані цифри витрат. Але при втраті паролю, їх не можна буде відновити"/></td>\
		</tr>\
		<tr>\
			<td class="pt-15">Новий пароль</td>\
			<td class="pt-15"><input type="password" name="newPassword"/></td>\
		</tr>\
		<tr>\
			<td>Повтор нового паролю</td>\
			<td><input type="password" name="reNewPassword"/></td>\
		</tr>\
		<tr>\
			<td class="pt-15">Поточний пароль</td>\
			<td class="pt-15"><input type="password" name="password"/></td>\
		</tr>\
		<tr>\
			<td colspan="2" class="submit">\
				<input type="button" value="Зберегти" />\
			</td>\
		</tr>\
		</table>\
\
	</div>'
);


