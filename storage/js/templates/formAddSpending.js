
myWallet.templates.formAddSpending =
	'<div class="formAddSpending" title="<%=myWallet.t("Нова витрата")%>">\
		<table>\
		<tr>\
			<td class="name"><%=myWallet.t("Витрата")%></td>\
			<td class="value">\
				<% if(!spendingsTop.get()){ %>\
					<input type="text" name="spendingName" />\
				<% }else{ %>\
					<select name="spendingName">\
						<% $.each(spendingsTop.get(), function(index, spendingTopName) { %>\
							<option value="<%=spendingTopName%>"><%=spendingTopName%></option>\
						<% }); %>\
						<option value=""><%=myWallet.t("Інша витрата")%></option>\
					</select>\
				<% } %>\
			</td>\
		</tr>\
		<tr>\
			<td class="name"><%=myWallet.t("Сума")%></td>\
			<td class="value"><input type="text" name="amount" value="" /></td>\
		</tr>\
		<tr>\
			<td class="name"><%=myWallet.t("Дата")%></td>\
			<td class="value">\
				<input type="text" name="dateFront" value="" readonly="readonly" />\
				<input type="hidden" name="date" value="" />\
			</td>\
		</tr>\
		</table>\
		<input type="hidden" name="spendingId" value="" />\
	</div>';

