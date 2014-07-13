
myWallet.templates.reportGroupBySpengingName = 
	'<div class="reportGroupBySpengingName">\
\
		<h2><%=myWallet.t("Звіт: сума по витратах")%></h2>\
		<div class="tool_panel">\
			Період: \
			<input name="dateBeginFront" type="text">\
			<input type="hidden" name="dateBegin" />\
			&mdash;\
			<input name="dateEndFront" type="text">\
			<input type="hidden" name="dateEnd" />\
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
		</tr>\
\
		<% var sum = 0; %>\
		<% for (var key in data) { %>\
			<% spending = data[key]; %>\
			<% sum+=parseInt(spending.amount*100); %>\
			<tr>\
				<td class="spendingName">\
					<%=spending.spendingName%>\
				</td>\
				<td class="amount">\
					<%=spending.amount%>  <%=user.get("currency")%>\
				</td>\
			</tr>\
		<% } %>\
\
		<tr class="sum">\
			<td class="spendingName">\
				<%=myWallet.t("Загальна сума")%>\
			</td>\
			<td class="amount">\
				<%=sum/100%> <%=user.get("currency")%>\
			</td>\
		</tr>\
		</table>\
\
	</div>';


