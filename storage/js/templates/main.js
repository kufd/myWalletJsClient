
myWallet.templates.main = _.template(
	'<!-- start header -->\
	<div id="header">\
		<div id="logo">\
			<h1><a href="#spendings"><%=myWallet.t("Мій гаманець")%><sup></sup></a></h1>\
			<h2></h2>\
		</div>\
		<div id="menu">\
			<ul>\
				<li><a href="#reports" class="reports"><%=myWallet.t("Звіти")%></a></li>\
				<li><a href="#spendings" class="spendings"><%=myWallet.t("Гаманець")%></a></li>\
				<li><a href="#profile" class="profile"><%=myWallet.t("Профіль")%></a></li>\
				<li><a href="#" class="controlPanel"><%=myWallet.t("Адмін-панель")%></a></li>\
				<li><a href="#login" class="login"><%=myWallet.t("Вхід")%></a></li>\
				<li><a href="#" class="logout"><%=myWallet.t("Вихід")%></a></li>\
			</ul>\
		</div>\
	</div>\
	<!-- end header -->\
\
	<!-- start page -->\
	<div id="page">\
	</div>\
	<!-- end page -->\
\
	<!-- start footer -->\
	<div id="footer">\
		<div id="footer-menu">\
			<!--ul>\
				<li class="active"><a href="index.html">головна</a></li>\
			</ul-->\
		</div>\
		<div class="contacts"><%=myWallet.t("Контакти")%>: <a href="mailto:mywallet.service@gmail.com">mywallet.service@gmail.com</a></div>\
		<p id="legal">(c) 2013 mywallet.com. Design by <a href="http://www.freecsstemplates.org/" target="_blank">Free CSS Templates</a>.</p>\
	</div>\
	<!-- end footer -->'
);


