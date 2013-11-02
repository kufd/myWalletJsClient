
myWallet.templates.profile = 
	'<div class="profile">\
\
		<h3>Профіль</h3>\
\
		<table>\
		<tr>\
			<td>Логін</td>\
			<td><input type="text" name="login" readonly="readonly" value="<%=user.get(\'login\')%>"/></td>\
		</tr>\
		<tr>\
			<td>Ім’я</td>\
			<td><input type="text" name="name" value="<%=user.get(\'name\')%>"/></td>\
		</tr>\
		<tr>\
			<td>e-mail</td>\
			<td><input type="text" name="email" value="<%=user.get(\'email\')%>"/></td>\
		</tr>\
		<tr>\
			<td>Мова</td>\
			<td>\
				<select name="lang">\
					<option value="ua" <%=user.get(\'lang\') == \'ua\' ? \'selected="selected"\' : \'\'%>>ua</option>\
				</select>\
			</td>\
		</tr>\
		<tr>\
			<td>Валюта</td>\
			<td><input type="text" name="currency" value="<%=user.get(\'currency\')%>"/></td>\
		</tr>\
		<tr>\
			<td>Шифрувати дані</td>\
			<td><input type="checkbox" name="useEncryption" <%=user.get(\'useEncryption\') ? \'checked="checked"\' : \'\'%> title="При активації цієї опції будуть зашифровані цифри витрат. Але при втраті паролю, їх не можна буде відновити"/></td>\
		</tr>\
		<tr>\
			<td class="pt-15">Новий пароль</td>\
			<td class="pt-15"><input type="password" name="newPassword"/></td>\
		</tr>\
		<tr>\
			<td>Повтор нового паролю</td>\
			<td><input type="password" name="confirmNewPassword"/></td>\
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
	</div>';


