
myWallet.templates.reportAmountByPeriod =
	'<div class="reportAmountByPeriod">\
\
		<h2><%=myWallet.t("Звіт: сума по періодах")%></h2>\
		<div class="tool_panel">\
			<%=myWallet.t("Період")%>: \
			<input name="dateBeginFront" type="text">\
			<input type="hidden" name="dateBegin" />\
			&mdash;\
			<input name="dateEndFront" type="text">\
			<input type="hidden" name="dateEnd" />\
			<br/>\
			<%=myWallet.t("Групувати по")%>: \
			<select name="groupByPeriod">\
				<option value="week"><%=myWallet.t("тижню")%></option>\
				<option value="month"><%=myWallet.t("місяцю")%></option>\
				<option value="year"><%=myWallet.t("року")%></option>\
			</select>\
			<br/>\
			<%=myWallet.t("Витрата")%>: \
			<input type="text" name="spendingName" />\
		</div>\
\
	</div>';


