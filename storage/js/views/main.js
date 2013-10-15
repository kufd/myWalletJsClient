var MainView = Backbone.View.extend({
	el: 'body',
	template: templates.main,
	render: function () {
		this.$el.html(this.template());
	},
});

