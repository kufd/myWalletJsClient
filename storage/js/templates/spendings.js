
myWallet.templates.spendings =
	'<div class="spendings">\
\
		<div class="tool_panel">\
			<div class="button_add_spending"><%=myWallet.t("Додати витрату")%></div>\
			<div class="dateFilter">\
				<h5><%=myWallet.t("Період")%>:</h5>\
				<input type="text" name="dateBeginFront" />\
				<input type="hidden" name="dateBegin" />\
				&mdash;\
				<input type="text" name="dateEndFront" />\
				<input type="hidden" name="dateEnd" />\
			</div>\
		</div>\
\
		<table class="spendings">\
		<tr>\
			<th class="spendingName">\
				<div data-field="spendingName" class="<%=sortOptions.field == "spendingName" ? sortOptions.direction : ""%>"><%=myWallet.t("Витрата")%></div>\
			</th>\
			<th class="amount">\
				<div data-field="amount" class="<%=sortOptions.field == "amount" ? sortOptions.direction : ""%>"><%=myWallet.t("Сума")%></div>\
			</th>\
			<th class="date">\
				<div data-field="date" class="<%=sortOptions.field == "date" ? sortOptions.direction : ""%>"><%=myWallet.t("Дата")%></div>\
			</th>\
			<th class="actions">\
				<%=myWallet.t("Дії")%>\
			</th>\
		</tr>\
\
		<% var sum = 0; %>\
		<% spendings.each(function(spending) { %>\
		<% sum+=parseInt(spending.get("amount")*100); %>\
		<tr data-spending-id="<%=spending.get("id")%>">\
			<td class="spendingName">\
				<%=spending.get("spendingName")%>\
			</td>\
			<td class="amount">\
			<%=spending.get("amount")%>  <%=user.get("currency")%>\
			</td>\
			<td class="date">\
				<%=$.datepicker.formatDate("d GG yy", new Date(spending.get("date")))%>\
			</td>\
			<td class="actions">\
				<div class="edit" title="<%=myWallet.t("Редагувати")%>">&nbsp;</div>\
				<div class="delete" title="<%=myWallet.t("Видалити")%>">&nbsp;</div>\
			</td>\
		</tr>\
		<% }); %>\
\
		<tr class="sum">\
			<td class="spendingName">\
				<%=myWallet.t("Загальна сума")%>\
			</td>\
			<td class="amount">\
				<%=sum/100%> <%=user.get("currency")%>\
			</td>\
			<td class="date">\
			</td>\
			<td class="actions">\
			</td>\
		</tr>\
		</table>\
	</div>';

