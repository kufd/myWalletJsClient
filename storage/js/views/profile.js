var ProfileView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.profile,
	
	events: {
		"click div.profile .submit input": "save"
	},
		
	render: function () {
		if(myWallet.isUserLoggedIn())
		{
			var template = _.template(this.template, {user: myWallet.user, availableLanguages: myWallet.availableLanguages});
			this.$el.html(template);
			
			this.trigger('render');
		}
	},
	
	save: function(){
		var fields = {
			'name': this.$("input[name=name]").val(),
			'email': this.$("input[name=email]").val(),
			'lang': this.$("select[name=lang]").val(),
			'currency': this.$("input[name=currency]").val(),
			'useEncryption': this.$("input[name=useEncryption]").prop('checked') ? '1' : '0',
			'newPassword': this.$("input[name=newPassword]").val(),
			'confirmNewPassword': this.$("input[name=confirmNewPassword]").val(),
			'password': this.$("input[name=password]").val(),
		};
		
		if(myWallet.user.patch(fields))
		{
			myWallet.reloadTranslation();
			myWallet.msg('Профіль збережено');			
		}
		
		this.$("input[name=password], input[name=newPassword], input[name=confirmNewPassword]").val('');
	}
});

