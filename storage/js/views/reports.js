var ReportsView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.reports,
	
	initialize: function () {
		
    },
    
    render: function () {
		if(myWallet.isUserLoggedIn())
		{
			var template = _.template(this.template);
			this.$el.html(template);
			
			this.trigger('render');
		}
	}
});

