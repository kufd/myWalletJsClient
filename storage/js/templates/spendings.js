
myWallet.templates.spendings =
	'<div class="spendings">\
\
		<div class="tool_panel">\
			<div class="button_add_spending">Додати витрату</div>\
		</div>\
\
		<table class="spendings">\
		<tr>\
			<th class="spendingName">\
				<div data-sort="name">Витрата</div>\
			</th>\
			<th class="amount">\
				<div data-sort="amount">Сума</div>\
			</th>\
			<th class="date">\
				<div data-sort="date">Дата</div>\
			</th>\
			<th class="actions">\
				Дії\
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
				<%=spending.get("date")%>\
			</td>\
			<td class="actions">\
				<div class="edit" title="Редагувати">&nbsp;</div>\
				<div class="delete" title="Видалити">&nbsp;</div>\
			</td>\
		</tr>\
		<% }); %>\
\
		<tr class="sum">\
			<td class="spendingName">\
				Загальна сума\
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

