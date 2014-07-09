
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


