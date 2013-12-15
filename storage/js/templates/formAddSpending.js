
myWallet.templates.formAddSpending =
	'<div class="formAddSpending" title="Нова витрата">\
		<table>\
		<tr>\
			<td class="name">Витрата</td>\
			<td class="value">\
				<% if(!spendingsTop.get()){ %>\
					<input type="text" name="spendingName" />\
				<% }else{ %>\
					<select name="spendingName">\
						<% $.each(spendingsTop.get(), function(index, spendingTopName) { %>\
							<option value="<%=spendingTopName%>"><%=spendingTopName%></option>\
						<% }); %>\
						<option value="">Інша витрата</option>\
					</select>\
				<% } %>\
			</td>\
		</tr>\
		<tr>\
			<td class="name">Сума</td>\
			<td class="value"><input type="text" name="amount" value="" /></td>\
		</tr>\
		<tr>\
			<td class="name">Дата</td>\
			<td class="value">\
				<input type="text" name="dateFront" value="" readonly="readonly" />\
				<input type="hidden" name="date" value="" />\
			</td>\
		</tr>\
		</table>\
		<input type="hidden" name="spendingId" value="" />\
	</div>';

