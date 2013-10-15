$( document ).ready(function() {
  
	var user = new User({ name: "km", login: 'test1', password: 'test1'});

	var mainView = new MainView();
	mainView.render();

});