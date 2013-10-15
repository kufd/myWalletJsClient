var templates = new Object();


templates.main = _.template(
	'<!-- start header -->\
	<div id="header">\
		<div id="logo">\
			<h1><a href="#">Мій гаманець<sup></sup></a></h1>\
			<h2></h2>\
		</div>\
		<div id="menu">\
			<ul>\
				<li><a href="#" class="wallet">Гаманець</a></li>\
				<li><a href="#" class="profile">Профіль</a></li>\
				<li><a href="#" class="controlPanel">Адмін-панель</a></li>\
				<li><a href="#" class="login">Вхід</a></li>\
				<li><a href="#" class="logout">Вихід</a></li>\
			</ul>\
		</div>\
	</div>\
	<!-- end header -->\
\
	<!-- start page -->\
	<div id="page">\
	</div>\
	<!-- end page -->'
);


