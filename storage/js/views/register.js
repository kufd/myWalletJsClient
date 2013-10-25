var RegisterView = Backbone.View.extend({
	el: '#page',
	rootEl:'div.register',
	template: myWallet.templates.register,
	
	events: {
	    "click div.register .submit input": "register"
	},
	
	render: function () {
		this.trigger('render');
		this.$el.html(this.template());
	},
	
	register: function(){
		myWallet.user.register({
			'login': this.$("input[name=login]").val(), 
			'name': this.$("input[name=name]").val(), 
			'email': this.$("input[name=email]").val(), 
			'password': this.$("input[name=password]").val(), 
			'lang': 'ua', 
			'currency': 'грн', 
			'useEncryption': '1'
		});
	}
});

