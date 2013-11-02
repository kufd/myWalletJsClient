var ProfileView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.profile,
	
	events: {
		"click div.profile .submit input": "save"
	},
	
	render: function () {
		if(myWallet.isUserLoggedIn())
		{
			var template = _.template(this.template, {user: myWallet.user});
			this.$el.html(template);
			
			this.trigger('render');
		}
	},
	
	save: function(){
		var fields = {
			'login': this.$("input[name=login]").val(),
			'name': this.$("input[name=name]").val(),
			'email': this.$("input[name=email]").val(),
			'lang': this.$("input[name=lang]").val(),
			'currency': this.$("input[name=currency]").val(),
			'useEncryption': this.$("input[name=useEncryption]").prop('checked') ? '1' : '0',
			'newPassword': this.$("input[name=newPassword]").val(),
			'confirmNewPassword': this.$("input[name=confirmNewPassword]").val(),
			'password': this.$("input[name=password]").val(),
		};
		
		myWallet.user.path(fields);
	}
});

