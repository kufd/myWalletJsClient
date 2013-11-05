
myWallet.templates.spendings =
	'<table>\
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
	<% spendings.each(function(spending) { %>\
	<tr>\
		<td colspan="4">\
		<%=spending.get("spendingName")%>\
		</td>\
	</tr>\
	<% }); %>\
	</table>';


