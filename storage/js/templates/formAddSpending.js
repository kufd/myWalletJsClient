
myWallet.templates.formAddSpending =
	'<div class="formAddSpending" title="Нова витрата">\
		<table>\
		<tr>\
			<td class="name">Витрата</td>\
			<td class="value"><input type="text" name="spendingName" /></td>\
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

