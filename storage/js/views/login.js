var LoginView = Backbone.View.extend({
	el: '#page',
	template: templates.login,
	render: function () {
		this.$el.html(this.template());
	},
});

